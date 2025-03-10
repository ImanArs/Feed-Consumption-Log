"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Egg, AlertTriangle, Check } from "lucide-react"
import { useRouter } from "next/navigation"

interface MonthData {
  id: string
  month: string
  chickens: number
  feed: number
}

export default function HomePage() {
  const [monthlyData, setMonthlyData] = useState<MonthData[]>([])
  const [currentMonth, setCurrentMonth] = useState("")
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Get current month
    const date = new Date()
    const month = date.toLocaleString("default", { month: "long" })
    setCurrentMonth(month)

    // Load data from localStorage
    const storedData = localStorage.getItem("chickenData")
    if (storedData) {
      setMonthlyData(JSON.parse(storedData))
    }
    setLoading(false)
  }, [])

  const getCurrentMonthData = () => {
    return monthlyData.find((data) => data.month === currentMonth)
  }

  const calculateFeedNeeded = (chickens: number) => {
    // Assuming each chicken needs 3kg of feed per month
    return chickens * 3
  }

  const calculateFeedStatus = (data: MonthData | undefined) => {
    if (!data) return { needMore: false, amount: 0 }

    const feedNeeded = calculateFeedNeeded(data.chickens)
    const difference = data.feed - feedNeeded

    return {
      needMore: difference < 0,
      amount: Math.abs(difference),
    }
  }

  const currentData = getCurrentMonthData()
  const feedStatus = calculateFeedStatus(currentData)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>
  }

  return (
    <motion.div className="p-4 pt-8" variants={containerVariants} initial="hidden" animate="show">
      <motion.div variants={itemVariants} className="flex items-center mb-6">
        <div className="bg-orange-100 rounded-full p-3 mr-3">
          <Egg className="w-6 h-6 text-orange-800" />
        </div>
        <h1 className="text-2xl font-bold text-orange-800">Feed Consumption Log</h1>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="p-4 mb-6 bg-white border-orange-200">
          <h2 className="text-lg font-semibold text-orange-800 mb-2">{currentMonth} Feed Status</h2>

          {!currentData ? (
            <p className="text-orange-600">No data for current month. Please add a report.</p>
          ) : (
            <>
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-2">
                  {feedStatus.needMore ? (
                    <AlertTriangle className="w-4 h-4 text-orange-800" />
                  ) : (
                    <Check className="w-4 h-4 text-green-600" />
                  )}
                </div>
                <p className="text-orange-700">
                  {feedStatus.needMore
                    ? `You need ${feedStatus.amount}kg more feed this month`
                    : `You'll have ${feedStatus.amount}kg feed left over`}
                </p>
              </div>

              <div className="bg-orange-50 p-3 rounded-md">
                <p className="text-sm text-orange-700">
                  <span className="font-semibold">{currentData.chickens} chickens</span> require approximately{" "}
                  <span className="font-semibold">{calculateFeedNeeded(currentData.chickens)}kg</span> of feed per month
                </p>
              </div>
            </>
          )}
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="mb-4">
        <h2 className="text-lg font-semibold text-orange-800 mb-3 flex justify-between items-center">
          <span>Monthly Chicken Count</span>
          <Button
            variant="outline"
            size="sm"
            className="text-xs border-orange-300 text-orange-700"
            onClick={() => router.push("/history")}
          >
            History
          </Button>
        </h2>

        <div className="bg-white p-4 rounded-lg border border-orange-200">
          {monthlyData.length === 0 ? (
            <p className="text-orange-600 text-center py-6">No data available</p>
          ) : (
            <div className="flex items-end justify-around h-40">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="bg-orange-400 w-12 rounded-t-md"
                    style={{
                      height: `${Math.min(data.chickens * 3, 100)}px`,
                    }}
                  />
                  <p className="text-xs text-orange-800 mt-1">{data.month.substring(0, 3)}</p>
                  <p className="text-xs font-semibold text-orange-900">{data.chickens}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

