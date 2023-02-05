import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import type { PluginOption } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    visualizer() as unknown as PluginOption,
    dts({
      insertTypesEntry: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/RoutaaUiKit.ts'),
      name: 'bootstrap-vue',
      fileName: (format) => `bootstrap-vue.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
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
        // '@popperjs/core',
        '@vueuse/core'
      ],
      output: {
        exports: 'named',
        assetFileNames: `bootstrap-vue.[ext]`, //without this, it generates build/styles.css
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          bootstrap: 'Bootstrap',
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
      }
    }
  },
  css: { preprocessorOptions: { scss: { charset: false } } },
  server: {
    host: true
  }
})
