import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import type { PluginOption } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import typescript from '@rollup/plugin-typescript';
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    visualizer() as unknown as PluginOption,
    dts({
      insertTypesEntry: true
    }),
    typescript({ compilerOptions: {lib: ["es5", "es6", "dom"], target: "es5"}})
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.js', '.ts', '.json', '.vue']
  },
  build: {
    sourcemap: true,
    emptyOutDir: false,
    minify: true,
    lib: {
      entry: resolve(__dirname, 'src/RoutaaUiKit.ts'),
      name: 'routaa-ui-kit',
      formats: ['es', 'cjs'],
      fileName: (format) => `routaa-ui-kit.${format}.js`
    },
    rollupOptions: {
      external: [
        'bootstrap',
        'bootstrap/js/dist/alert',
        'bootstrap/js/dist/collapse',
        'bootstrap/js/dist/modal',
        'bootstrap/js/dist/offcanvas',
        'bootstrap/js/dist/popover',
        'bootstrap/js/dist/carousel',
        'bootstrap/js/dist/dropdown',
        'bootstrap/js/dist/tooltip',
        'vue',
        'vue-router',
        '@vueuse/core'
      ],
      output: {
        exports: 'named',
        interop: 'auto',
        dir: './dist',
        strict: true,
        compact: true,
        assetFileNames: `routaa-ui-kit.[ext]`,
        globals: {
          vue: 'Vue',
          bootstrap: 'Bootstrap',
          'vue-router': 'vue-router',
          '@vueuse/core': 'vueuse',
          'bootstrap/js/dist/collapse': 'Collapse',
          'bootstrap/js/dist/alert': 'Alert',
          'bootstrap/js/dist/carousel': 'Carousel',
          'bootstrap/js/dist/dropdown': 'Dropdown',
          'bootstrap/js/dist/modal': 'Modal',
          'bootstrap/js/dist/offcanvas': 'Offcanvas',
          'bootstrap/js/dist/popover': 'Popover',
          'bootstrap/js/dist/tooltip': 'Tooltip'
        }
      },
      treeshake: {
        moduleSideEffects: false,
        correctVarValueBeforeDeclaration: true,
      }
    }
  },
  css: { preprocessorOptions: { scss: { charset: false } } },
  server: {
    host: true
  }
})
