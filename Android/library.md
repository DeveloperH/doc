# Library



## http

### okhttp-OkGo

OkGo - 3.0 震撼来袭，该库是基于 Http 协议，封装了 OkHttp 的网络请求框架，比 Retrofit 更简单易用，支持 RxJava，RxJava2，支持自定义缓存，支持批量断点下载管理和批量上传管理功能

文档地址：https://github.com/jeasonlzy/okhttp-OkGo



### retrofit

它封装了 okhttp，适用于 Android 和 JVM 的类型安全 HTTP 客户端。

文档地址：https://github.com/square/retrofit



```groovy
// 添加依赖
implementation 'com.squareup.retrofit2:retrofit:2.11.0'
```

```xml
<!--  声明网络权限  -->
<uses-permission android:name="android.permission.INTERNET" />
```



```java
// 根据api接口创建 Java 接口
public interface api {

    @GET("get")
    Call<ResponseBody> get(@Query("userName") String username, @Query("password") String pwd);
    
    @POST("post")
    @FormUrlEncoded
    Call<ResponseBody> post(@Field("user") String user, @Field("pwd") String pwd);
}
```

```java
// 创建 Retrofit 配置，并生成接口实现类对象
Retrofit retrofit = new Retrofit.Builder().baseUrl("https://httpbin.org/").build();
HttpbinService httpbinService = retrofit.create(HttpbinService.class);

// 接口实现类对象调用对应方法获得响应
Call<ResponseBody> call = httpbinService.get("zhangsan", "123456");
// 异步请求。同步请求用 execute()
call.enqueue(new Callback<ResponseBody>() {
    @Override
    public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
        try {
            Log.d("test", response.body().string());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onFailure(Call<ResponseBody> call, Throwable throwable) {

    }
});
```



#### 注解

* 方法注解：标识请求方式
  * `@GET`、`@POST`、`@PUT`、`@DELETE`、`@PATH`、`@HEAD`、`@OPTIONS`
  * `@HTTP` ：手动指定请求方式以及其他信息
* 标记注解
  * `@FormUrlEncoded`、`@Multipart`、`@Streaming`
* 参数注解
  * `@Query`、`@QueryMap`、`@Body`、`@Field`、`@FieldMap`、`@Part`、`@PartMap`
* 其他注解
  * `@Path`、`@Header`、`@Headers`、`@Url`



```java
// 根据api接口创建 Java 接口
public interface HttpbinService {

    // GET 请求
    @GET("get")
    Call<ResponseBody> get(@Query("userName") String username, @Query("password") String pwd);

    // POST 请求
    @POST("post")
    @FormUrlEncoded
    Call<ResponseBody> post(@Field("user") String user, @Field("pwd") String pwd);

    // 手动指定请求方式
    @HTTP(method = "GET")
    Call<ResponseBody> http(@Query("user") String user, @Query("pwd") String pwd);

    // 通过 map 方式传递多个参数
    @GET("get")
    Call<ResponseBody> get2(@QueryMap Map<String, String> map);

    // 通过 body 传递参数
    @POST("post")
    Call<ResponseBody> postBody(@Body RequestBody body);

    // 会将请求地址替换为 user/123传递的值
    @POST("user/{id}")
    Call<ResponseBody> postInPath(@Path("id") String path);

    // @Header会在请求中添加指定的请求头
    @POST("post")
    Call<ResponseBody> postHeader(@Header("token") String token);

    // 会将 @Headers 里内容添加进请求头
    @Headers({"os:android", "version:1.0"})
    @POST("post")
    Call<ResponseBody> postHeaders();

    // @Url 会使用参数中的请求地址来发起请求
    @POST
    Call<ResponseBody> postUrl(@Url String url);
}
```



#### 转换器

在接到服务器的响应后，无论是 okhttp 还是 retrofit 都只能接收到 String 字符串类型的数据。在实际开发中，需要对字符串进行解析将其转变为一个 Java Bean 对象。

比如服务器的响应数据为 JSON 格式的字符串，那么就可以利用 GSON 库完成反序列化操作，retrofix 也提供了多个转换器使得响应能够自动完成数据转换。



添加依赖：

```
implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
```



修改接口方法：

```java
// 修改 Call<ResponseBody> 为 Call<替换的Bean>
@GET("todos/{id}")
Call<UserBean> getData(@Path("id") String id);

@GET("get")
Call<ResponseBody> get(@Query("userName") String username, @Query("password") String pwd);
```



自定义 Java Bean 对象：

```java
public class UserBean {
    private Integer userId;
    private Integer id;
    private String title;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    @Override
    public String toString() {
        return "UserBean{" +
                "userId=" + userId +
                ", id=" + id +
                ", title='" + title + '\'' +
                '}';
    }
}
```

可以通过 https://www.bejson.com/json2javapojo/new/ 快速的将 JSON 生成 Java 实体类。



添加转换器并请求接口

```java
Retrofit retrofit = new Retrofit.Builder()
        .baseUrl("https://jsonplaceholder.typicode.com/")
        .addConverterFactory(GsonConverterFactory.create()) // 添加转换器
        .build();
HttpbinService httpbinService = retrofit.create(HttpbinService.class);

Call<UserBean> call = httpbinService.getData("1");
call.enqueue(new Callback<UserBean>() {
    @Override
    public void onResponse(Call<UserBean> call, Response<UserBean> response) {
        try {
            UserBean userBean = response.body();
            Log.d("test", userBean.toString());

            Log.d("test", response.body().toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onFailure(Call<UserBean> call, Throwable throwable) {

    }
});
```



#### 适配器

retrofix 的接口方法返回类型必须是 Call，如果想要返回的不是 Call，适配器就能帮助我们转换为其他类型。



```
implementation 'com.squareup.retrofit2:adapter-rxjava3:2.9.0'
```

```java
// 将 Call<UserBean> 修改为 Observable<UserBean>
@GET("todos/{id}")
Observable<UserBean> getData(@Path("id") String id);
```

```java
Retrofit retrofit = new Retrofit.Builder()
        .baseUrl("https://jsonplaceholder.typicode.com/")
        .addConverterFactory(GsonConverterFactory.create()) // 添加转换器
        .addCallAdapterFactory(RxJava3CallAdapterFactory.create())  // 添加适配器
        .build();
HttpbinService httpbinService = retrofit.create(HttpbinService.class);

httpbinService.getData("1")
        .subscribeOn(Schedulers.io())
        .subscribe(new Consumer<UserBean>() {
            @Override
            public void accept(UserBean userBean) throws Throwable {
                Log.d("test", userBean.toString());
            }
        });
```



#### TODO 配合 Rx 访问接口







### okhttp

Square 的一个处理网络请求的开源项目，为 JVM、Android 和 GraalVM 精心设计的 HTTP 客户端。

文档地址：https://github.com/square/okhttp

请求测试地址：https://httpbin.org/



```groovy
// 添加依赖
implementation 'com.squareup.okhttp3:okhttp:4.9.1'
```

```xml
<!--  声明网络权限  -->
<uses-permission android:name="android.permission.INTERNET" />
```



#### 同步请求

同步请求用 `execute()`

```java
// 创建一个OkHttpClient对象
OkHttpClient client = new OkHttpClient();

// 同步方法需放在新线程中执行
new Thread() {
    @Override
    public void run() {
        // 创建一个Request对象
        Request request = new Request.Builder().url("https://httpbin.org/get?a=1&b=2").build();

        Call call = client.newCall(request);
        try {
            // 执行get请求得到响应
            Response response = call.execute();
            Log.d("test", response.body().string());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}.start();
```

```java
OkHttpClient client = new OkHttpClient();

new Thread() {
    @Override
    public void run() {
        // 表单数据
        FormBody formBody = new FormBody.Builder()
                .add("name", "zs")
                .add("age", "21")
                .build();

        Request request = new Request.Builder().url("https://httpbin.org/post")
                .post(formBody) // 添加表单数据到请求中
                .build();

        Call call = client.newCall(request);
        try {
            // 执行请求
            Response response = call.execute();
            Log.d("test", response.body().string());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}.start();
```



#### 异步请求

异步请求用 `enqueue`

```java
// 创建一个OkHttpClient对象
OkHttpClient client = new OkHttpClient();

// 创建一个Request对象
Request request = new Request.Builder().url("https://httpbin.org/get?a=1&b=2").build();

// 发起网络请求
client.newCall(request).enqueue(new Callback() {
    @Override
    public void onFailure(@NonNull Call call, @NonNull IOException e) {
        // 网络请求失败处理
        e.printStackTrace();
    }

    @Override
    public void onResponse(@NonNull Call call, @NonNull Response response) throws IOException {
        // 网络请求成功处理
        if (response.isSuccessful()) {
            final String res = response.body().string();

            try {
                // 将返回的数据转换为 JSONObject
                JSONObject json = new JSONObject(res);
                // 从 JSONObject 中提取你需要的数据
                String url = json.getString("url");

                // 在UI线程中更新UI
                runOnUiThread(() -> {
                    tv_service.setText(url);
                });
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
});
```

```java
OkHttpClient client = new OkHttpClient();

FormBody formBody = new FormBody.Builder()
        .add("name", "zs")
        .add("age", "21")
        .build();

Request request = new Request.Builder().url("https://httpbin.org/post")
        .post(formBody) // 添加表单数据到请求中
        .build();

// 发起网络请求
client.newCall(request).enqueue(new Callback() {
    @Override
    public void onFailure(@NonNull Call call, @NonNull IOException e) {
        // 网络请求失败处理
        e.printStackTrace();
    }

    @Override
    public void onResponse(@NonNull Call call, @NonNull Response response) throws IOException {
        // 网络请求成功处理
        if (response.isSuccessful()) {
            Log.d("test", response.body().string());
        }
    }
});
```



#### 添加请求头

```java
Request request = new Request.Builder().url("https://httpbin.org/get")
        .addHeader("token", "145587778_ms")
        .addHeader("other", "hhhhh")
        .build();
```



#### 请求拦截器

通过 `OkHttpClient.Builder().addInterceptor()` 设置请求拦截器。

```java
OkHttpClient client = new OkHttpClient.Builder().addInterceptor(new Interceptor() {
    @NonNull
    @Override
    public Response intercept(@NonNull Chain chain) throws IOException {
        Request request = chain.request().newBuilder()
                .addHeader("token", "145587778_ms")
                .addHeader("other", "hhhhh")
                .build();

        Response response = chain.proceed(request);
        return response;
    }
}).build();


Request request = new Request.Builder().url("https://httpbin.org/get").build();
```



除了 `addInterceptor` 外，还可以添加 `addNetworkInterceptor` 拦截器，`addNetworkInterceptor`  一定会在 `addInterceptor` 后面执行。

```java
OkHttpClient client = new OkHttpClient.Builder().addInterceptor(new Interceptor() {
            @NonNull
            @Override
            public Response intercept(@NonNull Chain chain) throws IOException {
                Log.d("test", "addInterceptor");
                Request request = chain.request().newBuilder()
                        .addHeader("token", "145587778_ms")
                        .addHeader("other", "hhhhh")
                        .build();

                Response response = chain.proceed(request);
                return response;
            }
        }).addNetworkInterceptor(new Interceptor() {
            @NonNull
            @Override
            public Response intercept(@NonNull Chain chain) throws IOException {
                Log.d("test", "addNetworkInterceptor");
                return chain.proceed(chain.request());
            }
        })
        .build();


Request request = new Request.Builder().url("https://httpbin.org/get").build();
```







### RetrofitUrlManager

以最简洁的 Api 让 Retrofit 同时支持多个 BaseUrl 以及动态改变 BaseUrl。

文档地址：https://github.com/JessYanCoding/RetrofitUrlManager



## MQTT

### paho.mqtt.android

Paho Android服务是一个用Java编写的MQTT客户端库，用于在Android上开发应用程序。

文档地址：https://github.com/eclipse/paho.mqtt.android





## 异步编程

### RxJava

RXJava 是基于观察者模式和链式编程思想的异步编程库，它可以用来优雅地处理异步操作，比如网络请求、数据库查询、文件I/O等操作，减少了回调嵌套，提高了代码的可读性和可维护性。

文档地址：https://github.com/ReactiveX/RxJava

官网地址：https://github.com/ReactiveX/RxJava

[RxJava操作符汇总](https://blog.csdn.net/zengke1993/article/details/80388510)



Rx(reactiveX) 可以改变思维(响应式编程思维)，提升编程效率。

响应式编程：根据上一层的响应，来影响下一层的变化。

术语：

* 观察者 `observer`
* 被观察者 `observable`
* 订阅 `subscribe`



```groovy
dependencies {
    implementation 'io.reactivex.rxjava3:rxandroid:3.0.2'
    implementation 'io.reactivex.rxjava3:rxjava:3.1.5'
}
```

```java
// 观察者设计模式
Observable.just(PATH).subscribe(new Observer<String>() {

    // 订阅成功
    @Override
    public void onSubscribe(@NonNull Disposable d) {

    }

    // 上一层的响应
    @Override
    public void onNext(@NonNull String s) {

    }

    // 链条思维发生了异常
    @Override
    public void onError(@NonNull Throwable e) {

    }

    // 整个链条思维全部结束
    @Override
    public void onComplete() {

    }
});
```



案例：下载图片

```java
public class MainActivity extends AppCompatActivity {

    private final static String PATH = "https://www.huangyihui.cn/upload/gburlimg/ebee5de398021.png";

    private ProgressDialog progressDialog;

    private ImageView image;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        image = findViewById(R.id.image);

        // 观察者设计模式
        Observable.just(PATH)
                // 需求1：下载图片
                .map(new Function<String, Bitmap>() {
                    @NonNull
                    @Override
                    public Bitmap apply(@NonNull String path) throws Exception {
                        try {
                            Thread.sleep(2000);

                            URL url = new URL(path);
                            HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
                            httpURLConnection.setConnectTimeout(5000);
                            int responseCode = httpURLConnection.getResponseCode();
                            if (responseCode == HttpURLConnection.HTTP_OK) {
                                InputStream inputStream = httpURLConnection.getInputStream();
                                Bitmap bitmap = BitmapFactory.decodeStream(inputStream);
                                return bitmap;
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                        return null;
                    }
                })
                // 需求2：加水印
                .map(new Function<Bitmap, Bitmap>() {
                    @NonNull
                    @Override
                    public Bitmap apply(Bitmap bitmap) throws Throwable {
                        Paint paint = new Paint();
                        paint.setColor(Color.RED);
                        paint.setTextSize(88);
                        Bitmap watermark = drawTextToBitmap(bitmap, "我是水印", paint, 100, 100);
                        return watermark;
                    }
                })
                // 需求3：加日志
                .map(new Function<Bitmap, Bitmap>() {
                    @NonNull
                    @Override
                    public Bitmap apply(Bitmap bitmap) throws Throwable {
                        Log.d("test", "下载时间：" + System.currentTimeMillis());
                        return bitmap;
                    }
                })
                // 给上面的操作分配异步线程(图片下载操作)
                .subscribeOn(Schedulers.io())
                // 终点分配 Android 主线程
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(new Observer<Bitmap>() {

                    // 订阅成功
                    @Override
                    public void onSubscribe(@NonNull Disposable d) {
                        progressDialog = new ProgressDialog(MainActivity.this);
                        progressDialog.setTitle("加载中");
                        progressDialog.show();
                    }

                    // 上一层的响应
                    @Override
                    public void onNext(@NonNull Bitmap bitmap) {
                        image.setImageBitmap(bitmap);
                    }

                    // 链条思维发生了异常
                    @Override
                    public void onError(@NonNull Throwable e) {

                    }

                    // 整个链条思维全部结束
                    @Override
                    public void onComplete() {
                        if (progressDialog != null) {
                            progressDialog.dismiss();
                        }
                    }
                });
    }

    // 图片上绘制文字(加水印)
    private final Bitmap drawTextToBitmap(Bitmap bitmap, String text, Paint paint, int paddingLeft, int paddingTop) {
        Bitmap.Config bitmapConfig = bitmap.getConfig();
        paint.setDither(true);  // 获得更清晰的图像采样
        paint.setFilterBitmap(true);    // 开启过滤
        if (bitmapConfig == null) {
            bitmapConfig = Bitmap.Config.ARGB_8888;
        }
        bitmap = bitmap.copy(bitmapConfig, true);
        Canvas canvas = new Canvas(bitmap);
        canvas.drawText(text, paddingLeft, paddingTop, paint);
        return bitmap;

    }

}
```









### RxBinding

用于Android UI小部件的RxJava绑定API。

文档地址：https://github.com/JakeWharton/RxBinding





## 图像视频

### glide

Glide 是快速高效的 Android 图片加载库，可以自动加载网络、本地文件，专注于平滑滚动的 Android 图像加载和缓存库。

文档地址：https://github.com/bumptech/glide

中文文档：https://muyangmin.github.io/glide-docs-cn/



1、引入依赖

```
dependencies {
    implementation 'com.github.bumptech.glide:glide:4.16.0'
}
```

2、声明网络权限

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

3、基础使用

```java
ImageView iv = findViewById(R.id.iv);
Glide.with(this).
        load("https://www.huangyihui.cn/upload/gburlimg/ebee5de398021.png").
        into(iv);
```



#### 占位图

* placeholder ：正在请求图片时展示的图片
* error ：请求失败时展示的图片，如果没设置，则还是展示 placeholder 的占位图
* fallback ：请求的 url 为 null 时展示的图片，如果没设置，则还是展示 placeholder 的占位图



```java
ImageView iv = findViewById(R.id.iv);

RequestOptions requestOptions = new RequestOptions()
        .placeholder(R.drawable.ic_launcher_background)
        .error(R.drawable.ic_launcher_foreground)
        .fallback(R.drawable.circular_progress_bar)
        .override(300, 300);	// 指定加载图片大小

Glide.with(this)
        .load("https://www.huangyihui.cn/upload/gburlimg/ebee5de398021.png")
        .apply(requestOptions)	// 应用配置
        .into(iv);
```



#### 过渡动画

添加 `transition(DrawableTransitionOptions.withCrossFade(3000))` 可以实现淡入效果，但如果对透明图片使用淡入效果，设置的 placeholder 占位图会在底下显示。

```java
Glide.with(this)
        .load("https://www.huangyihui.cn/upload/gburlimg/98efaf57215a2.png")
        .apply(requestOptions)
        .transition(DrawableTransitionOptions.withCrossFade(factory))
        .transition(DrawableTransitionOptions.withCrossFade(3000))  // 3000毫秒的淡入效果
        .into(iv);
```



为了避免这种情况，可以这样操作：

```java
DrawableCrossFadeFactory factory = new DrawableCrossFadeFactory.Builder().setCrossFadeEnabled(true).build();

Glide.with(this)
        .load("https://www.huangyihui.cn/upload/gburlimg/98efaf57215a2.png")
        .apply(requestOptions)
        .transition(DrawableTransitionOptions.withCrossFade(factory))
        .into(iv);
```



#### 变换

* `CircleCrop` ：圆角
* `RoundedCorners` ：四个角度统一指定
* `GranularRoundedCorners` ：四个角度单独指定
* `Rotate` ：旋转

```java
Glide.with(this)
        .load("https://www.huangyihui.cn/upload/gburlimg/689cd4f5fc67e.png")
        .transform(new CircleCrop())	// 圆角效果
        .into(iv);


Glide.with(this)
        .load("https://www.huangyihui.cn/upload/gburlimg/689cd4f5fc67e.png")
        .transform(new CircleCrop(),new Rotate(70))		// 多种变换效果
        .into(iv);
```









### banner

Android广告图片轮播控件，内部基于ViewPager2实现，Indicator和UI都可以自定义。

文档地址：https://github.com/youth5201314/banner



### NiceVieoPlayer 视频播放器

IjkPlayer/MediaPlayer+TextureView，支持列表，完美切换全屏、小窗口的Android视频播放器

文档：https://github.com/jianjunxiao/NiceVieoPlayer



## 二维码

### zxing

用于Java、Android的ZXing（“斑马线”）条形码扫描库





## 开发框架

### MVVMHabit

基于谷歌最新AAC架构，MVVM设计模式的一套快速开发库，整合Okhttp+RxJava+Retrofit+Glide等主流模块，满足日常开发需求。使用该框架可以快速开发一个高质量、易维护的Android应用。

文档地址：https://github.com/goldze/MVVMHabit



### AndroidProject

提供多个常用组件。

文档地址：https://github.com/getActivity/AndroidProject



### Android-ZBLibrary

Android MVP 快速开发框架，提供一套开发标准（View, Data, Event）以及模板和工具类并规范代码。封装层级少，简单高效兼容性好。

OKHttp 网络请求、Glide 图片加载、ZXing 二维码、沉浸状态栏、下载安装、自动缓存以及各种 Base、Demo、UI、Util 直接用。

文档地址：https://github.com/TommyLemon/Android-ZBLibrary



## 路由框架

### ARouter

 一个用于帮助 Android App 进行组件化改造的框架，支持模块间的路由、通信、解耦。

文档：https://github.com/alibaba/ARouter



### WMRouter

WMRouter是一款Android路由框架，基于组件化的设计思路，功能灵活，使用也比较简单。

文档：https://github.com/meituan/WMRouter



## Json

### fastjson

Fastjson是一个Java库，可用于将Java对象转换为其JSON表示。它还可以用于将JSON字符串转换为等效的Java对象。Fastjson可以处理任意Java对象，包括您没有源代码的预先存在的对象。

文档地址：https://github.com/alibaba/fastjson



### gson

Gson 是一个 Java 库，可用于将 Java 对象转换为其 JSON 表示。它还可以用于将 JSON 字符串转换为等效的 Java 对象。Gson 可以处理任意 Java 对象，包括您没有源代码的预先存在的对象。

文档地址：https://github.com/google/gson



```groovy
dependencies {
  implementation 'com.google.code.gson:gson:2.11.0'
}
```



* 使用 `new Gson().toJson/fromJson` 即可完成序列化和反序列化。
  * 如果一个变量为 null，那么在处理时会忽略这个字段
  * 如果一个集合中存储的数据为 null，那么序列化时这条数据会返回 null

```java
User u1 = new User("mike", 13, true);
Gson gson = new Gson();
String json = gson.toJson(u1);

Log.d("test", json);

User u2 = gson.fromJson(json, User.class);
Log.d("test", u2.toString());


// 数组类型对象也可以完成序列化和反序列化
User[] users1 = new User[3];
users1[0] = new User("mike", 13, true);
users1[1] = new User("cany", 22, false);
Gson gson = new Gson();
String json = gson.toJson(users1);
Log.d("test", json);

User[] users2 = gson.fromJson(json, User[].class);
Log.d("test", users2[0].toString());
Log.d("test", users2[1].toString());
Log.d("test", users2[2].toString());


// List、Map、Set 的序列化和反序列化
List<User> list1 = new ArrayList<>();
list1.add(new User("mike", 13, true));
list1.add(new User("cany", 22, false));

Gson gson = new Gson();
String json = gson.toJson(list1);
Log.d("test", json);

// List、Map、Set 需要使用 TypeToken 完成反序列化
Type type = new TypeToken<List<User>>() {
}.getType();
List<User> list2 = gson.fromJson(json, type);
Log.d("test", list2.get(0).toString());
Log.d("test", list2.get(1).toString());
Log.d("test", list2.get(2).toString());
```



* `@Expose` ：控制字段是否参与序列化和反序列化。此功能提供了一种方法，您可以标记对象的某些字段，以便在序列化和反序列化为 JSON 时将其排除在外。要使用此注释，您必须使用 创建 Gson `new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create()`。创建的 Gson 实例将排除类中未用`@Expose`注释标记的所有字段。
* `@SerializedName` ：控制 json 字段中 key 的命名。



```java
User u1 = new User("mike", 13, true);
Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
String json = gson.toJson(u1);
```

```java
public class User {
    @Expose
    private String name;
  	
  	// serialize 是否参与序列化，deserialize 是否参与反序列化
    @Expose(serialize = false, deserialize = false)
    private int age;
    @Expose
    @SerializedName("flag")
    private boolean isStudent;

    public User(String name, int age, boolean isStudent) {
        this.name = name;
        this.age = age;
        this.isStudent = isStudent;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", isStudent=" + isStudent +
                '}';
    }
}
```





## 页面组件

### ImmersionBar

android 4.4以上沉浸式状态栏和沉浸式导航栏管理，适配横竖屏切换、刘海屏、软键盘弹出等问题，可以修改状态栏字体颜色和导航栏图标颜色，以及不可修改字体颜色手机的适配，适用于Activity、Fragment、DialogFragment、Dialog，PopupWindow，一句代码轻松实现，以及对bar的其他设置。

文档地址：https://github.com/gyf-dev/ImmersionBar



## 事件总线

### EventBus

适用于Android和Java的事件总线，简化了活动、片段、线程、服务等之间的通信。代码更少，质量更好。

文档地址：https://github.com/greenrobot/EventBus

文档参考：https://mp.weixin.qq.com/s/AxxzwHDSeiY7VyBgVyEEyw



## 调试

### hugo 函数耗时记录

Hugo项目是一个调试函数调用耗时的工具，通过对方法或者类添加@DebugLog注解，在运行时会将函数的耗时打印在控制台中，通常用于排查函数耗时，或者用于卡顿检测。

文档：https://github.com/JakeWharton/hugo

教程：https://mp.weixin.qq.com/s/EvjMNGKdbZ0rOaRBygjiWg



### Stetho

Facebook开源的调试工具，集成Chrome开发者工具，可以直接查看Android应用的数据库、共享偏好、网络请求等信息。

文档：https://github.com/facebook/stetho



### LeakCanary

一个内存泄漏检测工具，在开发过程中帮助捕捉和分析内存泄漏问题，减少应用的崩溃和卡顿。

文档：https://github.com/square/leakcanary



### Fastlane

自动化构建和发布工具，能够简化Android应用的打包、签名、上传等流程，减少手动操作的可能性。

文档：https://github.com/fastlane/fastlane



### Espresso

Android官方UI测试框架，用于模拟用户操作并验证界面行为，可以提高测试覆盖率。

文档：https://github.com/TonnyL/Espresso



### checkstyle

用于Java代码质量检测和格式化，能自动发现和报告代码中的问题。

文档：https://github.com/checkstyle/checkstyle



### ProGuard

Android应用的混淆和优化工具，用于减小应用包体积，并保护源代码。

文档：https://github.com/Guardsquare/proguard



## 存储

### MMKV

MMKV 是微信应用中使用的一个高效、小巧、易用的移动键值存储框架。它目前在 Android、iOS/macOS、Windows、POSIX 和 HarmonyOS NEXT 上可用。

文档：https://github.com/Tencent/MMKV

参考：https://mp.weixin.qq.com/s/Adr3wZ1FOmbj8znyUMbR8A



## 动画

### lottie-android

在 Android 和 iOS、Web 和 React Native 上原生渲染 After Effects 动画

文档：https://github.com/airbnb/lottie-android



## 开源推荐

* 谷歌：https://github.com/google
* [7款常用的Android UI组件](https://www.cnblogs.com/tianshiaimi/p/4561591.html) 























