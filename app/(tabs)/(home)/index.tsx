import LottieView from 'lottie-react-native';
import { SharedSafeScreenScrollGlobalComponent, SharedSearchInputComponent } from '@/components/shared';
import { useEffect, useState } from 'react';
import { useProductContext, useThemeContext } from '@/context';
import { GetAllProductsServiceSuccessProps } from '@/api/services.product.interface';
import { HomeScreenProductsComponent } from '@/components/HomeScreen';
import { lotties } from '@/assets/lotties';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCartStore } from '@/store';
import { useNavigationHook } from '@/hooks';

export default function HomeScreen() {
  const { colors, fontSize, iconSize } = useThemeContext();
  const { productData, handleGetAllProductsService, isLoading, setIsLoading } = useProductContext();
  const cart = useCartStore((state) => state.cart);
  const [searchData, setSearchData] = useState('');
  const [dataFiltered, setDataFiltered] = useState<GetAllProductsServiceSuccessProps[]>([]);

  const navigation = useNavigationHook();

  useEffect(() => {
    setIsLoading('success');
    if (searchData.length === 0) return;

    if (isNaN(Number(searchData))) {
      setDataFiltered(
        productData.filter(
          (data) =>
            data.title.toLocaleLowerCase().includes(searchData.toLocaleLowerCase()) ||
            data.description.toLocaleLowerCase().includes(searchData.toLocaleLowerCase())
        )
      );
    } else {
      const dataCardById = productData.find((data) => data.price.toString() === searchData);
      setDataFiltered(dataCardById ? [dataCardById] : []);
    }
  }, [searchData]);

  const onChangeText = (text: string) => {
    if (text !== '.' && text !== '$') setSearchData(text);
  };

  const styles = StyleSheet.create({
    cont: { flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
    cont_top: { flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' },
    cont_top_search: { width: '80%', justifyContent: 'center', alignItems: 'center' },
    cont_top_icon: { width: '20%', justifyContent: 'center', alignItems: 'center' },
    cont_top_icon_counter: {
      position: 'absolute',
      top: -10,
      right: 10,
      padding: 5,
      borderRadius: 50,
      zIndex: 99,
      backgroundColor: colors.colorBackgroundHeader,
    },
    cont_top_icon_counter_text: { fontSize: fontSize.caption, color: colors.caption, fontWeight: '800' },
    cont_top_icon_cart: { top: 0, right: 0 },
  });

  return (
    <SharedSafeScreenScrollGlobalComponent titleHeader='Mis Curso' onRefresh={handleGetAllProductsService}>
      <View style={styles.cont_top}>
        <View style={styles.cont_top_search}>
          <SharedSearchInputComponent
            placeholder='Buscar Producto'
            onDebounce={(text) => onChangeText(text)}
            setIsLoading={() => setIsLoading('checking')}
          />
        </View>

        <TouchableOpacity style={styles.cont_top_icon} onPress={() => navigation.navigate('CartScreen')}>
          <View style={styles.cont_top_icon_counter}>
            <Text style={styles.cont_top_icon_counter_text}>{cart.length}</Text>
          </View>
          <MaterialCommunityIcons
            style={styles.cont_top_icon_cart}
            name='cart'
            size={iconSize.withoutText}
            color={colors.title}
          />
        </TouchableOpacity>
      </View>

      {isLoading === 'checking' ? (
        <LottieView
          autoPlay
          style={{ width: 144, height: 144, alignSelf: 'center', marginTop: 20 }}
          source={lotties.checking}
          loop
        />
      ) : (
        <HomeScreenProductsComponent data={searchData === '' ? productData : dataFiltered} />
      )}
    </SharedSafeScreenScrollGlobalComponent>
  );
}
