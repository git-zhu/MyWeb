import Link from 'next/link';
import { getBlogPosts } from '@/lib/markdown/getContentByType';

export default async function BlogListPage() {
  const posts = await getBlogPosts();

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">博客文章</h1>
        <p className="text-sm text-slate-600">
          按时间倒序排列，记录最近的思考与产出。
        </p>
      </header>
      <ul className="divide-y rounded-2xl border bg-white/80">
        {posts.map((post: any) => (
          <li key={post.slug} className="px-4 py-3 first:rounded-t-2xl last:rounded-b-2xl">
            <Link
              href={`/blog/${post.slug}`}
              className="text-sm font-medium text-slate-900 hover:text-sky-600"
            >
              {post.title}
            </Link>
            {post.date && (
              <span className="ml-2 text-xs text-slate-400">{post.date}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

