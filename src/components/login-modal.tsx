"use client";
import type { Step } from "@/types/login-modal";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Eye, EyeOff, LoaderCircle, LockKeyhole, Mail, X } from "lucide-react";
import { toast } from "react-toastify";
import { getRanking } from "@/data/mock";
import { useAuth } from "@/lib/auth/AuthProvider";
import { normalizeEmail } from "@/lib/auth/authService";
import { DAILY_VOTE_LIMIT, DEMO_ACCOUNT, OTP_RESEND_SECONDS } from "@/lib/auth/config";
import { useCountdown } from "@/hooks/useCountdown";


function LoginPanel({ standalone }: { standalone: boolean }) {
  const auth = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<Step>("account");
  const [email, setEmail] = useState("");
  const [normalizedEmail, setNormalizedEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [resendAt, setResendAt] = useState(0);
  const { m, s } = useCountdown(resendAt);
  const resendSeconds = Number(m) * 60 + Number(s);
  const panel = useRef<HTMLDivElement>(null);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const mounted = useRef(true);
  const request = useRef(0);
  const pendingDestination = getRanking().find(destination => destination.id === auth.pendingDestinationId);

  const close = () => { ++request.current; auth.closeLoginModal(); if (standalone) router.push("/"); };

  useEffect(() => {
    mounted.current = true;
    const req = request;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    if (!standalone) {
      document.body.style.overflow = "hidden";
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.stop();
      }
    }
    panel.current?.querySelector<HTMLInputElement>("input")?.focus();
    return () => {
      mounted.current = false;
      ++req.current;
      if (!standalone) {
        document.body.style.overflow = overflow;
        if (typeof window !== "undefined" && window.__lenis) {
          window.__lenis.start();
        }
        if (previous?.isConnected && !(previous instanceof HTMLButtonElement && previous.disabled)) previous.focus();
        else document.querySelector<HTMLButtonElement>(".account-trigger, .nav-login-button")?.focus();
      }
    };
  }, [standalone]);

  const run = async (operation: () => Promise<void>) => {
    if (busy) return;
    const token = ++request.current;
    setBusy(true); setError("");
    try { await operation(); }
    catch (issue) { if (mounted.current && token === request.current) setError(issue instanceof Error ? issue.message : "Có lỗi xảy ra. Vui lòng thử lại."); }
    finally { if (mounted.current && token === request.current) setBusy(false); }
  };

  const showValidationError = (message: string) => {
    setError(message);
    toast.error(message, { toastId: message });
  };

  const send = async (event: FormEvent) => {
    event.preventDefault();
    let normalized: string;
    try { normalized = normalizeEmail(email); }
    catch { showValidationError("Vui lòng nhập email hợp lệ."); return; }
    if (!password) { showValidationError("Vui lòng nhập mật khẩu."); return; }
    await run(async () => {
      await auth.sendOtp(normalized, password);
      if (!mounted.current) return;
      setNormalizedEmail(normalized);
      setResendAt(Date.now() + OTP_RESEND_SECONDS * 1000);
      setOtp(Array(6).fill(""));
      setStep("otp");
    });
  };

  const resend = () => run(async () => {
    await auth.sendOtp(normalizedEmail, password);
    if (!mounted.current) return;
    setResendAt(Date.now() + OTP_RESEND_SECONDS * 1000);
    setOtp(Array(6).fill(""));
    inputs.current[0]?.focus();
  });

  const verify = async (event: FormEvent) => {
    event.preventDefault();
    if (otp.join("").length !== 6) { showValidationError("Vui lòng nhập đủ 6 chữ số mã OTP."); return; }
    await run(async () => { await auth.verifyOtp(normalizedEmail, otp.join("")); if (standalone) router.push("/"); });
  };

  const enterDigits = (index: number, text: string) => {
    if (!/^\d*$/.test(text)) return;
    const digits = text.slice(0, 6 - index).split("");
    setOtp(current => { const next = [...current]; if (!digits.length) next[index] = ""; else digits.forEach((digit, offset) => { next[index + offset] = digit; }); return next; });
    setError(""); inputs.current[Math.min(index + digits.length, 5)]?.focus();
  };

  const changeStep = (next: Step) => { setError(""); setStep(next); };

  return <div className={standalone ? (step === "otp" ? "auth-page auth-otp-page" : "auth-page") : "auth-overlay modal-enter-overlay"} onPointerDown={event => { if (!standalone && event.target === event.currentTarget) close(); }} onKeyDown={event => {
    if (event.key === "Escape") { event.stopPropagation(); close(); }
    if (event.key === "Tab" && (!standalone || step === "otp")) {
      const controls = panel.current?.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), a[href], summary');
      const first = controls?.[0]; const last = controls?.[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  }}><div ref={panel} data-lenis-prevent className={standalone ? "auth-panel" : "auth-panel modal-enter-panel"} role={standalone && step !== "otp" ? undefined : "dialog"} aria-modal={standalone && step !== "otp" ? undefined : true} aria-labelledby="auth-title" aria-describedby="auth-description">
    <div className="auth-topline"><Link href="/" aria-label="Du lịch Nông thôn - Trang chủ"><Image src="/logo.png" alt="Du lịch Nông thôn" width={34} height={34} className="rounded-full" /></Link><button className="auth-close" onClick={close} aria-label="Đóng đăng nhập"><X size={19} /></button></div>
    <div className="auth-intro"><h2 id="auth-title">{step === "otp" ? "Nhập mã OTP" : "Đăng nhập"}</h2><p id="auth-description">{step === "otp" ? <>Nhập mã 6 số gửi đến <strong>{normalizedEmail}</strong>.</> : "Nhập email và mật khẩu để tiếp tục."}</p></div>
    {pendingDestination && <div className="auth-destination"><span>Đăng nhập xong sẽ bình chọn cho</span><strong>{pendingDestination.name}</strong></div>}
    <div aria-live="assertive" aria-atomic="true">{error && <p className="auth-error">{error}</p>}</div>
    {step === "account" && <form className="auth-form" onSubmit={send} noValidate>
      <div><label htmlFor="auth-email">Email</label><div className="auth-input"><Mail size={17} /><input id="auth-email" type="email" inputMode="email" autoComplete="username" autoCapitalize="none" spellCheck={false} placeholder="Email của bạn" value={email} onChange={event => { setEmail(event.target.value); setError(""); }} disabled={busy || auth.isLoading} required /></div></div>
      <div><label htmlFor="auth-password">Mật khẩu</label><div className="auth-input"><LockKeyhole size={17} /><input id="auth-password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Mật khẩu của bạn" value={password} onChange={event => { setPassword(event.target.value); setError(""); }} disabled={busy || auth.isLoading} required /><button type="button" disabled={busy} aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"} onClick={() => setShowPassword(value => !value)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></div>
      <button className="vote-button auth-submit" type="submit" disabled={busy || auth.isLoading}>{busy ? <><LoaderCircle className="animate-spin" size={17} />Đang xử lý…</> : <>Đăng nhập <ArrowRight size={17} /></>}</button>
      {process.env.NODE_ENV !== "production" && <details className="auth-demo"><summary>Tài khoản thử nghiệm</summary><p>{DEMO_ACCOUNT.email}<br />{DEMO_ACCOUNT.password}</p></details>}
    </form>}
    {step === "otp" && <form className="auth-form" onSubmit={verify} noValidate>
      <fieldset className="otp-fieldset" disabled={busy}><legend>Mã xác thực 6 chữ số</legend><div className="otp-boxes">{otp.map((digit, index) => <input key={index} ref={element => { inputs.current[index] = element; }} aria-label={`Chữ số OTP ${index + 1}`} inputMode="numeric" autoComplete={index === 0 ? "one-time-code" : "off"} maxLength={6} value={digit} className={digit ? "is-filled" : ""} onChange={event => enterDigits(index, event.target.value)} onFocus={event => event.target.select()} onPaste={event => { event.preventDefault(); const value = event.clipboardData.getData("text").trim(); if (/^\d{1,6}$/.test(value)) enterDigits(index, value); }} onKeyDown={event => { if (event.key === "Backspace" && !digit && index > 0) inputs.current[index - 1]?.focus(); if (event.key === "ArrowLeft" && index > 0) inputs.current[index - 1]?.focus(); if (event.key === "ArrowRight" && index < 5) inputs.current[index + 1]?.focus(); }} autoFocus={index === 0} />)}</div></fieldset>
      {process.env.NODE_ENV !== "production" && <p className="auth-test-hint">Mã thử nghiệm: 123456</p>}
      <div className="otp-resend"><span>Chưa nhận được mã?</span><button type="button" disabled={busy || resendSeconds > 0} onClick={() => void resend()}>{busy ? "Đang xử lý…" : resendSeconds > 0 ? `Gửi lại sau ${resendSeconds}s` : "Gửi lại mã"}</button></div>
      <button className="vote-button auth-submit" type="submit" disabled={busy}>{busy ? <><LoaderCircle className="animate-spin" size={17} />Đang xác nhận…</> : "Xác nhận"}</button>
      <button className="auth-back" type="button" disabled={busy} onClick={() => changeStep("account")}><ArrowLeft size={15} />Quay lại đăng nhập</button>
    </form>}
    <p className="auth-demo-note">Mỗi tài khoản có tối đa {DAILY_VOTE_LIMIT} lượt bình chọn mỗi ngày, không cộng dồn.</p>
  </div></div>;
}

export function LoginModal({ standalone = false }: { standalone?: boolean }) {
  const { loginModalOpen } = useAuth();
  return standalone || loginModalOpen ? <LoginPanel standalone={standalone} /> : null;
}
