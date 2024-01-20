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
import { codeToThemedTokens, ThemedToken } from 'shikiji';
import TokenDetails from './TokenDetails.vue';

const codeRef = ref(`import { createApp, ref } from 'vue'

createApp({
  setup() {
    return {
      count: ref(0)
    }
  }
}).mount('#app')`);
const tokenHtml = ref('');
const currentToken = ref();
let nodesList: ThemedToken[][] = [];
const toTokens = async () => {
  nodesList = await codeToThemedTokens(codeRef.value, {
    lang: 'ts',
    includeExplanation: true,
    theme: 'vitesse-dark'
  });

  tokenHtml.value = nodesList.map((nodes, i) => {
    return nodes.map((node, j) => {
      return `<span class="token" style="color:${node.color}" data-index="${i}-${j}">${node.content}</span>`;
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


  <div class="shikiji-editor">

    <div class="header">
      <m-button @click="toTokens">toTokens</m-button>
    </div>

    <div class="viewer-editor">
      <div>
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

.shikiji-editor {
}

.viewer-editor {
  display: grid;
  grid-template-columns: 1fr 1fr 700px;
}

.info {
  overflow-y: auto;
  height: 50vh;
}


</style>
