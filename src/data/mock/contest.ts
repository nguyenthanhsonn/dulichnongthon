import { destinations } from "./destinations";
import { regions } from "./regions";
import { sumVotes } from "./votes";

export const contest = {
  name: "Cuộc thi Du lịch Nông thôn 2026",
  startsAt: "2026-11-07T00:00:00+07:00",
  endsAt: "2026-11-21T00:00:00+07:00",
  timezone: "Asia/Ho_Chi_Minh",
  maxVotesPerAccount: 3,
  maxVotesPerDestination: 1,
  storageKeys: { session: "dlnt2026:session", votes: "dlnt2026:votes" },
  rules: [
    "Mỗi tài khoản có tối đa 3 lượt bình chọn trong toàn bộ cuộc thi.",
    "Mỗi điểm đến chỉ được bình chọn một lần bởi cùng tài khoản.",
    "Kiểm tra điểm đến trước khi xác nhận bình chọn.",
  ],
  source: {
    title: "Phụ lục 02 – Kết quả tổng hợp thông tin sơ bộ 35 điểm đến có hồ sơ hợp lệ",
    date: "2026-10-27",
    url: "https://docs.google.com/document/d/11gw7XpG78qNzzGM5q1OIpAfIGvjsn6j2/edit",
  },
} as const;

export const contestStats = {
  destinationCount: destinations.length,
  regionCount: regions.length,
  totalVotes: sumVotes(),
};

export function getVotingStatus(now = Date.now()) {
  if (now < Date.parse(contest.startsAt)) return "upcoming";
  if (now >= Date.parse(contest.endsAt)) return "closed";
  return "open";
}
