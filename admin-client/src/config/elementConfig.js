import Vue from 'vue'
import { Button, Input, InputNumber, } from 'element-ui';
const elementConfig = () => {
  Vue.use(Button).use(Input).use(InputNumber)
}

export default elementConfig