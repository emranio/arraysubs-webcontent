import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllContent } from '@/lib/content';
import siteConfig from '@/site.config.json';

export const metadata: Metadata = {
  title: `Blog — ${siteConfig.siteName}`,
  description: 'Latest articles, guides, and insights about WooCommerce subscriptions and memberships.',
};

export default function ArticlesPage() {
  const articles = getAllContent('articles');

  return (
    <div className="archive">
      <div className="container">
        <header className="archive__header">
          <h1 className="archive__title">Blog</h1>
          <p className="archive__count">{articles.length} articles</p>
        </header>

        <div className="grid grid--cols-3 grid--gap-md">
          {articles.map((article) => {
            const formattedDate = article.date
              ? new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              : null;

            return (
              <article key={article.slug} className="article-card">
                {article.coverImage && (
                  <div className="article-card__image">
                    <img
                      src={`/content/${article.coverImage}`}
                      alt={article.title}
                      title={article.title}
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="article-card__body">
                  {article.category && (
                    <span className="article-card__category">{article.category}</span>
                  )}
                  <h2 className="article-card__title">
                    <Link href={`/articles/${article.slug}/`} title={article.title}>
                      {article.title}
                    </Link>
                  </h2>
                  <p className="article-card__excerpt">{article.description}</p>
                  <div className="article-card__footer">
                    {formattedDate && <time dateTime={article.date}>{formattedDate}</time>}
                    <span>{article.readingTime}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {articles.length === 0 && (
          <p>No articles published yet. Check back soon!</p>
        )}
      </div>
    </div>
  );
}
