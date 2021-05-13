import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  dynamicImport: {},
  history: {
    type: 'hash',
  },
  dva: {
    immer: false,
    hmr: false,
  },
  antd: {}
});
