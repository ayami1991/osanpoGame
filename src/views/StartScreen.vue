<template>
    <button @click="play()" class="btn btn-primary btn-lg">スタート</button>
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