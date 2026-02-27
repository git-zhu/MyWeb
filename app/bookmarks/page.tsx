import { Suspense } from 'react';
import { bookmarks } from '@/lib/bookmarks';
import { BookmarksView } from '@/components/bookmarks/BookmarksView';

export default function BookmarksPage() {
  // 静态导出时渲染全量列表，分类筛选放到客户端完成
  return (
    <Suspense fallback={<section className="space-y-4 text-sm text-slate-500">正在加载收藏网站...</section>}>
      <BookmarksView bookmarks={bookmarks} />
    </Suspense>
  );
}



