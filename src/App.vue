<script setup lang="ts">

import CodeViewer from './components/CodeViewer.vue';
</script>

<template>

  <m-rice-paper class="full m-cursor" :crane="false">
    <div class="header">
      <m-dark-mode/>
    </div>
    <div class="main">

      <CodeViewer/>

    </div>
  </m-rice-paper>

</template>

<style scoped>

.header {
  position: fixed;
  width: 100vw;
  display: flex;
  flex-direction: row-reverse;
  padding: 1rem 2rem 0 0;
  box-sizing: border-box;
  top: 0;
  height: 43px;
}

.full {
  height: 100vh;
  width: 100vw;
}

.main {
  height: calc(100vh - 43px);
  width: 100vw;

  display: grid;
  grid-template-rows: 48vh 1rem 48vh;
  padding: 1rem;
  margin-top: 43px;
  box-sizing: border-box;
}

.demo-view {
  overflow-y: auto;
}
</style>
