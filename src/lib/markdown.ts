// 定义博客文章接口
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  date: string;
  readTime: string;
  slug: string;
}

// 从markdown文件动态导入博客文章
// 使用Vite的import.meta.glob特性
const markdownModules = import.meta.glob('../content/posts/**/*.md', { query: '?raw', import: 'default', eager: true });


// 定义gray-matter的类型
interface FrontMatterData {
  [key: string]: string | boolean | string[];
}

interface GrayMatterResult {
  data: FrontMatterData;
  content: string;
  excerpt?: string;
  orig: string;
}

// 解析markdown内容的函数，使用gray-matter
function parseMarkdownWithFrontmatter(markdown: string): GrayMatterResult {
  // 由于在前端环境中无法直接使用gray-matter，我们模拟其功能
  // 在实际的SSR/Node环境中，你会这样使用:
  // const matter = await import('gray-matter');
  // return matter.default(markdown);

  // 模拟gray-matter的行为
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/s;
  const match = markdown.match(frontmatterRegex);

  if (match) {
    const frontmatter = match[1];
    const content = markdown.slice(match[0].length);

    // 解析frontmatter，支持多行值
    const frontmatterObj: FrontMatterData = {};
    const lines = frontmatter.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // 检查是否是缩进的多行内容（continuation of previous field）
      if (line.trim() && line.startsWith(' ')) {
        // 这是上一行的延续，追加到上一个键的值中
        const lastKey = Object.keys(frontmatterObj)[Object.keys(frontmatterObj).length - 1];
        if (lastKey) {
          const currentValue = frontmatterObj[lastKey];
          if (typeof currentValue === 'string') {
            frontmatterObj[lastKey] = currentValue + ' ' + line.trim();
          }
        }
        continue;
      }

      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        let value: any = line.substring(colonIndex + 1).trim();

        // 处理字符串值
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        } else if (value.startsWith("'") && value.endsWith("'")) {
          value = value.slice(1, -1);
        } else if (value === 'true') {
          value = true;
        } else if (value === 'false') {
          value = false;
        } else if (/^\[.*\]$/.test(value)) {
          // 处理数组格式
          try {
            value = JSON.parse(value.replace(/'/g, '"'));
          } catch (e) {
            // 如果解析失败，保持原字符串
          }
        }

        frontmatterObj[key] = value; // 保持原始类型，允许字符串、布尔值或数组
      }
    }

    return { data: frontmatterObj, content, orig: markdown };
  }

  return { data: {}, content: markdown, orig: markdown };
}

// 将导入的markdown文件转换为博客文章数组
console.log('Imported markdown modules:', Object.keys(markdownModules));
const importedBlogPosts: BlogPost[] = Object.entries(markdownModules)
  .filter(([path]) => !path.toLowerCase().endsWith('readme.md'))
  .map(([path, content]) => {
    console.log('Processing file:', path);
    const filename = path.split('/').pop()?.replace('.md', '');

    // 解析markdown内容和frontmatter
    const { data, content: markdownContent } = parseMarkdownWithFrontmatter(content as string);
    console.log('Parsed frontmatter data:', data);

    // 从文件名或frontmatter中提取slug
    const slug = typeof data.slug === 'string' ? data.slug : (filename || 'unknown');

    const blogPost: BlogPost = {
      id: typeof data.id === 'string' ? data.id : slug,
      title: typeof data.title === 'string' ? data.title : slug.replace(/-/g, ' '),
      excerpt: typeof data.excerpt === 'string' ? data.excerpt : '这是文章摘要',
      content: markdownContent,
      category: typeof data.category === 'string' ? data.category : '默认分类',
      tags: Array.isArray(data.tags) ? data.tags as string[] : (typeof data.tags === 'string' ? (() => {
        try {
          return JSON.parse(data.tags.replace(/'/g, '"'));
        } catch (e) {
          console.error(`Error parsing tags: ${data.tags}`, e);
          return [];
        }
      })() : []),
      date: typeof data.date === 'string' ? data.date : '2026-01-01',
      readTime: typeof data.readTime === 'string' ? data.readTime : '5分钟',
      slug: slug,
    };

    console.log('Created blog post:', blogPost.title, blogPost.slug);
    return blogPost;
  });

console.log('Total imported blog posts:', importedBlogPosts.length);

// 只使用来自markdown文件的博客文章
const allBlogPosts = importedBlogPosts;

/**
 * 获取所有博客文章
 */
export function getAllBlogPosts(): BlogPost[] {
  return allBlogPosts;
}

/**
 * 根据slug获取特定博客文章
 */
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return allBlogPosts.find(post => post.slug === slug);
}
