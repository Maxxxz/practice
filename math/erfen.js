/**
输入: nums = [-1,0,3,5,9,12], target = 9
输出: 4
解释: 9 出现在 nums 中并且下标为 4
*/

var search = function(nums, target) {
    var left=0, right=nums.length -1;
    // debugger
    while(left <= right){
        var mid = Math.floor((right-left)/2)+left
        if(target === nums[mid]){
            return mid;
        } else if(target > nums[mid]){
            left = mid+1;
        }else if(target < nums[mid]){
            right = mid-1;
        }
    }
    return -1
};

search([-1,0,3,5,9,12], 9)