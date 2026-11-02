# 실행 및 편집

`index.html`을 브라우저에서 직접 열면 외부 서비스 없이 사용할 수 있습니다.

개발 시 Node.js에서:
```
node build.mjs
node --test tests/state.test.mjs
node server.mjs
```
미리보기: http://127.0.0.1:4188

날짜별 강의는 `content/lectures.mjs`, 원문은 `content/*-source.md`, 재생 규칙은 `src/state.mjs`, 화면은 `src/app.mjs`와 `src/style.css`에 있습니다. 수정 후 build를 실행하세요.

다음: 화면 오른쪽 클릭 / → / Space / Enter. 이전 장: 왼쪽 1/3 클릭 / ←. N: 우측 노트, F: 전체 화면. 목차는 상단 날짜를 누르면 열립니다. 빠르게 연속 입력하면 진행 중인 효과만 완료합니다.

홈에는 분류=TIL인 2026-10-26~30의 다섯 기록만 있습니다. 보충 설명·정정·퀴즈는 우측 노트입니다. Git 명령과 Python은 실제 실행되지 않습니다. 원문의 이메일과 사용자 경로는 예시로 바꿨습니다. 원격 푸시와 자동 동기화는 없습니다.
