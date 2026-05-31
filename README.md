# 전북맹아학교 3D 촉각 졸업앨범 소개 웹사이트

QR 코드로 접속하는 작품 소개용 웹사이트입니다.  
Next.js + Tailwind CSS + Framer Motion으로 제작되었습니다.

## 1. 실행 방법

터미널에서 프로젝트 폴더로 이동한 뒤 아래 명령어를 실행하세요.

```bash
npm install
npm run dev
```

브라우저에서 아래 주소로 확인할 수 있습니다.

```bash
http://localhost:3000
```

## 2. 수정할 주요 파일

메인 페이지 문구와 UI는 아래 파일에서 수정하면 됩니다.

```bash
src/app/page.tsx
```

전체 색상, 기본 CSS는 아래 파일입니다.

```bash
src/app/globals.css
```

## 3. 배포 방법: Vercel 추천

1. GitHub에 프로젝트 업로드
2. https://vercel.com 접속
3. New Project 클릭
4. GitHub repository 선택
5. Deploy 클릭

배포 후 생성된 URL을 QR 코드로 만들면 됩니다.

## 4. NFC 외부 웹사이트 링크 넣는 방법

아직 별도 음성 인터랙션 웹사이트 링크가 없어서 버튼은 넣지 않았습니다.
나중에 링크가 생기면 `src/app/page.tsx`에서 `NFC 기반 음성 경험` 섹션 아래에 버튼을 추가하면 됩니다.

예시:

```tsx
<a href="https://your-nfc-site.com" target="_blank" rel="noopener noreferrer">
  음성 콘텐츠 사이트로 이동
</a>
```

## 5. 이미지 넣는 방법

실제 앨범 사진이 생기면 `public` 폴더에 넣고 `src/app/page.tsx`에서 불러오면 됩니다.

예시:

```tsx
<Image src="/album-photo.jpg" alt="3D 촉각 졸업앨범 실물 사진" width={1200} height={800} />
```
