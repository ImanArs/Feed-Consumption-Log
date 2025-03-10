"use client"

import React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Shield, FileText, HelpCircle, ChevronRight } from "lucide-react"

export default function Settings() {
  const [dialogContent, setDialogContent] = useState<{
    title: string
    content: string
  } | null>(null)

  const settingsItems = [
    {
      id: "privacy",
      icon: Shield,
      title: "Privacy Policy",
      content: `
        # Privacy Policy
        
        ## Introduction
        This Privacy Policy outlines how Feed Consumption Log collects, uses, and protects your information.
        
        ## Data Collection
        We only store data locally on your device using localStorage. We do not collect or transmit any personal information to external servers.
        
        ## Data Usage
        The data you enter is used solely to calculate feed consumption and provide you with relevant information about your chicken feed needs.
        
        ## Data Security
        Since all data is stored locally on your device, you have complete control over your information.
      `,
    },
    {
      id: "terms",
      icon: FileText,
      title: "Terms of Use",
      content: `
        # Terms of Use
        
        ## Acceptance of Terms
        By using Feed Consumption Log, you agree to these Terms of Use.
        
        ## App Usage
        This app is designed to help track chicken feed consumption. The calculations provided are estimates and should be used as a guide only.
        
        ## Limitations
        We are not responsible for any decisions made based on the information provided by this app.
        
        ## Changes to Terms
        We reserve the right to modify these terms at any time.
      `,
    },
    {
      id: "support",
      icon: HelpCircle,
      title: "Support",
      content: `
        # Support
        
        ## Contact
        For support inquiries, please contact us at support@feedconsumptionlog.com
        
        ## FAQ
        
        ### How is feed consumption calculated?
        We use an average estimate of 3kg of feed per chicken per month.
        
        ### Can I export my data?
        Currently, data export is not supported, but we're working on adding this feature.
        
        ### Is my data backed up?
        Data is stored in your browser's localStorage. If you clear your browser data, your information will be lost.
      `,
    },
  ]

  const openDialog = (item: (typeof settingsItems)[0]) => {
    setDialogContent({
      title: item.title,
      content: item.content,
    })
  }

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

  return (
    <motion.div className="p-4 pt-8" variants={containerVariants} initial="hidden" animate="show">
      <motion.div variants={itemVariants} className="mb-6">
        <h1 className="text-2xl font-bold text-orange-800">Settings</h1>
        <p className="text-orange-600">App information and support</p>
      </motion.div>

      <motion.div variants={containerVariants} className="space-y-4">
        {settingsItems.map((item) => (
          <motion.div key={item.id} variants={itemVariants}>
            <Card
              className="p-4 bg-white border-orange-200 flex items-center justify-between cursor-pointer"
              onClick={() => openDialog(item)}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                  {React.createElement(item.icon, {
                    className: "w-5 h-5 text-orange-800",
                  })}
                </div>
                <span className="font-medium text-orange-800">{item.title}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-orange-400" />
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <Dialog open={!!dialogContent} onOpenChange={() => setDialogContent(null)}>
        <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{dialogContent?.title}</DialogTitle>
          </DialogHeader>
          <div className="py-4 whitespace-pre-line">{dialogContent?.content}</div>
          <div className="flex justify-end">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={() => setDialogContent(null)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

