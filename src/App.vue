<script setup lang="ts">

import ShikijiViewer from './components/viewer/ShikijiViewer.vue';
import Editor from './components/editor/Editor.vue';
</script>

<template>

  <m-rice-paper class="m-cursor">
    <div class="main">
      <ShikijiViewer/>
      <Editor/>
    </div>
  </m-rice-paper>

</template>

<style scoped>
.main {
  height: 100vh;
  width: 100vw;

  display: grid;
  grid-template-rows: repeat(2, 50vh);
  padding: 2rem;
  box-sizing: border-box;


}
</style>
