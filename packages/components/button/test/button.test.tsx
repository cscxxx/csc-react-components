import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../src/index";

describe("Button 组件", () => {
  // 测试基本渲染
  it("应该能够正常渲染", () => {
    render(<Button>点击我</Button>);
    const button = screen.getByRole("button", { name: /点击我/i });
    expect(button).toBeInTheDocument();
  });

  // 测试 variant 属性
  it("应该正确应用 primary variant 样式类", () => {
    render(<Button variant="primary">主要按钮</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("csc-button--primary");
  });

  it("应该正确应用 danger variant 样式类", () => {
    render(<Button variant="danger">危险按钮</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("csc-button--danger");
  });

  // 测试 size 属性
  it("应该正确应用 small size 样式类", () => {
    render(<Button size="small">小按钮</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("csc-button--small");
  });

  it("应该正确应用 large size 样式类", () => {
    render(<Button size="large">大按钮</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("csc-button--large");
  });

  // 测试 disabled 状态
  it("应该正确应用 disabled 状态", () => {
    render(<Button disabled>禁用按钮</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("is-disabled");
  });

  // 测试点击事件
  it("应该能够响应点击事件", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick}>可点击按钮</Button>);
    const button = screen.getByRole("button");
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // 测试禁用状态下不能点击
  it("禁用状态下不应该响应点击事件", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Button disabled onClick={handleClick}>
        禁用按钮
      </Button>
    );
    const button = screen.getByRole("button");
    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});

