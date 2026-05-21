# Multi-Agent Orchestration Dashboard — 구현 계획

> **스택**: 순수 HTML + CSS + JavaScript  
> **목표**: 멀티 에이전트 상태, 태스크, 로그, 전략을 한 화면에서 확인하는 대시보드 구현  
> **구성 파일**:
>
> ```text
> dashboard/
>   index.html
>   style.css
>   app.js
>   mock-data.js
> ```

## 진행 순서

1. HTML로 전체 섹션을 먼저 만든다.
2. mock 데이터를 별도 파일에 정의한다.
3. JavaScript로 카드, 태스크, 로그, 전략 목록을 렌더링한다.
4. 필터, 검색, 메모 저장, 모달 기능을 추가한다.
5. CSS로 다크 테마와 반응형 레이아웃을 완성한다.

## STEP 01 — 파일 연결

- `index.html`에서 `style.css`를 연결한다.
- `mock-data.js`를 먼저 불러오고, 그 다음 `app.js`를 불러온다.
- 브라우저 콘솔에 오류가 없어야 한다.

## STEP 02 — 데이터 설계

`mock-data.js`에 다음 배열을 만든다.

- `AGENTS`: 에이전트 이름, 역할, 상태, 모델, 완료/실패 수
- `TASKS`: 태스크 ID, 제목, 담당자, 상태, 우선순위, 시작/완료 시각
- `LOGS`: 로그 ID, 시각, 레벨, 에이전트 ID, 메시지
- `MODEL_STRATEGIES`: 전략 이름, 설명, 활성화 여부

## STEP 03 — 화면 섹션

`index.html`에는 다음 영역이 있어야 한다.

- 헤더와 요약 정보
- 에이전트 카드 그리드
- 태스크 목록과 상태 필터
- 로그 검색/레벨 필터/메모 패널
- 모델 전략 체크리스트
- 에이전트 상세 모달

## STEP 04 — 렌더링 함수

`app.js`에 다음 함수를 구현한다.

- `renderAgents()`
- `renderTasks(filter)`
- `renderLogs()`
- `renderStrategies()`
- `renderSummary()`
- `openAgentModal(agentId)`
- `closeAgentModal()`

## STEP 05 — 인터랙션

- 태스크 필터 버튼 클릭 시 목록을 다시 그린다.
- 로그 검색어 입력 시 결과를 즉시 갱신한다.
- 로그 레벨 선택 시 해당 레벨만 표시한다.
- 전략 체크박스 변경 시 화면 상태를 업데이트한다.
- 메모 저장 버튼 클릭 시 localStorage에 저장한다.
- 에이전트 카드 클릭 시 상세 모달을 연다.

## STEP 06 — 스타일링

- 전체는 어두운 배경의 운영 대시보드 톤으로 만든다.
- 상태별 색상을 구분한다: active, running, idle, error, done, pending.
- 카드, 리스트, 로그, 모달은 동일한 border/radius 규칙을 사용한다.
- 900px 이하에서는 1열 레이아웃으로 전환한다.

## 완료 기준

- 모든 섹션이 mock 데이터로 렌더링된다.
- 필터/검색/메모/모달이 정상 동작한다.
- 새로고침 후에도 저장한 메모가 유지된다.
- 콘솔 오류가 없다.
- README의 실행 방법으로 바로 확인할 수 있다.
