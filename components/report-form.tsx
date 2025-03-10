"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Egg, Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";

interface MonthData {
  id: string;
  month: string;
  chickens: number;
  feed: number;
}

export default function ReportForm() {
  const [month, setMonth] = useState("");
  const [chickens, setChickens] = useState("");
  const [feed, setFeed] = useState("");
  const [months, setMonths] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Get all months
    const monthNames = Array.from({ length: 12 }, (_, i) => {
      return new Date(0, i).toLocaleString("en-US", { month: "long" });
    });
    setMonths(monthNames);

    // Set current month as default
    const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
    setMonth(currentMonth);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!month || !chickens || !feed) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Create new report
    const newReport: MonthData = {
      id: uuidv4(),
      month,
      chickens: Number.parseInt(chickens),
      feed: Number.parseInt(feed),
    };

    // Get existing data
    const existingData = localStorage.getItem("chickenData");
    const allData: MonthData[] = existingData ? JSON.parse(existingData) : [];

    // Check if month already exists
    const monthIndex = allData.findIndex((data) => data.month === month);

    if (monthIndex >= 0) {
      // Update existing month
      allData[monthIndex] = newReport;
    } else {
      // Add new month
      allData.push(newReport);
    }

    // Save to localStorage
    localStorage.setItem("chickenData", JSON.stringify(allData));

    // Reset form
    setChickens("");
    setFeed("");

    toast({
      title: "Success",
      description: "Report saved successfully",
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="p-4 pt-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants} className="mb-6">
        <h1 className="text-2xl font-bold text-orange-800">Create Report</h1>
        <p className="text-orange-600">
          Enter your chicken and feed data for the month
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="p-4 bg-white border-orange-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="month">Month</Label>
              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger id="month" className="border-orange-200">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="chickens">Number of Chickens</Label>
              <Input
                id="chickens"
                type="number"
                value={chickens}
                onChange={(e) => setChickens(e.target.value)}
                className="border-orange-200"
                placeholder="Enter number of chickens"
                min="1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="feed">Feed Amount (kg)</Label>
              <Input
                id="feed"
                type="number"
                value={feed}
                onChange={(e) => setFeed(e.target.value)}
                className="border-orange-200"
                placeholder="Enter amount of feed in kg"
                min="1"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              <Egg className="mr-2 h-4 w-4" />
              Save Report
            </Button>
          </form>
        </Card>
      </motion.div>
    </motion.div>
  );
}
