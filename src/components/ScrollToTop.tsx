import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 页面跳转时自动滚动到顶部的组件
 * 监听路由变化，当路径改变时将页面滚动到顶部
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 每次路由变化时滚动到页面顶部
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // 平滑滚动效果
    });
  }, [pathname]); // 当pathname变化时触发

  return null; // 这是一个无渲染组件
}