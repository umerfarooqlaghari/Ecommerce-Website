"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { Settings, ArrowLeft, User, Bell, Shield, CreditCard } from 'lucide-react'

export default function SettingsPage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center py-16">
            <Settings className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Sign in to access settings</h1>
            <p className="text-muted-foreground mb-8">
              You need to be signed in to manage your account settings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signin">
                <Button size="lg">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="lg" variant="outline">Create Account</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const settingsOptions = [
    {
      icon: User,
      title: 'Profile Information',
      description: 'Update your personal information and preferences',
      action: 'Edit Profile'
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Manage your email and push notification preferences',
      action: 'Manage Notifications'
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Change password and manage security settings',
      action: 'Security Settings'
    },
    {
      icon: CreditCard,
      title: 'Payment Methods',
      description: 'Add or remove payment methods and billing information',
      action: 'Manage Payments'
    }
  ]

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/profile" className="flex items-center text-muted-foreground hover:text-foreground transition-colors mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
            <p className="text-muted-foreground">
              Manage your account preferences and security settings
            </p>
          </motion.div>

          <div className="grid gap-6">
            {settingsOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-lg border shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                        <option.icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{option.title}</h3>
                      <p className="text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                  <Button variant="outline">
                    {option.action}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Account Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-card rounded-lg border shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold mb-4 text-red-600">Danger Zone</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-red-600">Delete Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <Button variant="destructive" size="sm">
                  Delete Account
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
