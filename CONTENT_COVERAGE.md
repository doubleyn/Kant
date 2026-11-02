# 원문 대응 및 검증 기록

## 2026-10-26 · winget, Git/GitHub, CLI

원문: https://app.notion.com/p/405acd67b1e78059af00e5c45cd95c92

| 장 | 제목 | 원문 절 | 단계 |
|---|---|---|---|
| 1 | winget으로 Git 설치하기 | winget | 5 |
| 2 | Git과 GitHub | Git & GitHub | 3 |
| 3 | 터미널과 셸, Git Bash 선택 | CLI 실습 | 4 |
| 4 | 내 위치와 폴더 확인 | Git Bash 기본 명령어 | 9 |
| 5 | 파일 목록의 권한 읽기 | 파일 정보 | 3 |
| 6 | 경로와 명령 이력 | 경로 / history | 9 |
| 7 | 터미널 입력을 빠르게 | 단축키 | 3 |
| 8 | 파일 만들기와 리다이렉션 | touch / echo / cat | 5 |

## 2026-10-27 · VSCode Terminal, Git/GitHub, VIM

원문: https://app.notion.com/p/406acd67b1e78070bc58d41593326c35

| 장 | 제목 | 원문 절 | 단계 |
|---|---|---|---|
| 1 | Git Bash와 README 만들기 | CLI | 4 |
| 2 | Git 사용자 정보 설정 | git config | 5 |
| 3 | 초기화, 스테이징, 커밋 | Git | 5 |
| 4 | 수정 내용을 diff로 확인 | Source Control | 3 |
| 5 | Vim의 입력과 저장 | vi 에디터 vim | 4 |
| 6 | HEAD와 커밋 기록 | HEAD / git log | 7 |
| 7 | 원격 저장소 연결 | 원격 레포지토리와 연결 및 푸시 | 5 |
| 8 | 변경을 커밋하고 푸시 | git status / add / commit / push | 7 |

## 2026-10-28 · Git Branch

원문: https://app.notion.com/p/407acd67b1e780fcb669ce63d6b118e6

| 장 | 제목 | 원문 절 | 단계 |
|---|---|---|---|
| 1 | FontSize Shortcuts 확장 | vscode extension | 2 |
| 2 | 출력 연결과 순차 실행 | / / && | 5 |
| 3 | 추적 제외 규칙 작성 |  .gitignore | 3 |
| 4 | 복제와 스테이징 범위 | clone / add | 7 |
| 5 | reset의 세 가지 범위 | git reset | 4 |
| 6 | HEAD 이동 기록과 메시지 수정 | reflog / amend | 5 |
| 7 | 브랜치 만들고 이동하기 | Git Branch | 4 |
| 8 | 브랜치 목록과 삭제 | Git Branch | 7 |
| 9 | 코드 줄 이동·복사·제거 | VSCode 단축키 | 4 |
| 10 | main에 브랜치 병합 | Git Merge | 3 |

## 2026-10-29 · Git 협업 전략

원문: https://app.notion.com/p/408acd67b1e78001ae79e38c05e69030

| 장 | 제목 | 원문 절 | 단계 |
|---|---|---|---|
| 1 | 프로젝트와 입력 위치 | VSCode / VIM | 2 |
| 2 | Git Graph로 기록 보기 | git log / Git Graph | 3 |
| 3 | 같은 줄을 수정하면 충돌 | conflict | 5 |
| 4 | 협업 저장소의 작업 순서 | 협업 레포 작업 | 4 |

## 2026-10-30 · 파이썬/주피터노트북 환경설정

원문: https://app.notion.com/p/409acd67b1e7804bab7ecf39939f03a2

| 장 | 제목 | 원문 절 | 단계 |
|---|---|---|---|
| 1 | 대화형으로 Python 실행 | 파이썬의 역사와 특징 | 7 |
| 2 | Python 버전 출시 기록 | 파이썬 버전 출시 시기 | 2 |
| 3 | 줄바꿈 LF / CRLF | LF / CRLF | 2 |
| 4 | uv 설치와 초기화 | 파이썬 버전 관리 도구 설치 | 7 |
| 5 | 프로젝트 설정 파일 |  .gitignore / pyproject.toml | 2 |
| 6 | 첫 실행과 환경 생성 | 실행해보기 | 4 |
| 7 | 버전을 지정해 프로젝트 만들기 | 파이썬 버전 지정 | 5 |
| 8 | 프로젝트의 Python 버전 변경 | 프로젝트의 파이썬 버전 변경하기 | 4 |
| 9 | 패키지 추가와 의존성 트리 | 패키지 추가하기 / tree | 4 |
| 10 | 패키지 삭제와 동기화 | 패키지 삭제하기 | 5 |
| 11 | 어떤 Python이 실행되나요? | python 위치 / source | 7 |
| 12 | VS Code 확장과 커널 준비 | Jupyter Notebook | 3 |
| 13 | 노트북 만들고 커널 선택 | chapter01.ipynb | 4 |
| 14 | 셀 실행과 다음 셀 이동 | ctrl + enter / shift + enter | 3 |
| 15 | 명령 모드에서 셀 편집 | esc / a / b / m / y / dd / z | 6 |

## 검증

- Node 테스트 7개 통과: 모든 204개 상태 렌더링, 단계 우선 진행, 이전 장 완성상태, URL 복원과 경계, 원문 연결, 노트 개폐 상태 유지, 키보드 진행과 텍스트 선택 충돌 방지.
- 오프라인 HTML 번들 JavaScript 문법 검사 통과. README.md 변경 없음, 원격 push 없음.
- 실제 브라우저 검증: 내장 브라우저가 http://127.0.0.1:4188 연결에서 ERR_CONNECTION_TIMED_OUT를 반환. 화면 비율, 애니메이션 품질, 모바일 터치의 실제 시각 검수는 미완료. Node 테스트가 이를 대체하지 않음.
- 원문 이미지 파일 참조는 source.md에 보존되어 있으나 연결 도구가 이미지 다운로드 URL을 제공하지 않아 이미지별 시각 대조는 미완료. 앞서 확인한 공개 참고자료의 VS Code/Jupyter 배치를 바탕으로 UI 재현.
