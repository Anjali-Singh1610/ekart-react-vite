export interface ApiProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
}

export interface ApiCart {
  id: number;
  products: ApiProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface CartResponse {
  carts: ApiCart[];
  total: number;
  skip: number;
  limit: number;
}

export interface CartItem extends ApiProduct {
  quantity: number;
}