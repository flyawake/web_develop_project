import { API_MODULE } from './_prefix';

export const getActivities = async (page = 1, limit = 10, search = '') => {
  try {
    const response = await fetch(`${API_MODULE}/activity/list?page=${page}&limit=${limit}&search=${search}`);
    return await response.json();
  } catch (error) {
    console.error('获取活动列表失败:', error);
    throw error;
  }
};

export const getActivityById = async (id) => {
  try {
    const response = await fetch(`${API_MODULE}/activity/${id}`);
    return await response.json();
  } catch (error) {
    console.error('获取活动详情失败:', error);
    throw error;
  }
};

export const createActivity = async (activityData) => {
  try {
    let headers = {};
    let body = activityData;
    
    // 如果是FormData，不设置Content-Type，让浏览器自动设置
    if (activityData instanceof FormData) {
      body = activityData;
    } else {
      headers = {
        'Content-Type': 'application/json',
      };
      body = JSON.stringify(activityData);
    }
    
    const response = await fetch(`${API_MODULE}/activity/create`, {
      method: 'POST',
      headers,
      body,
    });
    return await response.json();
  } catch (error) {
    console.error('创建活动失败:', error);
    throw error;
  }
};

export const updateActivity = async (id, activityData) => {
  try {
    let headers = {};
    let body = activityData;
    
    // 如果是FormData，不设置Content-Type，让浏览器自动设置
    if (activityData instanceof FormData) {
      body = activityData;
    } else {
      headers = {
        'Content-Type': 'application/json',
      };
      body = JSON.stringify(activityData);
    }
    
    const response = await fetch(`${API_MODULE}/activity/${id}`, {
      method: 'PUT',
      headers,
      body,
    });
    return await response.json();
  } catch (error) {
    console.error('更新活动失败:', error);
    throw error;
  }
};

export const deleteActivity = async (id) => {
  try {
    const response = await fetch(`${API_MODULE}/activity/${id}/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    console.error('删除活动失败:', error);
    throw error;
  }
};

export const getActivitiesByCreator = async (creatorId) => {
  try {
    const response = await fetch(`${API_MODULE}/activity/creator/${creatorId}`);
    return await response.json();
  } catch (error) {
    console.error('获取创建者活动失败:', error);
    throw error;
  }
};

export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    console.log(file);
    console.log(formData);
    const response = await fetch(`${API_MODULE}/activity/upload-image`, {
      method: 'POST',
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.error('上传图片失败:', error);
    throw error;
  }
};