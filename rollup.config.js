import clear from 'rollup-plugin-clear'; // 清空
import { terser } from "rollup-plugin-terser"; // 压缩
import typescript from 'rollup-plugin-typescript2'; // ts 支持

const packageName = "js-sudoku";

export default {
  input: 'src/index.ts',
  output: [
    {
      file: `dist/index.js`,
      format: 'umd',
      name: packageName
    },
    {
      file: `dist/index.min.js`,
      format: 'umd',
      name: packageName,
      plugins: [terser()]
    },
    {
      file: `esm/index.js`,
      format: 'esm',
    },
    {
      file: `lib/index.js`,
      format: 'cjs',
    }
  ],
  plugins: [
    typescript(), // tsconfig.json declaration:true 生成 *.d.ts
    clear({
      targets: ['dist', 'esm', 'lib']
    }),
  ]
};
