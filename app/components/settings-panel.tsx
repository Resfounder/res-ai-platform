"use client"

import { useState } from "react"
import { Save, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export function SettingsPanel() {
  const [businessName, setBusinessName] = useState("Bella's Italian Bistro")
  const [businessType, setBusinessType] = useState("restaurant")
  const [brandVoice, setBrandVoice] = useState(
    "We're a family-owned Italian restaurant that's been serving authentic dishes for over 20 years. We pride ourselves on warm hospitality and traditional recipes passed down through generations.",
  )

  const platforms = [
    { name: "Google Reviews", connected: true, id: "google" },
    { name: "Yelp", connected: true, id: "yelp" },
    { name: "Facebook", connected: false, id: "facebook" },
    { name: "TripAdvisor", connected: false, id: "tripadvisor" },
  ]

  const responseTemplates = [
    { id: 1, name: "Positive Review", trigger: "5-star reviews" },
    { id: 2, name: "Mixed Review", trigger: "3-4 star reviews" },
    { id: 3, name: "Negative Review", trigger: "1-2 star reviews" },
    { id: 4, name: "Food Complaint", trigger: "Contains 'food' + negative sentiment" },
  ]

  return (
    <div className="space-y-6">
      {/* Business Information */}
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>Configure your business details for personalized responses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="business-name">Business Name</Label>
              <Input id="business-name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business-type">Business Type</Label>
              <Select value={businessType} onValueChange={setBusinessType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="retail">Retail Store</SelectItem>
                  <SelectItem value="salon">Salon/Spa</SelectItem>
                  <SelectItem value="hotel">Hotel</SelectItem>
                  <SelectItem value="service">Service Business</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="brand-voice">Brand Voice & Personality</Label>
            <Textarea
              id="brand-voice"
              value={brandVoice}
              onChange={(e) => setBrandVoice(e.target.value)}
              placeholder="Describe your business personality, values, and how you want to communicate with customers..."
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Platform Connections */}
      <Card>
        <CardHeader>
          <CardTitle>Connected Platforms</CardTitle>
          <CardDescription>Manage your review platform integrations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {platforms.map((platform) => (
            <div key={platform.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-medium">{platform.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium">{platform.name}</p>
                  <p className="text-sm text-gray-500">{platform.connected ? "Connected" : "Not connected"}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {platform.connected && <Badge variant="default">Active</Badge>}
                <Button variant={platform.connected ? "outline" : "default"} size="sm">
                  {platform.connected ? "Disconnect" : "Connect"}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Settings */}
      <Card>
        <CardHeader>
          <CardTitle>AI Response Settings</CardTitle>
          <CardDescription>Configure how AI generates your responses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-respond to positive reviews</Label>
              <p className="text-sm text-gray-500">Automatically post responses to 4-5 star reviews</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Require approval for negative reviews</Label>
              <p className="text-sm text-gray-500">Always review responses to 1-3 star reviews before posting</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Include business owner signature</Label>
              <p className="text-sm text-gray-500">Add "- [Owner Name]" to all responses</p>
            </div>
            <Switch />
          </div>
          <div className="space-y-2">
            <Label>Response delay (minutes)</Label>
            <Select defaultValue="30">
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Immediate</SelectItem>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Response Templates */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Response Templates</CardTitle>
              <CardDescription>Customize AI response patterns for different scenarios</CardDescription>
            </div>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Template
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {responseTemplates.map((template) => (
            <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{template.name}</p>
                <p className="text-sm text-gray-500">Trigger: {template.trigger}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
