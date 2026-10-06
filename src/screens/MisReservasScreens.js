import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Alert,} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useReserva from '../hooks/useReserva';
import { colors, radius, sombra } from '../theme';

export default function MisReservasScreen() {
  const { reservas, cargando, cancelarReserva } = useReserva();
  const insets = useSafeAreaInsets();

  if (cargando) {
    return (
      <View
        style={[
          estilos.container,
          { paddingTop: insets.top + 35 },
        ]}
      >
        <Text style={estilos.texto}>Cargando reservas...</Text>
      </View>
    );
  }

    const handleCancelarReserva = (idReserva) => {
        Alert.alert(
            'Cancelar reserva',
            '¿Estás seguro de que quieres cancelar esta reserva?',
            [
              {
                text: 'No',
                style: 'cancel',
              },
              {
                text: 'Sí',
                onPress: () => cancelarReserva(idReserva),
              },
            ]
        );
    }

  return (
    <View style={estilos.container}>
      <FlatList
        data={reservas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingTop: insets.top + 35,
          paddingHorizontal: 20,
          paddingBottom: 30,
        }}
        ListHeaderComponent={
          <View style={estilos.encabezado}>
            <Text style={estilos.titulo}>Mis reservas</Text>
            <Text style={estilos.subtitulo}>
              Tus clases reservadas
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={estilos.vacio}>
            <Text style={estilos.textoVacio}>
              No tienes reservas todavía.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={estilos.reserva}>
            <Text style={estilos.tituloReserva}>
              {item.titulo}
            </Text>

            <Text style={estilos.dato}>
              Nivel: {item.nivel}
            </Text>

            <Text style={estilos.dato}>
              Profesor: {item.profesor}
            </Text>

            <Text style={estilos.dato}>
              Horario: {item.horario}
            </Text>

            <Text style={estilos.precio}>
              ${item.precio}
            </Text>
            <Pressable
                style={estilos.botonCancelar}
                onPress={() => handleCancelarReserva(item.id)}
            >
                <Text style={estilos.textoCancelar}>
                    Cancelar reserva
                </Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fondo,
  },

  encabezado: {
    marginBottom: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.texto,
  },

  subtitulo: {
    marginTop: 5,
    color: colors.textoSuave,
  },

  reserva: {
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.borde,
    ...sombra,
  },

  tituloReserva: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.texto,
    marginBottom: 8,
  },

  dato: {
    color: colors.textoSuave,
    marginBottom: 4,
  },

  precio: {
    color: colors.exito,
    fontWeight: '700',
    marginTop: 5,
  },

  vacio: {
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    padding: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borde,
  },

  textoVacio: {
    color: colors.textoSuave,
    fontSize: 15,
  },

  texto: {
    color: colors.textoSuave,
    textAlign: 'center',
  },

  botonCancelar: {
  marginTop: 12,
  paddingVertical: 10,
  alignItems: 'center',
  borderRadius: radius.full,
  borderWidth: 1,
  borderColor: colors.borde,
},

  textoCancelar: {
  color: colors.texto,
  fontWeight: '700',
},
});
