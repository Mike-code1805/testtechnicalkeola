import { Alert, StyleSheet, Text, View } from 'react-native';

import {
  SharedButtonComponent,
  SharedInputComponent,
  SharedLoadingModal,
  SharedRadioButtonComponent,
  SharedSafeScreenScrollGlobalComponent,
} from '@/components/shared';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeContext } from '@/context';
import { TextInput } from 'react-native-paper';
import { useState } from 'react';
import { useForm } from '@/hooks';
import { singUpUserSchema } from '@/schema';
import { RegisterScreenCodeValidationModal } from '@/components/RegisterScreen';
import { authVerifyEmailService, secretCodeGenerateService, secretCodeRegenerateService } from '@/api';
import { MESSAGE_ERROR_SECRETCODE_EXISTS, MESSAGE_ERROR_SECRETCODE_RECENTLY_GENERATED } from '@/constants';
import Constants from 'expo-constants';

export default function RegisterScreen() {
  const { colors, fontSize } = useThemeContext();

  const [visibleCodeValidationModal, setVisibleCodeValidationModal] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(true);
  const [isLoading, setIsLoading] = useState('neutral');
  const version = Constants.expoConfig?.version ?? '';

  const { form, error, onChange, onBlur, setErrors } = useForm(
    { username: '', lastname: '', email: '', password: '', passwordConfirmation: '', termsConditions: false },
    singUpUserSchema
  );

  const handleShowCodeValidationModal = async () => {
    try {
      setIsLoading('checking');
      await singUpUserSchema.validate(form, { abortEarly: false });
      await authVerifyEmailService(form.email);
      await secretCodeGenerateService(form.email);
      setVisibleCodeValidationModal(true);
      setIsLoading('success');
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        setIsLoading('failed');
        const formErrors: any = {};
        error.inner.forEach((err: any) => (formErrors[err.path] = err.message));
        setErrors(formErrors);
        Alert.alert('Error', error.errors[0]);
      } else if (
        error.message === MESSAGE_ERROR_SECRETCODE_EXISTS ||
        error.message === MESSAGE_ERROR_SECRETCODE_RECENTLY_GENERATED
      ) {
        try {
          await secretCodeRegenerateService(form.email);
          setVisibleCodeValidationModal(true);
          setIsLoading('success');
        } catch (error: any) {
          setIsLoading('failed');
          Alert.alert('Error', error.message ?? '');
        }
      } else {
        setIsLoading('failed');
        Alert.alert('Error', error.message ?? '');
      }
    }
  };

  const styles = StyleSheet.create({
    cont: {},
    cont_terms: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    cont_terms_title: {
      fontSize: fontSize.subtitle,
      fontWeight: 'bold',
      color: colors.subtitle,
      marginHorizontal: 20,
      marginTop: 7,
    },
    cont_error: {
      color: 'red',
      fontSize: fontSize.subtitle,
      width: '94%',
      alignSelf: 'center',
      textAlign: 'left',
      marginTop: 10,
    },
    cont_button: { alignItems: 'center', marginVertical: 5 },
    cont_button_text: { fontSize: fontSize.subtitle, color: colors.subtitle, textAlign: 'center' },
    cont_version: {
      fontSize: fontSize.caption,
      color: colors.caption,
      textAlign: 'right',
      marginTop: 100,
      marginRight: 10,
    },
  });

  return (
    <SharedSafeScreenScrollGlobalComponent titleHeader='Perfil' bottomShown={false}>
      <SharedLoadingModal visible={isLoading === 'checking'} />
      <RegisterScreenCodeValidationModal
        visible={visibleCodeValidationModal}
        form={form}
        onRequestClose={() => setVisibleCodeValidationModal(false)}
      />
      <SharedInputComponent
        label='Email'
        placeholder='Ingrese Email'
        value={form.email.toLocaleLowerCase()}
        errorMessage={error.email}
        autoCapitalize='none'
        keyboardType='email-address'
        onChangeText={(text) => onChange(text, 'email')}
        onEndEditing={(e) => onBlur(e.nativeEvent.text, 'email')}
        left={
          <TextInput.Icon onPress={() => {}} icon={() => <Ionicons name='mail' size={24} color={colors.input} />} />
        }
      />

      <SharedInputComponent
        label='Nombre(s)'
        placeholder='Ingrese Nombre(s)'
        value={form.username}
        errorMessage={error.username}
        onChangeText={(text) => onChange(text, 'username')}
        onEndEditing={(e) => onBlur(e.nativeEvent.text, 'username')}
        left={
          <TextInput.Icon
            onPress={() => {}}
            icon={() => <MaterialCommunityIcons name='account-circle' size={24} color={colors.input} />}
          />
        }
      />

      <SharedInputComponent
        label='Apellidos'
        placeholder='Ingrese Apellidos'
        value={form.lastname}
        errorMessage={error.lastname}
        onChangeText={(text) => onChange(text, 'lastname')}
        onEndEditing={(e) => onBlur(e.nativeEvent.text, 'lastname')}
        left={
          <TextInput.Icon
            onPress={() => {}}
            icon={() => <MaterialCommunityIcons name='account-circle' size={24} color={colors.input} />}
          />
        }
      />

      <SharedInputComponent
        label='Contraseña'
        placeholder='Contraseña'
        value={form.password}
        errorMessage={error.password}
        onChangeText={(text) => onChange(text, 'password')}
        onEndEditing={(e) => onBlur(e.nativeEvent.text, 'password')}
        secureTextEntry={showPassword}
        left={
          <TextInput.Icon
            onPress={() => {}}
            icon={() => <Ionicons name='lock-closed-sharp' size={24} color={colors.input} />}
          />
        }
        right={
          <TextInput.Icon
            onPress={() => setShowPassword(!showPassword)}
            icon={() => <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color={colors.input} />}
          />
        }
      />

      <SharedInputComponent
        label='Confirmar Contraseña'
        placeholder='Confirmar Contraseña'
        value={form.passwordConfirmation}
        errorMessage={error.passwordConfirmation}
        onChangeText={(text) => onChange(text, 'passwordConfirmation')}
        onEndEditing={(e) => onBlur(e.nativeEvent.text, 'passwordConfirmation')}
        secureTextEntry={showPasswordConfirmation}
        left={
          <TextInput.Icon
            onPress={() => {}}
            icon={() => <Ionicons name='lock-closed-sharp' size={24} color={colors.input} />}
          />
        }
        right={
          <TextInput.Icon
            onPress={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
            icon={() => <Ionicons name={showPasswordConfirmation ? 'eye-off' : 'eye'} size={24} color={colors.input} />}
          />
        }
      />

      <View style={styles.cont_terms}>
        <SharedRadioButtonComponent
          checked={form.termsConditions}
          onPress={() => onChange(!form.termsConditions, 'termsConditions')}
        />
        <Text style={styles.cont_terms_title}>Acepta los Términos y Condiciones</Text>
      </View>
      <Text style={styles.cont_error}>{error.termsConditions}</Text>

      <SharedButtonComponent label='Registrar' onPress={handleShowCodeValidationModal} />
      <Text style={styles.cont_version}>MiEcommerce v{version}</Text>
    </SharedSafeScreenScrollGlobalComponent>
  );
}
