<template>
    <div class="battle-container">
        <p class="money-display">所持金:{{ money }}円</p>
        <img :src="battleImage" alt="バトル画像" class="battle-image" />
        <div v-if="result == null" class="janken-container">
            <img src="@/assets/gu.png" alt="グー" @click="onBattleClick('0')" class="janken-image" />
            <img src="@/assets/choki.png" alt="チョキ" @click="onBattleClick('0')" class="janken-image" />
            <img src="@/assets/pa.png" alt="パー" @click="onBattleClick('0')" class="janken-image" />
        </div>
        <div class="result-container">
            <p v-if="result">結果：{{ result }}</p>
            <p v-if="result == '勝ち'">{{ tempMoney }}円ゲットだぜ！</p>
            <p v-if="result == '負け'">{{ tempMoney }}円失った</p>
        </div>
        <button @click="onNextDayClick()" class="btn btn-primary next-day-button">次の日へ</button>
    </div>
</template>

<script>
import constants from '@/const/constants'
import Status from '@/components/Status.vue';

export default {

    data() {
        // Going画面からの受け取った対戦相手キーの取得
        const battleId = this.$route.query.battleId;

        return {
            day: parseInt(localStorage.getItem('day')),
            money: parseInt(localStorage.getItem('money')),
            battleId: battleId,
            result: null,
            tempMoney: null,
            image: null,
        }
    },
    computed: {
        //battleIdに応じた画像パスを生成
        battleImage() {
            // インポートした画像リストから、battleId に応じた画像のパスを取得
            const images = import.meta.glob('@/assets/battle_*.png', { eager: true });
            return images[`/src/assets/battle_${this.battleId}.png`].default;
        }
    }
    ,
    methods: {
        //** "0":グー　"1":チョキ "2":パー*/
        onBattleClick(usesrHand) {
            // じゃんけんの手をランダムに生成
            const hands = ['0', '1', '2'];
            const computerHand = hands[Math.floor(Math.random() * hands.length)];
            let result;//結果
            let amountedMoney = this.money;//現在の所持金
            // 選択されたバトルストーリーをidで検索
            const selectedStory = constants.battleStories.find(story => story.id === parseInt(this.battleId, 10));

            if (usesrHand === computerHand) {
                // 引き分け
                result = '引き分け'
            } else if (
                // 勝ち
                (usesrHand === '0' && computerHand === '1') ||
                (usesrHand === '1' && computerHand === '2') ||
                (usesrHand === '2' && computerHand === '0')
            ) {
                result = '勝ち'
                // 勝てば所持金プラス
                amountedMoney = amountedMoney + selectedStory.money;
            } else {
                result = '負け'
                // 負ければ所持金マイナス
                amountedMoney = amountedMoney - selectedStory.money;
                if (amountedMoney <= 0) {
                    amountedMoney = 0;
                }
            }
            console.log(result);

            // localstorageに所持金を保存
            this.money = amountedMoney;
            localStorage.setItem('money', amountedMoney);

            //dataに値を設定
            this.result = result;
            this.tempMoney = selectedStory.money;
        }
        ,
        onNextDayClick() {
            // going画面へ
            this.$router.push({ path: '/going', query: { flgStart: 'false', fromRoute: 'battle' } });
        }
    }
}
</script>

<style scoped>
.battle-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffe4e1;
    /* パステルピンクの背景 */
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    /* 影を追加 */
    max-width: 400px;
    margin: 0 auto;
}

.money-display {
    font-size: 1.2em;
    font-weight: bold;
    color: #ff69b4;
    /* 明るいピンクの文字色 */
    margin-bottom: 15px;
}

.battle-image {
    width: 180px;
    height: auto;
    border: 3px solid #ffb6c1;
    /* ピンクの枠線 */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    /* 画像に影を追加 */
    margin-bottom: 20px;
}

.janken-container {
    display: flex;
    justify-content: center;
    gap: 15px;
    /* じゃんけん画像の間隔 */
    margin: 20px 0;
}

.janken-image {
    width: 80px;
    height: 80px;
    cursor: pointer;
    border: 2px solid #ffb6c1;
    border-radius: 8px;
    /* 軽く角を丸める */
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s;
}

.janken-image:hover {
    transform: scale(1.1);
    /* 画像にホバースケールを追加 */
}

.result-container {
    text-align: center;
    color: #ff69b4;
    font-size: 1.2em;
    font-weight: bold;
    margin-top: 10px;
}

.next-day-button {
    width: 200px;
    font-size: 1.1em;
    font-weight: bold;
    border-radius: 30px;
    padding: 10px 20px;
    background-color: #87cefa !important;
    /* 柔らかい青 */
    border-color: #87cefa !important;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    /* ボタンに影を追加 */
    color: white;
    margin-top: 20px;
}
</style>