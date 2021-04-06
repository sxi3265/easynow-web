/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * 创建延时方法
 * @param delay 延时时间
 * @param callback 执行方法
 * @returns 返回延时方法
 */
export function createDelayFunc(
  delay: number,
  callback: { (...args: any[]): void }
): (...args: any[]) => void {
  let lastTime: number;

  return function (this: unknown, ...args) {
    clearTimeout(lastTime);
    lastTime = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}

/**
 * 监视dom的变化
 * @param dom 被监视dom
 * @param callback 回调
 * @returns MutationObserver
 */
export function observerDomResize(
  dom: Node,
  callback: MutationCallback
): MutationObserver {
  const MutationObserver =
    window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver;

  const observer = new MutationObserver(callback);

  if (!(dom instanceof Node)) {
    return observer;
  }

  observer.observe(dom, {
    attributes: true,
    attributeFilter: ["style"],
    attributeOldValue: true,
  });

  return observer;
}
