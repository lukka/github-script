import {callAsyncFunction} from '../src/async-function'
import * as fs from 'fs'
import { mocked } from 'ts-jest/utils'; 

jest.mock('fs');
mocked(fs.readFileSync).mockImplementation(path => Buffer.from(path as string, "utf8"))

describe('callAsyncFunction', () => {
  test('calls the function with its arguments', async () => {
    const result = await callAsyncFunction({foo: 'bar'}, 'return foo')
    expect(result).toEqual('bar')
  })

  test('throws on ReferenceError', async () => {
    expect.assertions(1)

    try {
      await callAsyncFunction({}, 'proces')
    } catch (err) {
      expect(err).toBeInstanceOf(ReferenceError)
    }
  })

  test('can access process', async () => {
    await callAsyncFunction({}, 'process')
  })

  test('can access console', async () => {
    await callAsyncFunction({}, 'console')
  })
})
