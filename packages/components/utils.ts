import { clsx, type ClassValue } from "clsx";

/**
 * 合并类名的工具函数
 * 使用 clsx 来处理条件类名和类名数组
 * 
 * @param inputs - 类名参数，可以是字符串、对象、数组等
 * @returns 合并后的类名字符串
 * 
 * @example
 * ```tsx
 * cn("base-class", { "active": isActive }, className)
 * cn(["class1", "class2"], "class3")
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

