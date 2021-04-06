import MockAdapter from "axios-mock-adapter";
import axios from "@/utils/axios";
import widget from "./widget";

export default {
  init(): void {
    const mock = new MockAdapter(axios);

    mock.onGet("/api/widget/getall").reply(200, widget.getAll);
  },
};
