import { Tabs } from 'expo-router';

import { useAuthContext, useThemeContext } from '@/context';
import { useEffect } from 'react';
import { useNavigationHook } from '@/hooks';

const tabScreens: { name: string; label: string; title: string; icon: any; options?: any }[] = [
  { name: '(home)', label: 'Inicio', title: 'Mis Cursos', icon: 'home' },
  { name: 'ShopScreen', label: 'Inicio', title: 'Mis Compras', icon: 'home' },
];

export default function TabLayout() {
  const { colors } = useThemeContext();
  const { handleVerifyToken } = useAuthContext();
  const navigation = useNavigationHook();

  useEffect(() => {
    (async () => {
      try {
        const response = await handleVerifyToken();
        if (response === 'deliveryman') {
          navigation.replace('(delivery)');
          return;
        } else if (response === 'normal') {
          return;
        } else {
          navigation.replace('(auth)');
        }
      } catch (error) {}
    })();
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.colorBackgroundTabbar, display: 'none' },
        headerTitleStyle: { color: colors.title, fontSize: 20, fontWeight: 'bold' },
        headerTintColor: colors.subtitle,
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: colors.colorBackgroundHeader },
      }}
    >
      {tabScreens.map((screen) => (
        <Tabs.Screen
          key={screen.name}
          name={screen.name}
          options={{
            headerShown: screen.name === 'ShopScreen' ? true : false,
            title: screen.title,
            tabBarLabel: screen.label,
            tabBarInactiveTintColor: '#C8E5CF',
            tabBarActiveTintColor: '#FFFFFF',
          }}
        />
      ))}
    </Tabs>
  );
}
