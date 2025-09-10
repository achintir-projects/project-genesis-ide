'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Smartphone, Globe, Zap, Star, Download, Play, Eye } from "lucide-react"
import Link from "next/link"

interface TemplateApp {
  id: string
  name: string
  category: string
  description: string
  longDescription: string
  features: string[]
  platforms: ('android' | 'ios' | 'web')[]
  screenshots: string[]
  rating: number
  downloads: number
  buildTime: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
}

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateApp | null>(null)

  const templateApps: TemplateApp[] = [
    {
      id: 'crypto-wallet',
      name: 'CryptoWallet Pro',
      category: 'finance',
      description: 'Secure cryptocurrency wallet with multi-chain support',
      longDescription: 'A comprehensive cryptocurrency wallet application supporting Bitcoin, Ethereum, and other major cryptocurrencies. Features include secure transactions, portfolio tracking, QR code scanning, and real-time price updates.',
      features: [
        'Multi-chain Support',
        'QR Code Scanner',
        'Portfolio Tracking',
        'Real-time Prices',
        'Push Notifications',
        'Biometric Security',
        'Transaction History',
        'Address Book'
      ],
      platforms: ['android', 'ios', 'web'],
      screenshots: ['wallet-home', 'wallet-send', 'wallet-receive'],
      rating: 4.8,
      downloads: 15420,
      buildTime: '3-5 minutes',
      difficulty: 'intermediate',
      tags: ['crypto', 'finance', 'blockchain', 'security']
    },
    {
      id: 'social-media',
      name: 'SocialConnect',
      category: 'social',
      description: 'Complete social media platform with messaging',
      longDescription: 'A full-featured social media application with user profiles, posts, stories, real-time messaging, notifications, and content sharing capabilities. Built with modern UI/UX principles and scalable architecture.',
      features: [
        'User Profiles',
        'Photo/Video Posts',
        'Real-time Messaging',
        'Push Notifications',
        'Stories',
        'Comments & Likes',
        'Content Sharing',
        'Privacy Settings'
      ],
      platforms: ['android', 'ios'],
      screenshots: ['social-feed', 'social-profile', 'social-chat'],
      rating: 4.6,
      downloads: 23150,
      buildTime: '5-7 minutes',
      difficulty: 'advanced',
      tags: ['social', 'messaging', 'media', 'community']
    },
    {
      id: 'ecommerce-store',
      name: 'ShopEasy',
      category: 'ecommerce',
      description: 'Full-featured e-commerce mobile application',
      longDescription: 'A complete e-commerce solution with product catalog, shopping cart, secure payments, order tracking, and user management. Includes admin panel for inventory and order management.',
      features: [
        'Product Catalog',
        'Shopping Cart',
        'Secure Payments',
        'Order Tracking',
        'User Accounts',
        'Search & Filters',
        'Reviews & Ratings',
        'Wishlist'
      ],
      platforms: ['android', 'ios', 'web'],
      screenshots: ['ecommerce-home', 'ecommerce-product', 'ecommerce-cart'],
      rating: 4.7,
      downloads: 18900,
      buildTime: '6-8 minutes',
      difficulty: 'advanced',
      tags: ['ecommerce', 'shopping', 'payments', 'retail']
    },
    {
      id: 'fitness-tracker',
      name: 'FitLife',
      category: 'health',
      description: 'Comprehensive fitness and health tracking app',
      longDescription: 'A complete fitness tracking application with workout planning, progress monitoring, nutrition tracking, and social features. Integrates with wearable devices and provides detailed analytics.',
      features: [
        'Workout Plans',
        'Progress Tracking',
        'Nutrition Logging',
        'Social Challenges',
        'Device Integration',
        'Health Metrics',
        'Goal Setting',
        'Achievement Badges'
      ],
      platforms: ['android', 'ios'],
      screenshots: ['fitness-dashboard', 'fitness-workout', 'fitness-progress'],
      rating: 4.5,
      downloads: 12750,
      buildTime: '4-6 minutes',
      difficulty: 'intermediate',
      tags: ['fitness', 'health', 'tracking', 'wellness']
    },
    {
      id: 'weather-app',
      name: 'WeatherPro',
      category: 'utility',
      description: 'Advanced weather forecasting application',
      longDescription: 'A professional weather application with detailed forecasts, interactive maps, severe weather alerts, and location-based services. Features beautiful animations and accurate weather data.',
      features: [
        '7-Day Forecasts',
        'Interactive Maps',
        'Severe Alerts',
        'Location Services',
        'Weather Widgets',
        'Radar Animation',
        'Historical Data',
        'Air Quality Index'
      ],
      platforms: ['android', 'ios', 'web'],
      screenshots: ['weather-current', 'weather-forecast', 'weather-map'],
      rating: 4.4,
      downloads: 31200,
      buildTime: '2-4 minutes',
      difficulty: 'beginner',
      tags: ['weather', 'forecast', 'maps', 'utility']
    },
    {
      id: 'task-manager',
      name: 'TaskMaster',
      category: 'productivity',
      description: 'Professional task and project management tool',
      longDescription: 'A comprehensive task management application with project organization, team collaboration, time tracking, and advanced productivity features. Perfect for teams and individuals.',
      features: [
        'Task Organization',
        'Project Management',
        'Team Collaboration',
        'Time Tracking',
        'Calendar Integration',
        'File Sharing',
        'Progress Reports',
        'Notifications'
      ],
      platforms: ['android', 'ios', 'web'],
      screenshots: ['task-board', 'task-project', 'task-calendar'],
      rating: 4.6,
      downloads: 9800,
      buildTime: '4-6 minutes',
      difficulty: 'intermediate',
      tags: ['productivity', 'tasks', 'management', 'collaboration']
    }
  ]

  const categories = [
    { id: 'all', name: 'All Templates', count: templateApps.length },
    { id: 'finance', name: 'Finance', count: 1 },
    { id: 'social', name: 'Social', count: 1 },
    { id: 'ecommerce', name: 'E-commerce', count: 1 },
    { id: 'health', name: 'Health', count: 1 },
    { id: 'utility', name: 'Utility', count: 1 },
    { id: 'productivity', name: 'Productivity', count: 1 }
  ]

  const filteredApps = selectedCategory === 'all' 
    ? templateApps 
    : templateApps.filter(app => app.category === selectedCategory)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              App Template Gallery
            </h1>
            <p className="text-white/60 text-lg">
              Choose from professionally designed, ready-to-deploy applications
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{templateApps.length}</div>
              <div className="text-white/60">Templates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">3</div>
              <div className="text-white/60">Platforms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {templateApps.reduce((sum, app) => sum + app.downloads, 0).toLocaleString()}
              </div>
              <div className="text-white/60">Total Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {(templateApps.reduce((sum, app) => sum + app.rating, 0) / templateApps.length).toFixed(1)}
              </div>
              <div className="text-white/60">Avg Rating</div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id
                    ? 'bg-blue-600 hover:bg-blue-700 text-white border-0'
                    : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                }`}
              >
                {category.name}
                <Badge variant="secondary" className="ml-2 bg-white/20 text-white">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((template) => (
            <Card 
              key={template.id} 
              className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedTemplate(template)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <CardTitle className="text-xl text-white group-hover:text-blue-400 transition-colors">
                      {template.name}
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      {template.description}
                    </CardDescription>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <div className="flex items-center gap-1">
                    {renderStars(template.rating)}
                    <span>({template.rating})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>{template.downloads.toLocaleString()}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* Platforms */}
                  <div className="flex gap-2">
                    {template.platforms.map((platform) => (
                      <Badge key={platform} variant="secondary" className="bg-white/10 text-white border-white/20 text-xs">
                        {platform === 'android' ? '🤖' : platform === 'ios' ? '🍎' : '🌐'} {platform}
                      </Badge>
                    ))}
                  </div>

                  {/* Features */}
                  <div>
                    <p className="text-sm font-medium text-white/60 mb-2">Key Features</p>
                    <div className="flex gap-1 flex-wrap">
                      {template.features.slice(0, 3).map((feature) => (
                        <Badge key={feature} variant="outline" className="border-white/20 text-white text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {template.features.length > 3 && (
                        <Badge variant="outline" className="border-white/20 text-white text-xs">
                          +{template.features.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex gap-1 flex-wrap">
                    {template.tags.slice(0, 4).map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-white/5 text-white/70 border-white/10 text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Build Info */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <Badge className={getDifficultyColor(template.difficulty)}>
                      {template.difficulty}
                    </Badge>
                    <span className="text-xs text-white/60">
                      ⏱️ {template.buildTime}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Link href={`/instant-build?template=${template.id}&platform=${template.platforms[0]}`}>
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white border-0 text-sm">
                        <Zap className="h-4 w-4 mr-1" />
                        Instant Build
                      </Button>
                    </Link>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 text-sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Template Detail Modal */}
        {selectedTemplate && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-white/20 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedTemplate.name}</h2>
                    <p className="text-white/60">{selectedTemplate.longDescription}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedTemplate(null)}
                    className="text-white/70 hover:text-white"
                  >
                    ✕
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Features */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Features</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {selectedTemplate.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-white/80">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Platforms */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Available Platforms</h3>
                      <div className="flex gap-3">
                        {selectedTemplate.platforms.map((platform) => (
                          <div key={platform} className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
                            <Smartphone className="h-5 w-5 text-white" />
                            <span className="text-white capitalize">{platform}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Statistics</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-white/5 rounded-lg">
                          <div className="text-2xl font-bold text-white">{selectedTemplate.rating}</div>
                          <div className="text-sm text-white/60">Rating</div>
                        </div>
                        <div className="text-center p-3 bg-white/5 rounded-lg">
                          <div className="text-2xl font-bold text-white">{selectedTemplate.downloads.toLocaleString()}</div>
                          <div className="text-sm text-white/60">Downloads</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Build Options */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Build Options</h3>
                      <div className="space-y-3">
                        {selectedTemplate.platforms.map((platform) => (
                          <Link key={platform} href={`/instant-build?template=${selectedTemplate.id}&platform=${platform}`}>
                            <Button className="w-full justify-start bg-green-600 hover:bg-green-700 text-white border-0">
                              <Zap className="h-4 w-4 mr-2" />
                              Build for {platform.toUpperCase()}
                            </Button>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Quick Actions</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          <Play className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>

                    {/* Build Info */}
                    <div className="p-4 bg-white/5 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Build Information</h4>
                      <div className="space-y-2 text-sm text-white/70">
                        <div className="flex justify-between">
                          <span>Difficulty:</span>
                          <Badge className={getDifficultyColor(selectedTemplate.difficulty)}>
                            {selectedTemplate.difficulty}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Build Time:</span>
                          <span>{selectedTemplate.buildTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Template ID:</span>
                          <span className="font-mono">{selectedTemplate.id}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}