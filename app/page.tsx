"use client"

import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import Onboarding from "@/components/onboarding"
import Navigation from "@/components/navigation"
import HomePage from "@/components/home-page"
import ReportForm from "@/components/report-form"
import History from "@/components/history"
import Settings from "@/components/settings"

export default function App() {
  const [activeTab, setActiveTab] = useState("home")
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingCompleted = localStorage.getItem("onboardingCompleted")
    if (onboardingCompleted === "true") {
      setShowOnboarding(false)
    }
    setIsLoaded(true)
  }, [])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const completeOnboarding = () => {
    localStorage.setItem("onboardingCompleted", "true")
    setShowOnboarding(false)
  }

  if (!isLoaded) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="flex flex-col h-screen bg-orange-50">
      <AnimatePresence>
        {showOnboarding ? (
          <Onboarding onComplete={completeOnboarding} />
        ) : (
          <div className="flex flex-col h-full">
            <main className="flex-1 overflow-y-auto pb-16">
              {activeTab === "home" && <HomePage />}
              {activeTab === "report" && <ReportForm />}
              {activeTab === "history" && <History />}
              {activeTab === "settings" && <Settings />}
            </main>
            <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

