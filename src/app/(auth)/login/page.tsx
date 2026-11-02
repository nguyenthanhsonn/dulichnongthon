import { LoginModal } from "@/components/login-modal";
import { VotingProvider } from "@/context/voting-context";

export default function LoginPage() {
  return <VotingProvider><LoginModal standalone /></VotingProvider>;
}
