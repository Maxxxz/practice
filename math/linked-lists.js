/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    let headAIndex = headA.length;
    let headBIndex = headB.length;
    let resultIndex = null;
    while (headAIndex >=0 && headBIndex >= 0){
        console.log('1')
        if(headA[headAIndex-1] === headB[headBIndex -1] && headAIndex === headBIndex){
            headAIndex -=1;
            headBIndex -=1;
            resultIndex = headAIndex;
        }else{
            headBIndex = -1;
        }
    }
    return resultIndex !== null ? headA[resultIndex] : null;
};

const res = getIntersectionNode([4,1,8,4,5], [5,6,1,8,4,5])
console.log('res', res)