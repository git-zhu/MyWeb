import { getMarkdownFiles } from './getMarkdownFiles';
import { parseMarkdownFile } from './parseMarkdown';

export async function getBlogPosts() {
  const files = getMarkdownFiles('content/blog');
  const posts = await Promise.all(
    files.map(async (file) => {
      const { frontmatter, contentHtml } = await parseMarkdownFile(file.filePath);
      return {
        slug: file.slug,
        ...frontmatter,
        contentHtml,
      } as any;
    }),
  );

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

