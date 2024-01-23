/**
 * @description
 * @author 阿怪
 * @date 2024/1/19 20:29
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ThemeRegistration } from 'shikiji';
import { themeTransform } from '../compositions/theme.ts';


const tokenColors = themeTransform({
  comment: {
    line: {
      'double-slash': 'comment'
    }
  },
  punctuation: {
    definition: {
      mVal: 'punctuation',
      comment: 'comment',
      block: {
        tag: {
          jsdoc: 'comment'
        }
      }
      // parameters: 'text'
    }
  },
  meta: {
    mVal: 'main',
    interface: 'keyword'
  },
  entity: {
    name: {
      type: {
        mVal: 'value',
        interface: 'keyword',
        instance: 'type'
      },
      function: 'func',
      tag: {
        mVal: 'value',
        html: 'vue'
      }
    },
    other: {
      mVal:'entity-impl',
      'attribute-name': 'type'
    }
  },
  keyword: {
    control: {
      mVal: 'keyword-operator',
      flow: 'storage',
      conditional: 'keyword'
    },
    operator: {
      mVal: 'keyword',
      operator: 'keyword-operator'
    },
    other: {
      mVal: 'keyword-operator',
      debugger: 'debugger'
    }
  },
  variable: {
    mVal: 'value',
    object: {
      property: 'property',
      readwrite: {
        alias: 'value'
      }
    },
    language: 'main'
  },
  storage: {
    mVal: 'main',
    type: {
      class: {
        jsdoc: 'doc-param'
      }
    }
  },
  string: {
    regexp: 'regexp'
  },
  support: {
    type: 'type'
  },
  constant: {
    numeric: 'constant'
  },
  invalid: {
    illegal: {
      'unrecognized-tag': 'value'
    }
  },
  text:{
    html:{
      derivative: 'keyword'
    }
  }
});

console.log(JSON.stringify(tokenColors));

export const ShuimoTheme: ThemeRegistration = {
  name: 'shuimo',
  tokenColors
};


