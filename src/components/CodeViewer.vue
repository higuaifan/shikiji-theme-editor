<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2024/1/24 14:25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { onMounted, ref } from 'vue';
import useShikijiToHTML from '../compositions/useShikijiToHTML.ts';
import { ShuimoTheme } from '../theme/shuimo.theme.ts';
import CodeStore from '../store/code.store.ts';
import { storeToRefs } from 'pinia';
import TokenDetails from './viewer/TokenDetails.vue';

const codeStore = CodeStore();
const { codeRef } = storeToRefs(codeStore);

const isEditorRef = ref(false);
const toggleCode = () => {isEditorRef.value = !isEditorRef.value;};


const {
  initNode, tokenHTMLRef, currentTokenRef, catchClickEvent
} = useShikijiToHTML();
const {
  initNode: initThemeNode,
  tokenHTMLRef: themeTokenHTMLRef,
  currentTokenRef: themeCurrentTokenRef,
  catchClickEvent: themeCatchClickEvent
} = useShikijiToHTML(ShuimoTheme);

onMounted(() => {
  initNode();
  initThemeNode();
});

</script>

<template>
  <div class="code-viewer">
    <div class="code-viewer-main">
      <m-button @click="toggleCode">{{ isEditorRef ? '查看效果' : '编辑代码' }}</m-button>
      <div class="codes" v-show="!isEditorRef">
        <div class="demo-code">
          <pre class="code-pre" v-html="tokenHTMLRef" @click="catchClickEvent"/>
        </div>
<!--        <m-divider/>-->
        <div class="theme-code">
          <pre class="code-pre" v-html="themeTokenHTMLRef" @click="themeCatchClickEvent"/>
        </div>
      </div>
      <div class="editor" v-show="isEditorRef">
        <m-input type="textarea" v-model="codeRef"/>
      </div>
    </div>
    <m-divider vertical/>
    <div class="token-details">
      <TokenDetails :token="currentTokenRef"/>
      <m-divider/>
      <TokenDetails :token="themeCurrentTokenRef"/>
    </div>
  </div>
</template>

<style scoped>

.code-viewer {
  display: inline-flex;
  width: 66vw;
  height: calc(100vh - 43px);
}

.code-viewer-main {
  height: 100%;
}

.codes {
  overflow: auto;
  height: 100%;
  display: flex;
}

.token-details {
  display: inline-block;
  width: 33vw;
  height: 100%;
}

</style>
