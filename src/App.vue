<script setup lang="ts">

import ShikijiViewer from './components/viewer/ShikijiViewer.vue';
import Editor from './components/editor/Editor.vue';
</script>

<template>

  <m-rice-paper class="full m-cursor" :crane="false">
    <div class="header">
      <m-dark-mode/>
    </div>
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

.header {
  position: fixed;
  width: 100vw;
  display: flex;
  flex-direction: row-reverse;
  padding: 1rem 2rem 0 0 ;
  box-sizing: border-box;
  top: 0;
}

.full {
  height: 100vh;
  width: 100vw;
}

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
