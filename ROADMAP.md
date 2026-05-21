# 포토 갤러리 학습 로드맵

> Unsplash API 기반 포토 갤러리 앱을 단계별로 직접 구현한다.
> 각 단계는 독립적으로 완성 가능하며, 다음 단계의 기반이 된다.

---

## Phase 1 — React 훅으로 기본 갤러리 구현

목표: `useState`, `useEffect`를 직접 써서 Unsplash API와 연결하고 갤러리를 화면에 띄운다.

### 할 일

- [x] Unsplash 개발자 계정 생성 및 API 키 발급
- [x] `.env` 파일에 API 키 저장 (`VITE_UNSPLASH_ACCESS_KEY`)
- [x] `useEffect`로 컴포넌트 마운트 시 Unsplash API 호출
- [x] `useState`로 이미지 목록(`photos`), 로딩 상태(`isLoading`), 에러 상태(`error`) 관리
- [x] 이미지 목록을 그리드로 렌더링 (`PhotoGrid` 생략, Home에서 처리)
- [x] 개별 이미지 카드 `PhotoCard` 컴포넌트 작성 (썸네일, 작가명 표시)
- [x] 로딩 중일 때 스피너 표시
- [x] API 에러 발생 시 에러 메시지 표시

### 체크포인트

- 앱을 켰을 때 Unsplash 이미지가 그리드로 보인다
- 로딩 중에 피드백(스피너 등)이 표시된다
- API 키가 코드에 하드코딩되어 있지 않다

---

## Phase 2 — 검색 기능 추가

목표: `useState`와 `useEffect`의 의존성 배열을 이해하며 검색 흐름을 구현한다.

### 할 일

- [ ] 검색어 상태(`query`) 추가
- [ ] 검색창 `SearchBar` 컴포넌트 작성
- [ ] `query`가 바뀔 때마다 API를 다시 호출하도록 `useEffect` 의존성 배열 조정
- [ ] 검색어가 없을 때는 기본 피드(최신/인기) 표시
- [ ] 검색 중 로딩 상태 처리
- [ ] 검색 결과가 없을 때 "결과 없음" 메시지 표시

### 체크포인트

- 검색창에 단어를 입력하면 관련 이미지로 결과가 바뀐다
- 검색어를 지우면 기본 피드로 돌아온다

---

## Phase 3 — 커스텀 훅으로 리팩토링

목표: 반복되는 데이터 페칭 로직을 커스텀 훅으로 분리해 재사용성을 높인다.

### 할 일

- [ ] `useFetch` 훅 작성 — URL을 받아서 `{ data, isLoading, error }`를 반환
- [ ] `useUnsplash` 훅 작성 — Unsplash 전용 로직(헤더, 엔드포인트) 캡슐화
- [ ] `useDebounce` 훅 작성 — 검색어 입력 딜레이 처리 (타이핑마다 API 호출 방지)
- [ ] 컴포넌트에서 `useState` + `useEffect` 직접 호출 코드를 커스텀 훅으로 교체
- [ ] 교체 후 동작이 Phase 2와 동일한지 확인

### 체크포인트

- 컴포넌트 파일에서 `fetch`를 직접 호출하는 코드가 없다
- 같은 훅을 다른 페이지에서도 재사용할 수 있는 구조다
- 검색어 타이핑 시 API 호출이 debounce된다

---

## Phase 4 — 페이지네이션 / 무한 스크롤

목표: `useRef`와 Intersection Observer로 무한 스크롤을 구현한다.

### 할 일

- [ ] 페이지 번호 상태(`page`) 추가, 다음 페이지 API 호출 구현
- [ ] `useRef`로 스크롤 감지용 sentinel 요소 참조
- [ ] `IntersectionObserver`를 `useEffect`로 등록/해제
- [ ] 스크롤이 하단에 닿으면 자동으로 다음 페이지 로드
- [ ] 마지막 페이지 도달 시 더 이상 요청하지 않도록 처리
- [ ] 추가 로딩 중 스피너 표시 (첫 로딩 스피너와 구분)

### 체크포인트

- 스크롤을 내리면 이미지가 자동으로 추가 로드된다
- 중복 요청이 발생하지 않는다

---

## Phase 5 — 이미지 최적화

목표: 사용자 경험을 해치지 않으면서 이미지 로딩 성능을 개선한다.

### 할 일

- [ ] `<img loading="lazy">` 적용 및 효과 확인 (Network 탭)
- [ ] 이미지 로드 전 블러 처리 (blur-up 기법) — Unsplash의 `blur_hash` 또는 저해상도 URL 활용
- [ ] `srcset` / `sizes` 속성으로 반응형 이미지 제공
- [ ] `useIntersectionObserver` 커스텀 훅으로 뷰포트 진입 시에만 로드하는 방식 비교
- [ ] Lighthouse로 성능 점수 측정 (최적화 전/후 비교)

### 체크포인트

- 화면 밖 이미지는 즉시 로드되지 않는다
- 이미지 로드 전 placeholder가 표시된다

---

## Phase 6 — Supabase 연동

목표: 백엔드 없이 즐겨찾기 기능을 구현하며 Supabase의 기본 CRUD를 익힌다.

### 할 일

- [ ] Supabase 프로젝트 생성, `favorites` 테이블 설계 (`id`, `photo_id`, `photo_url`, `author`, `created_at`)
- [ ] Supabase 클라이언트 초기화 (`src/lib/supabase.js`)
- [ ] 즐겨찾기 추가/제거 기능 구현 (INSERT / DELETE)
- [ ] 즐겨찾기 목록 조회 구현 (SELECT)
- [ ] `useFavorites` 커스텀 훅 작성
- [ ] `PhotoCard`에 하트 버튼 추가, 즐겨찾기 여부에 따라 UI 변경
- [ ] `/favorites` 라우트와 페이지 추가
- [ ] (선택) Supabase Auth로 로그인 기능 추가

### 체크포인트

- 하트를 누르면 Supabase DB에 저장된다
- 페이지를 새로고침해도 즐겨찾기가 유지된다
- 즐겨찾기 페이지에서 저장된 사진 목록을 볼 수 있다

---

## 현재 상태

- [x] Vite + React + Tailwind + React Router 보일러플레이트 세팅 완료
- [ ] Phase 1 진행 중

---

## 참고 링크

- [Unsplash API 문서](https://unsplash.com/documentation)
- [Supabase 공식 문서](https://supabase.com/docs)
- [Intersection Observer API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
