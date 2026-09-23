---
title: Profile
description: Hyuntak Kim's experience in AI research and product development.
lang: en
tags:
  - career
---

# Hyuntak Kim · AI Research Engineer

I research and build **agentic AI systems** that autonomously decompose and solve complex problems.  
From model design and evaluation to guardrails and production serving, I lead the **full AI product lifecycle**.

---

## Highlights

- **Production Agentic AI**: End-to-end development and operations of production services including SCRIPTy and TooToon
- **Top-tier Publication**: First author of long-form narrative summarization research at **ACL 2025 Main Track**
- **Global Recognition**: Winner of **CES 2024 Innovation Award** in AI (Development Lead for TooToon)
- **Patents**: Filed **11 content-AI patents** (8 at CJ, 3 at OnomaAI)

---

## Experience

### CJ ENM · AI Engineer
*March 2024 — Present*

#### SCRIPTy · AI Content Review for Professionals
> Multi-agent system analyzing and summarizing long-form narratives (30,000+ tokens) across films, broadcasts, and novels

- **Hierarchical Agent Architecture**: Applied task decomposition, parallel generation/selection, and hierarchical merging to achieve factual, long-form summarization without distortion
- **Guardrails & Self-Correction**: Implemented pre/post-processing guardrails using reflection and an extensible registry pattern to suppress hallucinations and factual errors
- **Evaluation Framework**: Established an evaluation pipeline integrating quantitative metrics, Human Evaluation, and LLM-as-Judge to meet professional editorial standards
- **Production Serving Optimization**: Maximized inference efficiency and throughput via LangGraph workflow parallelization and vLLM acceleration

#### Narrative Agent · Long-form Story Generation AI
> Creative assistant agent generating complete, full-length screenplays from outlines

- **End-to-End Pipeline**: Introduced test-time scaling and multi-turn architectures to reliably generate consistent long-form scripts
- **Quality Control & Evaluation**: Designed automated evaluators assessing outline coverage and adherence, achieving high correlation with human judgment
- **Human-in-the-Loop Assistant**: Developed an interactive collaboration environment incorporating writer feedback into live prompts and context

#### DIAMOND · Baseball Highlight Generation AI
> Automated sports highlight generation system based on broadcast video and audio analysis

- **GPU Agent Infrastructure**: Built and optimized a distributed media processing backend (FFmpeg, WhisperX, PySceneDetect) using SkyPilot and AWS
- **Domain-Specific STT Post-Processing**: Verified post-processing pipelines incorporating baseball domain knowledge (players, teams, terminology)

---

### OnomaAI · AI Team Lead, Director
*July 2022 — February 2024*

#### TooToon · AI Storyboard Generation for Webtoons (CES 2024 Innovation Award)
> Multimodal solution generating custom webtoon sketches directly from dialogue and synopses

- **Multimodal Pipeline**: Built a pipeline extracting POS/NER with fine-tuned KoBERT to generate image prompts, with character-specific LoRAs for visual consistency
- **Korean Synopsis Model**: Trained and deployed a domain-specific storytelling sLLM and data pipeline based on Llama 2
- **Product & Business Delivery**: Led FastAPI inference serving, B2B studio delivery, CES 2024 Innovation Award entry, and on-site exhibition operations

#### ICONOCI · Generative AI Icon Design Service
> High-resolution graphic design asset generation system bridging textual meaning and visual semantics

- **Dataset & Model Training**: Constructed a visual-language mapping dataset and fine-tuned latent diffusion models for high-resolution icon generation
- **Academic Research**: Co-authored generative AI research in icon design (Jobicon, 2nd author)

---

## Research & Publications

- **NexusSum: Hierarchical LLM Agents for Long-Form Narrative Summarization**
  - **ACL 2025 Main Track** · First Author
  - Hierarchical LLM agent architecture for long-form narrative summarization (core engine of SCRIPTy)
- **Instruction Tuning for Korean Synopsis Generation Models**
  - **Master's Thesis, Yonsei University** (2024)
  - Methodologies for narrative generation via small language model (sLLM) instruction tuning

---

## Technical Stack

- **Agentic AI & LLM**: Multi-Agent Orchestration (LangGraph), Long-Context, Test-time Scaling, Reflection, Guardrails, In-Context Learning
- **Evaluation & Alignment**: LLM-as-Judge, Human-in-the-Loop Evaluation, SFT / DPO / ORPO, LoRA
- **Engineering & Serving**: vLLM, FastAPI, Python, PyTorch, SkyPilot, AWS, Docker

---

## Education

- **Yonsei University** · M.S. in Digital Analytics Convergence, College of Computing (2022.03 — 2024.02)
- **Yonsei University** · B.A. in Economics, School of Business & Economics (2016.03 — 2022.02)
