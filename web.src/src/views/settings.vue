<template>
  <div id="settings">
    <n-space vertical>
      <n-card title="软件配置" size="huge">
        <n-form ref="configRef" inline :label-width="80" :model="config">
          <n-form-item label="俱乐部 logo" path="logo">
            <n-input placeholder="png格式" :value="config.logoPath" />
            <n-button style="margin-left: 10px" @click="chooseLogo"
              >选择logo图片</n-button
            >
          </n-form-item>
          <n-form-item label="大喜利封面" path="cover">
            <n-input placeholder="jpg格式" :value="config.coverPath" />
            <n-button style="margin-left: 10px" @click="chooseCover"
              >选择封面图片</n-button
            >
          </n-form-item>
          <n-form-item label="背景音乐" path="audio">
            <n-input placeholder="mp3格式" :value="config.audioPath" />
            <n-button style="margin-left: 10px" @click="chooseAudio"
              >选择背景音乐</n-button
            >
          </n-form-item>
        </n-form>
      </n-card>
      <n-space justify="end" align="center">
        <n-button @click="saveConfig">提交配置</n-button>
      </n-space>
      <n-card title="题库配置" size="huge">
        <n-form inline :label-width="80" ref="questionRef" :model="question">
          <n-form-item label="文本题库" path="text">
            <n-input
              type="text"
              placeholder="txt文件，用回车分割"
              :value="question.textPath"
            />
            <n-button style="margin-left: 10px" @click="chooseTextPath"
              >选择文本文件</n-button
            >
          </n-form-item>
          <n-form-item
            label="图片题库"
            path="images"
            :value="question.imageDir"
          >
            <n-input
              type="text"
              placeholder="图片所在文件夹"
              :value="question.imageDir"
            />
            <n-button style="margin-left: 10px" @click="chooseImageDir"
              >选择图片所在文件夹</n-button
            >
          </n-form-item>
        </n-form>
      </n-card>
      <n-space justify="end" align="center">
        <n-button @click="updateQuestion">提交题库</n-button>
      </n-space>
      <n-card v-if="hasQuestion" title="使用详情" size="huge">
        <p class>文字题共计{{ textTotal }}道，已使用{{ textUsedNum }}道。</p>
        <p class>图片题共计{{ imageTotal }}道，已使用{{ imageUsedNum }}道。</p>
      </n-card>
      <n-space v-if="hasQuestion" justify="end" align="center">
        <n-button @click="clearUsedData">重置题库</n-button>
      </n-space>
    </n-space>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import {
    NSpace,
    NButton,
    NCard,
    NForm,
    NFormItem,
    NInput,
    useMessage,
  } from 'naive-ui'
  const message = useMessage()
  const config = ref({
    logoPath: '',
    coverPath: '',
    audioPath: '',
  })
  const question = ref({
    textPath: '',
    imageDir: '',
  })
  const hasQuestion = ref(false)
  const textTotal = ref(0)
  const textUsedNum = ref(0)
  const imageTotal = ref(0)
  const imageUsedNum = ref(0)

  async function chooseLogo() {
    let logoPath = await aardio.chooseLogo()
    config.value.logoPath = logoPath
  }
  async function chooseCover() {
    let coverPath = await aardio.chooseCover()
    config.value.coverPath = coverPath
  }
  async function chooseAudio() {
    let audioPath = await aardio.chooseAudio()
    config.value.audioPath = audioPath
  }
  async function saveConfig() {
    try {
      let res = await aardio.saveConfig(
        config.value.logoPath,
        config.value.coverPath,
        config.value.audioPath
      )
      let data = JSON.parse(res)
      message.success(data.msg)
    } catch (error: any) {
      console.log(error)
      message.error(error.message)
    }
  }
  async function chooseTextPath() {
    let textPath = await aardio.chooseTextPath()
    question.value.textPath = textPath
  }
  async function chooseImageDir() {
    let imageDir = await aardio.chooseImageDir()
    question.value.imageDir = imageDir
  }
  async function updateQuestion() {
    try {
      let res = await aardio.updateQuestion(
        question.value.textPath,
        question.value.imageDir
      )
      let data = JSON.parse(res)
      message.success(data.msg)
      fetchDataDetail()
    } catch (error: any) {
      console.log(error)
      message.error(error.message)
    }
  }
  async function fetchDataDetail() {
    try {
      let has = await aardio.hasQuestion()
      hasQuestion.value = has
      if (has) {
        let res = await aardio.fetchDataDetail()
        let data = JSON.parse(res)
        textTotal.value = data.textTotal
        textUsedNum.value = data.textUsedNum
        imageTotal.value = data.imageTotal
        imageUsedNum.value = data.imageUsedNum
      }
    } catch (error: any) {
      console.log(error)
      message.error(error.message)
    }
  }
  async function clearUsedData() {
    try {
      let res = await aardio.clearUsedData()
      let data = JSON.parse(res)
      message.success(data.msg)
      fetchDataDetail()
    } catch (error: any) {
      console.log(error)
      message.error(error.message)
    }
  }

  fetchDataDetail()
</script>

<style scoped>
  #settings {
    padding: 20px;
  }
</style>
