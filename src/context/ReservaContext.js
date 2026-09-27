import React, {useState, useEffect, usecallback, useMemo, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_RESERVAS = '@reserva_ingles';

export const ReservaContext = createContext(null);

export function ReservaProvider({children}) {
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState(true);


    useEffect(() => {
        const cargar = async () => {
            try {
                const guardado = await AsyncStorage.getItem(CLAVE_RESERVAS);
                if (guardado !== null) {
                    setReservas(JSON.parse(guardado));
                }

            }catch (error) {
                console.log('Error leyendo las reservas', error);
            }finally {
                setCargando(false);
            }
        };
        cargar();
    }, [])

    useEffect(() => {
        if (cargando) return;
        AsyncStorage.setItem(CLAVE_RESERVAS, JSON.stringify(reservas)) .catch((error ) =>
            console.log('Error guardando las reservas: ', error)
    );
    }, [reservas, cargando]);

    const agregarReserva = useCallback((clase, horario) => {
        const nueva = {
            id: clase.id + '-' + horario,
            titulo: clase.titulo,
            nivel: clase.nivel,
            profesor: clase.profesor.nombre,
            precio: clase.precio,
            horario,
            creadoEn: new Date().toISOString()
        };

        let resultado = {ok: true};
        setReservas((previas) => {
            if (previas.some((r) => r.id === nueva.id)) {
                return previas;
            }
            return [nueva, ...previas]
        });
        return resultado
    }, []);


const valor = useMemo(
    () => ({cargando, reservas, agregarReserva}),
    [cargando, reservas, agregarReserva]
)

return <ReservasContext.Provider value={valor}>{children}</ReservasContext.Provider>

}