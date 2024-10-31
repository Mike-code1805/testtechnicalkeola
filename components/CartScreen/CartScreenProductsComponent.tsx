import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useThemeContext } from '@/context';
import { useCartStore } from '@/store';
import { SharedButtonComponent } from '../shared';
import { Ionicons } from '@expo/vector-icons';

export const CartScreenProductsComponent = () => {
  const { colors, fontSize, iconSize } = useThemeContext();

  const cart = useCartStore((state) => state.cart);

  const removeItem = useCartStore((state) => state.removeItem);
  const incrementItem = useCartStore((state) => state.incrementItem);
  const decrementItem = useCartStore((state) => state.decrementItem);

  const styles = StyleSheet.create({
    cont: { flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
    cont_product: {
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
    cont_product_item: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 5,
    },
    cont_product_item_label: {
      width: '50%',
      fontSize: fontSize.subtitle,
      color: colors.subtitle,
      fontWeight: '500',
      textAlign: 'right',
    },
    cont_product_item_value: {
      width: '50%',
      fontSize: fontSize.subtitle,
      color: colors.subtitle,
      fontWeight: '300',
      textAlign: 'center',
    },
    cont_product_item_decrement: { width: '15%' },
    cont_product_item_info: { width: '60%' },
    cont_product_item_increment: { width: '15%' },
    cont_product_item_remove: { width: iconSize.withoutText * 2, alignSelf: 'flex-end' },
  });

  return (
    <View style={styles.cont}>
      {cart.map((item, _) => (
        <View style={styles.cont_product} key={item.item.id}>
          <View style={styles.cont_product_item}>
            <Text style={styles.cont_product_item_label}>Nombre del producto: </Text>
            <Text style={styles.cont_product_item_value}>{item.item.title}</Text>
          </View>
          <View style={styles.cont_product_item}>
            <Text style={styles.cont_product_item_label}>N° cantidad: </Text>
            <Text style={styles.cont_product_item_value}>{item.counter}</Text>
          </View>
          <View style={styles.cont_product_item}>
            <View style={styles.cont_product_item_decrement}>
              <SharedButtonComponent
                onPress={() => decrementItem(item.item.id)}
                label=''
                iconLeft={<Ionicons name='remove' size={iconSize.withoutText} color={colors.colorTextButton} />}
              />
            </View>
            <View style={styles.cont_product_item_info}>
              <SharedButtonComponent
                onPress={() => {}}
                label={'Subtotal: S/ ' + (item.counter * item.item.price).toFixed(2)}
              />
            </View>
            <View style={styles.cont_product_item_increment}>
              <SharedButtonComponent
                onPress={() => incrementItem(item.item.id)}
                label=''
                iconLeft={<Ionicons name='add' size={iconSize.withoutText} color={colors.colorTextButton} />}
              />
            </View>
          </View>
          <View style={styles.cont_product_item_remove}>
            <SharedButtonComponent
              onPress={() => removeItem(item.item.id)}
              label=''
              iconLeft={<Ionicons name='trash' size={iconSize.withoutText} color={colors.colorTextButton} />}
            />
          </View>
        </View>
      ))}
    </View>
  );
};
