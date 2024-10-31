import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDimensions } from '../../hooks/useDimensions';
import { useActionBurguerContext } from '../../context';

export const SharedNoConectionAdviceComponent = () => {
  const { setStatusInternet} = useActionBurguerContext();

  const [typeConection, setTypeConection] = useState('');
  const [statusConection, setStatusConection] = useState(false);
  const [statusIsInternetReachable, setStatusIsInternetReachable] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const { W, deviceType } = useDimensions();
  const interpolatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, deviceType === 'ios' ? 20 : 20],
  });

  const toggleComponentOpen = () => {
    setIsOpen(!isOpen);
    Animated.timing(animation, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const toggleComponentClose = () => {
    setIsOpen(!isOpen);
    Animated.timing(animation, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setStatusIsInternetReachable(state.isInternetReachable ?? false);
      setTypeConection(state.type);
      setStatusConection(state.isConnected ?? false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if ((typeConection === 'wifi' || typeConection === 'cellular') && statusConection === true && statusIsInternetReachable === true) {
      toggleComponentClose();
      setStatusInternet('connected');
    } else {
      toggleComponentOpen();
      setStatusInternet('disconnected');
      
    }
  }, [typeConection, statusConection, statusIsInternetReachable]);

  const styles = StyleSheet.create({
    cont: { backgroundColor: 'red' },
    cont_animate: { zIndex: 99, width: W, alignItems: 'center', justifyContent: 'flex-end' },
    cont_animate_scroll: { zIndex: 999, borderColor: 'black', width: W, marginTop: deviceType === 'ios' ? 0 : 0 },
    cont_animate_scroll_text: { color: 'white', fontWeight: 'bold', fontSize: 15, textAlign: 'center' },
  });

  return (
    <GestureHandlerRootView style={styles.cont}>
      <Animated.View style={[styles.cont_animate, { height: interpolatedHeight }]}>
        <Text style={styles.cont_animate_scroll_text}>No tienes conexión a internet</Text>
      </Animated.View>
    </GestureHandlerRootView>
  );
};
