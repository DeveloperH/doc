# 算法

算法：解决某个实际问题的过程和方法。



学习算法的技巧：

1. 先搞清楚算法的流程
2. 直接去推敲如何写代码



## 排序算法

### 冒泡排序

冒泡排序：相邻两个元素进行比较,如果符合条件就换位。两层循环：外层冒泡轮数，里层依次比较

```java
public static void bubbleSort(int[] arr) {
    // 不用遍历最后一个元素
    for (int i = 0; i < arr.length - 1; i++) {
        // -i：让每一次比较的元素减少；-1：避免角标越界
        for (int j = 0; j < arr.length - i - 1; j++) {
          	// 从小到大
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}
```



### 选择排序

选择排序：内循环结束一次，最值出现头角标位置上。

```java
public static void selectionSort(int[] arr) {
    // 不用遍历最后一个元素
    for (int i = 0; i < arr.length - 1; i++) {
        for (int j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
}

// 优化
public static void selectionSort(int[] arr) {
    for (int i = 0; i < arr.length - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < arr.length; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j;
            }

        }
        if (minIndex != i) {
            int temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
}
```









## 查找算法



### 二分查找(折半查找)

折半查找：每次排除一半的数据，可以大大提高效率。前提条件：数组必须是有序的。



```java
public static int halfSearch(int[] arr, int value) {
    int min = 0;
    int max = arr.length - 1;
    int mid = (max + min) / 2;

    while (arr[mid] != value) {
        if (value > arr[mid]) {
            // value 比中间值大，最小角标移到中间角标前面
            min = mid + 1;
        } else if (value < arr[mid]) {
            max = mid - 1;
        }
        if (min > max) {
            return -1;
        }
        mid = (max + min) / 2;
    }

    return mid;
}


// 第二种折半查找
public static int halfSearch2(int[] arr, int value) {
    int min = 0, max = arr.length - 1;
    int mid;

    while (min <= max) {
        mid = (min + max) / 2;
        if (arr[mid] == value) {
            return mid;
        } else if (arr[mid] > value) {
            max = mid - 1;
        } else {
            min = mid + 1;
        }
    }
    return -1;
}
```











































