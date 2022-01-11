
// declare custom interface for better typing in request objects
export interface TypedRequest<T> extends Express.Request {
  body: T;
}

export interface CommandInterface {
  command: string;
  output: string;
}
