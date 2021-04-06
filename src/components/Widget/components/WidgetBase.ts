import AutoResize from "@/mixins/AutoResize";
import { Prop, mixins } from "vue-property-decorator";
import filters from "../filters";

export interface GlobalDataFilter {
  type: "global";
  name: string;
}

export interface CustomDataFilter {
  type: "custom";
  func: string;
}

export interface DataOptions {
  filters: Array<GlobalDataFilter | CustomDataFilter>;
  loaders: Array<StaticDataLoader | RestDataLoader>;
}

export interface StaticDataLoader {
  type: "static";
  data?: string;
  dataFunc?: string;
}

export interface RestDataLoader {
  type: "rest";
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  reqData?: string;
  reqDataFunc?: string;
}

export default abstract class WidgetBase extends mixins(AutoResize) {
  @Prop({ default: {} }) dataOptions!: DataOptions;
  @Prop({ default: "" }) border!: string;
  @Prop({ default: {} }) contentOptions!: unknown;

  protected refreshWidget(): void {
    this.loadData().then((data) => {
      const result = this.processData(data);
      let contentData: any = result;
      if (!(result instanceof Array)) {
        contentData = contentData.contentData;
      }
      this.refreshContent(contentData);
    });
  }

  /**
   * 刷新内容
   * @param contentData 内容数据
   */
  abstract refreshContent(contentData: unknown): void;

  /**
   * 加载数据
   * @returns 得到加载后的数据
   */
  protected loadData(): Promise<Array<unknown>> {
    if (
      !this.dataOptions ||
      !this.dataOptions.loaders ||
      this.dataOptions.loaders.length === 0
    ) {
      return Promise.reject(`数据加载配置有误`);
    }
    const datas = this.dataOptions.loaders.map((loader) => {
      return new Promise((resolve, reject) => {
        switch (loader.type) {
          case "static":
            if (loader.dataFunc) {
              const dataFunc = new Function(loader.dataFunc);
              resolve(dataFunc());
            } else if (loader.data) {
              resolve(JSON.parse(loader.data));
            } else {
              reject(`请检查数据加载器配置`);
            }
            break;
          case "rest":
            {
              let reqData;
              if (loader.reqDataFunc) {
                const reqDataFunc = new Function(loader.reqDataFunc);
                reqData = reqDataFunc();
              } else if (loader.reqData) {
                reqData = JSON.parse(loader.reqData);
              } else {
                reject(`请检查数据加载器配置`);
                return;
              }
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ((this.$http as any)[loader.method.toLowerCase()](
                loader.url,
                loader.method === "GET" ? { params: reqData } : reqData
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ) as Promise<any>)
                .then((data) => {
                  resolve(data);
                })
                .catch((e) => {
                  reject(e);
                });
            }
            break;
          default:
            reject(`不支持的数据加载类型`);
        }
      });
    });
    return Promise.all(datas);
  }

  /**
   * 使用过滤器处理数据
   * @param data 传入参数
   * @returns 返回参数
   */
  protected processData(data: unknown[]): unknown {
    let result: unknown = data;
    if (!this.dataOptions.filters || this.dataOptions.filters.length === 0) {
      return result;
    }

    for (let i = 0; i < this.dataOptions.filters.length; i++) {
      const filter = this.dataOptions.filters[i];
      switch (filter.type) {
        case "global":
          {
            if (filter.name in filters) {
              result = (filters as any)[filter.name](result);
            } else {
              throw new Error(`未找到全局过滤器${filter.name}`);
            }
          }
          break;
        case "custom":
          {
            try {
              const func = new Function("data", filter.func);
              result = func(result);
            } catch {
              throw new Error(`请检查自定义过滤器${filter.func}`);
            }
          }
          break;
      }
    }
    return result;
  }
}
