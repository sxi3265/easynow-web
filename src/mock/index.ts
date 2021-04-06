import MockAdapter from "axios-mock-adapter";
import axios from "@/utils/axios";
import widget from "./widget";
import dashboard from "./dashboard";

export default {
  init(): void {
    const mock = new MockAdapter(axios);

    mock.onGet("/api/widget/getall").reply(200, widget.getAll);
    mock
      .onGet("/api/DashBoard/GetByCode", { params: { code: "main" } })
      .reply(200, dashboard.main);
  },
};
