import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, OrderStatus, Address } from '../types';
import { PRODUCTS, convertINRtoUSD, AVAILABLE_COUPONS } from '../data/products';
import { useAuth } from './AuthContext';

interface ShopContextType {
  // Currency
  currency: 'INR' | 'USD';
  setCurrency: (c: 'INR' | 'USD') => void;
  formatPrice: (priceINR: number) => { primary: string; secondary: string };

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size?: string, quantity?: number) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  updateCartItemSize: (cartItemId: string, newSize: string) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotalINR: number;
  discountINR: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  shippingChargeINR: number;
  cartTotalINR: number;

  // Wishlist
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  orders: Order[];
  placeOrder: (
    paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod',
    shippingAddress: Address,
    paymentDetails?: any
  ) => Promise<Order>;
  cancelOrder: (orderId: string, reason: string) => Promise<{ success: boolean; message: string }>;

  // Modals & Panels
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isOrdersOpen: boolean;
  setIsOrdersOpen: (open: boolean) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  selectedProductForModal: Product | null;
  setSelectedProductForModal: (product: Product | null) => void;

  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const ORDERS_STORAGE_KEY = 'cot_luxury_orders_v1';
const CART_STORAGE_KEY = 'cot_luxury_cart_v1';
const WISHLIST_STORAGE_KEY = 'cot_luxury_wishlist_v1';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  // Load persistent state
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) setCart(JSON.parse(storedCart));

      const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (storedWishlist) setWishlistIds(JSON.parse(storedWishlist));

      const storedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      } else {
        // Initial sample luxury order for demonstration so order & cancellation is immediately testable
        const sampleOrder: Order = {
          id: 'ord_sample_9842',
          orderNumber: 'COT-89214',
          date: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(), // 18 hours ago
          items: [
            {
              productId: PRODUCTS[0].id,
              name: PRODUCTS[0].name,
              category: PRODUCTS[0].category,
              image: PRODUCTS[0].image,
              size: 'Medium (51-19-145 mm)',
              quantity: 1,
              priceINR: PRODUCTS[0].priceINR,
              priceUSD: PRODUCTS[0].priceUSD,
            },
          ],
          subtotalINR: PRODUCTS[0].priceINR,
          discountINR: 0,
          shippingINR: 0,
          totalINR: PRODUCTS[0].priceINR,
          totalUSD: PRODUCTS[0].priceUSD,
          currency: 'INR',
          paymentMethod: 'upi',
          paymentDetails: {
            gatewayRef: 'UPI-RR-904128509',
            upiId: 'client@okhdfcbank',
          },
          status: 'processing',
          shippingAddress: {
            id: 'addr_sample',
            fullName: user?.name || 'Patron Member',
            phone: user?.phone || '+91 98200 44521',
            streetAddress: '42 Regent Boulevard, Suite 501',
            city: 'Mumbai',
            state: 'Maharashtra',
            postalCode: '400001',
            isDefault: true,
          },
          trackingNumber: 'BLUEDART-EXP-908127',
          estimatedDelivery: 'Dispatched from Fukui Atelier · Arriving in 2 Days',
          refundStatus: 'none',
        };
        setOrders([sampleOrder]);
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify([sampleOrder]));
      }
    } catch (e) {
      console.error('Error reading localStorage', e);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    }
  }, [orders]);

  // Pricing formatting helper
  const formatPrice = (priceINR: number) => {
    const usd = convertINRtoUSD(priceINR);
    if (currency === 'INR') {
      return {
        primary: `₹${priceINR.toLocaleString('en-IN')}`,
        secondary: `$${usd.toFixed(2)} USD`,
      };
    } else {
      return {
        primary: `$${usd.toFixed(2)} USD`,
        secondary: `₹${priceINR.toLocaleString('en-IN')}`,
      };
    }
  };

  // Cart functions
  const addToCart = (product: Product, size?: string, quantity: number = 1) => {
    const chosenSize = size || product.defaultSize;
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === chosenSize
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        const newItem: CartItem = {
          id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
          product,
          selectedSize: chosenSize,
          quantity,
          addedAt: Date.now(),
        };
        return [newItem, ...prev];
      }
    });

    showToast(`Added ${product.name} (${chosenSize}) to your bag`);
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const updateCartItemSize = (cartItemId: string, newSize: string) => {
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, selectedSize: newSize } : item))
    );
    showToast(`Updated size to ${newSize}`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from your bag');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const cartSubtotalINR = cart.reduce(
    (acc, item) => acc + item.product.priceINR * item.quantity,
    0
  );

  // Discount calculation
  let discountINR = 0;
  if (appliedCoupon && AVAILABLE_COUPONS[appliedCoupon]) {
    const coupon = AVAILABLE_COUPONS[appliedCoupon];
    if (cartSubtotalINR >= coupon.minSpend) {
      discountINR = Math.round((cartSubtotalINR * coupon.discountPercent) / 100);
    }
  }

  const applyCoupon = (code: string) => {
    const upper = code.trim().toUpperCase();
    if (AVAILABLE_COUPONS[upper]) {
      const coupon = AVAILABLE_COUPONS[upper];
      if (cartSubtotalINR < coupon.minSpend) {
        return {
          success: false,
          message: `Minimum bag value of ₹${coupon.minSpend} required for this privilege`,
        };
      }
      setAppliedCoupon(upper);
      return { success: true, message: `Applied ${upper}: ${coupon.description}` };
    }
    return { success: false, message: 'Invalid or expired privilege code' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Free shipping on all luxury purchases
  const shippingChargeINR = cartSubtotalINR > 0 ? 0 : 0;
  const cartTotalINR = Math.max(0, cartSubtotalINR - discountINR + shippingChargeINR);

  // Wishlist functions
  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast(exists ? 'Removed from wishlist' : 'Saved to wishlist');
      return next;
    });
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  // Orders & Payment Integration
  const placeOrder = async (
    paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod',
    shippingAddress: Address,
    paymentDetails: any = {}
  ): Promise<Order> => {
    const orderNum = 'COT-' + Math.floor(10000 + Math.random() * 90000);
    const orderItems = cart.map((c) => ({
      productId: c.product.id,
      name: c.product.name,
      category: c.product.category,
      image: c.product.image,
      size: c.selectedSize,
      quantity: c.quantity,
      priceINR: c.product.priceINR,
      priceUSD: c.product.priceUSD,
    }));

    const newOrder: Order = {
      id: 'ord_' + Date.now().toString(36),
      orderNumber: orderNum,
      date: new Date().toISOString(),
      items: orderItems,
      subtotalINR: cartSubtotalINR,
      discountINR,
      shippingINR: shippingChargeINR,
      totalINR: cartTotalINR,
      totalUSD: convertINRtoUSD(cartTotalINR),
      currency,
      paymentMethod,
      paymentDetails,
      status: 'confirmed',
      shippingAddress,
      trackingNumber: 'BLUEDART-EXP-' + Math.floor(100000 + Math.random() * 900000),
      estimatedDelivery: 'Express 48-Hour Dispatch · Insured Handover',
      refundStatus: 'none',
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);
    return newOrder;
  };

  // Order Cancellation Feature
  const cancelOrder = async (orderId: string, reason: string) => {
    const target = orders.find((o) => o.id === orderId);
    if (!target) {
      return { success: false, message: 'Order record not found' };
    }
    if (target.status === 'delivered') {
      return { success: false, message: 'Delivered orders cannot be cancelled. Please contact concierge.' };
    }
    if (target.status === 'cancelled') {
      return { success: false, message: 'This order is already cancelled' };
    }

    const updatedOrders = orders.map((o) => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'cancelled' as OrderStatus,
          cancellationReason: reason,
          cancelledAt: new Date().toISOString(),
          refundStatus: (o.paymentMethod === 'cod' ? 'none' : 'initiated') as 'none' | 'initiated',
          refundAmountINR: o.totalINR,
        };
      }
      return o;
    });

    setOrders(updatedOrders);
    showToast(`Order #${target.orderNumber} successfully cancelled`);
    return {
      success: true,
      message:
        target.paymentMethod === 'cod'
          ? 'Order cancelled with ₹0 fee.'
          : `Full refund of ₹${target.totalINR} ($${target.totalUSD} USD) initiated to original payment method.`,
    };
  };

  return (
    <ShopContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        cart,
        addToCart,
        updateQuantity,
        updateCartItemSize,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotalINR,
        discountINR,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        shippingChargeINR,
        cartTotalINR,
        wishlistIds,
        toggleWishlist,
        isInWishlist,
        orders,
        placeOrder,
        cancelOrder,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isOrdersOpen,
        setIsOrdersOpen,
        isProfileOpen,
        setIsProfileOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        selectedProductForModal,
        setSelectedProductForModal,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
