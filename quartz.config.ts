import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Hyuntak Kim",
    pageTitleSuffix: " · AI Systems Engineer",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "ko-KR",
    baseUrl: "htkim27.github.io",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Nanum Myeongjo", // Elegant serif font for an artistic impressionist feel
        body: "IBM Plex Sans KR",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f4f6f0", // Very pale lily pond cream/green
          lightgray: "#e2e8e4", // Soft grayish water
          gray: "#859b96", // Muted green/blue
          darkgray: "#3a4f49", // Deep blue-green
          dark: "#1a2529", // Deep navy
          secondary: "#6f88b5", // Soft impressionist blue/lavender
          tertiary: "#8fb8a2", // Soft lily pad green
          highlight: "rgba(111, 136, 181, 0.15)", // Wash of lavender-blue
          textHighlight: "rgba(240, 225, 140, 0.5)", // Sunlight yellow
        },
        darkMode: {
          light: "#141824", // Deep night blue
          lightgray: "#262c3f", // Dark slate/violet
          gray: "#6f7a99", // Muted twilight blue
          darkgray: "#b5becd", // Soft twilight glow
          dark: "#e8ecef", // Pale moon white
          secondary: "#9db2e1", // Luminous violet-blue
          tertiary: "#f4b9a7", // Glowing peach
          highlight: "rgba(157, 178, 225, 0.15)",
          textHighlight: "rgba(215, 185, 100, 0.4)", // Subtle warm glow
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: true }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
