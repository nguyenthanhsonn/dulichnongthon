"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useVoting } from "@/context/voting-context";
import { X, Smartphone, ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";

export function LoginModal() {
  const { loginModalOpen, setLoginModalOpen, loginUser, voteModalDestination } = useVoting();
  const [step, setStep] = useState<1 | 2>(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);

  const canResend = countdown === 0;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 2 && countdown > 0) {
      timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [step, countdown]);

  if (!loginModalOpen) return null;

  const handleClose = () => {
    setLoginModalOpen(false);
    setStep(1);
    setPhone("");
    setOtp(["", "", "", "", "", ""]);
    setError("");
    setCountdown(60);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\s+/g, "");
    if (!/^0[3|5|7|8|9][0-9]{8}$/.test(cleanPhone)) {
      setError("Vui lòng nhập số điện thoại Việt Nam hợp lệ (10 chữ số).");
      return;
    }
    setError("");
    setStep(2);
    setCountdown(60);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    // Auto focus next box
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      setError("Vui lòng nhập đủ 6 chữ số mã OTP.");
      return;
    }
    setError("");
    loginUser(phone);
    handleClose();
  };

  const handleQuickDemo = () => {
    setOtp(["1", "2", "3", "4", "5", "6"]);
    setError("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
      {/* Modal Card chuẩn phong cách Glassmorphism: Kính trong suốt, mờ mịn cao cấp, viền phản quang */}
      <div className="relative w-full max-w-md rounded-3xl bg-white/75 backdrop-blur-2xl border border-white/90 p-7 sm:p-9 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),inset_0_1px_2px_0_rgba(255,255,255,0.95)] space-y-6">
        {/* Nút đóng dạng Glassmorphic pill */}
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 p-2 rounded-full bg-white/60 hover:bg-white text-[#1B2B22] border border-white/80 shadow-xs backdrop-blur-md transition-all cursor-pointer"
          aria-label="Đóng"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Tiêu đề & Logo */}
        <div className="text-center space-y-2">
          <div className="relative mx-auto h-16 w-16 rounded-full overflow-hidden border-2 border-white shadow-md ring-1 ring-[#1F6B45]/20 mb-3">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-2xl font-black text-[#1B2B22] tracking-tight">
            {step === 1 ? "Đăng nhập để bình chọn" : "Xác thực mã OTP"}
          </h3>
          <p className="text-xs sm:text-sm text-[#4B5E52] font-medium max-w-xs mx-auto">
            {step === 1
              ? "Mỗi số điện thoại được bình chọn tối đa 3 điểm đến yêu thích."
              : `Mã OTP gồm 6 chữ số đã được gửi đến số điện thoại ${phone}`}
          </p>
        </div>

        {/* Hộp nhắc điểm đến đang chọn vote (Glassmorphic) */}
        {voteModalDestination && (
          <div className="p-3 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-xs flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-xl overflow-hidden shrink-0 border border-white shadow-2xs">
              <Image
                src={voteModalDestination.imageUrl}
                alt={voteModalDestination.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="overflow-hidden">
              <span className="text-[10px] font-bold text-[#1F6B45] uppercase tracking-wider">
                Bình chọn cho:
              </span>
              <p className="text-xs font-black text-[#1B2B22] truncate">
                {voteModalDestination.name} ({voteModalDestination.province})
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 rounded-xl bg-rose-50/90 border border-rose-200 text-xs text-rose-700 font-bold">
            {error}
          </div>
        )}

        {/* Bước 1: Nhập số điện thoại */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1B2B22] mb-1.5">
                Số điện thoại của bạn
              </label>
              <div className="relative">
                <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1F6B45]" />
                <input
                  type="tel"
                  placeholder="Ví dụ: 0912 345 678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/80 backdrop-blur-md border border-white/90 text-sm font-bold text-[#1B2B22] placeholder:text-[#4B5E52]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F6B45] shadow-xs"
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#1F6B45] hover:bg-[#164e32] text-white font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/30"
            >
              <span>Tiếp tục nhận mã OTP</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#4B5E52] font-medium pt-2">
              <ShieldCheck className="h-3.5 w-3.5 text-[#1F6B45]" />
              <span>Bảo mật thông tin người tham gia theo quy định</span>
            </div>
          </form>
        )}

        {/* Bước 2: Nhập OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-[#1B2B22] mb-2 text-center">
                Nhập 6 chữ số mã xác thực
              </label>
              <div className="flex items-center justify-center gap-2">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="h-12 w-11 sm:w-12 text-center text-lg font-black rounded-xl bg-white/85 backdrop-blur-md border border-white/90 text-[#1B2B22] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F6B45] shadow-xs"
                    autoFocus={i === 0}
                  />
                ))}
              </div>
            </div>

            {/* Quick Demo Button */}
            <div className="flex items-center justify-between text-xs text-[#4B5E52] pt-1 font-semibold">
              <button
                type="button"
                onClick={handleQuickDemo}
                className="text-xs text-[#1F6B45] font-bold hover:underline"
              >
                Nhập nhanh OTP mẫu (123456)
              </button>

              {canResend ? (
                <button
                  type="button"
                  onClick={() => setCountdown(60)}
                  className="inline-flex items-center gap-1 text-xs text-[#1F6B45] font-bold hover:underline"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>Gửi lại mã</span>
                </button>
              ) : (
                <span className="text-[11px] text-[#4B5E52]">
                  Gửi lại sau {countdown}s
                </span>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-2xl bg-white/75 hover:bg-white text-[#1B2B22] border border-white/80 text-xs font-bold shadow-xs backdrop-blur-md transition-colors"
              >
                Đổi số ĐT
              </button>
              <button
                type="submit"
                className="w-2/3 py-3 rounded-2xl bg-[#F5A623] hover:bg-[#e09318] text-[#1B2B22] font-black text-sm shadow-md hover:shadow-lg transition-all"
              >
                Xác nhận & Đăng nhập
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
