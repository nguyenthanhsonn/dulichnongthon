import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { destinations } from "@/data/mock/destinations";
import { DestinationImage } from "@/components/destination-image";
import {
  MapPin,
  Sparkles,
  Layers,
  Leaf,
  Globe,
  Users,
  ShieldCheck,
  ArrowLeft,
  Heart,
  Check,
  Film,
  ExternalLink,
} from "lucide-react";

function getVimeoEmbedUrl(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (match) {
    return `https://player.vimeo.com/video/${match[1]}?autoplay=0&byline=0&portrait=0&title=0&dnt=1`;
  }
  return null;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return destinations.map((d) => ({
    id: d.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const destination = destinations.find((d) => d.id === id);
  if (!destination) return { title: "Không tìm thấy điểm đến" };

  return {
    title: `${destination.name} (${destination.recordCode}) | Hội thi Du lịch Nông thôn 2026`,
    description: destination.summary,
    openGraph: {
      title: `${destination.name} - ${destination.province}`,
      description: destination.summary,
      images: destination.image.src ? [{ url: destination.image.src }] : [],
    },
  };
}

export default async function DestinationDetailPage({ params }: PageProps) {
  const { id } = await params;
  const destination = destinations.find((d) => d.id === id);

  if (!destination) {
    notFound();
  }

  const regionNames: Record<string, string> = {
    bac: "Miền Bắc",
    trung: "Miền Trung",
    nam: "Miền Nam",
  };
  const regionLabel = regionNames[destination.region] || "Miền Bắc";

  return (
    <div className="min-h-screen bg-[#F4FAF6] text-[#0E382B] selection:bg-[#026E4E]/20">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-[#026E4E]/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <Link
          href="/#destinations"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#026E4E] hover:text-[#00875A] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Quay lại danh sách 35 điểm đến</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-black text-[#0E382B]"
          >
            <div className="relative h-7 w-7 rounded-full overflow-hidden border border-[#026E4E]/20">
              <Image src="/logo.png" alt="Logo" fill className="object-cover" />
            </div>
            <span className="hidden sm:inline">Hội thi Du Lịch Nông Thôn 2026</span>
          </Link>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
        {/* Banner Card */}
        <div className="relative aspect-16/9 sm:aspect-21/9 w-full rounded-3xl overflow-hidden bg-[#08291D] shadow-xl border border-[#026E4E]/15">
          <DestinationImage
            src={destination.image.src}
            alt={destination.name}
            region={destination.region === "bac" ? "north" : destination.region === "trung" ? "central" : "south"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20" />

          {/* Badges */}
          <div className="absolute top-4 inset-x-4 sm:inset-x-6 flex items-center justify-between z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-bold text-white border border-white/20">
                {destination.recordCode} • {destination.id}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#026E4E]/90 backdrop-blur-md text-xs font-bold text-white">
                {regionLabel}
              </span>
            </div>
          </div>

          {/* Title & Province */}
          <div className="absolute bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-8 text-white space-y-1 sm:space-y-1.5 z-10">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#00C2FF] font-semibold">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span>{destination.province}</span>
              {destination.operator && (
                <>
                  <span className="text-white/40">•</span>
                  <span className="truncate text-white/80">{destination.operator}</span>
                </>
              )}
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              {destination.name}
            </h1>
            {destination.fullName && destination.fullName !== destination.name && (
              <p className="text-xs sm:text-sm text-white/80 italic font-serif">
                {destination.fullName}
              </p>
            )}
          </div>
        </div>

        {/* Action Callout Bar */}
        <div className="p-5 rounded-2xl bg-white border border-[#026E4E]/15 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-[#4B6354] block font-medium">Bình chọn trực tuyến chính thức</span>
            <p className="text-sm font-extrabold text-[#0E382B]">
              Tham gia bình chọn cho {destination.name} trên cổng Landing Page Hội thi
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/#destinations"
              className="vote-button w-full sm:w-auto"
            >
              <Heart className="h-4 w-4 fill-white/80" />
              <span>Bình chọn ngay</span>
            </Link>
          </div>
        </div>

        {/* Section: Giới thiệu & Điểm nổi bật */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#026E4E]/12 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#026E4E]">
            <Sparkles className="h-4 w-4" />
            <span>Hồ Sơ Đề Cử & Điểm Nổi Bật</span>
          </div>

          <p className="text-base text-[#2A4437] leading-relaxed">
            {destination.summary}
          </p>

          {destination.highlights && destination.highlights.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {destination.highlights.map((h, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#F4FAF6] border border-[#026E4E]/15 text-xs font-bold text-[#026E4E]"
                >
                  <Check className="h-3 w-3 text-[#FF9F00]" />
                  <span>{h}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Section: Video Giới Thiệu (Nếu có) */}
        {destination.videoUrl && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#026E4E]/12 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#026E4E]">
                <Film className="h-4 w-4" />
                <span>Video Giới Thiệu Điểm Đến</span>
              </div>
              <a
                href={destination.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#026E4E] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Mở trên Vimeo</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/95 shadow-md border border-[#026E4E]/20">
              <iframe
                src={getVimeoEmbedUrl(destination.videoUrl) || ""}
                className="w-full h-full border-0"
                title={`Video giới thiệu ${destination.name}`}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Section: Bài viết giới thiệu chi tiết (Nếu có) */}
        {destination.article && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#026E4E]/12 shadow-xs space-y-6">
            <div className="border-b border-[#026E4E]/10 pb-4">
              <span className="text-[11px] font-bold text-[#026E4E] uppercase tracking-wider block">
                Hồ sơ bài thi chính thức
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0E382B] mt-1.5 tracking-tight">
                {destination.article.title}
              </h3>
              <div className="mt-2.5 space-y-1 text-xs sm:text-sm text-[#4B6354]">
                <p>
                  <strong className="text-[#0E382B]">Địa phương:</strong> Tỉnh {destination.province}
                </p>
                <p>
                  <strong className="text-[#0E382B]">Chương trình:</strong> Hội thi “Điểm đến du lịch nông thôn Việt Nam tốt nhất” năm 2026
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {destination.article.sections.map((sec, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="font-extrabold text-sm sm:text-base text-[#026E4E] flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#FF9F00]" />
                    <span>{sec.title}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-[#2A4437] leading-relaxed pl-4 border-l-2 border-[#026E4E]/15">
                    {sec.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section: 4 Trụ Cột Đánh Giá Hội Thi */}
        {destination.ratings && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#026E4E]/12 shadow-xs space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#026E4E]">
              <Layers className="h-4 w-4" />
              <span>Tiêu Chí Đánh Giá Cốt Lõi (Bộ Nông nghiệp & Môi trường)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F4FAF6] border border-[#026E4E]/12 space-y-2">
                <div className="flex items-center gap-2 text-xs font-black text-[#026E4E]">
                  <span className="h-6 w-6 rounded-lg bg-emerald-50 text-[#026E4E] flex items-center justify-center text-xs">
                    🌾
                  </span>
                  <h4>Sản phẩm du lịch & Ẩm thực OCOP</h4>
                </div>
                <p className="text-xs sm:text-sm text-[#4B6354] leading-relaxed">
                  {destination.ratings.product}
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#F4FAF6] border border-[#026E4E]/12 space-y-2">
                <div className="flex items-center gap-2 text-xs font-black text-[#00C2FF]">
                  <span className="h-6 w-6 rounded-lg bg-sky-50 text-[#00C2FF] flex items-center justify-center text-xs">
                    🤝
                  </span>
                  <h4 className="text-[#0E382B]">Sự tham gia cộng đồng & Chia sẻ lợi ích</h4>
                </div>
                <p className="text-xs sm:text-sm text-[#4B6354] leading-relaxed">
                  {destination.ratings.community}
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#F4FAF6] border border-[#026E4E]/12 space-y-2">
                <div className="flex items-center gap-2 text-xs font-black text-[#16A34A]">
                  <span className="h-6 w-6 rounded-lg bg-emerald-50 text-[#16A34A] flex items-center justify-center text-xs">
                    <Leaf className="h-3.5 w-3.5" />
                  </span>
                  <h4 className="text-[#0E382B]">Môi trường sinh thái & Bảo tồn bản sắc</h4>
                </div>
                <p className="text-xs sm:text-sm text-[#4B6354] leading-relaxed">
                  {destination.ratings.sustainability}
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#F4FAF6] border border-[#026E4E]/12 space-y-2">
                <div className="flex items-center gap-2 text-xs font-black text-[#FF9F00]">
                  <span className="h-6 w-6 rounded-lg bg-amber-50 text-[#FF9F00] flex items-center justify-center text-xs">
                    <Globe className="h-3.5 w-3.5" />
                  </span>
                  <h4 className="text-[#0E382B]">Chuyển đổi số & Quảng bá đa kênh</h4>
                </div>
                <p className="text-xs sm:text-sm text-[#4B6354] leading-relaxed">
                  {destination.ratings.promotion}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Section: Quy mô & Thống kê */}
        {destination.stats && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#026E4E]/12 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#026E4E]">
              <Users className="h-4 w-4" />
              <span>Quy Mô & Tác Động Kinh Tế - Xã Hội</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {destination.stats.totalHouseholds && (
                <div className="p-4 rounded-2xl bg-[#F4FAF6] text-center border border-[#026E4E]/10">
                  <span className="text-xs text-[#4B6354] block">Quy mô cộng đồng</span>
                  <strong className="text-xl font-black text-[#026E4E]">
                    {destination.stats.totalHouseholds}
                  </strong>
                  <span className="text-[10px] text-[#4B6354] block">hộ dân</span>
                </div>
              )}

              {destination.stats.tourismHouseholds && (
                <div className="p-4 rounded-2xl bg-[#F4FAF6] text-center border border-[#026E4E]/10">
                  <span className="text-xs text-[#4B6354] block">Hộ làm du lịch</span>
                  <strong className="text-xl font-black text-[#FF9F00]">
                    {destination.stats.tourismHouseholds}
                  </strong>
                  <span className="text-[10px] text-[#4B6354] block">hộ gia đình</span>
                </div>
              )}

              {destination.stats.tourismWorkers && (
                <div className="p-4 rounded-2xl bg-[#F4FAF6] text-center border border-[#026E4E]/10">
                  <span className="text-xs text-[#4B6354] block">Lao động du lịch</span>
                  <strong className="text-xl font-black text-[#00C2FF]">
                    {destination.stats.tourismWorkers}
                  </strong>
                  <span className="text-[10px] text-[#4B6354] block">lao động địa phương</span>
                </div>
              )}

              {destination.stats.foundedYear && (
                <div className="p-4 rounded-2xl bg-[#F4FAF6] text-center border border-[#026E4E]/10">
                  <span className="text-xs text-[#4B6354] block">Năm hình thành</span>
                  <strong className="text-xl font-black text-[#16A34A]">
                    {destination.stats.foundedYear}
                  </strong>
                  <span className="text-[10px] text-[#4B6354] block">khởi đầu mô hình</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section: Thông tin đơn vị */}
        <div className="p-6 rounded-3xl bg-white border border-[#026E4E]/12 space-y-3 text-xs text-[#2A4437] shadow-xs">
          <div className="flex items-center gap-2 font-bold text-[#026E4E]">
            <ShieldCheck className="h-4 w-4" />
            <span>Thông Tin Đơn Vị Đề Cử & Địa Chỉ Chi Tiết</span>
          </div>
          <p>
            <strong>Địa chỉ:</strong> {destination.address || destination.province}
          </p>
          {destination.operator && (
            <p>
              <strong>Chủ thể quản lý:</strong> {destination.operator}
            </p>
          )}
          <p className="text-[11px] text-[#4B6354]">
            Hồ sơ thuộc Hội thi “Điểm đến du lịch nông thôn Việt Nam tốt nhất” năm 2026 do Bộ Nông nghiệp và Môi trường chủ trì.
          </p>
        </div>
      </main>
    </div>
  );
}
