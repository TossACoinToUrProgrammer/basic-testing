// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.useFakeTimers();

describe('throttledGetDataFromApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });
  test('should create instance with provided base url', async () => {
    // Write your test here
    const axiosInstance = {
      get: jest.fn().mockResolvedValue({ data: 'Mocked data' }),
    };
    (axios.create as jest.Mock).mockReturnValue(axiosInstance);

    // Act
    await throttledGetDataFromApi('/');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
    const axiosInstance = {
      get: jest.fn().mockResolvedValue({ data: 'Mocked data' }),
    };
    (axios.create as jest.Mock).mockReturnValue(axiosInstance);

    await throttledGetDataFromApi('/1');
    // Flush the throttle to force immediate invocation
    throttledGetDataFromApi.flush();

    expect(axiosInstance.get).toHaveBeenCalledWith('/1');
  });

  test('should return response data', async () => {
    // Write your test here
    const axiosInstance = {
      get: jest.fn().mockResolvedValue({ data: 'Mocked data' }),
    };
    (axios.create as jest.Mock).mockReturnValue(axiosInstance);

    const result = await throttledGetDataFromApi('/');
    // Flush the throttle to force immediate invocation
    throttledGetDataFromApi.flush();

    expect(result).toEqual('Mocked data');
  });
});
