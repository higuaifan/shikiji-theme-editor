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
import { compareColor } from '../../compositions/color.ts';

const props = defineProps<{
  token: ThemedToken
}>();




const tokenExplanation = computed(() => {
  const tokenColor = props.token.color;
  console.log(props.token);
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
          <m-li active><strong>{{ e.content }}</strong></m-li>
        </div>
        <div class="scopes" v-for="s in e.scopes">
          <div class="scope-inside">
            <div class="scope-title">
              <m-tag class="m-tag-cursor"
                     :style="{'--m-tag-bg': s.topColor}" @click="copyScopeName(s.scopeName)">
                <!--              scope:-->
                {{ s.scopeName }}
              </m-tag>

            </div>
            <ThemeMatchesItem :theme-matches="m" v-for="m in s.themeMatches"/>
          </div>
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
