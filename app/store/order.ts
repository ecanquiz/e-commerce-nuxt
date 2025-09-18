export const useOrderStore = defineStore('order', () => {
  const currentOrder = ref<string | null>(null);
  const orders = ref<any[]>([]);

  const setCurrentOrder = (orderId: string) => {
    currentOrder.value = orderId;
  };

  const addOrder = (order: any) => {
    orders.value.push(order);
    currentOrder.value = order.id;
  };

  const getOrderById = (orderId: string) => {
    return orders.value.find(order => order.id === orderId);
  };

  return {
    currentOrder,
    orders,
    setCurrentOrder,
    addOrder,
    getOrderById
  };
});
