"use client";

import React, { createContext, useContext, useState } from "react";
import { Destination, MOCK_DESTINATIONS } from "@/data/destinations";

export interface UserState {
  phone: string;
  votesRemaining: number;
  votedIds: string[];
}

interface VotingContextType {
  user: UserState | null;
  destinations: Destination[];
  loginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
  voteModalDestination: Destination | null;
  setVoteModalDestination: (destination: Destination | null) => void;
  leaderboardModalOpen: boolean;
  setLeaderboardModalOpen: (open: boolean) => void;
  rulesModalOpen: boolean;
  setRulesModalOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  loginUser: (phone: string) => void;
  logoutUser: () => void;
  confirmVote: (destinationId: string) => boolean;
  handleVoteClick: (destination: Destination) => void;
  totalVotes: number;
}

const VotingContext = createContext<VotingContextType | undefined>(undefined);

const STORAGE_KEY_USER = "dulichnongthon_user";
const STORAGE_KEY_DESTINATIONS = "dulichnongthon_destinations";

export function VotingProvider({ children }: { children: React.ReactNode }) {
  // Lazy initial state for SSR & local storage compatibility
  const [user, setUser] = useState<UserState | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY_USER);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [destinations, setDestinations] = useState<Destination[]>(() => {
    if (typeof window === "undefined") return MOCK_DESTINATIONS;
    try {
      const savedDestinations = localStorage.getItem(STORAGE_KEY_DESTINATIONS);
      return savedDestinations ? JSON.parse(savedDestinations) : MOCK_DESTINATIONS;
    } catch {
      return MOCK_DESTINATIONS;
    }
  });

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [voteModalDestination, setVoteModalDestination] = useState<Destination | null>(null);
  const [leaderboardModalOpen, setLeaderboardModalOpen] = useState(false);
  const [rulesModalOpen, setRulesModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const loginUser = (phone: string) => {
    const newUser: UserState = {
      phone,
      votesRemaining: 3,
      votedIds: [],
    };
    setUser(newUser);
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
    } catch {
      // Ignored
    }
    setLoginModalOpen(false);
    showToast(`Đăng nhập thành công với số điện thoại ${phone}! Bạn có 3 lượt bình chọn.`);
  };

  const logoutUser = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY_USER);
    } catch {
      // Ignored
    }
    showToast("Đã đăng xuất khỏi hệ thống.");
  };

  const handleVoteClick = (destination: Destination) => {
    if (!user) {
      setVoteModalDestination(destination);
      setLoginModalOpen(true);
      return;
    }

    if (user.votedIds.includes(destination.id)) {
      showToast(`Bạn đã bình chọn cho "${destination.name}" rồi.`);
      return;
    }

    if (user.votesRemaining <= 0) {
      showToast("Bạn đã sử dụng hết 3/3 lượt bình chọn. Cảm ơn bạn đã tham gia!");
      return;
    }

    setVoteModalDestination(destination);
  };

  const confirmVote = (destinationId: string): boolean => {
    if (!user || user.votesRemaining <= 0 || user.votedIds.includes(destinationId)) {
      return false;
    }

    const updatedDestinations = destinations.map((item) => {
      if (item.id === destinationId) {
        return { ...item, votes: item.votes + 1 };
      }
      return item;
    });

    const updatedUser: UserState = {
      ...user,
      votesRemaining: user.votesRemaining - 1,
      votedIds: [...user.votedIds, destinationId],
    };

    setDestinations(updatedDestinations);
    setUser(updatedUser);

    try {
      localStorage.setItem(STORAGE_KEY_DESTINATIONS, JSON.stringify(updatedDestinations));
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updatedUser));
    } catch {
      // Ignored
    }

    const dest = destinations.find((d) => d.id === destinationId);
    setVoteModalDestination(null);
    showToast(`Bình chọn thành công cho "${dest?.name || 'điểm đến'}"! Bạn còn ${updatedUser.votesRemaining} lượt.`);
    return true;
  };

  const totalVotes = destinations.reduce((sum, d) => sum + d.votes, 0);

  return (
    <VotingContext.Provider
      value={{
        user,
        destinations,
        loginModalOpen,
        setLoginModalOpen,
        voteModalDestination,
        setVoteModalDestination,
        leaderboardModalOpen,
        setLeaderboardModalOpen,
        rulesModalOpen,
        setRulesModalOpen,
        toastMessage,
        showToast,
        loginUser,
        logoutUser,
        confirmVote,
        handleVoteClick,
        totalVotes,
      }}
    >
      {children}
    </VotingContext.Provider>
  );
}

export function useVoting() {
  const context = useContext(VotingContext);
  if (!context) {
    throw new Error("useVoting must be used within a VotingProvider");
  }
  return context;
}
