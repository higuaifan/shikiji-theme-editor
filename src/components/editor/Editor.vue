<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2024/1/19 20:25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ts } from './code/ts';
import { onMounted, ref } from 'vue';
import { codeToThemedTokens } from 'shikiji';
import { ShuimoTheme } from '../../theme/shuimo.theme.ts';

const codeRef = ref(ts);

const tokenHTML = ref('');

const toTokenHTML = async () => {
  const nodesList = await codeToThemedTokens(codeRef.value, {
    lang: 'ts',
    includeExplanation: true,
    theme: ShuimoTheme
  });
  tokenHTML.value = nodesList.map((nodes, i) => {
    return nodes.map((node, j) => {
      return `<span class="token" style="color:${node.color}" data-index="${i}-${j}">${node.content}</span>`;
    }).join('');
  }).join('<br/>');
};

onMounted(() => {
  toTokenHTML();
});

</script>

<template>

  <div class="editor">

    <div class="editor-viewer" v-html="tokenHTML">

    </div>


  </div>

</template>

<style scoped>

.editor-viewer{
  overflow-y: auto;
  height: calc(50vh - 4rem);
}

</style>
