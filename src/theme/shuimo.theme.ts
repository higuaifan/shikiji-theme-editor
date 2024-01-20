/**
 * @description
 * @author 阿怪
 * @date 2024/1/19 20:29
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ThemeRegistration } from 'shikiji';


const scopeColor = (scope: string|string[], color: string) => ({
  scope,
  settings: { foreground: `var(--m-skj-${color})` }
});

export const ShuimoTheme :ThemeRegistration= {
  name: 'shuimo',
  tokenColors: [
    // scopeColor('comment', 'comment'), // link block
    //
    // scopeColor('punctuation', 'punctuation'), // 标点
    // scopeColor('punctuation.definition.comment', 'comment'),
    //
    // scopeColor('meta', 'main'), // ;,()./等

    scopeColor(['keyword.operator.assignment'], 'empty'),
    scopeColor(['meta.var.expr'], 'main'),
    //
    // scopeColor('keyword', 'keyword'),
    // scopeColor('keyword.control', 'keyword'),
    // scopeColor('keyword.control.flow', 'storage'), // await
    //
    // scopeColor('keyword.operator', 'keyword-operator'),
    // scopeColor('keyword.other', 'keyword-other'),
    //
    // scopeColor('storage', 'storage'),
    //
    // scopeColor('entity', 'white'),
    // scopeColor('entity.name.type', 'entity'),
    // //
    // scopeColor('entity.name.function', 'entity'), // 变量名
    // scopeColor('entity.name.type.class', 'entity-warn'),
    // scopeColor('entity.name.type.instance', 'entity-impl'), // 注释变量
    // scopeColor('entity.other', 'entity-impl'), // 继承或者实现



    // scopeColor('variable', 'main2'),
    // scopeColor('constant', 'main2'),
    // scopeColor('invalid', 'main2'),
    // scopeColor('support', 'main2'),
    // scopeColor('switch-block', 'main2'),
    // scopeColor('switch-expression', 'main2'),
    // scopeColor('switch-statement', 'main2'),
    // scopeColor('case-clause', 'main2'),
    // scopeColor('cast', 'main2'),
    // scopeColor('new', 'main2'),
    // scopeColor('string', 'main2'),
    // scopeColor('literal', 'main2'),
    // scopeColor('other', 'main2'),


    // { scope: ['keyword.control'], settings: { foreground: 'var(--m-skj-control)' } },
    // { scope: ['storage.type'], settings: { foreground: 'var(--m-skj-storage)' } },
    // // { scope: ['keyword.operator.assignment'], settings: { foreground: 'var(--m-skj-operator)' } },
    // { scope: ['keyword.operator.assignment'], settings: { foreground: 'var(--m-skj-operator)' } },
    // {
    //   scope: [
    //     'meta.definition.variable',
    //     'variable.other.constant'
    //   ],
    //   settings: { foreground: 'var(--m-skj-variable)' }
    // }
  ]

}
