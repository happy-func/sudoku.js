import clear from 'rollup-plugin-clear'; // 清空
import { terser } from "rollup-plugin-terser"; // 压缩
import typescript from 'rollup-plugin-typescript2'; // ts 支持

const packageName = "js-sudoku";

export default {
  input: 'src/index.ts',
  output: [
    {
      file: `dist/${packageName}.umd.js`,
      format: 'umd',
      name: packageName
    },
    {
      file: `dist/${packageName}.min.js`,
      format: 'umd',
      name: packageName,
      plugins: [terser()]
    },
    {
      file: `esm/${packageName}.js`,
      format: 'esm',
    },
    {
      file: `lib/${packageName}.cjs.js`,
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
