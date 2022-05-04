import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { init } from '@waline/client';
import '@waline/client/dist/waline.css';

const app = createApp(App)
const locale = {
    placeholder: "For a healthy network environment, comments will be displayed after review."
}
const waline = init({
    el: '#waline',
    serverURL: "https://eddiehe-profile-pictures-waline.vercel.app",
    lang: 'en',
    locale,
});

app.use(router)
app.use(ElementPlus)
app.config.globalProperties.$waline = waline
app.mount('#app')
