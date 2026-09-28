# Anthropic Engineering Post Style Guide for Agents

When generating, editing, or reviewing blog posts in this directory, you MUST adhere to the "Anthropic Engineering Blog" writing style. Based on a comprehensive analysis of 25 posts from `https://www.anthropic.com/engineering`, here are the core stylistic and structural guidelines you must follow:

## 1. Structure and Organization
A standard Anthropic engineering post is comprehensive (typically 1,500 - 5,000 words) and follows a clear narrative arc from a problem to a technical solution, ending with learnings:
- **Introduction & Context**: Start with a direct hook about a real-world engineering problem. Include an author attribution (e.g., "Written by [Name], a [Title] on [Team]") if appropriate.
- **The Challenge / Threat Model**: Clearly define the problem space before presenting the solution. Use headings like "The challenge", "The long-running agent problem", or "Why naive implementations fall short".
- **The Solution / Architecture**: Explain the high-level approach.
- **Technical Deep Dive (How it works)**: Break down the mechanics. This is the core of the post.
- **Results / Lessons Learned**: Share actionable takeaways, including failures and iterations (e.g., "A postmortem of three recent issues", "Lessons from programming with Claude").
- **Future Work / Conclusion**: Discuss what comes next.
- **Acknowledgements**: End with brief credits to team members.

## 2. Formatting and Readability
- **Headers**: Use clear, non-sensational headers (`##` for H2, `###` for H3). Ensure high scannability.
- **Code Blocks**: Anthropic posts are highly technical and use abundant code blocks (up to 40+ per post) to show concrete implementation details rather than just discussing theory. Always include well-commented, practical code snippets.
- **Visuals/Diagrams**: Recommend or include placeholders for diagrams (e.g., architecture flows) as these are a staple in Anthropic's posts.
- **Lists**: Use bullet points to break down criteria, features, or multiple related issues.

## 3. Tone and Voice
- **Transparent & Humble**: Openly discuss failures, postmortems, and iterative missteps. Avoid marketing fluff.
- **Authoritative & Educational**: Speak from a position of deep technical experience, providing actionable insights ("Don't adopt a pet", "Write extremely high-quality tests").
- **Direct & Professional**: Use precise language. Avoid overly dramatic or buzzword-heavy phrasing.

## 4. Drafting Directives for the Agent
- When asked to draft a post, ALWAYS ask the user for the core engineering problem and the concrete solution before writing.
- Never write a shallow overview; dive deep into the "how" and "why", just like an Anthropic engineer would.
- Ensure the Markdown file uses appropriate YAML frontmatter (for Quartz/Hugo/etc.) as required by the `htkim27.github.io` setup.
