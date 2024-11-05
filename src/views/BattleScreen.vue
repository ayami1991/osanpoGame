<template>
    <div>
        <p>所持金:{{ money }}円</p>
        <p>ここに画像をいれる</p>
        <div>
            <button @click="onBattleClick()">グー</button>
            <button @click="onBattleClick()">チョキ</button>
            <button @click="onBattleClick()">パー</button>
        </div>
        <div>
            <p>結果：勝ち</p>
            <p>〇〇円ゲットだぜ！</p>
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
        }
    },
    methods: {
        onBattleClick() {
            let isWin = true; //勝ちﾌﾗｸﾞ
            let amountedMoney = this.money;
            // 選択されたバトルストーリーをidで検索
            const selectedStory = constants.battleStories.find(story => story.id === parseInt(this.battleId, 10));

            // じゃんけんロジック


            if (isWin) {
                // 勝てば所持金プラス
                amountedMoney = amountedMoney + selectedStory.money;
            } else {
                // 負ければ所持金マイナス
                amountedMoney = amountedMoney - selectedStory.money;
            }

            // localstorageに所持金を保存
            this.money = amountedMoney;
            localStorage.setItem('money', amountedMoney);





        }
        ,
        onNextDayClick() {
            // going画面へ
            this.$router.push({ path: '/going', query: { flgStart: 'false', fromRoute: 'battle' } });
        }
    }
}
</script>