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
import { computed } from 'vue';

const props = defineProps<{
  themeMatches: any
}>();

const scope = computed(() => {
  if(Array.isArray(props.themeMatches.scope)){
    return props.themeMatches.scope;
  }
  return [props.themeMatches.scope];
});


</script>

<template>


  <div class="scope-theme-matches">
    <div class="tm-settings">
      <div v-if="!themeMatches.settings">
        {{ themeMatches.settings }}
      </div>
      <ColorBlock v-else :color="themeMatches.settings?.foreground"/>
    </div>
    <ul class="tm-names">
      <m-li v-for="s in scope">
        {{ s }}
      </m-li>
    </ul>
  </div>

</template>

<style scoped>

</style>
