import { VotingProvider } from "@/context/voting-context";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { StatsGrid } from "@/components/stats-grid";
import { Top3Leaderboard } from "@/components/top3";
import { DestinationGrid } from "@/components/destination-grid";
import { HowToVote } from "@/components/how-to-vote";
import { Footer } from "@/components/footer";
import { LoginModal } from "@/components/login-modal";
import { VoteModal } from "@/components/vote-modal";
import { LeaderboardModal } from "@/components/leaderboard-modal";
import { RulesModal } from "@/components/rules-modal";
import { Toast } from "@/components/toast";
import { ScrollProgress } from "@/components/scroll-progress";
import { BackToTop } from "@/components/back-to-top";

export default function Home() {
  return (
    <VotingProvider>
      <div className="relative min-h-screen flex flex-col bg-[#FBF8F0] text-[#1B2B22]">
        {/* 0. Thanh tiến trình cuộn trang siêu mượt */}
        <ScrollProgress />

        {/* 1. Floating Pill-shaped Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1">
          {/* 2. Hero with background landscape slideshow */}
          <Hero />

          {/* 3. Stats Band with checkerboard grid alternating photo tiles and solid green tiles */}
          <StatsGrid />

          {/* 4. Top 3 Leaderboard (Rank 1 highlighted in orange-yellow #F5A623) */}
          <Top3Leaderboard />

          {/* 5. Destination Grid (35 cards có phân trang 8 thẻ/trang) */}
          <DestinationGrid />

          {/* 6. How To Vote (3 steps) */}
          <HowToVote />
        </main>

        {/* 7. Footer: Dark green #1B2B22, logo, links, copyright */}
        <Footer />

        {/* Nút Cuộn về đầu trang (Back to top) */}
        <BackToTop />

        {/* Modals & Interactivity */}
        <LoginModal />
        <VoteModal />
        <LeaderboardModal />
        <RulesModal />
        <Toast />
      </div>
    </VotingProvider>
  );
}
