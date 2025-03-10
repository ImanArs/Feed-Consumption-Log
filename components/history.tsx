"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Egg, Package, Calendar, Edit2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MonthData {
  id: string;
  month: string;
  chickens: number;
  feed: number;
}

export default function History() {
  const [monthlyData, setMonthlyData] = useState<MonthData[]>([]);
  const [editingData, setEditingData] = useState<MonthData | null>(null);
  const [chickens, setChickens] = useState("");
  const [feed, setFeed] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load data from localStorage
    const storedData = localStorage.getItem("chickenData");
    if (storedData) {
      setMonthlyData(JSON.parse(storedData));
    }
  }, []);

  const calculateFeedNeeded = (chickens: number) => {
    // Assuming each chicken needs 3kg of feed per month
    return chickens * 3;
  };

  const calculateFeedStatus = (data: MonthData) => {
    const feedNeeded = calculateFeedNeeded(data.chickens);
    const difference = data.feed - feedNeeded;

    return {
      needMore: difference < 0,
      amount: Math.abs(difference),
    };
  };

  const handleEdit = (data: MonthData) => {
    setEditingData(data);
    setChickens(data.chickens.toString());
    setFeed(data.feed.toString());
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!editingData || !chickens || !feed) return;

    const updatedData = {
      ...editingData,
      chickens: Number.parseInt(chickens),
      feed: Number.parseInt(feed),
    };

    // Update data in state
    const newData = monthlyData.map((item) =>
      item.id === updatedData.id ? updatedData : item
    );

    setMonthlyData(newData);

    // Save to localStorage
    localStorage.setItem("chickenData", JSON.stringify(newData));

    setDialogOpen(false);
    toast({
      title: "Success",
      description: "Data updated successfully",
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
        <h1 className="text-2xl font-bold text-orange-800">History</h1>
        <p className="text-orange-600">View and edit your past reports</p>
      </motion.div>

      <motion.div variants={containerVariants} className="space-y-4">
        {monthlyData.length === 0 ? (
          <motion.div variants={itemVariants} className="text-center py-10">
            <p className="text-orange-600">No history available</p>
          </motion.div>
        ) : (
          monthlyData.reverse().map((data, index) => {
            const feedStatus = calculateFeedStatus(data);

            return (
              <motion.div key={data.id} variants={itemVariants}>
                <Card className="p-4 bg-white border-orange-200">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-orange-800 mr-2" />
                      <h3 className="font-semibold text-orange-800">
                        {data.month}
                      </h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleEdit(data)}
                    >
                      <Edit2 className="h-4 w-4 text-orange-600" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-2">
                        <Egg className="w-4 h-4 text-orange-800" />
                      </div>
                      <span className="text-orange-700">
                        {data.chickens} chickens
                      </span>
                    </div>

                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-2">
                        <Package className="w-4 h-4 text-orange-800" />
                      </div>
                      <span className="text-orange-700">
                        {data.feed}kg feed
                      </span>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-2 rounded text-sm">
                    <p className="text-orange-700">
                      {feedStatus.needMore
                        ? `Needed ${feedStatus.amount}kg more feed`
                        : `Had ${feedStatus.amount}kg feed left over`}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })
        )}
      </motion.div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Report</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-chickens">Number of Chickens</Label>
              <Input
                id="edit-chickens"
                type="number"
                value={chickens}
                onChange={(e) => setChickens(e.target.value)}
                className="border-orange-200"
                min="1"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-feed">Feed Amount (kg)</Label>
              <Input
                id="edit-feed"
                type="number"
                value={feed}
                onChange={(e) => setFeed(e.target.value)}
                className="border-orange-200"
                min="1"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
