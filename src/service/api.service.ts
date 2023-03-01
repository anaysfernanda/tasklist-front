/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4444'
});

interface CreateUserType {
  email: string;
  password: string;
}

export const createUser = async (user: CreateUserType) => {
  try {
    const result = await api.post('/user', user);
    return result.data;
  } catch (error: any) {
    if (error.request.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }
    return {
      ok: false,
      message: error.toString()
    };
  }
};

export interface LoginUserType {
  username: string;
  password: string;
}
export const loginUser = async (user: LoginUserType) => {
  try {
    const result = await api.post('/user/', user);
    return result.data;
  } catch (error: any) {
    if (error.request.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }
    return {
      ok: false,
      message: error.toString()
    };
  }
};

export const taskList = async (userId: string) => {
  try {
    const result = await api.get(`/user/${userId}/tasks`);
    return result.data;
  } catch (error: any) {
    if (error.request.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }
    return {
      ok: false,
      message: error.toString()
    };
  }
};
