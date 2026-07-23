import type { ComponentPropsWithoutRef } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const articleComponents: Components = {
  h2: ({ children, ...props }) => (
    <h2
      className="mt-14 scroll-mt-28 border-t border-border pt-11 font-display text-3xl leading-tight text-foreground first:mt-0 first:border-0 first:pt-0 sm:text-4xl"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="mt-10 scroll-mt-28 font-display text-2xl leading-tight text-foreground sm:text-3xl"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="mt-8 font-display text-xl text-foreground" {...props}>
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="mt-5 text-left text-lg leading-8 text-muted md:text-justify">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => <em className="text-faint">{children}</em>,
  a: ({ href = "", children, ...props }) => {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className="font-semibold text-primary underline decoration-primary/30 decoration-[0.0625rem] underline-offset-4 transition-colors hover:text-primary-strong hover:decoration-primary-strong"
        {...(external
          ? { target: "_blank", rel: "noreferrer noopener" }
          : undefined)}
        {...props}
      >
        {children}
      </a>
    );
  },
  ul: ({ children, ...props }) => (
    <ul
      className="mt-6 grid list-disc gap-3 overflow-hidden rounded-xl bg-surface p-6 pl-11 text-foreground marker:text-primary sm:p-7 sm:pl-12"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="mt-6 grid list-decimal gap-4 overflow-hidden rounded-xl bg-surface p-6 pl-12 text-foreground marker:font-semibold marker:text-primary sm:p-7 sm:pl-14"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="min-w-0 pl-1 text-left leading-7 md:text-justify" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="mt-8 rounded-2xl border-0 bg-highlight p-6 text-dark sm:p-8 [&>p:first-child]:mt-0 [&_strong]:text-dark"
      {...props}
    >
      {children}
    </blockquote>
  ),
  table: ({ children, ...props }) => (
    <div className="mt-8 overflow-x-auto rounded-xl border border-border">
      <table
        className="w-full min-w-[44rem] border-collapse text-left"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-dark text-on-dark" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }) => (
    <tbody className="bg-background" {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }) => (
    <tr className="border-t border-border first:border-0" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }) => (
    <th className="px-5 py-4 text-sm font-semibold" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-5 py-4 align-top leading-7 text-muted" {...props}>
      {children}
    </td>
  ),
  hr: (props) => <hr className="my-12 border-0 border-t border-border" {...props} />,
  img: ({ src, alt = "", ...props }) => (
    <img
      src={typeof src === "string" ? src : undefined}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="mx-auto my-9 h-auto w-full max-w-[43.75rem] rounded-2xl border border-border bg-surface"
      {...(props as ComponentPropsWithoutRef<"img">)}
    />
  ),
  code: ({ children, ...props }) => (
    <code
      className="break-words [overflow-wrap:anywhere] rounded-md bg-surface px-1.5 py-0.5 font-mono text-[0.9em] text-primary-strong"
      {...props}
    >
      {children}
    </code>
  ),
};

export function MarkdownArticle({ markdown }: { markdown: string }) {
  return (
    <div className="min-w-0">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={articleComponents}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
