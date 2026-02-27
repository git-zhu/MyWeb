export type NavItem = {
  key: string;
  label: string;
  href: string;
  exact?: boolean;
  // 二级菜单（可选）
  children?: {
    key: string;
    label: string;
    href: string;
  }[];
  enabled?: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  { key: 'home', label: '主页', href: '/', exact: true },
  {
    key: 'blog',
    label: '博客',
    href: '/blog',
  },
  {
    key: 'notes',
    label: '笔记',
    href: '/notes',
    children: [
      { key: 'notes-tech', label: '技术笔记', href: '/notes/tech' },
      { key: 'notes-life', label: '生活笔记', href: '/notes/life' },
      { key: 'notes-study', label: '学习笔记', href: '/notes/study' },
    ],
  },
  {
    key: 'bookmarks',
    label: '收藏网站',
    href: '/bookmarks',
    children: [
      { key: 'bm-dev', label: '开发相关', href: '/bookmarks?cat=开发' },
      { key: 'bm-design', label: '设计相关', href: '/bookmarks?cat=设计' },
      { key: 'bm-tools', label: '效率工具', href: '/bookmarks?cat=效率' },
    ],
  },
  { key: 'work', label: '工作相关', href: '/work' },
];

