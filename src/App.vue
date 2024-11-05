<template>
  <div id="app">
    <h1>おさんぽゲーム</h1>
    <!-- ↓　ルーティングで表示内容を切り替える ↓-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
#app {
  text-align: center;
}
</style>