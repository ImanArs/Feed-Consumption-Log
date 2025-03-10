"use client"

import React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Egg, ChevronRight, Calculator, BarChart3 } from "lucide-react"

interface OnboardingProps {
  onComplete: () => void
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0)

  const steps = [
    {
      icon: Egg,
      title: "Track Your Chickens",
      description: "Enter the number of chickens and how much feed you have for the month.",
    },
    {
      icon: Calculator,
      title: "Get Feed Reports",
      description: "Find out if you need to buy more feed or how much will be left over.",
    },
    {
      icon: BarChart3,
      title: "Ready to Start?",
      description: "Begin tracking your chicken feed consumption now!",
    },
  ]

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1)
    } else {
      onComplete()
    }
  }

  return (
    <div className="fixed inset-0 bg-orange-50 flex items-center justify-center z-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center p-6 max-w-md"
        >
          <motion.div
            className="relative mb-8"
            animate={{ scale: [0.9, 1, 0.9] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              ease: "easeInOut",
            }}
          >
            <div className="absolute inset-0 bg-orange-200 rounded-full opacity-30 scale-110" />
            <div className="bg-orange-100 rounded-full p-6 relative">
              {React.createElement(steps[step].icon, {
                className: "w-16 h-16 text-orange-800",
              })}
            </div>
          </motion.div>

          <h2 className="text-2xl font-bold text-orange-800 mb-4 text-center">{steps[step].title}</h2>
          <p className="text-orange-700 mb-8 text-center">{steps[step].description}</p>

          <Button onClick={handleNext} className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-full">
            {step === 2 ? "Get Started" : "Next"}
            {step !== 2 && <ChevronRight className="ml-2 w-4 h-4" />}
          </Button>

          {step === 2 && <p className="text-orange-500 mt-4 text-sm">You won't see this introduction again</p>}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

