import type { PageProps } from "@/types/destination-route";
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
} from "lucide-react";

function getVimeoEmbedUrl(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (match) {
    return `https://player.vimeo.com/video/${match[1]}?autoplay=1&loop=1&muted=1&playsinline=1&byline=0&portrait=0&title=0&dnt=1`;
  }
  return null;
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

export default async function DestinationDetailView({ params }: PageProps) {
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
  const regionLabel = regionNames[destination.region];
  const videoEmbedUrl = getVimeoEmbedUrl(destination.videoUrl);
  const { totalHouseholds, tourismHouseholds, tourismWorkers, foundedYear } = destination.stats ?? {};
  const hasStats = Boolean(totalHouseholds || tourismHouseholds || tourismWorkers || foundedYear);
  const photos = [destination.image, ...(destination.gallery ?? [])].filter((photo) => photo.src);

  return (
    <div className="min-h-screen bg-[#EDF5E9] text-[#183629]">
      <header className="border-b border-[#D4E4D2] bg-[#F8FBF6]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-8">
          <Link
            href="/#destinations"
            className="inline-flex min-h-10 items-center gap-2 text-sm font-bold text-[#23573E] transition-colors hover:text-[#122F22]"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
            Danh sách điểm đến
          </Link>
          <Link href="/" aria-label="Trang chủ Hội thi Du lịch Nông thôn" className="flex items-center gap-2 text-xs font-bold">
            <Image src="/logo.png" alt="" width={32} height={32} className="rounded-full" />
            <span className="hidden sm:inline">Hội thi Du lịch Nông thôn 2026</span>
          </Link>
        </div>
      </header>

      <main className="motion-safe:animate-[destination-enter_180ms_ease-out]">
        {videoEmbedUrl ? (
          <figure className="w-full overflow-hidden border-b border-[#D4E4D2] bg-[#F8FBF6]">
            <div className="relative aspect-video overflow-hidden bg-[#17372A]">
              {destination.image.src && (
                <DestinationImage
                  src={destination.image.src}
                  alt={destination.image.alt}
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
              )}
              <iframe
                src={videoEmbedUrl}
                className="absolute inset-0 h-full w-full border-0"
                title={`Video giới thiệu ${destination.name}`}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </figure>
        ) : photos.length > 0 && (
          <div className="relative mx-auto mt-5 aspect-video max-w-5xl overflow-hidden bg-[#DDEBDC] sm:rounded-3xl">
            <DestinationImage
              src={photos[0].src}
              alt={photos[0].alt}
              sizes="(max-width: 1152px) 100vw, 1088px"
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="mx-auto max-w-6xl space-y-6 px-4 py-5 sm:space-y-8 sm:px-8 sm:py-9">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start">
            <header className="min-w-0 space-y-3 px-1 py-2 sm:px-3">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#23573E]">
                <span className="rounded-full bg-[#DDEBDC] px-3 py-1.5">{destination.recordCode}</span>
                <span className="rounded-full bg-[#DDEBDC] px-3 py-1.5">{regionLabel}</span>
              </div>
              <h1 className="text-balance break-words font-serif text-3xl font-semibold leading-tight sm:text-5xl">
                {destination.name}
              </h1>
              <p className="flex items-center gap-2 text-sm font-bold text-[#23573E]">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                {destination.province}
              </p>
              {destination.fullName && destination.fullName !== destination.name && (
                <p className="max-w-prose text-base leading-relaxed text-[#365746]">{destination.fullName}</p>
              )}
            </header>
            <aside className="rounded-2xl border border-[#D4E4D2] bg-[#F8FBF6] p-5">
              <p className="text-sm font-bold">Bình chọn trực tuyến</p>
              <p className="mb-3 mt-1 text-sm leading-relaxed text-[#365746]">Ủng hộ điểm đến bạn yêu thích tại Hội thi.</p>
              <Link href="/#destinations" className="vote-button w-full">
                <Heart className="h-4 w-4" aria-hidden="true" />
                Bình chọn ngay
              </Link>
            </aside>
          </div>

          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)] lg:gap-8">
            <div className="min-w-0 space-y-6">
              {/* Section: Giới thiệu & Điểm nổi bật */}
              <div className="space-y-5 rounded-3xl border border-[#D4E4D2] bg-[#E3EFE0] p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#026E4E]">
                  <Sparkles className="h-4 w-4" />
                  <span>Hồ sơ đề cử</span>
                </div>

                <h2 className="font-serif text-2xl font-semibold text-[#183629] sm:text-3xl">Giới thiệu điểm đến</h2>
                <p className="max-w-prose text-base leading-7 text-[#2A4437] sm:text-lg">
                  {destination.summary}
                </p>

                {destination.highlights && destination.highlights.length > 0 && (
                  <ul aria-label="Điểm nổi bật" className="flex flex-wrap gap-2 pt-1">
                    {destination.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#F4FAF6] border border-[#026E4E]/15 text-xs font-bold text-[#026E4E]"
                      >
                        <Check className="h-3 w-3 text-[#805514]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Section: Bài viết giới thiệu chi tiết (Nếu có) */}
              {destination.article && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#FAFCF8] border border-[#D4E4D2] shadow-xs space-y-6">
                  <div className="border-b border-[#026E4E]/10 pb-4">
                    <span className="text-[11px] font-bold text-[#026E4E] uppercase tracking-wider block">
                      Hồ sơ bài thi chính thức
                    </span>
                    <h2 className="mt-1.5 text-xl font-bold text-[#0E382B] sm:text-2xl">
                      {destination.article.title === destination.name ? "Bài viết giới thiệu" : destination.article.title}
                    </h2>
                    <div className="mt-2.5 space-y-1 text-xs sm:text-sm text-[#4B6354]">
                      <p>
                        <strong className="text-[#0E382B]">Địa phương:</strong> Tỉnh {destination.province}
                      </p>
                      <p>
                        <strong className="text-[#0E382B]">Chương trình:</strong> Hội thi “Điểm đến du lịch nông thôn Việt Nam tốt nhất” năm 2026
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {destination.article.sections.map((sec, idx) => (
                      <div key={idx} className="space-y-2 border-t border-[#D4E4D2] pt-5 first:border-0 first:pt-0">
                        <h3 className="font-extrabold text-base sm:text-lg text-[#026E4E] flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-[#FF9F00]" />
                          <span>{sec.title}</span>
                        </h3>
                        <p className="max-w-prose whitespace-pre-line text-base leading-7 text-[#2A4437]">
                          {sec.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section: 4 Trụ Cột Đánh Giá Hội Thi */}
              {destination.ratings && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#FAFCF8] border border-[#D4E4D2] shadow-xs space-y-5">
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
                      <div className="flex items-center gap-2 text-xs font-black text-[#23573E]">
                        <span className="h-6 w-6 rounded-lg bg-emerald-50 text-[#23573E] flex items-center justify-center text-xs">
                          🤝
                        </span>
                        <h4 className="text-[#0E382B]">Sự tham gia cộng đồng & Chia sẻ lợi ích</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-[#4B6354] leading-relaxed">
                        {destination.ratings.community}
                      </p>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-[#F4FAF6] border border-[#026E4E]/12 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-black text-[#23573E]">
                        <span className="h-6 w-6 rounded-lg bg-emerald-50 text-[#23573E] flex items-center justify-center text-xs">
                          <Leaf className="h-3.5 w-3.5" />
                        </span>
                        <h4 className="text-[#0E382B]">Môi trường sinh thái & Bảo tồn bản sắc</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-[#4B6354] leading-relaxed">
                        {destination.ratings.sustainability}
                      </p>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-[#F4FAF6] border border-[#026E4E]/12 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-black text-[#805514]">
                        <span className="h-6 w-6 rounded-lg bg-amber-50 text-[#805514] flex items-center justify-center text-xs">
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
            </div>
            <aside aria-label="Hình ảnh và thông tin điểm đến" className="min-w-0 space-y-6">
              {photos.length > 0 && (
                <section aria-labelledby="destination-photos" className="rounded-3xl border border-[#D4E4D2] overflow-hidden bg-[#FAFCF8]">
                  <h2 id="destination-photos" className="px-5 py-4 text-base font-bold">Hình ảnh điểm đến</h2>
                  <div className="grid gap-4">
                    {photos.map((photo) => (
                      <figure key={photo.src}>
                        <div className="relative aspect-[3/2] overflow-hidden bg-[#E3EFE0]">
                          <DestinationImage
                            src={photo.src}
                            alt={photo.alt}
                            sizes="(max-width: 1023px) 100vw, 352px"
                            className="object-cover"
                          />
                        </div>
                        <figcaption className="px-5 py-3 text-sm text-[#365746]">{photo.alt}</figcaption>
                      </figure>
                    ))}
                  </div>
                </section>
              )}

              {/* Section: Thông tin đơn vị */}
              <div className="p-6 rounded-3xl bg-[#FAFCF8] border border-[#D4E4D2] space-y-3 text-sm leading-relaxed text-[#2A4437] shadow-xs">
                <div className="flex items-center gap-2 font-bold text-[#026E4E]">
                  <ShieldCheck className="h-4 w-4" />
                  <h2 className="text-base">Thông tin điểm đến</h2>
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
              {/* Section: Quy mô & Thống kê */}
              {hasStats && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#FAFCF8] border border-[#D4E4D2] shadow-xs space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#026E4E]">
                    <Users className="h-4 w-4" />
                    <span>Quy Mô & Tác Động Kinh Tế - Xã Hội</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {totalHouseholds && (
                      <div className="p-3 rounded-2xl bg-[#F4FAF6] text-center border border-[#026E4E]/10">
                        <span className="text-xs text-[#4B6354] block">Quy mô cộng đồng</span>
                        <strong className="text-xl font-black text-[#026E4E]">
                          {totalHouseholds}
                        </strong>
                        <span className="text-[10px] text-[#4B6354] block">hộ dân</span>
                      </div>
                    )}

                    {tourismHouseholds && (
                      <div className="p-3 rounded-2xl bg-[#F4FAF6] text-center border border-[#026E4E]/10">
                        <span className="text-xs text-[#4B6354] block">Hộ làm du lịch</span>
                        <strong className="text-xl font-black text-[#805514]">
                          {tourismHouseholds}
                        </strong>
                        <span className="text-[10px] text-[#4B6354] block">hộ gia đình</span>
                      </div>
                    )}

                    {tourismWorkers && (
                      <div className="p-3 rounded-2xl bg-[#F4FAF6] text-center border border-[#026E4E]/10">
                        <span className="text-xs text-[#4B6354] block">Lao động du lịch</span>
                        <strong className="text-xl font-black text-[#23573E]">
                          {tourismWorkers}
                        </strong>
                        <span className="text-[10px] text-[#4B6354] block">lao động địa phương</span>
                      </div>
                    )}

                    {foundedYear && (
                      <div className="p-3 rounded-2xl bg-[#F4FAF6] text-center border border-[#026E4E]/10">
                        <span className="text-xs text-[#4B6354] block">Năm hình thành</span>
                        <strong className="text-xl font-black text-[#23573E]">
                          {foundedYear}
                        </strong>
                        <span className="text-[10px] text-[#4B6354] block">khởi đầu mô hình</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

