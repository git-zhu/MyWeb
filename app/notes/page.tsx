import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default async function NotesPage() {
  const notesRoot = path.join(process.cwd(), 'content/notes');
  const categories = fs.existsSync(notesRoot)
    ? fs
        .readdirSync(notesRoot, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
    : [];

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">笔记分类</h1>
        <p className="text-sm text-slate-600">
          按主题对零散笔记做归档，方便快速查找与回顾。
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/notes/${cat}`}
            className="group rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
          >
            <h2 className="text-base font-semibold group-hover:text-sky-600">
              {cat}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              查看该分类下的所有笔记
            </p>
          </Link>
        ))}
        {categories.length === 0 && (
          <p className="text-sm text-slate-600">
            暂时还没有创建任何笔记分类，可以在 <code>content/notes</code>{' '}
            下新建子目录与 Markdown 文件。
          </p>
        )}
      </div>
    </section>
  );
}

