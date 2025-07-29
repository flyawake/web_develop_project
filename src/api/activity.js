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
    const response = await fetch(`${API_MODULE}/activity/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activityData),
    });
    return await response.json();
  } catch (error) {
    console.error('创建活动失败:', error);
    throw error;
  }
};

export const updateActivity = async (id, activityData) => {
  try {
    const response = await fetch(`${API_MODULE}/activity/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activityData),
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