import React, {useState, useEffect, useCallback, useMemo, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_RESERVAS = '@reserva_ingles';

export const ReservaContext = createContext(null);

const convertirHorario = (horario) => {
    const partes = horario.trim().split(' ');

    const dia = partes[0];
    const horaTexto = partes[1];
    const periodo = partes[2];

    let [hora, minutos] = horaTexto.split(':').map(Number);

    if (periodo === 'p.m.' && hora !== 12) {
        hora += 12;
    }
    if (periodo === 'a.m.' && hora === 12) {
        hora = 0;
    }

    return {
        dia,
        minutos: hora * 60 + minutos,
    };
}

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
        const nuevoHorario = convertirHorario(horario);
        
        const reservaExistente = reservas.find((reserva) => {
            return (
                reserva.claseId === clase.id &&
                reserva.horario === horario
            );
        });

        if (reservaExistente){
            return {
                ok: false,
                motivo: 'Ya tienes reservada esta clase en este horario.'
            };
        }

        const claseCruzada = reservas.find((reserva) => {
            const horarioReserva = convertirHorario(reserva.horario);

            if (horarioReserva.dia !== nuevoHorario.dia) {
                return false;
            }

            const inicioNueva = nuevoHorario.minutos;
            const finNueva = inicioNueva + clase.duracion;

            const inicioExistente = horarioReserva.minutos;
            const finExistente = inicioExistente + reserva.duracion;

            return (
                inicioNueva < finExistente &&
                inicioExistente < finNueva
            );
        });

        if (claseCruzada) {
            return {
                ok: false,
                motivo: 'Ya tienes otra clase que se cruza con este mismo horario.',
           };
        }

        const nueva = {
            id: clase.id + '-' + horario,
            claseId: clase.id,
            titulo: clase.titulo,
            nivel: clase.nivel,
            profesor: clase.profesor.nombre,
            precio: clase.precio,
            horario,
            duracion: clase.duracion,
            creadoEn: new Date().toISOString()
        };

        setReservas((previas) => [...previas, nueva]);

        return {
            ok: true,
        };
    }, [reservas]);


    const cancelarReserva = useCallback((idReserva) => {
    setReservas((previas) =>
        previas.filter((reserva) => reserva.id !== idReserva)
    );
}, []);

const valor = useMemo(
    () => ({cargando, reservas, agregarReserva, cancelarReserva}),
    [cargando, reservas, agregarReserva, cancelarReserva]
)

return <ReservaContext.Provider value={valor}>{children}</ReservaContext.Provider>

}