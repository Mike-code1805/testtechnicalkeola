import { Platform, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useDimensions = () => {
  const { width: W, height: H } = useWindowDimensions();
  const { top } = useSafeAreaInsets();
  const deviceType = Platform.OS;
  return {
    W,
    H,
    top,
    deviceType,
  };
};
