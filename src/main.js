import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'//vue Routerをインポートする
import 'bootstrap/dist/css/bootstrap.min.css';//bootstrap


//アプリを作成し、vue　Routerを適用した状態でアプリを起動
createApp(App).use(router).mount('#app')
