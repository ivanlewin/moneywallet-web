/**
 * Represents how data is sent to the cliente when using the API (dates are sent as ISO strings)
 */
export type Serialized<T> = {
  [P in keyof T]: T[P] extends Date ? string : T[P];
};