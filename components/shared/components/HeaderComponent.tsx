import { StyleSheet, Text, View } from 'react-native';
import { useThemeContext } from '@/context';
import { useDimensions } from '@/hooks';

interface Props {
  text?: string;
  children?: React.JSX.Element;
}

export const HeaderComponent = ({ text = 'Inicio', children }: Props) => {
  const { colors, fontSize } = useThemeContext();
  const { top } = useDimensions();

  const styles = StyleSheet.create({
    cont: { paddingHorizontal: 12, backgroundColor: colors.colorBackgroundHeader },
    cont_text: { color: colors.colorMain, marginVertical: 5, fontSize: fontSize.title },
  });

  return <View style={styles.cont}>{children ? children : <Text style={styles.cont_text}>{text}</Text>}</View>;
};
