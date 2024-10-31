export interface AdminGetAllOrdersByUserIdServiceSuccessProps {
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

export interface GetOneOrderByIdServiceSuccessProps {
  _id: OrderId;
  userId: string;
  userOrderNumber: string;
  items: {
    productId: string;
    counter: number;
  }[];
  totalAmount: number;
  status: 'Pedido recibido' | 'Preparando' | 'En camino' | 'Entregado';
  created_at: Date;
  updated_at: Date;
}

export interface UpdateOneOrderServiceDataProps {
  status: 'Pedido recibido' | 'Preparando' | 'En camino' | 'Entregado';
}
export interface UpdateOneOrderServiceSuccessProps {}
