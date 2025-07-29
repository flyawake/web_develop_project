import { API_MODULE } from './_prefix';

export const createOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_MODULE}/order/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    return await response.json();
  } catch (error) {
    console.error('创建订单失败:', error);
    throw error;
  }
};

export const getOrdersByUser = async (userId) => {
  try {
    const response = await fetch(`${API_MODULE}/order/user/${userId}`);
    return await response.json();
  } catch (error) {
    console.error('获取用户订单失败:', error);
    throw error;
  }
};

export const getOrdersByActivity = async (activityId) => {
  try {
    const response = await fetch(`${API_MODULE}/order/activity/${activityId}`);
    return await response.json();
  } catch (error) {
    console.error('获取活动订单失败:', error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await fetch(`${API_MODULE}/order/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    return await response.json();
  } catch (error) {
    console.error('更新订单状态失败:', error);
    throw error;
  }
};

export const deleteOrder = async (orderId, userId) => {
  try {
    const response = await fetch(`${API_MODULE}/order/${orderId}/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    return await response.json();
  } catch (error) {
    console.error('删除订单失败:', error);
    throw error;
  }
}; 