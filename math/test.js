const arr = [10, 4, 33,9,45,33,22,1, 8]
function bubble(arr){
    arr = arr.concat([])
    for(var i =0; i<arr.length; i++){
        for(var j=0; j< arr.length -i - 1; j++){
            
            if(arr[j] > arr[j + 1]){
                [arr[j], arr[j + 1]] = [arr[j+1], arr[j]]
            }
        }
    }
    return arr;
}

let res0 = bubble(arr)
console.log('bubble', res0)

function insert(arr){
    arr = arr.concat([])
    for(var i =0; i< arr.length; i++){
        for(var j=i-1; j>=0; j--){
            if(arr[j] > arr[j+1]){
                [arr[j], arr[j + 1]] = [arr[j+1], arr[j]]
            }
        }
    }
    return arr
}

let res1 = insert(arr)
console.log('insert', res1)

function quick(arr){
    arr = arr.concat([])
    if(arr.length <=1){
        return arr
    }
    
    const flag = arr.shift(0);
    const left = [];
    const right = [];
    for(let i =0;i <arr.length; i++){
        if(arr[i] <= flag){
            left.push(arr[i])
        }else{
            right.push(arr[i])
        }
    }
    return quick(left).concat(flag, quick(right))
}
let res2 = quick(arr)
console.log('quick', res2)