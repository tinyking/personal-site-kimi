// 项目数据
export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  date: string;
  order: number;
}

export const projects: Project[] = [
  {
    id: 'smart-writing-assistant',
    title: '智能写作助手',
    description: '基于大语言模型的Markdown编辑器，支持实时续写与润色',
    techStack: ['Next.js', 'Go', 'OpenAI API', 'PostgreSQL'],
    githubUrl: 'https://github.com',
    demoUrl: 'https://demo.example.com',
    date: '2025-12-01',
    order: 1,
  },
  {
    id: 'data-visualization-platform',
    title: '数据可视化平台',
    description: '企业级实时数据仪表盘，支持百万级数据渲染',
    techStack: ['Vue', 'D3.js', 'Node.js', 'Redis'],
    githubUrl: 'https://github.com',
    date: '2025-10-15',
    order: 2,
  },
  {
    id: 'open-source-component-library',
    title: '开源组件库',
    description: '面向B端产品的React组件库，包含50+高质量组件',
    techStack: ['TypeScript', 'React', 'Storybook', 'Vite'],
    githubUrl: 'https://github.com',
    demoUrl: 'https://storybook.example.com',
    date: '2025-08-20',
    order: 3,
  },
  {
    id: 'ai-dialogue-system',
    title: 'AI对话系统',
    description: '智能客服对话引擎，支持多轮对话与知识库检索',
    techStack: ['Python', 'FastAPI', 'LangChain', 'MongoDB'],
    githubUrl: 'https://github.com',
    date: '2025-06-10',
    order: 4,
  },
  {
    id: 'personal-knowledge-base',
    title: '个人知识库',
    description: '双链笔记系统，支持Markdown导入与全文搜索',
    techStack: ['Next.js', 'PostgreSQL', 'Prisma', 'Elasticsearch'],
    githubUrl: 'https://github.com',
    demoUrl: 'https://notes.example.com',
    date: '2025-04-05',
    order: 5,
  },
];

// 博客文章数据
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

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '从0到1构建AI产品',
    excerpt: '探讨如何将大语言模型技术转化为用户价值，分享我在智能写作助手项目中的实践经验与踩坑记录。',
    content: `# 从0到1构建AI产品

## 引言

在过去的两年里，大语言模型（LLM）技术经历了爆发式的发展。作为技术产品创作者，我深刻体会到将这项前沿技术转化为实际产品所面临的挑战与机遇。

## 产品定位

智能写作助手的核心理念是：**让AI成为创作的伙伴，而非替代者**。

我们选择了Markdown编辑器作为切入点，因为：
- 目标用户群体明确（开发者、技术写作者、内容创作者）
- 编辑场景清晰，AI辅助的价值明确
- 技术实现相对可控

## 技术架构

### 前端层
- **框架**: Next.js 14 + React Server Components
- **编辑器**: 基于Slate.js自研，支持协同编辑
- **状态管理**: Zustand + React Query

### 后端层
- **API服务**: Go + Gin框架
- **AI服务**: Python + FastAPI，封装OpenAI/Claude API
- **数据库**: PostgreSQL + Redis缓存

### 部署架构
- **前端**: Vercel Edge Network
- **后端**: AWS ECS + Auto Scaling
- **数据库**: AWS RDS + Read Replicas

## 核心功能实现

### 1. 实时续写

通过WebSocket建立长连接，实现流式响应：

\`\`\`typescript
// 简化的核心逻辑
const streamCompletion = async (prompt: string) => {
  const response = await fetch('/api/complete', {
    method: 'POST',
    body: JSON.stringify({ prompt }),
  });
  
  const reader = response.body?.getReader();
  while (reader) {
    const { done, value } = await reader.read();
    if (done) break;
    // 逐字渲染到编辑器
    appendTextToEditor(decoder.decode(value));
  }
};
\`\`\`

### 2. 智能润色

润色功能需要平衡AI创造性与用户意图：
- 提供多种润色风格（正式、简洁、生动）
- 支持选择性应用，用户可以只采纳部分修改
- 保留修改历史，支持一键回退

### 3. 上下文理解

通过RAG（检索增强生成）技术，让AI理解用户的知识库：
- 自动索引用户文档
- 实时检索相关上下文
- 动态构建prompt

## 踩坑记录

### 1. 延迟问题

**问题**: 首次响应时间长达3-5秒，用户体验极差。

**解决方案**:
- 实现prompt缓存，相似请求直接返回缓存结果
- 使用流式响应，让用户感知到"AI在思考"
- 预加载常用场景的响应模板

### 2. 成本控制

**问题**: AI API调用成本超出预期。

**解决方案**:
- 实现智能降级策略，根据用户等级分配不同模型
- 引入本地小模型处理简单任务
- 建立用量监控和预警机制

### 3. 内容安全

**问题**: AI可能生成不当内容。

**解决方案**:
- 多层内容过滤：输入过滤、输出过滤、人工审核
- 建立敏感词库和规则引擎
- 实现用户举报和快速响应机制

## 数据表现

上线6个月后的关键指标：
- 日活跃用户：3,500+
- 平均使用时长：28分钟
- 用户留存率（7日）：45%
- NPS评分：52

## 未来规划

1. **多模态支持**: 集成图像生成和理解能力
2. **团队协作**: 支持多人实时协同编辑
3. **插件生态**: 开放API，支持第三方插件

## 结语

构建AI产品是一个持续迭代的过程。技术只是基础，真正重要的是理解用户需求，找到技术与价值的平衡点。

希望这篇文章对你有所帮助。如果你也在构建AI产品，欢迎交流讨论。`,
    category: '产品思考',
    tags: ['AI', '产品', '创业'],
    date: '2026-01-15',
    readTime: '8分钟',
    slug: 'building-ai-product-from-scratch',
  },
  {
    id: '2',
    title: '我的2025年度技术栈',
    excerpt: '回顾过去一年在前后端架构、数据库选型、部署运维等方面的工具选择和使用心得。',
    content: `# 我的2025年度技术栈

## 前言

2025年是技术快速迭代的一年。作为全栈开发者，我在多个项目中尝试了不同的技术组合。这篇文章总结了我过去一年的技术选型和使用体验。

## 前端技术栈

### 框架选择

**Next.js 14** 是我的首选框架：
- App Router带来的全新开发体验
- React Server Components减少客户端bundle体积
- 内置的优化（图片、字体、脚本）

### 状态管理

从Redux迁移到 **Zustand**：
- 更简洁的API，学习成本低
- 更好的TypeScript支持
- 体积小巧（仅1KB）

### UI组件

**shadcn/ui** 成为我的默认选择：
- 基于Radix UI，可访问性好
- 代码完全可控，易于定制
- 与Tailwind CSS完美融合

### 样式方案

**Tailwind CSS** 依然是最佳实践：
- 开发效率极高
- 设计系统一致性
- 生产环境自动优化

## 后端技术栈

### API框架

根据场景选择：
- **Go + Gin**: 高性能API服务
- **Python + FastAPI**: 快速原型和AI相关服务
- **Node.js + NestJS**: 全栈TypeScript项目

### 数据库

**PostgreSQL** 是关系型数据库的首选：
- 功能强大，支持JSON和全文搜索
- 性能优异，扩展性好
- 云服务商支持完善

**Redis** 用于缓存和实时场景：
- 会话存储
- 速率限制
- 实时排行榜

### ORM

**Prisma** 改变了我的数据库开发方式：
- 类型安全的查询
- 自动迁移管理
- 优秀的开发体验

## 部署运维

### 云平台

**AWS** 是企业级应用的首选：
- ECS + Fargate 运行容器
- RDS 托管数据库
- CloudFront CDN加速

**Vercel** 用于前端部署：
- 与Next.js完美集成
- 边缘网络全球加速
- 预览环境自动化

### CI/CD

**GitHub Actions** 构建自动化流程：
- 代码提交自动触发构建
- 自动化测试和代码检查
- 一键部署到生产环境

### 监控

**Datadog** 提供全方位监控：
- APM性能追踪
- 日志聚合和分析
- 自定义告警规则

## 开发工具

### 编辑器

**Cursor** 成为我的主力编辑器：
- AI辅助编程提升效率
- 基于VS Code，生态丰富
- 智能代码补全和重构

### 终端

**Warp** 带来全新的终端体验：
- 现代UI设计
- AI命令建议
- 团队协作功能

### 设计

**Figma** 依然是设计协作的标准：
- 实时协作
- 组件化设计系统
- 开发者交付便捷

## 2026年展望

### 值得关注的技术

1. **WebAssembly**: 浏览器端性能突破
2. **Edge Computing**: 边缘计算场景扩展
3. **Local AI**: 端侧AI模型部署

### 学习计划

1. 深入学习Rust，用于性能关键场景
2. 探索Kubernetes，提升运维能力
3. 研究LLM微调，构建垂直领域模型

## 结语

技术选型没有银弹，关键是根据项目需求、团队能力和长期维护成本做出平衡的选择。希望我的分享对你有所启发。`,
    category: '技术实践',
    tags: ['技术栈', '全栈', '架构'],
    date: '2026-01-08',
    readTime: '12分钟',
    slug: 'my-2025-tech-stack',
  },
  {
    id: '3',
    title: '《黑客与画家》读后感',
    excerpt: '保罗·格雷厄姆的经典之作，关于编程、创业与创造力的深刻思考，以及对我个人职业路径的启发。',
    content: `# 《黑客与画家》读后感

## 关于本书

《黑客与画家》是Y Combinator创始人保罗·格雷厄姆的散文集，收录了他关于编程、创业、设计和技术文化的多篇经典文章。这本书不仅改变了很多人对编程的认知，也深刻影响了我的职业发展路径。

## 核心观点

### 1. 黑客与画家的相似性

格雷厄姆将黑客（优秀的程序员）与画家类比：
- **都是创作者**: 两者都在创造美的作品
- **都需要实践**: 编程和绘画一样，需要大量练习
- **都追求简洁**: 好的代码和好的画作一样，简洁而有力

这让我重新思考编程的本质——它不仅是工程实践，更是一门艺术。

### 2. 创业的本质

关于创业，格雷厄姆的核心观点是：
- **解决真实问题**: 成功的创业公司都在解决真正的问题
- **快速迭代**: 通过快速发布和反馈循环找到正确方向
- **技术壁垒**: 技术深度是创业公司的核心竞争力

### 3. 设计的重要性

书中强调：
> "设计不仅仅是外观，更是运作方式。"

好的设计是：
- **简单的**: 去掉一切不必要的元素
- **永恒的**: 不追随潮流
- **解决问题的**: 功能优先

## 对我的启发

### 职业选择

这本书坚定了我走技术产品路线的决心：
- 不仅要写好代码，更要理解用户需求
- 技术能力是基础，产品思维是放大器
- 创业是一种生活方式，而非终点

### 编程哲学

改变了我的编程习惯：
- 追求代码的简洁和优雅
- 重视命名和注释的质量
- 把重构作为日常开发的一部分

### 创业思考

虽然还没有创业，但书中的理念影响了我日常工作的方方面面：
- 像创始人一样思考，而不仅是执行者
- 关注价值创造，而非功能堆砌
- 快速验证想法，避免完美主义陷阱

## 经典语录

> "编程语言是程序员用来思考的程序，而不是用来表达已思考内容的工具。"

> "创业公司就是压缩的人生，在几年内经历正常情况下几十年的起伏。"

> "好的设计是简单的设计，从数学到绘画，你都能看到这一点。"

> "创造财富不是从别人那里拿钱，而是创造出新的价值。"

## 推荐理由

如果你：
- 是一名程序员，想提升对编程本质的理解
- 对创业感兴趣，想了解硅谷的创业文化
- 关心技术与社会的关系

这本书都值得一读。它不是技术书籍，却能让你成为更好的技术人员。

## 结语

《黑客与画家》不是一本读一遍就放下的小说，而是一本可以反复阅读、每次都有新收获的经典。它让我明白，技术不仅是谋生的工具，更是改变世界的方式。

正如格雷厄姆所说：
> "选择工作的唯一标准是，你是否对它充满热情。"

愿我们都能找到让自己充满热情的事业。`,
    category: '读书笔记',
    tags: ['读书', '创业', '编程'],
    date: '2025-12-20',
    readTime: '6分钟',
    slug: 'hackers-and-painters-review',
  },
  {
    id: '4',
    title: '代码重构的艺术',
    excerpt: '如何在保证业务连续性的前提下，对遗留代码进行渐进式重构，提升可维护性。',
    content: `# 代码重构的艺术

## 什么是重构

重构是在不改变代码外在行为的前提下，对代码内部结构进行修改，以提高其可理解性和降低修改成本。

## 为什么需要重构

### 技术债务的代价

- 新功能开发越来越慢
- Bug修复时间越来越长
- 新人上手成本越来越高
- 系统稳定性越来越差

### 重构的收益

- 提高代码可读性
- 降低维护成本
- 便于添加新功能
- 减少Bug产生

## 重构的原则

### 1. 小步快跑

每次只做一个小改动，确保测试通过后继续下一步。

### 2. 保持测试覆盖

重构前确保有充分的测试覆盖，重构过程中持续运行测试。

### 3. 代码异味识别

学会识别需要重构的信号：
- 过长的函数
- 重复代码
- 过大的类
- 过长的参数列表
- 分散的修改点

## 重构技术

### 提取函数

将长函数拆分成多个小函数：

\`\`\`typescript
// 重构前
function processOrder(order: Order) {
  // 验证订单
  if (!order.items || order.items.length === 0) {
    throw new Error('订单不能为空');
  }
  // 计算总价
  let total = 0;
  for (const item of order.items) {
    total += item.price * item.quantity;
  }
  // 应用折扣
  if (order.coupon) {
    total *= (1 - order.coupon.discount);
  }
  // 保存订单
  database.save(order);
}

// 重构后
function processOrder(order: Order) {
  validateOrder(order);
  const total = calculateTotal(order);
  database.save({ ...order, total });
}

function validateOrder(order: Order) {
  if (!order.items?.length) {
    throw new Error('订单不能为空');
  }
}

function calculateTotal(order: Order): number {
  const subtotal = order.items.reduce((sum, item) => 
    sum + item.price * item.quantity, 0
  );
  return applyDiscount(subtotal, order.coupon);
}
\`\`\`

### 消除重复

提取公共逻辑：

\`\`\`typescript
// 重构前
function getUserName(userId: string) {
  const user = database.findUser(userId);
  if (!user) {
    throw new Error('用户不存在');
  }
  return user.name;
}

function getUserEmail(userId: string) {
  const user = database.findUser(userId);
  if (!user) {
    throw new Error('用户不存在');
  }
  return user.email;
}

// 重构后
function getUser(userId: string): User {
  const user = database.findUser(userId);
  if (!user) {
    throw new Error('用户不存在');
  }
  return user;
}

function getUserName(userId: string) {
  return getUser(userId).name;
}

function getUserEmail(userId: string) {
  return getUser(userId).email;
}
\`\`\`

### 引入设计模式

合理使用设计模式解决常见问题：

\`\`\`typescript
// 策略模式示例
interface PaymentStrategy {
  pay(amount: number): Promise<void>;
}

class AlipayStrategy implements PaymentStrategy {
  async pay(amount: number) {
    // 支付宝支付逻辑
  }
}

class WechatStrategy implements PaymentStrategy {
  async pay(amount: number) {
    // 微信支付逻辑
  }
}

class PaymentContext {
  constructor(private strategy: PaymentStrategy) {}
  
  async executePayment(amount: number) {
    return this.strategy.pay(amount);
  }
}
\`\`\`

## 重构流程

### 1. 识别问题

通过代码审查、性能分析、开发反馈等方式发现问题区域。

### 2. 制定计划

- 确定重构范围
- 评估风险和收益
- 制定回滚方案

### 3. 准备测试

- 补充缺失的测试
- 确保测试覆盖率
- 设置自动化测试流水线

### 4. 执行重构

- 小步提交
- 持续运行测试
- 及时回滚问题

### 5. 验证结果

- 功能测试
- 性能测试
- 代码审查

## 重构的时机

### 适合重构的情况

- 添加新功能前
- 修复Bug时
- 代码审查发现问题时
- 技术债务积累到一定程度

### 不适合重构的情况

- 项目即将发布
- 没有测试覆盖
- 时间压力极大
- 重构收益不明确

## 团队实践

### 代码审查

将重构作为代码审查的常规环节：
- 审查时关注代码异味
- 鼓励小范围重构
- 分享重构经验

### 重构日

定期安排重构时间：
- 每周固定时间
- 团队共同参与
- 聚焦高优先级债务

### 文档记录

记录重构决策：
- 重构原因
- 重构方案
- 经验教训

## 结语

重构不是一次性任务，而是持续的过程。优秀的代码不是一次写成的，而是通过不断重构进化而来的。

正如Martin Fowler所说：
> "任何一个傻瓜都能写出计算机可以理解的代码，只有优秀的程序员才能写出人类可以理解的代码。"

愿我们的代码都能成为艺术品。`,
    category: '技术实践',
    tags: ['重构', '代码质量', '工程实践'],
    date: '2025-12-10',
    readTime: '10分钟',
    slug: 'art-of-code-refactoring',
  },
];

// 日记数据
export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  title?: string;
}

export const journalEntries: JournalEntry[] = [
  {
    id: '1',
    date: '2026-01-30',
    content: '今天完成了个人网站的设计文档，深蓝配金色的方案既有技术感又不失人文气质。期待看到最终效果。晚上读了会儿《庄子》，"技进乎道"的理念与我的职业追求不谋而合。',
  },
  {
    id: '2',
    date: '2026-01-28',
    content: '智能写作助手的用户突破4000人，这是一个小小的里程碑。用户反馈中最有价值的是那些"吐槽"——它们指向了真正的改进方向。下午和团队讨论了下一阶段的规划，多模态支持是重点。',
  },
  {
    id: '3',
    date: '2026-01-25',
    content: '周末重读了《黑客与画家》，常读常新。这次特别关注了他对创业公司的描述——"压缩的人生"。确实，创业这几年经历的起伏，可能比正常工作十年还多。但这种高密度的生活，正是它的魅力所在。',
  },
  {
    id: '4',
    date: '2026-01-22',
    content: '重构了项目中的支付模块，将300行的巨型函数拆分成十几个小函数。代码行数没变，但可读性提升了一个量级。重构的过程就像整理房间，开始时觉得麻烦，完成后心情大好。',
  },
  {
    id: '5',
    date: '2026-01-20',
    content: '尝试用Rust写了一个高性能的文本处理工具，性能确实惊人。但学习曲线也很陡峭，所有权系统花了整整一周才稍微理解。不过这种底层的掌控感，是高级语言给不了的。',
  },
  {
    id: '6',
    date: '2026-01-18',
    content: '今天和一个潜在客户聊了两个小时，他们对AI写作助手很感兴趣，但担心的是数据安全问题。这提醒我在产品设计中，安全和隐私不能是事后考虑，而应该是核心架构的一部分。',
  },
  {
    id: '7',
    date: '2026-01-15',
    content: '发布了新博客《从0到1构建AI产品》，收到了很多有价值的反馈。写作是最好的思考方式，它迫使你把模糊的想法整理成清晰的逻辑。坚持写作，就是坚持思考。',
  },
  {
    id: '8',
    date: '2026-01-12',
    content: '周末去爬山，山顶的景色让人心旷神怡。技术工作容易让人陷入细节，偶尔抽离出来看看大局，反而能找到更好的解决方案。所谓"不识庐山真面目，只缘身在此山中"。',
  },
  {
    id: '9',
    date: '2026-01-10',
    content: '开始规划个人品牌网站，想做一个既有极客技术感又有国学人文气质的设计。深蓝配金色应该不错，像深夜中的星光，沉稳中带着希望。',
  },
  {
    id: '10',
    date: '2026-01-08',
    content: '整理了2025年的技术栈，发现变化真的很大。从Vue转向React，从REST到GraphQL，从传统服务器到Serverless。技术在变，但核心能力——解决问题、持续学习——始终不变。',
  },
];

// 关于我页面数据
export const aboutData = {
  name: '爱语霖',
  title: '技术产品创作者',
  bio: '融合极客技术感与国学人文气质，专注于AI产品研发与全栈开发。相信技术应当服务于人，代码应当如诗如画。',
  avatar: '/avatar.jpg',
  quote: '代码即诗，产品即画',
  skills: [
    { name: '前端开发', level: 90, items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
    { name: '后端架构', level: 85, items: ['Go', 'Node.js', 'Python', 'PostgreSQL'] },
    { name: '产品设计', level: 80, items: ['UX设计', '产品规划', '用户研究', '数据分析'] },
    { name: 'AI应用', level: 75, items: ['LLM应用', 'Prompt工程', 'RAG系统', '模型微调'] },
  ],
  experience: [
    {
      company: '独立开发者',
      position: '创始人',
      period: '2024 - 至今',
      description: [
        '独立开发并运营智能写作助手，服务4000+用户',
        '开源多个技术项目，GitHub累计获得2000+ Stars',
        '撰写技术博客，分享产品思考与实践经验',
      ],
    },
    {
      company: '某AI创业公司',
      position: '技术负责人',
      period: '2022 - 2024',
      description: [
        '带领10人技术团队，负责产品架构设计与技术选型',
        '设计并实现企业级AI对话系统，服务50+企业客户',
        '建立技术规范与Code Review机制，提升团队效率',
      ],
    },
    {
      company: '某互联网大厂',
      position: '高级前端工程师',
      period: '2019 - 2022',
      description: [
        '负责核心B端产品的前端架构设计与开发',
        '主导组件库建设，提升团队开发效率30%',
        '参与技术面试，帮助团队招聘优秀工程师',
      ],
    },
  ],
  education: [
    {
      school: '某985大学',
      major: '计算机科学与技术',
      degree: '本科',
      period: '2015 - 2019',
    },
  ],
  social: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    email: 'hello@yulin.dev',
  },
};
