import React, { useEffect, useState } from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PerfilScreens() {

    const [cedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [edad, setEdad] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [registrado, setRegistrado] = useState(false);

    useEffect(() => {
        cargarPerfil();
    }, []);

    const cargarPerfil = async () => {
        const datos = await AsyncStorage.getItem('perfil');

        if (datos) {
            const perfil = JSON.parse(datos);

            setCedula(perfil.cedula);
            setNombre(perfil.nombre);
            setEdad(perfil.edad);
            setTelefono(perfil.telefono);
            setCorreo(perfil.correo);

            setRegistrado(true);
        }
    };

    const guardarPerfil = async () => {

        if (!cedula || !nombre || !edad || !telefono || !correo) {
            Alert.alert(
                'Campos incompletos',
                'Por favor completa todos los campos para continuar.'
            );
            return;
        }

        const perfil = {
            cedula,
            nombre,
            edad,
            telefono,
            correo
        };

        await AsyncStorage.setItem(
            'perfil',
            JSON.stringify(perfil)
        );

        if (registrado) {
            Alert.alert(
                '¡Perfil actualizado!',
                'Tus datos fueron actualizados correctamente.'
            );
        } else {
            Alert.alert(
                '¡Registro exitoso!',
                'Tu perfil ha sido registrado correctamente.'
            );
        }

        setRegistrado(true);
    };

    return (
        <ScrollView style={styles.container}>

            <Text style={styles.titulo}>
                Mi perfil
            </Text>

            <Text style={styles.subtitulo}>
                {registrado
                    ? 'Tus datos registrados'
                    : 'Regístrate para continuar'}
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Cédula"
                value={cedula}
                onChangeText={setCedula}
                keyboardType="numeric"
            />

            <TextInput
                style={styles.input}
                placeholder="Nombre completo"
                value={nombre}
                onChangeText={setNombre}
            />

            <TextInput
                style={styles.input}
                placeholder="Edad"
                value={edad}
                onChangeText={setEdad}
                keyboardType="numeric"
            />

            <TextInput
                style={styles.input}
                placeholder="Número de teléfono"
                value={telefono}
                onChangeText={setTelefono}
                keyboardType="phone-pad"
            />

            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={correo}
                onChangeText={setCorreo}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TouchableOpacity
                style={styles.boton}
                onPress={guardarPerfil}
            >
                <Text style={styles.textoBoton}>
                    {registrado
                        ? 'Actualizar datos'
                        : 'Guardar registro'}
                </Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        paddingTop: 100,
        backgroundColor: '#F1F8F3',
    },

    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4ADE80',
        marginBottom: 5,
        textAlign: 'center',
    },

    subtitulo: {
        fontSize: 16,
        color: '#4ADE80',
        marginBottom: 25,
        textAlign: 'center',
    },

    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#A5D6A7',
        borderRadius: 10,
        padding: 13,
        marginBottom: 15,
        fontSize: 16,
    },

    boton: {
        backgroundColor: '#4ADE80',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 5,
    },

    textoBoton: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },

});
