import { notFound } from 'next/navigation';
import { getMarkdownFiles } from '@/lib/markdown/getMarkdownFiles';
import { parseMarkdownFile } from '@/lib/markdown/parseMarkdown';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';

export async function generateStaticParams() {
  const files = getMarkdownFiles('content/work');
  return files.map((file) => ({ slug: file.slug }));
}

type Props = { params: { slug: string } };

export default async function WorkPostPage({ params }: Props) {
  const files = getMarkdownFiles('content/work');
  const match = files.find((f) => f.slug === params.slug);
  if (!match) return notFound();

  const { frontmatter, contentHtml } = await parseMarkdownFile(match.filePath);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">{frontmatter.title}</h1>
        {frontmatter.date && (
          <p className="mt-1 text-sm text-slate-500">{frontmatter.date}</p>
        )}
      </header>
      <MarkdownRenderer html={contentHtml} />
    </div>
  );
}

