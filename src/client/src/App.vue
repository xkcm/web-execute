<template>
  <Home/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Home from "./views/Home.vue"

export default defineComponent({
  components: { Home }
})
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Ubuntu+Mono&display=swap');
body {
  font-family: 'Ubuntu Mono', sans-serif;
  background-color: #191923;
  color: #F6F4F3;
  margin: 0;
  padding: 0;
}
</style>
