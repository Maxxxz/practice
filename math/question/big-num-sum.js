var addStrings = function(num1, num2) {
    let num = 0;
    let resultStr = ''
    let i = num1.length - 1;
    let j = num2.length - 1;
    while(i >= 0 || j >=0){
        let restemp = (+num1[i] || 0) + (+num2[j] || 0) + num;
        if(restemp >= 10){
            resultStr = String( String(restemp).slice(1, 2)) + resultStr
            num = +String(restemp).slice(0, 1)
        }else{
            resultStr = String( restemp ) + resultStr
            num = 0
        }
        i--;
        j--;
    }

    return  num ?  num + resultStr : resultStr
};

// 官方
var addStrings = function(num1, num2) {
    let i = num1.length - 1, j = num2.length - 1, add = 0;
    const ans = [];
    while (i >= 0 || j >= 0 || add != 0) {
        const x = i >= 0 ? num1.charAt(i) - '0' : 0;
        const y = j >= 0 ? num2.charAt(j) - '0' : 0;
        const result = x + y + add;
        ans.push(result % 10);
        add = Math.floor(result / 10);
        i -= 1;
        j -= 1;
    }
    return ans.reverse().join('');
};

// 优化


var addStrings = function(num1, num2) {
    let add = 0;
    let i = num1.length - 1;
    let j = num2.length - 1;
    let resultStr = ''
    while(i >= 0 || j >=0 || add >0){
        let tempRes = (+num1[i] || 0) + (+num2[j] || 0) + add;
        add = Math.floor(tempRes/10);
        resultStr = (tempRes % 10) + resultStr
        i--;
        j--;
    }
    return resultStr
};