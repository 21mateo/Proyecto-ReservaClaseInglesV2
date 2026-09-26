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
}