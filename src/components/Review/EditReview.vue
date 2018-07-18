<template>
    <h1>Edit Review {{ id }}</h1>
</template>

<script>
export default {
    data() {
        return {
            id: '1'
        }
    },
    created(){
        this.id = this.$route.params.id
    }

}
</script>

<style>

</style>
