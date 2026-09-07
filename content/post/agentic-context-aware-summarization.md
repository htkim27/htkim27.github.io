---
title: "(작성중) [Agentic AI] 소설과 대본처럼 촘촘한 글, 맥락 손실 없이 안전하게 요약하는 법"
date: "2026-09-07"
description: "키워드 추출만으로는 담아낼 수 없는 장문 서사. 복선과 인과관계를 보존하며 고유의 맥락을 안전하게 요약하는 NexusSum 프레임워크를 소개합니다."
socialImage: "https://img.youtube.com/vi/wB7TDnWc2mw/maxresdefault.jpg"
tags: ["Agentic AI", "LLM", "Summarization", "NexusSum", "Long Context", "NLP", "WIP"]
draft: true
---

> [!NOTE]
> ✍️ **현재 작성 중인 글입니다.** (초안 구조이며 내용이 계속 보강되고 있습니다.)

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 8px; margin: 1.5rem 0;">
  <iframe 
    src="https://www.youtube.com/embed/wB7TDnWc2mw" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen 
    title="NexusSum: Hierarchical LLM Agents for Long-Form Narrative Summarization">
  </iframe>
</div>

> 📄 **논문 원문**: [NexusSum: Hierarchical LLM Agents for Long-Form Narrative Summarization (arXiv:2505.24575)](https://arxiv.org/abs/2505.24575)  
> *저자: Hyuntak Kim, Byung-Hak Kim*

---

## 1. 서론: 왜 소설과 대본은 요약하기가 이토록 어려울까?

일반적인 뉴스 기사나 기술 문서는 핵심 키워드와 문단을 추려내는 것만으로도 훌륭한 요약본을 만들 수 있습니다. 두괄식 구조가 많고, 정보가 독립적으로 배치되어 있기 때문입니다.

하지만 **영화 대본, TV 드라마 시나리오, 장편 소설과 같은 '서사(Narrative)' 데이터**는 완전히 다릅니다.
- 초반에 무심코 지나친 대사 한 줄이 후반부의 결정적 복선(Foreshadowing)이 됩니다.
- 인물 간의 관계와 감정선이 대화(Dialogue)와 지문(Description) 사이에 얽혀 있습니다.
- 사건의 전후 인과관계가 정교한 그물망처럼 연결되어 있어, 중간 한 토막을 잘못 축약하면 뒤따르는 결말의 개연성이 완전히 무너집니다.

기존 LLM의 컨텍스트 윈도우가 아무리 길어졌다고 해도, 10만 단어가 훌륭히 넘어가는 장편 텍스트를 통째로 넣거나 단순 청킹(Chunking)으로 쪼개어 요약하면 **"줄거리는 대충 맞는데, 왜 그런 일이 일어났는지 맥락은 싹 사라진 맹탕 요약본"**이 나오기 십상이었습니다.

이 문제를 해결하기 위해, 별도의 추가 파인튜닝(Fine-tuning) 없이도 고유 서사 맥락을 보존하는 멀티 에이전트 프레임워크 **NexusSum**을 제안했습니다.

---

## 2. 기존 긴 글 요약의 고질적 한계

긴 문서를 다룰 때 흔히 사용하는 기존 방법론들은 서사 구조에서 뚜렷한 한계를 보입니다.

1. **Map-Reduce 방식의 맥락 파편화**
   - 긴 글을 청크로 쪼개어 각각 요약(Map)한 뒤, 요약문들을 다시 합쳐 요약(Reduce)하는 방식입니다.
   - 각 청크가 서로 고립된 채 요약되므로, 청크 경계면에 걸쳐 있는 복선이나 인물의 점진적인 심리 변화가 완전히 증발합니다.
2. **Refine(누적 요약) 방식의 정보 유실 및 편향**
   - 앞선 요약본을 다음 청크에 누적해서 전달하는 방식입니다.
   - 글이 뒤로 갈수록 앞선 요약본의 디테일이 덮어씌워지거나, 초반 정보가 압도되어 후반부 플롯이 왜곡되는 현상이 발생합니다.
3. **대화와 지문의 형식적 불균형**
   - 대본에는 화자 태그(`JOHN:`, `SARAH:`)와 짧은 대사가 난무합니다. 이를 일반적인 텍스트처럼 취급하면 LLM이 맥락을 온전히 파악하지 못하고 단순 대화 로그로 오인하기 쉽습니다.

---

## 3. NexusSum의 두 가지 핵심 혁신

NexusSum은 추가적인 모델 학습 없이, **체계적이고 순차적인 에이전트 파이프라인**을 통해 서사의 디테일과 일관성을 지켜냅니다.

### ① 대화-서술 변환 (Dialogue-to-Description Transformation)
대본 특유의 파편화된 대사-지문 형식을 표준화된 고품질 서술형 텍스트로 정규화하는 전처리 단계입니다.
- 화자의 숨은 의도, 감정 상태, 행동 지문을 하나의 유기적인 설명형 문맥으로 변환합니다.
- 형식적인 노이즈를 제거하여 후속 요약 에이전트들이 서사의 본질적인 사건 흐름에만 집중할 수 있도록 돕습니다.

### ② 계층형 멀티 LLM 요약 파이프라인 (Hierarchical Multi-LLM Summarization)
청크를 무작정 압축하는 대신, 계층적 구조를 갖춘 에이전트들이 역할을 분담합니다.
- **Scene-level / Chapter-level Summarizer**: 개별 장면 단위의 세밀한 사건과 인물 상호작용을 보존.
- **Narrative Aggregator**: 이전 장면의 요약 정보와 인과관계를 유지하면서 상위 계층으로 서사를 점진적 통합.
- **Global Refiner & Length Controller**: 최종 목표 길이에 맞춰 군더더기를 덜어내되 핵심 플롯 라인과 복선을 끝까지 검증.

---

## 4. 실험 결과 및 주요 성과

책(Books), 영화(Movies), TV 드라마 대본(TV Scripts) 등 다양한 롱폼 서사 벤치마크에서 기존 최고 수준의 요약 기법 대비 **BERTScore(F1) 기준 최대 30.0%의 괄목할 만한 성능 향상**을 기록했습니다.

- 단순 키워드 겹침(ROUGE)을 넘어 문맥적 의미 유사도와 서사 일관성에서 큰 격차를 증명했습니다.
- 특히 인물 간의 갈등 해결 과정과 후반부 복선 회수 표현에서 인간 평가자들의 높은 질적 선호도를 얻었습니다.

---

## 5. 마치며: 실무 에이전트 설계를 향한 시사점

소설이나 대본 같은 예술적 서사를 요약하는 기술은 단지 엔터테인먼트 산업에만 머물지 않습니다.
- 수백 페이지에 달하는 복잡한 **법률 판례 분석**,
- 여러 날짜에 걸쳐 얽혀 있는 **장기 프로젝트 회의록 및 히스토리 정리**,
- 멀티턴이 수십 번 누적된 **고객 상담 여정(Journey) 압축** 등,

인과관계와 맥락이 생명인 모든 복잡한 비즈니스 텍스트에 동일하게 적용될 수 있는 강력한 파이프라인입니다.

*(상세 구현 세부 사항과 프롬프트 엔지니어링 팁은 다음 챕터에서 계속 이어집니다...)*
