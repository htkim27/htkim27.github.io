import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative, SimpleSlug } from "../util/path"

const SimpleNavigation: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const link = (label: string, slug: SimpleSlug) => (
    <a
      class={`internal nav-parent ${String(fileData.slug) === String(slug) ? "active" : ""}`}
      href={resolveRelative(fileData.slug!, slug)}
    >
      {label}
    </a>
  )

  return (
    <nav class="simple-navigation" aria-label="Main navigation">
      {link("Profile", "profile" as SimpleSlug)}
      {link("Post", "post" as SimpleSlug)}
    </nav>
  )
}

SimpleNavigation.css = `
.simple-navigation { display: flex; flex-direction: column; gap: .15rem; margin-top: 1rem; }
.simple-navigation a { padding: .42rem 0; color: var(--darkgray); font-size: .95rem; font-weight: 600; text-decoration: none; transition: color 140ms ease; }
.simple-navigation a:hover, .simple-navigation a.active { color: var(--secondary); }
@media (max-width: 800px) {
  .simple-navigation { flex-direction: row; align-items: flex-start; gap: .35rem 1.5rem; margin-top: .75rem; }
}
`

export default (() => SimpleNavigation) satisfies QuartzComponentConstructor
