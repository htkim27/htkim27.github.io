# Hyuntak Kim · Engineering Notes

Obsidian 노트를 Quartz v4로 발행하는 개인 포트폴리오 겸 엔지니어링 블로그입니다.

## 로컬 실행

```bash
npm install
npx quartz build --serve
```

콘텐츠는 `content/` 아래에 작성합니다. 공개하지 않을 노트에는 frontmatter로 `draft: true`를 추가하세요.

## 배포

`main` 브랜치에 push하면 GitHub Actions가 Quartz를 빌드해 GitHub Pages에 배포합니다. 저장소의 **Settings → Pages → Source**가 **GitHub Actions**로 설정되어 있어야 합니다.

```bash
npx quartz sync
```
