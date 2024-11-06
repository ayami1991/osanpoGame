<template>
    <div class="container">
       
        <img :src="currentImage" alt="スタート画面" class="main-image" />
        <button @click="play()" class="btn btn-primary btn-lg">スタート</button>
    </div>
</template>

<script>
import start_1Image from '@/assets/start_1.png'
import start_2Image from '@/assets/start_2.png'
import start_3Image from '@/assets/start_3.png'


export default {

    data() {
        return {
            images: [start_1Image, start_2Image, start_3Image],
            currentImgIndex: 0,//表示画像インデックス
            intervalId: null,
        }
    },

    computed: {
        //現在の画像を取得
        currentImage() {
            return this.images[this.currentImgIndex];
        },
    },
    created() {
        //setIntervalで一定期間ごとに画像を切り替える
        this.intervalId = setInterval(() => {
            this.currentImgIndex = (this.currentImgIndex + 1) % this.images.length;
        }, 300);//300ミリ秒ごとに画像を切り替え
    },

    beforeDestroy() {
        //コンポーネントが破棄される前にintarvavlをクリア
        clearInterval(this.intervalId);
        // コンポーネントが破棄される際に BGM を停止
        if (this.bgm) {
            this.bgm.pause();
            this.bgm.currentTime = 0; // 再生位置をリセット
        }
    },
    mounted() {
        //ローカルストレージの初期化
        localStorage.clear();
    },
    methods: {
        play() {
            let flgStart = true;
            this.$router.push({ path: '/going', query: { flgStart } });
        },
        
    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffe4e1;
    /* パステルピンクの背景 */
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    /* 立体感のある影 */
    max-width: 400px;
    margin: 0 auto;
    min-height: 500px;
    /* 縦長にする */
    justify-content: center;
    /* コンテンツを中央に配置 */
}

.main-image {
    width: 200px;
    /* サイズを少し大きく */
    height: auto;
    border-radius: 15px;
    /* 丸みを少なく */
    border: 4px solid #ffb6c1;
    /* ピンクの枠線 */
    margin: 20px 0;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    /* 画像に少し影を追加 */
}

.custom-button {
    width: 200px;
    font-size: 1.2em;
    font-weight: bold;
    border-radius: 30px;
    padding: 10px 20px;
    background-color: #87cefa !important;
    /* 柔らかい青 */
    border-color: #87cefa !important;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    /* ボタンに影を追加 */
    color: white;
}


</style>