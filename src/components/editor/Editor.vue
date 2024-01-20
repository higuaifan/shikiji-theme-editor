<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2024/1/19 20:25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ShuimoTheme } from '../../theme/shuimo.theme.ts';
import ShikijiViewer from '../viewer/ShikijiViewer.vue';

</script>

<template>
  <div class="editor">
    <ShikijiViewer :theme="ShuimoTheme"/>
  </div>
</template>

<style scoped>

.editor {
  overflow-y: auto;
}

</style>
