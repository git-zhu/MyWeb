import Link from 'next/link';
import { getMarkdownFiles } from '@/lib/markdown/getMarkdownFiles';
import { parseMarkdownFile } from '@/lib/markdown/parseMarkdown';

export default async function WorkPage() {
  const files = getMarkdownFiles('content/work');
  const posts = await Promise.all(
    files.map(async (file) => {
      const { frontmatter } = await parseMarkdownFile(file.filePath);
      return { slug: file.slug, ...frontmatter } as any;
    }),
  );

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">工作相关</h1>
        <p className="text-sm text-slate-600">
          记录项目实践、经验总结与职业发展思考。
        </p>
      </header>
      <ul className="space-y-2">
        {posts.map((post: any) => (
          <li key={post.slug}>
            <Link
              href={`/work/${post.slug}`}
              className="text-sm font-medium text-slate-900 hover:text-sky-600"
            >
              {post.title ?? post.slug}
            </Link>
          </li>
        ))}
        {posts.length === 0 && (
          <li className="text-sm text-slate-600">暂时还没有工作相关内容。</li>
        )}
      </ul>
    </section>
  );
}

