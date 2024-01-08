"use client"
import { create } from 'zustand';

interface CurrentTabProps {
    currentTab: string
    setCurrentTab: (tab: string) => void
  }

  
export const useCurrentTabStore = create<CurrentTabProps>((set) => ({
    currentTab: 'data-diri',
    setCurrentTab: (tab) => set({ currentTab: tab }),
}));