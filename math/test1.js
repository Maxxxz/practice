// https://juejin.cn/post/6983904373508145189

/**
 * 
 * 输入
 */
let arr = [
    {id: 1, name: '部门1', pid: 0},
    {id: 2, name: '部门2', pid: 1},
    {id: 3, name: '部门3', pid: 1},
    {id: 4, name: '部门4', pid: 3},
    {id: 5, name: '部门5', pid: 4},
]
/**
* 输出
[
    {
        "id": 1,
        "name": "部门1",
        "pid": 0,
        "children": [
            {
                "id": 2,
                "name": "部门2",
                "pid": 1,
                "children": []
            },
            {
                "id": 3,
                "name": "部门3",
                "pid": 1,
                "children": [
                    // 结果 ,,,
                ]
            }
        ]
    }
]
*/

function toTree(arr){
    let trees = []
    arr.forEach((item)=>{
        findSub(trees, item)
    })
    return trees;
}

function findSub(trees, item){
    if(item.pid === 0){
        trees.push({
            id: item.id,
            name: item.name,
            pid: item.pid,
            children: []
        })
    } else {
        trees.forEach((tree)=>{
            if(tree.id === item.pid){
                tree.children.push({
                    id: item.id,
                    name: item.name,
                    pid: item.pid,
                    children: []
                });
            } else {
                tree.children?.length && findSub(tree.children, item)
            }
        })
    }
}

toTree(arr)