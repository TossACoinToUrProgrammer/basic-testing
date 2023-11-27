// Uncomment the code below and write your tests
import {
  InsufficientFundsError,
  SynchronizationFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    // Write your test here
    expect(getBankAccount(100).getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    expect(() => getBankAccount(100).withdraw(101)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
    expect(() =>
      getBankAccount(100).transfer(101, getBankAccount(50)),
    ).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
    const account = getBankAccount(100);
    expect(() => account.transfer(99, account)).toThrow();
  });

  test('should deposit money', () => {
    // Write your test here
    const account = getBankAccount(100);
    account.deposit(50);
    expect(account.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    // Write your test here
    const account = getBankAccount(100);
    account.withdraw(50);
    expect(account.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    // Write your test here
    const account = getBankAccount(50);
    getBankAccount(100).transfer(50, account);
    expect(account.getBalance()).toBe(100);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
    const account = getBankAccount(50);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(100);
    const result = await account.fetchBalance();

    expect(typeof result).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
    const account = getBankAccount(50);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(100);

    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
    const account = getBankAccount(50);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
