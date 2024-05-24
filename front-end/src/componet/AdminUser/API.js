import AllApi from '../../api/api'

export const deleteUserAPI = async (userId) => {
  return AllApi.deleteUser(userId);
};

export const getUserAPI = async (userId) => {
  return AllApi.getUser(userId)
};

export const getUsersAPI = async () => {
  return AllApi.getUser();
};

