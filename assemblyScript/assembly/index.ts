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


export function goconcat(a: string, b: string): string {
  return a + b
}