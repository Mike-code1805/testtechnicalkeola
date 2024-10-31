import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { ThemeProvider } from '@/context/ThemeContext';
import { ActionBurguerProvider } from '@/context/ActionBurguerContext';
import { AuthProvider } from '@/context/AuthContext';
import { ProductProvider } from '@/context/ProductContext';
import messaging from '@react-native-firebase/messaging';
import { GlobalProvider } from '@/context/GlobalContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async () => {});

    return unsubscribe;
  }, []);

  messaging().setBackgroundMessageHandler(async () => {});

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <GlobalProvider>
        <AuthProvider>
          <ActionBurguerProvider>
            <ProductProvider>
              <Stack>
                <Stack.Screen name='(delivery)' options={{ headerShown: false }} />
                <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
                <Stack.Screen name='(auth)' options={{ headerShown: false }} />
              </Stack>
            </ProductProvider>
          </ActionBurguerProvider>
        </AuthProvider>
      </GlobalProvider>
    </ThemeProvider>
  );
}
