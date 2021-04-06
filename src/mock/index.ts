import MockAdapter from "axios-mock-adapter";
import axios from "@/utils/axios";
import Mock from "mockjs";

export default {
  init(): void {
    const mock = new MockAdapter(axios);

    mock.onGet("/api/widget/getall").reply(200, [
      {
        id: Mock.Random.guid().toLowerCase(),
        name: "组件-Chart",
        type: "Chart",
        layout: {
          i: Mock.Random.guid().toLowerCase(),
          x: 0,
          y: 0,
          w: 6,
          h: 8,
          minW: 1,
          minH: 1,
          maxW: null,
          maxH: null,
          isResizable: true,
        },
        options: {
          border: "",
          dataOptions: {
            loaders: [
              {
                type: "static",
                dataFunc:
                  'return [[{x:"2019",y:38,s:"家具家电",},{s:"粮油副食",y:52,x:"2019",},{x:"2020",y:50,s:"家具家电",},{s:"粮油副食",y:40,x:"2020",},]]',
              },
            ],
            filters: [
              {
                type: "global",
                name: "getFirstLoaderData",
              },
            ],
          },
          contentOptions: {
            series: [
              {
                type: "line",
                options: {
                  point: {},
                },
              },
            ],
          },
        },
      },
    ]);
  },
};
