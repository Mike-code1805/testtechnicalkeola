import { useNavigation } from '@react-navigation/native';

export const useNavigationHook = () => {
  // const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const navigation = useNavigation<any>();

  return navigation;
};
