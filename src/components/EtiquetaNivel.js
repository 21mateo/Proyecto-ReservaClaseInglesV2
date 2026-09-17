import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing} from '../theme';

export default function EtiquetaNivel({nivel}){
    return (
        <View style={[styles.contenedor, {backgroundColor: colors.fondo}]}>
            <Text style={styles.texto}> {nivel}
            </Text>
        </View>
    )

}

const styles = StyleSheet.create({ 
   contenedor: {
        alignSelf:'auto',
        paddingVertical: 3,
        paddingHorizontal: spacing.md,
        borderWidth: 1,
    },
    texto: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 0.3,
    }
 })