import {
  Button,
  Input,
  Steps,
  Form,
  Select,
  Row,
  Radio,
  DatePicker,
  Col,
  Icon,
  Checkbox,
  Switch,
  Spin,
} from "ant-design-vue";
import { App } from "vue";

const ant = {
  install(Vue: App): void {
    Vue.component(Button.name, Button);
    Vue.component(Input.name, Input);
    Vue.component(Steps.name, Steps);
    Vue.component(Form.name, Form);
    Vue.component(Select.name, Select);
    Vue.component(Row.name, Row);
    Vue.component(Radio.name, Radio);
    Vue.component(DatePicker.name, DatePicker);
    Vue.component(Col.name, Col);
    Vue.component(Icon.name, Icon);
    Vue.component(Checkbox.name, Checkbox);
    Vue.component(Switch.name, Switch);
    Vue.component(Spin.name, Spin);
  },
};
export default ant;
