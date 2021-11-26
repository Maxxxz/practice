// The entry file of your WebAssembly module.

// export function add(a: i32, b: i32): i32 {
//   // console.log('hhhh');
//   return a + b;
// }

// export function dealObj() : string {
//   var a = concat('aaaa')
//   return a;
// }


// export function addOrConcat<T>(a: T, b: T): T {  // 泛型用了会出错
//   return a + b; // concats if a string, otherwise adds
// }

// export function addOrSomethingElse(a: number | string): number|string {
//   if(isString(a)){
//     return String.UTF8.encode(a, false);
//   }
//   return a;
// }

// export function doSomething(something: u32): string | null {
//   // store(255, something)
//   if (something) {
//     something.length // works
//   }
//   return something;
// }
export function isPrime(x: u32): bool {
  if (x < 2) {
      return false;
  }

  for (let i: u32 = 2; i < x; i++) {
      if (x % i === 0) {
          return false;
      }
  }

  return true;
}


function addOrSomethingElse<T>(a: T, b: T): T {
  if (isString<T>()) {
    return "something else"; // eliminated if T is not a string
  } else {
    return a + b; // eliminated if T is a string
  }
}
// 需要外部js主动分配内存空间
export function goconcat(a: string, b: string): string {
  const str = addOrSomethingElse(a, b);
  return str
}


// AssemblyScript
export class Foo {
  constructor(public str: string) {}
  getString(): string {
    return this.str
  }
}

export function getFoo(): Foo { // this one
  return new Foo("Hello class!")
}


