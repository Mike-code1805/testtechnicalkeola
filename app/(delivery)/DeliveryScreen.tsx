import { adminGetAllOrdersByUserIdService } from '@/api/services.admin';
import { AdminGetAllOrdersByUserIdServiceSuccessProps } from '@/api/services.admin.interface';
import { DeliveryScreenItemModal } from '@/components/DeliveryScreen';
import { SharedButtonComponent, SharedLoadingModal, SharedSafeScreenScrollGlobalComponent } from '@/components/shared';
import { useThemeContext } from '@/context';
import { StatusIsLoadingProps } from '@/interfaces';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ShopScreen() {
  const { colors, fontSize } = useThemeContext();

  const [visibleModal, setVisibleModal] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState('');
  const [currentStatusOrder, setCurrentStatusOrder] = useState('');

  const [isLoading, setIsLoading] = useState<StatusIsLoadingProps>('neutral');
  const [orderData, setOrderData] = useState<AdminGetAllOrdersByUserIdServiceSuccessProps[]>([]);

  const handleAdminGetAllOrdersByUserIdService = async () => {
    try {
      setIsLoading('checking');
      setOrderData([]);
      const response = await adminGetAllOrdersByUserIdService();
      setOrderData(response);
      setIsLoading('success');
    } catch (error) {
      setIsLoading('failed');
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleAdminGetAllOrdersByUserIdService();
    }, [])
  );

  const styles = StyleSheet.create({
    cont: { flex: 1 },
    cont_order: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      borderColor: colors.colorBackgroundHeader,
      borderWidth: 5,
      padding: 10,
      margin: 10,
      borderRadius: 20,
    },
    cont_order_item: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 5,
    },
    cont_order_item_label: {
      width: '50%',
      fontSize: fontSize.subtitle,
      color: colors.subtitle,
      fontWeight: '500',
      textAlign: 'right',
    },
    cont_order_item_value: {
      width: '50%',
      fontSize: fontSize.subtitle,
      color: colors.subtitle,
      fontWeight: '300',
      textAlign: 'center',
    },
    cont_order_item_info: { width: '70%' },
    cont_order_item_increment: { width: '20%' },
  });

  return (
    <SharedSafeScreenScrollGlobalComponent
      titleHeader='Asistencia'
      bottomShown={false}
      onRefresh={handleAdminGetAllOrdersByUserIdService}
    >
      <SharedLoadingModal visible={isLoading === 'checking'} />
      <DeliveryScreenItemModal
        visible={visibleModal}
        onRequestClose={() => setVisibleModal(false)}
        currentOrderId={currentOrderId}
        statusOrder={currentStatusOrder}
        handleAdminGetAllOrdersByUserIdService={handleAdminGetAllOrdersByUserIdService}
      />

      {orderData.map((item, _) => (
        <View style={styles.cont_order} key={item._id}>
          <View style={styles.cont_order_item}>
            <Text style={styles.cont_order_item_label}>ID del pedido: </Text>
            <Text style={styles.cont_order_item_value}>{item._id}</Text>
          </View>
          <View style={styles.cont_order_item}>
            <Text style={styles.cont_order_item_label}>Numero de orden del pedido: </Text>
            <Text style={styles.cont_order_item_value}>{item.userOrderNumber}</Text>
          </View>
          <View style={styles.cont_order_item}>
            <View style={styles.cont_order_item_info}>
              <SharedButtonComponent disabled onPress={() => {}} label={'ESTADO: ' + item.status} />
            </View>
            <View style={styles.cont_order_item_increment}>
              <SharedButtonComponent
                onPress={() => {
                  setCurrentOrderId(item._id);
                  setCurrentStatusOrder(item.status);
                  setVisibleModal(true);
                }}
                label='Ver'
              />
            </View>
          </View>
        </View>
      ))}
    </SharedSafeScreenScrollGlobalComponent>
  );
}
