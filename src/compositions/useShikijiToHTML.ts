/**
 * @description
 * @author 阿怪
 * @date 2024/1/24 14:30
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import CodeStore from '../store/code.store.ts';
import { storeToRefs } from 'pinia';
import { codeToThemedTokens, ThemedToken, ThemeRegistration } from 'shikiji';
import { Ref, ref } from 'vue';


export default function useShikijiToHTML(theme?: ThemeRegistration) {

  const codeStore = CodeStore();
  const { codeRef } = storeToRefs(codeStore);

  const nodesListRef: Ref<ThemedToken[][]> = ref([]);
  const tokenHTMLRef = ref('');
  const colorListRef = ref([]);

  const initNode = async () => {
    nodesListRef.value = await codeToThemedTokens(codeRef.value, {
      // lang: 'ts',
      lang: 'vue',
      includeExplanation: true,
      theme: theme ?? 'vitesse-light'
    });
    tokenHTMLRef.value = nodesListRef.value.map((nodes, i) => {
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


  const currentTokenRef = ref();

  const showTokenInfo = (el: HTMLElement) => {
    const [i, j] = el.getAttribute('data-index')!.split('-').map(e => Number(e));
    const token = nodesListRef.value[i][j];
    currentTokenRef.value = token;
  };

  const catchClickEvent = (e: MouseEvent) => {
    if (e.target && e.target instanceof HTMLElement) {
      if (e.target.nodeName === 'SPAN' && e.target.attributes.getNamedItem('data-index')) {
        showTokenInfo(e.target);
      }
    }
  };

  return {
    tokenHTMLRef,
    colorListRef,
    nodesListRef,
    currentTokenRef,
    initNode,
    catchClickEvent,
  };


}
