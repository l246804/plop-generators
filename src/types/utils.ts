export type Awaitable<T> = T | Promise<T>

export type Fn<P extends any[] = any[], R = void> = (...args: P) => R

export type PromiseFn<P extends any[] = any[], R = void> = (...args: P) => Promise<R>

export type Recordable<T = any> = Record<string, T>
