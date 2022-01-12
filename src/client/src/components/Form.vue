<template>
  <div class="form-container">
    <div class="input">
      <input type="text" @keyup.enter="sendCommand()" v-model="command" placeholder="Type here">
    </div>
    <div class="output" :class="loading && 'loading'">
      <p v-if="error !== ''" style="color: #FC100D;">
        {{ error }}
      </p>
      <p v-else>
        {{ output }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data: () => ({
    output: '',
    command: '',
    error: '',
    loading: false
  }),
  methods: {
    async sendCommand(){
      this.loading = true
      const __dev__ = process.env.NODE_ENV === 'development'
      console.log(__dev__)
      console.log(process.env)
      const backend = __dev__ ? process.env.VUE_APP_DEV_ENDPOINT : window.location.origin
      const endpoint = new URL('/execute', backend)
      const requestObject: Parameters<typeof fetch>[1] = {
        method: 'POST',
        body: JSON.stringify({
          command: this.command
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      if (__dev__) requestObject.mode = 'cors'
      const response = await fetch(endpoint.toString(), requestObject)
      this.loading = false
      if (!response.ok) {
        this.error = `Command execution failed`
        return
      }
      const { output } = await response.json()
      this.output = output
    }
  }
})
</script>

<style lang="scss">
$color: #0C0C0C;
.form-container {
  width: 50%;
  max-width: 100%;
  padding: 1em;
  .input{
    background-color: $color;
    padding: .3em 1.2em;
    display: flex;
    align-items: center;
    &:before{
      content: '$';
      margin-right: .1em;
      font-size: 1.4em;
    }
    input{
      font-family: 'Ubuntu Mono', sans-serif;
      background-color: $color;
      border: none;
      outline: none;
      font-size: 1.4em;
      padding: .3em;
      color: #F6F4F3;
      flex-grow: 1;
    }
  }
  .output {
    padding: .3em 1.2em;
    background-color: $color;
    margin-top: 1em;
    height: 400px;
    overflow: auto;
    position: relative;
    &.loading {
      &:after {
        content: '';
        width: 100%;
        height: 5px;
        border-radius: 2px;
        position: absolute;
        background-color: #197BBD;
        bottom: 0;
        left: 0;
        animation: loading .8s ease-in-out infinite;
      }
    }
    p {
      white-space: pre-wrap;
      word-wrap: break-word;
    }    
  }
}

@keyframes loading {
  0% {
    transform-origin: 0 50%;
    transform: scaleX(0);
  }
  50% {
    transform-origin: 0 50%;
    transform: scaleX(1);
  }
  51% {
    transform-origin: 100% 50%;
  }
  100% {
    transform-origin: 100% 50%;
    transform: scaleX(0);
  }
}
</style>
