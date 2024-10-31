export interface CreateOneOrderServiceDataProps {
  items: {
    productId: string;
    counter: number;
  }[];
  totalAmount: number;
}

export interface CreateOneOrderServiceSuccessProps {}

export interface GetAllOrdersByUserIdServiceSuccessProps {
  _id: OrderId;
  userId: string;
  userOrderNumber: string;
  items: {
    productId: string;
    counter: number;
  }[];
  totalAmount: number;
  status: 'Pedido recibido' | 'Preparando' | 'En camino' | 'Entregado';
}
