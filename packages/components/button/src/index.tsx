import React from "react";
import "@csc-react-components/theme-chalk/button";
import { cn } from "@csc-react-components/utils";

// 按钮类型
export type ButtonType = "primary" | "default" | "danger";

// 按钮尺寸
export type ButtonSize = "small" | "medium" | "large";

// Button 组件属性接口
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 按钮类型（primary/default/danger） */
  variant?: ButtonType;
  /** 按钮尺寸（small/medium/large） */
  size?: ButtonSize;
  /** 按钮内容 */
  children?: React.ReactNode;
}

/**
 * Button 按钮组件
 * 支持不同类型、尺寸和禁用状态
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      variant = "default",
      size = "medium",
      disabled = false,
      children = "按钮",
      className,
      ...rest
    } = props;

    // 构建类名，使用 clsx 处理条件类名
    const classNames = cn(
      "csc-button",
      `csc-button--${variant}`,
      `csc-button--${size}`,
      disabled && "is-disabled",
      className
    );

    return (
      <button ref={ref} className={classNames} disabled={disabled} {...rest}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
