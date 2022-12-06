export class ResponseFormat {
  success<T>(data: T, message: string = '操作成功', error?: Error) {
    return {
      state: 0,
      data: data,
      message,
      error: error,
    };
  }

  error(code: number, message: string, error?: Error | any) {
    return {
      state: code,
      data: undefined,
      message,
      error: error && error.toString && error.toString(),
    };
  }
}
