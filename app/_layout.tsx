import '~/global.css';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, View, Text } from 'react-native';
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
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '../QueryClients/queryClient';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
// import { toastConfig } from '~/constants';

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

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  tomatoToast: ({ text1, props }: any) => (
    <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  )
};
export default function RootLayout() {

  // if (!isColorSchemeLoaded) {
  //   return null;
  // }

  return (
    // <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={{flex: 1}}>
          <BottomSheetModalProvider>
            <StatusBar style={'dark'} />
          <Toast  config={toastConfig} />
            <Stack initialRouteName='index' screenOptions={{ headerShown: false}}>
              <Stack.Screen
                name='index'
              />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </BottomSheetModalProvider>
          </GestureHandlerRootView>
      </QueryClientProvider>
  );
}
{/* <PortalHost /> */}
// </ThemeProvider>
