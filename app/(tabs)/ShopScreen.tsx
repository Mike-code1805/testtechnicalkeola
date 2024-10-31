import { getAllOrdersByUserIdService } from '@/api/services.order';
import { GetAllOrdersByUserIdServiceSuccessProps } from '@/api/services.order.interface';
import { SharedLoadingModal, SharedSafeScreenScrollGlobalComponent } from '@/components/shared';
import { ShopScreenProductsComponent } from '@/components/ShopScreen';
import { StatusIsLoadingProps } from '@/interfaces';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io(`${process.env.EXPO_PUBLIC_API_URL_PUBLIC}`);

export default function ShopScreen() {
  const [isLoading, setIsLoading] = useState<StatusIsLoadingProps>('neutral');
  const [orderData, setOrderData] = useState<GetAllOrdersByUserIdServiceSuccessProps[]>([]);

  const handleGetAllOrdersByUserIdService = async () => {
    try {
      setIsLoading('checking');
      setOrderData([]);
      const response = await getAllOrdersByUserIdService();
      setOrderData(response);
      setIsLoading('success');
    } catch (error) {
      setIsLoading('failed');
    }
  };

  useEffect(() => {
    socket.on('orderStatusUpdated', (updatedOrder) => {
      setOrderData((prevOrders) =>
        prevOrders.map((order) => (order._id === updatedOrder._id ? { ...order, status: updatedOrder.status } : order))
      );
    });
    return () => {
      socket.off('orderStatusUpdated');
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      handleGetAllOrdersByUserIdService();
    }, [])
  );

  return (
    <SharedSafeScreenScrollGlobalComponent titleHeader='Asistencia' onRefresh={handleGetAllOrdersByUserIdService}>
      <SharedLoadingModal visible={isLoading === 'checking'} />

      <ShopScreenProductsComponent orderData={orderData} />
    </SharedSafeScreenScrollGlobalComponent>
  );
}
