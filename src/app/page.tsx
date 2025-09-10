'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Code, Smartphone, Globe, Zap, Users, Database } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const features = [
    {
      icon: Code,
      title: "AI-Powered Code Generation",
      description: "Transform natural language descriptions into production-ready React Native code"
    },
    {
      icon: Smartphone,
      title: "Cross-Platform Apps",
      description: "Generate apps for Android, iOS, and Web from a single description"
    },
    {
      icon: Globe,
      title: "Expo EAS Integration",
      description: "Seamless deployment with Expo EAS Build for APK, IPA, and web deployment"
    },
    {
      icon: Zap,
      title: "Instant Prototyping",
      description: "Go from idea to working prototype in minutes, not weeks"
    },
    {
      icon: Users,
      title: "User-Friendly Interface",
      description: "Intuitive IDE designed for both developers and non-technical users"
    },
    {
      icon: Database,
      title: "Complete Project Structure",
      description: "Generate full project files including navigation, components, and configuration"
    }
  ]

  const templates = [
    {
      name: "Crypto Wallet",
      description: "Secure wallet with token management and QR scanning",
      platforms: ["Android", "iOS", "Web"]
    },
    {
      name: "Social Media App",
      description: "Complete social platform with profiles, posts, and messaging",
      platforms: ["Android", "iOS"]
    },
    {
      name: "E-commerce Store",
      description: "Full-featured online store with payments and inventory",
      platforms: ["Android", "iOS", "Web"]
    },
    {
      name: "Fitness Tracker",
      description: "Health and fitness app with workout tracking and goals",
      platforms: ["Android", "iOS"]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/80 text-sm font-medium">AI-Powered App Generation</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              Project Genesis IDE
            </h1>
            <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-4xl mx-auto leading-relaxed">
              Transform your ideas into fully functional mobile and web applications with the power of AI.
              Describe your app, and we'll generate the complete React Native/Expo project.
            </p>
            <div className="flex gap-6 justify-center items-center">
              <Link href="/create">
                <Button size="lg" className="px-12 py-4 text-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300">
                  <span className="mr-2">🚀</span>
                  Create New Project
                </Button>
              </Link>
              <Link href="/templates">
                <Button variant="outline" size="lg" className="px-12 py-4 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300">
                  <span className="mr-2">📋</span>
                  Browse Templates
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-white/60">Apps Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">3</div>
              <div className="text-white/60">Platforms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-white/60">Features</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">5min</div>
              <div className="text-white/60">Avg Build Time</div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-white/60 text-lg">Everything you need to build amazing apps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-lg text-white">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-white/70 text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Templates Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Start with a Template</h2>
            <p className="text-white/60 text-lg">Pre-built app templates to jumpstart your project</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.map((template, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-white mb-2 group-hover:text-blue-400 transition-colors">{template.name}</CardTitle>
                      <CardDescription className="text-white/70 text-base">
                        {template.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 flex-wrap mb-4">
                    {template.platforms.map((platform) => (
                      <Badge key={platform} variant="secondary" className="bg-white/10 text-white border-white/20">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                  <Link href="/templates">
                    <Button className="w-full bg-white/10 hover:bg-white/20 border-white/20 text-white hover:text-white transition-all duration-300">
                      Use Template
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Ready to Build Your App?</CardTitle>
              <CardDescription className="text-lg text-white/80">
                Join thousands of developers and entrepreneurs who are building apps faster than ever before.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/create">
                <Button size="lg" className="px-12 py-4 text-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300">
                  <span className="mr-2">🚀</span>
                  Start Building Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}