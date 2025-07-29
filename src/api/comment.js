import { API_MODULE } from './_prefix';

export const createComment = async (commentData) => {
  try {
    const response = await fetch(`${API_MODULE}/comment/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });
    return await response.json();
  } catch (error) {
    console.error('创建评论失败:', error);
    throw error;
  }
};

export const getCommentsByActivity = async (activityId) => {
  try {
    const response = await fetch(`${API_MODULE}/comment/activity/${activityId}`);
    return await response.json();
  } catch (error) {
    console.error('获取活动评论失败:', error);
    throw error;
  }
};

export const deleteComment = async (commentId, userId) => {
  try {
    const response = await fetch(`${API_MODULE}/comment/${commentId}/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    return await response.json();
  } catch (error) {
    console.error('删除评论失败:', error);
    throw error;
  }
}; 