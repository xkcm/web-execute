
// declare custom interface for better typing in request objects
export interface TypedRequest<T> extends Express.Request {
  body: T;
}

export interface CommandInterface {
  command: string;
  output: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HTTP_PORT: string;
      MAX_TIMEOUT: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_DATABASE: string;
    }
  }
}
