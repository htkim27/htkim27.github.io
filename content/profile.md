---
title: Profile
description: AI Research Engineer 김현탁의 경력, 연구, 그리고 제품 개발 경험입니다.
tags:
  - career
---

# 김현탁 · AI Research Engineer

복잡한 문제를 스스로 분해하고 해결하는 **Agentic AI 시스템**을 연구하고 제품으로 구현합니다.  
모델 설계부터 Evaluation, Guardrails 구축, 프로덕션 서빙까지 **AI Product Lifecycle 전 과정**을 경험해왔습니다.

---

## Highlights

- **Agentic AI 실서비스 상용화**: SCRIPTy, TooToon 등 프로덕션 서비스 End-to-End 개발·운영
- **탑티어 학회 논문**: **ACL 2025 Main Track** 장문 서사 요약 연구 제1저자
- **글로벌 어워드**: **CES 2024 AI 부문 혁신상** 수상 (TooToon 개발 총괄)
- **특허 출원**: 콘텐츠 AI 핵심 알고리즘 관련 **특허 11건 출원** (현재 1건 등록)

---

## Experience

### CJ · AI 엔지니어
*2024.03 — Present*
#### Narrative Agent · 장편 스토리 생성 AI
> 완성형 장편 대본을 자율 생성하는 창작 보조 Agent

- **End-to-End 생성 파이프라인**: Test-time Scaling 및 Multi-turn 구조를 도입하여 긴 호흡의 일관된 대본을 자동 생성
- **스토리 품질 통제 & 평가**: 원본 개요 반영도(Coverage/Adherence)를 세부 분해해 측정하는 자동 평가기를 구축하여 Human Eval 일치율 극대화
- **Human-in-the-Loop 어시스턴트**: 작가의 피드백을 실시간 프롬프트·컨텍스트에 반영하는 상호작용형 협업 환경 개발

#### SCRIPTy · 전문가용 장문 콘텐츠 리뷰 AI
> 30,000+ 토큰의 영상·방송·소설 등 장문 서사를 정밀 분석·요약하는 Multi-Agent 시스템

- **계층형 에이전트 설계**: 긴 서사 분해(Task Decomposition), 병렬 생성·선택, 계층적 병합(Hierarchical Merging)을 통해 환각 없는 초장문 요약 구조 구현
- **가드레일 & 자가 교정**: Reflection 기법과 확장형 Registry 패턴을 적용해 환각 및 팩트 오류를 억제하는 전·후처리 가드레일 구축
- **평가 체계 확립**: 정량 지표, Human Evaluation, LLM-as-Judge를 통합하여 전문가 눈높이의 품질 제어 기준 수립
- **엔터프라이즈 서빙 최적화**: LangGraph 기반 워크플로우 병렬화 및 vLLM 추론 가속으로 프로덕션 서빙 성능 확보

---

### OnomaAI · AI팀 리드, 사내이사
*2022.07 — 2024.02*

#### TooToon · 웹툰 콘티 자동 생성 AI (CES 2024 혁신상)
> 자연어 대사 및 시놉시스로부터 맞춤형 웹툰 스케치 콘티를 자동 생성하는 멀티모달 솔루션

- **멀티모달 파이프라인**: KoBERT 파인튜닝으로 대사 속 품사/NER을 추출해 이미지 프롬프트를 자동 생성하고, 캐릭터별 LoRA를 적용해 맞춤형 스케치 생성
- **한국어 시놉시스 모델**: Llama 2 기반의 한국어 스토리텔링 특화 sLLM 및 데이터 파이프라인 구축
- **제품화 & 사업화 리드**: FastAPI 추론 서버 개발, B2B 웹툰 스튜디오 공급 및 CES 2024 혁신상 수상·현지 부스 총괄

#### ICONOCI · 생성형 AI 아이콘 디자인 서비스
> 텍스트 의미와 시각 언어를 결합한 고해상도 디자인 에셋 생성 시스템

- **데이터셋 & 모델 학습**: Visual-Language 매핑 데이터셋 구축 및 Latent Diffusion 기반 고해상도 아이콘 생성 모델 파인튜닝
- **학술 연구 연계**: 생성 AI 기반 아이콘 디자인 연구(Jobicon) 공동 진행 및 논문 2저자 등재

---

## Research & Publications

- **NexusSum: Hierarchical LLM Agents for Long-Form Narrative Summarization**
  - **ACL 2025 Main Track** · First Author
  - 초장문 서사 요약을 위한 계층형 LLM 에이전트 아키텍처 연구 (SCRIPTy 코어 기술 연계)
- **한국어 시놉시스 생성 모델 학습 및 인스트럭션 튜닝**
  - **연세대학교 석사 학위논문** (2024)
  - 소형 언어 모델(sLLM)의 Instruction Tuning을 통한 서사 콘텐츠 생성 방법론 고찰

---

## Technical Stack

- **Agentic AI & LLM**: Multi-Agent Orchestration (LangGraph), Long-Context, Test-time Scaling, Reflection, Guardrails, In-Context Learning
- **Evaluation & Alignment**: LLM-as-Judge, Human-in-the-Loop Evaluation, SFT / DPO / ORPO, LoRA
- **Engineering & Serving**: vLLM, FastAPI, Python, PyTorch, SkyPilot, AWS, Docker

---

## Education

- **연세대학교 인공지능융합대학** 디지털애널리틱스융합전공 석사 (2022.03 — 2024.02)
- **연세대학교 상경대학** 경제학과 학사 (2016.03 — 2022.02)
