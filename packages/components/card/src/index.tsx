import React, { useState, useEffect } from "react";
import { cn } from "@csc-react-components/utils";

/**
 * 图片加载状态类型
 */
type ImageLoadStatus = "loading" | "loaded" | "error";

/**
 * Card 组件属性接口
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 卡片宽度（单位：px） */
  width?: number;
  /** 卡片图片地址 */
  imgSrc?: string;
  /** 卡片图片的高度（单位：px） */
  imgHeight?: number;
  /** 卡片的概要（支持字符串或 React 节点） */
  summary?: string | React.ReactNode;
}

/**
 * Card 卡片组件
 * 支持自定义宽度、图片和概要内容
 * 图片加载过程中会显示 loading 效果，加载完成后显示图片
 * 卡片高度根据内容自适应，当设置了 imgHeight 时图片高度固定，否则根据图片原始尺寸自适应
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (props, ref) => {
    const {
      width = 0,
      imgSrc,
      imgHeight = 0,
      summary,
      className,
      children,
      ...rest
    } = props;

    // 图片加载状态管理
    // loading: 图片正在加载中
    // loaded: 图片加载完成
    // error: 图片加载失败
    const [imageStatus, setImageStatus] = useState<ImageLoadStatus>("loading");

    // 当 imgSrc 变化时，重置加载状态
    useEffect(() => {
      if (imgSrc) {
        setImageStatus("loading");
      }
    }, [imgSrc]);

    // 图片加载成功处理
    const handleImageLoad = () => {
      setImageStatus("loaded");
    };

    // 图片加载失败处理
    const handleImageError = () => {
      setImageStatus("error");
    };

    // 构建类名，使用 clsx 处理条件类名
    const classNames = cn("csc-card", className);

    // 构建样式对象
    const style: React.CSSProperties = {
      ...rest.style,
      ...(width > 0 && { width: `${width}px` }),
    };

    return (
      <div ref={ref} className={classNames} style={style} {...rest}>
        {imgSrc && (
          <div
            className={cn(
              "csc-card__image",
              imgHeight > 0 && "csc-card__image--fixed-height"
            )}
            style={imgHeight > 0 ? { height: `${imgHeight}px` } : undefined}
          >
            {/* 图片加载中的 loading 效果 */}
            {imageStatus === "loading" && (
              <div className="csc-card__image-loading">
                <div className="csc-card__image-skeleton"></div>
              </div>
            )}
            {/* 图片加载失败时的占位符 */}
            {imageStatus === "error" && (
              <div className="csc-card__image-error">
                <span>图片加载失败</span>
              </div>
            )}
            {/* 图片元素，加载完成后显示 */}
            <img
              src={imgSrc}
              alt=""
              onLoad={handleImageLoad}
              onError={handleImageError}
              className={cn(
                "csc-card__image-element",
                imageStatus === "loaded" && "csc-card__image-loaded",
                imageStatus !== "loaded" && "csc-card__image-hidden"
              )}
            />
          </div>
        )}
        {summary && (
          <div className="csc-card__summary">
            {typeof summary === "string" ? <p>{summary}</p> : summary}
          </div>
        )}
        {children && <div className="csc-card__content">{children}</div>}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
