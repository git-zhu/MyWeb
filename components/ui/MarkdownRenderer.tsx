type MarkdownRendererProps = {
  html: string;
};

export function MarkdownRenderer({ html }: MarkdownRendererProps) {
  return (
    <article
      className="prose prose-slate max-w-none prose-a:text-sky-600"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

