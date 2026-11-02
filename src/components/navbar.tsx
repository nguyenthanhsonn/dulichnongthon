"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AccountMenu } from "./account-menu";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthProvider";
import { DAILY_VOTE_LIMIT } from "@/lib/auth/config";
import { useVoting } from "@/context/voting-context";
import { Menu, X, LogIn } from "lucide-react";

export function Navbar() {
  const { user, setLoginModalOpen, logoutUser, setRulesModalOpen } = useVoting();
  const pathname = usePathname();
  const { isLoading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="site-header fixed top-4 inset-x-0 z-50 px-4 sm:px-6 transition-all duration-300">
      {/* Glassmorphic Navbar: Kính mờ trong suốt cao cấp + Chữ Xanh Đen #1B2B22 & Xanh Đậm #1F6B45 KHÔNG BAO GIỜ BỊ CHÌM */}
      <nav
        className={`liquid-nav ${scrolled ? "is-scrolled" : ""}`}
      >
        {/* Logo & Brand: Chữ Xanh lá đậm #1F6B45 rõ nét tuyệt đối */}
        <button
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-md ring-1 ring-[#1F6B45]/30">
            <Image
              src="/logo.png"
              alt="Logo Cuộc thi Du lịch Nông thôn"
              sizes="40px"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="text-left">
            <span className="block font-black text-sm tracking-tight text-inherit transition-colors leading-tight drop-shadow-2xs">
              Du Lịch Nông Thôn
            </span>
            <span className="block text-[11px] font-bold text-inherit leading-none">
              Bình chọn 2026
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links: Chữ Xanh đen #1B2B22 đậm nét, tương phản cao trên mọi nền trời mây */}
        <div className="nav-links hidden xl:flex items-center gap-7 text-sm font-extrabold text-inherit">
          <button
            onClick={() => scrollToSection("hero")}
            className="hover:text-[#1F6B45] transition-colors cursor-pointer"
          >
            Trang chủ
          </button>
          <button
            onClick={() => scrollToSection("destinations")}
            className="hover:text-[#1F6B45] transition-colors cursor-pointer"
          >
            Điểm đến
          </button>
          <button
            onClick={() => scrollToSection("leaderboard")}
            className="hover:text-[#1F6B45] transition-colors cursor-pointer"
          >
            Xếp hạng
          </button>
          <button
            onClick={() => setRulesModalOpen(true)}
            className="hover:text-[#1F6B45] transition-colors cursor-pointer"
          >
            Thể lệ
          </button>
        </div>

        {/* Right Section: Auth & Votes status */}
        <div className="flex items-center gap-3">
          {user ? (
            <AccountMenu key={pathname} />
          ) : (
            /* Nút Đăng nhập: Chủ đạo Xanh lá đậm #1F6B45 nổi bật, tương phản sắc nét */
            <button
              onClick={() => setLoginModalOpen(true)}
              disabled={isLoading}
              className="nav-login-button hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-[#1F6B45] hover:bg-[#164e32] text-white text-xs sm:text-sm font-bold border border-white/40 shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Đăng nhập</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-full text-inherit hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Mở menu điều hướng"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-nav xl:hidden mt-2 mx-auto max-w-5xl rounded-3xl bg-[#dce9d8]/98 backdrop-blur-2xl border border-white/80 p-5 shadow-2xl space-y-4 text-inherit">
          {user && (
            <div className="p-3 rounded-2xl bg-[#F2F7F4] border border-[#1F6B45]/20 flex items-center justify-between text-xs">
              <span className="text-[#4B5E52]">Tài khoản: {user.phone}</span>
              <span className="font-bold text-[#1F6B45] bg-white px-2.5 py-0.5 rounded-full shadow-xs">
                Còn {user.votesRemaining}/{DAILY_VOTE_LIMIT} lượt
              </span>
            </div>
          )}

          <div className="flex flex-col gap-1.5 text-sm font-bold text-inherit">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-left px-3.5 py-2.5 rounded-xl hover:bg-[#EBF5EE] text-[#1F6B45]"
            >
              Trang chủ
            </button>
            <button
              onClick={() => scrollToSection("destinations")}
              className="text-left px-3.5 py-2.5 rounded-xl hover:bg-[#EBF5EE]"
            >
              Điểm đến (35)
            </button>
            <button
              onClick={() => scrollToSection("leaderboard")}
              className="text-left px-3.5 py-2.5 rounded-xl hover:bg-[#EBF5EE]"
            >
              Bảng xếp hạng
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setRulesModalOpen(true);
              }}
              className="text-left px-3.5 py-2.5 rounded-xl hover:bg-[#EBF5EE]"
            >
              Thể lệ cuộc thi
            </button>
          </div>

          <div className="pt-2 border-t border-black/5">
            {user ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logoutUser();
                }}
                className="w-full text-center py-2.5 text-xs font-semibold text-rose-600 rounded-xl hover:bg-rose-50"
              >
                Đăng xuất ({user.phone})
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setLoginModalOpen(true);
                }}
                className="w-full py-3 rounded-full bg-[#1F6B45] text-white text-xs font-bold text-center shadow-md"
              >
                Đăng nhập bằng số điện thoại
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
