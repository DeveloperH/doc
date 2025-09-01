# 算法

## 二分查找

二分查找，也叫做对半查找。查找的效率会提升一点。

原理: 先折半 一分为二 开始比较，再一分为二，再比较...

**限制: 要求必须是一个有序的数组。**

```js
/**
 * 二分查找函数
 * 
 * @param {Array} arr - 已排序的数组
 * @param {number} target - 需要查找的目标值
 * @returns {number} - 返回目标值在数组中的索引，如果找不到返回 -1
 */
function binarySearch(arr, target) {
    let left = 0;  // 初始化左边界
    let right = arr.length - 1;  // 初始化右边界
    
    // 当左边界不超过右边界时，继续进行查找
    while (left <= right) {
        // 计算中间索引
        const mid = Math.floor((left + right) / 2);
        
        // 如果目标值与中间元素相等，返回中间索引
        if (arr[mid] === target) {
            return mid;
        }
        
        // 如果目标值小于中间元素，目标值只能在左半部分
        if (arr[mid] > target) {
            right = mid - 1;  // 将右边界移到中间位置左侧
        }
        
        // 如果目标值大于中间元素，目标值只能在右半部分
        else {
            left = mid + 1;  // 将左边界移到中间位置右侧
        }
    }
    
    // 如果循环结束，说明数组中没有找到目标值，返回 -1
    return -1;
}

// 示例
const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const target = 7;
const index = binarySearch(arr, target);
console.log(index);  // 输出: 3，因为7在数组中的索引是3
```





## 冒泡排序

```js
/**
 * 冒泡排序函数
 * 
 * @param {Array} arr - 待排序的数组
 * @returns {Array} - 排序后的数组
 */
function bubbleSort(arr) {
    let n = arr.length;  // 获取数组的长度
    
    // 外层循环控制排序的轮数
    for (let i = 0; i < n - 1; i++) {
        // 内层循环执行每一轮排序
        // 每次遍历将当前未排序部分的最大元素"冒泡"到最后
        for (let j = 0; j < n - i - 1; j++) {
            // 如果当前元素大于下一个元素，交换它们
            if (arr[j] > arr[j + 1]) {
                // 交换 arr[j] 和 arr[j + 1]
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;  // 返回排序后的数组
}

// 示例
const arr = [5, 2, 9, 1, 5, 6];
const sortedArr = bubbleSort(arr);
console.log(sortedArr);  // 输出: [1, 2, 5, 5, 6, 9]

```





## 反转

例如，将 `abcdefg` 反转为 `gfedcba`

```js
/**
 * 字符串反转函数
 * 
 * @param {string} str - 待反转的字符串
 * @returns {string} - 反转后的字符串
 */
function reverseString(str) {
    // 使用 split() 将字符串转换为数组，然后使用 reverse() 反转数组，再使用 join() 将数组转回字符串
    return str.split('').reverse().join('');
}

// 示例
const str = "abcdefg";
const reversedStr = reverseString(str);
console.log(reversedStr);  // 输出: "gfedcba"
```

















































