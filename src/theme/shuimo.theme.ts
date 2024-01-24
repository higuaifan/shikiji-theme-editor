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
    },
    block: {
      mVal: 'comment'
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
      },
      parameters: 'text'
    },
    separator: {
      'key-value': 'text'
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
      mVal: 'entity-impl',
      'attribute-name': {
        mVal: 'type',
        class: 'func'
      }
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
      operator: 'keyword-operator',
      expression: 'main',
      logical: 'main'
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
      },
      enummember: 'value'
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
  text: {
    html: {
      derivative: 'text'
    }
  }
});


// 偷个懒
const token: ThemeRegistration['tokenColors'] = [];
const colorMap = new Map<string, string[]>();
tokenColors.forEach(item => {
  const color = item.settings.foreground;
  const { scope } = item;
  if (color) {
    colorMap.set(color,
      colorMap.get(color) ? [...colorMap.get(color), scope] : [scope]);
  }
});

[...colorMap.keys()].forEach(c => {
  const scopes = colorMap.get(c);
  token.push({
    scope: scopes,
    settings: { foreground: c }
  });
});
const slimColor = token;
console.log(JSON.stringify(slimColor));// 压缩版


export const ShuimoTheme: ThemeRegistration = {
  name: 'shuimo',
  tokenColors: slimColor
};


