// 防抖函数的封装
type TimeoutHandle = ReturnType<typeof setTimeout>;
export class Debounce {
  public use = (delay: number): Function => {
    let timer: TimeoutHandle | undefined = undefined;
    return (): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          resolve();
          timer = undefined;
        }, delay)
      })
    }
  }
}