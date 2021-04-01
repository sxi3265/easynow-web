/* eslint-disable */
import {App} from "vue";
import router from "./router";
import storeModule from "./store";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moduleInfo = require("../package.json");
export default function(app:App) {
  // @ts-ignore: Object is possibly 'null'.
  this.$router.addRoute(router);
  // @ts-ignore: Object is possibly 'null'.
  this.$store.registerModule(moduleInfo.name, storeModule);
};
