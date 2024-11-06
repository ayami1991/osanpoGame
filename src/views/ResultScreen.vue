<template>
    <div class="return-container">
    <p class="return-message">ただいま</p>
    <p class="return-message">無事帰ってこれた</p>
    <!-- 画像を真ん中に配置 -->
    <img :src="currentImage" alt="ホーム画面" class="main-image" />
    <p class="final-money-label">最終所持金</p>
    <p class="final-money">{{ money }}円</p>
    <button @click="onRetunClick()" class="btn btn-primary replay-button">もう一度プレイする</button>
</div>
</template>

<script>
import home_1Image from '@/assets/home_1.png'
import home_2Image from '@/assets/home_2.png'

export default {
    data() {
        const nowMoney = parseInt(localStorage.getItem('money'));
        console.log("最後の："+nowMoney)
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
.return-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffe4e1; /* パステルピンク */
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2); /* 影を強めに */
    max-width: 450px;
    margin: 0 auto;
}

.return-message {
    font-size: 1.8em; /* 少し大きく */
    font-weight: bold;
    color: #ff69b4; /* 明るいピンク色 */
    text-align: center;
    margin: 10px 0;
}

.main-image {
    width: 200px; /* サイズを大きく */
    height: auto;
    border-radius: 10px; /* 軽く丸みを付ける */
    border: 3px solid #ffb6c1;
    margin: 30px 0;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1); /* 画像に少し影を追加 */
}

.final-money-label {
    font-size: 1.5em;
    font-weight: bold;
    color: #ff69b4;
    margin-top: 15px;
}

.final-money {
    font-size: 2.5em; /* 最終所持金の金額を大きく */
    font-weight: bold;
    color: #87cefa; /* 柔らかい青 */
}

.replay-button {
    width: 220px; /* ボタンを大きめに */
    font-size: 1.2em;
    font-weight: bold;
    border-radius: 30px;
    padding: 12px 25px;
    background-color: #87cefa !important; /* 柔らかい青 */
    border-color: #87cefa !important;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2); /* ボタンに影を追加 */
    color: white;
    margin-top: 25px;
}
</style>