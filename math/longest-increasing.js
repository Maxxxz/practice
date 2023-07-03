// https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247485269&idx=1&sn=571a6366b0b592f103971ae3e119998b&scene=21#wechat_redirect

/**
 * @param {number[]} nums
 * @return {number}
 */
// nums[i] > nums[j]
// dp[i] = Math.max(dp[i], dp[j]+1)
var lengthOfLIS = function (nums) {
  var dp = new Array(nums.length).fill(1);
  for(let i=0; i<nums.length; i++){
    for(let j=0;j<i; j++){
        if(nums[i] > nums[j]){
            dp[i] = Math.max(dp[j]+1, dp[i])
        }
    }
  }
  return Math.max(...dp)
};

var arr = [0,1,0,3,2,3]
lengthOfLIS(arr);