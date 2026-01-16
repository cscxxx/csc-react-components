import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Card } from "../src/index";

describe("Card 组件", () => {
  // 测试基本渲染
  it("应该能够正常渲染", () => {
    render(<Card>卡片内容</Card>);
    const card = screen.getByText("卡片内容");
    expect(card).toBeInTheDocument();
  });

  // 测试 width 属性
  it("应该正确应用 width 样式", () => {
    const { container } = render(<Card width={300}>测试卡片</Card>);
    const card = container.querySelector(".csc-card");
    expect(card).toHaveStyle({ width: "300px" });
  });

  it("width 为 0 时不应该设置宽度样式", () => {
    const { container } = render(<Card width={0}>测试卡片</Card>);
    const card = container.querySelector(".csc-card");
    expect(card).not.toHaveStyle({ width: "0px" });
  });

  // 测试 imgSrc 和 imgHeight 属性
  it("应该正确渲染图片", () => {
    const { container } = render(
      <Card imgSrc="https://example.com/image.jpg">测试卡片</Card>
    );
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/image.jpg");
  });

  it("应该正确应用 imgHeight 样式", () => {
    const { container } = render(
      <Card imgSrc="https://example.com/image.jpg" imgHeight={200}>
        测试卡片
      </Card>
    );
    const imageContainer = container.querySelector(".csc-card__image");
    expect(imageContainer).toHaveStyle({ height: "200px" });
  });

  it("imgHeight 为 0 时不应该设置高度样式", () => {
    const { container } = render(
      <Card imgSrc="https://example.com/image.jpg" imgHeight={0}>
        测试卡片
      </Card>
    );
    const imageContainer = container.querySelector(".csc-card__image");
    expect(imageContainer).not.toHaveStyle({ height: "0px" });
  });

  // 测试 summary 属性（字符串）
  it("应该正确渲染字符串类型的 summary", () => {
    render(<Card summary="这是卡片概要">测试卡片</Card>);
    const summary = screen.getByText("这是卡片概要");
    expect(summary).toBeInTheDocument();
  });

  // 测试 summary 属性（ReactNode）
  it("应该正确渲染 ReactNode 类型的 summary", () => {
    render(<Card summary={<div>ReactNode 概要</div>}>测试卡片</Card>);
    const summary = screen.getByText("ReactNode 概要");
    expect(summary).toBeInTheDocument();
  });

  // 测试所有属性的组合使用
  it("应该正确渲染所有属性的组合", () => {
    const { container } = render(
      <Card
        width={400}
        imgSrc="https://example.com/image.jpg"
        imgHeight={250}
        summary="组合测试概要"
      >
        组合测试内容
      </Card>
    );

    const card = container.querySelector(".csc-card");
    expect(card).toHaveStyle({ width: "400px" });

    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/image.jpg");

    const imageContainer = container.querySelector(".csc-card__image");
    expect(imageContainer).toHaveStyle({ height: "250px" });

    const summary = screen.getByText("组合测试概要");
    expect(summary).toBeInTheDocument();

    const content = screen.getByText("组合测试内容");
    expect(content).toBeInTheDocument();
  });

  // 测试没有图片和概要的情况
  it("应该能够正常渲染没有图片和概要的卡片", () => {
    const { container } = render(<Card width={300}>纯内容卡片</Card>);
    const content = screen.getByText("纯内容卡片");
    expect(content).toBeInTheDocument();
    expect(container.querySelector("img")).not.toBeInTheDocument();
  });

  // 测试图片加载状态
  describe("图片加载状态", () => {
    // 测试初始加载状态：应该显示 loading 效果
    it("图片加载中应该显示 loading 效果", () => {
      const { container } = render(
        <Card imgSrc="https://example.com/image.jpg">测试卡片</Card>
      );

      // 应该存在 loading 容器
      const loadingContainer = container.querySelector(
        ".csc-card__image-loading"
      );
      expect(loadingContainer).toBeInTheDocument();

      // 应该存在骨架屏元素
      const skeleton = container.querySelector(".csc-card__image-skeleton");
      expect(skeleton).toBeInTheDocument();

      // 图片应该处于隐藏状态
      const img = container.querySelector("img");
      expect(img).toHaveClass("csc-card__image-hidden");
    });

    // 测试图片加载完成后的状态切换
    it("图片加载完成后应该隐藏 loading 并显示图片", async () => {
      const { container } = render(
        <Card imgSrc="https://picsum.photos/200/150">测试卡片</Card>
      );

      const img = container.querySelector("img") as HTMLImageElement;
      expect(img).toBeInTheDocument();

      // 初始状态应该有 loading
      expect(
        container.querySelector(".csc-card__image-loading")
      ).toBeInTheDocument();

      // 模拟图片加载完成
      if (img) {
        // 创建一个成功加载的事件
        Object.defineProperty(img, "complete", { value: true });
        Object.defineProperty(img, "naturalWidth", { value: 200 });
        Object.defineProperty(img, "naturalHeight", { value: 150 });

        // 触发 load 事件
        const loadEvent = new Event("load", { bubbles: true });
        img.dispatchEvent(loadEvent);
      }

      // 等待状态更新
      await waitFor(() => {
        expect(
          container.querySelector(".csc-card__image-loading")
        ).not.toBeInTheDocument();
      });

      // 图片应该显示（有 loaded 类名）
      expect(img).toHaveClass("csc-card__image-loaded");
    });

    // 测试图片加载失败时的错误状态
    it("图片加载失败时应该显示错误提示", async () => {
      const { container } = render(
        <Card imgSrc="https://invalid-url-that-does-not-exist.com/image.jpg">
          测试卡片
        </Card>
      );

      const img = container.querySelector("img") as HTMLImageElement;
      expect(img).toBeInTheDocument();

      // 模拟图片加载失败
      if (img) {
        const errorEvent = new Event("error", { bubbles: true });
        img.dispatchEvent(errorEvent);
      }

      // 等待状态更新
      await waitFor(() => {
        const errorContainer = container.querySelector(
          ".csc-card__image-error"
        );
        expect(errorContainer).toBeInTheDocument();
        expect(errorContainer).toHaveTextContent("图片加载失败");
      });

      // loading 应该消失
      expect(
        container.querySelector(".csc-card__image-loading")
      ).not.toBeInTheDocument();
    });

    // 测试 imgSrc 变化时重置加载状态
    it("imgSrc 变化时应该重置加载状态", async () => {
      const { container, rerender } = render(
        <Card imgSrc="https://example.com/image1.jpg">测试卡片</Card>
      );

      // 初始应该有 loading
      expect(
        container.querySelector(".csc-card__image-loading")
      ).toBeInTheDocument();

      // 更改 imgSrc
      rerender(
        <Card imgSrc="https://example.com/image2.jpg">测试卡片</Card>
      );

      // 应该重新显示 loading
      expect(
        container.querySelector(".csc-card__image-loading")
      ).toBeInTheDocument();

      const img = container.querySelector("img");
      expect(img).toHaveAttribute("src", "https://example.com/image2.jpg");
    });
  });
});
