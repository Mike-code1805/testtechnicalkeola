import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';
import React from 'react';
import { useThemeContext } from '@/context';
import { useDimensions } from '@/hooks';

interface Props {
  visible: boolean;
  onRequestClose?: any;
}

export const SharedLoadingModal = ({ visible, onRequestClose }: Props) => {
  const { colors } = useThemeContext();

  const { W, H } = useDimensions();

  const styles = StyleSheet.create({
    cont: { backgroundColor: '#000000aa', flex: 1, justifyContent: 'center' },
    cont_scroll: {
      borderRadius: 5,
      backgroundColor: colors.colorBackgroundScreen,
      width: W * 0.2,
      height: H * 0.08,
      alignSelf: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <Modal visible={visible} transparent onRequestClose={onRequestClose}>
      <View style={styles.cont}>
        <View style={styles.cont_scroll}>
          <ActivityIndicator size='large' color='#00a680' />
        </View>
      </View>
    </Modal>
  );
};
