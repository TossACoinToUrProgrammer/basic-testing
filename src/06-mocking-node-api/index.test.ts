// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    // Write your test here
    const cb = jest.fn();
    doStuffByTimeout(cb, 500);

    jest.advanceTimersByTime(500);
    expect(cb).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    // Write your test here
    const cb = jest.fn();
    doStuffByTimeout(cb, 500);

    jest.advanceTimersByTime(200);
    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(400);
    expect(cb).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    // Write your test here
    const cb = jest.fn();
    doStuffByInterval(cb, 150);

    jest.advanceTimersByTime(400);
    expect(cb).toHaveBeenCalledTimes(2);
  });

  test('should call callback multiple times after multiple intervals', () => {
    // Write your test here
    const cb = jest.fn();
    doStuffByInterval(cb, 150);

    jest.advanceTimersByTime(300);
    expect(cb).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(150);
    expect(cb).toHaveBeenCalledTimes(3);
  });
});

jest.mock('path');
jest.mock('fs/promises');
jest.mock('fs');

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // Write your test here
    const pathToFile = './index.ts';
    await readFileAsynchronously(pathToFile);

    expect(path.join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
    const filename = 'notFoundFile';

    // Act
    const result = await readFileAsynchronously(filename);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    // Write your test here
    const filename = 'existing.txt';
    const content = 'This is the file content';
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(content);

    const result = await readFileAsynchronously(filename);
    expect(result).toBe(content);
  });
});
