import Link from 'next/link';
import { getBlogPosts } from '@/lib/markdown/getContentByType';

export default async function HomePage() {
  const posts = await getBlogPosts();

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-600">
          Personal Site
        </p>
        <h1 className="text-3xl font-bold tracking-tight">
          记录技术、笔记与生活
        </h1>
        <p className="max-w-2xl text-sm text-slate-600">
          这里是我的个人知识库与成长记录，包含博客文章、分类笔记、工作总结与日常收藏。
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {posts.map((post: any) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
          >
            <h2 className="text-base font-semibold group-hover:text-sky-600">
              {post.title}
            </h2>
            <p className="mt-1 text-xs text-slate-400">{post.date}</p>
            {post.summary && (
              <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                {post.summary}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}

