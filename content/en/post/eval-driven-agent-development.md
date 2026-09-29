---
title: "Building an AI Agent Evaluation System: Failing Big, Learning by Building Small"
date: "2026-09-25"
description: "Based on the experience of delayed launches due to a lack of evaluation, and the failure of investing upfront in an evaluation system, we share the process of building an evaluation-driven development framework starting from real requirements and failure cases."
socialImage: "https://htkim27.github.io/assets/eval_driven_cover.jpg"
tags: ["AI Agent", "Evaluation", "LLM", "Engineering", "Production"]
---

You fix the agent, deploy it, and a tester says, "It got weirder than last time." There's no concrete evidence to check which part degraded or if the recent fix is truly to blame. You blindly tweak the prompt again and wait for the next round of feedback. In our previous project, we repeated this agonizing cycle for two to three months.

To avoid this, we invested in an evaluation system from day one for our next project, allocating two out of three developers to build it. Yet, the attempt was abandoned within a month. **Merely having the conviction that evaluation is necessary is not enough to build an evaluation system that actually helps development.** In this post, I want to share our trial and error, and how our perspective shifted as we rebuilt our evaluation system.

![Comparison of before and after adopting an agent evaluation system](../../assets/eval_driven_cover.jpg)

## Without Evaluation, You Can't Explain the Effect of a Fix

For about two years after joining CJ, I participated in developing a system that analyzed clues for business decision-making based on hundreds of multi-LLM calls. At the time, our team moved quite agilely. Whenever we implemented a new feature or hypothesis, we immediately delivered it to field alpha testers for qualitative evaluation. In the early to mid-stages of development, this approach seemed like the ideal workflow. Real-time feedback like "Wow, this version is really good!" came back instantly, motivating us to build the next feature.

However, the atmosphere shifted as we entered beta testing. Feedback like "Something got weird" and "The performance seems worse than last time" began to surface. Initially, we routinely tweaked the prompts and patched the control logic with a few conditional statements before sending out the next build. But this stopgap approach was endless. Whenever we sent a fix, the testers tilted their heads.

> "This output isn't what we intended."
> 
> "That part is fixed, but why is the analysis over here—which used to work fine—suddenly broken?"

Looking back, two distinct problems were intertwined. First, **we had differing understandings of the desired output.** Second, fixing one thing caused **regressions where previously working features broke.** In a complex web of hundreds of LLM inference nodes, we couldn't pinpoint exactly what to fix. Even if we painstakingly fixed one spot, we lacked the evaluation cases to verify if the rest of the system remained intact.

As this cycle repeated, testers' trust plummeted. Existing edge cases were reported as new bugs, yet we had no baseline to compare against the previous version. Ultimately, every new deployment became an act of 'Hope-Driven Development' (or the 'pray meta'), where we could only hope the testers would evaluate the results favorably. We were incredibly lucky to find a stable point to launch, but issues still sporadically occur in the live environment, draining our maintenance resources.

This is why I was obsessed with having an evaluation system in the next project. **We needed to agree on what we were trying to fix, and after the fix, verify both that the specific problem was resolved and that existing features were preserved.** We needed a baseline where qualitative feedback could be repeatedly verified in subsequent versions.

## The Pitfalls of Premature Evaluation Optimization

In March of this year, I took on a new service where users collaborate with an agent over a workspace and a virtual file system. The agent invokes tools and handles files based on chat requests, requiring us to develop a harness to control the model's behavior. Kicking off the project, I strongly insisted to the team: "This time, we must have a dedicated role for building an agent evaluation system."

The initial development team consisted of three people, including myself. I boldly took on the core application development alone and asked the other two to focus entirely on building the evaluation system. I wanted to get it right this time. The problem was that none of us had practical know-how in evaluating agents. Naturally, we took a top-down approach: finding similar benchmark papers, defining the evaluation methodology, and applying it to our domain. While there was research to reference, it was hard to find benchmarks that directly validated the features we were building right now.

Eventually, we decided to build our own evaluator, adapting the papers' criteria to our domain. We conducted score calibration to see if the rubrics were reliable, synthesized and augmented datasets to verify metric reliability, and even planned to measure the correlation between field testers' judgments and our evaluation scores. Deciding on one thing created another task to verify it. A month flew by. We were working hard, but it wasn't clear what we could actually fix *today* with this evaluation.

> "I understand it's good to have an evaluation system... but we are so busy implementing features right now. Do we really need to spend this much resource on it at this stage?"

Meanwhile, the application development I was handling alone was falling behind. We ultimately put the evaluation system on hold, and all three of us returned to MVP feature development. The dream of an evaluation system had to be shelved for the time being. It was disappointing then, but in hindsight, it was the right decision. However, reading papers and doing calibration wasn't entirely wrong; verifying that the evaluator scores correctly is work that is needed eventually.

**The real issue was trying to perfect the evaluation framework before deciding on the concrete requirements we needed to verify.** We started with the grand question of "What metrics should we use to measure this agent's performance?" rather than "Does the file-saving feature we just fixed work properly?" Because we expanded the scope of evaluation without sufficiently understanding the product's requirements and failure modes, building the evaluation became disconnected from building the product.

Thinking about it now, we should have just grabbed one requirement from the current sprint or one bug repeatedly reported by testers. We should have built the evaluator just enough to check if *that* works, and gradually refined it by observing the actual results. **The idea of starting evaluation early was right, but trying to do too much from the start was our downfall.**

## Four Principles for Starting Over

After demonstrating the MVP to the field and receiving positive feedback, we revisited the evaluation system during a team retrospective. Our lead engineer raised the concept of the service's 'floor'—ensuring that even as we continuously change the model and harness, the quality we already provide does not drop below a certain level. Thankfully, I was entrusted with the role of building the evaluation system once again. This time, we had a starting point: 'Let's protect what already works.'

I recalled [Anthropic's article on evaluating AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents), which I often shared in our team chat. The explanation that the upfront cost of building evaluations pays off cumulatively during development resonated deeply. It felt like the vague intuition I had in the field was finally articulated. Resolving not to overcomplicate things like last time, we set four new principles:

**1. Evaluation starts with specific requirements.**
In the beginning, rather than trying to summarize the agent's overall ability into a single score, we decided to first verify whether it performed the action the user requested. An item from the sprint backlog like "Must adhere to a specific format when saving a file" is sufficient. These concrete requirements narrow down the evaluation target and success criteria, making it relatively clear what needs to be fixed when it fails.

**2. Evaluation is the most concrete form of alignment.**
During development, it's common for PMs, developers, and testers to use the same words but envision completely different outcomes. Even a simple request like "Please make the Korean responses natural" can yield vastly different interpretations of "natural." Simply agreeing, "Let's consider this specific output as a pass," before building a feature significantly reduces this misalignment. Our past experience of repeatedly hearing, "This isn't the output we intended," was the genesis of this principle.

**3. Evaluation results must be human-reviewable.**
Especially when using an LLM-as-a-judge, the evaluator might misinterpret the rubric or pass a response just because it has a plausible explanation. Therefore, we needed to be able to read the remaining messages, tool invocation logs, final outputs, and grading rationale together. Calibration also starts from these concrete results. We ask, "Why did this case pass?" or "Did it get a high score even though it didn't meet the user's need?" and correct the judging criteria accordingly.

**4. Resolved failure cases are kept to verify the next change.**
If you register a specific case in the evaluation suite after fixing a bug, you can re-run it whenever you change the model or harness later. It prevents a hard-fixed bug from popping up again in the next deployment. The more you develop, the more cases accumulate, widening the scope of what you can verify before a release.

## Making Evaluation Results Readable for the Team

Making the results readable was just as important as making the evaluation executable. We couldn't ask our colleagues, who are chased by daily feature development, to dig through terminal outputs and complex JSON logs themselves. For evaluation to settle into the team's development process, we had to reduce the effort required to find failed cases and check the execution logs and grading rationale. Therefore, we built the **Evaluator Console** by gathering the features needed for execution, observation, and analysis.

![Console for checking evaluation history, task execution logs, and grading rationale](../../assets/evaluator_console.png)

*The console is designed to compare evaluation histories and check the transcripts and grading rationale of individual runs.*

My biggest focus for the console was to enable developers to follow the question, "So why did it fail?" when they opened a failed case. We made it possible to read in one place what tool the agent called, what response it received, and what the evaluator saw to deem it a failure. If we only showed the score and told them to find the logs themselves, it would have ended up as a tool only the creator uses. **To make it a tool for the whole team, readability was paramount.**

We also configured the evaluation environment by replicating failure cases actually experienced by field testers or expanding edge cases based on them. What we guarded against while designing the harness was a situation where 'tweaking the agent code slightly breaks the evaluator.' So, rather than looking at trivial internal state values, we focused the evaluation on externally verifiable results like final UI text and file outputs, using the transcript to investigate the root causes. We allowed running specific Git commits separately to easily compare previous code with changed code.

Of course, we shouldn't blindly trust the evaluator's judgments. By reading the execution logs and grading rationale in the console, we had to verify whether the agent made a mistake or the evaluator applied the wrong standard. Calibration, which initially felt like a massive homework assignment to complete the evaluation framework, has now shifted to the daily task of slightly adjusting the criteria while looking at individual results. The console was the tool that made that work less tedious.

## What Changed After Getting an Evaluation System

After building the evaluation system, I can feel our decision-making process becoming more solid. In the past, when the agent produced an unexpected error, we would immediately append more instructions to the prompt. Now, by pinning down the failure case and looking into the transcript, we can determine if the behavior is tied to the model's inherent limitations. Instead of endlessly tinkering with prompts, we make decisions like, "Let's use a different model just for this tool invocation segment." Because we can narrow down the root cause, where we spend our time has changed.

There were also cases where the agent didn't invoke external tools as intended. In the past, we would have suspected each other's code, thinking, "Is there a bug in the tool integration?" But looking at the execution logs, we found that excessive constraints written in the tool's Description were blocking the invocation. When talking to other teams, instead of saying, "It doesn't work well," we could show them exactly under what conditions it got stuck. Discussing the same logs reduced unnecessary speculation and emotional drain.

The edge cases resolved this way are permanently kept in the regression prevention suite. Our mindset has changed quite a bit from the days when we deployed and merely hoped that bugs wouldn't appear in the field. Of course, it's too early to talk about the impact of adopting evaluation in numbers. However, from the development team's perspective, **the psychological safety of knowing we can re-verify the problems we've already experienced** was much greater than expected. When we hear, "Something got weird," we now have a place to look first by opening the console.

## A Well-Built Evaluation System is Worth Ten Features

Of course, we still have a long way to go. The current evaluation system is mainly focused on functional constraints and bug verification. Just because a file is saved in the correct format doesn't mean its content is useful in the field. We are now advancing the system to evaluate the overall completeness of the final output based on the ground-truth sets provided by field testers. Even here, it seems we must continually read the actual results and calibrate them against human judgment.

Looking back, we wandered in the first project because we had no evaluation, and in the next project, we started so big that the evaluation itself became a bottleneck. After two trials and errors, we are now thinking more simply. **Whenever a new requirement or failure case arises, let's leave one small evaluation case that we can verify again next time.** Even if you can't build a fancy evaluation framework from the start, stacking them up like this is something you can do.

The speed of implementing features through Vibe Coding is getting faster and faster. But I don't want to just step on the accelerator without knowing where I'm going. Just like writing down a vacation homework journal entry every day during school days, the act of stacking up small evaluation cases might look more tedious right now than implementing one more feature. But if it reduces our anxiety during the next deployment even a little bit, that's where I want to spend my time.
