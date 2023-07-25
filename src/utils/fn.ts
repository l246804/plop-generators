import { isFunction } from 'lodash-es'

export function ensureFunction<T>(fn: T): T extends ((...args) => any) ? T : () => T {
  return (isFunction(fn) ? fn : () => fn) as any
}
