import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ClasesStack from './ClasesStack';
import MisReservasScreen from '../screens/MisReservasScreen';
import PerfilScreen from '../screens/PerfilScreen';

const Tab = createBottomTabNavigator();

export default function TabsPrincipales() {
    return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: '#777',
            tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Clases') {
                    iconName = 'book-outline';
                } else if (route.name === 'MisReservas') {
                    iconName = 'calendar-outline';
                } else if (route.name === 'Perfil') {
                    iconName = 'person-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
            },
       })}
        >
            <Tab.Screen name="Clases" component={ClasesStack} />
            <Tab.Screen name="MisReservas" component={MisReservasScreen} />
            <Tab.Screen name="Perfil" component={PerfilScreen} />
        </Tab.Navigator>
    );

}

