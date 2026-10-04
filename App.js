import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabsPrincipales from './src/navigation/TabsPrincipales';
import { colors } from './src/theme';
import { ReservaProvider } from './src/context/ReservaContext';

const temaNavigation = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.fondo,
    card: colors.superficie,
    primary: colors.primario,
    text: colors.texto,
    border: colors.borde,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ReservaProvider>
        <NavigationContainer theme={temaNavigation}>
          <TabsPrincipales />
        </NavigationContainer>
      </ReservaProvider>

      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}