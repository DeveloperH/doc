# 实用技巧

## 四种循环加法计算

```java
List<String> list = Arrays.asList("1.32", "22.1", "0.01", "4.78");

double sum1 = 0;
for (int i = 0; i < list.size(); i++) {
    sum1 += Double.parseDouble(list.get(i));
}
System.out.println(sum1);

double sum2 = 0;
Iterator<String> iterator = list.iterator();
while (iterator.hasNext()) {
    sum2 += Double.parseDouble(iterator.next());
}
System.out.println(sum2);


double sum3 = 0;
for (String item : list) {
    sum3 += Double.parseDouble(item);
}
System.out.println(sum3);

double sum4 = 0;
sum4 = list.stream().mapToDouble(Double::parseDouble).sum();
System.out.println(sum4);
```



## 避免链条调用中的空指针

```java
String code = stu.getAddr().getCity().getCode().trim();

String code = Optional.ofNullable(stu)
								.map(Student::getAddr)
								.map(Addr::getCity)
								.map(City::getCode)
								.map(String::trim)
								.orElse(null);
```





## 快速汇总数字

```java
List<Order> orders = new ArrayList<>();
orders.add(new Order(20L));
orders.add(new Order(10L));

LongSummaryStatistics summary = orders.stream().collect(Collectors.summarizingLong(Order::getAmount));

System.out.println("summary.getSum() = " + summary.getSum());
System.out.println("summary.getMin() = " + summary.getMin());
System.out.println("summary.getMax() = " + summary.getMax());
System.out.println("summary.getAverage() = " + summary.getAverage());

LongSummaryStatistics summary2 = orders.stream().collect(Collectors.summarizingLong(Order::getAmount));
summary.combine(summary2);	// 合并
```















































































