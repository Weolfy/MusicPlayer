import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import {store, key} from './store/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'
import lazyPlugin from 'vue3-lazy'

const app = createApp(App);
app.use(router)
.use(store, key)
.use(ElementPlus)
.use(lazyPlugin, {
    loading: new URL('./assets/img/default.png', import.meta.url),
    error: new URL('./assets/img/default.png', import.meta.url)
})
.mount('#app');

Object.keys(Icons).forEach((key) => {
    app.component(key, Icons[key as keyof typeof Icons]);
})