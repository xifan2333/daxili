<template>
  <n-space vertical justify="space-between" align="center" class="cover">
    <n-image class="img-ctn" object-fit="contain" src="/res/cover.jpg" />
    <n-button size="large" type="primary" @click="start">
      <n-icon size="25">
        <GameControllerOutline />
      </n-icon>
      <span style="margin-left: 10px; font-size: large">开始</span>
    </n-button>
  </n-space>
</template>
<script setup lang="ts">
  import { NSpace, NImage, NButton, NIcon, useMessage } from 'naive-ui'
  import { GameControllerOutline } from '@vicons/ionicons5'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const message = useMessage()
  async function start() {
    router.push(`/question`)
  }
  async function checkQuestion() {
    try {
      let has = await aardio.hasQuestion()
      if (!has) {
        message.warning('题库不存在，请先配置题库。')
        router.push('/settings')
      }
    } catch (error: any) {
      console.log(error)
      message.error(error.message)
    }
  }
  checkQuestion()
</script>
<style>
  .img-ctn img {
    max-width: 60vw;
    max-height: 60vh;
  }
</style>
