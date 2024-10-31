import { Alert, StyleSheet, Text, ToastAndroid, TouchableOpacity } from 'react-native';

import {
  SharedButtonComponent,
  SharedInputComponent,
  SharedLoadingModal,
  SharedSafeScreenScrollGlobalComponent,
} from '@/components/shared';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthContext, useThemeContext } from '@/context';
import { TextInput } from 'react-native-paper';
import { useState } from 'react';
import { useDimensions, useForm, useNavigationHook } from '@/hooks';
import { singInUserSchema } from '@/schema';
import Constants from 'expo-constants';
import { StatusIsLoadingProps } from '@/interfaces';
import { tokenmessageCreateService } from '@/api';
import messaging from '@react-native-firebase/messaging';

export default function LoginScreen() {
  const { colors, fontSize } = useThemeContext();
  const { handleAuthLoginUserService } = useAuthContext();
  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState<StatusIsLoadingProps>('neutral');
  const version = Constants.expoConfig?.version ?? '';

  const { form, error, onChange, onBlur, setErrors } = useForm({ email: '', password: '' }, singInUserSchema);
  const navigation = useNavigationHook();
  const { deviceType } = useDimensions();

  const registerForPushNotifications = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Permiso para notificaciones habilitado.');

      const token = await messaging().getToken();
      console.log('Token FCM:', token);

      await tokenmessageCreateService({ token });
    }
  };

  const handleLogin = async () => {
    try {
      setIsLoading('checking');
      await singInUserSchema.validate(form, { abortEarly: false });
      const response = await handleAuthLoginUserService(form);
      setIsLoading('success');
      if (deviceType !== 'android') {
        if (response === 'normal') navigation.replace('(tabs)');
        if (response === 'deliveryman') navigation.replace('(delivery)');
      } else {
        ToastAndroid.show('¡Iniciaste sesión exitosamente!', ToastAndroid.LONG);
        if (response === 'normal') navigation.replace('(tabs)');
        if (response === 'deliveryman') navigation.replace('(delivery)');
      }

      await registerForPushNotifications();
    } catch (error: any) {
      setIsLoading('failed');
      if (error.name === 'ValidationError') {
        const formErrors: any = {};
        error.inner.forEach((error: any) => {
          formErrors[error.path] = error.message;
        });
        setErrors(formErrors);
        Alert.alert('Error', error.errors[0]);
      } else if (error.name === 'Error') Alert.alert('Error', error.message ?? '');
    }
  };

  const styles = StyleSheet.create({
    cont: { flex: 1 },
    cont_icon: { alignSelf: 'center', marginTop: 10 },
    cont_text: { fontSize: fontSize.title, color: colors.title, fontWeight: 'bold', textAlign: 'center' },
    cont_button: { alignItems: 'center', marginVertical: 5 },
    cont_button_text: { fontSize: fontSize.subtitle, color: colors.subtitle, textAlign: 'center' },
    cont_version: {
      fontSize: fontSize.caption,
      color: colors.caption,
      textAlign: 'right',
      marginTop: 150,
      marginRight: 10,
    },
  });

  return (
    <SharedSafeScreenScrollGlobalComponent titleHeader='' bottomShown={false}>
      <SharedLoadingModal visible={isLoading === 'checking'} />

      <MaterialCommunityIcons style={styles.cont_icon} name='account-circle' size={121} color={colors.colorMain} />
      <Text style={styles.cont_text}>Login</Text>
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
      <SharedButtonComponent label='Ingresar' onPress={handleLogin} />

      <TouchableOpacity style={styles.cont_button} onPress={() => navigation.navigate('RegisterScreen')}>
        <Text style={styles.cont_button_text}>Crear Cuenta</Text>
      </TouchableOpacity>
      <Text style={styles.cont_version}>MiEcommerce v{version}</Text>
    </SharedSafeScreenScrollGlobalComponent>
  );
}
