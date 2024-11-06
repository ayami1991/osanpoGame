<template>
    <p>ただいま</p>
    <p>無事帰ってこれた</p>
    <!-- 画像を真ん中に配置 -->
    <img :src="currentImage" alt="ホーム画面" class="main-image" />
    <p>最終所持金</p>
    <p>{{ money }}円</p>
    <button @click="onRetunClick()">もう一度プレイする</button>
</template>

<script>
import home_1Image from '@/assets/home_1.png'
import home_2Image from '@/assets/home_2.png'

export default {
    data() {
        const nowMoney = parseInt(localStorage.getItem('money'));
        return {
            images: [home_1Image, home_2Image],
            currentImgIndex: 0,//表示画像インデックス
            intervalId: null,
            money: nowMoney,
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
        }, 300);//200ミリ秒ごとに画像を切り替え
    },

    beforeDestroy() {
        //コンポーネントが破棄される前にintarvavlをクリア
        clearInterval(this.intervalId);
    },

    methods: {
        onRetunClick() {
            // スタート画面へ
            this.$router.push({ path: '/' });
        }
    }
}
</script>


<style scoped>
.main-image {
    width: 300px;
    height: auto;
    margin: 20px 0;
}
</style>