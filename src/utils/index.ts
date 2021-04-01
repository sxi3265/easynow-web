export function debounce(delay: number, callback: { (): void }): () => void {
  let lastTime: number;

  return function (this: never, ...args) {
    clearTimeout(lastTime);

    lastTime = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}

export function observerDomResize(
  dom: Node,
  callback: MutationCallback
): MutationObserver {
  const MutationObserver =
    window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver;

  const observer = new MutationObserver(callback);

  observer.observe(dom, {
    attributes: true,
    attributeFilter: ["style"],
    attributeOldValue: true,
  });

  return observer;
}
