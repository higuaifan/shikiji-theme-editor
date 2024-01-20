<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2024/1/19 14:03
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ThemedToken, ThemedTokenScopeExplanation } from 'shikiji';
import ThemeMatchesItem from './ThemeMatchesItem.vue';
import ColorBlock from './ColorBlock.vue';
import { computed } from 'vue';
import { MMessage } from 'shuimo-ui';

const props = defineProps<{
  token: ThemedToken
}>();


const compareColor = (color1: string | undefined, color2: string | undefined) => {
  if (!color1 || !color2) {
    return Infinity;
  }
  // 默认color都是十六进制
  const c16_1 = color1.replace('#', '');
  const c16_2 = color2.replace('#', '');
  const c = { r: c16_1.slice(0, 2), g: c16_1.slice(2, 4), b: c16_1.slice(4, 6), a: c16_1.slice(6, 8) };
  const c2 = { r: c16_2.slice(0, 2), g: c16_2.slice(2, 4), b: c16_2.slice(4, 6), a: c16_2.slice(6, 8) };
  const cNum1 = parseInt(c.r + c.g + c.b + c.a, 16);
  const cNum2 = parseInt(c2.r + c2.g + c2.b + c2.a, 16);
  return Math.abs(cNum1 - cNum2);
};

const tokenExplanation = computed(() => {
  const tokenColor = props.token.color;
  if (!tokenColor) {
    return props.token.explanation;
  }
  // 根据token颜色近似程度排序
  if (!props.token.explanation) {
    return [];
  }

  return props.token.explanation.map((a) => {
    const scopes = a.scopes;
    let scopeList: Array<ThemedTokenScopeExplanation & { topColor: string | undefined }> = [];
    scopeList = scopes.map(scope => {
      const tm = scope.themeMatches;

      // 对tm的颜色进行排序，没多少算力，开摆吧。。不然算法还是可以优化的
      scope.themeMatches = tm.sort((a, b) => {
        const color1 = a.settings?.foreground;
        const color2 = b.settings?.foreground;
        if (!color1 || !color2) {
          return 0;
        }
        return compareColor(tokenColor, color1) - compareColor(tokenColor, color2);
      });
      let topColor;
      if (scope.themeMatches?.[0]) {
        topColor = scope.themeMatches[0].settings?.foreground;
      }
      return {
        ...scope,
        topColor
      };
    });


    scopeList = scopeList.sort((a, b) => {
      const color1 = a.topColor;
      const color2 = b.topColor;
      // 颜色越接近越靠上
      return compareColor(tokenColor, color1) - compareColor(tokenColor, color2);
    });
    return { ...a, scopes: scopeList };
  });
});


const copyScopeName = (scopeName: string) => {
  navigator.clipboard.writeText(scopeName);
  MMessage.success(`复制${scopeName}成功！`);
};

</script>

<template>
  <div class="token" v-if="token">
    <div class="explanation-head">
      <div class="title">{{ token.content }}</div>
      <ColorBlock :color="token.color"/>
    </div>
    <m-divider/>
    <h1>explanations</h1>
    <div class="explanations">
      <div class="explanation" v-for="e in tokenExplanation">
      <div class="content">
        <m-li active> <strong>{{ e.content }}</strong> </m-li>
      </div>
      <div class="scopes" v-for="s in e.scopes">
          <div class="scope-title">
            <m-tag class="m-tag-cursor"
                   :style="{'--m-tag-bg': s.topColor}" @click="copyScopeName(s.scopeName)">
              <!--              scope:-->
              {{ s.scopeName }}
            </m-tag>

          </div>
          <ThemeMatchesItem :theme-matches="m" v-for="m in s.themeMatches"/>
          <m-divider/>
        </div>
      </div>


    </div>
  </div>
</template>

<style scoped>

.explanation-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 2.4rem;
  font-weight: bold;
}

.scope-title {
  font-size: 1.4rem;
  font-weight: bold;
}

.explanation {
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
}

</style>
