"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { Eye, EyeOff, LogOut, MapPin, User, X } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthProvider";
import { DAILY_VOTE_LIMIT } from "@/lib/auth/config";
import { destinations } from "@/data/mock";
import { useCountdown } from "@/hooks/useCountdown";

export function AccountMenu() {
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const [revealPhone, setRevealPhone] = useState(false);
  const [position, setPosition] = useState({ top: 88, right: 16 });
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const { h, m, s } = useCountdown(auth.resetAt);
  const close = (restoreFocus = false) => { setOpen(false); if (restoreFocus) trigger.current?.focus(); };
  useEffect(() => {
    if (!open) return;
    const focus = requestAnimationFrame(() => panel.current?.querySelector<HTMLButtonElement>("button")?.focus());
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !panel.current?.contains(event.target) && !trigger.current?.contains(event.target)) setOpen(false);
    };
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); setOpen(false); trigger.current?.focus(); }
      if (event.key === "Tab") {
        const controls = panel.current?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)");
        const first = controls?.[0]; const last = controls?.[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    const onNavigate = () => setOpen(false);
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", keydown);
    window.addEventListener("resize", onNavigate);
    window.addEventListener("popstate", onNavigate);
    window.addEventListener("hashchange", onNavigate);
    const mobile = window.matchMedia("(max-width: 639px)").matches;
    const previousOverflow = document.body.style.overflow;
    if (mobile) document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(focus);
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", keydown);
      window.removeEventListener("resize", onNavigate);
      window.removeEventListener("popstate", onNavigate);
      window.removeEventListener("hashchange", onNavigate);
      if (mobile) document.body.style.overflow = previousOverflow;
    };
  }, [open]);
  if (!auth.user) return null;
  const masked = `${auth.user.phone.slice(0, 4)} *** ${auth.user.phone.slice(-3)}`;
  const toggle = () => {
    if (!open && trigger.current) { const box = trigger.current.getBoundingClientRect(); setPosition({ top: box.bottom + 12, right: Math.max(16, window.innerWidth - box.right) }); }
    setOpen(value => !value);
  };
  return <>
    <button ref={trigger} className="account-trigger" onClick={toggle} aria-label={`Tài khoản, còn ${auth.votesLeftToday} lượt hôm nay`} aria-haspopup="dialog" aria-expanded={open} aria-controls={open ? "account-panel" : undefined}><User size={21} /><span className={auth.votesLeftToday === 0 ? "account-badge is-empty" : "account-badge"}>{auth.votesLeftToday}</span></button>
    {open && createPortal(<div className="account-layer"><div ref={panel} id="account-panel" className="account-panel" style={{ "--account-top": `${position.top}px`, "--account-right": `${position.right}px` } as CSSProperties} role="dialog" aria-labelledby="account-title">
      <div className="account-sheet-handle" aria-hidden="true" />
      <div className="account-heading"><div><p>Tài khoản của bạn</p><h2 id="account-title">Cùng tiếp sức miền quê</h2></div><button onClick={() => close(true)} aria-label="Đóng tài khoản"><X size={18} /></button></div>
      <div className="account-phone"><span>{revealPhone ? auth.user.phone : masked}</span><button onClick={() => setRevealPhone(value => !value)} aria-label={revealPhone ? "Ẩn số điện thoại" : "Hiện số điện thoại"}>{revealPhone ? <EyeOff size={17} /> : <Eye size={17} />}</button></div>
      <div className="account-votes"><div><span>Lượt bình chọn hôm nay</span><strong>{auth.votesUsedToday}/{DAILY_VOTE_LIMIT}</strong></div><div className="account-progress" aria-label={`Đã dùng ${auth.votesUsedToday} trên ${DAILY_VOTE_LIMIT} lượt`}>{Array.from({ length: DAILY_VOTE_LIMIT }, (_, index) => <span key={index} className={index < auth.votesUsedToday ? "is-used" : ""} />)}</div><p>Còn lại: <strong>{auth.votesLeftToday} lượt</strong></p></div>
      <div className="account-reset"><span>Lượt bình chọn làm mới sau</span><strong aria-label={`${h} giờ ${m} phút ${s} giây`}>{h}:{m}:{s}</strong><small>Lượt chưa dùng không được cộng dồn sang ngày sau.</small></div>
      <div className="account-destinations"><h3>Đã bình chọn hôm nay</h3>{auth.votedIdsToday.length ? <ul>{auth.votedIdsToday.slice(0, DAILY_VOTE_LIMIT).map(id => <li key={id}><MapPin size={13} /><span>{destinations.find(destination => destination.id === id)?.name ?? id}</span></li>)}</ul> : <p>Bạn chưa bình chọn điểm đến nào hôm nay.</p>}</div>
      <button className="account-logout" onClick={() => void auth.logout()}><LogOut size={16} />Đăng xuất</button>
    </div></div>, document.body)}
  </>;
}
