import { StyleSheet, Text, TouchableOpacity, Vibration } from 'react-native';
import React from 'react';
import { useThemeContext } from '@/context';

interface Props {
  onPress: any;
  label: string;
  iconLeft?: any;
  iconRight?: any;
  disabled?: boolean;
}

export const SharedButtonComponent = ({ onPress, label, iconRight, iconLeft, disabled }: Props) => {
  const { colors, fontSize, iconSize } = useThemeContext();

  const styles = StyleSheet.create({
    cont: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: disabled ? colors.colorBackgroundButtonDisabled : colors.colorBackgroundButton,
      borderRadius: 20,
      padding: 5,
      height: iconSize.withoutText + 10,
    },
    cont_label: {
      fontSize: fontSize.subtitle,
      fontWeight: 'bold',
      marginHorizontal: label ? 10 : 0,
      color: disabled ? colors.colorTextButtonDisabled : colors.colorTextButton,
    },
  });

  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
        Vibration.vibrate(10);
      }}
      disabled={disabled}
      style={styles.cont}
    >
      {iconLeft}
      <Text style={styles.cont_label}>{label}</Text>
      {iconRight}
    </TouchableOpacity>
  );
};
