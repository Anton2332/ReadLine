type Matcher<T extends Record<string, string | ((...args: any[]) => string)>> = {
  [K in keyof T]: T[K] extends (...args: any[]) => string ? T[K] : () => string;
};

export function match<T extends Record<string, string | ((...args: any[]) => string)>>(matchers: T): Matcher<T> {
  return matchers as Matcher<T>;
}
