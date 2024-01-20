/**
 * @description color tools
 * @author 阿怪
 * @date 2024/1/20 19:39
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

const isHexColor = (color: string) => {
  return /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(color);
};

const compareHexColor = (color1: string, color2: string) => {
  const c16_1 = color1.replace('#', '');
  const c16_2 = color2.replace('#', '');
  const c = { r: c16_1.slice(0, 2), g: c16_1.slice(2, 4), b: c16_1.slice(4, 6), a: c16_1.slice(6, 8) };
  const c2 = { r: c16_2.slice(0, 2), g: c16_2.slice(2, 4), b: c16_2.slice(4, 6), a: c16_2.slice(6, 8) };
  const cNum1 = parseInt(c.r + c.g + c.b + c.a, 16);
  const cNum2 = parseInt(c2.r + c2.g + c2.b + c2.a, 16);
  return Math.abs(cNum1 - cNum2);
};

export const compareColor = (color1: string | undefined, color2: string | undefined) => {
  if (!color1 || !color2) {
    return Infinity;
  }

  // 如果是颜色变量
  if (color1.startsWith('var')) {
    color1 = getComputedStyle(document.documentElement).getPropertyValue(color1.replace('var(', '').replace(')', ''));
  }
  if (color2.startsWith('var')) {
    color2 = getComputedStyle(document.documentElement).getPropertyValue(color2.replace('var(', '').replace(')', ''));
  }

  if (isHexColor(color1) && isHexColor(color2)) {
    return compareHexColor(color1, color2);
  }

  return Infinity;
};
