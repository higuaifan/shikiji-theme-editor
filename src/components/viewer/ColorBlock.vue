<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2024/1/19 16:46
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

defineProps<{
  color: string
}>();

</script>

<template>
  <div class="color-block">
    <m-border class="color">
      <div class="color-cycle" :style="{'background-color':color}"/>
    </m-border>
    <span>{{color}}</span>
  </div>
</template>

<style scoped>
.color-cycle {
  width: 24px;
  height: 24px;
}

.color-block{
  display: flex;
  gap: 0.5rem;
}
</style>
