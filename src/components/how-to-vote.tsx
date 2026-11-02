"use client";
import { ArrowUpRight, CheckCheck, MousePointer2, Smartphone } from "lucide-react";
import { useVoting } from "@/context/voting-context";
import { RevealOnScroll } from "./reveal-on-scroll";
const steps = [
  { icon: Smartphone, title: "Đăng nhập để bắt đầu", text: "Sử dụng số điện thoại và nhập mã OTP 6 chữ số để xác thực tài khoản.", note: "01 tài khoản · 03 lượt bình chọn" },
  { icon: MousePointer2, title: "Chọn miền quê bạn yêu", text: "Khám phá 35 đề cử và chọn tối đa 3 điểm đến khác nhau mà bạn muốn ủng hộ.", note: "Mỗi điểm đến chỉ chọn một lần" },
  { icon: CheckCheck, title: "Gửi trọn sự ủng hộ", text: "Kiểm tra điểm đến, xác nhận bình chọn và theo dõi thay đổi trên bảng xếp hạng.", note: "Xác nhận trước khi ghi nhận lượt chọn" },
];
export function HowToVote() {
  const { user, setLoginModalOpen, setRulesModalOpen } = useVoting();
  return <section id="how-to-vote" className="how-section"><div className="site-container how-layout">
    <RevealOnScroll className="how-intro"><p className="eyebrow">CÁCH THỨC THAM GIA</p><h2>Ba bước nhỏ.<br /><em>Tiếp sức miền quê.</em></h2><p>Bạn có 3 lượt bình chọn để gửi gắm tình yêu tới những điểm đến nông thôn Việt Nam.</p><div className="how-actions">{user ? <a className="vote-button" href="#destinations">Chọn điểm đến <ArrowUpRight size={18} /></a> : <button className="vote-button" onClick={() => setLoginModalOpen(true)}>Đăng nhập tham gia <ArrowUpRight size={18} /></button>}<button className="text-link" onClick={() => setRulesModalOpen(true)}>Đọc thể lệ cuộc thi <ArrowUpRight size={16} /></button></div></RevealOnScroll>
    <div className="steps-list">{steps.map((step, index) => <RevealOnScroll key={step.title} delay={index * 100}><article className="vote-step"><span className="step-number">0{index + 1}</span><div><div className="step-heading"><h3>{step.title}</h3><step.icon size={24} strokeWidth={1.5} /></div><p>{step.text}</p><small>{step.note}</small></div></article></RevealOnScroll>)}</div>
  </div></section>;
}
