/**
 * @description
 * @author 阿怪
 * @date 2024/1/20 17:03
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineStore } from 'pinia';
import { ts } from '../components/editor/code/ts.ts';
import { ref } from 'vue';


export default defineStore('code', () => {

  const codeRef = ref(ts);


  return {
    codeRef
  }


});
