export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

export const useCart = () => {
  const items = useState<CartItem[]>("cart-items", () => []);

  const addToCart = (product: CartProduct) => {
    const existing = items.value.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity++;
    } else {
      items.value.push({ ...product, quantity: 1 });
    }
  };

  const removeFromCart = (id: number) => {
    items.value = items.value.filter((item) => item.id !== id);
  };

  const totalCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  );

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );

  const increaseQuantity = (id: number) => {
    const item = items.value.find((i) => i.id === id);
    if (item) {
      item.quantity++;
    }
  };

  return { items, addToCart, removeFromCart, totalCount, totalPrice };
};
