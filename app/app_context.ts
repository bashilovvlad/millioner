"use client";

import { createContext } from "react";

interface RewardContextType {
    reward: number;
    setReward: React.Dispatch<number>;
}

export const RewardContext = createContext<RewardContextType>({
    reward: 0,
    setReward: () => { }
});