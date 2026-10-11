export type ProductCategory = 'all' | 'eyewear' | 'timepieces' | 'hybrid';

export interface Product {
  id: string;
  name: string;
  category: 'eyewear' | 'timepieces' | 'hybrid';
  subtitle: string;
  description: string;
  priceINR: number;
  priceUSD: number;
  image: string;
  availableSizes: string[];
  defaultSize: string;
  sizeType: 'eyewear' | 'timepiece';
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  specs: {
    material: string;
    dimensions: string;
    weight: string;
    warranty: string;
    origin: string;
  };
  features: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize: string;
  quantity: number;
  addedAt: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: number;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  streetAddress: string;
  landmark?: string;
  city: string;
  state: string;
  postalCode: string;
  isDefault: boolean;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipId: string;
  memberTier: string;
  addresses: Address[];
  createdAt: string;
}

export type OrderStatus = 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  name: string;
  category: 'eyewear' | 'timepieces' | 'hybrid';
  image: string;
  size: string;
  quantity: number;
  priceINR: number;
  priceUSD: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: OrderItem[];
  subtotalINR: number;
  discountINR: number;
  shippingINR: number;
  totalINR: number;
  totalUSD: number;
  currency: 'INR' | 'USD';
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
  paymentDetails: {
    gatewayRef?: string;
    upiId?: string;
    cardLast4?: string;
    cardBrand?: string;
    bankName?: string;
  };
  status: OrderStatus;
  shippingAddress: Address;
  trackingNumber: string;
  estimatedDelivery: string;
  cancellationReason?: string;
  cancelledAt?: string;
  refundStatus?: 'none' | 'initiated' | 'completed';
  refundAmountINR?: number;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  description: string;
  minSpendINR: number;
}
