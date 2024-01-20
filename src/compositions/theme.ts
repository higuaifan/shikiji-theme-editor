/**
 * @description
 * @author 阿怪
 * @date 2024/1/20 19:46
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ThemeRegistration } from 'shikiji';

export type ThemeRecord = Record<keyof ThemeRegistration['tokenColors'], any>;

const toColor = (color: string) => {
  if (color.startsWith('#')) {
    return color;
  }
  return `var(--m-skj-${color})`;
};


export const scopeColor = (scope: string | string[], color: string) => ({
  scope,
  settings: { foreground: toColor(color) },
});
export const themeTransform = (themeRecord: ThemeRecord) => {

  const colors: ThemeRegistration['tokenColors'] = [];

  const scan = (r: Record<any, any>, prev = '') => {
    if (prev !== '') prev += '.';
    Object.entries(r).forEach(([k, v]) => {
      if (k === 'mVal') return;
      const e = `${prev}${k}`;

      if (typeof v === 'object') {
        const hasMVal = v.hasOwnProperty('mVal');
        if (hasMVal) {
          colors.push(scopeColor(e, v.mVal));
        }
        scan(v, e);
      } else {
        colors.push(scopeColor(e, v));
      }
    });
  };

  scan(themeRecord);

  // @ts-ignore 摆烂了一下
  return colors.sort((a, b) => a.sort - b.sort);
};
