<script setup lang="ts">

import ShikijiViewer from './components/viewer/ShikijiViewer.vue';
import Editor from './components/editor/Editor.vue';
</script>

<template>

  <m-rice-paper class="m-cursor" :crane="false" :mountain="false">
    <div class="main">
      <div class="demo-view">
        <ShikijiViewer/>
      </div>
      <m-divider/>
      <Editor/>
    </div>
  </m-rice-paper>

</template>

<style scoped>
.main {
  height: 100vh;
  width: 100vw;

  display: grid;
  grid-template-rows: 48vh 1rem 48vh;
  padding: 2vh;
  box-sizing: border-box;
}

.demo-view {
  overflow-y: auto;
}
</style>
