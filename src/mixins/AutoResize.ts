import { createDelayFunc, observerDomResize } from "@/utils";
import { Vue } from "vue-property-decorator";
export default class AutoResize extends Vue {
  dom!: Element;
  width = 0;
  height = 0;
  delayInitWHFun!: () => void;
  domObserver!: MutationObserver;
  ref!: string;

  async autoResizeMixinInit(): Promise<void> {
    const {
      initWH,
      getDelayInitWHFun,
      bindDomResizeCallback,
      afterAutoResizeMixinInit,
    } = this;

    await initWH(false);

    getDelayInitWHFun();

    bindDomResizeCallback();

    afterAutoResizeMixinInit();
  }

  getDelayInitWHFun(): void {
    const { initWH } = this;

    this.delayInitWHFun = createDelayFunc(100, initWH);
  }

  bindDomResizeCallback(): void {
    const { dom, delayInitWHFun } = this;

    this.domObserver = observerDomResize(dom, delayInitWHFun);

    window.addEventListener("resize", delayInitWHFun);
  }

  unbindDomResizeCallback(): void {
    const { domObserver, delayInitWHFun } = this;

    if (!domObserver) return;

    domObserver.disconnect();
    domObserver.takeRecords();

    window.removeEventListener("resize", delayInitWHFun);
  }

  afterAutoResizeMixinInit(): void {
    // throw new Error("Not implemented !");
  }

  onResize(): void {
    // throw new Error("Not implemented !");
  }

  initWH(resize = true): Promise<void> {
    const { $nextTick, $refs, ref, onResize } = this;

    return new Promise((resolve) => {
      $nextTick(() => {
        this.dom = $refs[ref] as Element;
        const dom: Element = this.dom;
        this.width = dom ? dom.clientWidth : 0;
        this.height = dom ? dom.clientHeight : 0;

        if (!dom) {
          console.warn(
            "Failed to get dom node, component rendering may be abnormal!"
          );
        } else if (!this.width || !this.height) {
          console.warn(
            "Component width or height is 0px, rendering abnormality may occur!"
          );
        }

        if (resize) onResize();

        resolve(undefined);
      });
    });
  }

  mounted(): void {
    const { autoResizeMixinInit } = this;

    autoResizeMixinInit();
  }

  beforeUnmount(): void {
    const { unbindDomResizeCallback } = this;

    unbindDomResizeCallback();
  }
}
