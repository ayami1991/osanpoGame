<template>
    <div class="status">
        <p>{{ day }}日目：</p>
        <p>所持金：{{ money }}円</p>
    </div>
</template>

<script>
export default {
    props:{
        day:{
            type:Number,//親から受け取る方の指定
            required:true,//親から必ず渡されるように指定
        },
        money:{
            type:Number,
            required:true,
        },
    },
};
</script>

<style scoped>
.status {
    display: flex;
    justify-content: space-between; /* 左右に配置 */
    align-items: center;
    background-color: #fff0f5; /* パステルピンクの背景色 */
    padding: 10px 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 軽い影を追加 */
    max-width: 400px;
    margin: 0 auto;
}

.status p {
    font-size: 1.2em;
    font-weight: bold;
    color: #ff69b4; /* ピンク色の文字 */
    margin: 0;
}
</style>