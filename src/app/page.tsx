import { PageBackground } from "@/components/page-background";
import { SectionDivider } from "@/components/section-divider";
import { AnimationProvider } from "@/components/animation-provider";
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
      <AnimationProvider />
      <div className="page-shell relative isolate min-h-screen flex flex-col text-[#1B2B22]">
        <PageBackground />
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">
          <Hero />
          <StatsGrid />
          <SectionDivider fill="var(--bg-sage)" className="divider-to-sage" />
          <Top3Leaderboard />
          <SectionDivider fill="var(--bg-base)" className="divider-to-base" />
          <DestinationGrid />
          <SectionDivider fill="var(--bg-sky)" className="divider-to-sky" />
          <HowToVote />
        </main>
        <SectionDivider fill="var(--bg-deep)" className="divider-to-deep" />
        <Footer />
        <BackToTop />
        <LoginModal />
        <VoteModal />
        <LeaderboardModal />
        <RulesModal />
        <Toast />
      </div>
    </VotingProvider>
  );
}
