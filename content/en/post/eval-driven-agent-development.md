---
title: "Building an Initial Evaluation System for AI Agent Production: Lessons from Failure and 4 Design Philosophies"
date: "2026-09-25"
description: "Based on the problem of lacking an evaluation system and the lessons learned from the failure of academic approaches during the launch of an AI agent service, we share the process of building an evaluation system optimized for practical production environments and 4 core design philosophies."
socialImage: "https://htkim27.github.io/assets/eval_driven_cover.jpg"
tags: ["AI Agent", "Evaluation", "LLM", "Engineering", "Production", "Vibe Coding"]
draft: false
---

![Comparison of before and after adopting an agent evaluation system](../../assets/eval_driven_cover.jpg)

## 1. The Trigger That Made Me Realize the Need for an Evaluation System

Since March of this year, we have been developing a domain-specific AI agent service. To use an analogy, it is a kind of 'domain-specific Copilot'. The structure provides users with a workspace and a virtual file system they can directly work in. Through a chat interface, the agent writes and edits code, accesses the file system to execute tools, and completes tasks together with the user.

It is not a simple chatbot. It is a quite heavy agent system where autonomous tool invocation based on while-loops, a Harness that supports the context window from blowing up even in extreme multi-turn environments, and a finely crafted domain knowledge ontology are combined via MCP.

When kicking off this project, I strongly insisted on one thing to the team: **"Our team must have a dedicated role for building an 'Agent Evaluation System'."**

Around that time, so-called 'Vibe Coding' was starting to firmly establish itself in the development workflow. It was a time when the feature implementation speed of a single developer exploded by 3x, 5x with the assistance of LLMs. However, I felt a red flag precisely at that point. If we poured that resource entirely into developing other new features just because development speed increased, it would inevitably be like **stepping harder on the accelerator pedal in a fog**. The rate at which bugs and side effects were produced would accelerate just as much as the increased speed.

The surplus development resources had to be invested not in additional features, but in an **Evaluation System (Evaluator)** that would guarantee logical decision-making and 'stably upward research and development'.

The reason I obsessed over the evaluation system this much was clear. It was because I had suffered the nightmare of launch delays caused by the absence of an evaluation system in a preceding project I experienced during my two years at the company.

There was a predecessor solution corresponding to the previous generation of the service currently under development. It was a pipeline where hundreds of Multi-LLM calls were connected in parallel and sequentially on top of a deterministic scaffolding structure based on LangGraph. Once the pipeline ran, it performed deep reasoning for about 1 to 2 hours, analyzing key clues necessary for complex decision-making in the field—a sort of Agentic AI service.

At the time, our team moved extremely agilely. Whenever we created a new feature or implemented hypotheses in multiple versions A, B, C, and D, we immediately delivered them to alpha testers in the field and left the qualitative evaluation to them.

In the early and mid-stages of development, this approach seemed like the most ideal and agile workflow. Real-time feedback came back from the field saying, "Wow, this version has gotten really good!", and other surrounding development teams talked about how "We should also run our R&D in that way."

However, the problem materialized during the 'beta testing' conducted after the alpha test.

From a certain day, feedback mixed with complaints started coming out of the testers' mouths. *"Something has become weird.", "The performance seems worse than last time."*

Initially, we responded habitually. We tweaked the prompts a bit according to the requests, patched a few conditional statements onto the scaffolding logic, and sent the build again. But this patchwork task continued endlessly for a full 2 to 3 months.

When we made modifications and sent them, the testers tilted their heads.
> *"This is not the output we intended."*
> *"That part is fixed, but why is that other analysis over there, which used to work fine, suddenly not coming out?"*

A trade-off where fixing one thing broke another continued to bite its tail. With hundreds of LLM reasoning nodes intricately tangled, we could not pinpoint at all where the bottleneck in the system was and what the real cause was. We had to apply methodologies without identifying the clear cause and rely solely on the testers' feedback to check the results.

An even bigger problem was the **drop in testers' reliability**. As disappointing feedback loops repeated for weeks, the testers' gaze turned extremely defensive and negative. There were increasing instances where they recognized and reported even pre-existing edge-case errors as *"newly occurred bugs"*. Because we lacked objective metrics, we also lacked the grounds to verify this.

By that point, the timing to build a new evaluation system had long passed. With a "launch next week" schedule already fixed, a proposal to spend days building an evaluation pipeline was realistically difficult to introduce within the team.

In the end, we focused only on short-term problem solving, and the schedule was continuously delayed. We launched production afterward, but the technical debt incurred at that time is causing various problems in the live environment and consuming maintenance resources.

I acutely realized then. **Agent development without an evaluation system is like pouring resources without direction.** A development process that cannot objectively measure where the target point is and what the current state is ultimately acts as a risk for the entire project.

---

## 2. Scenarios Where Top-Down Evaluation Fails in Practice

When the new agent project started, I planned to build an evaluation system from the starting phase for this project.

Although my rank was the lowest, thanks to the experience of staying third longest in the team and leadingly participating in projects, I was granted considerable autonomy by the Team Leader and Tech Lead for the initial 0-to-1 PoC. The initially assigned personnel were a total of 3 people including me (myself, 1 fellow researcher, 1 undergraduate intern researcher).

I boldly allocated resources. I took sole charge of core development such as UI design, backend infrastructure, and agent runtime harness construction, and fully assigned the fellow researcher and the 2 intern researchers to 'building the evaluation system'. In other words, I used 2 out of 3 people for evaluation. This was a decision to early establish an evaluation-based R&D system.

However, that grand ambition **was halted before a month had passed.** All three of us had to be reallocated to feature development.

The reason was simple. **It was because absolutely no practical results came out from the evaluation system side for a month.**

Looking back, the cause of failure was clear. We had fallen into the swamp of 'academic perfectionism', exposing the limitations of metric design detached from practical affairs. None of us had practical know-how on 'how to evaluate a production agent in the field'. Because of that, we naturally approached the evaluation system in the way we used to do in grad schools or labs, namely the **traditional 'Top-Down' approach**, which was the root of the problem.

The service we were building was a complex agent that derived final results by combining numerous intermediate outputs. We approached it too much like model students.
1. **Searching Open Benchmarks**: We thoroughly scoured the latest LLM agent benchmark papers existing in the world. The intern researcher explored numerous references, but due to the nature of domain-specific tasks, there was not a single benchmark that exactly matched our production's actual goals.
2. **Designing Complex Metrics and Rubrics**: Eventually, we decided to adopt the LLM-as-a-judge approach and began customizing academic evaluation rubrics to fit our domain. And to verify if those rubrics were reliable, internal researchers clung to it and conducted score calibration work. A whole month quickly passed just doing this.
3. **Endless Extra-work**: This was not the end. A research proposal was written stating that to secure the reliability of the metrics, we had to synthesize and augment evaluation datasets and even measure the human correlation with field testers.

When I shared that proposal with the team, the feedback returned was skeptical.
> *"I understand it's good to have an evaluation system, but... we're too busy implementing features right now, do we really need to spend that much resource in the current situation?"*

Not only the field but also I myself began to feel skeptical. While building a massive evaluation infrastructure invisible on the screen, the development speed of the actual production agent was being delayed. I alone had limits in porting complex and tricky domain requirements into the agent framework on time. Concerns about the progress of the product also grew within the team.

Eventually, we completely put the evaluation system development on hold and urgently deployed all 3 of us into MVP R&D. In a reality where survival came before building an evaluation system, we pivoted to MVP development.

In hindsight, stopping the evaluation system development at that time was a **valid decision** as a result.

We were too ignorant about the agent system itself. With no practical experience, trying to mimic textbook benchmark methodologies caused us to hit resource limits. Moreover, in the engineering organizations of most companies, the time they can just wait for 'invisible infrastructure' is not very long. Unless it's a place like Big Tech with infinite resources and an established long-term R&D system, a project that fails to prove its potential with tangible results (MVP) within two or three months is highly likely to be halted.

We had to survive first. We sealed the evaluation system in a drawer and focused on MVP development.

Of course, the path to creating a usable agent product was also not easy. It wasn't a problem that ended by bringing in a flagship LLM SDK and handing a few tools into a while-loop. Every time a feature was added, the context exploded, and the complexity we had to consider—such as prompt engineering, context engineering, applying domain ontology, and preventing unauthorized data leaks—increased significantly.

In the middle, feeling "I can't handle it at all with this structure," there was a time we completely wiped out the codes we painstakingly wrote and rewrote them from the ground up, leaving only the skeleton. Fortunately, thanks to the Tech Lead taking charge of the technical lead of the task again, and a 5-year senior engineer joining and silently resolving the tough research tasks, we were able to release a robust MVP that could be demonstrated to the field in 4 to 5 months.

---

## 3. Turning Point: 4 Design Philosophies for Practical Agent Evaluation

Fortunately, the deployed MVP received a positive outlook from the testers and entered the formal project procedure. Currently, we are expanding the target to recruit additional BPO personnel and preparing for a formal FGI (Focus Group Interview).

At a time when we could catch our breath somewhat, an MVP development retrospective (Post-mortem) session was held within the team. It was a time to look back on the development achievements so far and freely discuss what is needed to scale up this product into a real commercial service.

At that meeting, the Tech Lead first threw a topic.
> **"It is now time to defend the 'Floor' of the service. We absolutely need a guardrail called an evaluation system to support the quality so it doesn't fall below a certain level."**

It was an insight that hit the core. The trauma of past launch delays and the regrets of the evaluation system that failed in the first attempt flashed across my mind in an instant. Thankfully, the heavy responsibility of 'building an evaluation system' was entrusted to me once again.

Around that time, I was reading articles on the [Anthropic Engineering Blog](https://www.anthropic.com/engineering), which are released daily or every other day, and constantly sharing insights in the team chat room. They were articles surprisingly transparently and clearly written about what trials and errors they went through to elevate practical agents to the production level, how they designed harnesses, and with what engineering philosophies they handle models.

I was especially impressed when I read a post that comprehensively summarized Evaluation. Because fragmented tacit knowledge experienced in the field was structured into clear language.

> **"An evaluation system is like value investing. The earlier you start, the more you gain with compound interest, and the later you start, the more you have to pay the price."**

They too perfectly understood the past regrets of why they couldn't build an evaluation system sooner, and the realistic agony of development teams having no choice but to hesitate on an evaluation system under the pressure of the field. Yet, they were persuading with irrefutable logic on why it must be built right now.

Reflecting on those insights and our team's painful failure experience, I established **4 Core Design Philosophies** that will support our initial evaluation system.

---

### ① Evaluation is Not Grand Research: Requirements-Centric Practical Verification
The reason the first attempt failed was that we tried to make a 'perfect generalized benchmark'. In field production, the essence of evaluation is simple and practical. If you can mechanically verify **"Does the agent satisfy the specs actually required by the users who will use this system?"**, then that itself is an excellent evaluation system.

Instead of wasting time pondering academic metrics, you should start with the simplest assert statements and prompt rubrics that verify just one user requirement dropped in the current sprint (e.g., "Must comply with a specific format when saving a file", "Must deny viewing documents without view permission"). Evaluation in practice should not be top-down academic research, but strictly bottom-up practical engineering.

### ② Evaluation is the Most Specific 'Direction Consensus' and Communication Tool
While developing, 'different dreams in the same bed' (동상이몽) routinely occur where PMs, developers, and testers draw completely different pictures while using the same words. For the request "Please make the Korean response natural," the standard of 'naturalness' each person thinks of varies widely.

The moment you stipulate before developing a feature, "This is the evaluation rubric and Success Criteria we must pass," unnecessary cognitive discrepancies among collaborating parties disappear. Evaluation is not a post-verification tool, but **the most precise pre-communication tool that aligns the coordinates of the destination we must reach.**

### ③ Reliability (Silver Level) of the Evaluation System Comes from Transcript Monitoring
When making an evaluation system, many obsess over the 'Score' that drops as a number. However, in an agent system, a simple overall score (e.g., 85 points) gives no practical insight.

To become a reliable evaluation system, the thought process (Chain-of-Thought) of how the agent solved the problem, the tool invocation history, and the rationale of the evaluation system that graded this must remain in the form of a clear **Transcript log**.
In the initial stage, developers must continuously check this transcript with their own eyes and calibrate two things:
1. *Did the evaluation system make a judgment with the correct yardstick at the exact point according to the developer's intention?*
2. *Did the agent just get a good score but actually use a bizarre hack (Hacking)?*
Only when this monitoring loop runs can a 'Silver-level' reliability, which the whole team can trust and lean on, be secured.

### ④ The Evaluation System is the Best Automated Defense Line to Prevent Regression
Regression, where existing features break when a new feature is added, is the biggest enemy of LLM agent development. However, an evaluation case meticulously written once does not volatilize. It is permanently accumulated as a **'Regression Prevention Test Suite'** that intactly protects the deployment stability of the next version.

As development progresses, evaluation items accumulate, and this becomes the most powerful automated QA net that filters out potential failures in advance before deployment.
This is like **vacation homework journals** in school days. If you write one entry a day, you have nothing to worry about the day before school starts, but if you keep putting it off and try to write 30 days' worth of journals all at once on the night of August 31st, you have a problem where you can't even remember the weather and have to make it up. Building an evaluation system little by little every day is a core preventive measure that stops resource waste and makeshift responses right before launch.

---
## 4. Building a Practical Harness: Designing a Highly Visible Evaluation System Console

To implement the 4 philosophies established above into actual software, we designed and built a dedicated **Evaluator Console** where agent evaluations can be executed, observed, and analyzed.

![Agent Evaluation System Console](../../assets/evaluator_console.png)
> **Agent Evaluation System Console Composition**: Left (Evaluation History: Overall grade trend along the time axis), Center (Evaluation Execution: Setting variable factors like backbone model, target task, number of iteration runs, etc.), Right (Evaluation Monitoring: Summary of overall metrics and rendered transcripts & grader rationale analysis per task/iteration).

The reason I focused on console development first was clear. **An evaluation system that remains only as a terminal CLI and complex JSON files may be friendly to agents, but it is not friendly to humans at all.**

If an engineer cannot intuitively read the results at a glance and drill-down abnormal signs with a few clicks, evaluation is prone to be recognized as just another additional burden by colleagues who are chased by feature development every day. For evaluation to settle as a protocol and tool of consensus for the entire team, **visibility that is visible and easy to analyze** was essential.

### ① Version-Agnostic and Perfect Reproducibility

What we paid most attention to when designing the harness was "a coupling where the evaluation system breaks even if the agent code is slightly refactored".

1. **Git Commit-based Reproducibility**:
   To strictly manage the versioning of the code under evaluation, we integrated it so that based on the Git Commit ID of the agent service repository, the agent runtime at a specific point in time can be immediately checked out, perfectly reproduced, and tested.
2. **Black-box Input/Output Targeting**:
   The evaluation system code is managed in an independent repository completely separated from the app code. At this time, we excluded the method of hardcoding and parsing peripheral intermediate variables or state values inside the agent. The evaluation target data targeted only three things: **1) The text finally rendered to the user via UI, 2) The output document finally saved in the file system, 3) The entire conversation and tool invocation trajectory (Transcript)**. As long as the essential direction of the service does not pivot, it was designed so that the evaluation suite operates continuously even if the internal architecture of the agent changes.

### ② Composition of Evaluation Tasks: Environment and Three Graders

An evaluation task is broadly divided into the **Environment** where the agent will be placed and the **Grader** that scores it.

* **Environment**: Defines the input query, the previous multi-turn conversation history, and the agent's initial memory and file system state. In particular, we configured the dataset by duplicating 1:1 the failure environments that BPOs experienced during actual MVP testing, or augmenting them into harsher and more multidimensional edge cases based on them.
* **Grader**: To handle the complex characteristics of the agent, we did not stick to a single method but combined three methods:
  1. **LLM Assertion (Strict Adherence to Constraints)**: After giving clear and precise rubrics, it verifies whether essential conditions are **100% all satisfied (All-Pass)**. (e.g., "Did it comply with the specified file format?", "Did it refuse data queries without access permission?")
  2. **LLM Scoring (Quality Evaluation)**: Used when evaluating qualitative quality where subjectivity intervenes, such as the diversity of generated results or the precision of explanations. Pass/Fail is determined by whether the score graded based on the rubric exceeds a predefined Threshold.
  3. **Deterministic Rule-based (Deterministic Rule Verification)**: The surest safety net that compensates for the limitations of LLM judges. It efficiently classifies with regular expressions and codes whether Exceptions or error codes occurred during specific tool executions, or whether abnormal special tokens or broken unicodes are mixed in the Korean output.

### ③ Transcript Rendering and Grader Calibration

The right panel of the console renders in markdown the rationale of what thoughts (Chain-of-Thought) the agent went through to call which tools, and **why the Grader awarded such a score (Rationale)**.

To create a reliable evaluation system in the early days, developers must continuously proceed with Calibration by checking this transcript directly.

You should not blindly trust the result values of 'Pass' or '85 points' spit out by the grader. Because the LLMs acting as graders also have the risk of causing hallucinations or interpreting given rubrics arbitrarily and differently from the developer's intentions. Developers must constantly correct the following two things while directly following the transcript with their eyes.

1. **Logic Verification of the Grader**: Is the evaluator making consistent judgments with reasonable grounds according to the rubric we set? Didn't the agent get the correct answer via a shortcut but get processed as a pass (False Positive) for the wrong reason?
2. **Alignment of Standards**: Does the strictness or grading standard of the evaluator match the Golden Truth expected by field domain experts (BPO)?

Blindly delegating score judgments to the evaluation system without such a calibration process is like making another form of a giant black box. If you proceed with evaluation without knowing the confidence level of the evaluator, you ultimately cannot escape from 'development relying on gut feeling' like in the past. Only after going through this tedious and fierce adjustment work of precisely matching the evaluator's eye level to human standards is a solid evaluation infrastructure completed that the whole team can trust and lean on.

Furthermore, we organically connected a feedback loop that automatically derives cause analysis of the agent's failure and prompt/harness improvement plans by injecting failed transcript logs entirely into flagship coding agents like [Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview).

---

## 5. Value Proven in Practice: 3 On-site Debugging Case Studies

Since building the Evaluation System Console, the team's decision-making method has become dramatically solid. Three representative case studies experienced in the field prove this.

#### Case 1: From "It seems so" to "This is it" — Uncovering the Truth Behind Claude's Broken Korean Tokens
Recently, when the Claude 3.5 Sonnet / Opus models generated Tool JSON Arguments, they incorrectly encoded Korean in a unicode escape (`\uXXXX`) format, causing the hex values to slightly misalign and characters to completely break (e.g., `한국` → `한눍`), which was a fatal issue that became a huge topic in the community and GitHub.

The common belief spread in the community was *"It will be solved if you put a directive in the system prompt to output in UTF-8 format instead of `\uXXXX`"*. Our team also believed this hypothesis during the MVP and patched the prompt to deploy. However, in the field, broken characters were still intermittently reported.

After the Evaluation System Console was completed, we registered an evaluation task that copied the actual failure environment as it was. It still showed a Fail in the current version. As we refined the prompt even more strictly, `\uXXXX` completely disappeared from the return value. **However, surprisingly, the evaluation system still spat out a Fail.**

When closely analyzing the transcript and Rule-based grader logs, we found that even in a UTF-8 encoded state, the same form of token mangling was occurring due to a problem with the model's own decoding mechanism. The community's hypothesis was only half right.

As the cause became clear, the decision-making also became clear. We stopped excessively modifying prompts upon prompts anymore. Instead, we confirmed a solid and logical architectural workaround: **"Switch the backbone model temporarily to other models like Gemini or GPT only for that specific tool invocation step"**. Without the evaluation system, we would have again wasted time on repetitive modification tasks of prompt tuning.

#### Case 2: Early Detection and Agile Collaboration — MCP Server Tool Description Bug
We were uploading an [MCP (Model Context Protocol)](https://modelcontextprotocol.io/) server on top of a data twin (ontology) platform, and building a feature where the agent calls it as a tool. The MCP server development was divided between me and other engineers.

In the evaluation system, we had registered a labeling task saying *"When a specific business query comes in, the designated MCP tool must be called"*. However, the tool routing, which used to work well, continuously failed for a specific query.

We opened the transcript to check the agent's tool routing reasoning process. The cause was elsewhere. A highly restrictive constraint saying *"Use only when OO is included in the query"* was written in the Description of the MCP tool drafted by the collaborating team. Looking only at the description text of the tool, the agent was making an extremely logical refusal saying, "Since OO is not there, I shouldn't use it."

Thanks to the transcript that kept the agent's reasoning trajectory intact, we were able to share the exact location of the bug with the MCP engineers without doubt or emotional drain, and could quickly resolve the issue.

#### Case 3: Completely Automated Blocking of Regression — The End of 'Praying Meta'
The agent's runtime harness has prompts, tool schemas, hooks, context pipelines, etc. organically intertwined like a spider web. Regression, where existing features break when adding one feature, is an unavoidable fate.

Now we permanently register all resolved issues (Korean encoding, MCP tool routing, file formatting, etc.) as the evaluation system's **'Regression Prevention Suite'**. When adding a new feature and building up, an engineer only needs to click the regression suite once in the console.

The uncertain deployment process, where we deployed the code and left the results to luck until testers reported "This isn't working again?", has now been replaced by stable automated testing.

---

## 6. Conclusion: Why You Must Build Evaluation Cases Daily Like 'Vacation Homework Journals'

It has barely been a little over 2 weeks since we built the Evaluation System Console and settled it in practice. It is by no means a long time, but the cultural shift that occurred within the team during this short period is truly remarkable.

What changed the most is the **psychological stability of the development team**. While in the past the whole team heavily consumed resources tracking issues over a subjective word from a field tester saying "It got weird", now we calmly open the Evaluation System Console. We check the failed transcripts and tear apart the rubrics and tool invocation logs to point out causal relationships. Vague guesses of "It seems so" disappear, and only clear facts of "It failed at this point for this reason" remain on the table.

Of course, there is still a long way to go. The currently built evaluation system is mainly focused on functional constraints and bug verification (Assertion). Based on the golden truth sets built by BPOs, we are now advancing into a Phase 2 quality evaluation system that evaluates the subjective completeness of final outputs derived by the agent from multiple angles.

In the era of Vibe Coding, the speed of generating code and stamping out features has become unprecedentedly fast. However, just because the speed is faster doesn't mean you arrive at the destination sooner. If the direction is wrong, the accelerator pedal only amplifies system instability.

Just like writing down a vacation homework journal entry every day during school days, **the act of stacking a small evaluation case on the harness one by one every time a new requirement arises.**

Perhaps it might look much more tedious and cumbersome right now than implementing one more flashy feature right in front of your eyes. But I assert, the only seatbelt that safely leads an unpredictable wild system called an agent into the world of production is precisely that one diligent line of evaluation. The faster the era of development, the more systematically we must build evaluation systems.
