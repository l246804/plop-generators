import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { distDir, entryFile, srcDir } from './internal/paths'
import { genExternals, genOutput } from './internal/vite'

export default defineConfig(() => {
  return {
    build: {
      emptyOutDir: true,
      lib: {
        entry: entryFile,
      },
      rollupOptions: {
        external: genExternals(),
        output: [genOutput('esm'), genOutput('cjs')],
      },
    },
    esbuild: {
      drop: ['console', 'debugger'],
    },
    resolve: {
      alias: {
        '@/': `${srcDir}/`,
      },
    },
    plugins: [dts({ copyDtsFiles: true, outDir: distDir, include: ['src'] })],
  } as UserConfig
})
