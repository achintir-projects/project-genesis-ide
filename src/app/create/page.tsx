'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, Smartphone, Globe, Palette, Database, Settings, Image } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CreateProject() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    appName: "",
    platforms: [],
    features: [],
    screens: "",
    navigation: "",
    uiStyle: "",
    dataApis: "",
    deviceFeatures: [],
    iconSplash: ""
  })

  const [activeTab, setActiveTab] = useState("basic")

  const platformOptions = [
    { id: "android", label: "Android", icon: Smartphone },
    { id: "ios", label: "iOS", icon: Smartphone },
    { id: "web", label: "Web", icon: Globe }
  ]

  const featureOptions = [
    "Login/Authentication",
    "User Profiles",
    "Push Notifications",
    "Payments",
    "Chat/Messaging",
    "Social Feed",
    "Image Upload",
    "GPS/Location",
    "Offline Mode",
    "Camera Integration",
    "QR Code Scanner",
    "Search Functionality",
    "Dark Mode",
    "Multi-language Support",
    "Data Analytics"
  ]

  const navigationOptions = [
    "Tab-based Navigation",
    "Stack Navigation",
    "Drawer Navigation",
    "Bottom Tab with Stack Navigation",
    "Mixed Navigation (Tabs + Stack + Drawer)"
  ]

  const uiStyleOptions = [
    "Minimalist",
    "Material Design",
    "iOS Human Interface",
    "Dark Mode",
    "Modern Corporate",
    "Colorful & Playful",
    "Professional Clean",
    "Neumorphic"
  ]

  const deviceFeatureOptions = [
    "Camera",
    "GPS/Location",
    "Push Notifications",
    "Payments",
    "Accelerometer",
    "Gyroscope",
    "Biometric Authentication",
    "Bluetooth",
    "NFC",
    "Microphone",
    "Contacts",
    "Calendar",
    "Sensors"
  ]

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const generateApp = () => {
    // Store form data in localStorage for the generate page to access
    localStorage.setItem('projectConfig', JSON.stringify(formData))
    router.push("/generate")
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
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Create New Project
            </h1>
            <p className="text-white/60 text-lg">
              Describe your app and we'll generate a complete React Native/Expo project for you.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-xl text-white">Project Configuration</CardTitle>
                <CardDescription className="text-white/60">
                  Fill in the details about the app you want to create
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-white/5 border-white/10">
                    <TabsTrigger value="basic" className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10">
                      Basic Info
                    </TabsTrigger>
                    <TabsTrigger value="features" className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10">
                      Features
                    </TabsTrigger>
                    <TabsTrigger value="design" className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10">
                      Design
                    </TabsTrigger>
                    <TabsTrigger value="advanced" className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10">
                      Advanced
                    </TabsTrigger>
                  </TabsList>

                  {/* Basic Info Tab */}
                  <TabsContent value="basic" className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="appName" className="text-white">App Name</Label>
                        <Input
                          id="appName"
                          placeholder="My Awesome App"
                          value={formData.appName}
                          onChange={(e) => handleInputChange("appName", e.target.value)}
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>

                      <div>
                        <Label className="text-white">Target Platforms</Label>
                        <div className="grid grid-cols-3 gap-4 mt-2">
                          {platformOptions.map((platform) => {
                            const Icon = platform.icon
                            return (
                              <div
                                key={platform.id}
                                className={`flex items-center space-x-2 p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                                  formData.platforms.includes(platform.id)
                                    ? "border-blue-400 bg-blue-400/20 shadow-lg shadow-blue-400/20"
                                    : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
                                }`}
                                onClick={() => handleCheckboxChange("platforms", platform.id)}
                              >
                                <Checkbox
                                  checked={formData.platforms.includes(platform.id)}
                                  onChange={() => handleCheckboxChange("platforms", platform.id)}
                                  className="data-[state=checked]:bg-blue-400 data-[state=checked]:border-blue-400"
                                />
                                <Icon className="h-5 w-5 text-white" />
                                <span className="font-medium text-white">{platform.label}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="screens" className="text-white">Screens & Layouts</Label>
                        <Textarea
                          id="screens"
                          placeholder="Describe the main screens and layouts (e.g., Home screen with list of items, Profile screen with user info, Settings screen)"
                          value={formData.screens}
                          onChange={(e) => handleInputChange("screens", e.target.value)}
                          rows={4}
                          className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  {/* Features Tab */}
                  <TabsContent value="features" className="space-y-6">
                    <div>
                      <Label className="text-white">Core Features</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                        {featureOptions.map((feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <Checkbox
                              id={feature}
                              checked={formData.features.includes(feature)}
                              onCheckedChange={() => handleCheckboxChange("features", feature)}
                              className="data-[state=checked]:bg-blue-400 data-[state=checked]:border-blue-400"
                            />
                            <Label htmlFor={feature} className="text-sm font-normal cursor-pointer text-white/80">
                              {feature}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator className="bg-white/10" />

                    <div>
                      <Label className="text-white">Device Features</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                        {deviceFeatureOptions.map((feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <Checkbox
                              id={feature}
                              checked={formData.deviceFeatures.includes(feature)}
                              onCheckedChange={() => handleCheckboxChange("deviceFeatures", feature)}
                              className="data-[state=checked]:bg-blue-400 data-[state=checked]:border-blue-400"
                            />
                            <Label htmlFor={feature} className="text-sm font-normal cursor-pointer text-white/80">
                              {feature}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Design Tab */}
                  <TabsContent value="design" className="space-y-6">
                    <div>
                      <Label htmlFor="navigation" className="text-white">Navigation Style</Label>
                      <Select value={formData.navigation} onValueChange={(value) => handleInputChange("navigation", value)}>
                        <SelectTrigger className="bg-white/5 border-white/20 text-white">
                          <SelectValue placeholder="Select navigation style" />
                        </SelectTrigger>
                        <SelectContent className="bg-white/10 border-white/20 text-white">
                          {navigationOptions.map((option) => (
                            <SelectItem key={option} value={option} className="hover:bg-white/20">
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="uiStyle" className="text-white">UI Style</Label>
                      <Select value={formData.uiStyle} onValueChange={(value) => handleInputChange("uiStyle", value)}>
                        <SelectTrigger className="bg-white/5 border-white/20 text-white">
                          <SelectValue placeholder="Select UI style" />
                        </SelectTrigger>
                        <SelectContent className="bg-white/10 border-white/20 text-white">
                          {uiStyleOptions.map((option) => (
                            <SelectItem key={option} value={option} className="hover:bg-white/20">
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="iconSplash" className="text-white">Icon & Splash Screen</Label>
                      <Input
                        id="iconSplash"
                        placeholder="Describe your desired app icon and splash screen design"
                        value={formData.iconSplash}
                        onChange={(e) => handleInputChange("iconSplash", e.target.value)}
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                  </TabsContent>

                  {/* Advanced Tab */}
                  <TabsContent value="advanced" className="space-y-6">
                    <div>
                      <Label htmlFor="dataApis" className="text-white">Data & APIs</Label>
                      <Textarea
                        id="dataApis"
                        placeholder="Describe your data requirements (e.g., Mock API endpoints, Firebase integration, local JSON storage, etc.)"
                        value={formData.dataApis}
                        onChange={(e) => handleInputChange("dataApis", e.target.value)}
                        rows={4}
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const tabs = ["basic", "features", "design", "advanced"]
                      const currentIndex = tabs.indexOf(activeTab)
                      if (currentIndex > 0) {
                        setActiveTab(tabs[currentIndex - 1])
                      }
                    }}
                    disabled={activeTab === "basic"}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        const tabs = ["basic", "features", "design", "advanced"]
                        const currentIndex = tabs.indexOf(activeTab)
                        if (currentIndex < tabs.length - 1) {
                          setActiveTab(tabs[currentIndex + 1])
                        }
                      }}
                      disabled={activeTab === "advanced"}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    
                    <Button 
                      onClick={generateApp} 
                      disabled={!formData.appName || formData.platforms.length === 0}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                    >
                      Generate App
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-lg text-white">Project Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-white/60">App Name</Label>
                  <p className="font-medium text-white">{formData.appName || "Not set"}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-white/60">Platforms</Label>
                  <div className="flex gap-1 flex-wrap mt-1">
                    {formData.platforms.length > 0 ? (
                      formData.platforms.map((platform) => (
                        <Badge key={platform} variant="secondary" className="bg-white/10 text-white border-white/20 text-xs">
                          {platform}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-white/50">None selected</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-white/60">Features</Label>
                  <div className="flex gap-1 flex-wrap mt-1">
                    {formData.features.length > 0 ? (
                      formData.features.slice(0, 3).map((feature) => (
                        <Badge key={feature} variant="outline" className="border-white/20 text-white text-xs">
                          {feature}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-white/50">None selected</p>
                    )}
                    {formData.features.length > 3 && (
                      <Badge variant="outline" className="border-white/20 text-white text-xs">
                        +{formData.features.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {formData.navigation && (
                  <div>
                    <Label className="text-sm font-medium text-white/60">Navigation</Label>
                    <p className="text-sm text-white/80">{formData.navigation}</p>
                  </div>
                )}

                {formData.uiStyle && (
                  <div>
                    <Label className="text-sm font-medium text-white/60">UI Style</Label>
                    <p className="text-sm text-white/80">{formData.uiStyle}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}