import "server-only";
import fs from "node:fs";
import path from "node:path";

export type ArticleHeading = {
  id: string;
  title: string;
};

export type ArticleFaq = {
  question: string;
  answer: string;
};

function articleFile(slug: string) {
  return path.join(process.cwd(), "blogs", slug, "post.md");
}

function stripFrontmatter(markdown: string) {
  return markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n+/, "");
}

function stripDocumentTitle(markdown: string) {
  return markdown.replace(/^#\s+.+\r?\n+/, "");
}

function headingId(title: string) {
  return title
    .toLowerCase()
    .replace(/[`*_~]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function markdownToPlainText(markdown: string) {
  return markdown
    .replace(/^!\[[^\]]*\]\([^\n)]+\)\s*$/gm, "")
    .replace(/\[([^\]]+)\]\([^\n)]+\)/g, "$1")
    .replace(/^>\s?/gm, "")
    .replace(/[`*_~]/g, "")
    .replace(/^[-+]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function getArticleMarkdown(slug: string) {
  const raw = fs.readFileSync(articleFile(slug), "utf8");
  return stripDocumentTitle(stripFrontmatter(raw)).trim();
}

export function getArticleHeadings(markdown: string): ArticleHeading[] {
  return Array.from(markdown.matchAll(/^##\s+(.+)$/gm), ([, title]) => ({
    id: headingId(title.trim()),
    title: title.replace(/[`*_~]/g, "").trim(),
  }));
}

export function getArticleFaqs(markdown: string): ArticleFaq[] {
  const faqHeading = /^##\s+Frequently asked questions\s*$/im.exec(markdown);
  if (!faqHeading || faqHeading.index === undefined) return [];

  const faqBodyStart = faqHeading.index + faqHeading[0].length;
  const remaining = markdown.slice(faqBodyStart);
  const nextSection = /^##\s+/m.exec(remaining);
  const faqBody = nextSection
    ? remaining.slice(0, nextSection.index)
    : remaining;
  const questions = Array.from(faqBody.matchAll(/^###\s+(.+)$/gm));

  return questions
    .map((match, index) => {
      const answerStart = (match.index ?? 0) + match[0].length;
      const answerEnd = questions[index + 1]?.index ?? faqBody.length;
      return {
        question: markdownToPlainText(match[1]).replace(/\?*$/, "?"),
        answer: markdownToPlainText(faqBody.slice(answerStart, answerEnd)),
      };
    })
    .filter((item) => item.question.length > 1 && item.answer.length > 1);
}

export function getArticleWordCount(markdown: string) {
  const text = markdownToPlainText(
    markdown
      .replace(/^#{1,6}\s+/gm, "")
      .replace(/\|/g, " ")
      .replace(/^\s*[-:| ]+\s*$/gm, ""),
  );

  return text ? text.split(/\s+/).length : 0;
}
