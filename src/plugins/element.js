import Vue from 'vue'
import { Button,Form,FormItem,Message,Input} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
//全局导入弹框提示组件
Vue.prototype.$message=Message