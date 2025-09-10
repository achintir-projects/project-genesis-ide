'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Smartphone, Monitor, Tablet, Play, Pause, RotateCcw, Maximize2 } from "lucide-react"
import Link from "next/link"

interface AppPreview {
  name: string
  platform: 'android' | 'ios' | 'web'
  description: string
  features: string[]
  screens: string[]
}

export default function SimulatePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedPlatform, setSelectedPlatform] = useState<'android' | 'ios' | 'web'>('android')
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentScreen, setCurrentScreen] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Read app configuration from URL parameters
  const appName = searchParams.get('appName') || 'My App'
  const features = searchParams.get('features') ? JSON.parse(searchParams.get('features') as string) : []
  const platformParam = searchParams.get('platform') as 'android' | 'ios' | 'web' | null

  // Set platform from URL parameter if available
  useEffect(() => {
    if (platformParam && ['android', 'ios', 'web'].includes(platformParam)) {
      setSelectedPlatform(platformParam)
    }
  }, [platformParam])

  const appPreview: AppPreview = {
    name: appName,
    platform: selectedPlatform,
    description: `A modern mobile application built with Project Genesis IDE`,
    features: features.length > 0 ? features : ["Secure Authentication", "User Profiles", "Push Notifications", "Data Sync"],
    screens: ["Home", "Profile", "Settings", "More"]
  }

  const platformDevices = {
    android: {
      name: "Android Device",
      icon: Smartphone,
      width: 375,
      height: 812,
      borderRadius: 30,
      statusBar: "#000000",
      navigationBar: "#000000"
    },
    ios: {
      name: "iPhone",
      icon: Smartphone,
      width: 375,
      height: 812,
      borderRadius: 40,
      statusBar: "#000000",
      homeIndicator: true
    },
    web: {
      name: "Web Browser",
      icon: Monitor,
      width: 1366,
      height: 768,
      borderRadius: 8,
      addressBar: true
    }
  }

  const generateScreens = () => {
    const baseScreens = ["Home"]
    
    // Add screens based on features
    if (features.some(f => f.includes('Profile') || f.includes('User'))) {
      baseScreens.push('Profile')
    }
    if (features.some(f => f.includes('Message') || f.includes('Chat'))) {
      baseScreens.push('Messages')
    }
    if (features.some(f => f.includes('Payment') || f.includes('Send'))) {
      baseScreens.push('Send')
    }
    if (features.some(f => f.includes('Camera') || f.includes('QR'))) {
      baseScreens.push('Camera')
    }
    if (features.some(f => f.includes('Map') || f.includes('Location'))) {
      baseScreens.push('Map')
    }
    if (features.some(f => f.includes('Setting') || f.includes('Config'))) {
      baseScreens.push('Settings')
    }
    
    // Always ensure we have at least 4 screens
    while (baseScreens.length < 4) {
      if (!baseScreens.includes('Profile')) baseScreens.push('Profile')
      else if (!baseScreens.includes('Settings')) baseScreens.push('Settings')
      else if (!baseScreens.includes('More')) baseScreens.push('More')
      else break
    }
    
    return baseScreens.slice(0, 5) // Max 5 screens
  }

  const [appScreens, setAppScreens] = useState<string[]>([])

  useEffect(() => {
    setAppScreens(generateScreens())
  }, [features])

  // Update appPreview screens when they change
  useEffect(() => {
    appPreview.screens = appScreens
  }, [appScreens])

  const simulateAppInteraction = () => {
    if (isPlaying) {
      setIsPlaying(false)
      return
    }

    setIsPlaying(true)
    let screenIndex = 0

    const interval = setInterval(() => {
      screenIndex = (screenIndex + 1) % appScreens.length
      setCurrentScreen(screenIndex)
      
      if (screenIndex === appScreens.length - 1) {
        setIsPlaying(false)
        clearInterval(interval)
      }
    }, 2000)
  }


  const resetSimulation = () => {
    setIsPlaying(false)
    setCurrentScreen(0)
  }

  const getScreenContent = (screenName: string) => {
    const screenContents: { [key: string]: JSX.Element } = {
      "Home": (
        <div className="p-4 h-full flex flex-col">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome to {appPreview.name}</h2>
            <p className="text-blue-300">Your app is ready to use!</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-500/20 p-4 rounded-lg">
              <p className="text-white/60 text-sm">Status</p>
              <p className="text-white font-semibold">Active</p>
            </div>
            <div className="bg-purple-500/20 p-4 rounded-lg">
              <p className="text-white/60 text-sm">Version</p>
              <p className="text-white font-semibold">1.0.0</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium">
              Profile
            </button>
            <button className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium">
              Settings
            </button>
          </div>
        </div>
      ),
      "Send": (
        <div className="p-4 h-full flex flex-col">
          <h2 className="text-xl font-bold text-white mb-4">Send Data</h2>
          <div className="space-y-4">
            <div>
              <label className="text-white/60 text-sm">Recipient</label>
              <div className="bg-white/10 p-3 rounded-lg text-white text-sm">
                user@example.com
              </div>
            </div>
            <div>
              <label className="text-white/60 text-sm">Message</label>
              <div className="bg-white/10 p-3 rounded-lg text-white">
                Hello from {appPreview.name}!
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium">
              Send Now
            </button>
          </div>
        </div>
      ),
      "Receive": (
        <div className="p-4 h-full flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold text-white mb-6">Receive Data</h2>
          <div className="w-48 h-48 bg-white rounded-lg mb-6 flex items-center justify-center">
            <div className="w-40 h-40 bg-black rounded-lg flex items-center justify-center">
              <div className="grid grid-cols-8 gap-1">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-black"></div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-white/60 text-sm text-center mb-4">
            Scan this QR code to receive data
          </p>
          <div className="bg-white/10 p-3 rounded-lg">
            <p className="text-white font-mono text-xs text-center">
              {appPreview.name.toLowerCase().replace(/\s+/g, '-')}.app/data
            </p>
          </div>
        </div>
      ),
      "Portfolio": (
        <div className="p-4 h-full">
          <h2 className="text-xl font-bold text-white mb-4">Dashboard</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-medium">Users</p>
                <p className="text-white/60 text-sm">Active</p>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">1,234</p>
                <p className="text-green-400 text-sm">+12%</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-medium">Revenue</p>
                <p className="text-white/60 text-sm">Monthly</p>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">$45,678</p>
                <p className="text-green-400 text-sm">+8%</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-medium">Performance</p>
                <p className="text-white/60 text-sm">Score</p>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">98%</p>
                <p className="text-green-400 text-sm">Excellent</p>
              </div>
            </div>
          </div>
        </div>
      ),
      "Settings": (
        <div className="p-4 h-full">
          <h2 className="text-xl font-bold text-white mb-4">Settings</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-white">Push Notifications</span>
              <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-white">Biometric Login</span>
              <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-white">Dark Mode</span>
              <div className="w-12 h-6 bg-gray-600 rounded-full relative">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-white mb-2">About</p>
              <p className="text-white/60 text-sm">{appPreview.name} v1.0.0</p>
              <p className="text-white/60 text-sm">Built with Project Genesis IDE</p>
            </div>
          </div>
        </div>
      )
    }

    return screenContents[screenName] || screenContents["Home"]
  }

  const device = platformDevices[selectedPlatform]

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
            <Link href="/generate">
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Build
              </Button>
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              App Simulation Environment
            </h1>
            <p className="text-white/60 text-lg">
              Preview your app across different platforms and devices
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* App Info & Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* App Info */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-lg text-white">{appPreview.name}</CardTitle>
                <CardDescription className="text-white/60">
                  {appPreview.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-white/60 mb-2">Features</p>
                    <div className="flex gap-1 flex-wrap">
                      {appPreview.features.map((feature) => (
                        <Badge key={feature} variant="outline" className="border-white/20 text-white text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/60 mb-2">Screens</p>
                    <div className="flex gap-1 flex-wrap">
                      {appPreview.screens.map((screen) => (
                        <Badge 
                          key={screen} 
                          variant="secondary" 
                          className={`bg-white/10 text-white border-white/20 text-xs cursor-pointer ${
                            currentScreen === appPreview.screens.indexOf(screen) ? 'bg-blue-500/30 border-blue-400' : ''
                          }`}
                          onClick={() => setCurrentScreen(appPreview.screens.indexOf(screen))}
                        >
                          {screen}
                        </Badge>
                      ))}
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
                {Object.entries(platformDevices).map(([platform, device]) => {
                  const Icon = device.icon
                  return (
                    <Button
                      key={platform}
                      onClick={() => setSelectedPlatform(platform as 'android' | 'ios' | 'web')}
                      className={`w-full justify-start ${
                        selectedPlatform === platform
                          ? 'bg-blue-600 hover:bg-blue-700 text-white border-0'
                          : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {device.name}
                    </Button>
                  )
                })}
              </CardContent>
            </Card>

            {/* Simulation Controls */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-lg text-white">Simulation Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={simulateAppInteraction}
                  className={`w-full ${isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white border-0`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Play Demo
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={resetSimulation}
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                
                <Button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  <Maximize2 className="h-4 w-4 mr-2" />
                  {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Device Simulator */}
          <div className="lg:col-span-3">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">
                  {device.name} Simulator
                </CardTitle>
                <CardDescription className="text-white/60">
                  Current Screen: {appPreview.screens[currentScreen]}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center items-center min-h-[600px]">
                  <div 
                    className="relative bg-black rounded-lg overflow-hidden shadow-2xl"
                    style={{
                      width: device.width,
                      height: device.height,
                      borderRadius: device.borderRadius
                    }}
                  >
                    {/* Device-specific UI elements */}
                    {selectedPlatform === 'android' && (
                      <>
                        <div className="absolute top-0 left-0 right-0 h-6 bg-black flex items-center justify-between px-4 text-white text-xs z-10">
                          <span>9:41</span>
                          <div className="flex gap-1">
                            <span>📶</span>
                            <span>🔋</span>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-black flex items-center justify-center">
                          <div className="w-32 h-1 bg-white/30 rounded-full"></div>
                        </div>
                      </>
                    )}
                    
                    {selectedPlatform === 'ios' && (
                      <>
                        <div className="absolute top-0 left-0 right-0 h-12 bg-black flex items-center justify-between px-6 text-white text-xs z-10">
                          <span>9:41</span>
                          <div className="flex gap-1">
                            <span>📶</span>
                            <span>🔋</span>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-black flex items-center justify-center">
                          <div className="w-32 h-1 bg-white/30 rounded-full"></div>
                        </div>
                      </>
                    )}
                    
                    {selectedPlatform === 'web' && (
                      <div className="absolute top-0 left-0 right-0 h-12 bg-gray-800 flex items-center px-4 z-10">
                        <div className="flex-1 flex items-center bg-white/10 rounded px-3 py-1">
                          <span className="text-white/60 text-sm mr-2">🔒</span>
                          <span className="text-white text-sm">localhost:3000</span>
                        </div>
                      </div>
                    )}

                    {/* App Content */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 overflow-hidden">
                      {getScreenContent(appPreview.screens[currentScreen])}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}