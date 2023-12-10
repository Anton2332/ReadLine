import { OrderByOwnBookEnum } from '../types/order-by-own-book.type';

type DescOrAsc = 'desc' | 'asc';

export type OrderByOwnBook = {
  [key in OrderByOwnBookEnum]: { [key2: string]: DescOrAsc };
};

export const OrderByOwnBookConst: OrderByOwnBook = {
  [OrderByOwnBookEnum.LAST_OPEN]: { lastOpenDate: 'desc' },
  [OrderByOwnBookEnum.FIRST_OPEN]: { lastOpenDate: 'asc' },
  [OrderByOwnBookEnum.FROM_A_TO_Z]: { title: 'asc' },
  [OrderByOwnBookEnum.FROM_Z_TO_A]: { title: 'desc' }
};
