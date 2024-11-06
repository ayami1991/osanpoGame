import { createRouter, createWebHistory } from 'vue-router';
import StartScreen from '../views/StartScreen.vue';
import GoingScreen from '../views/GoingScreen.vue';
import BattleScreen from '@/views/BattleScreen.vue';
import ResultScreen from '@/views/ResultScreen.vue';

//ルート(ページ)を定義
const routes = [
    { path: '/', component: StartScreen },//表示するコンポーネントの設定
    { path: '/going', component: GoingScreen },
    { path: '/battle', component: BattleScreen },
    { path: '/battleResult', component: ResultScreen },
];


//vue Routerのインスタンスを作成して、アプリ全体で使用できるようにする
const router=createRouter({
    history:createWebHistory(),
    routes,//定義したルートを設定
});

export default router;