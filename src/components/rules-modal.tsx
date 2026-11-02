"use client";

import { useEffect, useRef } from "react";
import { BookOpen, CalendarDays, Check, Mail, ShieldCheck, Trophy, X } from "lucide-react";
import { useVoting } from "@/context/voting-context";

export function RulesModal() {
  const { rulesModalOpen, setRulesModalOpen } = useVoting();
  const panel = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!rulesModalOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [rulesModalOpen]);

  if (!rulesModalOpen) return null;
  const close = () => setRulesModalOpen(false);

  return <div className="rules-overlay" onClick={event => { if (event.target === event.currentTarget) close(); }} onKeyDown={event => {
    if (event.key === "Escape") close();
    if (event.key === "Tab") {
      const controls = panel.current?.querySelectorAll<HTMLElement>('button, a[href]');
      const first = controls?.[0]; const last = controls?.[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  }}>
    <div ref={panel} className="rules-panel" role="dialog" aria-modal="true" aria-labelledby="rules-title" aria-describedby="rules-description">
      <header className="rules-header">
        <span className="rules-header-icon"><BookOpen size={24} strokeWidth={1.6} /></span>
        <div><p>DU LỊCH NÔNG THÔN 2026</p><h2 id="rules-title">Thể lệ bình chọn</h2><span id="rules-description">Những điều cần biết trước khi gửi lá phiếu.</span></div>
        <button ref={closeButton} className="rules-close" onClick={close} aria-label="Đóng thể lệ"><X size={21} /></button>
      </header>
      <div className="rules-content">
        <div className="rules-summary"><div><strong>03</strong><span>Lượt / tài khoản</span></div><div><strong>01</strong><span>Lần / điểm đến</span></div><div><strong>35</strong><span>Điểm đến đề cử</span></div></div>
        <section className="rules-block"><h3><CalendarDays size={19} /><span>Thời gian bình chọn</span><small>01</small></h3><div className="rules-dates"><div><span>Bắt đầu</span><time dateTime="2026-10-15T00:00:00+07:00">15.10.2026 <small>· 00:00</small></time></div><div><span>Kết thúc</span><time dateTime="2026-11-20T23:59:00+07:00">20.11.2026 <small>· 23:59</small></time></div></div><p>Kết quả được công bố tại Lễ trao giải Du lịch Nông thôn Việt Nam.</p></section>
        <section className="rules-block"><h3><ShieldCheck size={19} /><span>Bình chọn như thế nào?</span><small>02</small></h3><ul className="rules-checklist">
          <li><Check size={16} /><span>Đăng nhập bằng số điện thoại chính chủ tại Việt Nam và xác thực mã OTP.</span></li>
          <li><Check size={16} /><span>Mỗi số điện thoại có <strong>tối đa 3 lượt bình chọn</strong> trong toàn bộ cuộc thi.</span></li>
          <li><Check size={16} /><span>Mỗi điểm đến chỉ được bình chọn <strong>1 lần</strong>. Bạn có thể chọn tối đa 3 điểm đến khác nhau.</span></li>
          <li><Check size={16} /><span>Sau khi xác nhận, lá phiếu <strong>không thể thay đổi hoặc thu hồi</strong>. Hãy kiểm tra điểm đến trước khi gửi.</span></li>
        </ul></section>
        <section className="rules-block"><h3><Trophy size={19} /><span>Giải thưởng & tôn vinh</span><small>03</small></h3><div className="rules-awards">
          <article><span>QUÁN QUÂN</span><h4>Top 1</h4><p>Bằng khen Bộ NN&PTNT và cúp vàng danh dự.</p></article>
          <article><span>ẤN TƯỢNG</span><h4>Top 2 & 3</h4><p>Kỷ niệm chương và gói truyền thông du lịch.</p></article>
          <article><span>KHUYẾN KHÍCH</span><h4>Top 10</h4><p>Chứng nhận Điểm đến Nông thôn Xanh 2026.</p></article>
        </div></section>
        <section className="rules-fairness"><ShieldCheck size={20} /><div><h3>Bình chọn công bằng</h3><p>Không sử dụng bot hoặc công cụ tự động để bình chọn. Lượt bình chọn gian lận sẽ bị loại bỏ. Quyết định cuối cùng thuộc về Hội đồng Giám khảo và Ban Tổ chức.</p></div></section>
        <div className="rules-support"><Mail size={18} /><div><span>Cần hỗ trợ? Liên hệ Ban Thư ký cuộc thi.</span><a href="mailto:bantochuc@dulichnongthon.vn">bantochuc@dulichnongthon.vn</a></div></div>
      </div>
      <footer className="rules-footer"><button onClick={close}>Đã hiểu thể lệ <Check size={17} /></button></footer>
    </div>
  </div>;
}
