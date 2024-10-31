import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { HomeScreenComponentsItemProductComponent } from './components';
import { GetAllProductsServiceSuccessProps } from '@/api/services.product.interface';
import LottieView from 'lottie-react-native';
import { lotties } from '@/assets/lotties';
import { useThemeContext } from '@/context';

interface Props {
  data: GetAllProductsServiceSuccessProps[];
}

export const HomeScreenProductsComponent = ({ data }: Props) => {
  const { colors, fontSize } = useThemeContext();

  const styles = StyleSheet.create({
    cont: { flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
    cont_notfound: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    cont_notfound_text: { fontSize: fontSize.title, fontWeight: 'bold', color: colors.title },
  });

  return (
    <View style={styles.cont}>
      {data.length === 0 ? (
        <View style={styles.cont_notfound}>
          <LottieView source={lotties.notfound} style={{ width: 250, height: 250 }} autoPlay loop />
          <Text style={styles.cont_notfound_text}>No hay Productos Disponibles</Text>
        </View>
      ) : (
        data.map((item, _) => (
          <HomeScreenComponentsItemProductComponent key={item.id} item={item} />
        ))
      )}
    </View>
  );
};
