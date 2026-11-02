"use client";

import React, { useState, useMemo } from "react";
import { useVoting } from "@/context/voting-context";
import { DestinationCard } from "./destination-card";
import { Search, Compass, SlidersHorizontal, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

type RegionFilter = "all" | "north" | "central" | "south";
type SortOption = "votes-desc" | "name-asc" | "code-asc";

const ITEMS_PER_PAGE = 8; // 8 điểm đến / trang (2 hàng x 4 cột chuẩn desktop)

export function DestinationGrid() {
  const { destinations } = useVoting();
  const [selectedRegion, setSelectedRegion] = useState<RegionFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("votes-desc");
  const [currentPage, setCurrentPage] = useState(1);

  const handleRegionChange = (region: RegionFilter) => {
    setSelectedRegion(region);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  // Calculate region counts
  const counts = useMemo(() => {
    return {
      all: destinations.length,
      north: destinations.filter((d) => d.region === "north").length,
      central: destinations.filter((d) => d.region === "central").length,
      south: destinations.filter((d) => d.region === "south").length,
    };
  }, [destinations]);

  // Filter & sort
  const filteredDestinations = useMemo(() => {
    let result = [...destinations];

    // Filter by region
    if (selectedRegion !== "all") {
      result = result.filter((d) => d.region === selectedRegion);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.province.toLowerCase().includes(q) ||
          d.code.toLowerCase().includes(q) ||
          d.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "votes-desc") {
        return b.votes - a.votes;
      }
      if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name, "vi");
      }
      if (sortBy === "code-asc") {
        return a.code.localeCompare(b.code);
      }
      return 0;
    });

    return result;
  }, [destinations, selectedRegion, searchQuery, sortBy]);

  // Overall ranks mapping based on all destinations sorted by votes
  const rankMap = useMemo(() => {
    const sorted = [...destinations].sort((a, b) => b.votes - a.votes);
    const map = new Map<string, number>();
    sorted.forEach((d, index) => {
      map.set(d.id, index + 1);
    });
    return map;
  }, [destinations]);

  // Pagination calculation
  const totalItems = filteredDestinations.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const currentItems = filteredDestinations.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      const el = document.getElementById("destinations");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="destinations" className="destinations-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="destination-heading space-y-3" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F6B45]/10 text-[#1F6B45] text-xs font-semibold">
            <Compass className="h-3.5 w-3.5" />
            <span>Danh sách đề cử chính thức</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1B2B22] tracking-tight">
            Tìm một miền quê để thương.
          </h2>
          <p className="text-sm sm:text-base text-[#4B5E52]">
            Khám phá vẻ đẹp bình dị của các làng nghề, trang trại hữu cơ và danh thắng sinh thái trên khắp 3 miền Tổ quốc.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="destination-filters bg-[#e2ecdc] rounded-3xl p-4 sm:p-6 border border-[#1F6B45]/15 shadow-sm space-y-4">
          <div className="filter-layout flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
            {/* Region Filter Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleRegionChange("all")}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedRegion === "all"
                    ? "bg-[#1F6B45] text-white shadow-xs"
                    : "bg-[#eff4e9] hover:bg-[#EBF5EE] text-[#1B2B22] border border-[#1F6B45]/15"
                }`}
              >
                Tất cả ({counts.all})
              </button>
              <button
                onClick={() => handleRegionChange("north")}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedRegion === "north"
                    ? "bg-[#1F6B45] text-white shadow-xs"
                    : "bg-[#eff4e9] hover:bg-[#EBF5EE] text-[#1B2B22] border border-[#1F6B45]/15"
                }`}
              >
                Miền Bắc ({counts.north})
              </button>
              <button
                onClick={() => handleRegionChange("central")}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedRegion === "central"
                    ? "bg-[#1F6B45] text-white shadow-xs"
                    : "bg-[#eff4e9] hover:bg-[#EBF5EE] text-[#1B2B22] border border-[#1F6B45]/15"
                }`}
              >
                Miền Trung ({counts.central})
              </button>
              <button
                onClick={() => handleRegionChange("south")}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedRegion === "south"
                    ? "bg-[#1F6B45] text-white shadow-xs"
                    : "bg-[#eff4e9] hover:bg-[#EBF5EE] text-[#1B2B22] border border-[#1F6B45]/15"
                }`}
              >
                Miền Nam ({counts.south})
              </button>
            </div>

            {/* Search Input & Sort Dropdown */}
            <div className="filter-controls flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="filter-search relative min-w-0 flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4B5E52]" />
                <input
                  type="text"
                  aria-label="Tìm điểm đến hoặc tỉnh thành"
                  placeholder="Tìm điểm đến, tỉnh thành..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-full bg-[#eff4e9] border border-[#1F6B45]/20 text-xs sm:text-sm font-medium text-[#1B2B22] placeholder:text-[#4B5E52]/60 focus:outline-none focus:ring-2 focus:ring-[#1F6B45]"
                />
              </div>

              <div className="relative">
                <select
                  aria-label="Sắp xếp điểm đến"
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value as SortOption)}
                  className="w-full appearance-none pl-3.5 pr-8 py-2 rounded-full bg-[#eff4e9] border border-[#1F6B45]/20 text-xs sm:text-sm text-[#1B2B22] font-bold focus:outline-none focus:ring-2 focus:ring-[#1F6B45] cursor-pointer"
                >
                  <option value="votes-desc">Lượt vote cao nhất</option>
                  <option value="name-asc">Tên A-Z</option>
                  <option value="code-asc">Theo mã số</option>
                </select>
                <SlidersHorizontal className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#4B5E52]" />
              </div>
            </div>
          </div>
        </div>

        {/* 35 Destination Cards Grid (Phân trang 8 thẻ/trang: 4 cột desktop, 2 cột tablet, 1 cột mobile) */}
        {totalItems > 0 ? (
          <div className="space-y-8">
            <div className="destination-cards grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {currentItems.map((dest) => (
                <DestinationCard
                  key={dest.id}
                  destination={dest}
                  rank={rankMap.get(dest.id) || 1}
                />
              ))}
            </div>

            {/* Phân trang (Pagination Controls) */}
            <div className="pt-6 border-t border-[#1F6B45]/15 flex flex-col lg:flex-row items-center justify-between gap-4">
              {/* Thống kê số lượng đang xem */}
              <p className="text-xs sm:text-sm text-[#4B5E52] font-semibold">
                Hiển thị <span className="text-[#1F6B45] font-black">{startIndex + 1} - {endIndex}</span> trong tổng số <span className="text-[#1F6B45] font-black">{totalItems}</span> điểm đến
              </p>

              {/* Điều khiển chuyển trang */}
              <div className="destination-pagination flex items-center gap-1.5 sm:gap-2">
                {/* Về trang đầu */}
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={safeCurrentPage === 1}
                  className="p-2 rounded-xl bg-white border border-[#1F6B45]/15 text-[#1B2B22] hover:bg-[#EBF5EE] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
                  aria-label="Về trang đầu"
                  title="Trang đầu"
                  data-pagination-edge
                >
                  <ChevronsLeft className="h-4 w-4" />
                </button>

                {/* Trang trước */}
                <button
                  aria-label="Trang trước"
                  onClick={() => handlePageChange(safeCurrentPage - 1)}
                  disabled={safeCurrentPage === 1}
                  className="px-3 py-2 rounded-xl bg-white border border-[#1F6B45]/15 text-xs font-bold text-[#1B2B22] hover:bg-[#EBF5EE] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1 shadow-2xs cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Trước</span>
                </button>

                {/* Các nút số trang */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      aria-current={pageNum === safeCurrentPage ? "page" : undefined}
                      aria-label={`Trang ${pageNum}`}
                      onClick={() => handlePageChange(pageNum)}
                      className={`h-9 w-9 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        pageNum === safeCurrentPage
                          ? "bg-[#1F6B45] text-white shadow-sm scale-105"
                          : "bg-white hover:bg-[#EBF5EE] text-[#1B2B22] border border-[#1F6B45]/15 shadow-2xs"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                {/* Trang sau */}
                <button
                  aria-label="Trang sau"
                  onClick={() => handlePageChange(safeCurrentPage + 1)}
                  disabled={safeCurrentPage === totalPages}
                  className="px-3 py-2 rounded-xl bg-white border border-[#1F6B45]/15 text-xs font-bold text-[#1B2B22] hover:bg-[#EBF5EE] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1 shadow-2xs cursor-pointer"
                >
                  <span className="hidden sm:inline">Sau</span>
                  <ChevronRight className="h-4 w-4" />
                </button>

                {/* Đến trang cuối */}
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={safeCurrentPage === totalPages}
                  className="p-2 rounded-xl bg-white border border-[#1F6B45]/15 text-[#1B2B22] hover:bg-[#EBF5EE] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
                  aria-label="Đến trang cuối"
                  title="Trang cuối"
                  data-pagination-edge
                >
                  <ChevronsRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl bg-white border border-[#1F6B45]/15 space-y-3">
            <p className="text-base font-bold text-[#1B2B22]">
              Không tìm thấy điểm đến phù hợp với từ khóa &quot;{searchQuery}&quot;
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedRegion("all");
              }}
              className="text-xs font-bold text-[#1F6B45] hover:underline cursor-pointer"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
