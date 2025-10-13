import { importLazy } from '@winner-fed/utils';
import type { IApi } from '@winner-fed/winjs';

const { minify } = importLazy(require.resolve('@winner-fed/bundler-webpack/compiled/terser'));

// loadJS
const loadJSTpl = `
   function __winjs_dynamicLoadScript(src, callback, options) {
    var existingScript = document.getElementById(src);
    var cb = callback || function () {};

    if (!existingScript) {
      var script = document.createElement('script');
      script.src = src; // src url for the third-party library being loaded.
      script.id = options.id || src;
      if (options.crossorigin) {
        script.crossorigin = options.crossorigin;
      }
      if (options.async) {
        script.async = options.async;
      }
      if (options.defer) {
        script.defer = options.defer;
      }

      document.body.appendChild(script);

      var onEnd = 'onload' in script ? stdOnEnd : ieOnEnd;
      onEnd(script, cb);
    }

    if (existingScript && cb) cb(null, existingScript);

    function stdOnEnd(script, cb) {
      script.onload = function () {
        // this.onload = null here is necessary
        // because even IE9 works not like others
        this.onerror = this.onload = null;
        cb(null, script);
      };
      script.onerror = function () {
        this.onerror = this.onload = null;
        cb(new Error('Failed to load ' + src), script);
      };
    }

    function ieOnEnd(script, cb) {
      script.onreadystatechange = function () {
        if (this.readyState !== 'complete' && this.readyState !== 'loaded') return;
        this.onreadystatechange = null;
        cb(null, script); // there is no way to catch loading errors in IE8
      };
    }
  }
  `;

async function getRootPixelCode(code: string) {
  const { code: minifiedRuntimeCode } = await minify(
    {
      RootPixelCode: code
    },
    {
      ecma: 5
    }
  );
  return minifiedRuntimeCode;
}

export default (api: IApi) => {
  api.describe({
    key: 'wconsole',
    config: {
      schema({ zod }) {
        return zod
          .object({
            vconsole: zod
              .object({
                defaultPlugins: zod
                  .array(zod.string())
                  .describe('vConsole 默认加载的插件数组。指定要启用的插件名称，如 ["system", "network", "element", "storage"]。控制 vConsole 面板中显示哪些功能选项卡。')
                  .optional(),
                onReady: zod
                  .function()
                  .describe('vConsole 初始化完成后的回调函数。当 vConsole 实例创建并准备就绪时触发，可用于执行自定义的初始化逻辑。')
                  .optional(),
                disableLogScrolling: zod
                  .boolean()
                  .describe('是否禁用日志面板的自动滚动功能。设为 true 时，新的日志消息不会自动滚动到底部，便于查看历史日志。默认为 false（启用自动滚动）。')
                  .optional(),
                theme: zod
                  .string()
                  .describe('vConsole 主题样式。支持的主题模式，如 "light"（浅色主题）或 "dark"（深色主题）。控制 vConsole 面板的外观风格。')
                  .optional(),
                url: zod
                  .string()
                  .describe('vConsole 库的 CDN 地址。自定义 vConsole 脚本的加载地址，默认使用 "https://cdnjs.cloudflare.com/ajax/libs/vConsole/3.14.7/vconsole.min.js"。可用于指定不同版本或私有 CDN。')
                  .optional()
              })
              .describe('vConsole 移动端调试工具配置。vConsole 是一个轻量、可拓展、针对手机网页的前端开发者调试面板，提供日志、网络、元素、存储等调试功能。')
              .optional(),
            pagespy: zod
              .object({
                options: zod
                  .record(zod.any())
                  .describe('PageSpy 初始化选项配置对象。传递给 new PageSpy() 构造函数的配置参数，控制 PageSpy 的行为和功能设置。具体选项依据 PageSpy 官方文档。')
                  .optional(),
                url: zod
                  .string()
                  .describe('PageSpy 库的 CDN 地址。指定 PageSpy 脚本文件的加载 URL，必须提供有效的 PageSpy index.min.js 文件地址。')
              })
              .describe('PageSpy 远程调试工具配置。PageSpy 是一个用于调试 H5、小程序、Flutter 等平台的工具，支持远程查看页面信息、网络请求、控制台日志等。')
              .optional(),
            eruda: zod
              .object({
                container: zod
                  .string()
                  .describe('Eruda 挂载的容器选择器。指定 Eruda 调试面板挂载的 DOM 元素的 CSS 选择器，如 "#app" 或 ".debug-container"。默认挂载到 document.body。')
                  .optional(),
                tool: zod
                  .array(zod.string())
                  .describe('Eruda 启用的工具模块数组。指定要加载的调试工具，如 ["console", "elements", "network", "resources", "sources"]。控制 Eruda 面板中显示的功能模块。')
                  .optional(),
                autoScale: zod
                  .boolean()
                  .describe('是否启用 Eruda 自动缩放功能。设为 true 时，Eruda 会根据设备屏幕大小自动调整面板尺寸和字体大小，提供更好的移动端体验。')
                  .optional(),
                useShadowDom: zod
                  .boolean()
                  .describe('是否使用 Shadow DOM 隔离 Eruda 样式。设为 true 时，Eruda 会在 Shadow DOM 中渲染，避免与页面样式冲突。推荐在复杂页面中启用。')
                  .optional(),
                defaults: zod
                  .record(zod.any())
                  .describe('Eruda 默认配置选项对象。用于设置 Eruda 各个工具模块的默认行为和样式配置。具体选项依据 Eruda 官方文档。')
                  .optional(),
                url: zod
                  .string()
                  .describe('Eruda 库的 CDN 地址。自定义 Eruda 脚本的加载地址，默认使用 "https://cdnjs.cloudflare.com/ajax/libs/eruda/3.0.1/eruda.min.js"。可用于指定不同版本或私有 CDN。')
                  .optional()
              })
              .describe('Eruda 移动端调试工具配置。Eruda 是一个专为手机网页前端设计的调试面板，类似 DevTools 的代替方案，提供控制台、元素查看、网络监控等功能。')
              .optional()
          })
          .describe('移动端调试控制台插件配置。集成多种移动端调试工具（vConsole、PageSpy、Eruda），通过 window.LOCAL_CONFIG.IS_OPEN_VCONSOLE 标志控制是否加载。所有调试工具均采用动态脚本加载方式，支持自定义 CDN 地址和配置选项。')
          .optional()
          .default({});
      }
    },
    enableBy: api.EnableBy.config
  });

  const { wconsole = {} } = api.userConfig;

  // only dev or build running
  if (!['dev', 'build', 'preview', 'setup'].includes(api.name))
    return;

  // vconsole
  if (wconsole?.vconsole) {
    api.addHTMLStyles(() => {
      return [
        {
          content: `.vc-switch { right: 0px; bottom: calc(env(safe-area-inset-bottom) + 1.2rem) !important; }`
        }
      ];
    });
    api.addHTMLScripts(() => getRootPixelCode(`
      if (window.LOCAL_CONFIG.IS_OPEN_VCONSOLE) {
        ${loadJSTpl}
        __winjs_dynamicLoadScript(
          ${JSON.stringify(wconsole?.vconsole.url || 'https://cdnjs.cloudflare.com/ajax/libs/vConsole/3.14.7/vconsole.min.js')},
          function (err) {
            if (err) {
              console.error('加载 vconsole.min.js 出现异常');
              return;
            }
            try {
              var vConsoleTool = new VConsole(${JSON.stringify(wconsole.vconsole)});
              console.log('当前链接地址 url', window.location.href);
              console.log('当前使用的 vConsole 版本', vConsoleTool.version);
            } catch (err) {
              console.error('new VConsole() 出现异常');
            }
          },
          { async: true }
        );
     }
    `));
  }

  // pagespy
  if (wconsole?.pagespy) {
    api.addHTMLScripts(() => getRootPixelCode(`
      if (window.LOCAL_CONFIG.IS_OPEN_VCONSOLE) {
        ${loadJSTpl}
        __winjs_dynamicLoadScript(
          ${JSON.stringify(wconsole?.pagespy.url)},
          function (err) {
            if (err) {
              console.error('加载 page-spy index.min.js 出现异常');
              return;
            }
            try {
              window.$pageSpy = new PageSpy(${JSON.stringify(wconsole.pagespy?.options || {})});
              console.log('当前链接地址 url', window.location.href);
            } catch (err) {
              console.error('new PageSpy() 出现异常');
            }
          },
          { async: true }
        );
     }
    `));
  }

  // eruda
  if (wconsole?.eruda) {
    api.addHTMLScripts(() => getRootPixelCode(`
      if (window.LOCAL_CONFIG.IS_OPEN_VCONSOLE) {
        ${loadJSTpl}
        __winjs_dynamicLoadScript(
          ${JSON.stringify(wconsole?.eruda.url || 'https://cdnjs.cloudflare.com/ajax/libs/eruda/3.0.1/eruda.min.js')},
          function (err) {
            if (err) {
              console.error('加载 eruda.min.js 出现异常');
              return;
            }
            try {
              var erudaTool = eruda.init(${JSON.stringify(wconsole.eruda)});
              console.log('当前链接地址 url', window.location.href);
            } catch (err) {
              console.error('eruda.init() 出现异常');
            }
          },
          { async: true }
        );
     }
    `));
  }
}
