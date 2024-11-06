<template>
    <div>
        <p>所持金:{{ money }}円</p>
        <img :src="battleImage" alt="バトル画像" />
        <div v-if="result == null">
            <img src="@/assets/gu.png" alt="グー" @click="onBattleClick('0')" class="janken-image"/>
            <img src="@/assets/choki.png" alt="チョキ" @click="onBattleClick('0')" class="janken-image"/>
            <img src="@/assets/pa.png" alt="パー" @click="onBattleClick('0')" class="janken-image"/>
        </div>
        <div>
            <p v-if="result">結果：{{ result }}</p>
            <p v-if="result == '勝ち'">{{ tempMoney }}円ゲットだぜ！</p>
            <p v-if="result == '負け'">{{ tempMoney }}円失った</p>
        </div>
        <button @click="onNextDayClick()">次の日へ</button>
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

<style>
.janken-image {
    width: 100px;
    height: 100px;
    margin: 10px;
    border: 3px solid black; /* 枠線の色と太さ */
    border-radius: 8px; /* 枠線の角を丸くする（必要に応じて） */
}

</style>