import React, { useEffect, useRef, useState } from 'react';
import { Animated, KeyboardAvoidingView, RefreshControl, SafeAreaView, StyleSheet } from 'react-native';
import { useDimensions } from '../../hooks/useDimensions';
import { SharedTabbarBottomComponent } from './components';
import { SharedNoConectionAdviceComponent } from './SharedNoConectionAdviceComponent';
import { useActionBurguerContext, useThemeContext } from '@/context';

interface Props {
  children: any;
  keyboardShouldPersistTaps?: boolean | 'never' | 'always' | 'handled' | undefined;
  titleHeader: string | React.JSX.Element;
  onEndReached?: (info: { distanceFromEnd: number }) => void;
  onRefresh?: () => void;
  onRefreshHome?: () => void;
  bottomShown?: boolean;
}

export const SharedSafeScreenScrollGlobalComponent = ({
  children,
  keyboardShouldPersistTaps = 'handled',
  titleHeader,
  bottomShown = true,
  onRefresh,
  onRefreshHome,
  onEndReached,
}: Props) => {
  const { colors } = useThemeContext();
  const { statusInternet } = useActionBurguerContext();
  const [refreshing, setRefreshing] = useState(false);

  const { H, top, deviceType } = useDimensions();

  const CONTAINER_HEIGHT = 50 * 2;

  const scrollY = useRef(new Animated.Value(0)).current;
  const offsetAnimation = useRef(new Animated.Value(0)).current;

  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp',
      }),
      offsetAnimation
    ),
    0,
    CONTAINER_HEIGHT
  );

  var _clampedScrollValue = 0;
  var _offsetValue = 0;
  var _scrollValue = 0;

  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const diff = value - _offsetValue;
      _scrollValue = value;
      _clampedScrollValue = Math.min(Math.max(_clampedScrollValue * diff, 0), CONTAINER_HEIGHT);
    });
    offsetAnimation.addListener(({ value }) => {
      _offsetValue = value;
    });
  }, [clampedScroll]);

  var scrollEndTimer: any = null;

  const onMomentumScrollBegin = () => {
    clearTimeout(scrollEndTimer);
  };

  const onMomentumScrollEnd = () => {
    const toValue =
      _scrollValue > CONTAINER_HEIGHT && _clampedScrollValue > CONTAINER_HEIGHT / 2
        ? _offsetValue + CONTAINER_HEIGHT
        : _offsetValue - CONTAINER_HEIGHT;

    Animated.timing(offsetAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const onScrollEndDrag = () => {
    scrollEndTimer = setTimeout(onMomentumScrollEnd, 250);
  };

  const headerTraslate = clampedScroll.interpolate({
    inputRange: [0, CONTAINER_HEIGHT],
    outputRange: [0, -CONTAINER_HEIGHT],
    extrapolate: 'clamp',
  });

  const bottomTraslate = clampedScroll.interpolate({
    inputRange: [0, CONTAINER_HEIGHT],
    outputRange: [0, CONTAINER_HEIGHT * 2],
    extrapolate: 'clamp',
  });

  const onRefreshScroll = React.useCallback(async () => {
    setRefreshing(true);
    onRefresh ? await onRefresh() : undefined;
    setRefreshing(false);
  }, []);

  const styles = StyleSheet.create({
    cont: { flex: 1, paddingBottom: 10, backgroundColor: colors.colorBackgroundScreen },
    cont_header: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: statusInternet === 'connected' ? top : 0,
      height: CONTAINER_HEIGHT,
      transform: [{ translateY: headerTraslate }],
      zIndex: 99,
    },
    cont_bottom: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: CONTAINER_HEIGHT,
      transform: [{ translateY: bottomTraslate }],
      zIndex: 100,
    },
    cont_children: { flex: 1, height: H },
  });

  return (
    <SafeAreaView style={styles.cont}>
      <SharedNoConectionAdviceComponent />
      {bottomShown ? (
        <Animated.View style={styles.cont_bottom}>
          <SharedTabbarBottomComponent />
        </Animated.View>
      ) : null}
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={'height'}>
        <Animated.FlatList
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
          data={['0']}
          renderItem={() => children}
          keyExtractor={() => '0'}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          scrollEventThrottle={1}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshScroll} />}
          style={styles.cont_children}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          onEndReached={onEndReached}
          contentContainerStyle={{ paddingBottom: statusInternet === 'connected' ? 150 : 250 }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
