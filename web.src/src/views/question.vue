<template>
  <n-space vertical justify="end">
    <n-card v-if="type == 'text'" title="文字题" size="huge">
      <p class="text">{{ text }}</p>
    </n-card>
    <n-card v-if="type == 'image'" title="图片题 请为图片配一句话" size="huge">
      <n-image class="image" :src="imgsrc"></n-image>
    </n-card>
    <n-space justify="space-between" align="center">
      <audio controls autoplay loop src="/res/audio.mp3"></audio>
      <n-space>
        <n-button type="warning" @click="last">上一题</n-button>
        <n-select
          placeholder="题目类型"
          :options="options"
          v-model:value="type"
          size="medium"
          style="width: 100px"
          @update:value="next"
        />
        <n-input placeholder="题目序号" v-model:value="index"></n-input>
        <n-button type="info" @click="goto(type, index)">跳转</n-button>
        <n-button type="primary" @click="next">下一题</n-button>
      </n-space>
    </n-space>
  </n-space>
</template>
<script setup lang="ts">
  import {
    NSpace,
    NButton,
    NCard,
    NSelect,
    NInput,
    NImage,
    useMessage,
  } from 'naive-ui'
  import { ref } from 'vue'
  const message = useMessage()
  const imgsrc = ref('')
  const text = ref('')
  const type = ref('text')
  const index = ref('')
  const options = [
    {
      label: '文字',
      value: 'text',
    },
    {
      label: '图片',
      value: 'image',
    },
  ]
  async function goto(type: string, index: string) {
    if (type == 'text') {
      try {
        let res = await aardio.goToTextQuestion(parseInt(index))
        let data = JSON.parse(res)
        if (data.msg) {
          message.warning(data.msg)
        } else {
          text.value = data.text
        }
      } catch (error: any) {
        console.log(error)
        message.error(error.message)
      }
    }
    if (type == 'image') {
      try {
        let res = await aardio.goToImageQuestion(parseInt(index))
        let data = JSON.parse(res)
        if (data.msg) {
          message.warning(data.msg)
        } else {
          imgsrc.value = data.imgsrc
        }
      } catch (error: any) {
        console.log(error)
        message.error(error.message)
      }
    }
  }
  async function next() {
    try {
      let res = await aardio.next(type.value)
      let data = JSON.parse(res)
      if (data.msg) {
        message.warning(data.msg)
      } else {
        type.value = data.type
        index.value = data.index
        goto(data.type, data.index)
      }
    } catch (error: any) {
      console.log(error)
      message.error(error.message)
    }
  }
  async function last() {
    try {
      let res = await aardio.last()
      let data = JSON.parse(res)
      if (data.msg) {
        message.warning(data.msg)
      } else {
        type.value = data.type
        index.value = data.index
        goto(data.type, data.index)
      }
    } catch (error: any) {
      console.log(error)
      message.error(error.message)
    }
  }
  next()
</script>
<style>
  .text {
    font-size: 64px;
    font-weight: bolder;
    min-height: 25vh;
  }
  .image {
    display: block;
  
    text-align: center;
  }

  .image img {
    max-width: 60vw;
    max-height: 60vh;
  }
</style>
