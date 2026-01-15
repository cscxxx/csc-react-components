import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    // 使用 jsdom 环境来模拟浏览器环境
    environment: "jsdom",
    // 设置全局测试文件
    globals: true,
    // 测试文件匹配模式
    include: ["**/*.{test,spec}.{ts,tsx}"],
    // 测试前执行的设置文件
    setupFiles: ["./test/setup.ts"],
  },
});
