import { useEffect, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SharedInputComponent } from './SharedInputComponent';
import { useDebouncedValue } from '@/hooks';
import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useThemeContext } from '@/context';

interface Props {
  onDebounce: (value: string) => void;
  style?: StyleProp<ViewStyle>;
  placeholder?: string;
  setIsLoading: (value: 'checking' | 'success' | 'failed' | 'neutral') => void;
}

export const SharedSearchInputComponent = ({
  style,
  placeholder = 'Buscar Curso',
  onDebounce,
  setIsLoading,
}: Props) => {
  const { colors } = useThemeContext();
  const [textValue, setTextValue] = useState('');

  const deboncedValue = useDebouncedValue(textValue, undefined, () => setIsLoading('checking'));

  useEffect(() => {
    onDebounce(deboncedValue);
  }, [deboncedValue]);

  return (
    <SharedInputComponent
      label=''
      placeholder={placeholder}
      autoCapitalize='none'
      value={textValue}
      onChangeText={setTextValue}
      right={
        <TextInput.Icon
          onPress={() => {}}
          icon={() => <Ionicons name='search' size={24} color={colors.colorPlaceholderText} />}
        />
      }
    />
  );
};
