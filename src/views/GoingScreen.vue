<template>
    <div class="going">
        <!-- ステータス部分 -->
        <Status :day="day" :money="money" />

        <!-- 画像を真ん中に配置 -->
        <img :src="imageSrc" alt="画像" class="main-image" />

        <!-- 説明部分 -->
        <Description :day="day" :description="description" />

        <button v-if="flgBattle" @click="nextBattle()">バトル！</button>
        <button v-else @click="nextDay()">次の日</button>

        <button @click="restart()">やりなおす</button>
    </div>

</template>


<script>
import Description from '@/components/Description.vue';
import Status from '@/components/Status.vue';
import pigImag from '@/assets/ぶたさん.png'
import constants from '@/const/constants'
import { watch } from 'vue';

export default {
    //使用するコンポーネント
    components: {
        Status,
        Description,
    },

    //使用する変数データ
    data() {
        // スタート画面からの遷移かのフラグ
        const flgStart = this.$route.query.flgStart === 'true';
        //日付の初期設定
        const initialDay = flgStart ? 1 : parseInt(localStorage.getItem('day'));
        // 所持金
        const initialMoney = flgStart ? 10000 : parseInt(localStorage.getItem('money'));
        

        //日付、所持金、説明文の設定
        return {
            day: initialDay,
            money: initialMoney,
            imageSrc: pigImag,
            description: constants.stories[initialDay - 1].disc || "今日は特に何もなかった",
            flgBattle:false// バトルフラグ
        };
    },

    methods: {
        nextDay() {
            console.log("次の日へをクリック")
            // 日付をインクリメントする
            this.day += 1;
            console.log(this.day);
            // 日付をlocalStprageに保存して次回読み込み時に反映
            localStorage.setItem('day', this.day);

            //** 説明文の設定 */
            // 3、6、10日目かのチェック
            if (this.day === 3 || this.day === 6 || this.day === 10) {
                // true:バトルフラグon -> バトル説明を設定する
                this.flgBattle = true;
                this.description = constants.battleStoryes[0];


            } else {
                // false:1日目以外をランダムで取得
                this.description = constants.stories[this.day - 1].disc || "今日は特に何もなかった";

                // slgStartをfalseにする
                // this.$router.push({ path: '/going', query: { flgStart: 'false' } });

            }
        },
        nextBattle() {
            //　フラグオフ
            this.flgBattle = false;
            // 日にち保存 -> 画面に戻ってきたとき用
            this.day += 1;
            localStorage.setItem('day', this.day);
            //バトル画面へ遷移する
            this.$router.push({ path: '/battle' });

        }
        ,
        restart() {

            // スタート画面に戻る
            this.$router.push({ path: '/' });
        }
    },
};

</script>


<style scoped>
.going {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.main-image {
    width: 200px;
    height: auto;
    margin: 20px 0;
}
</style>