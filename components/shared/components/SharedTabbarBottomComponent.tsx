import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigationHook, useDimensions, useStatusKeyboard } from '@/hooks';
import { Ionicons } from '@expo/vector-icons';
import { useActionBurguerContext, useThemeContext } from '@/context';
import { useRoute } from '@react-navigation/native';

export const SharedTabbarBottomComponent = () => {
  const { colors, fontSize } = useThemeContext();
  const { lastClicked, setLastClicked } = useActionBurguerContext();
  const { deviceType } = useDimensions();
  const navigation = useNavigationHook();
  const { isKeyboardVisible } = useStatusKeyboard();
  const route = useRoute();
  const styles = StyleSheet.create({
    cont: {
      backgroundColor: colors.colorBackgroundTabbar,
      display: isKeyboardVisible ? 'none' : lastClicked === 0 ? 'flex' : 'flex',
      height: deviceType === 'ios' ? 85 : 70,
      paddingVertical: 1,
      borderTopWidth: 0,
      bottom: deviceType === 'ios' ? 40 : 10,
      paddingBottom: deviceType === 'ios' ? 15 : 0,
      position: 'absolute',
      right: 5,
      left: 5,
      borderRadius: 20,
      flexDirection: 'row',
    },
    cont_item: { flex: 1, marginTop: 10, justifyContent: 'space-around', alignItems: 'center' },
    cont_item_text: { fontSize: fontSize.subtitle },
  });

  const routes: { label: string; iconName: any; onPress: () => void }[] = [
    {
      label: 'Inicio',
      iconName: 'home',
      onPress: () => {
        setLastClicked(0);
        if (route.name === 'AssistanceScreen') navigation.navigate('index');
        else navigation.navigate('index');
      },
    },
    {
      label: 'Mis Compras',
      iconName: 'bag',
      onPress: () => {
        setLastClicked(1);
        navigation.navigate('ShopScreen');
      },
    },
  ];

  return (
    <View style={styles.cont}>
      {routes.map(({ label, iconName, onPress }, index) => (
        <TouchableOpacity key={index} style={styles.cont_item} onPress={onPress}>
          <Ionicons name={iconName} size={25} color={lastClicked === index ? '#FFFFFF' : '#C8E5CF'} />
          <Text style={[styles.cont_item_text, { color: lastClicked === index ? '#FFFFFF' : '#C8E5CF' }]}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
