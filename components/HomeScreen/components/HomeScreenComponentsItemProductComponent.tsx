import { GetAllProductsServiceSuccessProps } from '@/api/services.product.interface';
import { SharedButtonComponent } from '@/components/shared';
import { useThemeContext } from '@/context';
import { useCartStore } from '@/store';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';

interface Props {
  item: GetAllProductsServiceSuccessProps;
}

export const HomeScreenComponentsItemProductComponent = ({ item }: Props) => {
  const { colors, fontSize, iconSize } = useThemeContext();
  const addItem = useCartStore(state => state.addItem);

  const styles = StyleSheet.create({
    cont: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      padding: 10,
      margin: 10,
      borderRadius: 20,
      backgroundColor: colors.colorBackgroundHeader,
    },
    cont_title: { fontSize: fontSize.title, color: colors.title, fontWeight: '500' },
    cont_data: { flex: 1, display: 'flex', alignItems: 'center', flexDirection: 'row' },
    cont_data_description: {
      fontSize: fontSize.caption,
      color: colors.caption,
      fontWeight: '300',
      textAlign: 'center',
      marginBottom: 15,
    },
    cont_data_left: { flex: 1 },
    cont_data_left_item: { flex: 1, flexDirection: 'row', marginVertical: 2 },
    cont_data_left_item_text: { fontSize: fontSize.caption, color: colors.caption, fontWeight: '300', marginLeft: 5 },

    cont_data_middle: { flex: 1 },
    cont_data_middle_item: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 5,
    },
    cont_data_middle_item_text: { fontSize: fontSize.subtitle, color: colors.caption, fontWeight: '600' },
    cont_data_right: { flex: 1, alignItems: 'center' },
    cont_data_right_image: {
      width: 80,
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
      resizeMode: 'contain',
    },
  });

  return (
    <View style={styles.cont}>
      <Text style={styles.cont_title}>{item.title}</Text>
      <Text style={styles.cont_data_description}>{item.description}</Text>
      <View style={styles.cont_data}>
        <View style={styles.cont_data_left}>
          <View style={styles.cont_data_left_item}>
            <Entypo name='box' size={iconSize.withText / 2} color={colors.caption} />
            <Text style={styles.cont_data_left_item_text}>{item.inventory}</Text>
          </View>
          <View style={styles.cont_data_left_item}>
            <Entypo name='paper-plane' size={iconSize.withText / 2} color={colors.caption} />
            {item.sendtype.map((item) => (
              <Text key={item} style={styles.cont_data_left_item_text}>
                {item}
              </Text>
            ))}
          </View>
          <View style={styles.cont_data_left_item}>
            <Entypo name='location' size={iconSize.withText / 2} color={colors.caption} />
            <Text style={styles.cont_data_left_item_text}>{item.location}</Text>
          </View>
        </View>
        <View style={styles.cont_data_middle}>
          <View style={styles.cont_data_middle_item}>
            {item.rating > 0 &&
              Array.from({ length: 5 }).map((_, index) => (
                <MaterialCommunityIcons
                  key={index}
                  name={index < item.rating ? 'star' : 'star-outline'}
                  size={iconSize.withText / 2}
                  color={colors.caption}
                />
              ))}
          </View>
          <View style={styles.cont_data_middle_item}>
            <Text style={styles.cont_data_middle_item_text}>S/ {item.price.toFixed(2)}</Text>
          </View>
          <View style={styles.cont_data_middle_item}>
            <SharedButtonComponent
              onPress={() => addItem(item)}
              label='Al Carrito'
              iconRight={<Entypo name='shopping-cart' size={iconSize.withText / 2} color={colors.colorTextButton} />}
            />
          </View>
        </View>
        <View style={styles.cont_data_right}>
          <Image style={styles.cont_data_right_image} source={{ uri: item.images[0] }} />
        </View>
      </View>
    </View>
  );
};
