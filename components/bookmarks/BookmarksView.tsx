'use client';

import { useSearchParams } from 'next/navigation';
import type { Bookmark } from '@/lib/bookmarks';

type Props = {
  bookmarks: Bookmark[];
};

export function BookmarksView({ bookmarks }: Props) {
  const searchParams = useSearchParams();
  const cat = searchParams.get('cat') || undefined;
  const activeCategory = cat ? decodeURIComponent(cat) : undefined;

  const grouped = bookmarks.reduce<Record<string, Bookmark[]>>((acc, b) => {
    acc[b.category] = acc[b.category] || [];
    acc[b.category].push(b);
    return acc;
  }, {});

  const entries = Object.entries(grouped).filter(([category]) =>
    activeCategory ? category === activeCategory : true,
  );

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">收藏网站</h1>
        {activeCategory && (
          <p className="text-sm text-slate-600">
            当前分类：<span className="font-medium">{activeCategory}</span>
          </p>
        )}
      </header>

      {entries.map(([category, items]) => (
        <div key={category} className="space-y-2">
          {!activeCategory && (
            <h2 className="text-xl font-semibold">{category}</h2>
          )}
          <div className="grid gap-3 md:grid-cols-2">
            {items.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
              >
                <span className="text-sm font-semibold group-hover:text-sky-600">
                  {item.name}
                </span>
                <span className="mt-1 text-xs text-slate-500">
                  {item.url}
                </span>
                <span className="mt-2 text-sm text-slate-600">
                  {item.description}
                </span>
              </a>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

