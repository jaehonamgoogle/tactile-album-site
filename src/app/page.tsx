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
    src: "/album-gallery-01.png",
    alt: "3D 촉각 졸업앨범 인터랙티브 아카이브 그래픽",
    label: "Interactive Archive",
  },
  {
    src: "/album-gallery-02.jpg",
    alt: "전북맹아학교 3D 촉각 졸업앨범 실물 사진 1",
    label: "Tactile Album Photo 01",
  },
  {
    src: "/album-gallery-03.jpg",
    alt: "전북맹아학교 3D 촉각 졸업앨범 실물 사진 2",
    label: "Tactile Album Photo 02",
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
      className="relative"
    >
      <div className="absolute inset-6 rounded-[3rem] bg-[#b69a6c]/20 blur-3xl" />
      <div className="relative overflow-hidden rounded-[3rem] border border-white/70 bg-white/45 p-4 shadow-[0_40px_120px_rgba(60,43,27,0.18)] backdrop-blur-xl sm:p-5">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#211a16] text-white">
          <div className="relative aspect-[4/5] min-h-[520px] w-full overflow-hidden sm:aspect-[1/1] lg:aspect-[4/5]">
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
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/8 to-black/60" />
              </div>
            ))}

            <div className="absolute left-0 top-0 z-10 flex w-full items-start justify-between gap-6 p-7 sm:p-8">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[#d7c19b]">Interactive Archive</p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">3D Tactile Album</h2>
              </div>
              <QrCode className="shrink-0 text-[#d7c19b]" size={34} />
            </div>

            <div className="absolute bottom-0 left-0 z-10 w-full p-6 sm:p-8">
              <div className="rounded-[1.5rem] border border-white/15 bg-[#211a16]/72 p-5 shadow-2xl backdrop-blur-md">
                <p className="text-sm leading-7 text-[#eee2d1] sm:text-[15px]">
                  1명의 선생님과 7명의 학생 흉상을 포함한 촉각 앨범. 오른쪽 상단의 NFC tag를 통해 별도 음성 인터랙션 웹사이트로 연결됩니다.
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
      <h2 className="font-serif text-4xl font-semibold tracking-tight text-[#211a16] md:text-5xl">{title}</h2>
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
  return (
    <main className="min-h-screen bg-[#f8f2e9] text-[#211a16]">
      <nav className="fixed left-1/2 top-5 z-50 hidden w-[min(92%,980px)] -translate-x-1/2 items-center justify-between rounded-full border border-white/70 bg-white/60 px-6 py-3 shadow-[0_10px_40px_rgba(60,43,27,0.10)] backdrop-blur-xl md:flex">
        <a href="#home" className="font-serif text-lg font-semibold">3D 촉각 졸업앨범</a>
        <div className="flex gap-6 text-sm font-medium text-[#6f625a]">
          <a href="#overview" className="hover:text-[#211a16]">작품 개요</a>
          <a href="#experience" className="hover:text-[#211a16]">이용 방법</a>
          <a href="#impact" className="hover:text-[#211a16]">기대 효과</a>
          <a href="#team" className="hover:text-[#211a16]">TEAM</a>
        </div>
      </nav>

      <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-6 py-24 md:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(174,139,88,0.22),transparent_34%),linear-gradient(120deg,#fffaf2_0%,#f6efe6_48%,#e8dccb_100%)]" />
        <div className="absolute right-[-12rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-[#d9c3a1]/40 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-[-10rem] h-[32rem] w-[32rem] rounded-full bg-[#efe2cc]/80 blur-3xl" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#dbc8aa] bg-white/55 px-4 py-2 text-sm text-[#745a36] shadow-sm backdrop-blur">
              <Sparkles size={16} />
              전북맹아학교 고등부 24회 3D 촉각 졸업앨범
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-serif text-5xl font-semibold leading-[1.08] tracking-tight text-[#1f1712] md:text-7xl">
              만지고, 듣고,
              <br />기억하는 졸업앨범
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-8 max-w-2xl text-lg leading-9 text-[#66594f] md:text-xl">
              본 작품은 학생의 얼굴 특징을 3D 프린팅한 촉각 모델과 학생 본인의 음성 메시지를 결합한 졸업앨범입니다. 사용자는 손끝으로 친구의 얼굴 형태를 만지고, 목소리를 들으며 졸업의 순간을 더 생생하게 기억할 수 있습니다.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
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
            <h2 className="font-serif text-4xl font-semibold leading-tight md:text-5xl">QR로 소개를 읽고,<br />NFC로 목소리를 듣습니다.</h2>
            <p className="mt-6 text-lg leading-9 text-[#d8cfc5]">
              이 웹사이트는 앨범에 부착된 QR 코드를 통해 접속하는 작품 소개 페이지입니다. 관람자는 작품의 의도, 사용 방법, 기대 효과, 제작팀 정보를 한눈에 확인할 수 있습니다.
            </p>
            <div className="mt-8 rounded-[1.8rem] border border-white/10 bg-white/8 p-6 text-sm leading-7 text-[#eee2d1]">
              학생 및 선생님의 음성 메시지, 학생별 특징과 꿈, 배치 안내, 노래 재생 기능은 앨범 오른쪽 상단의 NFC tag를 통해 접속하는 별도 웹사이트에서 제공됩니다.
            </div>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid gap-8">
            <TimelineItem number="1" title="QR 코드 스캔" text="앨범에 부착된 QR 코드를 스캔하여 본 작품 소개 웹사이트에 접속합니다." />
            <TimelineItem number="2" title="작품 이해" text="3D 촉각 졸업앨범의 제작 의도, 구성 요소, 사용 방식, 기대 효과를 확인합니다." />
            <TimelineItem number="3" title="NFC 기반 음성 경험" text="앨범 오른쪽 상단의 NFC tag를 통해 별도 인터랙션 웹사이트로 이동하고, 학생과 선생님의 음성 메시지와 콘텐츠를 경험합니다." />
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
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard icon={Users} title="8개의 흉상">
              선생님 1명과 학생 7명의 얼굴 특징을 반영한 3D 촉각 모델을 포함합니다.
            </FeatureCard>
            <FeatureCard icon={Headphones} title="음성 메시지">
              학생과 선생님이 직접 남긴 목소리를 통해 졸업의 기억을 생생하게 전달합니다.
            </FeatureCard>
            <FeatureCard icon={MapPinned} title="배치 안내">
              채팅 또는 음성 질문을 통해 누가 어느 위치에 있는지 확인할 수 있습니다.
            </FeatureCard>
            <FeatureCard icon={Nfc} title="NFC 연결">
              앨범의 NFC tag를 통해 별도 음성 인터랙션 웹사이트로 이동할 수 있습니다.
            </FeatureCard>
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
            desc="본 작품은 심화융합캡스톤디자인 수업 팀프로젝트로 진행되었으며, 성균관대학교 조준동 명예교수님의 지도 아래 제작되었습니다."
          />
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} className="rounded-[2.5rem] border border-[#eadfce] bg-white p-8 shadow-[0_24px_80px_rgba(75,55,35,0.08)] md:p-12">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-[#211a16]">제작 참여</h3>
                <div className="mt-4 space-y-4 text-[15px] leading-8 text-[#6f625a]">
                  <p>
                    <strong className="font-semibold text-[#211a16]">디지털 콘텐츠</strong> · 성균관대학교 조준동 명예교수 제작, WCAG 2.1 AA 준수 설계, TalkBack·VoiceOver 지원
                  </p>
                  <p>
                    <strong className="font-semibold text-[#211a16]">촉각 모델</strong> · NFC 태그, 프레임 제작, QR 작품소개 등
                  </p>
                  <p>
                    <strong className="font-semibold text-[#211a16]">심화융합캡스톤디자인 수업 팀프로젝트</strong> · 담당교수 조준동, 팀원 문홍진, 남재호, 장예림, 최송희
                  </p>
                  <p>
                    <strong className="font-semibold text-[#211a16]">제작 지원</strong> · 성균관대학교 RISE 사업단 실습비 지원
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-semibold text-[#211a16]">감사의 말</h3>
                <p className="mt-4 leading-8 text-[#6f625a]">
                  제작에 도움을 주신 전북맹아학교 김운기 교육정보부장님과 협조 및 참여해주신 학생 여러분께 진심으로 감사드립니다. 또한 함께 기획해주신 전북맹아학교와 성균관대학교 관계자분들께 깊이 감사드립니다.
                </p>
              </div>
            </div>
            <div className="mt-10 rounded-[1.7rem] bg-[#f8f2e9] px-6 py-5 text-center text-sm leading-7 text-[#6f625a]">
              심화융합캡스톤디자인 수업 팀프로젝트 · 담당교수 조준동 · 성균관대학교 RISE 사업단 실습비 지원
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
