"use client"

import { motion } from "framer-motion"
import { Home, FileText, History, Settings } from "lucide-react"

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "report", icon: FileText, label: "Report" },
    { id: "history", icon: History, label: "History" },
    { id: "settings", icon: Settings, label: "Settings" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-orange-200 h-16">
      <div className="flex items-center justify-around h-full px-2 relative">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const Icon = tab.icon

          return (
            <button
              key={tab.id}
              className="flex flex-col items-center justify-center w-1/4 h-full relative"
              onClick={() => onTabChange(tab.id)}
            >
              {isActive && (
                <motion.div
                  layoutId="navigation-background"
                  className="absolute inset-0 bg-orange-100 rounded-full w-12 h-12 mx-auto"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
              <div className="flex flex-col items-center justify-center z-10">
                <Icon className={`w-5 h-5 mb-1 ${isActive ? "stroke-orange-800" : "stroke-orange-300"}`} />
                <span className={`text-xs ${isActive ? "text-orange-800" : "text-orange-300"}`}>{tab.label}</span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

