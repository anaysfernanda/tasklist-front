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

export interface LoginUserType {
  email: string;
  password: string;
}
export const loginUser = async (user: LoginUserType) => {
  try {
    const result = await api.post('/user/login', user);
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

export interface TaskListType {
  userId: string;
  archived?: boolean;
}

export const taskList = async (taskList: TaskListType) => {
  try {
    const result = await api.get(`/task/${taskList.userId}/tasks`, {
      params: {
        archived: taskList.archived
      }
    });
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

export interface CreateTaskType {
  userId: string;
  id: string;
  title: string;
  description: string;
  archived?: boolean;
}

export const createTask = async (task: CreateTaskType) => {
  try {
    const result = await api.post(`/task/${task.userId}/tasks`, task);
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

export interface DeleteTaskType {
  userId: string;
  id: string;
}

export const deleteTask = async (task: DeleteTaskType) => {
  try {
    const result = await api.delete(`task/${task.userId}/tasks/${task.id}`);
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

export interface UpdateTaskType {
  userId: string;
  id: string;
  title?: string;
  description?: string;
  archived?: boolean;
}

export const updateTask = async (task: UpdateTaskType) => {
  try {
    const result = await api.put(`task/${task.userId}/tasks/${task.id}`, task);
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
