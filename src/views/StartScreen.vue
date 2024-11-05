<template>
    <p>スタート画面</p>

    <button @click="play()" class="btn btn-primary">スタート</button>
</template>

<script>
export default {
    mounted(){
        //ローカルストレージの初期化
        localStorage.clear();
    },
    methods: {
        play() {
            let flgStart = true;
            this.$router.push({ path: '/going', query: { flgStart } });
        }
    }
}
</script>