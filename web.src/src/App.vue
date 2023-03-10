<template>
  <div id="main">
  <n-config-provider :theme="theme">
    <n-global-style />
    <n-message-provider>
    <n-layout>
      <n-space vertical justify="space-between" id="main">
        <n-layout-header bordered class="header">
          <n-space justify="space-between" align="center">
            <n-space justify="start" align="center">
              <n-image height="50"
                src="/res/logo.png" />
            </n-space>
            <n-space justify="center">
              <h1>大喜利</h1>
            </n-space>
            <n-space justify="end" align="center">
              <n-switch v-model:value="nightIsActive" size="medium" @update-value="nightModeToggle">
                <template #checked-icon>
                  🌛
                </template>
                <template #unchecked-icon>
                  🌞
                </template>
              </n-switch>
              <n-button @click="goHome">
                <n-icon><HomeOutline/></n-icon>
              </n-button>
              <n-button @click="goSettings">
                <n-icon><SettingsOutline/></n-icon>
              </n-button>
            </n-space>
          </n-space>
        </n-layout-header>
        <n-layout-content class="content" content-style="padding:20px 100px;">
          <router-view></router-view>
        </n-layout-content>
        <n-layout-footer bordered class="footer">
          <n-space justify="center">
            作者：稀饭
          </n-space>
        </n-layout-footer>
      </n-space>
    </n-layout>
  </n-message-provider>
  </n-config-provider>
</div>
</template>
<script setup lang="ts">
import { ref,watch } from 'vue'
import { darkTheme, NLayout, NLayoutHeader, NLayoutContent, NLayoutFooter, NButton, NSpace, NIcon, NConfigProvider, NGlobalStyle, NImage, NSwitch,NMessageProvider} from 'naive-ui'
import type { GlobalTheme } from 'naive-ui'
import {SettingsOutline,HomeOutline} from "@vicons/ionicons5" 
import { useRouter } from 'vue-router'

const router = useRouter()
const theme = ref<GlobalTheme | null>(null)
const nightIsActive = ref(false)
function nightModeToggle(){
  if(nightIsActive.value){
    theme.value = darkTheme
  }else{
    theme.value = null
  }
}
function goSettings(){
 router.push("/settings")
}
function goHome(){
 router.push("/")
}
</script>
<style>
#main {
  min-height: 100vh;
}

.header,
.footer {
  padding: 10px 20px;
}
.content {
  flex:1;
}
</style>