import { useThemeContext } from '@/context';
import { useDimensions } from '@/hooks';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputChangeEventData,
  TextInputFocusEventData,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';

import { HelperText, TextInput } from 'react-native-paper';

interface Props {
  placeholder: string;
  label?: string;
  borderLeft?: boolean;
  value?: string;
  secureTextEntry?: boolean | undefined;
  keyboardType?: KeyboardTypeOptions | undefined;
  maxLength?: number | undefined;
  editable?: boolean;
  activeOutlineColor?: string | undefined;
  outlineColor?: string | undefined;
  left?: React.ReactNode | undefined;
  right?: React.ReactNode | undefined;
  infoIcon?: React.ReactNode | undefined;
  multiline?: boolean | undefined;
  autoCapitalize?: 'none' | 'characters' | 'sentences' | 'words' | undefined;
  ref?: any;
  autoFocus?: boolean | undefined;
  errorMessage?: string | undefined;
  infoMessage?: string | undefined;
  successMessage?: string | undefined;
  obligatory?: boolean | undefined;
  onChangeText?: (e: string) => void | undefined;
  onChange?: ((e: NativeSyntheticEvent<TextInputChangeEventData>) => void) | undefined;
  onSubmitEditing?: ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void) | undefined;
  onEndEditing?: ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void) | undefined;
  onFocus?: (((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) & ((args: any) => void)) | undefined;
  onBlur?: (((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) & ((args: any) => void)) | undefined;
}

export const SharedInputComponent = ({
  label = '',
  value = '',
  borderLeft = false,
  placeholder,
  autoCapitalize,
  keyboardType,
  maxLength,
  multiline,
  onChangeText,
  left,
  right,
  editable = true,
  secureTextEntry,
  activeOutlineColor,
  outlineColor,
  ref,
  infoIcon,
  autoFocus = false,
  errorMessage,
  infoMessage,
  successMessage,
  obligatory = false,
  onChange,
  onSubmitEditing,
  onEndEditing,
  onFocus,
  onBlur,
}: Props) => {
  const { fontSize, colors } = useThemeContext();

  const { W } = useDimensions();

  const styles = StyleSheet.create({
    cont: { width: '100%', marginVertical: 10 },
    cont_label: {
      width: '90%',
      alignSelf: 'center',
      fontSize: fontSize.subtitle,
      color: colors.subtitle,
      textAlign: 'left',
      display: label ? 'flex' : 'none',
    },
    cont_labelaste: { width: '90%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'flex-start' },
    cont_labeltext: {
      alignSelf: 'center',
      marginBottom: 10,
      fontSize: fontSize.subtitle,
      color: colors.colorMain,
      textAlign: 'left',
    },
    cont_asterisc: {
      alignSelf: 'center',
      marginBottom: 10,
      fontSize: fontSize.subtitle,
      color: 'red',
      textAlign: 'left',
      marginLeft: 10,
    },
    cont_input: {
      width: '90%',
      alignSelf: 'center',
      height: W > 500 && multiline ? 48 : W < 500 && multiline ? undefined : 48,
      backgroundColor: colors.colorBackgroundInput,
      fontSize: fontSize.input,
      color: colors.input,
      justifyContent: 'center',
      textAlignVertical: 'top',
      borderLeftColor: editable ? colors.colorBorderIconInput : colors.colorBorderIconInputDisabled,
      borderLeftWidth: borderLeft ? 6 : 0,
    },
    cont_inputcontent: { textAlignVertical: 'center', alignItems: 'center', paddingTop: 0, paddingBottom: 0 },
    cont_inputerror: { color: 'red', fontSize: fontSize.subtitle },
    cont_inputinfo: { color: colors.colorMain, fontSize: fontSize.subtitle },
    cont_inputsuccess: { color: 'green', fontSize: fontSize.subtitle },
  });

  return (
    <View style={styles.cont}>
      {obligatory ? (
        <View style={styles.cont_labelaste}>
          <Text style={styles.cont_labeltext}>{label}</Text>
          <Text style={styles.cont_asterisc}>*</Text>
        </View>
      ) : (
        <Text style={styles.cont_label}>{label}</Text>
      )}
      <TextInput
        ref={ref}
        value={value}
        placeholderTextColor={colors.colorPlaceholderText}
        autoCapitalize={autoCapitalize}
        placeholder={placeholder}
        maxLength={maxLength}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        mode='outlined'
        editable={editable}
        style={styles.cont_input}
        theme={{
          colors: {
            onSurfaceVariant: colors.colorMain,
            secondary: colors.colorMain,
            primary: colors.colorMain,
            text: colors.colorMain,
          },
        }}
        textColor={colors.input}
        outlineColor={
          outlineColor ? outlineColor : editable ? colors.colorBorderTextInput : colors.colorBorderTextInputDisabled
        }
        activeOutlineColor={activeOutlineColor ?? colors.colorMain}
        contentStyle={styles.cont_inputcontent}
        onChangeText={onChangeText ? (e) => onChangeText(e) : undefined}
        left={left}
        right={right}
        returnKeyType='done'
        returnKeyLabel='Hecho'
        onChange={onChange}
        onSubmitEditing={onSubmitEditing}
        multiline={W > 500 && multiline ? undefined : multiline}
        numberOfLines={
          W > 500 && multiline
            ? 1
            : W < 500 && multiline
            ? value.length < 30
              ? 2
              : value.length < 60
              ? 3
              : value.length < 90
              ? 4
              : 1
            : 1
        }
        onFocus={onFocus}
        onBlur={onBlur}
        autoFocus={autoFocus}
        onEndEditing={onEndEditing}
      />
      {errorMessage && (
        <HelperText type='error' style={styles.cont_inputerror}>
          {errorMessage}
        </HelperText>
      )}
      {infoMessage && (
        <HelperText type='info' style={styles.cont_inputinfo}>
          {infoMessage}
        </HelperText>
      )}
      {successMessage && (
        <View style={{ flexDirection: 'row', width: '70%', alignItems: 'center', marginLeft: 20 }}>
          {infoIcon}
          <HelperText type='info' style={styles.cont_inputsuccess}>
            {successMessage}
          </HelperText>
        </View>
      )}
    </View>
  );
};
