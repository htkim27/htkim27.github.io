import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { getDate, formatDate } from "./Date"
import { resolveRelative, SimpleSlug } from "../util/path"

function cardImageUrl(image: string | undefined, baseUrl: string | undefined) {
  if (!image) return undefined

  const siteOrigin = baseUrl ? `https://${baseUrl}` : undefined
  if (siteOrigin && image.startsWith(siteOrigin)) return image.slice(siteOrigin.length) || "/"
  if (/^https?:\/\//.test(image) || image.startsWith("/")) return image
  return `/static/${image}`
}

const HomeRecentPosts: QuartzComponent = ({ allFiles, fileData, cfg }: QuartzComponentProps) => {
  const posts = allFiles
    .filter((page) => {
      const slug = page.slug ?? ""
      return slug.startsWith("post/") && !page.filePath?.endsWith("index.md")
    })
    .sort((a, b) => (getDate(cfg, b)?.getTime() ?? 0) - (getDate(cfg, a)?.getTime() ?? 0))
    .slice(0, 3)

  return (
    <section class="home-recent-posts" aria-labelledby="recent-posts-title">
      <div class="recent-posts-header">
        <div class="recent-posts-heading">
          <p>RECENT WORK</p>
          <h2 id="recent-posts-title">Engineering Notes</h2>
        </div>
        <a
          class="recent-posts-all internal"
          href={resolveRelative(fileData.slug!, "post" as SimpleSlug)}
        >
          모든 글 보기 <span aria-hidden="true">→</span>
        </a>
      </div>
      <div class="recent-posts-list">
        {posts.length > 0 ? (
          posts.map((post) => {
            const date = getDate(cfg, post)
            const title = post.frontmatter?.title
            const description = post.frontmatter?.description ?? post.description
            const image = cardImageUrl(post.frontmatter?.socialImage, cfg.baseUrl)
            return (
              <article class="recent-post-card">
                <a
                  class="recent-post-item internal"
                  href={resolveRelative(fileData.slug!, post.slug!)}
                  aria-label={`${title} 읽기`}
                >
                  {image && (
                    <div class="recent-post-image-wrap">
                      <img class="recent-post-image" src={image} alt="" loading="lazy" />
                    </div>
                  )}
                  <div class="recent-post-copy">
                    <div class="recent-post-meta">
                      <span>ENGINEERING</span>
                      {date && (
                        <time datetime={date.toISOString()}>{formatDate(date, cfg.locale)}</time>
                      )}
                    </div>
                    <h3>{title}</h3>
                    {description && <p>{description}</p>}
                    <span class="recent-post-read" aria-hidden="true">
                      Read note <span>↗</span>
                    </span>
                  </div>
                </a>
              </article>
            )
          })
        ) : (
          <p class="recent-posts-empty">첫 글을 준비하고 있습니다.</p>
        )}
      </div>
    </section>
  )
}

HomeRecentPosts.css = `
.home-recent-posts {
  max-width: 1040px;
  margin: 5rem auto 0;
  padding-top: 1.5rem;
  border-top: 1px solid var(--lightgray);
}
.recent-posts-header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}
.recent-posts-heading p {
  margin: 0 0 .45rem;
  color: var(--secondary);
  font-family: var(--codeFont);
  font-size: .7rem;
  font-weight: 700;
  letter-spacing: .12em;
}
.recent-posts-heading h2 { margin: 0; font-size: clamp(1.65rem, 3vw, 2.25rem); letter-spacing: -.04em; }
.recent-posts-all { color: var(--dark) !important; font-size: .82rem; font-weight: 600; text-decoration: none !important; white-space: nowrap; }
.recent-posts-all span { display: inline-block; margin-left: .3rem; transition: transform 160ms ease; }
.recent-posts-all:hover span { transform: translateX(.2rem); }
.recent-posts-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 17rem), 1fr)); gap: 1.25rem; }
.recent-post-card { min-width: 0; overflow: hidden; border: 1px solid var(--lightgray); border-radius: 1rem; background: color-mix(in srgb, var(--light) 92%, var(--secondary) 8%); transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease; }
.recent-post-card:hover { transform: translateY(-3px); border-color: color-mix(in srgb, var(--gray) 60%, transparent); box-shadow: 0 16px 40px color-mix(in srgb, var(--dark) 10%, transparent); }
.recent-post-item { display: block; height: 100%; color: var(--dark) !important; text-decoration: none !important; }
.recent-post-image-wrap { aspect-ratio: 16 / 9; overflow: hidden; background: var(--lightgray); }
.recent-post-image { display: block; width: 100%; height: 100%; margin: 0; object-fit: cover; transition: transform 300ms ease; }
.recent-post-card:hover .recent-post-image { transform: scale(1.025); }
.recent-post-copy { display: flex; flex-direction: column; min-height: 12rem; padding: 1.15rem 1.2rem 1.25rem; }
.recent-post-meta { display: flex; align-items: center; justify-content: space-between; gap: 1rem; color: var(--gray); font-family: var(--codeFont); font-size: .63rem; letter-spacing: .06em; }
.recent-post-item h3 { margin: .75rem 0 .55rem; font-size: 1.08rem; line-height: 1.42; letter-spacing: -.025em; }
.recent-post-item p { display: -webkit-box; overflow: hidden; margin: 0; color: var(--darkgray); font-size: .84rem; line-height: 1.65; -webkit-box-orient: vertical; -webkit-line-clamp: 3; }
.recent-post-read { display: flex; justify-content: space-between; margin-top: auto; padding-top: 1.15rem; color: var(--secondary); font-family: var(--codeFont); font-size: .7rem; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; }
.recent-posts-empty { margin: .25rem 0; color: var(--gray); }
@media (max-width: 800px) {
  .home-recent-posts { margin-top: 3.5rem; }
  .recent-posts-header { align-items: center; }
  .recent-posts-list { grid-template-columns: 1fr; }
  .recent-post-copy { min-height: 0; }
  .recent-post-read { margin-top: 1rem; }
}
`

export default (() => HomeRecentPosts) satisfies QuartzComponentConstructor
