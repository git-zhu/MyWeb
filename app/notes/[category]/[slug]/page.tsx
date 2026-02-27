import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';

type Props = { params: Promise<{ category: string; slug: string }> };

export async function generateStaticParams() {
  const notesRoot = path.join(process.cwd(), 'content/notes');
  if (!fs.existsSync(notesRoot)) return [];

  const categories = fs
    .readdirSync(notesRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const all: { category: string; slug: string }[] = [];

  for (const category of categories) {
    const categoryDir = path.join(notesRoot, category);
    const files = fs
      .readdirSync(categoryDir)
      .filter((f) => f.endsWith('.md'))
      .map((file) => ({
        category,
        slug: file.replace(/\.md$/, ''),
      }));
    all.push(...files);
  }

  return all;
}

export default async function NoteDetailPage({ params }: Props) {
  const { category, slug } = await params;

  const filePath = path.join(
    process.cwd(),
    'content/notes',
    category,
    `${slug}.md`,
  );

  if (!fs.existsSync(filePath)) {
    return notFound();
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">{data.title ?? slug}</h1>
        {data.date && (
          <p className="mt-1 text-sm text-slate-500">{data.date}</p>
        )}
      </header>
      <MarkdownRenderer html={content} />
    </section>
  );
}

