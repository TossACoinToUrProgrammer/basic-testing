// Uncomment the code below and write your tests
import { throwError, throwCustomError, resolveValue, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    // Write your test here
    expect(resolveValue(5)).resolves.toBe(5)
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    // Write your test here
    expect(() => throwError('Error')).toThrow('Error')
  });

  test('should throw error with default message if message is not provided', () => {
    // Write your test here
    expect(() => throwError()).toThrow('Oops!')
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    // Write your test here
    expect(() => throwCustomError()).toThrowError()
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    // Write your test here
    expect(() => rejectCustomError()).rejects.toThrowError()
  });
});
