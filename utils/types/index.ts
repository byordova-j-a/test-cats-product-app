export enum EOrderStatus {
  DELIVERED = 'delivered',
  ON_THE_WAY = 'on the way',
  CANCELED = 'canceled',
  NOT_DEFINED = 'not_defined'
}

export type TOrder = {
  id: number;
  name: string;
  statusText: string;
  status: EOrderStatus;
  price: string;
  created_date: string;
  created_at_time: number;
  amount: number;
};

export type TUser = {
  [key in 'name' | 'surname']: string;
};
