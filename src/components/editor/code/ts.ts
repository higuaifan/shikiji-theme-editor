export const ts = `const func = function a (){};
import _ from 'lodash';
export declare interface MyInterface from './myClass';
export default MyClass;

type MyFoo = MyInterface;
type Types = keyof typeof types;

const regexp = /foo/g;
const func = function a (){};

// 写一行注释

/**
 * @param {string} name
 * @param {number} age
 * @param {boolean} isMale
 **/
interface IAbstractClass {}
class MyType extends AbstractClass implements IAbstractClass {
  private field: string;
  protected value: number;
  public num = 10;

  static foo(): unknown {}
  get hello(): any {}
  set hello(v): void {}

  method() {
    var x = 10;
    this.x = null;
    if (x === undefined) {
      console.log('foo');
      window.alert('foo');
      debugger;
      return false;
    }
    return true;
  }

  async function promise() {
    try {
      const res = await myCall();
      yield 10;
    } catch (e as Error) {
      throw new Error("invalid");
    } finally {
      for (let elem of array) {
        if (elem instanceof SomeClass || elem typeof SomeClass) return false;
      }
    }

    return true;
  }
}

enum MyEnum {
  UP = 1,
  DOWN = 2
}

export default SomeClass;
module.exports = foo;
`
