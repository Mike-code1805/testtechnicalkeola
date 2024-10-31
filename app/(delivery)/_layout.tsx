import { Stack } from 'expo-router';
import { useAuthContext, useThemeContext } from '@/context';
import { useNavigationHook } from '@/hooks';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
  const { colors, fontSize } = useThemeContext();
  const { handleAuthLogoutUserService } = useAuthContext();

  const navigation = useNavigationHook();
  const logOut = async () => {
    try {
      await handleAuthLogoutUserService();
      navigation.replace('(auth)');
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

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
        headerRight: () => (
          <TouchableOpacity onPress={logOut}>
            <Ionicons name='log-out' size={24} color={colors.title} />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name='DeliveryScreen' options={{ title: 'Estado de Entregas' }} />
    </Stack>
  );
}
