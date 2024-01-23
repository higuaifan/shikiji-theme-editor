<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2024/1/19 10:04
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { onMounted, ref, watch } from 'vue';
import { codeToThemedTokens, ThemedToken, ThemeRegistration } from 'shikiji';
import TokenDetails from './TokenDetails.vue';
import CodeStore from '../../store/code.store.ts';
import { storeToRefs } from 'pinia';


const props = defineProps<{
  theme?: ThemeRegistration
}>();

const codeStore = CodeStore();
const { codeRef } = storeToRefs(codeStore);

const tokenHtml = ref('');
const currentToken = ref();
let nodesList: ThemedToken[][] = [];
const toTokens = async () => {
  nodesList = await codeToThemedTokens(codeRef.value, {
    lang: 'vue',
    includeExplanation: true,
    theme: props.theme ?? 'vitesse-dark'
  });

  tokenHtml.value = nodesList.map((nodes, i) => {
    return nodes.map((node, j) => {
      const content = node.content
        .replaceAll('{', '&#123;')
        .replaceAll('}', '&#125;')
        .replaceAll('>', '&gt;')
        .replaceAll('<', '&lt;');
      return `<span class="token" style="color:${node.color}" data-index="${i}-${j}">${content}</span>`;
    }).join('');
  }).join('<br/>');

};

watch(() => codeRef.value, () => {
  toTokens();
});


onMounted(() => {
  toTokens();
});

const showTokenInfo = (el: HTMLElement) => {
  const [i, j] = el.getAttribute('data-index')!.split('-').map(e => Number(e));
  const token = nodesList[i][j];
  console.log(token);
  currentToken.value = token;
};

const catchClickEvent = (e: MouseEvent) => {
  if (e.target && e.target instanceof HTMLElement) {
    if (e.target.nodeName === 'SPAN' && e.target.attributes.getNamedItem('data-index')) {
      showTokenInfo(e.target);
    }
  }
};

</script>

<template>
  <div class="shikiji-editor m-scroll">
    <div class="viewer-editor">
      <div class="code-pre-wrapper">
        <pre class="code-pre" v-html="tokenHtml" @click="catchClickEvent"/>
      </div>
      <m-input type="textarea" v-model="codeRef"/>
      <div class="info">
        <TokenDetails :token="currentToken"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.viewer-editor {
  display: grid;
  grid-template-columns: 1fr 1fr 700px;
  overflow-y: auto;
}

.info {
  overflow-y: auto;
}


</style>
