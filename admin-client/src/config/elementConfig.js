import Vue from 'vue'
import { Button, Input, InputNumber, Form, FormItem, Message, MessageBox, Loading, } from 'element-ui';
const elementConfig = () => {
  Vue.use(Button).use(Input).use(InputNumber).use(Form).use(FormItem).use(Loading.directive)
}
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
export default elementConfig