export type BookmarkCategory = '开发' | '设计' | '效率' | '其他';

export type Bookmark = {
  id: string;
  name: string;
  url: string;
  description: string;
  category: BookmarkCategory;
};

export const bookmarks: Bookmark[] = [
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com',
    description: '代码托管与协作平台。',
    category: '开发',
  },
  {
    id: 'figma',
    name: 'Figma',
    url: 'https://figma.com',
    description: '在线设计与协作工具。',
    category: '设计',
  },
  {
    id: 'stack-overflow',
    name: 'Stack Overflow',
    url: 'https://stackoverflow.com',
    description: '编程问答社区，快速查找解决方案。',
    category: '开发',
  },
  {
    id: 'mdn',
    name: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    description: '权威 Web 技术文档，前端查询必备。',
    category: '开发',
  },
  {
    id: 'dribbble',
    name: 'Dribbble',
    url: 'https://dribbble.com',
    description: '设计作品展示平台，获取视觉灵感。',
    category: '设计',
  },
  {
    id: 'notion',
    name: 'Notion',
    url: 'https://www.notion.so',
    description: '集文档、数据库于一体的知识管理工具。',
    category: '效率',
  },
  {
    id: 'raycast',
    name: 'Raycast Extensions',
    url: 'https://www.raycast.com/store',
    description: '桌面快速启动器扩展市场，提升日常效率。',
    category: '效率',
  },
  {
    id: 'product-hunt',
    name: 'Product Hunt',
    url: 'https://www.producthunt.com',
    description: '发现每天最新发布的产品和工具。',
    category: '其他',
  },
];

