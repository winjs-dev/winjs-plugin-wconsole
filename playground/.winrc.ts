import { defineConfig } from 'win';

export default defineConfig({
  plugins: ['../src'],
  wconsole: {
    vconsole: {},
    // 启用 eruda
    // eruda: {}
  },
  appConfig: {
    development: {
      // 开启调试工具
      IS_OPEN_VCONSOLE: true,
    },
  },
});
