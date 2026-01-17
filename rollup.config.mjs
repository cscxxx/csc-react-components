// @ts-check
// TypeScript 插件，用于处理 TypeScript 文件并生成类型声明文件
import typescript from "rollup-plugin-typescript2";
// 解析 node_modules 中的模块
import resolve from "@rollup/plugin-node-resolve";
// 将 CommonJS 模块转换为 ES 模块
import commonjs from "@rollup/plugin-commonjs";
// 处理 CSS 文件，支持提取、压缩等功能
import postcss from "rollup-plugin-postcss";
// PostCSS 插件，用于处理 CSS 中的 @import 语句
import postcssImport from "postcss-import";
// 删除文件或目录的插件，用于清理上一次的打包内容
import del from "rollup-plugin-delete";
// 复制文件和目录的插件，用于复制 package.json 等文件
import copy from "rollup-plugin-copy";
// 压缩 JavaScript 代码的插件
import terser from "@rollup/plugin-terser";
// Node.js 文件系统模块，用于文件读写操作
import { readFileSync, writeFileSync, existsSync } from "fs";
// Node.js 路径模块，用于路径处理
import { join } from "path";

// 外部依赖，这些依赖不会被打包，需要在使用时单独安装
/** @type {string[]} */
const external = ["react", "react-dom", "react/jsx-runtime", "clsx"];

// 导出一个数组，该数组里面是一个一个的对象
// 每一个对象就是一个打包任务
/** @type {import('rollup').RollupOptions[]} */
export default [
  {
    // 打包组件的任务
    // components 和 utils 一起打包，因为 components 依赖 utils
    input: "packages/components/index.ts", // 打包入口
    // 打包的输出
    output: {
      dir: "dist/components",
      format: "esm", // 使用 ESM 格式
      preserveModules: true, // 保持模块结构，不打包成一个文件，支持单独导入
      preserveModulesRoot: "packages/components", // 保持模块根路径
    },
    // 外部依赖，这一部分依赖不需要进行打包
    external,
    // 指定要使用的插件，注意插件是有顺序的
    plugins: [
      // 先把上一次的打包内容删除掉
      del({ targets: "dist/components" }),
      // TypeScript 插件需要放在最前面，以便先处理 TypeScript 语法
      typescript({
        tsconfig: "tsconfig.app.json",
        // 通过 tsconfigOverride 覆盖 TypeScript 编译选项
        tsconfigOverride: {
          compilerOptions: {
            declaration: true, // 生成类型声明文件
            declarationDir: "dist/components", // 类型声明文件输出目录
            rootDir: "packages", // 设置根目录为 packages，包含所有相关包
            noEmit: false, // 允许生成文件
            allowImportingTsExtensions: false, // 禁用此选项，因为需要生成文件
          },
          exclude: [
            "**/*.test.ts",
            "**/*.test.tsx",
            "**/*.spec.ts",
            "**/*.spec.tsx",
            "**/test/**", // 排除整个 test 目录
            "**/__tests__/**", // 排除 __tests__ 目录
          ],
        },
        // 跳过类型检查，只生成类型声明文件（因为相对路径在打包时会被正确处理）
        check: false,
      }),
      // 解析 node_modules 中的模块
      resolve({
        extensions: [".ts", ".tsx", ".js", ".jsx", ".css"],
        preferBuiltins: false,
      }),
      // 将 CommonJS 模块转换为 ES 模块
      commonjs(),
      // 压缩代码（暂时禁用，避免异步问题）
      // terser(),
      // 复制 package.json 到输出目录
      // 源文件的 package.json 已经包含了所有必要的配置，直接复制即可
      copy({
        targets: [
          { src: "packages/components/package.json", dest: "dist/components" },
        ],
      }),
      // 在类型声明文件生成后，将入口文件复制到正确位置并修正路径
      // 使用 closeBundle 钩子，在所有操作完成后运行
      {
        name: "copy-types-entry",
        closeBundle() {
          const sourceFile = join(
            process.cwd(),
            "dist/components/components/index.d.ts"
          );
          const targetFile = join(process.cwd(), "dist/components/index.d.ts");
          if (existsSync(sourceFile)) {
            // 读取源文件内容并修正导出路径
            let content = readFileSync(sourceFile, "utf-8");
            // 将相对路径从 "./button" 改为 "./components/button"
            content = content.replace(
              /from\s+["']\.\//g,
              'from "./components/'
            );
            writeFileSync(targetFile, content);
          }
        },
      },
    ],
  },
  {
    // 打包样式的任务
    // 将所有组件的样式合并到一个 CSS 文件中
    input: "packages/theme-chalk/index.css", // 使用 CSS 入口文件
    output: {
      file: "dist/theme-chalk/index.css",
      format: "esm",
    },
    plugins: [
      // 清理上一次的打包内容
      del({
        targets: "dist/theme-chalk",
      }),
      // 处理 CSS，合并所有 @import 语句
      postcss({
        extract: true, // 单独生成一个 CSS 文件
        minimize: true, // 压缩
        plugins: [
          postcssImport(), // 处理 @import 语句，合并导入的 CSS 文件
        ],
      }),
      // 复制 package.json 到输出目录
      // 源文件的 package.json 已经包含了所有必要的配置，直接复制即可
      copy({
        targets: [
          {
            src: "packages/theme-chalk/package.json",
            dest: "dist/theme-chalk",
          },
        ],
      }),
    ],
  },
];
