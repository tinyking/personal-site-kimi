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
