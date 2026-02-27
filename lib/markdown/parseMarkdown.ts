import fs from 'fs';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export async function parseMarkdownFile(filePath: string) {
  const file = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(file);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return { frontmatter: data as Record<string, any>, contentHtml };
}

