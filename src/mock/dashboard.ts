import Mock from "mockjs";
export default {
  main: {
    border: "border-box-1",
    dataOptions: {
      loaders: [
        {
          type: "rest",
          url: "/api/widget/getall",
          method: "GET",
        },
      ],
      filters: [
        {
          type: "global",
          name: "getFirstLoaderData",
        },
        {
          type: "custom",
          func: "return {contentData:data.data,options:{showToolbar:true}};",
        },
      ],
    },
    contentOptions: {},
  },
};
