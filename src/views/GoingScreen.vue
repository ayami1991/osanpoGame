<template>
    <div class="going">
        <!-- ステータス部分 -->
        <Status :day="day" :money="money" />

        <!-- 画像を真ん中に配置 -->
        <img :src="currentImage" alt="歩くぶたさん" class="main-image" />

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
import pigImag from '@/assets/going_1.png'
import goingImag_1 from '@/assets/going_1.png'
import goingImag_2 from '@/assets/going_2.png'
import goingImag_3 from '@/assets/going_3.png'
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
        let initialMoney = flgStart ? 10000 : parseInt(localStorage.getItem('money'));
        // 説明
        let initialDisc = null;
        if (flgStart) {
            initialDisc = constants.stories['0'].disc;
        } else {
            // `0` を除外したキー配列を取得
            const storyKeys = Object.keys(constants.stories).filter(key => key !== '0');

            // ランダムなキーを取得
            const randomKey = storyKeys[Math.floor(Math.random() * storyKeys.length)];

            // ランダムに選ばれたエピソードの `disc` を取得
            initialDisc = constants.stories[randomKey].disc;

            //遷移元で表示している所持金の計算をする必要がある
            if (this.$route.query.fromRoute === 'battle') {
                //バトルページからの遷移では表示されている所持金が当日の物語が反映してない
                // 所持金の計算
                if (randomKey === '9') {//todo 識別方法 {全財産失うやつ}
                    initialMoney = 0;
                } else {
                    initialMoney = initialMoney + constants.stories[randomKey].amount;
                }
            }
        }


        //日付、所持金、説明文の設定
        return {
            day: initialDay,
            money: initialMoney,
            imageSrc: pigImag,
            images: [goingImag_1, goingImag_2, goingImag_3],
            currentImgIndex: 0,//表示画像インデックス
            intervalId: null,
            description: initialDisc,
            flgBattle: false,// バトルフラグ,
            battleId: null, //バトルid
        };
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
                // バトルIDの設定
                this.battleId = Math.floor(Math.random() * constants.battleStories.length);
                const selectedStory = constants.battleStories.find(story => story.id === this.battleId);
                this.description = selectedStory.disc;


            } else if (this.day === 12) {
                // 12日目（ラスト）
                //結果画面へ遷移
                this.$router.push({ path: '/battleResult', query: { hoge: '' } });

            } else {
                // false:1日目以外をランダムで取得
                // `0` を除外したキー配列を取得
                const storyKeys = Object.keys(constants.stories).filter(key => key !== '0');

                // ランダムなキーを取得
                const randomKey = storyKeys[Math.floor(Math.random() * storyKeys.length)];

                // ランダムに選ばれたエピソードの `disc` を取得
                const selectedDisc = constants.stories[randomKey].disc;
                // 説明の設定
                this.description = selectedDisc;

                // 所持金の計算
                if (randomKey === '9') {//todo 識別方法 {全財産失うやつ}
                    this.money = 0;
                } else {
                    this.money = this.money + constants.stories[randomKey].amount;
                }

                //所持金0円チェック
                if(this.money < 0){
                    this.money = 0;
                }

                // localstorageへ保存
                localStorage.setItem('money', this.money);

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
            this.$router.push({ path: '/battle', query: { battleId: this.battleId } });

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
    width: 300px;
    height: auto;
    margin: 20px 0;
}
</style>