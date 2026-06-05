"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sparkles,
  Hand,
  Volume2,
  MessageCircle,
  Nfc,
  QrCode,
  Users,
  Heart,
  Landmark,
  Headphones,
  MapPinned,
  ArrowDown,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const galleryImages = [
  {
    src: "/album-gallery-01.jpg",
    alt: "전북맹아학교 3D 촉각 졸업앨범 사선 실물 사진",
    label: "Album Photo 01",
    fit: "cover",
  },
  {
    src: "/album-gallery-02.jpg",
    alt: "전북맹아학교 3D 촉각 졸업앨범 정면 실물 사진",
    label: "Album Photo 02",
    fit: "cover",
  },
  {
    src: "/album-gallery-03.png",
    alt: "전북맹아학교 추억의 앨범 디지털 콘텐츠 화면",
    label: "Digital Content",
    fit: "contain",
  },
];

function HeroGallery() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % galleryImages.length);
    }, 3800);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="relative min-w-0 w-full max-w-full"
    >
      <div className="absolute inset-4 rounded-[2rem] bg-[#b69a6c]/20 blur-3xl sm:inset-6 sm:rounded-[3rem]" />
      <div className="relative w-full max-w-full overflow-hidden rounded-[2rem] border border-white/70 bg-white/45 p-3 shadow-[0_40px_120px_rgba(60,43,27,0.18)] backdrop-blur-xl sm:rounded-[3rem] sm:p-5">
        <div className="relative w-full overflow-hidden rounded-[1.7rem] bg-[#211a16] text-white sm:rounded-[2.5rem]">
          <div className="relative h-[430px] w-full max-w-full overflow-hidden sm:h-[560px] lg:h-[620px]">
            {galleryImages.map((image, index) => (
              <div
                key={image.src}
                className={`absolute inset-0 transition-opacity duration-1000 ease-out ${index === current ? "opacity-100" : "opacity-0"}`}
                aria-hidden={index !== current}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1024px) 92vw, 44vw"
                  className={image.fit === "contain" ? "object-contain p-4 sm:p-6" : "object-cover"}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/8 to-black/60" />
              </div>
            ))}

            <div className="absolute left-0 top-0 z-10 flex w-full items-start justify-between gap-4 p-5 sm:gap-6 sm:p-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#d7c19b] sm:text-xs sm:tracking-[0.35em]">Interactive Archive</p>
                <h2 className="mt-3 text-2xl font-semibold leading-tight sm:mt-4 sm:text-4xl">3D Tactile Album</h2>
              </div>
              <QrCode className="shrink-0 text-[#d7c19b]" size={34} />
            </div>

            <div className="absolute bottom-0 left-0 z-10 w-full p-4 sm:p-8">
              <div className="rounded-[1.2rem] border border-white/15 bg-[#211a16]/72 p-4 shadow-2xl backdrop-blur-md sm:rounded-[1.5rem] sm:p-5">
                <p className="text-xs leading-6 text-[#eee2d1] sm:text-[15px] sm:leading-7">
                  1명의 선생님과 7명의 학생 흉상을 포함한 촉각 앨범. 오른쪽 상단의 NFC tag를 통해 추억의 앨범 디지털 촉각 가이드로 연결됩니다.
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#d7c19b]">{galleryImages[current].label}</p>
                <div className="flex gap-2" aria-label="앨범 사진 갤러리 페이지 표시">
                  {galleryImages.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      aria-label={`${index + 1}번째 이미지 보기`}
                      onClick={() => setCurrent(index)}
                      className={`h-2 rounded-full transition-all ${index === current ? "w-8 bg-[#d7c19b]" : "w-2 bg-white/45 hover:bg-white/70"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


function TtsGuideButton({ text }: { text: string }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    setIsSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setIsSupported(false);
      return;
    }

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ko-KR";
    utterance.rate = 0.92;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="mt-8 w-full max-w-full overflow-hidden rounded-[1.6rem] border border-[#dbc8aa] bg-white/55 p-4 shadow-sm backdrop-blur" role="region" aria-label="작품 소개 음성 안내">
      <button
        type="button"
        onClick={handleSpeak}
        className="flex w-full max-w-full flex-col items-start gap-2 rounded-[1.2rem] bg-[#211a16] px-4 py-4 text-left text-sm font-semibold text-white shadow-lg shadow-[#211a16]/10 transition hover:bg-[#3a2d24] focus:outline-none focus:ring-4 focus:ring-[#d7c19b]/60 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5"
        aria-label={isSpeaking ? "작품 소개 음성 안내 정지" : "작품 소개 음성으로 듣기"}
        aria-pressed={isSpeaking}
      >
        <span className="flex min-w-0 items-center gap-3">
          <Volume2 size={20} aria-hidden="true" />
          {isSpeaking ? "음성 안내 정지" : "작품 소개 음성으로 듣기"}
        </span>
        <span className="text-xs font-medium text-[#d7c19b]">TTS</span>
      </button>
      <p className="mt-3 text-sm leading-6 text-[#6f625a]">
        버튼을 누르면 작품 개요와 이용 방법을 한국어 음성으로 들을 수 있습니다. TalkBack과 VoiceOver 사용자를 위해 이미지 대체 텍스트와 명확한 링크 설명도 함께 적용했습니다.
      </p>
      {!isSupported && (
        <p className="mt-2 text-sm font-medium text-[#8a3d2b]" role="status">
          현재 브라우저에서는 음성 읽기 기능을 지원하지 않습니다.
        </p>
      )}
      <p className="sr-only" aria-live="polite">{isSpeaking ? "작품 소개 음성 안내가 재생 중입니다." : "작품 소개 음성 안내가 정지되었습니다."}</p>
    </div>
  );
}


function IntroPromptBanner() {
  const [visible, setVisible] = useState(true);

  return (
    <>
      <div className="sr-only" role="status" aria-live="polite">
        음성 안내를 들으려면 첫 화면 제목 아래에 있는 작품 소개 음성으로 듣기 버튼을 눌러주세요.
      </div>
      {visible && (
        <div className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-xl rounded-[1.25rem] border border-[#dbc8aa] bg-[#fffaf2]/95 p-4 text-sm leading-6 text-[#5c4529] shadow-[0_18px_60px_rgba(75,55,35,0.18)] backdrop-blur md:bottom-6 md:text-base" role="note" aria-label="음성 안내 버튼 위치 안내">
          <div className="flex gap-3">
            <Volume2 className="mt-1 shrink-0 text-[#8f6b3d]" size={20} aria-hidden="true" />
            <div className="min-w-0">
              <p className="font-semibold text-[#211a16]">음성 안내가 필요하신가요?</p>
              <p className="mt-1">첫 화면 제목 아래의 검은색 <strong>작품 소개 음성으로 듣기</strong> 버튼을 누르면, 작품 개요와 이용 방법을 음성으로 들을 수 있습니다.</p>
            </div>
            <button type="button" onClick={() => setVisible(false)} className="ml-auto shrink-0 rounded-full px-2 text-[#7b6d63] hover:bg-[#eadfce]" aria-label="음성 안내 버튼 위치 안내 닫기">×</button>
          </div>
        </div>
      )}
    </>
  );
}


function SectionTitle({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      className="mx-auto mb-14 max-w-3xl text-center"
    >
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#9a7b4f]">{eyebrow}</p>
      <h2 className="font-serif text-3xl font-semibold tracking-tight text-[#211a16] sm:text-4xl md:text-5xl">{title}</h2>
      {desc && <p className="mt-5 text-base leading-8 text-[#6f625a] md:text-lg">{desc}</p>}
    </motion.div>
  );
}

function FeatureCard({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <motion.div
      variants={fadeUp}
      className="group rounded-[2rem] border border-[#eadfce] bg-white/75 p-7 shadow-[0_18px_60px_rgba(75,55,35,0.08)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(75,55,35,0.14)]"
    >
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#f3eadb] text-[#8f6b3d]">
        <Icon size={22} />
      </div>
      <h3 className="mb-3 font-serif text-2xl font-semibold text-[#241b15]">{title}</h3>
      <p className="text-[15px] leading-7 text-[#74665d]">{children}</p>
    </motion.div>
  );
}

function TimelineItem({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <motion.div variants={fadeUp} className="relative pl-12">
      <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-[#b79660] bg-[#fffaf2] text-sm font-semibold text-[#8f6b3d]">
        {number}
      </div>
      <h3 className="font-serif text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-[15px] leading-7 text-[#d8cfc5]">{text}</p>
    </motion.div>
  );
}

export default function Home() {
  const ttsGuideText = "전북맹아학교 고등부 24회 3D 촉각 졸업앨범을 소개합니다. 본 작품은 선생님 1명과 학생 7명의 얼굴 특징을 반영한 3D 촉각 모델과 음성 메시지, NFC 기반 디지털 촉각 가이드를 결합한 졸업앨범입니다. 큐알 코드는 이 앨범이 무엇인지 설명하는 작품 소개의 역할을 하고, NFC는 추억의 앨범 디지털 촉각 가이드로 연결되어 학생과 선생님의 목소리, 노래, 배치 정보, 장래 희망을 경험할 수 있게 합니다. 두 경로는 모두 졸업의 기억을 모두에게 전달한다는 하나의 목적으로 이어집니다.";

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8f2e9] text-[#211a16]" aria-label="전북맹아학교 3D 촉각 졸업앨범 작품 소개">
      <IntroPromptBanner />
      <nav className="fixed left-1/2 top-5 z-50 hidden w-[min(92%,980px)] -translate-x-1/2 items-center justify-between rounded-full border border-white/70 bg-white/60 px-6 py-3 shadow-[0_10px_40px_rgba(60,43,27,0.10)] backdrop-blur-xl md:flex">
        <a href="#home" className="font-serif text-lg font-semibold">3D 촉각 졸업앨범</a>
        <div className="flex gap-6 text-sm font-medium text-[#6f625a]">
          <a href="#overview" className="hover:text-[#211a16]">작품 개요</a>
          <a href="#experience" className="hover:text-[#211a16]">이용 방법</a>
          <a href="#impact" className="hover:text-[#211a16]">기대 효과</a>
          <a href="#team" className="hover:text-[#211a16]">TEAM</a>
        </div>
      </nav>

      <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-5 py-20 sm:px-6 sm:py-24 md:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(174,139,88,0.22),transparent_34%),linear-gradient(120deg,#fffaf2_0%,#f6efe6_48%,#e8dccb_100%)]" />
        <div className="absolute right-[-12rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-[#d9c3a1]/40 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-[-10rem] h-[32rem] w-[32rem] rounded-full bg-[#efe2cc]/80 blur-3xl" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl min-w-0 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="min-w-0">
            <motion.div variants={fadeUp} className="mb-7 inline-flex max-w-full items-center gap-2 rounded-full border border-[#dbc8aa] bg-white/55 px-4 py-2 text-sm text-[#745a36] shadow-sm backdrop-blur">
              <Sparkles size={16} />
              전북맹아학교 고등부 24회 3D 촉각 졸업앨범
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-serif text-[clamp(3rem,12vw,4.6rem)] font-semibold leading-[1.08] tracking-tight text-[#1f1712] md:text-7xl">
              만지고, 듣고,
              <br />기억하는 졸업앨범
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-8 max-w-2xl text-base leading-8 text-[#66594f] sm:text-lg sm:leading-9 md:text-xl">
              본 작품은 학생의 얼굴 특징을 3D 프린팅한 촉각 모델과 학생 본인의 음성 메시지를 결합한 졸업앨범입니다. 사용자는 손끝으로 친구의 얼굴 형태를 만지고, 목소리를 들으며 졸업의 순간을 더 생생하게 기억할 수 있습니다.
            </motion.p>
            <motion.div variants={fadeUp}>
              <TtsGuideButton text={ttsGuideText} />
            </motion.div>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <a href="#overview" className="rounded-full bg-[#211a16] px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-[#211a16]/15 transition hover:bg-[#3a2d24]">
                작품 소개 보기
              </a>
              <a href="#team" className="rounded-full border border-[#c9b48e] bg-white/50 px-7 py-4 text-sm font-semibold text-[#5c4529] backdrop-blur transition hover:bg-white">
                제작팀 보기
              </a>
            </motion.div>
          </motion.div>

          <HeroGallery />
        </div>

        <a href="#overview" aria-label="아래로 이동" className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 rounded-full border border-[#cdbb9f] bg-white/45 p-3 text-[#7a6038] backdrop-blur">
          <ArrowDown size={20} />
        </a>
      </section>

      <section id="overview" className="px-6 py-28 md:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Artwork Overview"
            title="작품 개요"
            desc="3D 프린팅 촉각 모델, QR 기반 작품 안내, NFC 기반 음성 콘텐츠를 결합하여 시각장애 학생들도 졸업앨범을 능동적으로 경험할 수 있도록 설계했습니다."
          />
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid gap-6 md:grid-cols-3">
            <FeatureCard icon={Hand} title="촉각으로 만나는 얼굴">
              앨범에는 선생님 1명과 학생 7명의 흉상이 배치되어 있습니다. 사용자는 손끝으로 얼굴의 윤곽과 특징을 탐색하며 친구를 감각적으로 기억할 수 있습니다.
            </FeatureCard>
            <FeatureCard icon={Volume2} title="목소리로 남기는 메시지">
              NFC tag를 통해 연결되는 별도 웹사이트에서는 학생과 선생님이 직접 녹음한 메시지를 들을 수 있습니다. 단순한 텍스트 기록이 아닌, 실제 목소리가 담긴 졸업 기록입니다.
            </FeatureCard>
            <FeatureCard icon={MessageCircle} title="질문 가능한 인터랙션">
              사용자는 채팅 또는 음성을 통해 누가 어디에 배치되어 있는지 질문할 수 있고, 특정 학생을 선택하면 그 학생의 특징과 꿈, 관련 콘텐츠를 확인할 수 있습니다.
            </FeatureCard>
          </motion.div>
        </div>
      </section>

      <section id="experience" className="bg-[#211a16] px-6 py-28 text-white md:px-12">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#d7c19b]">Experience Flow</p>
            <h2 className="font-serif text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">QR로 소개를,<br />NFC로 목소리를 듣습니다.</h2>
            <p className="mt-6 text-lg leading-9 text-[#d8cfc5]">
              QR은 “이 앨범이 무엇인가”를 설명하는 맥락 제공의 역할이고, NFC는 “이 앨범을 어떻게 느끼는가”를 전달하는 체험의 역할입니다. 두 경로는 마지막에 “졸업의 기억을 모두에게”라는 하나의 목적으로 수렴합니다.
            </p>
            <div className="mt-8 rounded-[1.8rem] border border-white/10 bg-white/8 p-6 text-sm leading-7 text-[#eee2d1]">
              NFC 촉각 가이드를 사용한 이유는 시각장애인에게 보다 효과적인 접근성을 제공하기 때문입니다. NFC는 돌출된 태그 위에 폰을 가져다 대기만 하면 되고, 링크에 접속된 디지털 촉각 가이드는 앨범의 3D 촉각 정보에 대한 도슨트 역할을 제공합니다.
            </div>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid gap-8">
            <TimelineItem number="1" title="QR 코드 스캔" text="앨범에 부착된 QR 코드를 스캔하여 본 작품 소개 웹사이트에 접속합니다. 3D 촉각 졸업앨범의 제작 의도, 구성 요소, 사용 방식, 기대 효과를 확인합니다." />
            <TimelineItem number="2" title="NFC 촉각 가이드" text="앨범 오른쪽 상단의 NFC tag를 통해 추억의 앨범 디지털 촉각 가이드로 이동합니다. 디지털 촉각 가이드는 앨범의 3D 촉각 정보를 음성으로 안내하는 도슨트 역할을 제공합니다." />

            <motion.div variants={fadeUp} className="overflow-hidden rounded-[2rem] border border-[#d7c19b]/30 bg-white/[0.06] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur">
              <div className="grid items-center gap-6 sm:grid-cols-[1fr_180px]">
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#d7c19b]">Digital Tactile Guide</p>
                  <a
                    href="https://jdcho0721.github.io/Album-of-memories/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="추억의 앨범 디지털 촉각 가이드 새 창으로 열기. 학생과 선생님의 음성 메시지와 노래, 배치 정보, 장래 희망을 확인할 수 있습니다."
                    className="font-serif text-2xl font-semibold text-white underline decoration-[#d7c19b]/50 underline-offset-8 transition hover:text-[#f1dfbd]"
                  >
                    추억의 앨범 디지털 촉각 가이드
                  </a>
                  <p className="mt-4 text-[15px] leading-7 text-[#d8cfc5]">
                    앨범의 NFC tag를 통해 이동할 수 있는 웹접근성 준수 기반의 체화된 인지 UX입니다. 학생과 선생님이 직접 남긴 목소리와 노래를 재생하고, 챗봇을 통한 음성 질문으로 촉각 앨범에 누가 어느 위치에 있는지와 장래 희망을 확인할 수 있습니다.
                  </p>
                  <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-[#d7c19b]">Tap the title or scan the QR</p>
                </div>
                <a
                  href="https://jdcho0721.github.io/Album-of-memories/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="추억의 앨범 디지털 촉각 가이드 열기"
                  className="mx-auto block w-full max-w-[180px] rounded-[1.4rem] bg-white p-3 shadow-2xl transition hover:scale-[1.02]"
                >
                  <Image
                    src="/memory-guide-qr.jpg"
                    alt="추억의 앨범 디지털 촉각 가이드 QR 코드"
                    width={320}
                    height={320}
                    className="h-auto w-full rounded-[1rem]"
                  />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-28 md:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="What It Includes"
            title="앨범이 담고 있는 것"
            desc="하나의 졸업앨범 안에 촉각, 청각, 대화형 정보 접근을 함께 담았습니다."
          />
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid gap-6 lg:grid-cols-4">
            <FeatureCard icon={Users} title="8개의 흉상">
              선생님 1명과 학생 7명의 얼굴 특징을 반영한 3D 촉각 모델을 포함합니다.
            </FeatureCard>
            <motion.div variants={fadeUp} className="rounded-[2rem] border border-[#eadfce] bg-white/75 p-7 shadow-[0_18px_60px_rgba(75,55,35,0.08)] backdrop-blur lg:col-span-3">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#f3eadb] text-[#8f6b3d]">
                <Nfc size={22} aria-hidden="true" />
              </div>
              <h3 className="mb-4 font-serif text-2xl font-semibold text-[#241b15]">디지털 촉각 가이드</h3>
              <div className="space-y-3 text-[15px] leading-7 text-[#74665d]">
                <p>앨범의 NFC tag를 통해 추억의 앨범 디지털 촉각 가이드로 이동할 수 있습니다.</p>
                <p>촉각 가이드는 웹접근성을 준수한 체화된 인지 기반의 UX 디자인입니다.</p>
                <p>학생과 선생님이 직접 남긴 목소리와 노래 재생을 통해 졸업의 기억을 생생하게 전달합니다.</p>
                <p>챗봇을 통한 음성 질문으로 촉각 앨범에 누가 어느 위치에 있는지, 그리고 장래 희망이 무엇인지 확인할 수 있습니다.</p>
                <p>웹 접근성을 적용했고, 화면 전환도 스크린 리더가 추적할 수 있도록 구성했습니다.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="impact" className="px-6 pb-28 md:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Expected Impact"
            title="기대 효과"
            desc="본 작품은 졸업앨범을 단순한 기록물이 아니라, 촉각과 청각을 통해 친구와 학교생활을 다시 만나는 감각적 아카이브로 확장합니다."
          />
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard icon={Heart} title="정서적 기억 강화">
              친구의 얼굴 형태와 목소리를 함께 경험함으로써 졸업의 순간과 관계를 더 오래, 더 생생하게 간직할 수 있습니다.
            </FeatureCard>
            <FeatureCard icon={Users} title="접근성 확대">
              시각 중심의 졸업앨범에서 벗어나 시각장애 학생들도 직접 만지고 들으며 앨범을 주체적으로 경험할 수 있습니다.
            </FeatureCard>
            <FeatureCard icon={Nfc} title="물리·디지털 결합">
              3D 프린팅 앨범과 NFC 기반 디지털 콘텐츠를 연결하여 오프라인 작품과 온라인 경험이 이어지도록 했습니다.
            </FeatureCard>
            <FeatureCard icon={Landmark} title="새로운 졸업 문화">
              학교의 기억을 사진 중심으로 보존하던 방식에서 나아가, 촉각·청각·대화형 콘텐츠가 결합된 새로운 졸업앨범 모델을 제안합니다.
            </FeatureCard>
          </motion.div>
        </div>
      </section>

      <section id="team" className="bg-[#fffaf2] px-6 py-28 md:px-12">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Team & Credits"
            title="TEAM 소개"
            desc="3D 촉각 졸업앨범은 성균관대학교 심화융합캡스톤디자인 수업의 팀 프로젝트로 제작되었습니다."
          />
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} className="rounded-[2.5rem] border border-[#eadfce] bg-white p-8 shadow-[0_24px_80px_rgba(75,55,35,0.08)] md:p-12">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-[#211a16]">제작 참여</h3>
                <div className="mt-4 space-y-4 text-[15px] leading-8 text-[#6f625a]">
                  <p>
                    <strong className="font-semibold text-[#211a16]">3D 촉각 졸업앨범</strong>은 성균관대학교 심화융합캡스톤디자인 수업의 팀 프로젝트로 제작되었습니다.
                  </p>
                  <p>
                    <strong className="font-semibold text-[#211a16]">담당교수</strong> · 조준동
                  </p>
                  <p>
                    <strong className="font-semibold text-[#211a16]">디지털 촉각 가이드</strong> · 성균관대학교 조준동 명예교수 제작, NFC 태깅으로 진입, TalkBack·VoiceOver 지원
                  </p>
                  <p>
                    <strong className="font-semibold text-[#211a16]">촉각 2.5D 모델 및 QR 소개 콘텐츠 제작</strong> · 팀원 문홍진, 남재호, 장예림, 최송희
                  </p>
                  <p>
                    <strong className="font-semibold text-[#211a16]">실습비 지원</strong> · 성균관대학교 RISE 사업단
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-semibold text-[#211a16]">감사의 말</h3>
                <p className="mt-4 leading-8 text-[#6f625a]">
                  제작 및 기획에 도움을 주신 전북맹아학교 선생님들과 학생들에게 깊이 감사드립니다.
                </p>
              </div>
            </div>
            <div className="mt-10 rounded-[1.7rem] bg-[#f8f2e9] px-6 py-5 text-center text-sm leading-7 text-[#6f625a]">
              성균관대학교 심화융합캡스톤디자인 수업 팀프로젝트 · 담당교수 조준동 · 성균관대학교 RISE 사업단 실습비 지원
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-[#e7d8bf] bg-[#f8f2e9] px-6 py-10 text-center md:px-12">
        <p className="font-serif text-2xl font-semibold text-[#211a16]">전북맹아학교 고등부 24회 3D 촉각 졸업앨범</p>
        <p className="mt-3 text-sm text-[#7b6d63]">A tactile and auditory archive for remembering friends, voices, and graduation.</p>
      </footer>
    </main>
  );
}
