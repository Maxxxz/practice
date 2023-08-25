import { myContainer } from "./inversify.config";
import { TYPES } from "./types";
import { Warrior } from "./interfaces";
// import { Ninja } from "./entities";

const ninja = myContainer.get<Warrior>(TYPES.Warrior);

// expect(ninja.fight()).eql("cut!"); // true
// expect(ninja.sneak()).eql("hit!"); // true

console.log('ninja.fight()', ninja.fight())
console.log('ninja.sneak()', ninja.sneak())


@Reflect.metadata('inClassqq', 'A')
class Test {
  @Reflect.metadata('inMethod', 'B')
  public hello(): string {
    return 'hello world';
  }
}

console.log(Reflect.getMetadata('inClassqq', Test)); // 'A'
console.log(Reflect.getMetadata('inMethod', new Test(), 'hello')); // 'B'
const t2 =  new Test()
console.log('t2', t2.hello())
