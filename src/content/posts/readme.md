# 博客文章指南

## 文件位置

所有博客文章都放在 `/src/content/posts/` 目录下，使用 `.md` 或 `.markdown` 作为文件扩展名。

## 文件格式

每个博客文章必须包含以下 YAML frontmatter 配置：

```yaml
---
id: 1
title: 文章标题
excerpt: 文章摘要
category: 分类
tags: ["标签1", "标签2"]
date: "YYYY-MM-DD"
readTime: "阅读时间"
slug: 文章别名
---
```

## 示例

```markdown
---
id: 1
title: 从0到1构建AI产品
excerpt: 探讨如何将大语言模型技术转化为用户价值
category: 产品思考
tags: ["AI", "产品", "创业"]
date: "2026-01-15"
readTime: "8分钟"
slug: building-ai-product-from-scratch
---

# 从0到1构建AI产品

这里是正文内容...

## 标题2

更多内容...
```

## 注意事项

1. `id` 和 `slug` 必须唯一
2. `tags` 是一个字符串数组
3. `date` 格式为 "YYYY-MM-DD"
4. `readTime` 格式为 "数字+单位"，如 "5分钟"、"1小时"
5. 正文部分使用标准 Markdown 语法