import '../styles/globals.css';
import type { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';

export const metadata = {
  title: 'My Personal Site',
  description: '个人博客 / 笔记 / 收藏 / 工作相关',
  icons: {
    icon: '/zhu.ico',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="page-shell">
          <Header />
          <main className="page-main">{children}</main>
          <footer className="page-footer">
            © {new Date().getFullYear()} My Personal Site · 记录与分享
          </footer>
        </div>
      </body>
    </html>
  );
}

