import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

export type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
    ? `${Lowercase<T>}${Capitalize<SnakeToCamelCase<U>>}`
    : S;
export type SnakeToCamelCaseNested<T> = T extends (infer U)[]
    ? SnakeToCamelCaseNested<U>[]
    : T extends object
      ? {
            [K in keyof T as SnakeToCamelCase<K & string>]: SnakeToCamelCaseNested<T[K]>;
        }
      : T;

export const snakeToCamel = <T extends Record<string, unknown> | readonly Record<string, unknown>[]>(request: T) =>
    camelcaseKeys(request) as unknown as SnakeToCamelCaseNested<T>;

export type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
    ? T extends Uppercase<T>
        ? `_${Lowercase<T>}${CamelToSnakeCase<U>}`
        : `${T}${CamelToSnakeCase<U>}`
    : S;

export type CamelToSnakeCaseNested<T> = T extends (infer U)[]
    ? CamelToSnakeCaseNested<U>[]
    : T extends object
      ? {
            [K in keyof T as CamelToSnakeCase<K & string>]: CamelToSnakeCaseNested<T[K]>;
        }
      : T;

export const camelToSnake = <T extends Record<string, unknown> | readonly Record<string, unknown>[]>(request: T) =>
    snakecaseKeys(request) as unknown as CamelToSnakeCaseNested<T>;
