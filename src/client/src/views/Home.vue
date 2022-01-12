<template>
  <div class="container">
    <Form/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Form from "@/components/Form.vue"

export default defineComponent({
  name: 'Home',
  components: { Form }
});
</script>

<style lang="scss">
.container{
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
