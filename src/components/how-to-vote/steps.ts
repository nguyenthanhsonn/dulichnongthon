import type { VotingStep } from "@/types/how-to-vote";

export const STEPS: VotingStep[] = [
  {
    step: 1,
    title: "Xem thông tin & video giới thiệu",
    desc: "Theo dõi bài đăng, hình ảnh và video giới thiệu 35 điểm đến trên Fanpage Facebook và kênh TikTok chính thức của Hội thi.",
    note: "Khám phá nét đẹp làng quê",
  },
  {
    step: 2,
    title: "Truy cập Landing Page",
    desc: "Quét mã QR tại các ấn phẩm truyền thông hoặc truy cập liên kết chính thức để vào cổng bình chọn trực tuyến.",
    note: "Cổng bình chọn duy nhất",
  },
  {
    step: 3,
    title: "Xác thực số điện thoại qua OTP",
    desc: "Nhập số điện thoại để nhận mã xác thực OTP 6 số qua tin nhắn hoàn toàn miễn phí và bảo mật tuyệt đối.",
    note: "01 tài khoản • Tối đa 3 lượt vote",
  },
  {
    step: 4,
    title: "Chọn mã dự thi & nhấn \"BÌNH CHỌN\"",
    desc: "Tìm kiếm điểm đến theo mã số (DLNT01, DLNT02...) hoặc theo tên, bấm nút 'Bình chọn' và xác nhận lá phiếu của bạn.",
    note: "Mỗi điểm đến chỉ chọn 01 lần",
    highlight: true,
  },
  {
    step: 5,
    title: "Tiếp tục bình chọn điểm đến khác",
    desc: "Sử dụng các lượt bình chọn còn lại trong tài khoản (tối đa 3 điểm đến khác nhau trong suốt thời gian diễn ra Hội thi).",
    note: "Lượt vote không được hoàn tác",
  },
];
