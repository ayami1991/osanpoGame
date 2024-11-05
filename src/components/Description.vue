<template>
    <div class="description">
        <p>{{ day }}日目：{{ description }}</p>
    </div>
</template>

<script>
export default {
    props:{
        day:{
            type:Number,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
    },
};
</script>

<style scoped>
.description {
  text-align: center;
  font-style: italic;
  margin-top: 10px;
}
</style>