<template>
  <div class="container">
    <h1>おさんぽゲーム</h1>
    <button @click="playMusic()" class="volume-button">📢</button>
    <!-- ↓　ルーティングで表示内容を切り替える ↓-->
    <router-view></router-view>
  </div>
</template>

<script>
import bgmAudio from '@/assets/bgm.mp3';


export default {
  data() {
    return {
      bgm: null, // BGM オーディオを保持する
      name: 'App'
    }
  },
  beforeDestroy() {
    // コンポーネントが破棄される際に BGM を停止
    if (this.bgm) {
      this.bgm.pause();
      this.bgm.currentTime = 0; // 再生位置をリセット
    }
  },
  methods: {
    playMusic() {
      // BGM を再生
      if (!this.bgm) {
        this.bgm = new Audio(bgmAudio);
        this.bgm.loop = true; // BGM をループ再生
        this.bgm.volume = 0.5; // 音量を50%に設定
        this.bgm.play(); // 再生開始
      } else {
        this.bgm.pause();
        this.bgm.currentTime = 0; // 再生位置をリセット
        this.bgm = null;
      }

    },

  }
    
  

};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  /* 縦に並べる */
  align-items: center;
  /* 中央揃え */
  gap: 10px;
  /* 画像とボタンの間隔 */
}

h1 {
  font-family: 'Yomogi', cursive;
  color: #ff69b4 !important;
  /* 強制的に上書き */
  font-size: 2.5em;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);


}

.volume-button {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 1.2em;
  padding: 5px 8px;
  background: #ff69b4;
  /* ピンク色 */
  color: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
</style>