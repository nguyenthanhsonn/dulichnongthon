"use client";
import type { Step } from "@/types/login-modal";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Eye, EyeOff, LoaderCircle, LockKeyhole, UserRound, X } from "lucide-react";
import { toast } from "react-toastify";
import { getRanking } from "@/data/mock";
import { useAuth } from "@/lib/auth/AuthProvider";
import { normalizePhone } from "@/lib/auth/authService";
import { DAILY_VOTE_LIMIT, DEMO_ACCOUNT, OTP_RESEND_SECONDS } from "@/lib/auth/config";
import { useCountdown } from "@/hooks/useCountdown";


function parsePhone(raw: string): string {
  const clean = raw.trim().replace(/\s/g, "");
  if (clean.startsWith("+84")) return `0${clean.slice(3)}`;
  if (/^[35789]\d{8}$/.test(clean)) return `0${clean}`;
  return clean;
}

function LoginPanel({ standalone }: { standalone: boolean }) {
  const auth = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [normalizedPhone, setNormalizedPhone] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [username, setUsername] = useState("");
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

  let phoneError = "";
  try {
    normalizePhone(parsePhone(phone));
  } catch (issue) {
    phoneError = issue instanceof Error ? issue.message : "Vui lòng kiểm tra số điện thoại.";
  }

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
    event.preventDefault(); setPhoneTouched(true);
    if (phoneError) { showValidationError(phoneError); return; }
    const normalized = normalizePhone(parsePhone(phone));
    await run(async () => {
      await auth.sendOtp(normalized);
      if (!mounted.current) return;
      setNormalizedPhone(normalized); setResendAt(Date.now() + OTP_RESEND_SECONDS * 1000); setOtp(Array(6).fill("")); setStep("otp");
    });
  };

  const resend = () => run(async () => {
    await auth.sendOtp(normalizedPhone);
    if (!mounted.current) return;
    setResendAt(Date.now() + OTP_RESEND_SECONDS * 1000); setOtp(Array(6).fill("")); inputs.current[0]?.focus();
  });

  const verify = async (event: FormEvent) => {
    event.preventDefault();
    if (otp.join("").length !== 6) { showValidationError("Vui lòng nhập đủ 6 chữ số mã OTP."); return; }
    await run(async () => { await auth.verifyOtp(normalizedPhone, otp.join("")); if (standalone) router.push("/"); });
  };

  const submitAccount = async (event: FormEvent) => {
    event.preventDefault();
    if (!username.trim() || !password) { showValidationError("Vui lòng nhập tài khoản và mật khẩu."); return; }
    await run(async () => { await auth.loginWithAccount(username, password); if (standalone) router.push("/"); });
  };

  const loginDemo = () => run(async () => {
    await auth.loginWithAccount(DEMO_ACCOUNT.username, DEMO_ACCOUNT.password);
    if (standalone) router.push("/");
  });

  const enterDigits = (index: number, text: string) => {
    if (!/^\d*$/.test(text)) return;
    const digits = text.slice(0, 6 - index).split("");
    setOtp(current => { const next = [...current]; if (!digits.length) next[index] = ""; else digits.forEach((digit, offset) => { next[index + offset] = digit; }); return next; });
    setError(""); inputs.current[Math.min(index + digits.length, 5)]?.focus();
  };

  const changeStep = (next: Step) => { setError(""); setStep(next); };

  return <div className={standalone ? "auth-page" : "auth-overlay modal-enter-overlay"} onPointerDown={event => { if (!standalone && event.target === event.currentTarget) close(); }} onKeyDown={event => {
    if (event.key === "Escape") { event.stopPropagation(); close(); }
    if (event.key === "Tab" && !standalone) {
      const controls = panel.current?.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), a[href], summary');
      const first = controls?.[0]; const last = controls?.[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  }}><div ref={panel} data-lenis-prevent className={standalone ? "auth-panel" : "auth-panel modal-enter-panel"} role={standalone ? undefined : "dialog"} aria-modal={standalone ? undefined : true} aria-labelledby="auth-title" aria-describedby="auth-description">
    <div className="auth-topline"><Link href="/" aria-label="Du lịch Nông thôn - Trang chủ"><Image src="/logo.png" alt="Du lịch Nông thôn" width={34} height={34} className="rounded-full" /></Link><button className="auth-close" onClick={close} aria-label="Đóng đăng nhập"><X size={19} /></button></div>
    <div className="auth-intro"><h2 id="auth-title">{step === "otp" ? "Nhập mã OTP" : "Đăng nhập"}</h2><p id="auth-description">{step === "otp" ? <>Mã xác thực 6 số cho <strong>{normalizedPhone}</strong>.</> : step === "phone" ? "Nhập số điện thoại để nhận mã OTP." : "Nhập tài khoản và mật khẩu của bạn."}</p></div>
    {pendingDestination && <div className="auth-destination"><span>Đăng nhập xong sẽ bình chọn cho</span><strong>{pendingDestination.name}</strong></div>}
    <div aria-live="assertive" aria-atomic="true">{(error || (step === "phone" && phoneTouched && phoneError)) && <p className="auth-error">{error || phoneError}</p>}</div>
    {step === "phone" && <form className="auth-form" onSubmit={send} noValidate>
      <div>
        <label htmlFor="auth-phone">Số điện thoại</label>
        <div className="auth-input">
          <input
            id="auth-phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="Ví dụ: 0912 345 678"
            value={phone}
            disabled={busy || auth.isLoading}
            aria-invalid={phoneTouched && !!phoneError}
            onChange={event => {
              setPhone(event.target.value);
              setPhoneTouched(true);
              setError("");
            }}
          />
        </div>
      </div>
      <button className="vote-button auth-submit" type="submit" disabled={busy || auth.isLoading}>{busy ? <><LoaderCircle className="animate-spin" size={17} />Đang gửi mã…</> : <>Gửi mã OTP <ArrowRight size={17} /></>}</button>
      {process.env.NODE_ENV === "development" && (
        <button
          className="auth-back"
          type="button"
          disabled={busy || auth.isLoading}
          onClick={() => void loginDemo()}
        >
          <UserRound size={16} aria-hidden="true" /> Đăng nhập bằng tài khoản thử
        </button>
      )}
    </form>}
    {step === "otp" && <form className="auth-form" onSubmit={verify} noValidate>
      <fieldset className="otp-fieldset" disabled={busy}><legend>Mã xác thực 6 chữ số</legend><div className="otp-boxes">{otp.map((digit, index) => <input key={index} ref={element => { inputs.current[index] = element; }} aria-label={`Chữ số OTP ${index + 1}`} inputMode="numeric" autoComplete={index === 0 ? "one-time-code" : "off"} maxLength={6} value={digit} className={digit ? "is-filled" : ""} onChange={event => enterDigits(index, event.target.value)} onFocus={event => event.target.select()} onPaste={event => { event.preventDefault(); const value = event.clipboardData.getData("text").trim(); if (/^\d{1,6}$/.test(value)) enterDigits(index, value); }} onKeyDown={event => { if (event.key === "Backspace" && !digit && index > 0) inputs.current[index - 1]?.focus(); if (event.key === "ArrowLeft" && index > 0) inputs.current[index - 1]?.focus(); if (event.key === "ArrowRight" && index < 5) inputs.current[index + 1]?.focus(); }} autoFocus={index === 0} />)}</div></fieldset>
      {process.env.NODE_ENV !== "production" && <p className="auth-test-hint">Mã thử nghiệm: 123456</p>}
      <div className="otp-resend"><span>Chưa nhận được mã?</span><button type="button" disabled={busy || resendSeconds > 0} onClick={() => void resend()}>{busy ? "Đang xử lý…" : resendSeconds > 0 ? `Gửi lại sau ${resendSeconds}s` : "Gửi lại mã"}</button></div>
      <button className="vote-button auth-submit" type="submit" disabled={busy}>{busy ? <><LoaderCircle className="animate-spin" size={17} />Đang xác nhận…</> : "Xác nhận"}</button>
      <button className="auth-back" type="button" disabled={busy} onClick={() => changeStep("phone")}><ArrowLeft size={15} />Đổi số điện thoại</button>
    </form>}
    {step === "account" && <form className="auth-form" onSubmit={submitAccount} noValidate>
      <div><label htmlFor="auth-username">Tài khoản</label><div className="auth-input"><UserRound size={17} /><input id="auth-username" autoComplete="username" placeholder="Tên tài khoản" value={username} onChange={event => setUsername(event.target.value)} disabled={busy} autoFocus /></div></div>
      <div><label htmlFor="auth-password">Mật khẩu</label><div className="auth-input"><LockKeyhole size={17} /><input id="auth-password" type={showPassword ? "text" : "password"} autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} disabled={busy} /><button type="button" aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"} onClick={() => setShowPassword(value => !value)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></div>
      <button className="vote-button auth-submit" type="submit" disabled={busy}>{busy ? "Đang đăng nhập…" : "Đăng nhập"}</button>
      <button className="auth-back" type="button" disabled={busy} onClick={() => changeStep("phone")}>Đăng nhập bằng số điện thoại</button>
      {process.env.NODE_ENV !== "production" && <details className="auth-demo"><summary>Tài khoản trải nghiệm</summary><p>nongthon2026 / Nongthon2026!</p></details>}
    </form>}
    <p className="auth-demo-note">Mỗi tài khoản có tối đa {DAILY_VOTE_LIMIT} lượt bình chọn mỗi ngày, không cộng dồn.</p>
  </div></div>;
}

export function LoginModal({ standalone = false }: { standalone?: boolean }) {
  const { loginModalOpen } = useAuth();
  return standalone || loginModalOpen ? <LoginPanel standalone={standalone} /> : null;
}
