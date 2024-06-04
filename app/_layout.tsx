import '~/global.css';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { PortalHost } from '~/components/primitives/portal';
import { ThemeToggle } from '~/components/ThemeToggle';
import {
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {
  GestureHandlerRootView
} from 'react-native-gesture-handler';
// const LIGHT_THEME: Theme = {
//   dark: false,
//   colors: NAV_THEME.light,
// };
// const DARK_THEME: Theme = {
//   dark: true,
//   colors: NAV_THEME.dark,
// };

// export {
//   // Catch any errors thrown by the Layout component.
//   ErrorBoundary,
// } from 'expo-router';

// Prevent the splash screen from auto-hiding before getting the color scheme.
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  // if (!isColorSchemeLoaded) {
  //   return null;
  // }

  return (
    // <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
    <>
    <GestureHandlerRootView style={{flex: 1}}>

    <BottomSheetModalProvider>
      <StatusBar style={'dark'} />
      <Stack initialRouteName='index' screenOptions={{ headerShown: false}}>
        <Stack.Screen
          name='index'
        />
       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </BottomSheetModalProvider>
    </GestureHandlerRootView>
      {/* <PortalHost /> */}
    </>
    // </ThemeProvider>
  );
}
