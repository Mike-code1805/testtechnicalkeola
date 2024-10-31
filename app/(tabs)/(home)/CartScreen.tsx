import { createOneOrderService } from '@/api';
import { SharedButtonComponent, SharedLoadingModal, SharedSafeScreenScrollGlobalComponent } from '@/components/shared';
import { CartScreenProductsComponent } from '@/components/CartScreen';
import { useThemeContext } from '@/context';
import { useDimensions, useNavigationHook } from '@/hooks';
import { StatusIsLoadingProps } from '@/interfaces';
import { useCartStore } from '@/store';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ToastAndroid } from 'react-native';

export default function CartScreen() {
  const { colors, fontSize, iconSize } = useThemeContext();
  const cart = useCartStore((state) => state.cart);

  const clearCart = useCartStore((state) => state.clearCart);

  const [isLoading, setIsLoading] = useState<StatusIsLoadingProps>('neutral');

  const navigation = useNavigationHook();
  const { deviceType } = useDimensions();

  const handleCreateOneOrderService = async () => {
    try {
      setIsLoading('checking');
      await createOneOrderService({
        items: cart.map((item) => ({ productId: item.item.id, counter: item.counter })),
        totalAmount: cart.reduce((a, b) => a + b.counter * b.item.price, 0),
      });
      if (deviceType !== 'android') {
        Alert.alert('Aviso', 'El pedido fue recibido exitosamente!', [
          { text: 'OK', onPress: () => navigation.navigate('index') },
        ]);
      } else {
        ToastAndroid.show('¡El pedido fue recibido exitosamente!', ToastAndroid.LONG);
        navigation.navigate('index');
      }
      clearCart();
      setIsLoading('success');
    } catch (error) {
      setIsLoading('failed');
    }
  };

  const styles = StyleSheet.create({
    cont: { flex: 1 },
    cont_title: { fontSize: fontSize.title, color: colors.title, fontWeight: '500', textAlign: 'center' },

    cont_total: { fontSize: fontSize.title, color: colors.title, fontWeight: '800', textAlign: 'right', margin: 10 },
    cont_buttons: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 10 },
    cont_buttons_clearcart: { width: '50%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    cont_buttons_clearcart_label: { fontSize: fontSize.subtitle, color: colors.subtitle, fontWeight: '300' },
    cont_buttons_checkout: { width: '50%' },
  });

  return (
    <SharedSafeScreenScrollGlobalComponent titleHeader='Asistencia'>
      <SharedLoadingModal visible={isLoading === 'checking'} />
      <Text style={styles.cont_title}>RESUMEN DE COMPRA</Text>

      <CartScreenProductsComponent />

      <Text style={styles.cont_total}>
        Total: S/ {cart.reduce((a, b) => a + b.counter * b.item.price, 0).toFixed(2)}
      </Text>
      <View style={styles.cont_buttons}>
        <TouchableOpacity style={styles.cont_buttons_clearcart} onPress={clearCart} disabled={cart.length === 0}>
          <Ionicons name='close' size={iconSize.withoutText} color={colors.colorTextButton} />
          <Text style={styles.cont_buttons_clearcart_label}>Limpiar Carrito</Text>
        </TouchableOpacity>
        <View style={styles.cont_buttons_checkout}>
          <SharedButtonComponent
            onPress={handleCreateOneOrderService}
            label='Confirmar'
            iconLeft={
              <Ionicons
                name='checkmark'
                size={iconSize.withoutText}
                color={cart.length === 0 ? colors.colorTextButtonDisabled : colors.colorTextButton}
              />
            }
            disabled={cart.length === 0}
          />
        </View>
      </View>
    </SharedSafeScreenScrollGlobalComponent>
  );
}
