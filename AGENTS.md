# Multi-Agent Orchestration Dashboard — AGENTS

이 문서는 대시보드 제작 과정에서 참고할 수 있는 에이전트 역할을 정리한다. 실제 세부 역할 정의는 `.opencode/agents/*.md` 파일을 따른다.

## 에이전트 역할 요약

- `orchestrator.md` — 전체 목표를 작은 작업으로 나누고 실행 순서를 조율한다.
- `planner.md` — 구현 범위와 단계별 계획을 만든다.
- `requirements-analyst.md` — 요구사항, 제약 조건, 완료 기준을 정리한다.
- `ia-flow-designer.md` — 정보 구조와 사용자 흐름을 설계한다.
- `visualization-designer.md` — 카드, 지표, 로그, 상태 표현 방식을 설계한다.
- `frontend-implementer.md` — HTML/CSS/JS 기반 화면과 상호작용을 구현한다.
- `backend-pipeline.md` — 데이터 흐름, 이벤트 구조, 로그 포맷을 설계한다.
- `validator.md` — 동작 확인과 테스트 체크리스트를 수행한다.
- `debugging-expert.md` — 렌더링 오류, 이벤트 오류, 데이터 연결 문제를 진단한다.
- `ops-observer.md` — 대시보드 운영 관점에서 병목과 이상 상태를 관찰한다.
- `docs-expert.md` — README와 과제 설명을 정리한다.
- `designer.md` — 화면 톤, 간격, 시각적 계층을 다듬는다.
- `code-reviewer.md` — 코드 품질과 유지보수성을 검토한다.
- `tdd-agent.md` — 검증 시나리오와 테스트 관점을 제안한다.
- `main-developer.md` — 핵심 구현을 통합한다.

## 협업 원칙

- 각 에이전트는 입력값, 출력물, 수정 범위를 명확히 남긴다.
- 불확실한 부분은 가정으로 처리하지 않고 이슈로 표시한다.
- 결과는 다음 에이전트가 바로 이어받을 수 있게 짧고 구조적으로 작성한다.
- 오류가 발생하면 원인, 영향 범위, 재시도 방법을 함께 기록한다.
- 오케스트레이터는 검증된 결과만 다음 단계로 넘긴다.
