import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useThemeContext } from '@/context';
import { SharedButtonComponent } from '../shared';
import { GetAllOrdersByUserIdServiceSuccessProps } from '@/api/services.order.interface';

interface Props {
  orderData: GetAllOrdersByUserIdServiceSuccessProps[];
}

export const ShopScreenProductsComponent = ({ orderData }: Props) => {
  const { colors, fontSize, iconSize } = useThemeContext();

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
      {orderData.map((item, _) => (
        <View style={styles.cont_product} key={item._id}>
          <View style={styles.cont_product_item}>
            <Text style={styles.cont_product_item_label}>ID del producto: </Text>
            <Text style={styles.cont_product_item_value}>{item._id}</Text>
          </View>
          <View style={styles.cont_product_item}>
            <Text style={styles.cont_product_item_label}>Número de orden del producto: </Text>
            <Text style={styles.cont_product_item_value}>#{item.userOrderNumber}</Text>
          </View>

          <View style={styles.cont_product_item}>
            <View style={styles.cont_product_item_info}>
              <SharedButtonComponent disabled onPress={() => {}} label={'ESTADO: ' + item.status} />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};
