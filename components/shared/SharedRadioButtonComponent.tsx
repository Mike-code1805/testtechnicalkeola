import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useThemeContext } from '@/context';

interface Props {
  checked?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

export const SharedRadioButtonComponent = ({ checked = false, onPress }: Props) => {
  const { colors } = useThemeContext();

  const styles = StyleSheet.create({
    cont: {
      borderWidth: 3,
      borderColor: colors.colorMain,
      borderRadius: 50,
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cont_color: {
      backgroundColor: checked ? colors.colorMain : colors.colorBackgroundScreen,
      width: 20,
      height: 20,
      borderRadius: 50,
    },
  });

  return (
    <TouchableOpacity style={styles.cont} onPress={onPress}>
      <View style={styles.cont_color} />
    </TouchableOpacity>
  );
};
