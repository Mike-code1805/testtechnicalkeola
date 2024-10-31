import { useAuthContext, useThemeContext } from '@/context';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Modal, View, ScrollView, StyleSheet, TouchableOpacity, Text, Alert, ToastAndroid } from 'react-native';
import { SharedButtonComponent, SharedInputComponent } from '../shared';
import { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { secretCodeValidateService } from '@/api';
import LottieView from 'lottie-react-native';
import { lotties } from '@/assets/lotties';
import { useDimensions, useNavigationHook } from '@/hooks';

interface Props {
  visible: boolean;
  onRequestClose: any;
  form: {
    username: string;
    lastname: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    termsConditions: boolean;
  };
}

export const RegisterScreenCodeValidationModal = ({ visible, onRequestClose, form }: Props) => {
  const { colors, fontSize } = useThemeContext();
  const { handleAuthSignupUserService } = useAuthContext();

  const [isLoading, setIsLoading] = useState('neutral');
  const [code, setCode] = useState('');

  const navigation = useNavigationHook();
  const { deviceType } = useDimensions();
  // TODO check ToastAndroid

  const handleSecretCodeValidateService = async () => {
    try {
      setIsLoading('checking');
      await secretCodeValidateService({ email: form.email, code: parseFloat(code) });
      const response = await handleAuthSignupUserService(form);
      setIsLoading('success');
      onRequestClose();
      if (deviceType !== 'android') {
        if (response === 'normal') navigation.replace('(tabs)');
        if (response === 'deliveryman') navigation.replace('(delivery)');
      } else {
        ToastAndroid.show('¡Tu cuenta fue registrada exitosamente!', ToastAndroid.LONG);
        if (response === 'normal') navigation.replace('(tabs)');
        if (response === 'deliveryman') navigation.replace('(delivery)');
      }
    } catch (error: any) {
      setIsLoading('failed');
      if (error.name === 'Error') Alert.alert('Error', error.message ?? '');
    }
  };

  const styles = StyleSheet.create({
    cont: { backgroundColor: '#000000aa', flex: 1 },
    cont_modal: {
      borderRadius: 20,
      backgroundColor: colors.colorBackgroundScreen,
      marginVertical: 200,
      marginHorizontal: 30,
      paddingHorizontal: 5,
    },
    cont_modal_close: {
      alignItems: 'flex-end',
      padding: 10,
    },
    cont_modal_scroll: { paddingHorizontal: 30 },
    cont_modal_scroll_text: { fontSize: fontSize.subtitle, color: colors.subtitle, fontWeight: '500' },
    cont_modal_item_grid: { width: 130 },
  });

  return (
    <Modal visible={visible} transparent onRequestClose={onRequestClose}>
      <View style={styles.cont}>
        <View style={styles.cont_modal}>
          <TouchableOpacity style={styles.cont_modal_close} onPress={onRequestClose}>
            <AntDesign name='closecircle' size={36} color={colors.colorBorderIconInput} />
          </TouchableOpacity>
          <ScrollView style={styles.cont_modal_scroll}>
            <Text style={styles.cont_modal_scroll_text}>Ingresa el código de validación enviada al correo:</Text>
            <SharedInputComponent
              borderLeft
              value={code}
              placeholder='Ingrese el código'
              onChangeText={(text) => setCode(text)}
              keyboardType='number-pad'
              maxLength={6}
              left={
                <TextInput.Icon
                  onPress={() => {}}
                  icon={() => <Ionicons name='lock-closed-sharp' size={24} color={colors.input} />}
                />
              }
            />
          </ScrollView>
          {isLoading === 'checking' ? (
            <LottieView
              autoPlay
              style={{ width: 60, height: 60, alignSelf: 'center' }}
              source={lotties.checking}
              loop
            />
          ) : (
            <SharedButtonComponent label='Aceptar' onPress={handleSecretCodeValidateService} />
          )}
        </View>
      </View>
    </Modal>
  );
};
