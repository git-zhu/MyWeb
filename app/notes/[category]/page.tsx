import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';

type Props = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  const notesRoot = path.join(process.cwd(), 'content/notes');
  if (!fs.existsSync(notesRoot)) return [];

  const categories = fs
    .readdirSync(notesRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  return categories.map((category) => ({ category }));
}

export default async function NoteCategoryPage({ params }: Props) {
  const { category } = await params;
  if (!category) return notFound();
  const categoryDir = path.join(process.cwd(), 'content/notes', category);

  if (!fs.existsSync(categoryDir)) {
    return <div>暂无此分类内容。</div>;
  }

  const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith('.md'));

  const notes = files.map((file) => {
    const filePath = path.join(categoryDir, file);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(raw);
    return {
      slug: file.replace(/\.md$/, ''),
      ...data,
    } as any;
  });

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">笔记：{category}</h1>
      <ul className="space-y-2">
        {notes.map((note: any) => (
          <li key={note.slug}>
            <Link
              href={`/notes/${category}/${note.slug}`}
              className="text-sky-600 hover:underline"
            >
              {note.title ?? note.slug}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

