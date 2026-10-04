import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import useReserva from '../hooks/useReserva';

export default function MisReservasScreens() {
    const {reservas, cargando} = useReserva();

    if (cargando) {
        return (
            <View style={styles.container}>
                <Text>Cargando Reservas...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mis Reservas</Text>

            {reservas.length === 0 ? (
                <Text style={styles.emptyText}>
                No tienes reservas todavia.
                </Text>
            ) : (
                <FlatList
                data={reservas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.reserva}>
                        <Text style={styles.titulo}>{item.titulo}</Text>
                        <Text>Nivel: {item.nivel}</Text>
                        <Text>Profesor: {item.profesor}</Text>
                        <Text>Precio: ${item.precio}</Text>
                        <Text>Horario: {item.horario}</Text>
                    </View>
                )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
    title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
    emptyText: {
    fontSize: 16,
    color: '#666',
  },
    reserva: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
    titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

