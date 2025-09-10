'use client'

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, Code, Smartphone, Globe, Apple, CheckCircle, Clock, Zap, Eye } from "lucide-react"
import Link from "next/link"

interface TemplateConfig {
  id: string
  name: string
  description: string
  features: string[]
  platforms: ('android' | 'ios' | 'web')[]
  buildTime: string
  difficulty: string
}

interface BuildStatus {
  android: 'idle' | 'building' | 'completed' | 'error'
  ios: 'idle' | 'building' | 'completed' | 'error'
  web: 'idle' | 'building' | 'completed' | 'error'
}

export default function InstantBuildPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const templateId = searchParams.get('template')
  const platform = searchParams.get('platform') as 'android' | 'ios' | 'web' | null

  const [selectedTemplate, setSelectedTemplate] = useState<TemplateConfig | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<'android' | 'ios' | 'web'>(platform || 'android')
  const [buildStatus, setBuildStatus] = useState<BuildStatus>({
    android: 'idle',
    ios: 'idle',
    web: 'idle'
  })
  const [buildProgress, setBuildProgress] = useState(0)
  const [buildOutput, setBuildOutput] = useState<string[]>([])
  const [isBuilding, setIsBuilding] = useState(false)
  const [buildCompleted, setBuildCompleted] = useState(false)

  const templates: TemplateConfig[] = [
    {
      id: 'crypto-wallet',
      name: 'CryptoWallet Pro',
      description: 'Secure cryptocurrency wallet with multi-chain support',
      features: ['Multi-chain Support', 'QR Code Scanner', 'Portfolio Tracking', 'Real-time Prices'],
      platforms: ['android', 'ios', 'web'],
      buildTime: '3-5 minutes',
      difficulty: 'intermediate'
    },
    {
      id: 'social-media',
      name: 'SocialConnect',
      description: 'Complete social media platform with messaging',
      features: ['User Profiles', 'Photo/Video Posts', 'Real-time Messaging', 'Push Notifications'],
      platforms: ['android', 'ios'],
      buildTime: '5-7 minutes',
      difficulty: 'advanced'
    },
    {
      id: 'ecommerce-store',
      name: 'ShopEasy',
      description: 'Full-featured e-commerce mobile application',
      features: ['Product Catalog', 'Shopping Cart', 'Secure Payments', 'Order Tracking'],
      platforms: ['android', 'ios', 'web'],
      buildTime: '6-8 minutes',
      difficulty: 'advanced'
    },
    {
      id: 'fitness-tracker',
      name: 'FitLife',
      description: 'Comprehensive fitness and health tracking app',
      features: ['Workout Plans', 'Progress Tracking', 'Nutrition Logging', 'Social Challenges'],
      platforms: ['android', 'ios'],
      buildTime: '4-6 minutes',
      difficulty: 'intermediate'
    },
    {
      id: 'weather-app',
      name: 'WeatherPro',
      description: 'Advanced weather forecasting application',
      features: ['7-Day Forecasts', 'Interactive Maps', 'Severe Alerts', 'Location Services'],
      platforms: ['android', 'ios', 'web'],
      buildTime: '2-4 minutes',
      difficulty: 'beginner'
    },
    {
      id: 'task-manager',
      name: 'TaskMaster',
      description: 'Professional task and project management tool',
      features: ['Task Organization', 'Project Management', 'Team Collaboration', 'Time Tracking'],
      platforms: ['android', 'ios', 'web'],
      buildTime: '4-6 minutes',
      difficulty: 'intermediate'
    }
  ]

  useEffect(() => {
    if (templateId) {
      const template = templates.find(t => t.id === templateId)
      if (template) {
        setSelectedTemplate(template)
      } else {
        router.push('/templates')
      }
    }
  }, [templateId, router])

  const startInstantBuild = async () => {
    if (!selectedTemplate) return

    setBuildStatus(prev => ({ ...prev, [selectedPlatform]: 'building' }))
    setIsBuilding(true)
    setBuildProgress(0)
    setBuildOutput([`🚀 Starting instant build for ${selectedTemplate.name}...`])
    setBuildCompleted(false)

    try {
      const response = await fetch('/api/build', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platform: selectedPlatform,
          projectName: selectedTemplate.name,
          projectConfig: {
            ...selectedTemplate,
            template: true
          }
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Simulate real-time build progress
        const buildSteps = [
          { message: `📦 Downloading template files...`, progress: 10 },
          { message: `⚙️  Configuring ${selectedTemplate.name}...`, progress: 25 },
          { message: `🔧 Setting up ${selectedPlatform} build environment...`, progress: 40 },
          { message: `📱 Installing dependencies...`, progress: 55 },
          { message: `🎨 Applying custom branding...`, progress: 70 },
          { message: `🔨 Building ${selectedPlatform} application...`, progress: 85 },
          { message: `✅ Build completed successfully!`, progress: 100 }
        ]

        buildSteps.forEach((step, index) => {
          setTimeout(() => {
            setBuildOutput(prev => [...prev, step.message])
            setBuildProgress(step.progress)
            
            if (index === buildSteps.length - 1) {
              setTimeout(() => {
                setBuildStatus(prev => ({ ...prev, [selectedPlatform]: 'completed' }))
                setIsBuilding(false)
                setBuildCompleted(true)
                setBuildOutput(prev => [...prev, `🎉 ${selectedTemplate.name} for ${selectedPlatform} is ready!`])
                setBuildOutput(prev => [...prev, `📥 Download your app below`])
              }, 1000)
            }
          }, index * 800)
        })
      } else {
        throw new Error(data.message || 'Build failed')
      }
    } catch (error) {
      console.error('Build error:', error)
      setBuildOutput(prev => [...prev, `❌ Build failed: ${error instanceof Error ? error.message : 'Unknown error'}`])
      setBuildStatus(prev => ({ ...prev, [selectedPlatform]: 'error' }))
      setIsBuilding(false)
    }
  }

  const downloadBuild = () => {
    if (!selectedTemplate || buildStatus[selectedPlatform] !== 'completed') return

    const fileExtensions = {
      android: 'apk',
      ios: 'ipa',
      web: 'zip'
    }

    const fileTypes = {
      android: 'application/vnd.android.package-archive',
      ios: 'application/octet-stream',
      web: 'application/zip'
    }

    const mockContent = `${selectedTemplate.name} for ${selectedPlatform.toUpperCase()}
================================
Version: 1.0.0
Build Date: ${new Date().toISOString()}
Platform: ${selectedPlatform.toUpperCase()}
Template: ${selectedTemplate.id}

Features Included:
${selectedTemplate.features.map(f => `✓ ${f}`).join('\n')}

🚀 Built with Project Genesis IDE
📱 Ready for deployment to ${selectedPlatform.toUpperCase()} devices
⚡ Built from template in just ${selectedTemplate.buildTime}

Thank you for using Project Genesis IDE!
    `

    const blob = new Blob([mockContent], { type: fileTypes[selectedPlatform] })
    const url = URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedTemplate.name}-${selectedPlatform}.${fileExtensions[selectedPlatform]}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'android': return <Smartphone className="h-5 w-5" />
      case 'ios': return <Apple className="h-5 w-5" />
      case 'web': return <Globe className="h-5 w-5" />
      default: return <Code className="h-5 w-5" />
    }
  }

  if (!selectedTemplate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading template...</p>
        </div>
      </div>
    )
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
            <Link href="/templates">
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Templates
              </Button>
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Instant Build
            </h1>
            <p className="text-white/60 text-lg">
              Build {selectedTemplate.name} for {selectedPlatform.toUpperCase()} in minutes
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Template Info & Build Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Template Info */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-lg text-white">{selectedTemplate.name}</CardTitle>
                <CardDescription className="text-white/60">
                  {selectedTemplate.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-white/60 mb-2">Features</p>
                  <div className="space-y-1">
                    {selectedTemplate.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-white/80 text-sm">
                        <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-white/60 mb-2">Build Info</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between text-white/80">
                      <span>Difficulty:</span>
                      <Badge variant="outline" className="border-white/20 text-white text-xs">
                        {selectedTemplate.difficulty}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-white/80">
                      <span>Build Time:</span>
                      <span>{selectedTemplate.buildTime}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Platform Selection */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-lg text-white">Select Platform</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedTemplate.platforms.map((platform) => (
                  <Button
                    key={platform}
                    onClick={() => setSelectedPlatform(platform)}
                    className={`w-full justify-start ${
                      selectedPlatform === platform
                        ? 'bg-blue-600 hover:bg-blue-700 text-white border-0'
                        : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                    }`}
                    disabled={buildStatus[platform] === 'building'}
                  >
                    {getPlatformIcon(platform)}
                    <span className="ml-2 capitalize">{platform}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Build Action */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-lg text-white">Build Action</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={startInstantBuild}
                  disabled={isBuilding || buildStatus[selectedPlatform] === 'completed'}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white border-0"
                >
                  {isBuilding ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Building...
                    </>
                  ) : buildStatus[selectedPlatform] === 'completed' ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Build Complete
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Start Instant Build
                    </>
                  )}
                </Button>

                {buildCompleted && (
                  <Button
                    onClick={downloadBuild}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white border-0"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download App
                  </Button>
                )}

                <Link href="/simulate">
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview in Simulator
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Build Progress & Output */}
          <div className="lg:col-span-3 space-y-6">
            {/* Build Progress */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Build Progress</CardTitle>
                <CardDescription className="text-white/60">
                  {selectedTemplate.name} for {selectedPlatform.toUpperCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress value={buildProgress} className="h-3" />
                  <div className="flex justify-between text-sm text-white/60">
                    <span>{buildProgress}% Complete</span>
                    <span>Estimated time: {selectedTemplate.buildTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Build Output */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Build Output</CardTitle>
                <CardDescription className="text-white/60">
                  Real-time build process output
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
                  {buildOutput.map((output, index) => (
                    <div key={index} className="mb-1">
                      {output}
                    </div>
                  ))}
                  {isBuilding && (
                    <div className="flex items-center gap-2 text-yellow-400">
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-yellow-400"></div>
                      <span>Building in progress...</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Build Instructions */}
            {buildCompleted && (
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Next Steps</CardTitle>
                  <CardDescription className="text-white/60">
                    Your app is ready! Here's what you can do next:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <Download className="h-8 w-8 text-green-400 mx-auto mb-2" />
                      <h3 className="text-white font-medium mb-1">Download</h3>
                      <p className="text-white/60 text-sm">Get the built app file</p>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <Eye className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                      <h3 className="text-white font-medium mb-1">Preview</h3>
                      <p className="text-white/60 text-sm">Test in simulator</p>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <Code className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                      <h3 className="text-white font-medium mb-1">Customize</h3>
                      <p className="text-white/60 text-sm">Modify the source code</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}