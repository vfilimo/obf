import { SearchBooksRequest, BookPage, SavedBookResponce } from '@/types/Book';
import { axiosInstance } from './axiosInstance';
import qs from 'qs';
import { TargetUser } from '@/types/User';
import { UserNotificationResponse } from '@/types/UserNotification';

export const booksApi = {
  fetchMy: async (page: number, size: number) => {
    try {
      const response = await axiosInstance.get('/books/all/me', {
        params: { page, size },
      });
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  },
  searchBooks: async (filters: SearchBooksRequest) => {
    try {
      const response = await axiosInstance.get('/books/search', {
        params: {
          page: filters.page,
          size: filters.size,
          // ...(filters.sort && { sort: filters.sort }),
          ...(filters.categories?.length && { categories: filters.categories }),
          ...(filters.condition?.length && { condition: filters.condition }),
          ...(filters.exchangeType?.length && { exchangeType: filters.exchangeType }),
          ...(filters.titleAndAuthor && { titleAndAuthor: filters.titleAndAuthor }),
        },
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'comma' }),
      });

      return response.data as BookPage;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  fetchTargetUser: async (userId: string): Promise<TargetUser | undefined> => {
    try {
      const response = await axiosInstance.get<TargetUser>(`/books/all/${userId}`, {
        params: {
          page: 0,
          size: 20,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  setUserCity: async (city: string) => {
    try {
      await axiosInstance.patch('/user/city', null, {
        params: { city },
      });
    } catch (error) {
      console.error('Помилка при оновленні міста:', error);
    }
  },
  deleteUserBook: async (bookId: number) => {
    try {
      const response = await axiosInstance.delete(`/books/${bookId}`);

      return response;
    } catch (error) {
      console.error('Помилка при видаленні книжки', error);
    }
  },
  saveBook: async (bookId: number) => {
    try {
      const response = await axiosInstance.post(`/books/me/saved/${bookId}`);

      return response.data;
    } catch (error) {
      console.error('Помилка при збереженні книжки', error);
      throw error;
    }
  },
  getSavedBooks: async (
    page: number = 0,
    size: number = 10
  ): Promise<SavedBookResponce> => {
    try {
      const response = await axiosInstance.get('/books/me/saved', {
        params: {
          page,
          size,
        },
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'comma' }),
      });

      return response.data;
    } catch (error) {
      console.error('Помилка при завантаженні збережених книг', error);
      throw error;
    }
  },
  removeFromSaved: async (bookId: number) => {
    try {
      const response = await axiosInstance.delete(`/books/me/saved/${bookId}`);
      return response;
    } catch (error) {
      console.error('Помилка при видаленні книги із збережених', error);
      throw error;
    }
  },
};

export const exchangeApi = {
  offerExchange: async (
    initiatorBookId: number | null,
    recipientBookId: number,
    isAnyBookOffered: boolean
  ) => {
    const response = await axiosInstance.post('/exchange', {
      initiatorBookId,
      recipientBookId,
      isAnyBookOffered,
    });

    return response.data;
  },
};

export const notificationApi = {
  getNotifications: async (
    page: number = 0,
    size: number = 10
  ): Promise<UserNotificationResponse> => {
    try {
      const response = await axiosInstance.get('/notification', {
        params: {
          page,
          size,
        },
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'comma' }),
      });

      return response.data;
    } catch (error) {
      console.error('Помилка при завантаженні нотіфікейшнів', error);
      throw error;
    }
  },
};
