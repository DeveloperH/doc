# Vue Library



## HTTP



### axios

[axios](https://axios-http.com/) ：用于浏览器和 node.js 的基于 Promise 的 HTTP 客户端。

文档地址：https://github.com/axios/axios



#### 示例

`注：示例版本 axios v1.3.4`

1、安装依赖

```sh
npm install axios -S
```



2、拦截器

```js
// api/index.js
import axios from 'axios'
import { MessageBox, Notification } from 'element-ui'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  config.headers['x-access-token'] = sessionStorage.getItem('x-access-token') ? sessionStorage.getItem('x-access-token') : '';

  return config;
}, function (error) {
  console.info(error);
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  let { status, data } = response

  if (data instanceof Blob && data.type === 'application/json') {
    const reader = new FileReader()
    reader.readAsText(data, 'utf-8')
    reader.onload = () => {
      data = JSON.parse(reader.result)
      if (data.msg) {
        Notification.error(data.msg)
      }
    }

    return Promise.reject(response)
  } else if (data instanceof Blob) {
    return response
  } else {
    if (status >= 200 && status < 300) {
      if (data.success) {
        return response
      } else if (data.msg === 'no_user') {
        MessageBox.alert(
          '登录状态已过期，或已在其他地方登陆！',
          '系统提示',
          {
            type: 'warning'
          }
        ).then(() => {
          window.location = process.env['VUE_APP_VV']
        })
        return Promise.reject(response)
      } else {
        if (data.msg) {
          Notification.error(data.msg)
        }
        return Promise.reject(response)
      }
    }
    return response;
  }
}, function (error) {
  if (!error.response) {
    return Promise.reject(error);
  }

  switch (error.response.status) {
    case 500:
      Notification.error("系统繁忙")
      break;
    case 403:
      MessageBox.alert(
        '登录状态已过期，或已在其他地方登陆！',
        '系统提示',
        {
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('user/logout').then(() => {
          window.location = process.env['VUE_APP_VV']
        })
      })
      break;
    case 504:
      Notification.error("连接超时")
      break;
    default:
      Notification.error(error.response.status + "")
      break;
  }
  return Promise.reject(error);
});

export default axios;
```

```js
// api/common.js
import * as API from './index'

// 登录
export const login = (data) => API.POST('member/login', data);
```



3、使用

```js
import { login } from "@/api/commom";

login({}).then((res) => { })
```



#### 发起请求

可以向 `axios` 传递相关配置来创建请求：`axios(config)`

```js
// 发起一个post请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});

// 在 node.js 用GET请求获取远程图片
axios({
  method: 'get',
  url: 'http://bit.ly/2mTM3nY',
  responseType: 'stream'
})
  .then(function (response) {
    response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
  });
  
// 发起一个 GET 请求 (默认请求方式)
axios('/user/12345');
```



为了方便起见，已经为所有支持的请求方法提供了别名。在使用别名方法时， `url`、`method`、`data` 这些属性都不必在配置中指定。

* axios.request(config)
* axios.get(url[, config])
* axios.delete(url[, config])
* axios.head(url[, config])
* axios.options(url[, config])
* axios.post(url[, data[, config]])
* axios.put(url[, data[, config]])
* axios.patch(url[, data[, config]])
* axios.postForm(url[, data[, config]])
* axios.putForm(url[, data[, config]])
* axios.patchForm(url[, data[, config]])



`postForm`，`putForm`，`patchForm`，这些方法只是对应的 HTTP 方法，其 content-type 头部默认设为`multipart/form-data`。



```js
import axios from 'axios';

// 向给定ID的用户发起请求
axios.get('/user?ID=12345')
  .then(function (response) {
    // 处理成功情况
    console.log(response);
  })
  .catch(function (error) {
    // 处理错误情况
    console.log(error);
  })
  .finally(function () {
    // 总是会执行
  });

// 上述请求也可以按以下方式完成（可选）
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    // 总是会执行
  });  

// 支持async/await用法
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```



```js
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// 发起多个并发请求
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

const [acct, perm] = await Promise.all([getUserAccount(), getUserPermissions()]);

// OR

Promise.all([getUserAccount(), getUserPermissions()])
  .then(function ([acct, perm]) {
    // ...
  });


// 将 HTML Form 转换成 JSON 进行请求
const {data} = await axios.post('/user', document.querySelector('#my-form'), {
  headers: {
    'Content-Type': 'application/json'
  }
})

// 自动序列化：从 v0.27.0 版本开始，当请求头中的 Content-Type 是 multipart/form-data 时，Axios 支持自动地将普通对象序列化成一个 FormData 对象。
// Multipart (multipart/form-data)
const {data} = await axios.post('https://httpbin.org/post', {
    firstName: 'Fred',
    lastName: 'Flintstone',
    orders: [1, 2, 3],
    photo: document.querySelector('#fileInput').files
  }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
)

// FileList 对象可以被直接传递。所有文件将使用相同的字段名files[]发送。
await axios.postForm('https://httpbin.org/post', document.querySelector('#fileInput').files)

// 自动序列化：当请求头中的 content-type 是 application/x-www-form-urlencoded 时，Axios 将自动地将普通对象序列化成 urlencoded 的格式。
// URL encoded form (application/x-www-form-urlencoded)
const {data} = await axios.post('https://httpbin.org/post', {
    firstName: 'Fred',
    lastName: 'Flintstone',
    orders: [1, 2, 3]
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
})
```



#### axios 实例

可以使用自定义配置新建一个实例：`axios.create([config])`

以下是可用的实例方法。指定的配置将与实例的配置合并。

* axios#request(config)
* axios#get(url[, config])
* axios#delete(url[, config])
* axios#head(url[, config])
* axios#options(url[, config])
* axios#post(url[, data[, config]])
* axios#put(url[, data[, config]])
* axios#patch(url[, data[, config]])
* axios#getUri([config])



```js
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
```



#### 请求配置

这些是创建请求时可以用的配置选项。只有 `url` 是必需的。如果没有指定 `method`，请求将默认使用 `GET` 方法。

```js
{
  // `url` 是用于请求的服务器 URL
  url: '/user',

  // `method` 是创建请求时使用的方法
  method: 'get', // 默认值

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',
  
  // `allowAbsoluteUrls` 确定绝对URL是否会覆盖配置的baseUrl。
	// 当设置为true（默认）时，`url` 的绝对值将覆盖 `baseUrl`。
	// 当设置为false时，`url`的绝对值将始终以`baseUrl`作为前缀。
  allowAbsoluteUrls: true,

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 它只能用于 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 数组中最后一个函数必须返回一个字符串， 一个Buffer实例，ArrayBuffer，FormData，或 Stream
  // 你可以修改请求头。
  transformRequest: [function (data, headers) {
    // 对发送的 data 进行任意转换处理

    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对接收的 data 进行任意转换处理

    return data;
  }],

  // 自定义请求头
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },

  // `params` 是与请求一起发送的 URL 参数
  // 必须是一个简单对象或 URLSearchParams 对象
  params: {
    ID: 12345
  },

  // `paramserializer`是一种可选的配置，它允许您自定义序列化`params'。 
  paramsSerializer: {

    // 自定义编码器函数以迭代方式发送键/值对。
    encode?: (param: string): string => { /* 在此处进行自定义操作并返回转换的字符串 */ }, 
    
    // 整个参数的自定义序列化功能。允许用户模仿1.x行为。
    serialize?: (params: Record<string, any>, options?: ParamsSerializerOptions ), 
    
    // 格式化数组索引中的配置。
    indexes: false // 三个可用选项：（1）索引：null（无括号），（2）（默认）索引：false（导致空括号），（3）索引：true（导致带有索引的支架）。 
  },

  // `data` 是作为请求体被发送的数据
  // 仅适用 'PUT', 'POST', 'DELETE 和 'PATCH' 请求方法
  // 在没有设置 `transformRequest` 时，则必须是以下类型之一:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属: FormData, File, Blob
  // - Node 专属: Stream, Buffer
  data: {
    firstName: 'Fred'
  },
  
  // 发送请求体数据的可选语法
  // 请求方式 post
  // 只有 value 会被发送，key 则不会
  data: 'Country=Brasil&City=Belo Horizonte',

  // `timeout` 指定请求超时的毫秒数。
  // 如果请求时间超过 `timeout` 的值，则请求会被中断
  timeout: 1000, // 默认值是 `0` (永不超时)

  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // default

  // `adapter` 允许自定义处理请求，这使测试更加容易。
  // 返回一个 promise 并提供一个有效的响应 （参见 lib/adapters/README.md）。
  adapter: function (config) {
    /* ... */
  },
    
  // 此外，您可以设置内置适配器的名称，或提供一个包含其名称的数组，以选择环境中可用的第一个适配器
  adapter: 'xhr', // 'fetch' | 'http' | ['xhr', 'http', 'fetch']

  //`auth`表示应使用HTTP基本身份验证，并提供凭据。
  //这将设置一个“Authorization”标头，覆盖您使用“headers”设置的任何现有的“Authorization”自定义标头。
  //请注意，只有HTTP基本身份验证可以通过此参数进行配置。
  //对于Bearer令牌等，请使用“Authorization”自定义标头。
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // `responseType` 表示浏览器将要响应的数据类型
  // 选项包括: 'arraybuffer', 'document', 'json', 'text', 'stream'
  // 浏览器专属：'blob'
  responseType: 'json', // 默认值

  // `responseEncoding` 表示用于解码响应的编码 (Node.js 专属)
  // 注意：忽略 `responseType` 的值为 'stream'，或者是客户端请求
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // 默认值

  // `xsrfCookieName` 是 xsrf token 的值，被用作 cookie 的名称
  xsrfCookieName: 'XSRF-TOKEN', // 默认值

  // `xsrfHeaderName` 是带有 xsrf token 值的http 请求头名称
  xsrfHeaderName: 'X-XSRF-TOKEN', // 默认值
    
  // `undefined`（默认） - 仅针对相同的原点请求设置XSRF标头
  withXSRFToken: boolean | undefined | ((config: InternalAxiosRequestConfig) => boolean | undefined),

  // `onuploadprogress'允许处理上传的进度事件
  // browser & node.js
  onUploadProgress: function ({loaded, total, progress, bytes, estimated, rate, upload = true}) {
    // 在Axios进度活动中做任何您想做的事
  },

  // `ondownloadprogress`允许处理进度事件的下载
  // browser & node.js
  onDownloadProgress: function ({loaded, total, progress, bytes, estimated, rate, download = true}) {
    // 在Axios进度活动中做任何您想做的事
  },

  // `maxContentLength` 定义了node.js中允许的HTTP响应内容的最大字节数
  maxContentLength: 2000,

  // `maxBodyLength`（仅Node）定义允许的http请求内容的最大字节数
  maxBodyLength: 2000,

  // `validateStatus` 定义了对于给定的 HTTP状态码是 resolve 还是 reject promise。
  // 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，
  // 则promise 将会 resolved，否则是 rejected。
  validateStatus: function (status) {
    return status >= 200 && status < 300; // 默认值
  },

  // `maxRedirects` 定义了在node.js中要遵循的最大重定向数。
  // 如果设置为0，则不会进行重定向
  maxRedirects: 21, // 默认值
    
  //`beforeDirect`定义了一个在重定向之前调用的函数。
  //使用此选项在重定向时调整请求选项，
  //为了检查最新的响应报头，
  //或者通过抛出错误来取消请求
  //如果maxRedirects设置为0，则不使用`beforeDirect`。
  beforeRedirect: (options, { headers }) => {
    if (options.hostname === "example.com") {
      options.auth = "user:password";
    }
  },

  // `socketPath` 定义了在node.js中使用的UNIX套接字。
  // e.g. '/var/run/docker.sock' 发送请求到 docker 守护进程。
  // 只能指定 `socketPath` 或 `proxy` 。
  // 若都指定，这使用 `socketPath` 。
  socketPath: null, // default
    
  //“transport”决定了将用于发出请求的传输方法。
  //如果已定义，则将使用它。否则，如果“maxRedirects”为0，
  //根据“protocol”中指定的协议，将使用默认的“http”或“https”库。
  //否则，将再次根据协议使用`httpFollow`或`httpsFollow`库，
  //其可以处理重定向。
  transport: undefined, // default

  // httpAgent和httpsAgent分别定义了在node.js中执行http和https请求时使用的自定义代理。
  // 这允许添加在Node.js v19.0.0之前默认未启用的选项，如“keepAlive”。
  // 在Node.js v19.0.0之后，您不再需要自定义代理以启用“keepAlive”，
  // 因为默认情况下“http.globalAgent”已启用“keepAlive”。
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // `proxy` 定义了代理服务器的主机名，端口和协议。
  // 您可以使用常规的`http_proxy` 和 `https_proxy` 环境变量。
  // 使用 `false` 可以禁用代理功能，同时环境变量也会被忽略。
  // `auth`表示应使用HTTP Basic auth连接到代理，并且提供凭据。
  // 这将设置一个 `Proxy-Authorization` 请求头，它会覆盖 `headers` 中已存在的自定义 `Proxy-Authorization` 请求头。
  // 如果代理服务器使用 HTTPS，则必须设置 protocol 为`https`
  proxy: {
    protocol: 'https',
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // see https://axios-http.com/zh/docs/cancellation
  // 此 API 从 v0.22.0 开始已被弃用，不应在新项目中使用。
  cancelToken: new CancelToken(function (cancel) {
  }),

  // 使用abortcontroller取消Axios请求的另一种方法
  signal: new AbortController().signal,
  
	// `decompress` 表示是否应自动解压响应体。如果设置为“true”，还将从所有解压缩响应的响应对象中删除“content encoding”标头
	// -仅 node（XHR无法关闭解压缩）
  decompress: true // 默认值
  
  // `insecurehttpparser` 布尔值。
  // 指示使用不安全的HTTP解析器，该解析器接受无效的HTTP标头。
  // 这可以允许与不合格的HTTP实现的互操作性。
  // 应避免使用不安全的解析器。
  // 请参阅选项https://nodejs.org/dist/latest-v12.x/docs/api/http.html#http_http_http_http_request_url_options_callback
  // 另请参见https://nodejs.org/en/blog/vulnerability/february-2020-security-reales/#strict-http-header-parsing-none
  insecureHTTPParser: undefined, // default

  // 向后兼容的过渡选项，可以在较新版本中删除
  transitional: {
    // silent JSON parsing mode
    // `true`  - ignore JSON parsing errors and set response.data to null if parsing failed (old behaviour)
    // `false` - throw SyntaxError if JSON parsing failed (Note: responseType must be set to 'json')
    silentJSONParsing: true, // default value for the current Axios version

    // try to parse the response string as JSON even if `responseType` is not 'json'
    forcedJSONParsing: true,

    // throw ETIMEDOUT error instead of generic ECONNABORTED on request timeouts
    clarifyTimeoutError: false,
  },

  env: {
    // 用于自动将有效载荷序列化到formdata对象的formdata类
    FormData: window?.FormData || global?.FormData
  },

  formSerializer: {
      visitor: (value, key, path, helpers) => {}; // 自定义访问者功能序列化表单值
      dots: boolean; // 使用点代替括号格式
      metaTokens: boolean; // 在参数键中保留{}之类的特殊结尾
      indexes: boolean; // 数组索引格式null-无括号，false-空括号，true-带有索引的支架
  },

  // HTTP适配器（node.js）
  maxRate: [
    100 * 1024, // 100KB/s upload limit,
    100 * 1024  // 100KB/s download limit
  ]
}
```



#### 默认配置

您可以指定默认配置，它将作用于每个请求。

全局 axios 默认值：

```js
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```



自定义实例默认值：

```js
// 创建实例时配置默认值
const instance = axios.create({
  baseURL: 'https://api.example.com'
});

// 创建实例后修改默认值
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```



配置的优先级：

配置将会按优先级进行合并。它的顺序是：在 `lib/defaults.js` 中找到的库默认值，然后是实例的 `defaults` 属性，最后是请求的 `config` 参数。后面的优先级要高于前面的。下面有一个例子。

```js
// 使用库提供的默认配置创建实例
// 此时超时配置的默认值是 `0`
const instance = axios.create();

// 重写库的超时默认值
// 现在，所有使用此实例的请求都将等待2.5秒，然后才会超时
instance.defaults.timeout = 2500;

// 重写此请求的超时时间，因为该请求需要很长时间
instance.get('/longRequest', {
  timeout: 5000
});
```



#### 响应结构

一个请求的响应包含以下信息。

```js
{
  // `data` 由服务器提供的响应
  data: {},

  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,

  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',

  // `headers` 是服务器响应头
  // 所有的 header 名称都是小写，而且可以使用方括号语法访问
  // 例如: `response.headers['content-type']`
  headers: {},

  // `config` 是 `axios` 请求的配置信息
  config: {},

  // `request` 是生成此响应的请求
  // 在node.js中它是最后一个ClientRequest实例 (in redirects)，
  // 在浏览器中则是 XMLHttpRequest 实例
  request: {}
}
```



当使用 `then` 时，您将接收如下响应:

```js
axios.get('/user/12345')
  .then(function (response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
```

当使用 `catch`，或者传递一个 rejection callback 作为 `then` 的第二个参数时，响应可以通过 `error` 对象被使用。



#### 拦截器

在请求或响应被 then 或 catch 处理前拦截它们。

```js
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```



如果你稍后需要移除拦截器，可以这样：

```js
const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);

// 您还可以清除请求或响应的所有拦截器。
const instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
instance.interceptors.request.clear(); // Removes interceptors from requests
instance.interceptors.response.use(function () {/*...*/});
instance.interceptors.response.clear(); // Removes interceptors from responses
```



可以给自定义的 axios 实例添加拦截器：

```js
const instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
```



添加请求拦截器时，默认情况下假定它们是异步的。当主线程被阻塞时，这可能会导致 axios 请求的执行延迟（在幕后为拦截器创建一个 promise，并且您的请求被放在调用堆栈的底部）。如果您的请求拦截器是同步的，您可以向 options 对象添加一个标志，该标志将告诉 axios 同步运行代码并避免请求执行中的任何延迟。

```js
axios.interceptors.request.use(function (config) {
  config.headers.test = 'I am only a header!';
  return config;
}, null, { synchronous: true });
```



如果要根据运行时检查执行特定的拦截器，可以将 `runWhen` 函数添加到 options 对象。 **当且仅**当 `runWhen` 的返回为 `false` 时，请求拦截器将不会被执行。该函数将使用 config 对象调用（不要忘记您也可以将自己的参数绑定到它。当您有一个只需要在特定时间运行的异步请求拦截器时，这会很方便。

```js
function onGetCall(config) {
  return config.method === 'get';
}
axios.interceptors.request.use(function (config) {
  config.headers.test = 'special get headers';
  return config;
}, null, { runWhen: onGetCall });
```

**注意：**options 参数（具有 `synchronous` 和 `runWhen` 属性）目前仅支持请求拦截器。



#### 错误处理

默认行为是拒绝返回状态代码超出 2xx 范围的每个响应，并将其视为错误。

```js
axios.get('/user/12345')
  .catch(function (error) {
    if (error.response) {
      // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // 请求已经成功发起，但没有收到响应
      // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
      // 而在node.js中是 http.ClientRequest 的实例
      console.log(error.request);
    } else {
      // 发送请求时出了点问题
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
```



使用 `validateStatus` 配置选项，可以自定义抛出错误的 HTTP code。

```js
axios.get('/user/12345', {
  validateStatus: function (status) {
    return status < 500; // 处理状态码小于500的情况
  }
})
```



使用 `toJSON` 可以获取更多关于HTTP错误的信息。

```js
axios.get('/user/12345')
  .catch(function (error) {
    console.log(error.toJSON());
  });
```



#### 取消请求

从 `v0.22.0` 开始，Axios 支持以 fetch API 方式—— [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) 取消请求：

```js
const controller = new AbortController();

axios.get('/foo/bar', {
   signal: controller.signal
}).then(function(response) {
   //...
});
// 取消请求
controller.abort()
```



#### 提交文件

您可以轻松提交单个文件：

```js
await axios.postForm('https://httpbin.org/post', {
  'myVar' : 'foo',
  'file': document.querySelector('#fileInput').files[0]
});
```



或多个文件作为 `multipart/form-data`：

```js
await axios.postForm('https://httpbin.org/post', {
  'files[]': document.querySelector('#fileInput').files
});
```



`FileList` 对象可以直接传递：

```js
await axios.postForm('https://httpbin.org/post', document.querySelector('#fileInput').files)
```

所有文件都将以相同的字段名称发送：`files[]。`



#### HTML 表单发布（浏览器）

将 HTML 表单元素作为有效负载传递，以将其作为 `multipart/form-data` 内容提交。

```js
await axios.postForm('https://httpbin.org/post', document.querySelector('#htmlForm'));
```



`FormData` 和 `HTMLForm` 对象也可以通过显式将 `Content-Type` 标头设置为 `application/json` 来发布为 `JSON`：

```js
await axios.post('https://httpbin.org/post', document.querySelector('#htmlForm'), {
  headers: {
    'Content-Type': 'application/json'
  }
})
```



例如，表单

```html
<form id="form">
  <input type="text" name="foo" value="1">
  <input type="text" name="deep.prop" value="2">
  <input type="text" name="deep prop spaced" value="3">
  <input type="text" name="baz" value="4">
  <input type="text" name="baz" value="5">

  <select name="user.age">
    <option value="value1">Value 1</option>
    <option value="value2" selected>Value 2</option>
    <option value="value3">Value 3</option>
  </select>

  <input type="submit" value="Save">
</form>
```

将作为以下 JSON 对象提交：

```js
{
  "foo": "1",
  "deep": {
    "prop": {
      "spaced": "3"
    }
  },
  "baz": [
    "4",
    "5"
  ],
  "user": {
    "age": "value2"
  }
}
```

当前不支持将 `Blob`/` 文件`作为 JSON （`base64`） 发送。



#### 进度捕获

Axios 支持浏览器和node环境来捕获请求上传/下载进度。进度事件的频率被迫限制为每秒 `3` 次。

```js
await axios.post(url, data, {
  onUploadProgress: function (axiosProgressEvent) {
    /*{
      loaded: number;
      total?: number;
      progress?: number; // in range [0..1]
      bytes: number; //自上次触发（delta）以来已传输了多少个字节
      estimated?: number; // 估计时间为几秒钟
      rate?: number; // 上传速度/字节
      upload: true; // 上传标志
    }*/
  },

  onDownloadProgress: function (axiosProgressEvent) {
    /*{
      loaded: number;
      total?: number;
      progress?: number;
      bytes: number; 
      estimated?: number;
      rate?: number; // 下载速度/字节
      download: true; // 下载的标志
    }*/
  }
});  
```



您还可以在 node.js 中跟踪流上传/下载进度：

```js
const {data} = await axios.post(SERVER_URL, readableStream, {
   onUploadProgress: ({progress}) => {
     console.log((progress * 100).toFixed(2));
   },
  
   headers: {
    'Content-Length': contentLength
   },

   maxRedirects: 0 // 避免缓冲整个流
});
```

**注意：** node.js 环境当前不支持捕获 FormData 上传进度。

**警告：** 建议通过设置 maxRedirects： 0 来禁用重定向，以在 **node.js** 环境中上传流，因为 follow-redirects 包将缓冲整个流在 RAM 中，而不遵循“背压”算法。



#### 速率限制

下载和上传速率限制只能为 http 适配器 （node.js） 设置：

```js
const {data} = await axios.post(LOCAL_SERVER_URL, myBuffer, {
  onUploadProgress: ({progress, rate}) => {
    console.log(`Upload [${(progress*100).toFixed(2)}%]: ${(rate / 1024).toFixed(2)}KB/s`)
  },
   
  maxRate: [100 * 1024], // 100KB/s limit
});
```



#### Fetch 适配器

Fetch 适配器是在 `v1.7.0` 中引入的。默认情况下，如果 `xhr` 和 `http` 适配器在构建中不可用，或者环境不支持，则将使用它。要默认使用它，必须显式选择它：

```js
const {data} = axios.get(url, {
  adapter: 'fetch' // by default ['xhr', 'http', 'fetch']
})
```



您可以为此创建一个单独的实例：

```js
const fetchAxios = axios.create({
  adapter: 'fetch'
});

const {data} = fetchAxios.get(url);
```

该适配器支持与 `xhr` 适配器相同的功能， **包括上传和下载进度捕获** 。此外，它还支持其他响应类型，例如`流`和`表单数据 `（如果环境支持）。



#### 与 axios 相关的库

https://github.com/axios/axios/blob/v1.x/ECOSYSTEM.md



### qs

qs是一个url参数转化（parse和stringify）的JavaScript库。可以把格式化的字符串转换为对象格式。

文档地址：https://www.npmjs.com/package/qs



使用

`注：示例版本 qs v6.11.2`

1、安装依赖

```sh
npm install qs -S
```



2、使用

```js
import qs from 'qs'

let params = {
  name: 'lisa',
  age: 18
}

console.log(qs.stringify(params)) // 字符串化：name=lisa&age=

// arrayFormat：对数据中数组的格式化处理
qs.stringify({ids: [1,2,3]},{arrayFormat: 'repeat'})	// ids=1&ids=2&ids=3
qs.stringify({ids: [1,2,3]},{arrayFormat: 'brackets'})	// ids[]=1&ids[]=2&ids[]=3
qs.stringify({ids: [1,2,3]},{arrayFormat: 'indices'})	// ids[0]=1&ids[1]=2&ids[2]=3
qs.stringify({ids: [1,2,3]},{indices: false})		// ids=1&ids=2&ids=3
```





## 轮播

### swiperjs

swipe.js是一个可滑动轮播图模块。

文档地址：https://swiperjs.com/



使用

`注：示例版本 swiper v11.0.4`

1、安装依赖

```sh
npm install swiper -S
```



2.1、使用：元素挂载方式

```vue
<template>
  <div>
    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">slide1</div>
        <div class="swiper-slide">slide2</div>
        <div class="swiper-slide">slide3</div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css";

export default {
  mounted() {
    const swiper = new Swiper(".swiper", {
      // 配置项 https://swiperjs.com/swiper-api#parameters
      loop: true,
    });
  },
};
</script>

<style lang="scss" scoped>
.swiper {
  width: 200px;
  height: 200px;
}
</style>
```



2.2、使用：组件方式（只适用 vue3）

文档：https://swiperjs.com/vue

```vue
<template>
  <swiper
    :slides-per-view="3"
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
  </swiper>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    return {
      onSwiper,
      onSlideChange,
    };
  },
};
</script>
```



#### 示例

```vue
<template>
  <div>
    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in imgs" :key="index">
          <img :src="item" />
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default {
  data() {
    return {
      imgs: [
        "https://cdn.beekka.com/blogimg/asset/202310/bg2023101704.webp",
        "https://cdn.beekka.com/blogimg/asset/202308/bg2023082101.webp",
        "https://cdn.beekka.com/blogimg/asset/202308/bg2023082102.webp",
      ],
    };
  },
  mounted() {
    const swiper = new Swiper(".swiper", {
      modules: [Navigation, Pagination],
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  },
};
</script>

<style lang="scss" scoped>
.swiper {
  width: 100%;
  height: 400px;
}

.swiper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
```



#### API

##### 初始化

* `new Swiper(swiperContainer [, parameters])` : 用于初始化一个Swiper，返回初始化后的Swiper实例。
  * swiperContainer : 值可以是 `HTMLElement/string` 。Swiper容器的css选择器
  * parameters : 可选，值为`object`。 Swiper的个性化配置
  * 一个页面中引用多个Swiper，可以给每个容器加上ID或Class区分，要保留默认的类名`swiper-container`。

```js
var mySwiper = new Swiper('.swiper-container', {
	autoplay: true,		// 可选选项，自动滑动
})
```



##### 个性化配置

* `initialSlide` : number类型。设定初始化时slide的索引(默认0，也就是第一个)。
* `direction` : Swiper的滑动方向，可设置为水平方向切换(默认horizontal)或垂直方向切换(vertical)。
* `speed` : number类型。切换速度，即slider自动滑动开始到结束的时间(单位ms)。默认300
* `grabCurson` : boolean(默认false)。设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状。
* `on` : object类型。注册事件，Swiper4.0开始使用关键词this指代Swiper实例。
* `autoHeight` : boolean(默认false)。自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化。
* `enabled` : boolean。设置Swiper初始时是否可用，默认是可用(true)。当Swiper被禁用时，它将隐藏所有导航元素（分页器、按钮、滚动条）并且不会响应任何事件和交互。
  * 后面可通过函数[`enable()`](https://www.swiper.com.cn/api/methods/476.html)和[`disable()`](https://www.swiper.com.cn/api/methods/477.html)动态启用或禁用Swiper。
* `init` : boolean(默认true)。当你创建一个Swiper实例时是否立即初始化。
  * 如果禁止了(false)，可以稍后使用 `mySwiper.init()` 来初始化。
* `preloadImages` : boolean。默认为true，Swiper会强制加载所有图片后才初始化。
* `updateOnImagesReady` : boolean(默认true)。当所有的内嵌图像（img标签）加载完成后Swiper会重新初始化。
  * 使用此选项需要先开启`preloadImages: true`
* `breakpoints` : object类型。断点设定：根据屏幕宽度设置某参数为不同的值，类似于媒体查询。
  * 只有部分不需要变换布局方式和逻辑结构的参数支持断点设定，如**slidesPerView、slidesPerGroup、 spaceBetween、slidesPerColumn、slidesPerGroupSkip**，而像**loop、direction、effect**等则无效。
  * Swiper4 判断方式是 屏幕宽度小于等于。
* `breakpointsBase` : string类型。设置断点功能 `breakpoints` 的计算基准。可以设为`window`或`container`
  * 如果设置为`window`（默认），则断点键值基于当前窗口的宽度。
  * 如果设置为`container`，则断点键值基于 Swiper 容器的宽度。
  * 启用版本：6.5.0
* `runCallbacksOnInit` : boolean(默认true)。如果你的初始化slide不是第一个(例`initialSlide:2`)或者设置了`loop: true`，那么初始化时会触发一次 `[Transition/SlideChange] [Start/End]` 回调函数。
  * 如果不想触发，可将此参数设置为false。

* `setWrapperSize` : boolean(默认false)。Swiper使用flexbox布局(display: flex)，开启这个设定会在Wrapper上添加等于slides相加的宽或高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
* `virtualTranslate` : boolean(默认false)。虚拟的位移。当你启用这个参数，Slide不会移动，但是Swiper还是在运行，例如progress，active-slide，各种回调等。
  * 滑动Swiper，slide没移动，但是swiper切换了，小圆点也会切换。
  * 启用这个选项时slideChange和transition等事件有效（与Swiper3.x不同）。
  * 还可以用来使Swiper的滑动停止（锁定）。
* `width` : number类型。强制Swiper的宽度(px)，当你的Swiper`在隐藏状态下初始化时`用得上。这个参数会使自适应失效。可设置为undefined使这个参数无效。
* `height` : number类型。强制Swiper的高度(px)，当你的Swiper`在隐藏状态下初始化时`且切换方向为垂直才用得上。这个参数会使自适应失效。
* `roundLengths` : boolean(默认false)。如果设置为true，则将slide的宽和高取整(四舍五入)，以防止某些分辨率的屏幕上文字或边界(border)模糊。
  * 例如当你设定`slidesPerView: 3`的时候，则可能出现slide的宽度为341.33px，开启roundLengths后宽度取整数341px。
* `uniqueNavElements` : boolean(默认true)。当存在多个同名导航元素时，设置导航元素是否唯一。导航元素包括分页器，按钮和滚动条。
  * false: 全部导航元素有效
  * true: 优先选取全部container内部元素。如果没有内部元素，选取第一个外部元素。
* `nested` : boolean(默认false)。用于嵌套相同方向的swiper时，当切换到子swiper时停止父swiper的切换。请将子swiper的nested设置为true。
* `watchOverflow` : boolean(默认false)。当没有足够的slide切换时，例如只有1个slide，swiper会失效且隐藏导航等。默认不开启这个功能。loop模式无效，因为会复制slide。
* `cssMode` : boolean(默认false)。启用后，它将使用现代CSS Scroll Snap API。它不支持Swiper的很多功能，但可能会带来更好的性能。[更多信息](https://www.swiper.com.cn/api/parameters/449.html)
* `updateOnWindowResize` : boolean(默认true)。默认当窗口(window) 尺寸发生变化时，比如屏幕旋转，Swiper会更新和重新计算([update](https://www.swiper.com.cn/api/methods/257.html)和[breakpoints](https://www.swiper.com.cn/api/parameters/289.html)等)。禁止可设为false。
* `resizeObserver` : boolean(默认false)。开启后可使用浏览器的ResizeObserver API（[如果浏览器支持](https://caniuse.com/?search=ResizeObserver)）来监测swiper的container大小变化。
* `createElements` : boolean(默认false)。如果为true，可以自动生成导航元素的HTML，但此时你的导航元素需要使用默认设置。
  * `pagination:true, navigation: true, scrollbar: true`
  * 启用版本：6.7.0



```js
// 常用配置项
var mySwiper = new Swiper('.swiper-container', {
  loop: true,
  initialSlide: 1,          // 初始索引  
  direction: 'vertical',  // 滑动方向
  speed: 1000,              // 切换速度
  grabCursor: true,         // 指针为手掌形状

  //enabled: false,           // 初始化时不可用
  //autoHeight: true,         // 自动高度。wrapper和container会随着当前slide的高度而发生变化。
  //runCallbacksOnInit: false,  //初始化时不触发回调

  //setWrapperSize: true,     // 在Wrapper上添加等于slides相加的宽或高
  //virtualTranslate: true,   // 滑动Swiper，slide没移动，但是swiper切换了，小圆点也会切换。
  //roundLengths: true,       // 将slide的宽和高取整(四舍五入)
})
```



```js
// on 注册事件
var mySwiper = new Swiper('.swiper-container', {
  on: {
    slideChange: function () {
      console.log(this.activeIndex)
    }
  }
}
                          
//或者
var mySwiper = new Swiper('.swiper-container')
mySwiper.on('slideChange', function () {
  //...
})
```



```js
// 断点设定
var mySwiper = new Swiper('.swiper-container',{
  slidesPerView: 1,
  spaceBetween: 40,
 
  // 都不满足则按原来的显示(1个)
  breakpoints: { 
    320: {  //当屏幕宽度大于等于320
      slidesPerView: 2,		// 显示2个
      spaceBetween: 10		// 间隔 px
    },
    768: {  //当屏幕宽度大于等于768 
      slidesPerView: 3,
      spaceBetween: 20
    },
    1280: {  //当屏幕宽度大于等于1280
      slidesPerView: 4,
      spaceBetween: 30
    }
  }
})
```



```js
// runCallbacksOnInit 初始化时触发一次回调
var mySwiper = new Swiper('.swiper-container',{
  loop:true,
  //or initialSlide: 2,
  runCallbacksOnInit : true, //如果不想触发，将此设置为false
  on:{
    slideChangeTransitionStart:function(){
      alert('触发了回调')
    }
  }
})
```





##### 配置项-网格分布

* `slidesPerView` : number/auto(默认1)。设置slider容器能够同时显示的slides数量(carousel模式)。
  * 可以设置为数字（可为小数，小数不可loop），或者 'auto'则自动根据slides的宽度来设定数量。
  * loop模式下如果设置为'auto'还需要设置另外一个参数[loopedSlides](https://www.swiper.com.cn/api/loop/25.html)。
* `slidesPerGroup` : 默认为1。定义slides的数量多少为一组。当轮播时，一组一组动。
* `slidesPerGroupSkip` : 默认为0。设置前几个slide将不计入分组之内。
* `spaceBetween` : 默认0。在slide之间设置距离（单位px）。
* `slidesPerColumn` : 默认1。设置多行布局里面每列的slide数量。
* `slidesPerColumnFill` : 多行布局中以什么形式填充。默认column(一列铺满再下一列)。可设置为row(一行铺满再下一行)
  * 当设置为column时，需要设置swiper-container的高度。
* `centeredSlides` : 默认false。设定为true时，当前滑动块(active slide)会居中，而不是默认状态下的居左。
* `centeredSlidesBounds` : 默认false。当设置了Active Slide居中后，还可以配合设置此参数，使得第一个和最后一个Slide 始终贴合边缘。
  * 但这样就选择不了第一个和最后一个了
* `centerInsufficientSlides` : 默认false。如果开启这个参数，当slides的总数小于slidesPerView时，slides居中。
  * 不适用于loop模式和slidesPerColumn。
* `normalizeSlideIndex` : 默认true。如果设置为false，则使你的活动块指示为最左边的那个Slide（没开启`centeredSlides`时）
  * 设置为false，可以解决一行显示多个slide，并跳转到某个slide时，activeIndex 不符的问题
* `slidesOffsetBefore` : 默认0。设定slide与左边框的预设偏移量（单位px）。
* `slidesOffsetAfter` : 默认0。设定slide与右边框的预设偏移量（单位px）。



```js
var mySwiper = new Swiper('.swiper-container', {
  slidesPerView: 2,   // 同时显示 slide 的数量
  slidesPerGroup: 2,  // 多少个 slide 为一组，轮播时一组一组动
  slidesPerGroupSkip: 1,  // 设置前几个 slide 不计入分组
  spaceBetween: 20,   // silde间的距离

  slidesPerColumn: 2,   // 每列有几个slide。也就是多少列
  slidesPerColumnFill: 'row',   // 多行布局时，铺满一行再下一行

  centeredSlides: true,   // active slide会居中，而不是默认状态下的居左
  centeredSlidesBounds: true, // 当设置了Active Slide居中后，配合设置此参数，使得第一个和最后一个Slide始终贴合边缘

  slidesOffsetBefore: 100,  // 设定slide与左边框的预设偏移量（单位px）。
  slidesOffsetAfter: 200,  // 设定slide与右边框的预设偏移量（单位px）。
})
```





##### 配置项-free模式

* `freeMode` : 默认false。以下方法都需要在 `freeMode: true` 下使用。
  * false: 普通模式，slide滑动时只滑动一格，并自动贴合wrapper。
  * true: free模式，slide会根据惯性滑动可能不止一格且不会贴合。
* `freeModeSticky` : 默认false。如果设置为true，freeMode也能自动贴合
* `freeModeMinimumVelocity` : 默认0.02。触发FreeMode惯性的最小触摸速度（px/ms），低于这个值不会惯性滑动
  * 设置的值越大，就需要触摸更快才能产生惯性
* `freeModeMomentum` : 默认true。free模式动量。如果设置为false则关闭动量，释放slide之后立即停止不会滑动。
* `freeModeMomentumRatio` : 默认1。释放 slide 后继续滑动的时间(s)。值越大，滑动时间越长。
* `freeModeMomentumVelocityRatio` : 默认1。free模式惯性速度，设置越大，释放后滑得越快。
* `freeModeMomentumBounce` : 默认true，有反弹效果。如果设置为false，slide通过惯性滑动到边缘时，没有反弹效果
* `freeModeMomentumBounceRatio` : 默认1。值越大，边界反弹效果越明显，反弹距离越大。



```js
var mySwiper = new Swiper('.swiper-container', {
  freeMode: true,     // slide会根据惯性滑动可能不止一格且不会贴合
  // freeModeSticky: true, 			// 使得freeMode也能自动贴合。
  // freeModeMinimumVelocity: 1, // 设置的值越大，就需要触摸更快才能产生惯性
  // freeModeMomentum: false,    // 释放silde后不会继续滑动
  // freeModeMomentumRatio: 1,   // 释放 slide 后继续滑动的时间
  // freeModeMomentumVelocityRatio: 5,   // free模式惯性速度，设置越大，释放后滑得越快
  // freeModeMomentumBounce: false,      // 通过惯性滑动到边缘时，没有反弹效果
  // freeModeMomentumBounceRatio: 4,     // 值越大，边界反弹效果越明显，反弹距离越大
})
```





##### 配置项-loop循环

* `loop` : 默认false。设置为true 则开启loop模式。
  * loop模式：会在原本slide前后复制若干个slide(默认一个)并在合适的时候切换，让Swiper看起来是循环的。 
  * loop模式在与free模式同用时会产生抖动，因为free模式下没有复制slide的时间点。
* `loopAdditionalSlides` : loop模式下会在slides前后复制若干个slide，前后复制的个数不会大于原总个数。
  * 默认为0，前后各复制1个。0,1,2 --> `2,`0,1,2`,0`   在审查元素中查看变化。
  * 如果取值为1，则0,1,2 --> `1,2,`0,1,2`,0,1`
* `loopPreventsSlide` : 默认true，当swiper正在过渡时，阻止slide前进后退的切换操作，此功能仅在loop模式下有效。
  * 设置为false，就可以在过渡时，也可以前进后退。
  * 启用版本: 6.0.0
* `loopFillGroupWithBlank` : 默认false。如果设置为true，则在loop模式下，为group填充空白slide
* `loopedSlides` : 默认1。在loop模式下使用`slidesPerview:'auto'`，还需使用该参数设置所要用到的loop个数(一般设置大于可视slide个数2个即可)。



```js
var mySwiper = new Swiper('.swiper-container', {
  loop: true,     // 开启循环
  loopAdditionalSlides: 1,    // 前后各复制两个
  speed: 2000,    // 过渡所需时间
  loopPreventsSlide: false,   // 过渡时也可以前进后退

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
})
```





##### 配置项-Progress进度

Progress（进度、进程）分为swiper的progress 和每个slide单独的progress。

开启 `watchSlidesProgress` 这个参数来计算每个slide的progress，Swiper的progress无需设置即开启。



对于swiper的progress属性，活动的slide在最左（上）边时为0，活动的slide在最右（下）边时为1，其他情况平分。例：有6个slide，当活动的是第三个时swiper的progress属性是0.4，当活动的是第五个时swiper的progress属性是0.8。

对于slide的progress属性，活动块slide的progress为0，其他的依次减1。例：如果一共有6个slide，活动块slide是第三个，那么从第一个到第六个的progress属性分别是：2、1、0、-1、-2、-3。



progress值和swiper或slide的位置比例相关联，如果每个slide的宽度不同，pregress不一定会呈规则变化。当你设置了`slidesPerView: 'auto'`时需要注意这点。



* `watchSlidesProgress` : 默认false。设置为true，则可以开启slide的progress属性。注意不能和 `loop: true` 一起使用
* `watchSlidesVisibility` : 默认false。设置为true开启，会在每个可见slide增加一个类 `swiper-slide-visible`。
  * 需要先开启`watchSlidesProgress` 



```js
var mySwiper = new Swiper('.swiper-container', {
  watchSlidesProgress: true,    // 开启 slide 的 progress 属性
  watchSlidesVisibility: true,  // 在可见的silde上添加一个类 swiper-slide-active
  on: {
    slideChange(){
      console.log('mySwiper: ' + this.progress)
      this.slides.forEach(element => {
        console.log(element.innerHTML + " : " + element.progress)
      });
    }
  }
})
console.log(mySwiper.progress)
```



##### 配置项-click点击

* `preventClicks` : 默认false，当swiper在触摸时阻止默认事件（preventDefault），用于防止触摸时触发链接跳转。
  * 设置为true，则触摸时不阻止默认事件触发。
* `preventClicksPropagation` : 默认true，阻止click冒泡。拖动Swiper时阻止click事件。
  * 设置为false，则不阻止事件冒泡。
* `slideToClickedSlide` : 默认false。设置为true则点击slide会过渡到这个slide。



```js
var mySwiper = new Swiper('.swiper-container', {
  // preventClicks: false,   // 触摸时不阻止默认事件
  // preventClicksPropagation: false,  // 阻止click冒泡。拖动Swiper时阻止click事件

  // 搭配使用，实现点击的silde会居中
  slideToClickedSlide: true,  // 点击slide会过渡到这个slide
  slidesPerView: 3,           // 同时显示3个slide
  centeredSlides : true       // active slide 居中显示
})
```





### glide

Glide.js 是一个无依赖项的 JavaScript ES6 滑块和轮播。它重量轻、灵活且快速。专为滑动而设计。

文档地址：https://github.com/glidejs/glide



### splide

Splide 是一个用 TypeScript 编写的轻量级、灵活且可访问的滑块/轮播。没有依赖项，没有 Lighthouse 错误。

文档：https://github.com/Splidejs/splide



## 日期

### dayjs

```sh
npm install dayjs -S
```

[文档地址](https://dayjs.fenxianglu.cn/category/#node-js)



### date-fns

date-fns 是一个现代的 JavaScript 日期工具类库，提供了最全面、最简单和一致的工具集，用于在浏览器和 Node.js 中操作 JavaScript 日期。



## 二维码



### qrcode

QR码/2d条码生成器。支持浏览器和服务端。

文档地址：https://www.npmjs.com/package/qrcode



使用

`注：示例版本 qrcode v1.5.3`

1、安装依赖

```sh
npm install qrcode -S
```



2、使用

```vue
<template>
  <div>
    <img :src="imgUrl" v-if="imgUrl" />
  </div>
</template>
<script>
import QRCode from "qrcode";
export default {
  data() {
    return {
      imgUrl: "",
    };
  },
  mounted() {
    QRCode.toDataURL(
      "http://abc.com",
      { errorCorrectionLevel: "L", width: 300 },
      (err, url) => {
        if (err) {
          throw err;
        }
        this.imgUrl = url;
      }
    );
  },
};
</script>
```



### vue-qr



### QRCanvas

QRCanvas 是一个基于 canvas 的 JavaScript 二维码生成工具。其具有以下特点：

- 仅依赖 canvas，兼容性好
- 简单，仅仅是需要一些数据的配置
- 定制化功能丰富
- 支持 Node.js
- 方便在 React 和 Vue 中使用
- 支持所有主流的浏览器

文档地址：https://github.com/gera2ld/qrcanvas





## 验证码



### vue-captcha-code

文档地址：https://www.npmjs.com/package/vue-captcha-code



使用

`注：示例版本 vue-captcha-code v1.0.2`

1、安装依赖

```sh
npm install vue-captcha-code -S
```



2、使用

```vue
<template>
  <div>
    <p>{{ code }}</p>
    <CaptchaCode :captcha:sync="code" @on-change="handleChange" ref="captcha" />
    <button @click="handleClick">更换验证码</button>
  </div>
</template>

<script>
import CaptchaCode from "vue-captcha-code";

export default {
  components: {
    CaptchaCode,
  },
  data() {
    return {
      code: "",	// 判断用户输入是否和code一致
    };
  },
  methods: {
    handleChange(code) {
      console.log("code:", code);
      this.code = code;
    },
    handleClick() {
      this.$refs.captcha.refreshCaptcha();
    },
  },
};
</script>
```



### slider-verify-v2 滑动拼图验证

文档地址：https://github.com/author-fuyf/slider-verify-v2



### jigsaw

文档地址：https://github.com/yeild/jigsaw



### vue-drag-verify

https://github.com/yimijianfang/vue-drag-verify



### verify

文档地址：https://github.com/Hibear/verify



## 剪切板



### clipboard

文档地址：https://github.com/zenorocha/clipboard.js



使用

`注：示例版本 clipboard v2.0.11`

1、安装依赖

```sh
npm install clipboard -S
```



2、使用

```vue
<template>
  <div>
    <div class="btn" :data-clipboard-text="str" @click="handleCopy">copy</div>
  </div>
</template>
<script>
import Clipboard from "clipboard";
export default {
  data() {
    return {
      str: "hello",
    };
  },
  methods: {
    handleCopy() {
      let clipboard = new Clipboard(".btn");
      clipboard.on("success", (e) => {
        // 复制成功
        clipboard.destroy(); // 释放内存
      });
      clipboard.on("error", (e) => {
        // 复制失败
        clipboard.destroy();
      });
    },
  },
};
</script>
```





## TODO 文件处理

### PDF

#### PDF.js

PDF.js是使用 HTML5 构建的可移植文档格式 (PDF) 查看器。它由社区驱动并受 Mozilla 支持，目标是创建一个通用的、基于 Web 标准的平台来解析和呈现 PDF。

文档地址：https://github.com/mozilla/pdf.js



#### jsPDF

jsPDF 是一个使用 JavaScript 语言生成 PDF 的开源库，是一个用于生成 PDF 的领先的 HTML5 客户端解决方案。

文档地址：https://github.com/parallax/jsPDF



#### pdfmake

在纯 JavaScript 中用于服务器端和客户端的 PDF 文档生成库。

文档地址：https://github.com/bpampuch/pdfmake



#### pdf-lib

pdf-lib 可以在任何 JavaScript 环境中创建和修改 PDF 文档。它旨在解决 JavaScript 生态系统对 PDF 操作（尤其是 PDF修改）缺乏强大支持的问题。可以用于任何现代 JavaScript 运行时，如 Node、Browser、Deno 和 React Native 等。

文档地址：https://github.com/Hopding/pdf-lib



#### pdfkit

PDFKit 是一个用于 Node 和浏览器的 PDF 文档生成库，可以轻松创建复杂的多页可打印文档。API 包含可链接性，并包括低级功能以及更高级别功能的抽象。PDFKit API 的设计很简单，因此生成复杂的文档通常只需几个函数调用即可。

文档地址：https://github.com/foliojs/pdfkit



### 图片

#### sharp

sharp 是一个高性能的 Node.js 图像处理库，调整 JPEG、PNG、WebP、AVIF 和 TIFF 图像大小的最快模块。

文档地址：https://github.com/lovell/sharp



#### vue-cropper

一个优雅的图片裁剪插件。

文档地址：https://www.npmjs.com/package/vue-cropper



#### cropperjs

cropperjs 是一个 JavaScript 图像裁剪器，支持29个裁剪选项、27种方法、6个事件、缩放、旋转等。

文档地址：https://github.com/fengyuanchen/cropperjs



#### compressorjs

JavaScript 图像压缩器。使用浏览器原生的 canvas.toBlob API 来做压缩工作，即**有损压缩**，**异步**压缩，在不同的浏览器有**不同的压缩效果**。一般在客户端上传之前使用这个来预压缩图片。

文档地址：https://github.com/fengyuanchen/compressorjs



#### viewerjs

viewerjs 是一个 JavaScript 图像查看器，支持 52 个查看选项、23 种操作方法、17 个事件、旋转、移动、缩放等。

文档地址：https://github.com/fengyuanchen/viewerjs



#### tui.image-editor

tui.image-editor 是一个使用 HTML5 Canvas 的全功能图像编辑器。它易于使用并提供强大的过滤器。

文档地址：https://github.com/nhn/tui.image-editor



#### omagesloaded

omagesloaded 是一个用来检查图像何时加载的 JavaScript 库。

文档地址：https://github.com/desandro/imagesloaded



### 音视频

#### video.js

Video.js 是一个为 HTML5 世界从头开始构建的网络视频播放器。它支持 HTML5 视频和媒体源扩展，以及其他播放技术，如 YouTube 和 Vimeo（通过插件）。它支持在台式机和移动设备上播放视频。

文档地址：https://github.com/videojs/video.js



#### plyr

Plyr 是一个简单、轻量级、可访问和可定制的 HTML5、YouTube 和 Vimeo 媒体播放器，支持现代浏览器。

文档地址：https://github.com/sampotts/plyr



#### xgplayer

西瓜播放器是一个Web视频播放器类库，它本着一切都是组件化的原则设计了独立可拆卸的 UI 组件。更重要的是它不只是在 UI 层有灵活的表现，在功能上也做了大胆的尝试：摆脱视频加载、缓冲、格式支持对 video 的依赖。尤其是在 mp4 点播上做了较大的努力，让本不支持流式播放的 mp4 能做到分段加载，这就意味着可以做到清晰度无缝切换、加载控制、节省视频流量。同时，它也集成了对 flv、hls、dash 的点播和直播支持。

文档地址：https://github.com/bytedance/xgplayer



#### DPlayer

DPlayer 是一款可爱的 HTML5 弹幕视频播放器，可帮助人们轻松构建视频和弹幕。

文档地址：https://github.com/DIYgod/DPlayer



#### MediaElement.js

MediaElement.js 是一个HTML5 `<audio>` 或 `<video>` 播放器，支持 MP4、WebM 和 MP3 以及 HLS、Dash、YouTube、Facebook、SoundCloud 等，具有通用 HTML5 MediaElement API，可在所有浏览器中实现一致的 UI。

文档地址：https://github.com/mediaelement/mediaelement



#### Howler.js

howler.js 是一个现代 web 音频库。它默认为Web Audio API并回退到HTML5 Audio。这使得在所有平台上使用 JavaScript 处理音频变得容易且可靠。

文档地址：https://github.com/goldfire/howler.js



### 表格

#### vxe-table

一个基于 vue 的 PC 端表单/表格组件，可编辑表格，支持增删改查、虚拟列表、虚拟树、懒加载、快捷菜单、数据校验、打印导出、表单渲染、数据分页、弹窗、自定义模板、渲染器、JSON 配置式...

支持 vue2 、vue3。

文档地址：https://github.com/x-extends/vxe-table



#### Handsontable

Handsontable 是一个具有电子表格外观的 JavaScript 数据网格组件。适用于 React、Angular 和 Vue。它结合了数据网格功能和类似电子表格的 UX。它提供数据绑定、数据验证、过滤、排序和 CRUD 操作。

文档地址：https://github.com/handsontable/handsontable



#### ag-grid

AG Grid 是一个功能齐全且高度可定制的 JavaScript 数据网格。它提供了出色的性能，没有第三方依赖，并且可以与所有主要的 JavaScript 框架顺利集成。

文档地址：https://github.com/ag-grid/ag-grid



#### x-spreadsheet

x-spreadsheet 是一个基于 Web 的 JavaScript（canvas）电子表格。

文档地址：https://github.com/myliang/x-spreadsheet



#### ExcelJS

ExcelJS 是一个Excel电子表格文件逆向工程项目。可以读取，操作并写入电子表格数据和样式到 XLSX 和 JSON 文件。

文档地址：https://github.com/exceljs/exceljs



使用

`注：示例版本 exceljs v4.4.0`

1、安装依赖

```sh
npm i exceljs -S
```



2、使用

```vue
<template>
  <div id="home">
    <el-button type="primary" class="upload-file"
      >导入
      <input
        type="file"
        ref="upFile"
        class="upload-input"
        @change="handleUpload"
        accept=".xml,.xls,.xlsx"
      />
    </el-button>
    <el-button type="primary" @click="handleExport">导出</el-button>

    <el-table :data="tableData">
      <el-table-column
        v-for="(item, index) in lableList"
        :key="index"
        :label="item"
        :prop="item"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import ExcelJS from "exceljs";

export default {
  components: {},
  data() {
    return {
      tableData: [],
      lableList: [],
    };
  },
  methods: {
    handleExport() {
      // 创建工作簿并添加表
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Sheet1");

      // 添加每一行数据
      worksheet.addRow(this.lableList);
      this.tableData.forEach((item) => {
        let arr = [];
        for (let key in item) {
          arr.push(item[key]);
        }
        worksheet.addRow(arr);
      });

      // 导出 excel 文件
      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer]);
        let fileName = "test.xlsx";
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = URL.createObjectURL(blob);
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    },
    handleUpload(e) {
      const file = e.target.files[0];

      // 创建工作簿
      const workbook = new ExcelJS.Workbook();

      // 读取文件
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      // 读取完成回调
      reader.onload = (e) => {
        workbook.xlsx.load(e.target.result).then((res) => {
          // 所有指定 sheet 的所有数据
          let value = workbook.worksheets[0].getSheetValues();
          value.shift(); // 第一行总是 empty，所以把它移除

          value.forEach((item) => {
            item.shift(); // 第一列总是 empty，所以把它移除
          });

          // 设置表头
          let header = value[0];
          value.shift();

          // 设置各行数据，因为读取出来的行是稀疏列表，所以默认给各列填充默认值
          let table = [];
          value.forEach((item) => {
            let obj = {};
            header.forEach((item) => {
              obj[item] = "";
            });
            item.forEach((item, index) => {
              obj[header[index]] = item;
            });
            table.push(obj);
          });
          this.tableData = table;
          this.lableList = header;

          // 遍历工作簿中的 sheet
          // workbook.eachSheet(function (worksheet, sheetId) {
          //   console.log(worksheet, sheetId);
          // });

          // 获取指定 sheet
          // let sheet = workbook.getWorksheet(1);

          // 遍历各行数据，返回各行的稀疏列表
          // sheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
          //   console.log(rowNumber, JSON.stringify(row.values));
          // });
        });
      };

      this.$refs["upFile"].value = "";
    },
  },
};
</script>

<style lang="scss">
.upload-file {
  position: relative;
  .upload-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 10;
  }
}
</style>
```



3、导出带有样式的 excel

```js
handleExport() {
  let style = {
    font: {
      name: "楷体",
      size: 20,
      bold: true,
      color: { argb: "ffff0000" },
    },
    alignment: {
      vertical: "middle",
      horizontal: "center",
      wrapText: true,
    },
    border: {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    },
    fill: {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffC0C0C0" },
    },
  };
  const header = [
    // { header: "序号", key: "index", width: 11, style: style }, // 给某列所有单元格设置样式
    { header: "序号", key: "index", width: 11 },
    { header: "产品名称", key: "title", width: 34 },
    { header: "产品规格", key: "goods_sku", width: 10 },
  ];
  const toExcelData = [
    {
      index: 1, // 序号
      title: "vmagiccare丝绒抗静电梳气囊梳子气垫梳女士梳头蓬松头皮按摩", // 产品名称
      goods_sku: "朱砂红\n咖啡色\n藏蓝色", // 产品规格
    },
  ];

  // 创建工作簿并添加表
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  // 通过 key 对应的方式添加数据
  worksheet.columns = header;
  worksheet.addRows(toExcelData); //设置表头样式

  // 列可以设置宽度，行可以设置高度
  // worksheet.getColumn(1).width = 50;  // 第一列宽度设为50
  // worksheet.getRow(1).height = 50;    // 第一行高度设为50
  // // 每一行的高度设为50
  // worksheet.eachRow(function (row, rowNumber) {
  //   row.height = 50;
  // });

  // worksheet.getRow(1).font = style.font;
  // worksheet.getRow(1).fill = style.fill;

  // 遍历工作表中具有值的所有行，并给行内具有值的列设置样式
  worksheet.eachRow(function (row, rowNumber) {
    row.height = 20;
    row.eachCell((cell) => {
      cell.fill = style.fill;
    });
  });

  // 给第一行中具有值的列设置样式
  worksheet.getRow(1).eachCell((cell) => {
    cell.fill = style.fill;
    cell.font = style.font;
    cell.alignment = style.alignment;
    cell.border = style.border;
  });

  // 导出 excel 文件
  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(
      new Blob([buffer], {
        type: "application/octet-stream",
      }),
      `test.xlsx`
    );
  });
},
```









#### SheetJS

SheetJS 是一个简化的电子表格，用意用来阅读、编辑和导出电子表格，其适用于 Web 浏览器和服务器，在 Office 365 中受 Microsoft 信任。不支持修改单元格样式。

文档地址：https://github.com/SheetJS/sheetjs

官网地址：https://sheetjs.com/



使用

`注：示例版本 sheetjs v0.20.2`

1、安装依赖

```sh
npm i --save https://cdn.sheetjs.com/xlsx-0.20.2/xlsx-0.20.2.tgz
```



2、使用

```vue
<template>
  <div id="home">
    <el-button type="primary" class="upload-file"
      >导入
      <input
        type="file"
        ref="upFile"
        class="upload-input"
        @change="handleUpload"
        accept=".xml,.xls,.xlsx"
      />
    </el-button>
    <el-button type="primary" @click="handleExport">导出</el-button>

    <el-table :data="tableData">
      <el-table-column
        v-for="(item, index) in lableList"
        :key="index"
        :label="item"
        :prop="item"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { read, utils, writeFile, writeFileXLSX } from "xlsx";

export default {
  components: {},
  data() {
    return {
      tableData: [],
      lableList: [],
    };
  },
  methods: {
    // 导出方式1
    handleExport() {
      // 根据 json 数据生成 sheet
      const ws = utils.json_to_sheet(this.tableData);
      // 指定列的顺序按表头顺序生成
      utils.sheet_add_json(ws, this.tableData, { header: this.lableList });
      // 创建工作簿并添加 sheet
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Data");
      // 导出并下载 xlsx 文件
      writeFileXLSX(wb, "SheetJSVueAoO.xlsx");
    },
    // 导出方式2
    handleExport() {
      // 手动设置 sheet 数据
      let table = [{ name: "hlw", number: 22 }];
      let header = ["名字", "数字"];

      const jsonSheet = utils.json_to_sheet(table, header);
      // 手动设置 workbook
      let workbook = {
        SheetNames: ["表1"],
        Sheets: {
          ["表1"]: jsonSheet,
        },
      };

     	// 导出并下载 xlsx 文件
      writeFile(workbook, "test.xlsx");
    },
    handleUpload(e) {
      const file = e.target.files[0];

      // 读取文件
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      // 文件读取完成回调
      reader.onload = (e) => {
        const workbook = read(e.target.result);
        const sheetNames = workbook.SheetNames;
        // 第一个 sheet
        const sheet1 = workbook.Sheets[sheetNames[0]];

        // 将 sheet 转换为 json 格式数据
        // 将空列设置默认值""，可以避免导出时某列没数据不生成问题
        this.tableData = utils.sheet_to_json(sheet1, { defval: "" });
        // 只读取第一行，作为表头
        this.lableList = utils.sheet_to_json(sheet1, { header: 1 })[0];
      };

      this.$refs["upFile"].value = ""
    },
  },
};
</script>

<style lang="scss">
.upload-file {
  position: relative;
  .upload-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 10;
  }
}
</style>
```



3、常用 API

* read() ：读取 excel 文件内容
* utils ：工具类
  * sheet_to_json(sheet) ：将 sheet 转换为 json 格式数据
  * sheet_to_html(sheet) ：将 sheet 转换为 html
  * json_to_sheet(json) ：根据 json 数据生成 sheet
  * json_to_sheet(rowsArr, headerArr) ：根据表头数组和行数组生成 sheet
  * book_new() ：创建新的工作簿
  * book_append_sheet(workbook, sheet, "sheet名称") ：添加 sheet 进工作簿
* writeFileXLSX(workbook, "名称.xlsx") ：导出并下载 xlsx
* writeFile(workbook, "名称.xlsx") ：导出并下载 xlsx



注意事项：

* 导出时，如果某列没有数据，那么该列不会被生成
* 会自动对表头名称进行排序，所以导出列的顺序并不一定和传递时的列顺序一致
* 大数值导出会以科学记数法表示，可以将数值转为字符串类型
* 不支持修改单元格样式



### 文档

#### JSZip

JSZip 是一个使用 JavaScript 创建、读取和编辑 .zip 文件的库，具有简单的 API。

文档地址：https://github.com/Stuk/jszip



#### docxtemplater

docxtemplater 是一个从 docx/pptx 模板生成 docx/pptx 文档的库。它可以用数据替换 `{placeholders}` 并且还支持循环和条件。

文档地址：https://github.com/open-xml-templating/docxtemplater



#### textract

textract 是一个 node.js 模块，用于从 html、pdf、doc、docx、xls、xlsx、csv、pptx、png、jpg、gif、rtf 等中提取文本。

文档地址：https://github.com/dbashford/textract



#### PptxGenJS

PptxGenJS 是一个使用功能强大、简洁的 JavaScript API 创建 PowerPoint 演示文稿。

文档地址：https://github.com/gitbrent/PptxGenJS



#### officegen

officegen 是一个用于 JavaScript 中 Word (docx)、PowerPoint (pptx) 和 Excell (xlsx) 的独立 Office Open XML 文件（Microsoft Office 2007 及更高版本）生成器。

文档地址：https://github.com/Ziv-Barber/officegen



#### PapaParse

PapaParse 是一个快速而强大的 CSV（分隔文本）解析器，可以优雅地处理大文件和格式错误的输入。

文档地址：https://github.com/mholt/PapaParse



### 文件上传

#### Uppy

Uppy 是一款时尚的模块化 JavaScript 文件上传器，可与任何应用程序无缝集成。它速度快，具有易于理解的 API，让您不必担心比构建文件上传器更重要的问题。支持拖拽上传。

文档地址：https://github.com/transloadit/uppy



#### filepond

filepond 是一个用于上传文件的 JavaScript 库，优化图像以加快上传速度，并提供出色、可访问、如丝般流畅的用户体验。

文档地址：https://github.com/pqina/filepond



#### Dropzone

Dropzone 是一个 JavaScript 库，可以将任何 HTML 元素转换为 dropzone。这意味着用户可以将文件拖放到上面，Dropzone 将显示文件预览和上传进度，并通过 XHR 为你处理上传。

文档地址：https://github.com/dropzone/dropzone



#### vue-upload-component

vue-upload-component 是一个用于 Vue.js 的上传组件，支持多文件上传，上传目录，拖拽上传，拖拽目录，以及支持同时上传多个文件等。

文档地址：https://github.com/lian-yue/vue-upload-component



#### Uppload

Uppload 是一个更好的 JavaScript 图片上传器。它具有 30 多个插件的高度可定制性，完全免费和开源，并且可以与任何文件上传后端一起使用。

文档地址：https://github.com/elninotech/uppload





### 文件下载

#### FileSaver

FileSaver.js 是在客户端保存文件的解决方案，非常适合 在客户端上生成文件的 Web 应用，但是，如果文件来自 服务器 我们建议您首先尝试使用 Content-Disposition 附件响应标头，因为它具有更多的跨浏览器兼容性。

文档地址：https://github.com/eligrey/FileSaver.js



使用

`注：示例版本 file-saver v2.0.4`

1、安装依赖

```sh
npm install file-saver --save
```



2、使用

```js
import { saveAs } from 'file-saver';

var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
saveAs(blob, "hello world.txt");
```





## 网页标题

### vue-meta

文档地址：https://www.npmjs.com/package/vue-meta



使用

`注：示例版本 vue-meta v2.4.0`

1、安装依赖

```sh
npm install vue-meta -S
```



2、`main.js` 全局引入

```js
import VueMeta from 'vue-meta';
Vue.use(VueMeta)
```



3、使用

```vue
<script>
export default {
  metaInfo: {
    title: "注册",
    titleTemplate: "网站 - %s",	// %s是title的占位符。标题为：网站 - 注册
  },
  data() {
    return {};
  },
};
</script>
```



## css样式重置

### normalize.css

[文档地址](https://www.npmjs.com/package/normalize.css)

1、安装依赖

```sh
npm i normalize.css -S
```

2、使用

```js
import 'normalize.css/normalize.css'
```





## css单位转换



### postcss-px-to-viewport

将px单位转换为视口单位的 (vw, vh, vmin, vmax) 的 PostCSS 插件.

文档地址：https://www.npmjs.com/package/postcss-px-to-viewport



使用

`注：示例版本 postcss-px-to-viewport v1.1.1`

1、安装依赖

```sh
npm install postcss-px-to-viewport -D
```



2、项目根目录新建 `.postcssrc.js` 文件

```js
module.exports = {
  "plugins": {
    "postcss-px-to-viewport": {
      unitToConvert: "px", // 默认值`px`，需要转换的单位
      viewportWidth: 750, // 视窗的宽度,对应设计稿宽度
      unitPrecision: 6, // 指定`px`转换为视窗单位值的小数位数
      propList: ["*"], // 转化为vw的属性列表
      viewportUnit: "vw", // 指定需要转换成视窗单位
      fontViewportUnit: "vw", // 字体使用的视窗单位
      mediaQuery: false, // 允许在媒体查询中转换`px`
      minPixelValue: 1, // 小于或等于`1px`时不转换为视窗单位
      replace: true, // 是否直接更换属性值而不添加备用属性
      exclude: [/node_modules/], // 忽略某些文件夹下的文件或特定文件
      // include: [], // 只匹配某些文件夹下的文件或特定文件
      //selectorBlaskList: [".ignore-"], // 指定不需要转换为视窗单位的类
      //landscape: false, // 是否添加根据landscapeWidth生成的媒体查询条件 @media (orientation: landscape)
      //landscapeUnit: "vw", // 横屏时使用的单位
      //landscapeWidth: 1134 // 横屏时使用的视窗宽度
    }
  }
}
```



3、使用

```css
.class {
  /* 自动转换成vw单位 width: vw; */
  width: 300px;
}
```



### postcss-pxtorem

文档：https://github.com/cuth/postcss-pxtorem



## 懒加载

### vue-lazyload

文档地址：https://www.npmjs.com/package/vue-lazyload

使用

`注：示例版本 vue-lazyload v1.3.4  `

1、安装依赖

```sh
npm install vue-lazyload@1.3.4 -S
```

默认会安装 vue-lazyload v3版本，所以需要指定版本。



2、使用

```js
import Vue from 'vue'
import App from './App.vue'

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

new Vue({
  render: h => h(App)
}).$mount('#app')
```

```vue
<template>
  <div>
    <img v-for="item in imgList" :key="item" v-lazy="item" class="big-pic" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgList: [
        "https://huangyihui.cn/upload/gburlimg/159737795614c.png",
        "https://huangyihui.cn/upload/gburlimg/0d0b4f469a895.png",
        "https://huangyihui.cn/upload/gburlimg/192bb1052813e.png",
        "https://huangyihui.cn/upload/gburlimg/2855f56c0f83a.png",
        "https://huangyihui.cn/upload/gburlimg/41ae2fa4c9051.png",
      ],
    };
  },
};
</script>

<style lang="scss">
.big-pic {
  width: 100%;
  height: 600px;
  display: block;
  object-fit: cover;
}
</style>
```





## TODO 拖拽库

### Sortable

Sortable 是一个 JavaScript 拖拽库，用于在现代浏览器和触摸设备上对拖放列表进行重新排序。支持 Meteor、AngularJS、React、Polymer、Vue、Ember、Knockout 和任何 CSS 库。

文档地址：https://github.com/SortableJS/Sortable



###  Vue.Draggable

Vue.Draggable 是基于 Sortable.js 的 Vue 拖放组件。它允许拖放和视图模型数组同步，基于并提供 Sortable.js 的所有功能。该库适用于Vue 2，如果想在 Vue 3 中使用该库，可以访问：https://github.com/SortableJS/vue.draggable.next。

文档地址：https://github.com/SortableJS/Vue.Draggable



### Dragula

Dragula 是一个 JavaScript 库，实现了网页上的拖放功能。提供 JavaScript、AngularJS 和 React 版本。

文档地址：https://github.com/bevacqua/dragula



### interact.js

interact.js 是一个适用于现代浏览器的 JavaScript 拖放库，支持调整大小和多点触控手势，具有惯性和捕捉功能。为了尽可能多地提供控制，它尝试提供一个简单、灵活的API，该 API 提供移动元素所需的所有拖拽API。

文档地址：https://github.com/taye/interact.js



### VueDraggablePlus

VueDraggablePlus 是一个支持 Vue2 和 Vue3 的拖拽库，

文档地址：https://github.com/Alfred-Skyblue/vue-draggable-plus



## TODO 表单

### VeeValidate

vee-validate 是Vue.js的表单验证库，它允许验证输入并以熟悉的声明式样式或使用组合函数构建更好的表单 UI。

文档地址：https://github.com/logaretm/vee-validate



### vue-form-making

vue-form-making 是一个基于 vue 和 element-ui 实现的可视化表单设计器，使用了最新的前端技术栈，内置了 i18n 国际化解决方案，可以让表单开发简单而高效。

文档地址：https://github.com/GavinZhuLei/vue-form-making



### FormKit

FormKit 是一个面向 Vue 开发人员的表单创作框架，它使构建高质量的生产就绪表单的速度提高了 10 倍。

文档地址：https://github.com/formkit/formkit



### cleave.js

一款支持多种格式录入的文本框组件。

文档地址：https://github.com/nosir/cleave.js



## TODO 表格

### vue-easytable

该库提供了一个功能齐全且高度可定制的表格组件/数据网格。它支持许多功能，如虚拟滚动、列固定、标题固定、标题分组、过滤器、排序、单元格省略号、行扩展、行复选框等。

还支持类似 excel 表格编辑。

文档地址：https://github.com/Happy-Coding-Clans/vue-easytable



### vue-good-table

一个易于使用的强大 vuejs table，具有高级自定义功能，包括排序、列过滤、分页、分组等。

文档：https://github.com/xaksis/vue-good-table





## 图表

### Apache ECharts

Apache ECharts 是一款基于Javascript的数据可视化图表库，提供直观，生动，可交互，可个性化定制的数据可视化图表。它是用纯 JavaScript 编写的，基于zrender，是一个全新的轻量级画布库。

除了已经内置的包含了丰富功能的图表，ECharts 还提供了[自定义系列](https://echarts.apache.org/zh/option.html#series-custom)，只需要传入一个*renderItem*函数，就可以从数据映射到任何你想要的图形。

文档地址：https://github.com/apache/echarts

官网：https://echarts.apache.org/zh/index.html

awesome-echarts：https://github.com/ecomfe/awesome-echarts

自定义图表-睡眠阶段图：https://github.com/apache/echarts-custom-series?tab=readme-ov-file





#### html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>ECharts</title>
    <script src="https://cdn.jsdelivr.net/npm/echarts@6.0.0/dist/echarts.min.js"></script>
  </head>
  <body>
    <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
    <div id="main" style="width: 600px;height:400px;"></div>
    <script type="text/javascript">
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    </script>
  </body>
</html>
```



![](http://qiniu.huangyihui.cn/doc/202512242307996.png)



#### npm

安装依赖：`npm install echarts --save`

```vue
<template>
  <div>
    <div id="main" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    // 绘制图表
    myChart.setOption({
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    });
  },
};
</script>
```





#### 示例

##### 设置深色模式

```js
var myChart = echarts.init(document.getElementById("main"), 'dark');
```



##### 监听系统深色模式并改变图表主题

```js
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
function updateDarkMode() {
    const isDarkMode = darkModeMediaQuery.matches;
    for (const chart of charts) {
        chart.setTheme(isDarkMode ? 'dark' : 'default');
    }
}
darkModeMediaQuery.addEventListener('change', () => {
    updateDarkMode();
});
```



##### 监听图表容器的大小并改变图表大小

可以监听页面的 `resize` 事件获取浏览器大小改变的事件，然后调用 `echartsInstance.resize` 改变图表的大小。

```js
var myChart = echarts.init(document.getElementById('main'));
window.addEventListener("resize", function () {
  myChart.resize();
});
```



##### 事件和交互

文档：https://echarts.apache.org/zh/api.html#events

```js
// 基于准备好的dom，初始化ECharts实例
// var myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
var option = {
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
// 处理点击事件并且跳转到相应的百度搜索页面
myChart.on('click', function(params) {
  window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
});
```



所有的鼠标事件包含参数 `params`，这是一个包含点击图形的数据信息的对象，如下格式：

```typescript
type EventParams = {
  // 当前点击的图形元素所属的组件名称，
  // 其值如 'series'、'markLine'、'markPoint'、'timeLine' 等。
  componentType: string;
  // 系列类型。值可能为：'line'、'bar'、'pie' 等。当 componentType 为 'series' 时有意义。
  seriesType: string;
  // 系列在传入的 option.series 中的 index。当 componentType 为 'series' 时有意义。
  seriesIndex: number;
  // 系列名称。当 componentType 为 'series' 时有意义。
  seriesName: string;
  // 数据名，类目名
  name: string;
  // 数据在传入的 data 数组中的 index
  dataIndex: number;
  // 传入的原始数据项
  data: Object;
  // sankey、graph 等图表同时含有 nodeData 和 edgeData 两种 data，
  // dataType 的值会是 'node' 或者 'edge'，表示当前点击在 node 还是 edge 上。
  // 其他大部分图表中只有一种 data，dataType 无意义。
  dataType: string;
  // 传入的数据值
  value: number | Array;
  // 数据图形的颜色。当 componentType 为 'series' 时有意义。
  color: string;
};
```



##### 空数据

在 ECharts 中，我们使用字符串 `'-'` 表示空数据，这对其他系列的数据也是适用的。

```js
option = {
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      data: [0, 22, '-', 23, 19],
      type: 'line'
    }
  ]
};
```



##### loading 动画

ECharts 默认有提供了一个简单的加载动画。只需要调用 `showLoading` 方法显示。数据加载完成后再调用 `hideLoading` 方法隐藏加载动画。

```js
myChart.showLoading();
$.get('data.json').done(function (data) {
    myChart.hideLoading();
    myChart.setOption(...);
});
```



##### 异步加载和动态更新数据

`ECharts` 中实现异步数据的更新非常简单，在图表初始化后不管任何时候只要通过 jQuery 等工具异步获取数据后通过 `setOption` 填入数据和配置项就行。

ECharts 由数据驱动，数据的改变驱动图表展现的改变，因此动态数据的实现也变得异常简单。

所有数据的更新都通过 setOption实现，你只需要定时获取数据，setOption 填入数据，而不用考虑数据到底产生了哪些变化，ECharts 会找到两组数据之间的差异然后通过合适的动画去表现数据的变化。



```js
var myChart = echarts.init(document.getElementById('main'));

$.get('data.json').done(function(data) {
  // data 的结构:
  // {
  //     categories: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"],
  //     values: [5, 20, 36, 10, 10, 20]
  // }
  myChart.setOption({
    title: {
      text: '异步数据加载示例'
    },
    tooltip: {},
    legend: {},
    xAxis: {
      data: data.categories
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: data.values
      }
    ]
  });
});
```

或者先设置完其它的样式，显示一个空的直角坐标轴，然后获取数据后填入数据。

```js
var myChart = echarts.init(document.getElementById('main'));
// 显示标题，图例和空的坐标轴
myChart.setOption({
  title: {
    text: '异步数据加载示例'
  },
  tooltip: {},
  legend: {
    data: ['销量']
  },
  xAxis: {
    data: []
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: []
    }
  ]
});

// 异步加载数据
$.get('data.json').done(function(data) {
  // 填入数据
  myChart.setOption({
    xAxis: {
      data: data.categories
    },
    series: [
      {
        // 根据名字对应到相应的系列
        name: '销量',
        data: data.data
      }
    ]
  });
});
```

ECharts 中在更新数据的时候需要通过`name`属性对应到相应的系列，上面示例中如果`name`不存在也可以根据系列的顺序正常更新，但是更多时候推荐更新数据的时候加上系列的`name`数据。





### Vue ChartJS

vue-chartjs 是一个 Vue 对于 Chart.js 的封装，让用户可以在Vue中轻松使用Chart.js，很简单的创建可复用的图表组件，非常适合需要简单的图表并尽可能快地运行的人。vue-chartjs抽象了基本逻辑，同时也暴露了Chart.js对象，让用户获得最大的灵活性。它支持 Vue 3 和 Vue 2。

文档地址：https://github.com/apertureless/vue-chartjs



### Vue-ECharts

Vue-ECharts 是 Apache ECharts 的 Vue.js 组件。使用 Apache ECharts 5，同时支持 Vue.js 2/3。

文档地址：https://github.com/ecomfe/vue-echarts



### Trois

Trois 是一个基于 Three.JS 的 Vue 3 可视化库，它是一个流行的 WebGL 库。Three.JS 对桌面和移动设备都有很好的支持。该库允许我们使用 VueJS 组件轻松为网站创建 3D 效果。

文档地址：https://github.com/troisjs/trois



### ucharts

`uCharts`是一款基于`canvas API`开发的适用于所有前端应用的图表库，开发者编写一套代码，可运行到 Web、iOS、Android（基于 uni-app / taro ）、以及各种小程序（微信/支付宝/百度/头条/飞书/QQ/快手/钉钉/淘宝/京东/360）、快应用等更多支持 canvas API 的平台。

文档：https://www.ucharts.cn/v2/#/



### echarts-for-weixin

基于 Apache ECharts 的微信小程序图表库。

文档：https://github.com/ecomfe/echarts-for-weixin





## UI组件库

### Element-UI

Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库。

官网：https://element.eleme.cn/

vue2文档地址：https://github.com/ElemeFE/element

vue3文档地址：https://github.com/element-plus/element-plus



### Vuetify

Vuetify 是一个基于 Vue.js 精心打造 UI 组件库，整套 UI 设计为 Material 风格。能够让没有任何设计技能的开发者创造出时尚的 Material 风格界面。

文档地址：https://github.com/vuetifyjs/vuetify



### Vant

Vant 是一套轻量、可靠的移动端组件库。通过 Vant，可以快速搭建出风格统一的页面，提升开发效率，支持 Vue 2、Vue3。

文档地址：https://github.com/youzan/vant



### Vant Weapp

Vant 是一个**轻量、可靠的移动端组件库**，于 2017 年开源。

目前 Vant 官方提供了 [Vue 2 版本](https://vant-ui.github.io/vant/v2/)、[Vue 3 版本](https://vant-ui.github.io/vant/)和[微信小程序版本](https://vant-ui.github.io/vant-weapp/)，并由社区团队维护 [React 版本](https://github.com/3lang3/react-vant)和[支付宝小程序版本](https://github.com/ant-move/Vant-Aliapp)。

文档地址：https://vant-ui.github.io/vant-weapp



### Naive UI

Naive UI 是一款基于当前比较新的 Vue 3.0 ，JS/TS 技栈开发的前端 UI 组件库。

文档地址：https://github.com/TuSimple/naive-ui





## TODO 图标

### IconPark

IconPark 提供超过 2400 个高质量图标，还提供了每个图标的含义和来源的描述，便于开发者使用。除此之外，该网站还可以自定义图标，这是与其他图标网站与众不同的地方。该图标库是字节跳动旗下的技术驱动图标样式的开源图标库。

文档地址：https://github.com/bytedance/iconpark



### Ionicons

Ionicons 是一个完全开源的图标集，是知名混合开发框架 Ionic Framework 内置的图标库，包含 1300 个设计优雅、风格统一的高质量图标，能满足大多数的业务场景。

文档地址：https://github.com/ionic-team/ionicons



### Font Awesome

Font Awesome 提供了可缩放的矢量图标，可以使用CSS所提供的所有特性对它们进行更改，包括：大小、颜色、阴影或者其它任何支持的效果。

文档地址：https://github.com/FortAwesome/Font-Awesome



### Bootstrap Icons

Bootstrap Icons 是 Bootstrap 开源的 SVG 图标库。

文档地址：https://github.com/twbs/icons





## TODO 随机值

### Chance.js

Chance 是一个轻量级的 JavaScript 随机字符串生成器插件，可帮助减少编写单调的代码，特别是在编写自动化测试时经常需要各种随机内容。可以使用它来产生随机数、字符、字符串、名字、地址、骰子等。



### UUID

UUID 是一个用于在 JavaScript 中生成符合 RFC 的 UUID 的实用程序库。

https://github.com/uuidjs/uuid



### Nano ID

nanoid 是一个小巧、安全、URL友好、唯一的 JavaScript 字符串ID生成器。其具有以下特性：

- **小巧.** 130 bytes (已压缩和 gzipped)。没有依赖。Size Limit 控制大小。
- **快速.** 它比 UUID 快 60%。
- **安全.** 它使用加密的强随机 API。可在集群中使用。
- **紧凑.** 它使用比 UUID（A-Za-z0-9_-）更大的字母表。因此，ID 大小从36个符号减少到21个符号。
- **易用.** Nano ID 已被移植到 20种编程语言。



## 加密

### md5

一个 JavaScript 函数，用于使用 MD5 对消息进行哈希处理。

文档地址：https://www.npmjs.com/package/md5



### blueimp-md5

JavaScript MD5 实现。兼容服务器端环境，如 Node.js， 模块加载器，如 RequireJS 或 webpack 以及所有 Web 浏览器。

文档地址：https://www.npmjs.com/package/blueimp-md5



### js-md5

JavaScript 的简单快速的 MD5 哈希函数支持 UTF-8 编码。

文档地址：https://www.npmjs.com/package/js-md5



### crypto-js

加密标准的 JavaScript 库。

文档地址：https://github.com/brix/crypto-js



## 数字

### currency.js 金额

文档地址：https://github.com/scurker/currency.js

官网：https://currency.js.org/

使用

`注：示例版本 currency.js v2.0.4`

1、安装依赖

```sh
npm install currency.js -S
```



2、使用

* add() ：加
* subtract() ：减
* multiply() ：乘
* divide() ：除

```js
2.51 + .01;                   // 2.5199999999999996
currency(2.51).add(.01);      // 2.52

2.52 - .01;                   // 2.5100000000000002
currency(2.52).subtract(.01); // 2.51

currency(45.25).multiply(3);      // 135.75
currency(123.45).divide(2); 			// => "61.73"

// 需要.value 获取计算后的数字
currency(2.51).add(.01).value;
```



### Math.js

Math.js 是一个强大的 JavaScript 和 Node.js 数学库。它具有支持符号计算的灵活表达式解析器，带有大量内置函数和常量，并提供了一个集成的解决方案来处理不同的数据类型，如数字、大数、复数、分数、单位和矩阵。功能强大且易于使用。

文档地址：https://github.com/josdejong/mathjs



### Numeral.js

Numeral.js 是一个用来对数值进行操作和格式化的 JS 库。可将数字格式化为货币、百分比、时间，甚至是序数词的缩写（比如1st，100th）。

文档地址：https://github.com/adamwdraper/Numeral-js



### Accounting.js

Accounting.js 是一个用于数字、货币和货币解析/格式化的小型 JavaScript 库。它是轻量级的，完全可本地化的，没有依赖关系，并且在客户端或服务器端都可以很好地工作。

文档地址：https://github.com/openexchangerates/accounting.js





## 虚拟列表

传统的滚动列表组件在处理大数据量时可能会非常卡顿，甚至导致页面崩溃。通过将可视区域内和可见区域外的数据进行动态切换，虚拟列表可以极大地提升列表滚动的性能。



### vue-virtual-scroller

vue-virtual-scroller 是一个基于Vue.js的虚拟滚动列表组件，用于优化大数据量渲染时的性能。它可以在滚动时动态地加载和卸载列表项，从而减少页面的 DOM 元素数量，提高渲染效率，同时也能够提高用户体验。

文档地址：https://github.com/Akryum/vue-virtual-scroller



### vue-virtual-scroll-list

vue-virtual-scroll-list 是一个支持高性能滚动的 Vue 组件，可以用于处理包含大量数据项的列表。它能够根据当前视窗的大小，只渲染可见部分的数据项，并在滚动时动态更新列表内容，从而实现高效的渲染和滚动性能。

文档地址：https://github.com/tangbc/vue-virtual-scroll-list





## 可视化大屏

### DataV

DataV是一个基于Vue的数据可视化组件库，Vue数据可视化组件库（类似阿里DataV，大屏数据展示），提供SVG的边框及装饰、图表、水位图、飞线图等组件，简单易用，长期更新。

文档地址：https://github.com/DataV-Team/DataV



### iDataV

大屏数据可视化案例。包含了很多现成的模板，可在这些不同风格的模板基础上快速开始一个可视化大屏项目。

文档地址：https://github.com/yyhsong/iDataV



### vue-big-screen

一个基于 Vue、Datav、Echart 框架的 " **数据大屏项目** "，通过 Vue 组件实现数据动态刷新渲染，内部图表可实现自由替换。部分图表使用 DataV 自带组件，可进行更改。

文档地址：https://gitee.com/MTrun/big-screen-vue-datav



### DataEase

DataEase 是开源的数据可视化分析工具，帮助用户快速分析数据并洞察业务趋势，从而实现业务的改进与优化。DataEase 支持丰富的数据源连接，能够通过拖拉拽方式快速制作图表，并可以方便的与他人分享。

文档地址：https://github.com/dataease/dataease





## Canvas

### signature_pad

Signature Pad 是一个基于 Canvas 实现的签名库，用于绘制签名。它可以在所有现代桌面和移动浏览器中使用，不依赖于任何外部库。Signature Pad提供了许多可自定义的选项，如笔画颜色、粗细、背景色、画布大小、签名格式等，可以轻松实现不同的签名风格和功能。

文档地址：https://github.com/szimek/signature_pad



### lucky-canvas 抽奖插件

lucky-canvas 是一套基于 TS + Canvas 开发的【大转盘 / 九宫格 / 老虎机】抽奖插件，一套源码适配多端框架 JS / Vue / React / Taro / UniApp / 微信小程序等，奖品 / 文字 / 图片 / 颜色 / 按钮均可配置，支持同步 / 异步抽奖，概率前 / 后端可控，自动根据 dpr 调整清晰度适配移动端。

文档地址：https://github.com/buuing/lucky-canvas



### Luckysheet

Luckysheet 是一个纯前端基于 Canvas 的类似 excel 的在线表格，功能强大、配置简单、完全开源。

文档地址：https://github.com/dream-num/Luckysheet



### Konva.js

像操作DOM一样，操作canvas。

Konva.js提供了一个类似于DOM操作的API，使你可以创建、添加、删除和修改Canvas上的图形元素，就像操作HTML元素一样简单。你可以使用Konva.js来创建各种图形，如矩形、圆形、线条、文本等，并对它们进行位置、大小、颜色等属性的设置。

文档地址：https://github.com/konvajs/konva



### fabric.js

Fabric.js是一个用于创建交互式的HTML5 Canvas应用程序的JavaScript库。它提供了一个简单而强大的API，用于在Web浏览器中绘制和操作图形对象。Fabric.js可以用于创建各种图形应用程序，例如绘图编辑器、图像编辑器、流程图、地图和数据可视化等。

文档地址：https://github.com/fabricjs/fabric.js



## TODO 快捷键

### Mousetrap

Mousetrap 提供了一种简单的方式来捕获键盘输入，用于创建键盘快捷键等交互式功能。

文档地址：https://www.npmjs.com/package/mousetrap



### hotkeys-js

Hotkeys 是一个用于在 Web 应用中设置和管理键盘快捷键的 JavaScript 库。

文档地址：https://www.npmjs.com/package/hotkeys-js



### Tinykeys

Tinykeys 是一个在Web应用中设置和管理键盘快捷键的JavaScript库，它比Hotkeys更加轻量级和易于使用。

文档地址：https://www.npmjs.com/package/tinykeys



### ninja-keys

Ninja Keys 是一个可以集成到网站中的键盘快捷键 UI 组件，用户会按下 ⌘+k（或 ctrl+k） 打开搜索 UI 界面。

文档地址：https://www.npmjs.com/package/ninja-keys



## Cookie

### js-cookie

Js Cookie 是一个简单、轻量级的 JavaScript API，用于处理浏览器 cookie。其支持 AMD、CommonJS 和 ES 模块、没有依赖关系、经过彻底测试、支持自定义编码和解码、通用浏览器支持。

文档地址：https://www.npmjs.com/package/js-cookie

使用

`注：示例版本 v` 用于处理浏览器 cookie。

1、安装依赖

```sh
npm install js-cookie -S
```



2、使用

```js
// 设置 Cookie
Cookies.set('cookie-name', 'cookie-value', { expires: 14})

// 读取 Cookie
Cookies.get('cookie-name')

// 删除 Cookie
Cookies.remove('cookie-name')
```



### cookie

Cookies 是用于 HTTP cookie 配置的流行 NodeJS 模块之一。可以轻松地将其与内置的 NodeJS HTTP 库集成或将其用作 Express 中间件。它允许使用 Keygrip 对 cookie 进行签名以防止篡改、支持延迟 cookie 验证、不允许通过不安全的套接字发送安全 cookie、允许其他库在不知道签名机制的情况下访问 cookie。

文档地址：https://www.npmjs.com/package/cookie

使用

`注：示例版本 v` nodejs

1、安装依赖

```sh
npm install cookie -S
```



2、使用

```js
const cookie = require('cookie');
cookies = new Cookies( request, response, [ options ] )

// 读取 cookies
cookies.get( name, [ options ] )

// 设置 cookies
cookies.set( name, [ value ], [ options ] )
```



## TODO 工具库

### Lodash

Lodash是一个一致性、模块化、高性能、提高开发者效率的JavaScript 实用工具库。Lodash 通过降低 array、number、objects、string 等等的使用难度从而让 JavaScript 变得更简单。





## TODO 文档

### VitePress

VitePress 是 VuePress 的继承者，建立在vite 之上。

文档地址：https://github.com/vuejs/vitepress



### VuePress

VuePress 是一个基于 Vue 的轻量级静态网站生成器，以及为编写技术文档而优化的默认主题。

文档地址：https://github.com/vuepress/vuepress-next



### Gridsome

Gridsome 是一个基于 Vue.js 构建的 Jamstack 框架，它让开发人员可以轻松地构建静态生成的网站和应用程序，这些网站和应用程序天生速度快。

文档地址：https://github.com/gridsome/gridsome



## TODO 动画

### Animate.css

animate.css 是一个使用CSS3的animation制作的动画效果的CSS集合，里面预设了很多种常用的动画，且使用非常简单。

文档地址：https://github.com/animate-css/animate.css

官网：https://animate.style/



### wow.js

WOW.js 是一款帮助你实现滚动页面时触发CSS 动画效果的插件。它依赖 animate.css，所以它支持 animate.css 多达 60 多种的动画效果，可以改变动画设置喜欢的风格、延迟、长度、偏移和迭代等，能满足各种需求。

文档地址：https://github.com/graingert/wow



#### 引入文件方式

如果使用 animate 4x 版本，class 名需要带前缀（默认为animate__）。

animate 也提供完全不带前缀的文件 `animate.compat.css`，和 3x 版本使用一样。

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.compat.css"  />

<script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js" ></script>

<script>new WOW().init();</script>
```

```html
<div class="wow slideInLeft"></div>
<div class="wow animate__slideInLeft"></div>
```



#### npm 方式

```sh
npm install wowjs -S
```

```vue
<template>
  <div>
    <!-- npm 方式需要加 data-wow-duration 才会有效果 -->
    <div class="wow animate__bounce" data-wow-duration="1s"></div>
  </div>
</template>

<script>
import { WOW } from "wowjs"

// 可以在 main.js 中全局引入
import "animate.css"

// 如果使用 animate 4x 版本，class 名需要带前缀（默认为animate__）。
// 要不加 animate__ 前缀，则需要引入 animate.compat.css
// import "animate.css/animate.compat.css"

export default {
  mounted() {
    let wow = new WOW({
      live: false,
    })
    wow.init()
  },
}
</script>
```



#### 配置

* `data-wow-duration` ：动画持续时间
* `data-wow-delay` ：动画开始之前的延迟
* `data-wow-offset` ：元素的位置露出后距离底部多少像素执行（与浏览器底部有关）
* `data-wow-iteration` ：动画重复的次数

```vue
<div class="wow animate__bounce" data-wow-duration="2s" data-wow-delay="3s" data-wow-iteration="2" data-wow-offset="0" ></div>
```





* `boxClass` ：动画元素CSS类（默认为wow）
* `animateClass` ：触发 CSS 动画的类名（animate.css 库默认为 “animated”）。
* `offset` ：定义浏览器视口底部与隐藏框顶部之间的距离。也就是触发动画时到元素的距离（默认为 0）
* `mobile` ：在移动设备上触发动画（默认为 true）
* `live` ：在非同步加载的内容上作用（默认为 true）

```js
let wow = new WOW({
  boxClass: "wow",
  animateClass: "animated",
  offset: 0,
  mobile: true,
  live: true,
  callback: function (box) {
    // 每次启动动画时都会触发回调
    // 传递的参数是被动画化的DOM节点
  },
  scrollContainer: null, // 可选的滚动容器选择器，否则使用窗口 window
})
wow.init()
```



#### 手动实现

```vue
<template>
  <div>
    <div class="space"></div>
    <div class="box animate-on-scroll fadeIn">这是需要淡入的元素</div>
    <div class="space"></div>
    <div class="box animate-on-scroll fadeIn">另一个元素</div>
    <div class="space"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    // 获取要应用动画效果的元素
    const elements = document.querySelectorAll(".animate-on-scroll")

    // 创建一个Intersection Observer实例
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 元素进入视口后，添加visible类
            entry.target.classList.add("visible")
            // 如果只需要触发一次动画，可以取消观察
            observer.unobserve(entry.target)
          }
        })
      },
      {
        root: null, // 默认是视口
        threshold: 0.1, // 元素进入视口的比例达到0.1时触发
      }
    )

    // 开始观察所有目标元素
    elements.forEach((element) => {
      observer.observe(element)
    })
  },
}
</script>

<style>
.box {
  width: 300px;
  height: 300px;
  background: red;
}
.space {
  height: 100vh;
}

/* 动画定义 */
.fadeIn {
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.fadeIn.visible {
  opacity: 1;
}
</style>
```



### aos

在滚动库上制作动画。同 wow.js 。

文档：https://github.com/michalsnik/aos

示例网站：https://www.sparklink.org.cn/



### ScrollMagic

用于神奇卷轴交互的 javascript 库。

文档地址：https://github.com/janpaepke/ScrollMagic





### GSAP

GreenSock是一个JavaScript动画库，可轻松对HTML元素进行动画处理。用于创建高性能，零依赖性，跨浏览器动画。

文档地址：https://gsap.com/



### anime

js 动画引擎。

文档地址：https://github.com/juliangarnier/anime/



### Barba.js

Barba.js是一个小（4kb的压缩和压缩），灵活和无依赖的库，可以帮助您创建流畅和平滑的过渡网站的页面。它可以减少页面之间的延迟，最大限度地减少浏览器HTTP请求并增强用户的Web体验。

文档地址：https://github.com/barbajs/barba



### Hover.css

Hover.css 是一套基于 CSS3 的鼠标悬停效果和动画，这些可以非常轻松的被应用到按钮、LOGO 以及图片等元素。所有这些效果都是只需要单一的标签，必要的时候使用 before 和 after 伪元素。

文档地址：https://github.com/IanLunn/Hover



### Popmotion

Popmotion 是一个只有12KB的 JavaScript 运动引擎，可以用来实现动画，物理效果和输入跟踪。原生的DOM支持：CSS，SVG，SVG路径和DOM属性的支持，开箱即用。

文档地址：https://github.com/Popmotion/popmotion



### Vivus

Vivus 是一个轻量级的 JavaScript 库（没有依赖项），它允许我们对 SVG 进行动画处理，使它们看起来像是被绘制的。它有多种不同的动画可用，以及创建自定义脚本的选项，以喜欢的任何方式绘制 SVG。

文档地址：https://github.com/maxwellito/vivus



### Particles.js

Particles.js 一个轻量级的JavaScript库，用来在网页上创建颗粒效果。

文档地址：https://github.com/VincentGarreau/particles.js/



### three.js

three.js 是一个易于使用、轻量级、跨浏览器的通用 JavaScript 3D 库，它是一套基于WebGL 开发出的Javascript 函式库，它提供了比 WebGL 更简单的Javascript API，让开发者能够轻易在浏览器制作 3D 绘图。

文档地址：https://github.com/mrdoob/three.js/



## CSS

### bulma

Bulma 是一个基于 Flexbox 的现代 CSS 框架 。

文档地址：https://github.com/jgthms/bulma



### SpinKit loading指示器

使用 CSS 动画的加载指示器的集合

文档地址：https://github.com/tobiasahlin/SpinKit



## 布局

### fullPage.js

一个简单易用的库，可以创建全屏滚动网站，并在网站的各个部分中添加横向滑块。

文档地址：https://github.com/alvarotrigo/fullPage.js



### Vue Grid Layout

vue-grid-layout 是一个网格布局系统，类似于 Gridster，用于 Vue.js。设置的 grid 元素可以任意拖动摆放。

文档地址：https://github.com/jbaysolutions/vue-grid-layout



## 国际化

### vue-i18n

Vue I18n 是 Vue.js 的国际化插件。它可以轻松地将一些本地化功能集成到 Vue.js 应用中。

在 vue-i18n 中，可以通过简单的 API 将国际化引入应用中；除了简单的翻译，它还支持复数、数字、日期时间等本地化；除此之外，还可以在单个文件组件上管理语言环境。

vue-i18n V8 版本适合 vue2，V9 及以上版本适合 vue3。

i18n（其来源是英文单词 internationalization的首末字符i和n，18为中间的字符数）是“国际化”的简称。

文档地址：https://github.com/kazupon/vue-i18n

中文文档：https://kazupon.github.io/vue-i18n/zh/



使用

`注：示例版本 vue-i18n v9.10.2`

1、安装依赖

```sh
npm install vue-i18n -S
npm i vue-i18n@8 -S
```



2、使用

```js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

// 准备翻译的语言环境信息
const messages = {
  en: {
    message: {
      hello: 'hello world'
    }
  },
  ja: {
    message: {
      hello: 'こんにちは、世界'
    }
  }
}

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  locale: 'ja', // 设置地区
  messages, // 设置地区信息
})


// 通过 `i18n` 选项创建 Vue 实例
new Vue({ i18n }).$mount('#app')
```

```html
<!-- 以 $t() 或者 v-t 指令 的方式来使用 -->
<div id="app">
  <p>{{ $t("message.hello") }}</p>
  <div v-t="'message.userName'"></div>

  <!-- 在element-ui 中使用 -->
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" :label="$t('message.date')" width="180">
    </el-table-column>
    <el-table-column prop="name" :label="$t('message.name')" width="180">
    </el-table-column>
    <el-table-column prop="address" :label="$t('message.address')">
    </el-table-column>
  </el-table>
</div>
```



3、常用 API

```js
// 全局更改语言环境
this.$root.$i18n.locale = 'ja'
```

```vue
<template>
  <div>
    <el-dropdown @command="changeLangs" trigger="click">
      <span class="el-dropdown-link">
        选择语言<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="zh">中文</el-dropdown-item>
        <el-dropdown-item command="en">english</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  methods: {
    changeLangs(e) {
      localStorage.setItem('lang', e)
      // 通过 this.$i18n.locale 设置不同的语言。
      this.$i18n.locale = e
    }
  }
}
</script>
```



4、封装 i18n

添加相关配置文件：在 src 目录下创建 `i18n` 文件夹，并创建一个 `language` 文件夹存放语言文件。

```js
// i18n/index.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

import zh from './language/zh'
import en from './language/en'

const messages = {
	zh,
	en
}

const i18n = new VueI18n({
	locale: 'zh', // 设置地区
	messages, // 设置地区信息
})

export default i18n
```

```js
// i18n/language/zh.js
export default {
	message: {
		hello: '你好世界'
	},
	opt: {
		delete: '删除'
	}
}
```

```js
// main.js
import Vue from 'vue'
import i18n from './i18n/index.js'

new Vue({ i18n }).$mount('#app')
```



#### 插入动态值

```vue
<template>
  <div>
    <!-- 命名占位符 在双花括号中直接使用 -->
    <p>{{ $t('common.gotIt', { name: userName }) }}</p>
      
    <!-- 列表占位符，注意是用 [] -->
    <p>{{ $t('common.welcome', [count]) }}</p>
    
    <!-- 多个占位符 -->
    <p>{{ $t('common.message', {name: 'John', count: 5, date: '2023-10-01'}) }}</p>
    
    <!-- 在属性中使用 -->
    <button :title="$t('common.itemsSelected', { count: itemCount })">
      {{ $t('button.submit') }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: '张三',
      itemCount: 5,
      count: 10
    }
  }
}
</script>
```

```json
{
  "common": {
    "gotIt": "明白了，{name}！",
    "itemsSelected": "已选择 {count} 个项目",
    "welcome": "欢迎，{0}！",
    "message": "Hello {name}, you have {count} new messages since {date}"
  }
}
```



### i18next

i18next 是一个用 JavaScript 编写的国际化框架**。**它不仅仅提供标准的 i18n 功能，例如（复数、上下文、插值、格式）。它提供了一个完整的解决方案，可以将产品从 Web 本地化到移动和桌面。支持多种框架。

文档地址：https://github.com/i18next/i18next



### rtlcss

RTLCSS 是一个用于将从左到右 （LTR） 级联样式表 （CSS） 转换为从右到左 （RTL） 的框架。用于阿拉伯语等文字从右往左写。

文档地址：https://github.com/MohammadYounes/rtlcss



## TODO 新手指引

### Intro.js

Intro.js 是一个使用广泛的产品引导库。

文档地址：https://github.com/usablica/intro.js



### Vue Tour

Vue Tour 是一个轻量级、简单且可定制的导览插件，可与 Vue.js 一起使用。它提供了一种快速简便的方法来指导用户完成你的应用程序。

文档地址：https://github.com/pulsardev/vue-tour



### shepherd

支持在多个前端框架中开箱即用。

文档地址：https://github.com/shepherd-pro/shepherd



## 富文本编辑器

### wangEditor

基于JavaScript和css开发的 Web富文本编辑器， 轻量、简洁、界面美观、易用、开源免费。

文档：https://www.wangeditor.com/

文档地址：https://github.com/wangeditor-team/wangEditor



### Editor.md

功能非常丰富的编辑器，左端编辑，右端预览，非常方便，完全免费。中文文档。

文档地址：https://github.com/pandao/editor.md



### Tiptap

Tiptap 是一个基于 Vue 的无渲染的富文本编辑器，它基于 Prosemirror，完全可扩展且无渲染。可以轻松地将自定义节点添加为Vue组件。使用无渲染组件（函数式组件），几乎完全控制标记和样式。菜单的外观或在DOM中的显示位置。这完全取决于使用者。

文档地址：https://github.com/ueberdosis/tiptap



### Quill.js

Quill.js 是一个具有跨平台和跨浏览器支持的富文本编辑器。凭借其可扩展架构和富有表现力的 API，可以完全自定义它以满足个性化的需求。

文档地址：https://github.com/quilljs/quill/



### simditor

simditor是Tower平台使用的富文本编辑器，是一款轻量化的编辑器，界面简约，功能实用，插件不是很多，功能要求不高的可以使用。

虽然是国内出品，但文档是英文的。开源免费。

文档地址：https://github.com/mycolorway/simditor



### jodit

Jodit是一款使用纯TypeScript编写的（无需使用其他库），美观实用的所见即所得（WYSIWYG）开源富文本编辑器，支持中文，超强自定义。 

文档地址：https://github.com/xdan/jodit



### summernote

summernote是一款轻量级的富文本编辑器，比较容易上手，使用体验流畅，支持各种主流浏览器。

summernote开源免费，该项目一直比较活跃，一直都有人在维护。summernote同样依赖于jquery和bootstrap，使用前先引入这两项。

文档地址：https://github.com/summernote/summernote/



### TinyMCE（有收费）

TinyMCE 是一个热门的富文本编辑器。它的目标是帮助其他开发人员构建精美的 Web 内容解决方案。它易于集成，可以部署在基于云的、自托管或混合环境中。该设置使得合并诸如 Angular、React 和 Vue 等框架成为可能。它还可以使用 50 多个插件进行扩展，每个插件都有 100 多个自定义选项。

TinyMCE是一个轻量级的基于浏览器的所见即所得编辑器，由JavaScript写成。它对IE6+和Firefox1.5+都有着非常良好的支持。

功能齐全，界面美观，就是文档是英文的，对开发人员英文水平有一定要求。

文档地址：https://github.com/tinymce/tinymce



### CKEditor 5（有收费）

CKEditor 是一个强大的富文本编辑器框架，具有模块化架构、现代集成和协作编辑等功能。它可以通过基于插件的架构进行扩展，从而可以将必要的内容处理功能引入。它是在 ES6 中从头开始编写的，并且具有出色的 webpack支持。可以使用与Angular、React和Vue.js的原生集成。

文档地址：https://github.com/ckeditor/ckeditor5



### 百度ueditor

UEditor是由百度web前端研发部开发所见即所得富文本web编辑器，具有轻量，功能齐全，可定制，注重用户体验等特点，开源基于MIT协议，允许自由使用和修改代码，缺点是已经没有更新了。

文档：https://github.com/fex-team/ueditor



## TODO 安全渲染 HTML 字符串

### DOMPurify

DOMPurify 是一个开源的基于DOM的快速XSS净化工具。输入HTML元素，然后通过DOM解析递归元素节点，进行净化，输出安全的HTML。

文档地址：https://github.com/cure53/DOMPurify



### js-xss

js-xss是一个JavaScript库，用于防御和过滤跨站脚本攻击（XSS）。它提供了一组方法和函数，可以净化和转义用户输入的HTML内容，以确保在浏览器环境中呈现的HTML是安全的。

文档地址：https://github.com/leizongmin/js-xss



## 调试

### vConsole

文档地址：https://github.com/Tencent/vConsole

使用

`注：示例版本 vConsole v3.15.1`

1、安装依赖

```sh
npm install vconsole -S
```



2、使用

```js
import VConsole from 'vconsole';
const vConsole = new VConsole();
```





### babel-plugin-transform-remove-console

用于移除 console 输出。

文档地址：https://www.npmjs.com/package/babel-plugin-transform-remove-console

使用

`注：示例版本 babel-plugin-transform-remove-console v6.9.4`

1、安装依赖

```sh
npm install babel-plugin-transform-remove-console -D
```



2、配置 `babel.config.js` 文件

```js
const plugins = []
// 生产环境移除console
if(process.env.NODE_ENV === 'production') {
  plugins.push("transform-remove-console")
}

module.exports = {
  plugins: [
    ...plugins
  ],
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
```



### PageSpy

**PageSpy** 是一款用于调试 Web、小程序、HarmonyOS 等平台的项目的工具。

一个 Web 应用的记录并回放用户操作的工具，用来远程调试。

文档：https://www.pagespy.org



服务端：

```sh
npm install -g @huolala-tech/page-spy-api@latest

# 运行
page-spy-api

# 运行-设置跨域
page-spy-api --allow-origins "*"
```



web端：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <title>App</title>

    <!-- 使用第一步：引入 SDK 文件 -->
     <!-- 这里的地址是服务端跑起来后的LAN地址 -->
    <script crossorigin="anonymous" src="http://192.168.17.231:6752/page-spy/index.min.js"></script>
    <script crossorigin="anonymous" src="http://192.168.17.231:6752/plugin/data-harbor/index.min.js"></script>
    <script crossorigin="anonymous" src="http://192.168.17.231:6752/plugin/rrweb/index.min.js"></script>
    <!-- 使用第二步：实例化 PageSpy -->
    <script>
      window.$harbor = new DataHarborPlugin();
      window.$rrweb = new RRWebPlugin();
      [window.$harbor, window.$rrweb].forEach((p) => {
        PageSpy.registerPlugin(p);
      });

      // 实例化的参数是可选的（通过 ESM 方式使用时，必须填写 api 和 clientOrigin）
      window.$pageSpy = new PageSpy({
        project: "演示",
        autoRender: true,
        title: "PageSpy",
      });
      // PageSpy 应该已经在屏幕右下角等你了，赶紧试试吧！👉

      setTimeout(()=> {
        console.log('ass')
      }, 1000)

      setInterval(()=> {
        console.log('num:', Math.random());
      }, 1000)
    </script>
  </head>

  <body>
    <h1>hello</h1>
    <!-- <noscript> You need to enable JavaScript to run this app. </noscript> -->
    <div id="root"></div>
  </body>
</html>
```



## SSR 服务端渲染

### Nuxt

Nuxt 是一个构建于 Vue 生态系统之上的全栈框架，它为编写 Vue SSR 应用提供了丝滑的开发体验。更棒的是，你还可以把它当作一个静态站点生成器来用！

文档地址：https://github.com/nuxt/nuxt



### Quasar

Quasar 是一个基于 Vue 的完整解决方案，它可以让你用同一套代码库构建不同目标的应用，如 SPA、SSR、PWA、移动端应用、桌面端应用以及浏览器插件。除此之外，它还提供了一整套 Material Design 风格的组件库。

文档地址：https://github.com/quasarframework/quasar



### whistle

Whistle 是基于 Node.JS 实现的操作简单、功能强大的跨平台抓包调试工具，可作为 **HTTP 代理（默认）**、**HTTPS 代理**、**Socks 代理**、**反向代理**等，用于**抓包分析**或**通过配置规则修改** HTTP、HTTPS、HTTP/2、WebSocket、TCP 请求，且内置 **Weinre**、**Log** 、**Composer** 等工具可查看远程页面的 DOM 结构、查看 console 输出内容、重放编辑构造请求等，并支持 **插件扩展功能** 或 **作为 NPM 包被项目引用**。

文档地址：https://github.com/avwo/whistle

参考链接：https://mp.weixin.qq.com/s/vAa-dnPMDpG6r1fC0dcYnw



## TODO 测试

### Vitest

Vitest 是一个由 Vite 提供支持的极速单元测试框架。其和 Vite 的配置、转换器、解析器和插件保持一致，具有开箱即用的 TypeScript / JSX 支持。

文档地址：https://github.com/vitest-dev/vitest



### Cypress

对在浏览器中运行的任何内容进行快速、简单和可靠的测试。推荐用于 E2E 测试。

文档地址：https://github.com/cypress-io/cypress



### Jest

Jest 是一个全面的 JavaScript 测试解决方案，专注于简洁明快。适用于大多数 JavaScript 项目。

文档地址：https://github.com/facebook/jest



### Mocha

mocha是一个功能丰富的javascript测试框架，运行在node.js和浏览器中，使异步测试变得简单有趣。Mocha测试连续运行，允许灵活和准确的报告，同时将未捕获的异常映射到正确的测试用例。

文档地址：https://github.com/mochajs/mocha





## 移动端

### hammer.js

一个检测触摸手势的JavaScript库，例如：轻按、双击、轻按、滑动等。最后更新在 2019。

文档地址：https://github.com/hammerjs/hammer.js



## Socket

Socket.IO 可实现基于事件的实时双向通信。它包括：Node.js服务器（此存储库）、浏览器的Javascript客户端库（或Node.js客户端）。

文档地址：https://github.com/socketio/socket.io



## UI功能库

### vueuse

适用于 Vue 2 和 3 的基本 Vue Composition 实用程序集合。

文档地址：https://github.com/vueuse/vueuse



### fake-progress

使用指数进度函数伪造进度条。可以用来实现某个操作当前进度的进度条。

文档地址：https://github.com/piercus/fake-progress



### 相册预览 vue-tinder

VueTinder 是一款能帮助你快速实现 Tinder 、 探探 等类似 APP 主要功能的 Vue 组件。滑动卡片组件。

文档地址：https://github.com/shanlh/vue-tinder



### better-scroll 滚动插件

BetterScroll 是一款旨在解决移动端滚动问题的插件（已支持 PC）。 其核心灵感来自 iscroll 的实现，因此 BetterScroll 的 API 与 iscroll 完全兼容。 此外，BetterScroll 还在 iscroll 的基础上扩展了一些功能并优化了性能。 BetterScroll 是用纯 JavaScript 实现的，这意味着它没有依赖性。

文档地址：https://github.com/ustbhuangyi/better-scroll



```sh
npm install @better-scroll/core --save
```

```vue
<template>
  <div class="horizontal-container">
    <div class="scroll-wrapper" ref="scroll">
      <div class="scroll-content">
        <div class="scroll-item" v-for="(item, index) in emojis" :key="index">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'

export default {
  data () {
    return {
      emojis: [
        '👉🏼 😁 😂 🤣 👈🏼',
        '😄 😅 😆 😉 😊',
        '😫 😴 😌 😛 😜',
        '👆🏻 😒 😓 😔 👇🏻',
        '😑 😶 🙄 😏 😣',
        '😞 😟 😤 😢 😭',
        '🤑 😲 ☹️ 🙁 😖',
        '👍 👎 👊 ✊ 🤛',
        '☝️ ✋ 🤚 🖐 🖖',
        '👍🏼 👎🏼 👊🏼 ✊🏼 🤛🏼',
        '☝🏽 ✋🏽 🤚🏽 🖐🏽 🖖🏽',
        '🌖 🌗 🌘 🌑 🌒'
      ]
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.bs.destroy()
  },
  methods: {
    init() {
      this.bs = new BScroll(this.$refs.scroll, {
        scrollX: true,
        probeType: 3 // listening scroll event
      })
      this.bs.on('scrollStart', () => {
        console.log('scrollStart-')
      })
      this.bs.on('scroll', ({ y }) => {
        console.log('scrolling-')
      })
      this.bs.on('scrollEnd', () => {
        console.log('scrollingEnd')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.horizontal-container .scroll-wrapper {
  position: relative;
  width: 90%;
  margin: 80px auto;
  white-space: nowrap;
  border: 3px solid #42b983;
  border-radius: 5px;
  overflow: hidden;
}
.horizontal-container .scroll-wrapper .scroll-content {
  display: inline-block;
}
.horizontal-container .scroll-wrapper .scroll-item {
  height: 50px;
  line-height: 50px;
  font-size: 24px;
  display: inline-block;
  text-align: center;
  padding: 0 10px;
}
</style>
```



BetterScroll 实现横向滚动，对 CSS 是比较苛刻的。首先你要保证 wrapper 不换行，并且 content 的 display 是 inline-block。

```css
.scroll-wrapper
  // ...
  white-space nowrap
.scroll-content
  // ...
  display inline-block
```





### floating-ui

一个用于定位浮动元素并为其创建交互的 JavaScript 库。原来是 popper.js 。

文档地址：https://github.com/floating-ui/floating-ui



### clickoutside

检测被监听元素的外部被点击。可以用于关闭弹窗等功能。可以以指令方式使用 `v-clickoutside` 。

文档地址：https://github.com/ElemeFE/element/blob/dev/src/utils/clickoutside.js



### vue-clickaway

有的时候，我们需要在用户点击元素之外的时候触发一个事件。最常见的用例是当你想通过点击关闭一个下拉框或对话框时。这是一个必不可少的包，几乎在我构建的每个应用中都会用到。

文档：https://github.com/simplesmiler/vue-clickaway



### vue-toastification

你有很多toast和类似通知的选择，但我是Maronato的vue-toastification的忠实粉丝。它提供了大量的选项来覆盖你的大部分边界情况，而且样式和动画导致了出色的用户体验，远远超过其他软件包。

文档：https://github.com/Maronato/vue-toastification



### vue2-datepicker

它的风格简单，提供了广泛的选择日期和日期范围的选项，并被包装在一个光滑和用户友好的UI中。它甚至支持i18n语言和日期格式的本地化。

文档：https://github.com/mengxiong10/vue2-datepicker



### vue-star-rating

 一个简单、高度可定制的 Vue 2.x. / 3.x 星级评分组件

文档：https://github.com/craigh411/vue-star-rating



### Pikaday 日期选择器

Pikaday 是一个日期选择器，无依赖、轻量（5k）、CSS模块化，样式也很简约。

文档：https://github.com/Pikaday/Pikaday



### party.js 点击粒子动画

party.js 还蛮有意思的，你们应该见过很多博客网站，鼠标点击或拖动时会有很多炫酷的动效，这个库就是做这个的，你可以轻松地实现那些效果。

文档：https://github.com/yiliansource/party-js



### floating-ui

一个用于定位浮动元素并为其创建交互的 JavaScript 库。

文档：https://github.com/floating-ui/floating-ui



### highlight.js

Highlight.js 是用 JavaScript 编写的语法高亮工具。它可以在浏览器中工作，也可以在服务器上工作。它几乎可以处理任何标记，不依赖于任何其他框架，并且具有自动语言检测功能。

文档：https://github.com/highlightjs/highlight.js



### Prism

Prism 是一个轻量级、健壮且优雅的语法高亮库。

文档：https://github.com/PrismJS/prism/



### sweetalert2 弹窗

用于 JavaScript 的弹出框。零依赖关系。

文档：https://github.com/sweetalert2/sweetalert2





## 地图

### 高德地图

开放平台：https://lbs.amap.com/

示例：https://lbs.amap.com/demo/list/js-api-v2

高德地图轨迹回放：https://www.jianshu.com/p/714eb1d37873



### 百度地图

开放平台: https://lbsyun.baidu.com/

`vue-baidu-map` 插件: https://github.com/Dafrok/vue-baidu-map



1. 安装依赖 `npm install vue-baidu-map --save`

2. 注册组件

   ```js
   import Vue from 'vue'
   import BaiduMap from 'vue-baidu-map'
   
   Vue.use(BaiduMap, {
     // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
     ak: 'YOUR_APP_KEY'
   })
   ```

   

3. 使用组件

   ```html
   <template>
     <div class="home">
       <!-- 使用方式1：通过组件中的@ready事件设置定位的经纬度 -->
       <baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="handler"></baidu-map>
       <!-- 使用方式2：通过组件的center属性直接设置定位的名字 -->
       <baidu-map class="bm-view" center="广州"></baidu-map>
     </div>
   </template>
   
   <script>
   
   export default {
     data () {
       return {
         center: {lng: 0, lat: 0},
         zoom: 3
       }
     },
     methods: {
       handler ({BMap, map}) {
         console.log(BMap, map)
         this.center.lng = 113.96995
         this.center.lat = 22.53662
         this.zoom = 15
       }
     }
   };
   </script>
   
   <style>
   /* BaiduMap 组件容器本身是一个空的块级元素，如果容器不定义高度，百度地图将渲染在一个高度为 0 不可见的容器内 */
   .bm-view {
     width: 100%;
     height: 300px;
   }
   </style>
   ```

   



### 腾讯地图

开放平台: https://lbs.qq.com/



1. 下载SDK，并将SDK导入项目中

2. 引入SDK核心类，并使用

   ```js
   import QQMapWX from '../static/qqmap-wx-jssdk.js'
   
   let qqmapsdk = new QQMapWX({
     key: '6COBZ-SGZ6O-C6SW5-SSBV5-Q5ML5-73F4X'
   })
   ```






```js
// 坐标转地址
qqmapsdk.reverseGeocoder({
  location:{
    longitude: res.longitude,		// 经度
    latitude: res.latitude			// 纬度
  },
  success(res){
    console.log(res)
  }
})
```



### MapBox

官网：https://www.mapbox.com/

示例：https://docs.mapbox.com/mapbox-gl-js/example/

文档：https://github.com/mapbox/mapbox-gl-js



### leafletjs

官网：https://leafletjs.com/

Leaflet.draw 交互绘制：https://blog.csdn.net/sinat_31213021/article/details/119735922





## 其他

### live-server

这是具有实时重新加载功能的小型开发服务器。使用它来破解您的 HTML/JavaScript/CSS 文件，但不能用于部署最终网站。

文档地址：https://github.com/tapio/live-server



```sh
npm install -g live-server

# 在dist目录下
live-server --port=3001
```



### pinyin-pro 汉字转拼音

pinyin-pro 是一个专业的 js 汉字拼音转换库，功能丰富、准确率高、性能优异。

文档地址：https://github.com/zh-lx/pinyin-pro



### pinyin

🇨🇳 汉字拼音 ➜ hàn zì pīn yīn

文档：https://github.com/hotoo/pinyin



### MallChatWeb

mallchat的前端项目，是一个既能购物又能聊天的电商系统。以互联网企业级开发规范的要求来实现它，电商该有的购物车，订单，支付，推荐，搜索，拉新，促活，推送，物流，客服，它都必须有。持续更新ing

可以用来实现聊天功能。

文档地址：https://github.com/Evansy/MallChatWeb



### fontmin-app

第一个纯 JavaScript 字体子集化方案，可以将某些文字的字体提炼出来，减少体积。

文档地址：https://github.com/ecomfe/fontmin-app



### ORC 识别 Tesseract.js

`Tesseract.js`是基于Tesseract的一个纯 Javascript 编程语言的 ocr 识别库，简单实用。支持包括中英文等100多种语言（包括中文）的图片和视频文字识别，自动文本方向和脚本检测，用于读取段落，单词和字符边界框的简单界面，底层封装了Tesseract OCR引擎来实现。

文档地址：https://github.com/naptha/tesseract.js



### lunar 阴阳日历

lunar 是一个支持阳历、阴历、佛历和道历的**日历工具库**，其不依赖第三方，支持阳历、阴历、佛历、道历、儒略日的相互转换，还支持星座、干支、生肖、节气、节日、彭祖百忌、每日宜忌、吉神宜趋、凶煞宜忌、吉神方位、冲煞、纳音、星宿、八字、五行、十神、建除十二值星、青龙名堂等十二神、黄道日及吉凶等。

文档地址：https://github.com/6tail/lunar-javascript



### 禁用开发者调试 disable-devtool

disable-devtool 可以禁用一切可以进入开发者工具的方法，阻止通过开发者工具进行的“代码抓取”。

文档地址：https://github.com/theajack/disable-devtool



### resize-observer-polyfill

Resize Observer API 的 polyfill。可以监听元素、组件大小的变化，用来实现响应式。

文档地址：https://github.com/que-etc/resize-observer-polyfill



### vite-plugin-pages

基于文件系统的路由生成器。

文档地址：https://github.com/hannoeru/vite-plugin-pages



### prerender-spa-plugin

**不推荐。**

在单页应用程序中预呈现静态 HTML。

文档：https://github.com/chrisvfritz/prerender-spa-plugin



### vue-meta-info

**不推荐。**

vue-meta-info 是一个基于vue 2.0的插件，它会让你更好的管理你的 app 里面的 meta 信息。你可以直接 在组件内设置 metaInfo 便可以自动挂载到你的页面中。如果你需要随着数据的变化，自动更新你的title、meta等信息，那么用此 插件也是再合适不过了。 当然，有时候我们也可能会遇到让人头疼的SEO问题，那么使用此插件配合 `prerender-spa-plugin` 也是再合适不过了。

文档：https://github.com/muwoo/vue-meta-info



### qnm

用于查询 `node_modules` 目录的简单 cli 实用程序。可以查看依赖的重复数量。

文档：https://github.com/ranyitz/qnm



### sentry 错误日志上传

`Sentry` 是一个日志平台，分为客户端和服务端，客户端(目前客户端有Python, PHP,C#, Ruby等多种语言)就嵌入在你的应用程序中间，程序出现异常就向服务端发送消息，服务端将消息记录到数据库中并提供一个**问题**方便查看。

文档：https://github.com/getsentry/sentry-javascript

参考：https://mp.weixin.qq.com/s/Vid_EHhiVoBJ-fXUS0h-gQ





### single-spa

用于简单微前端的路由器

文档：https://github.com/single-spa/single-spa