import fs from 'fs';
import path from 'path';

export function getMarkdownFiles(dir: string) {
  const fullDir = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullDir)) return [];

  const files = fs.readdirSync(fullDir).filter((f) => f.endsWith('.md'));
  return files.map((file) => ({
    slug: file.replace(/\.md$/, ''),
    filePath: path.join(fullDir, file),
  }));
}

