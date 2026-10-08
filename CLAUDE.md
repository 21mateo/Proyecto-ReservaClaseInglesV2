@AGENTS.md
mira necesito que me ayudes con un proyecto de desarrollo movil que estoy haciendo en react-native con javascript la simulacion la estoy haciendo con expo en la version 57 ya tengo una parte necesito que me ayudes como a orientandome con eso no me ayudes a crear las coas necesito que me corrijas en unas coas que te pida y ya te voy a decir que es lo que me otca hacer pero no me lo vayas a hacer dime con que cosa puedo empezar para quye sea mas dacil y menos compliacado y mas entendible para yo realizarlo sin ningun incoveniente, el proyecto es  de reservas clases de ingles este es el repositorio de lo que llevo https://github.com/21mateo/Proyecto-ReservaClaseInglesV2.git

tengo que  hacer el menú que va tener navegación tipo tap 
Crear la reservas scream donde se pueda visualizar las reservas ese va ser gestionar reservas 
Perfil scream en eso el estudiante se pueda registrar 
Botón de mis reservas abajo el de perfil, pa modificarlo que debe de llevar cédula nombre edad número etc en el de registar. En mis reservas que le muestre las clase que ya eh reservado de los días lunes tal martes tal y que si tiene una en un mismo horario que no lo deje porque no se puede ver clases al mismo tiempo El de registrar es la primera vez que va entrar que le pida regístrese el formulario con los campos pa registrar y el botón guardar Si está registrado que muestre el formulario con el registro y si no está registrado que muestre el formulario y el botón activo No me instales nuevos paquetes  dime que estoy fallando en la lógica No hacer el proyecto completo tiene que ser un revisor de código no realizar instalaciones de que ya tengo si tienes mas perguntas dime y te las respondo de una


import React, { useState } from "react"; import { View, Text, Image, Pressable, StyleSheet, ScrollView, Alert, } from "react-native"; import { Ionicons } from "@expo/vector-icons"; import { useSafeAreaInsets } from "react-native-safe-area-context"; import useReserva from ".

pasted

import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import EtiquetaNivel from './EtiquetaNivel';
import { colors, radius, spacing } from '../theme';
import { formatearPrecio } from '../data/clases';

export default function Card ({ clase, onPress }){
    return(
        <Pressable
            onPress={onPress}
            style={styles.tarjeta}
        >
            <Image source={{ uri: clase.imagen }} style={styles.imagen} resizeMode="cover" />
            <View style={styles.cuerpo}>
                <View style={styles.filaSuperior}>
                    <EtiquetaNivel nivel={clase.nivel}/>
                    <Text style={styles.modalidad}>{clase.modalidad}</Text>
                </View>

                <Text style={styles.titulo}>{clase.titulo}</Text>
                
                {/* Profesor con foto y nombre */}
                <View style={styles.filaProfesor}>
                    <Image source={{ uri: clase.profesor.foto }} style={styles.avatar} />
                    <Text style={styles.profesor}>{clase.profesor.nombre}</Text>
                </View>

                <View style={styles.pie}>
                    <View style={styles.filaMeta}>
                        <Ionicons name="time-outline" size={14} color={colors.textoSuave} />
                        <Text style={styles.meta}>{clase.duracion} min</Text>
                        <Text style={styles.punto}>•</Text>
                        <Ionicons name="people-outline" size={14} color={colors.exito} />
                        <Text style={styles.metaDisponibles}>{clase.cupos} cupos</Text>
                    </View>
                    <Text style={styles.precio}>{formatearPrecio(clase.precio)}</Text>
                </View>
            </View>
       </Pressable>
    );
}

const styles = StyleSheet.create({
    tarjeta: {
        backgroundColor: colors.superficie,
        borderRadius: radius.lg,
        overflow: 'hidden',
        marginBottom: spacing.lg,
        borderWidth: 1,
        borderColor: colors.borde,
    },
    imagen: {
        width: '100%',
        height: 140,
        backgroundColor: colors.primarioSuave,
    },
    cuerpo: {
        padding: spacing.lg,
        gap: spacing.sm,
    },
    filaSuperior: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalidad: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.primario,
        backgroundColor: colors.primarioSuave,
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: radius.sm,
    },
    titulo: { fontSize: 16, fontWeight: '700', color: colors.texto },
    filaProfesor: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    avatar: { width: 24, height: 24, borderRadius: 12, backgroundColor: colors.borde },
    profesor: { fontSize: 13, color: colors.textoSuave, fontWeight: '600' },
    pie: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: spacing.xs,
        borderTopWidth: 1,
        borderTopColor: colors.borde,
        paddingTop: spacing.sm,
    },
    filaMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    meta: { fontSize: 12, color: colors.textoSuave },
    metaDisponibles: { fontSize: 12, color: colors.exito, fontWeight: '700' },
    punto: { color: colors.borde, marginHorizontal: 4 },
    precio: { fontSize: 14, fontWeight: '800', color: colors.primario },
});
Este es mi DetallesClase.js actual. Revísalo junto con el ClasesScreen y ReservaContext que te envié anteriormente. Quiero que identifiques si la forma en que estoy manejando los cupos aquí puede generar desincronización cuando se reserva, se cancela una reserva o se cierra la aplicación. Por ahora no hagas cambios todavía; primero explícame qué corregirías.

Tracing cupos desync across screens and contexts.
Sí, tal como está, hay desincronización en los tres escenarios que preguntas. La causa es una sola: el cupo existe en tres sitios que no se hablan entre sí, y ninguno es el que de verdad persiste.

Dónde vive hoy el cupo
CLASES en clases.js, el número original.
El estado clases de ClasesScreen, una copia que se resta con handleReservarExitoso.
El estado claseDetalle de DetallesClase, otra copia que se resta con setClaseDetalle.
La única fuente que se guarda en AsyncStorage es reservas, en el contexto, y el cupo no se calcula a partir de ella.

Qué pasa en cada escenario
Al reservar. Funciona de casualidad. El cupo se resta por separado en DetallesClase y en ClasesScreen, y como la función viaja por los parámetros de navegación, depende de que ambas pantallas sigan vivas. Esa función no es un dato serializable, y React Navigation lo desaconseja.

Al cancelar. El cupo no vuelve. cancelarReserva solo quita la reserva del contexto, y las copias de cupos en las pantallas ni se enteran. Además, si dejas DetallesClase abierta en el stack y cancelas desde la otra pestaña, esa pantalla sigue mostrando su copia vieja, porque claseDetalle se guardó en useState y no se actualiza sola.

Al cerrar la app. Es el más grave. Las reservas se recuperan de AsyncStorage, pero useState(CLASES) vuelve a empezar con los cupos originales. El estudiante ve su reserva en Mis reservas y la clase aparece con todos sus cupos libres. Con eso se puede sobrepasar el cupo real.