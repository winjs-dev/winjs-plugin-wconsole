# winjs-plugin-wconsole

🚀 **Web控制台调试插件** - 为 WinJS 应用提供强大的移动端调试和监控解决方案。

<p>
  <a href="https://npmjs.com/package/@winner-fed/plugin-wconsole">
   <img src="https://img.shields.io/npm/v/@winner-fed/plugin-wconsole?style=flat-square&colorA=564341&colorB=EDED91" alt="npm version" />
  </a>
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="license" />
  <a href="https://npmcharts.com/compare/@winner-fed/plugin-wconsole?minimal=true"><img src="https://img.shields.io/npm/dm/@winner-fed/plugin-wconsole.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="downloads" /></a>
</p>

## ✨ 特性

- 📱 **移动端友好** - 专为移动端调试设计，适配各种屏幕尺寸
- 🛠️ **多工具支持** - 集成 vConsole、PageSpy、Eruda 三大调试工具
- 🎯 **按需启用** - 根据需求选择性启用调试工具
- 🔧 **高度可配置** - 支持丰富的配置选项和自定义设置
- 🌐 **CDN 支持** - 支持本地文件和 CDN 加载
- ⚡ **异步加载** - 不阻塞主线程，提升加载性能
- 🔄 **环境隔离** - 仅在开发环境自动启用，生产环境自动关闭
- 🎨 **界面美化** - 针对移动端优化的 UI 样式

## 🎯 应用场景

- **移动端H5调试** - 在移动设备上调试H5应用
- **远程调试** - 远程监控和调试移动端应用
- **性能监控** - 实时监控页面性能和网络请求
- **错误追踪** - 捕获和分析JavaScript错误
- **开发调试** - 开发过程中的实时调试和测试

## 📦 安装

```bash
# npm
npm install @winner-fed/plugin-wconsole -D

# yarn
yarn add @winner-fed/plugin-wconsole -D

# pnpm
pnpm add @winner-fed/plugin-wconsole -D
```

## 🚀 快速开始

### 1. 配置插件

在 `.winrc.ts` 中启用插件：

```typescript
// .winrc.ts
import { defineConfig } from '@winner-fed/winjs';

export default defineConfig({
  plugins: ['@winner-fed/plugin-wconsole'],
  wconsole: {
    // 启用 vConsole
    vconsole: {},
  },
  appConfig: {
    development: {
      // 开启调试工具
      IS_OPEN_VCONSOLE: true,
    },
  },
});
```

### 2. 在移动端访问

在移动端浏览器中访问你的应用，会自动显示调试工具：

- **vConsole**: 屏幕右下角的悬浮按钮
- **PageSpy**: 页面监控工具
- **Eruda**: 移动端开发者工具

## 🛠️ 支持的调试工具

### vConsole

轻量级、可拓展的移动端调试工具，提供类似开发者工具的功能。

**特点：**
- 📝 日志面板 - 查看 console 输出
- 🌐 网络面板 - 监控 Ajax/Fetch 请求
- 📊 元素面板 - 查看 DOM 结构
- 💾 存储面板 - 查看 localStorage/sessionStorage
- ⚙️ 系统面板 - 查看设备信息

### PageSpy

页面监控和远程调试工具，支持多端同步调试。

**特点：**
- 🔍 实时监控 - 实时查看页面状态
- 📱 多端同步 - 支持多设备同时调试
- 📊 性能分析 - 页面性能监控
- 🎯 错误追踪 - 自动捕获异常信息

### Eruda

现代化的移动端开发者工具，功能强大且易于使用。

**特点：**
- 🎨 现代化界面 - 美观的用户界面
- 🔧 丰富功能 - 完整的调试功能集
- 📱 移动优化 - 专为移动端设计
- 🎯 高性能 - 轻量级且高效

## ⚙️ 配置选项

### vConsole 配置

```typescript
export default defineConfig({
  wconsole: {
    vconsole: {
      // 自定义 CDN 地址
      url: 'https://cdnjs.cloudflare.com/ajax/libs/vConsole/3.14.7/vconsole.min.js',
      // 默认激活的面板
      defaultPlugins: ['system', 'network', 'element', 'storage'],
      // 禁用日志滚动
      disableLogScrolling: false,
      // 主题设置
      theme: 'light',
      // 初始化回调
      onReady: function() {
        console.log('vConsole is ready!');
      }
    }
  }
});
```

### PageSpy 配置

```typescript
export default defineConfig({
  wconsole: {
    pagespy: {
      // 自定义服务器地址
      url: 'http://localhost:6752/page-spy/index.min.js',
      // PageSpy 配置选项
      options: {
        // 项目名称
        project: 'my-project',
        // 标题
        title: 'My Application',
        // 客户端信息
        clientOrigin: 'https://example.com'
      }
    }
  }
});
```

### Eruda 配置

```typescript
export default defineConfig({
  wconsole: {
    eruda: {
      // 自定义 CDN 地址
      url: 'https://cdnjs.cloudflare.com/ajax/libs/eruda/3.0.1/eruda.min.js',
      // 挂载容器
      container: document.body,
      // 启用的工具
      tool: ['console', 'elements', 'network', 'resources', 'info', 'snippets'],
      // 自动缩放
      autoScale: true,
      // 使用 Shadow DOM
      useShadowDom: true,
      // 默认配置
      defaults: {
        displaySize: 50,
        theme: 'Material Design'
      }
    }
  }
});
```

## 📝 使用示例

### 基础调试配置

```typescript
// .winrc.ts
export default defineConfig({
  plugins: ['@winner-fed/plugin-wconsole'],
  wconsole: {
    // 启用 vConsole
    vconsole: {
      defaultPlugins: ['system', 'network', 'element'],
      theme: 'dark'
    }
  },
  appConfig: {
    development: {
      IS_OPEN_VCONSOLE: true,
    },
    production: {
      IS_OPEN_VCONSOLE: false, // 生产环境关闭
    }
  }
});
```

### 多工具混合使用

```typescript
// .winrc.ts
export default defineConfig({
  plugins: ['@winner-fed/plugin-wconsole'],
  wconsole: {
    // 主要调试工具
    vconsole: {
      defaultPlugins: ['system', 'network'],
      theme: 'light'
    },
    // 性能监控
    pagespy: {
      options: {
        project: 'mobile-app',
        title: 'Mobile Application Debug'
      }
    }
  },
  appConfig: {
    development: {
      IS_OPEN_VCONSOLE: true,
    }
  }
});
```

### 使用本地文件

```typescript
// .winrc.ts
export default defineConfig({
  plugins: ['@winner-fed/plugin-wconsole'],
  wconsole: {
    vconsole: {
      // 使用本地文件
      url: './vconsole.min.js'
    }
  },
  appConfig: {
    development: {
      IS_OPEN_VCONSOLE: true,
    }
  }
});
```

### 高级配置

```typescript
// .winrc.ts
export default defineConfig({
  plugins: ['@winner-fed/plugin-wconsole'],
  wconsole: {
    vconsole: {
      url: 'https://cdnjs.cloudflare.com/ajax/libs/vConsole/3.14.7/vconsole.min.js',
      defaultPlugins: ['system', 'network', 'element', 'storage'],
      disableLogScrolling: false,
      theme: 'light',
      onReady: function() {
        console.log('vConsole 初始化完成');
        // 添加自定义面板
        const customPlugin = new VConsole.VConsolePlugin('custom', 'Custom');
        vConsole.addPlugin(customPlugin);
      }
    },
    eruda: {
      tool: ['console', 'elements', 'network'],
      autoScale: true,
      useShadowDom: true,
      defaults: {
        displaySize: 80,
        theme: 'Monokai Pro'
      }
    }
  },
  appConfig: {
    development: {
      IS_OPEN_VCONSOLE: true,
    }
  }
});
```

## 📱 移动端适配

### 安全区域适配

插件自动处理移动端安全区域，确保调试工具不被遮挡：

```css
/* 自动添加的样式 */
.vc-switch {
  right: 0px;
  bottom: calc(env(safe-area-inset-bottom) + 1.2rem) !important;
}
```

### 响应式设计

- **小屏设备**：自动调整工具栏大小
- **横屏模式**：优化横屏显示效果
- **高DPI屏幕**：支持高分辨率屏幕显示

## 🔧 API 参考

### 全局配置

```typescript
interface WConsoleConfig {
  vconsole?: VConsoleConfig;
  pagespy?: PageSpyConfig;
  eruda?: ErudaConfig;
}

interface VConsoleConfig {
  url?: string;
  defaultPlugins?: string[];
  onReady?: () => void;
  disableLogScrolling?: boolean;
  theme?: 'light' | 'dark';
}

interface PageSpyConfig {
  url?: string;
  options?: {
    project?: string;
    title?: string;
    clientOrigin?: string;
    [key: string]: any;
  };
}

interface ErudaConfig {
  url?: string;
  container?: string;
  tool?: string[];
  autoScale?: boolean;
  useShadowDom?: boolean;
  defaults?: {
    displaySize?: number;
    theme?: string;
    [key: string]: any;
  };
}
```

### 运行时访问

```typescript
// 在浏览器中访问调试工具实例
declare global {
  interface Window {
    vConsole?: any;
    $pageSpy?: any;
    eruda?: any;
  }
}

// 使用示例
if (window.vConsole) {
  console.log('vConsole 版本:', window.vConsole.version);
}
```

## 🎯 最佳实践

### 1. 环境配置

```typescript
// 不同环境使用不同配置
export default defineConfig({
  wconsole: {
    vconsole: {
      url: process.env.NODE_ENV === 'development' 
        ? './vconsole.min.js'  // 开发环境使用本地文件
        : 'https://cdnjs.cloudflare.com/ajax/libs/vConsole/3.14.7/vconsole.min.js'
    }
  },
  appConfig: {
    development: {
      IS_OPEN_VCONSOLE: true,
    },
    testing: {
      IS_OPEN_VCONSOLE: true,
    },
    production: {
      IS_OPEN_VCONSOLE: false,
    }
  }
});
```

### 2. 性能优化

```typescript
// 按需加载，避免影响生产环境
export default defineConfig({
  wconsole: {
    vconsole: {
      // 使用压缩版本
      url: 'https://cdnjs.cloudflare.com/ajax/libs/vConsole/3.14.7/vconsole.min.js',
      // 仅启用必要的面板
      defaultPlugins: ['system', 'network'],
      // 禁用日志滚动以提升性能
      disableLogScrolling: true
    }
  }
});
```

### 3. 团队协作

```typescript
// 为团队成员提供统一的调试配置
export default defineConfig({
  wconsole: {
    vconsole: {
      onReady: function() {
        console.log('=== 调试工具已启动 ===');
        console.log('当前环境:', process.env.NODE_ENV);
        console.log('API地址:', window.LOCAL_CONFIG.API_HOME);
        console.log('版本信息:', window.vConsole.version);
      }
    },
    pagespy: {
      options: {
        project: '项目名称',
        title: '开发调试'
      }
    }
  }
});
```

## 🔍 常见问题

### Q: 为什么调试工具没有显示？

A: 请检查以下几点：
1. 确保在 `appConfig` 中设置了 `IS_OPEN_VCONSOLE: true`
2. 确认当前环境是开发环境
3. 检查网络是否能访问CDN地址
4. 查看浏览器控制台是否有错误信息

### Q: 如何在生产环境中临时启用调试工具？

A: 可以通过URL参数或localStorage控制：

```typescript
// 在代码中动态控制
if (location.search.includes('debug=true') || localStorage.getItem('debug') === 'true') {
  window.LOCAL_CONFIG.IS_OPEN_VCONSOLE = true;
}
```

### Q: 调试工具加载失败怎么办？

A: 建议使用本地文件作为备用方案：

```typescript
export default defineConfig({
  wconsole: {
    vconsole: {
      // 主要地址
      url: 'https://cdnjs.cloudflare.com/ajax/libs/vConsole/3.14.7/vconsole.min.js',
      // 可以下载到public目录作为备用
      // url: './vconsole.min.js'
    }
  }
});
```

### Q: 如何自定义调试工具的样式？

A: 可以通过CSS覆盖默认样式：

```css
/* 自定义 vConsole 样式 */
.vc-switch {
  background-color: #007aff !important;
  border-radius: 50% !important;
}

.vc-panel {
  font-size: 12px !important;
}
```

### Q: 多个调试工具是否会冲突？

A: 通常不会冲突，但建议根据实际需求选择合适的工具：
- **vConsole**: 轻量级，适合日常调试
- **PageSpy**: 适合远程监控
- **Eruda**: 功能丰富，适合深度调试

## 📋 调试工具对比

| 特性 | vConsole | PageSpy | Eruda |
|------|----------|---------|--------|
| 文件大小 | 小 (~200KB) | 中 (~500KB) | 大 (~1MB) |
| 功能完整度 | 基础 | 高级 | 完整 |
| 远程调试 | ❌ | ✅ | ❌ |
| 性能监控 | 基础 | 高级 | 完整 |
| 自定义扩展 | ✅ | ✅ | ✅ |
| 移动端适配 | ✅ | ✅ | ✅ |
| 学习成本 | 低 | 中 | 高 |

## 🛠️ 开发调试

### 启用调试模式

```typescript
// 在开发环境中启用详细日志
export default defineConfig({
  wconsole: {
    vconsole: {
      onReady: function() {
        // 启用详细日志
        window.vConsole.setOption('maxLogNumber', 5000);
        console.log('vConsole 调试模式已启用');
      }
    }
  }
});
```

### 自定义插件

```typescript
// 创建自定义 vConsole 插件
export default defineConfig({
  wconsole: {
    vconsole: {
      onReady: function() {
        // 自定义插件
        const myPlugin = new VConsole.VConsolePlugin('my_plugin', 'My Plugin');
        
        myPlugin.on('init', function() {
          console.log('Custom plugin initialized');
        });
        
        myPlugin.on('renderTab', function(callback) {
          const html = '<div>Custom content</div>';
          callback(html);
        });
        
        window.vConsole.addPlugin(myPlugin);
      }
    }
  }
});
```

## 📄 许可证

[MIT](./LICENSE).

## 🔗 相关链接

- [vConsole 官方文档](https://github.com/Tencent/vConsole)
- [PageSpy 官方文档](https://github.com/HuolalaTech/page-spy)
- [Eruda 官方文档](https://github.com/liriliri/eruda)
