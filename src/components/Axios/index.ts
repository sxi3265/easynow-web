/* eslint-disable */
import { App } from "vue";
import axios from "axios";
import qs from "qs";
export default {
  install: (app: App) => {
    app.config.globalProperties.$moduleLoader = function(moduleData: any) {
      if (typeof moduleData === "object") {
        /** 通过模块清单加载模块 */
        const promiseAll = [];
        for (const moduleName in moduleData) {
          if (!window[moduleName as any]) {
            promiseAll.push(
              new Promise<number>((resolve, reject) => {
                const script = document.createElement("script");
                script.src = moduleData[moduleName];
                script.onload = () => {
                  if (window[moduleName as any]) {
                    typeof window[moduleName as any] === "function"
                      ? (window[moduleName as any] as any).call(this, app)
                      : (window[moduleName as any] as any).default.call(this, app);
                    console.log(moduleName, "模块加载完毕");
                  } else {
                    console.warn(
                      moduleName,
                      "模块加载失败，请检查模块资源是否成功加载。已跳过。"
                    );
                  }
                  resolve(1);
                };
                script.onerror = () => {
                  console.warn(moduleName, ": 创建模块脚本元素失败。已跳过。");
                  resolve(1);
                };
                document.body.appendChild(script);
              })
            );
          }
        }
        return Promise.all(promiseAll);
      } else if (typeof moduleData === "function") {
        /** 通过模块函数加载模块 */
        moduleData.call(this, app);
      } else {
        console.error(
          "模块加载方法只接受模块列表对象或者模块函数对象作为参数。"
        );
      }
    };
  },
};

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $moduleLoader: (moduleData: any) => Promise<unknown[]> | undefined;
  }
}
