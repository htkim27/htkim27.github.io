---
title: Profile
description: AI Research Engineer 김현탁의 경력, 연구, 그리고 제품 개발 경험입니다.
tags:
  - career
---

# 김현탁 · AI Research Engineer

LLM의 단순한 텍스트 출력을 넘어, 복잡한 문제를 스스로 풀어나가는 **Agentic AI 시스템**을 연구하고 구축합니다. 지난 4년간 CJ와 OnomaAI에서 AI 모델의 설계부터 평가, 가드레일 구축, 그리고 프로덕션 서비스 배포까지 AI 프로덕트 사이클의 전 과정에 참여했습니다.

단순히 모델을 구현하는 것을 넘어, 실패 케이스를 분석하고 Rule-base, LLM-as-Judge, Human Evaluation을 엮어 다각도의 품질망을 설계합니다. 프롬프트, 컨텍스트, 가드레일을 보완하는 사이클(Loop)을 반복하며 예외 상황에 대처할 수 있는 견고한 AI 시스템을 구축하는 데 집중하고 있습니다.

## Highlights

- Agentic AI 기반 실서비스 **SCRIPTy**, **TooToon** End-to-End 개발·배포·운영
- **ACL 2025 Main Track** 장문 서사 요약 연구 1저자
- **CES 2024 AI 부문 혁신상** 수상 제품 TooToon 개발 리드
- 콘텐츠 AI 관련 특허 **11건 출원** — CJ 8건(비공개), OnomaAI 3건

## Experience

### CJ · AI Engineer

**2024.03 — Present**

#### Narrative Agent · 장편 스토리 생성 AI

- 작가 등 현업 전문가들과 협업하여, 개요(Outline)를 기반으로 장편 스토리를 작성하는 Agent 설계
- Test-time Scaling 기법 및 Multi-turn 구조를 적용해 대본의 처음부터 끝까지 자동 생성하는 파이프라인 구축
- 도메인 지식을 구조화하고 In-context Learning(ICL)을 활용해 이야기의 연출과 재미 요소 강화
- 생성된 스토리를 세부 요소로 분해하고, 원본 개요를 얼마나 반영했는지(Coverage/Adherence) 분석하는 자동 평가기 설계
- 실제 인간 평가(Human Evaluation)와 일치율이 높은 자동 평가 체계를 구축하여, 생성 결과물의 품질을 안정적으로 통제
- 인간 작가와 AI가 함께 작업하며 피드백을 주고받는(Human-AI Collaboration / Feedback-in-the-loop) 어시스턴트 환경 개발

#### SCRIPTy · 전문가용 콘텐츠 리뷰 AI

- 30,000 토큰 이상의 장문 콘텐츠를 처리하는 Multi-LLM 기반 Agentic 요약 파이프라인 설계
- 복잡한 요약 작업을 잘게 쪼개고(Task Decomposition), 병렬로 생성 및 선택하며, 계층적으로 병합(Hierarchical Merging)하는 아키텍처 적용
- 영화, 방송 프로그램, 소설 등 다양한 도메인의 서사 콘텐츠에서 기존 모델 대비 요약 품질 개선
- 지속적인 실패 분석과 Human Evaluation을 거쳐 현업 전문가가 요구하는 정성적 품질 기준 달성
- 입력 전처리부터 결과물 평가, 부분 수정까지 이어지는 가드레일을 구축하여 환각(Hallucination) 및 내용 오류 억제
- 모델 스스로 출력을 반성하고 수정하는 Reflection 기법과 확장 가능한 Registry 패턴을 활용한 가드레일 시스템 구현
- LangGraph를 활용한 작업 병렬화 및 vLLM 기반 추론 속도 최적화를 통해, 프로덕션 환경에 적합한 추론 성능 확보

#### DIAMOND · 야구 하이라이트 생성 AI

- SkyPilot 및 AWS를 활용하여 MVP 모델의 백엔드 인프라 구축 및 클라우드 배포
- 비디오/오디오 처리(FFmpeg, PySceneDetect, WhisperX)에 특화된 GPU Agent 서버 아키텍처 최적화
- 선수명, 팀명 등 야구 도메인 특화 사전 정보를 활용하여 음성 인식(STT) 결과물을 교정(후처리)하는 프로세스 검증

### OnomaAI · AI Team Lead, Director

**2022.07 — 2024.02**

#### TooToon · 웹툰 글·그림 콘티 생성 AI

- 사용자가 직접 설정한 캐릭터에 맞춰(LoRA), 자연어 입력만으로 웹툰 스케치를 자동 생성하는 멀티모달 파이프라인 구축
- 자체 미세조정(Fine-tuned)한 KoBERT를 활용해 대사에서 개체명(NER)과 품사를 추출, 이미지 프롬프트를 자동 생성하는 툴킷 개발
- Llama 2 모델을 기반으로 한국어 시놉시스를 생성하는 자체 모델 및 데이터 파이프라인 구축
- FastAPI를 이용해 AI 추론 서버를 개발하며, 웹툰 제작 스튜디오를 대상으로 한 B2B 솔루션 운영 총괄
- 프로젝트 전반을 리드하여 **CES 2024 AI 부문 혁신상** 수상 및 현지 부스 운영

#### ICONOCI · 생성형 AI 아이콘 서비스

- 이미지와 그에 담긴 상징적 의미(텍스트)를 매핑하는 Visual Language 데이터셋 구축
- Latent Diffusion 아키텍처를 기반으로 한 고해상도 아이콘 생성 AI 모델 학습 및 성능 개선
- 생성 AI 및 아이콘 디자인 관련 연구(Jobicon) 공동 진행 및 논문 2저자 등재

## Research

### NexusSum: Hierarchical LLM Agents for Long-Form Narrative Summarization

**ACL 2025 Main Track · First Author**

Long-form summarization, interactive and collaborative generation, Agentic AI 방법론을 연구했습니다. CJ에서 개발한 SCRIPTy의 초장문 콘텐츠 처리 기술과 연결되는 연구입니다.

### 한국어 시놉시스 생성 모델 학습

**연세대학교 일반대학원 · 2024**

sLLM 기반의 Instruction Tuning 기법을 연구하고, 이를 바탕으로 한국어 웹툰/소설 시놉시스를 생성하는 방법론을 고찰했습니다.

## Education

- 연세대학교 인공지능융합대학 디지털애널리틱스융합전공 석사 (2022—2024)
- 연세대학교 상경대학 경제학과 학사 (2016—2022)

## Technical Focus

`Agentic AI` · `LLM Evaluation` · `Long Context` · `LLM-as-Judge` · `Human Feedback` · `Guardrails` · `LangGraph` · `vLLM` · `SFT/DPO/ORPO` · `Multimodal Generation` · `FastAPI` · `AWS`
