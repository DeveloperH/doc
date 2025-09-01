# BaseServer



## Spring-boot



### Result

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result {
    private Integer code;   // 响应码，1 代表成功；0 代表失败
    private String msg;     // 响应信息 描述字符串
    private Object data;    // 返回的数据

    public static Result success() {    // 增删改 成功响应
        return new Result(1, "success", null);
    }

    public static Result success(Object data) {     // 查询 成功响应
        return new Result(1, "success", data);
    }

    public static Result error(String msg) {    // 失败响应
        return new Result(0, msg, null);
    }
}
```

```java
@Slf4j
@Controller
public class BasicController {

    @RequestMapping("/getUser")
    @ResponseBody
    public Result getUser(@RequestParam(name = "name", defaultValue = "unknown user") String name) {
				log.info("getUser----");
				return Result.success(name);
    }
}
```



### 分页条件查询

* PageHelper







### 文件上传到本地

```java
@Slf4j
@RestController
@RequestMapping("/demo")
public class DemoController {

    @PostMapping("/upload")
    public Result upload(@RequestParam("file") MultipartFile file) throws IOException {
        log.info("文件上传：{}, {}, {}", file.getOriginalFilename(), file.getContentType(), file.getSize());
        // 获取文件原始名
        String originalFilename = file.getOriginalFilename();
        // 构建唯一的文件名 uuid(通用唯一识别码)
        int index = originalFilename.lastIndexOf(".");
        String extname = originalFilename.substring(index);
        String newFileName = UUID.randomUUID() + extname;
        log.info("新的文件名：{}", newFileName);

        // 将文件存储到服务器的磁盘目录中 D:\images
        file.transferTo(new File("D:\\images\\" + newFileName));
        return Result.success("D:\\images\\" + newFileName);
    }
}
```



* `String getOriginalFilename()` ：获取原始文件名
* `void transferTo(File dest)` ：将接收的文件转存到磁盘文件中
* `Long getSize()` ：获取文件的大小。单位：字节
* `byte[] getBytes()` ：获取文件内容的字节数组
* `InputStream getInputStream()` ：获取接受到的文件内容的输入流



对 SpringBoot 进行配置：

```yaml
spring:
  servlet:
    multipart:
      max-file-size: 10MB       # 配置单个文件最大上传大小（默认为1M）
      max-request-size: 100MB   # 配置单个请求最大上传大小（一次请求可以上传多个文件）
```





### 登录校验



#### Cookie





```java
@RestController
@RequestMapping("/session")
public class SessionController {

    @GetMapping("c1")
    public Result cookie1(HttpServletResponse response) throws IOException {
        response.addCookie(new Cookie("username", "zhangsan")); // 设置Cookie/响应Cookie
        return Result.success();
    }

    @GetMapping("c2")
    public Result cookie2(HttpServletRequest request) throws IOException {
        Cookie[] cookies = request.getCookies();    // 获取所有Cookie
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("username")) {
                    System.out.println("username:" + cookie.getValue());
                }
            }
        }

        return Result.success();
    }
}
```





#### JWT



#### 过滤器 Filter



#### 拦截器 Interceptor

























