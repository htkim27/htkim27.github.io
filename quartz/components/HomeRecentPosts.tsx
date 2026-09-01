import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { getDate, formatDate } from "./Date"
import { resolveRelative, SimpleSlug } from "../util/path"

const HomeRecentPosts: QuartzComponent = ({ allFiles, fileData, cfg }: QuartzComponentProps) => {
  const posts = allFiles
    .filter((page) => {
      const slug = page.slug ?? ""
      return slug.startsWith("post/") && !page.filePath?.endsWith("index.md")
    })
    .sort((a, b) => (getDate(cfg, b)?.getTime() ?? 0) - (getDate(cfg, a)?.getTime() ?? 0))
    .slice(0, 3)

  return (
    <section class="home-recent-posts">
      <div class="recent-posts-heading">
        <p>RECENT</p>
        <h2>Post</h2>
      </div>
      <div class="recent-posts-list">
        {posts.length > 0 ? (
          posts.map((post) => {
            const date = getDate(cfg, post)
            return (
              <a
                class="recent-post-item internal"
                href={resolveRelative(fileData.slug!, post.slug!)}
              >
                <h3>{post.frontmatter?.title}</h3>
                {date && <time datetime={date.toISOString()}>{formatDate(date, cfg.locale)}</time>}
              </a>
            )
          })
        ) : (
          <p class="recent-posts-empty">첫 글을 준비하고 있습니다.</p>
        )}
      </div>
      <a
        class="recent-posts-arrow internal"
        href={resolveRelative(fileData.slug!, "post" as SimpleSlug)}
        aria-label="모든 Post 보기"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </a>
    </section>
  )
}

HomeRecentPosts.css = `
.home-recent-posts {
  display: grid;
  grid-template-columns: 0.7fr minmax(0, 3fr) 3.5rem;
  gap: 1.5rem;
  align-items: stretch;
  max-width: 1040px;
  margin: 5rem auto 0;
  padding-top: 0;
}
.recent-posts-heading p {
  margin: 0 0 .45rem;
  color: var(--secondary);
  font-family: var(--codeFont);
  font-size: .7rem;
  font-weight: 700;
  letter-spacing: .12em;
}
.recent-posts-heading h2 { margin: 0; font-size: 1.8rem; letter-spacing: -.04em; }
.recent-posts-list { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); }
.recent-post-item { min-width: 0; padding: .2rem 1.25rem; border-left: 1px solid var(--lightgray); color: var(--dark) !important; text-decoration: none !important; }
.recent-post-item h3 { margin: .1rem 0 1.4rem; font-size: 1rem; line-height: 1.35; letter-spacing: -.02em; }
.recent-post-item time { color: var(--gray); font-family: var(--codeFont); font-size: .68rem; }
.recent-posts-empty { margin: .25rem 0; padding-left: 1.25rem; border-left: 1px solid var(--lightgray); color: var(--gray); }
.recent-posts-arrow { display: grid; place-items: center; width: 3.5rem; height: 3.5rem; align-self: center; border: 1px solid var(--dark); border-radius: 50%; color: var(--dark) !important; transition: color 160ms ease, background 160ms ease; }
.recent-posts-arrow:hover { color: var(--light) !important; background: var(--dark); }
.recent-posts-arrow svg { width: 1.2rem; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
@media (max-width: 800px) {
  .home-recent-posts { grid-template-columns: 1fr 3.5rem; }
  .recent-posts-list { grid-column: 1 / -1; grid-row: 2; grid-template-columns: 1fr; }
  .recent-post-item { padding: 1rem 0; border-left: 0; border-top: 1px solid var(--lightgray); }
  .recent-post-item h3 { margin-bottom: .6rem; }
  .recent-posts-arrow { grid-column: 2; grid-row: 1; }
}
`

export default (() => HomeRecentPosts) satisfies QuartzComponentConstructor
