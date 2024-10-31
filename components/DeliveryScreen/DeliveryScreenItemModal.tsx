import { useThemeContext } from '@/context';
import { AntDesign } from '@expo/vector-icons';
import { Modal, View, ScrollView, StyleSheet, TouchableOpacity, Text, Alert, ToastAndroid } from 'react-native';
import { SharedButtonComponent } from '../shared';
import { useCallback, useState } from 'react';
import { getOneOrderByIdService, updateOneOrderService } from '@/api';
import LottieView from 'lottie-react-native';
import { lotties } from '@/assets/lotties';
import { useDimensions } from '@/hooks';
import { StatusIsLoadingProps } from '@/interfaces';
import { GetOneOrderByIdServiceSuccessProps } from '@/api/services.admin.interface';
import { useFocusEffect } from 'expo-router';

interface Props {
  visible: boolean;
  onRequestClose: any;
  currentOrderId: string;
  statusOrder: string;
  handleAdminGetAllOrdersByUserIdService: () => void;
}

export const DeliveryScreenItemModal = ({
  visible,
  onRequestClose,
  currentOrderId,
  statusOrder,
  handleAdminGetAllOrdersByUserIdService,
}: Props) => {
  const { colors, fontSize } = useThemeContext();

  const [isLoading, setIsLoading] = useState<StatusIsLoadingProps>('neutral');
  const [order, setOrder] = useState<GetOneOrderByIdServiceSuccessProps>({} as GetOneOrderByIdServiceSuccessProps);

  const { deviceType } = useDimensions();

  const handleGetOneOrderByIdService = async () => {
    try {
      setIsLoading('checking');
      setOrder({} as GetOneOrderByIdServiceSuccessProps);
      const response = await getOneOrderByIdService(currentOrderId);
      setOrder(response);
      setIsLoading('success');
    } catch (error: any) {
      setIsLoading('failed');
      if (error.name === 'Error') Alert.alert('Error', error.message ?? '');
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleGetOneOrderByIdService();
    }, [currentOrderId])
  );

  const handleUpdateOneOrderService = async (status: 'Pedido recibido' | 'Preparando' | 'En camino' | 'Entregado') => {
    try {
      setIsLoading('checking');
      await updateOneOrderService(currentOrderId, { status });
      if (deviceType !== 'android') {
        Alert.alert('Aviso', '¡El pedido fue cambiado de estado exitosamente!', [
          {
            text: 'OK',
            onPress: () => {
              handleAdminGetAllOrdersByUserIdService();
              onRequestClose();
            },
          },
        ]);
      } else {
        ToastAndroid.show('¡El pedido fue cambiado de estado exitosamente!', ToastAndroid.LONG);
        handleAdminGetAllOrdersByUserIdService();
        onRequestClose();
      }
      setIsLoading('success');
    } catch (error: any) {
      setIsLoading('failed');
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
    cont_modal_scroll: { paddingHorizontal: 30, marginBottom: 20 },
    cont_modal_scroll_text: {
      fontSize: fontSize.subtitle,
      color: colors.subtitle,
      fontWeight: '300',
      marginVertical: 5,
    },
    cont_modal_item_grid: { width: '80%', marginVertical: 5, alignSelf: 'center' },
  });

  return (
    <Modal visible={visible} transparent onRequestClose={onRequestClose}>
      <View style={styles.cont}>
        <View style={styles.cont_modal}>
          <TouchableOpacity style={styles.cont_modal_close} onPress={onRequestClose}>
            <AntDesign name='closecircle' size={36} color={colors.colorBorderIconInput} />
          </TouchableOpacity>
          {isLoading === 'checking' ? (
            <LottieView
              source={lotties.checking}
              style={{ width: 150, height: 150, alignSelf: 'center' }}
              autoPlay
              loop
            />
          ) : (
            <ScrollView style={styles.cont_modal_scroll}>
              <Text style={styles.cont_modal_scroll_text}>ID del Pedido: {order._id}</Text>
              <Text style={styles.cont_modal_scroll_text}>Precio total del Pedido: {order.totalAmount}</Text>
              <Text style={styles.cont_modal_scroll_text}>ID del usuario: {order.userId}</Text>

              <Text style={styles.cont_modal_scroll_text}></Text>

              <Text style={styles.cont_modal_scroll_text}>Cambiar estado del pedido:</Text>

              {(
                ['Pedido recibido', 'Preparando', 'En camino', 'Entregado'] as (
                  | 'Pedido recibido'
                  | 'Preparando'
                  | 'En camino'
                  | 'Entregado'
                )[]
              ).map((item, _) => (
                <View style={styles.cont_modal_item_grid} key={item}>
                  <SharedButtonComponent
                    key={item}
                    label={item}
                    onPress={() => handleUpdateOneOrderService(item)}
                    disabled={statusOrder === item}
                  />
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
};
