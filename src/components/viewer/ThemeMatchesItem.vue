<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2024/1/19 14:31
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import ColorBlock from './ColorBlock.vue';
import { computed, ref } from 'vue';

const props = defineProps<{
  themeMatches: any
}>();

const scope = computed(() => {
  if(Array.isArray(props.themeMatches.scope)){
    return props.themeMatches.scope;
  }
  return [props.themeMatches.scope];
});


const tmVisibleRef = ref(false);
const toggleVisible = () => {
  tmVisibleRef.value = !tmVisibleRef.value;
};

</script>

<template>


  <div>
    <div class="tm-settings">
      <div v-if="!themeMatches.settings">
        {{ themeMatches.settings }}
      </div>
      <ColorBlock v-else :color="themeMatches.settings?.foreground"/>
    </div>
    <div class="tm-names-wrapper">
      <m-button @click="toggleVisible">{{tmVisibleRef?'隐藏':'显示token'}}</m-button>
      <ul class="tm-names" v-if="tmVisibleRef">
        <m-li v-for="s in scope">
          {{ s }}
        </m-li>
      </ul>
    </div>
  </div>

</template>

<style scoped>

</style>
