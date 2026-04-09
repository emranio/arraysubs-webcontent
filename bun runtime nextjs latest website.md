with homepage and a privacy policy page, a contact page, and two dummy /articles/ blogs.

bun runtime nextjs latest website. all latest lib.
it's a website that serves super fast seo optimized sites from mdx.
mdx rendering must be cache peroperly. check mdx files last modified timestamp, compare it and decide if u need to recompile/ render it.
full route route is a must.
direct pages must be statically cached in built time.
also, cache is necessary for param based pages, request level. means, after 1st visitor, the same url is served cached. 
--
all mds files will be stored at /content/ directory. as follows:
example:

/content/page/my-page-slug.mdx >> serves as /my-page-slug/
/content/page/parent/child.mdx >> serves as /parent/child/
/content/page/parent/index.mdx >> serves as /parent/

/content/articles/my-awesome-article.mdx >> /articles/my-awesome-article/


/content/documentations/how-to-boo.mdx >> /documentations/how-to-boo/
/content/documentations/a/b.mdx >> /documentations/a/b/
/content/documentations/a/index.mdx >> /documentations/a/

/content/CONTENT_TYPE/CONTENT_FILES >> serves as /CONTENT_TYPE/CONTENT_FILES/

---
on each mdx header, i will add content title, description, and optionally content schema json, coverImage (relative path to /content/ << yes, i will put images, video, pdf etc here too>>). if coverimage is not gives, the first image from body will be used as cover image. and with all these header information, the app will generate highly seo focused meta data for the html page with og graph and other social media supports. 
--
on mdx header, other informtion will be present as well. publish [true | false | date time], default false. if date or date time is present, it will auto publish on that date/ date time.
bodyClass (optional), 
template: [template name], default (with header, footer, title, breadcumb), canvas (only header nd footer), blank (just blank), blog (header, footer, title, author, publish date, category, tags). based on template, additional meta may exists, like for blog: tag, category, author.
--
add another directory for the templates and styles and schema.
---
for archives use next route based system. here we will create archive for specific content types. currently we will have only article archives.
archives/articles/ [category.tsx, index.tsx] /articles/ will serve the index.tsx showing all articles on the page as 3 grids per row with scroll to load pagination.
/articles/category/category-name will serve that category content in same style.
--
for schema, some common schema, like organization, person will be added to all templates, then the template specific schema will be appended, then the content specific schema will be appended.
---
use scss styling, css class based BEM naming, component based. no css in js, no tailwind, no module.css
---
use component based codebased. write small files with small chunk of codes, in multiple files, dont make large file.
--
must follow seo standards. and optimized for high score in google page speed.
--
if any image is missing alt text use content title as alt text. if img title is missing, use alt text as img title. all links must have titles. 
---
typescript, if needed use zustan, no ui library. no db. use root json for site specific configurations, and deploy related values in .env, .env.production, .env.example
---
dont use centralized single route for everything with custom logic. for each content type register different routes in next for that specifi routes.
---
why we're using mdx instead of md? because we will maintall all pages and content through mdx, no tsx. on the mdx we can use divs and react components as well. so we will create reusable ui components (like flex containers, grids, section container with gaps, buttons, cards, cta etc) in our app, and use them into the mdx. for pages like home page, we will create a single mdx file at our contents dir /contents/index.mdx nd it will be used as our home page.
---
for pages, no need to create multiple dedicated react components for sections or page part. we will use a single entire mdx for pages. we will only create reusable ui components and use them in our mdx file.
---
for our page container width, max width 1600px.
---
use rem based units.
---
use css variables in a global.scss and use them in other scss files.
---
no dark mode, only light mode design. no gradient, no shadow, flat design, big and bold design. rounded corners. modern complex layout design.
---
funnel sans for body. for title Funnel Display

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&display=swap" rel="stylesheet">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&family=Funnel+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
