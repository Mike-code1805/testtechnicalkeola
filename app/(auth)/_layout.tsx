import { Stack, useFocusEffect } from 'expo-router';
import { useActionBurguerContext, useGlobalContext, useThemeContext } from '@/context';
import { useCallback, useEffect } from 'react';
import Constants from 'expo-constants';
import { Alert } from 'react-native';

export default function RootLayout() {
  const { colors, fontSize } = useThemeContext();
  const { setLastClicked } = useActionBurguerContext();
  const { versionBundle } = useGlobalContext();

  const version = Constants.expoConfig?.android?.versionCode;

  useEffect(() => {
    if (versionBundle === 0) return;
    if (version === undefined) return;
    if (versionBundle > version)
      Alert.alert('Actualización disponible', '¡Hay una nueva version disponible! Por favor actualiza la app', [
        { text: 'ok', onPress: () => {} },
        {
          text: 'Actualizar',
          onPress: () => {},
        },
      ]);
    if (versionBundle === version) return;
  }, [versionBundle, version]);

  useFocusEffect(
    useCallback(() => {
      setLastClicked(0);
    }, [])
  );

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleStyle: { color: colors.title, fontSize: 20, fontWeight: 'bold' },
        headerBackVisible: true,
        headerBackTitle: 'Atrás',
        headerTintColor: colors.subtitle,
        headerBackTitleStyle: { fontSize: fontSize.subtitle },
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: colors.colorBackgroundHeader },
        headerLargeTitleStyle: { color: colors.subtitle },
      }}
    >
      <Stack.Screen name='LoginScreen' options={{ title: 'Iniciar Sesión' }} />
      <Stack.Screen name='RegisterScreen' options={{ title: 'Regístrate' }} />
    </Stack>
  );
}
