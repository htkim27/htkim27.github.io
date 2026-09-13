import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { SimpleSlug, resolveRelative, simplifySlug } from "../util/path"
import { classNames } from "../util/lang"

const LanguageToggle: QuartzComponent = ({
  fileData,
  allFiles,
  displayClass,
}: QuartzComponentProps) => {
  const currentSlug = simplifySlug(fileData.slug!)
  const isEnglish = currentSlug === "en" || currentSlug.startsWith("en/")
  const koreanSlug = (
    isEnglish ? currentSlug.replace(/^en\/?/, "") || "/" : currentSlug
  ) as SimpleSlug
  const englishSlug = (
    isEnglish ? currentSlug : currentSlug === "/" ? "en" : `en/${currentSlug}`
  ) as SimpleSlug
  const englishFileSlug = currentSlug === "/" ? "en/index" : `en/${currentSlug}`
  const hasEnglishVersion = isEnglish || allFiles.some((file) => file.slug === englishFileSlug)
  const englishTarget = hasEnglishVersion ? englishSlug : ("en" as SimpleSlug)

  return (
    <nav
      class={classNames(displayClass, "language-toggle")}
      aria-label="언어 선택 / Language selector"
    >
      <a
        class={`internal ${isEnglish ? "active" : ""}`}
        href={resolveRelative(fileData.slug!, englishTarget)}
        lang="en"
        data-router-ignore=""
        aria-current={isEnglish ? "page" : undefined}
        title={!hasEnglishVersion ? "이 페이지의 영문 번역은 준비 중입니다" : undefined}
      >
        ENG
      </a>
      <span aria-hidden="true">/</span>
      <a
        class={`internal ${!isEnglish ? "active" : ""}`}
        href={resolveRelative(fileData.slug!, koreanSlug)}
        lang="ko"
        data-router-ignore=""
        aria-current={!isEnglish ? "page" : undefined}
      >
        KOR
      </a>
    </nav>
  )
}

LanguageToggle.css = `
.language-toggle { display: flex; align-items: center; gap: .28rem; white-space: nowrap; font-family: var(--codeFont); font-size: .68rem; letter-spacing: .035em; }
.language-toggle a { color: var(--gray); background: none !important; padding: 0 !important; text-decoration: none; transition: color 140ms ease; }
.language-toggle a:hover, .language-toggle a.active { color: var(--dark); font-weight: 700; }
.language-toggle span { color: var(--lightgray); user-select: none; }
`

export default (() => LanguageToggle) satisfies QuartzComponentConstructor
