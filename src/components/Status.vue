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
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>