---
title: Profile
description: Hyuntak Kim's experience in AI research and product development.
lang: en
tags:
  - career
---

# Hyuntak Kim · AI Research Engineer

I research and build **agentic AI systems** that go beyond generating text to solve complex problems autonomously. Over the past four years at CJ and OnomaAI, I have worked across the full AI product lifecycle—from model design and evaluation to guardrails and production deployment.

My work goes beyond implementing models. I analyze failure cases and combine rule-based checks, LLM-as-Judge, and human evaluation into a multi-layered quality system. Through repeated cycles of improving prompts, context, and guardrails, I focus on building robust AI systems that handle edge cases reliably.

## Highlights

- Built, deployed, and operated the agentic AI products **SCRIPTy** and **TooToon** end to end
- First author of a long-form narrative summarization paper at **ACL 2025 Main Track**
- Led development of TooToon, winner of a **CES 2024 Innovation Award** in AI
- Filed **11 content-AI patents**—eight at CJ (confidential) and three at OnomaAI

## Experience

### CJ · AI Engineer

**March 2024 — Present**

#### Narrative Agent · Long-form Story Generation AI

- Designed an agent that writes long-form stories from outlines in collaboration with professional writers and other domain experts
- Built a pipeline that generates complete screenplays using test-time scaling and a multi-turn architecture
- Structured domain knowledge and used in-context learning to improve direction and entertainment value
- Designed automated evaluators that break generated stories into elements and measure coverage and adherence to the source outline
- Established an automated evaluation framework with strong agreement with human evaluation, enabling consistent quality control
- Developed an assistant environment for human–AI collaboration and feedback-in-the-loop workflows

#### SCRIPTy · AI Content Review for Professionals

- Designed a multi-LLM agentic summarization pipeline for long-form content exceeding 30,000 tokens
- Applied task decomposition, parallel generation and selection, and hierarchical merging to complex summarization tasks
- Improved summary quality over existing models across films, television programs, novels, and other narrative domains
- Reached the qualitative bar required by working professionals through continuous failure analysis and human evaluation
- Built guardrails spanning input preprocessing, output evaluation, and targeted revision to reduce hallucinations and factual errors
- Implemented reflection-based self-correction and an extensible registry-pattern guardrail system
- Achieved production-ready inference performance through LangGraph parallelization and vLLM optimization

#### DIAMOND · Baseball Highlight Generation AI

- Built the backend infrastructure and cloud deployment for an MVP using SkyPilot and AWS
- Optimized a GPU agent-server architecture for video and audio processing with FFmpeg, PySceneDetect, and WhisperX
- Validated post-processing that corrects speech-to-text results using baseball-specific knowledge such as player and team names

### OnomaAI · AI Team Lead, Director

**July 2022 — February 2024**

#### TooToon · AI Storyboard Generation for Webtoons

- Built a multimodal pipeline that generates webtoon sketches from natural-language input while adapting to user-defined characters with LoRA
- Developed a toolkit that extracts named entities and parts of speech from dialogue with a fine-tuned KoBERT model and automatically creates image prompts
- Built a Korean synopsis-generation model and data pipeline based on Llama 2
- Developed AI inference servers with FastAPI and led operations for a B2B solution serving webtoon production studios
- Led the overall project, earning a **CES 2024 Innovation Award** in AI and operating the on-site exhibition booth

#### ICONOCI · Generative AI Icon Service

- Built a visual-language dataset mapping images to their symbolic meanings in text
- Trained and improved a high-resolution icon-generation model based on latent diffusion
- Conducted joint research on generative AI and icon design (Jobicon) and was listed as second author

## Research

### NexusSum: Hierarchical LLM Agents for Long-Form Narrative Summarization

**ACL 2025 Main Track · First Author**

Researched long-form summarization, interactive and collaborative generation, and agentic AI methods. This work connects directly to SCRIPTy's approach to processing extremely long narrative content at CJ.

### Korean Synopsis Generation Model

**Yonsei University Graduate School · 2024**

Studied instruction tuning for small language models and methods for generating Korean webtoon and novel synopses.

## Education

- M.S., Digital Analytics Convergence, College of Computing, Yonsei University (2022—2024)
- B.A., Economics, Yonsei University (2016—2022)

## Technical Focus

`Agentic AI` · `LLM Evaluation` · `Long Context` · `LLM-as-Judge` · `Human Feedback` · `Guardrails` · `LangGraph` · `vLLM` · `SFT/DPO/ORPO` · `Multimodal Generation` · `FastAPI` · `AWS`
