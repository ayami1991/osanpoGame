<template>
    <p>バトル画面</p>
    <button @click="nextDay()">次の日へ</button>
</template>

<script>
export default {
    methods: {
        nextDay() {
            // going画面へ
            this.$router.push({ path: '/going', query: { flgStart: 'false', triggerNextDay: 'true' } });
        }
    }
}
</script>