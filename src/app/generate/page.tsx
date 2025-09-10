'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, Code, FileText, Settings, CheckCircle, AlertCircle, Clock, Monitor } from "lucide-react"
import Link from "next/link"

interface GeneratedFile {
  name: string
  path: string
  content: string
  language: string
}

interface ProjectConfig {
  appName: string
  platforms: string[]
  features: string[]
  screens: string
  navigation: string
  uiStyle: string
  dataApis: string
  deviceFeatures: string[]
  iconSplash: string
}

export default function GeneratePage() {
  const [generationStatus, setGenerationStatus] = useState<'idle' | 'generating' | 'completed' | 'error'>('generating')
  const [progress, setProgress] = useState(0)
  const [generatedFiles, setGeneratedFiles] = useState<GeneratedFile[]>([])
  const [projectConfig, setProjectConfig] = useState<ProjectConfig | null>(null)
  
  // Build automation state
  const [buildStatus, setBuildStatus] = useState({
    android: 'idle' as 'idle' | 'building' | 'completed' | 'error',
    ios: 'idle' as 'idle' | 'building' | 'completed' | 'error',
    web: 'idle' as 'idle' | 'building' | 'completed' | 'error'
  })
  const [buildOutput, setBuildOutput] = useState<string[]>([])
  const [isBuilding, setIsBuilding] = useState(false)

  const startBuild = async (platform: 'android' | 'ios' | 'web') => {
    if (!projectConfig) return

    setBuildStatus(prev => ({ ...prev, [platform]: 'building' }))
    setIsBuilding(true)
    setBuildOutput([`🚀 Starting ${platform} build process...`])

    try {
      const response = await fetch('/api/build', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platform,
          projectName: projectConfig.appName,
          projectConfig
        }),
      })

      if (!response.ok) {
        throw new Error('Build failed to start')
      }

      const result = await response.json()
      
      // Simulate real-time build output based on the API response
      if (result.output && Array.isArray(result.output)) {
        let currentStep = 0
        const simulateOutput = () => {
          if (currentStep < result.output.length) {
            const step = result.output[currentStep]
            setBuildOutput(prev => [...prev, step.message])
            
            // Update progress if available
            if (step.progress) {
              // You could update a progress bar here if needed
            }
            
            currentStep++
            setTimeout(simulateOutput, 1000) // 1 second delay between steps
          } else {
            // Build completed
            setBuildStatus(prev => ({ ...prev, [platform]: 'completed' }))
            setIsBuilding(false)
            setBuildOutput(prev => [...prev, `🎉 ${platform.charAt(0).toUpperCase() + platform.slice(1)} build ready for download!`])
            setBuildOutput(prev => [...prev, `📥 Download: ${result.downloadUrl}`])
          }
        }
        
        simulateOutput()
      } else {
        // Fallback simulation
        const buildSteps = [
          { output: `📦 Installing dependencies...`, delay: 1000 },
          { output: `⚙️  Configuring build settings...`, delay: 1500 },
          { output: `🔨 Building ${platform} application...`, delay: 2000 },
          { output: `📱 Optimizing for ${platform}...`, delay: 2500 },
          { output: `✅ Build completed successfully!`, delay: 3000 }
        ]

        let currentStep = 0
        const executeStep = () => {
          if (currentStep < buildSteps.length) {
            const step = buildSteps[currentStep]
            setBuildOutput(prev => [...prev, step.output])
            currentStep++
            setTimeout(executeStep, step.delay)
          } else {
            setBuildStatus(prev => ({ ...prev, [platform]: 'completed' }))
            setIsBuilding(false)
            setBuildOutput(prev => [...prev, `🎉 ${platform.charAt(0).toUpperCase() + platform.slice(1)} build ready for download!`])
          }
        }

        executeStep()
      }
    } catch (error) {
      console.error('Build error:', error)
      setBuildStatus(prev => ({ ...prev, [platform]: 'error' }))
      setIsBuilding(false)
      setBuildOutput(prev => [...prev, `❌ Build failed: ${error instanceof Error ? error.message : 'Unknown error'}`])
    }
  }

  // Load project config from localStorage (from the create form)
  useEffect(() => {
    const savedConfig = localStorage.getItem('projectConfig')
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig)
        const config: ProjectConfig = {
          appName: parsedConfig.appName || "My App",
          platforms: parsedConfig.platforms || ["android", "ios", "web"],
          features: parsedConfig.features || [],
          screens: parsedConfig.screens || "",
          navigation: parsedConfig.navigation || "",
          uiStyle: parsedConfig.uiStyle || "",
          dataApis: parsedConfig.dataApis || "",
          deviceFeatures: parsedConfig.deviceFeatures || [],
          iconSplash: parsedConfig.iconSplash || ""
        }
        setProjectConfig(config)
        
        // Clear the localStorage after loading
        localStorage.removeItem('projectConfig')
      } catch (error) {
        console.error('Error parsing project config:', error)
        // Fallback to default config
        const fallbackConfig: ProjectConfig = {
          appName: "My App",
          platforms: ["android", "ios", "web"],
          features: ["Login/Authentication", "User Profiles"],
          screens: "Home screen with basic functionality",
          navigation: "Tab-based navigation",
          uiStyle: "Modern clean design",
          dataApis: "Mock data for MVP",
          deviceFeatures: ["Push Notifications"],
          iconSplash: "Simple app icon"
        }
        setProjectConfig(fallbackConfig)
      }
    } else {
      // No saved config, use default
      const defaultConfig: ProjectConfig = {
        appName: "My App",
        platforms: ["android", "ios", "web"],
        features: ["Login/Authentication", "User Profiles"],
        screens: "Home screen with basic functionality",
        navigation: "Tab-based navigation",
        uiStyle: "Modern clean design",
        dataApis: "Mock data for MVP",
        deviceFeatures: ["Push Notifications"],
        iconSplash: "Simple app icon"
      }
      setProjectConfig(defaultConfig)
    }

    // Simulate generation process
    const generationSteps = [
      { progress: 20, message: "Analyzing requirements..." },
      { progress: 40, message: "Generating project structure..." },
      { progress: 60, message: "Creating components and screens..." },
      { progress: 80, message: "Configuring navigation and styling..." },
      { progress: 100, message: "Finalizing project files..." }
    ]

    let currentStep = 0
    const interval = setInterval(() => {
      if (currentStep < generationSteps.length) {
        setProgress(generationSteps[currentStep].progress)
        if (currentStep === generationSteps.length - 1) {
          setGenerationStatus('completed')
          
          // Generate dynamic files based on project config
          const files = [
            {
              name: "App.tsx",
              path: "App.tsx",
              content: `import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

// Screens
import HomeScreen from './screens/HomeScreen';
import SendScreen from './screens/SendScreen';
import ReceiveScreen from './screens/ReceiveScreen';
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Send" component={SendScreen} />
      <Tab.Screen name="Receive" component={ReceiveScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#1a1a1a',
    borderTopWidth: 0,
  },
});`,
              language: "typescript"
            },
            {
              name: "package.json",
              path: "package.json",
              content: `{
  "name": "${projectConfig.appName.toLowerCase().replace(/\\s+/g, '-')}",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~50.0.0",
    "expo-status-bar": "~1.11.1",
    "react": "18.2.0",
    "react-native": "0.73.0",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/bottom-tabs": "^6.5.11",
    "@react-navigation/stack": "^6.3.20",
    "react-native-screens": "~3.29.0",
    "react-native-safe-area-context": "4.8.2",
    "react-native-gesture-handler": "~2.14.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0"
  },
  "private": true
}`,
              language: "json"
            },
            {
              name: "HomeScreen.tsx",
              path: "screens/HomeScreen.tsx",
              content: `import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to ${projectConfig.appName}</Text>
      <Text style={styles.subtitle}>Your app is ready!</Text>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Learn More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 10,
    minWidth: 120,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});`,
              language: "typescript"
            }
          ]
          
          setGeneratedFiles(files)
        }
        currentStep++
      } else {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = () => {
    switch (generationStatus) {
      case 'generating':
        return <Clock className="h-5 w-5 text-blue-500" />
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusText = () => {
    switch (generationStatus) {
      case 'generating':
        return 'Generating your app...'
      case 'completed':
        return 'Generation completed!'
      case 'error':
        return 'Generation failed'
      default:
        return 'Ready to generate'
    }
  }

  const downloadProject = () => {
    // Create a mock ZIP file download
    const mockZipContent = createMockZipFile()
    const blob = new Blob([mockZipContent], { type: 'application/zip' })
    const url = URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = url
    a.download = `${projectConfig?.appName || 'app'}-source-code.zip`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const downloadBuild = (platform: 'android' | 'ios' | 'web') => {
    if (buildStatus[platform] !== 'completed') {
      alert('Please complete the build first before downloading')
      return
    }

    // Create mock build artifact based on platform
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

    const mockContent = createMockBuildArtifact(platform)
    const blob = new Blob([mockContent], { type: fileTypes[platform] })
    const url = URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = url
    a.download = `${projectConfig?.appName || 'app'}-${platform}.${fileExtensions[platform]}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const createMockZipFile = () => {
    // Create a mock ZIP file structure as text
    return `
${projectConfig?.appName || 'MyApp'} Source Code
=====================================

📁 Project Structure:
├── App.tsx
├── package.json
├── app.json
├── screens/
│   ├── HomeScreen.tsx
│   ├── ProfileScreen.tsx
│   └── SettingsScreen.tsx
├── components/
│   ├── Button.tsx
│   └── Card.tsx
└── assets/
    ├── icon.png
    └── splash.png

📱 Platforms: ${projectConfig?.platforms?.join(', ') || 'All'}
🎨 UI Style: ${projectConfig?.uiStyle || 'Modern'}
⚡ Features: ${projectConfig?.features?.join(', ') || 'Basic'}

🚀 Generated by Project Genesis IDE
📅 ${new Date().toISOString()}
    `
  }

  const createMockBuildArtifact = (platform: 'android' | 'ios' | 'web') => {
    const appInfo = {
      name: projectConfig?.appName || 'MyApp',
      version: '1.0.0',
      platform: platform.toUpperCase(),
      buildDate: new Date().toISOString(),
      features: projectConfig?.features || [],
      size: platform === 'android' ? '15.2 MB' : platform === 'ios' ? '18.7 MB' : '8.4 MB'
    }

    return `
${appInfo.name} for ${appInfo.platform}
================================
Version: ${appInfo.version}
Build Date: ${appInfo.buildDate}
File Size: ${appInfo.size}
Platform: ${appInfo.platform}

Features Included:
${appInfo.features.map(f => `✓ ${f}`).join('\n')}

🚀 Built with Project Genesis IDE
📱 Ready for deployment to ${appInfo.platform} devices
⚡ Optimized for performance and user experience

Installation Instructions:
${platform === 'android' ? 
  '1. Enable "Unknown Sources" in device settings\n2. Download and tap the APK file\n3. Follow installation prompts' :
  platform === 'ios' ?
  '1. Use TestFlight or enterprise distribution\n2. Install provisioning profile\n3. Deploy to iOS device' :
  '1. Extract the ZIP file\n2. Open index.html in web browser\n3. Or deploy to web server'
}

🎉 Thank you for using Project Genesis IDE!
    `
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
          <div className="flex items-center justify-between mb-4">
            <Link href="/create">
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Configuration
              </Button>
            </Link>
            
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              <span className="font-medium text-white">{getStatusText()}</span>
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {projectConfig?.appName || 'Your App'} - Generated
            </h1>
            <p className="text-white/60 text-lg">
              Your React Native/Expo project has been generated and is ready for deployment
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Project Info & Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Project Summary */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-lg text-white">Project Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-white/60">App Name</p>
                  <p className="font-medium text-white">{projectConfig?.appName}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-white/60">Platforms</p>
                  <div className="flex gap-1 flex-wrap mt-1">
                    {projectConfig?.platforms.map((platform) => (
                      <Badge key={platform} variant="secondary" className="bg-white/10 text-white border-white/20 text-xs">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-white/60">Features</p>
                  <div className="flex gap-1 flex-wrap mt-1">
                    {projectConfig?.features.slice(0, 3).map((feature) => (
                      <Badge key={feature} variant="outline" className="border-white/20 text-white text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {projectConfig && projectConfig.features.length > 3 && (
                      <Badge variant="outline" className="border-white/20 text-white text-xs">
                        +{projectConfig.features.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {projectConfig?.uiStyle && (
                  <div>
                    <p className="text-sm font-medium text-white/60">UI Style</p>
                    <p className="text-sm text-white/80">{projectConfig.uiStyle}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Generation Progress */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-lg text-white">Generation Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="mb-2" />
                <p className="text-sm text-white/60">{progress}% complete</p>
              </CardContent>
            </Card>

            {/* Build Actions */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-lg text-white">Build & Deploy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Android Build */}
                {projectConfig?.platforms.includes('android') && (
                  <Button 
                    onClick={() => startBuild('android')} 
                    disabled={buildStatus.android === 'building'}
                    className="w-full bg-green-600 hover:bg-green-700 text-white border-0"
                  >
                    {buildStatus.android === 'building' ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Building Android...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">🤖</span>
                        Build Android APK
                      </>
                    )}
                  </Button>
                )}

                {/* iOS Build */}
                {projectConfig?.platforms.includes('ios') && (
                  <Button 
                    onClick={() => startBuild('ios')} 
                    disabled={buildStatus.ios === 'building'}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white border-0"
                  >
                    {buildStatus.ios === 'building' ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Building iOS...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">🍎</span>
                        Build iOS IPA
                      </>
                    )}
                  </Button>
                )}

                {/* Web Build */}
                {projectConfig?.platforms.includes('web') && (
                  <Button 
                    onClick={() => startBuild('web')} 
                    disabled={buildStatus.web === 'building'}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white border-0"
                  >
                    {buildStatus.web === 'building' ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Building Web...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">🌐</span>
                        Build Web App
                      </>
                    )}
                  </Button>
                )}

                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  <Download className="h-4 w-4 mr-2" />
                  Download Source Code
                </Button>

                <Link href={`/simulate?config=${encodeURIComponent(JSON.stringify(projectConfig))}`}>
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    <Monitor className="h-4 w-4 mr-2" />
                    Preview in Simulator
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Build Status */}
            {(buildStatus.android === 'completed' || buildStatus.ios === 'completed' || buildStatus.web === 'completed') && (
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Download Builds</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {buildStatus.android === 'completed' && (
                    <Button 
                      onClick={() => downloadBuild('android')}
                      className="w-full bg-green-600 hover:bg-green-700 text-white border-0"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Android APK
                    </Button>
                  )}
                  {buildStatus.ios === 'completed' && (
                    <Button 
                      onClick={() => downloadBuild('ios')}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white border-0"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download iOS IPA
                    </Button>
                  )}
                  {buildStatus.web === 'completed' && (
                    <Button 
                      onClick={() => downloadBuild('web')}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white border-0"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Web App
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Code Preview & Build Output */}
          <div className="lg:col-span-3">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Generated Code</CardTitle>
                <CardDescription className="text-white/60">
                  Preview of the generated project files
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="app" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-white/5 border-white/10">
                    <TabsTrigger value="app" className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10">
                      App.tsx
                    </TabsTrigger>
                    <TabsTrigger value="package" className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10">
                      package.json
                    </TabsTrigger>
                    <TabsTrigger value="home" className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10">
                      HomeScreen.tsx
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="app" className="mt-4">
                    <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto max-h-96 overflow-y-auto">
                      <pre className="text-sm">
                        <code>{generatedFiles.find(f => f.name === 'App.tsx')?.content || 'Loading...'}</code>
                      </pre>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="package" className="mt-4">
                    <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto max-h-96 overflow-y-auto">
                      <pre className="text-sm">
                        <code>{generatedFiles.find(f => f.name === 'package.json')?.content || 'Loading...'}</code>
                      </pre>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="home" className="mt-4">
                    <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto max-h-96 overflow-y-auto">
                      <pre className="text-sm">
                        <code>{generatedFiles.find(f => f.name === 'HomeScreen.tsx')?.content || 'Loading...'}</code>
                      </pre>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Build Output Console */}
            {(buildOutput.length > 0) && (
              <Card className="mt-6 bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Build Output</CardTitle>
                  <CardDescription className="text-white/60">
                    Real-time build process output
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm max-h-64 overflow-y-auto">
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
            )}

            {/* Build Instructions */}
            {generationStatus === 'completed' && (
              <Card className="mt-6 bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Manual Build Commands</CardTitle>
                  <CardDescription className="text-white/60">
                    Use these commands to build manually if needed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border border-white/20 rounded-lg p-4">
                      <h4 className="font-medium mb-2 text-white">Local Development</h4>
                      <div className="bg-slate-900 text-slate-100 p-3 rounded text-sm font-mono">
                        npm install<br />
                        expo start
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {projectConfig?.platforms.includes('android') && (
                        <div className="border border-white/20 rounded-lg p-4">
                          <h4 className="font-medium mb-2 text-white">Android APK</h4>
                          <div className="bg-slate-900 text-slate-100 p-3 rounded text-sm font-mono">
                            eas build --platform android
                          </div>
                        </div>
                      )}
                      
                      {projectConfig?.platforms.includes('ios') && (
                        <div className="border border-white/20 rounded-lg p-4">
                          <h4 className="font-medium mb-2 text-white">iOS IPA</h4>
                          <div className="bg-slate-900 text-slate-100 p-3 rounded text-sm font-mono">
                            eas build --platform ios
                          </div>
                        </div>
                      )}
                      
                      {projectConfig?.platforms.includes('web') && (
                        <div className="border border-white/20 rounded-lg p-4">
                          <h4 className="font-medium mb-2 text-white">Web Deploy</h4>
                          <div className="bg-slate-900 text-slate-100 p-3 rounded text-sm font-mono">
                            expo build:web
                          </div>
                        </div>
                      )}
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