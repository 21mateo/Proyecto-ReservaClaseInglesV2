import {useContext} from 'react'; 
import {ReservaContext} from '../context/ReservaContext';

export default function useReserva() {
    const contexto = useContext(ReservaContext);
    if (!contexto) {
        throw new Error('useReserva debe ser usado dentro de un ReservaProvider');
    }
    return contexto;
};