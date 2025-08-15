"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Truck,
  Package,
  Clock,
  TrendingUp,
  BarChart3,
  Zap,
  Shield,
  Navigation,
  AlertTriangle,
  Warehouse,
  RefreshCw,
  CheckCircle,
} from "lucide-react"

export default function LogisticsDashboard() {
  const [loadCapacity, setLoadCapacity] = useState(75)
  const [deliveryPriority, setDeliveryPriority] = useState(3)
  const [processingTime, setProcessingTime] = useState(4)
  const [selectedScenario, setSelectedScenario] = useState("")

  // Dynamic metrics calculation
  const calculateMetrics = () => {
    const baseETA = 24 - deliveryPriority * 2 + processingTime * 0.5
    const efficiency = Math.min(95, loadCapacity * 0.8 + deliveryPriority * 5 - processingTime * 2)
    const costPerPackage = Math.max(2.5, 8 - loadCapacity * 0.05 - deliveryPriority * 0.3 + processingTime * 0.2)
    const emissions = Math.max(0.5, 3.2 - loadCapacity * 0.02 + processingTime * 0.1)
    const delayRisk = Math.max(5, 45 - loadCapacity * 0.3 - deliveryPriority * 8 + processingTime * 3)

    return {
      eta: Math.round(baseETA * 10) / 10,
      efficiency: Math.round(efficiency),
      cost: Math.round(costPerPackage * 100) / 100,
      emissions: Math.round(emissions * 100) / 100,
      delayRisk: Math.round(delayRisk),
    }
  }

  const metrics = calculateMetrics()

  const handleScenarioChange = (scenario: string) => {
    setSelectedScenario(scenario)
    switch (scenario) {
      case "holiday-rush":
        setLoadCapacity(95)
        setDeliveryPriority(5)
        setProcessingTime(2)
        break
      case "low-fuel":
        setLoadCapacity(60)
        setDeliveryPriority(2)
        setProcessingTime(6)
        break
      case "peak-warehouse":
        setLoadCapacity(85)
        setDeliveryPriority(4)
        setProcessingTime(3)
        break
      default:
        break
    }
  }

  const getStatusColor = (value: number, type: "efficiency" | "delay") => {
    if (type === "efficiency") {
      return value >= 80 ? "text-green-500" : value >= 60 ? "text-yellow-500" : "text-red-500"
    } else {
      return value <= 20 ? "text-green-500" : value <= 40 ? "text-yellow-500" : "text-red-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">LogiFlow Dashboard</h1>
            <p className="text-slate-600 mt-1 text-sm sm:text-base">Real-time logistics automation control center</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs sm:text-sm">
              <CheckCircle className="w-3 h-3 mr-1" />
              System Online
            </Badge>
          </div>
        </div>

        {/* 1. Immediate Interactive Dashboard */}
        <Card className="glass-panel p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Load Capacity Slider */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <h3 className="font-semibold text-slate-900 text-sm sm:text-base">Load Capacity</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm text-slate-600">
                  <span>0%</span>
                  <span className="font-medium text-blue-600">{loadCapacity}%</span>
                  <span>100%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={loadCapacity}
                  onChange={(e) => setLoadCapacity(Number(e.target.value))}
                  className="custom-slider w-full"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${loadCapacity}%, #e5e7eb ${loadCapacity}%, #e5e7eb 100%)`,
                  }}
                />
              </div>
            </div>

            {/* Delivery Priority Slider */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                <h3 className="font-semibold text-slate-900 text-sm sm:text-base">Delivery Priority</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm text-slate-600">
                  <span>Low</span>
                  <span className="font-medium text-green-600">Level {deliveryPriority}</span>
                  <span>High</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={deliveryPriority}
                  onChange={(e) => setDeliveryPriority(Number(e.target.value))}
                  className="custom-slider w-full"
                  style={{
                    background: `linear-gradient(to right, #10b981 0%, #10b981 ${(deliveryPriority - 1) * 25}%, #e5e7eb ${(deliveryPriority - 1) * 25}%, #e5e7eb 100%)`,
                  }}
                />
              </div>
            </div>

            {/* Processing Time Slider */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                <h3 className="font-semibold text-slate-900 text-sm sm:text-base">Processing Time</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm text-slate-600">
                  <span>1h</span>
                  <span className="font-medium text-orange-600">{processingTime}h</span>
                  <span>8h</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={processingTime}
                  onChange={(e) => setProcessingTime(Number(e.target.value))}
                  className="custom-slider w-full"
                  style={{
                    background: `linear-gradient(to right, #f97316 0%, #f97316 ${((processingTime - 1) / 7) * 100}%, #e5e7eb ${((processingTime - 1) / 7) * 100}%, #e5e7eb 100%)`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Dynamic Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            <div className="bg-white/50 rounded-lg p-3 sm:p-4 text-center">
              <div className="text-lg sm:text-2xl font-bold text-slate-900">{metrics.eta}h</div>
              <div className="text-xs sm:text-sm text-slate-600">ETA</div>
            </div>
            <div className="bg-white/50 rounded-lg p-3 sm:p-4 text-center">
              <div className={`text-lg sm:text-2xl font-bold ${getStatusColor(metrics.efficiency, "efficiency")}`}>
                {metrics.efficiency}%
              </div>
              <div className="text-xs sm:text-sm text-slate-600">Efficiency</div>
            </div>
            <div className="bg-white/50 rounded-lg p-3 sm:p-4 text-center">
              <div className="text-lg sm:text-2xl font-bold text-slate-900">${metrics.cost}</div>
              <div className="text-xs sm:text-sm text-slate-600">Cost/Package</div>
            </div>
            <div className="bg-white/50 rounded-lg p-3 sm:p-4 text-center">
              <div className="text-lg sm:text-2xl font-bold text-slate-900">{metrics.emissions}kg</div>
              <div className="text-xs sm:text-sm text-slate-600">CO₂/Package</div>
            </div>
            <div className="bg-white/50 rounded-lg p-3 sm:p-4 text-center col-span-2 sm:col-span-1">
              <div className={`text-lg sm:text-2xl font-bold ${getStatusColor(metrics.delayRisk, "delay")}`}>
                {metrics.delayRisk}%
              </div>
              <div className="text-xs sm:text-sm text-slate-600">Delay Risk</div>
            </div>
          </div>
        </Card>

        {/* 2. Smart Logistics Metrics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="glass-panel p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              <h3 className="font-semibold text-slate-900 text-sm sm:text-base">Dynamic Forecast</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-xs sm:text-sm text-slate-600">Next 24h Volume</span>
                <span className="font-medium text-sm sm:text-base">{Math.round(1200 + loadCapacity * 8)}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, loadCapacity * 0.8 + 20)}%` }}
                ></div>
              </div>
            </div>
          </Card>

          <Card className="glass-panel p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <Navigation className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              <h3 className="font-semibold text-slate-900 text-sm sm:text-base">Route Optimization</h3>
            </div>
            <div className="space-y-2">
              <div className="text-xl sm:text-2xl font-bold text-green-600">
                {Math.round(85 + deliveryPriority * 2 - processingTime * 1.5)}%
              </div>
              <div className="text-xs sm:text-sm text-slate-600">AI Score</div>
            </div>
          </Card>

          <Card className="glass-panel p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              <h3 className="font-semibold text-slate-900 text-sm sm:text-base">Fleet Utilization</h3>
            </div>
            <div className="space-y-2">
              <div className="text-xl sm:text-2xl font-bold text-purple-600">{Math.round(loadCapacity * 0.9)}%</div>
              <div className="text-xs sm:text-sm text-slate-600">Active Vehicles</div>
            </div>
          </Card>

          <Card className="glass-panel p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <Warehouse className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
              <h3 className="font-semibold text-slate-900 text-sm sm:text-base">Warehouse Load</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-orange-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, loadCapacity + processingTime * 3)}%` }}
                  ></div>
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-900 whitespace-nowrap">
                  {Math.min(100, Math.round(loadCapacity + processingTime * 3))}%
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* 3. System Intelligence Features */}
        <Card className="glass-panel p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6">System Intelligence Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            <Button
              variant="outline"
              className="h-auto p-3 sm:p-4 flex flex-col items-center gap-2 hover:bg-blue-50 bg-transparent"
            >
              <Navigation className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              <span className="text-xs sm:text-sm font-medium text-center">Predictive Route Planning</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-3 sm:p-4 flex flex-col items-center gap-2 hover:bg-green-50 bg-transparent"
            >
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              <span className="text-xs sm:text-sm font-medium text-center">Demand Forecasting</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-3 sm:p-4 flex flex-col items-center gap-2 hover:bg-purple-50 bg-transparent"
            >
              <Warehouse className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              <span className="text-xs sm:text-sm font-medium text-center">Warehouse Automation</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-3 sm:p-4 flex flex-col items-center gap-2 hover:bg-red-50 bg-transparent"
            >
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              <span className="text-xs sm:text-sm font-medium text-center">Real-Time Alerts</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-3 sm:p-4 flex flex-col items-center gap-2 hover:bg-orange-50 bg-transparent sm:col-span-2 lg:col-span-1"
            >
              <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
              <span className="text-xs sm:text-sm font-medium text-center">Cross-Dock Optimization</span>
            </Button>
          </div>
        </Card>

        {/* 4. Compliance & Trust Indicators */}
        <Card className="glass-panel p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 sm:gap-6">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                <Shield className="w-3 h-3 mr-1" />
                GDPR Compliant
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                <CheckCircle className="w-3 h-3 mr-1" />
                ISO 27001
              </Badge>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs">
                <Zap className="w-3 h-3 mr-1" />
                Blockchain Audit
              </Badge>
            </div>
            <div className="text-xs sm:text-sm text-slate-600">Enterprise Security Standards</div>
          </div>
        </Card>

        {/* 5. Test Mode Panel */}
        <Card className="glass-panel p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Test Scenario Mode</h2>
            <Select value={selectedScenario} onValueChange={handleScenarioChange}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Select a scenario" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="holiday-rush">Holiday Rush</SelectItem>
                <SelectItem value="low-fuel">Low Fuel Efficiency</SelectItem>
                <SelectItem value="peak-warehouse">Peak Warehouse Load</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="bg-white/30 rounded-lg p-3">
              <div className="font-medium text-slate-900">Holiday Rush</div>
              <div className="text-slate-600">High capacity, max priority, fast processing</div>
            </div>
            <div className="bg-white/30 rounded-lg p-3">
              <div className="font-medium text-slate-900">Low Fuel Efficiency</div>
              <div className="text-slate-600">Reduced capacity, low priority, slow processing</div>
            </div>
            <div className="bg-white/30 rounded-lg p-3">
              <div className="font-medium text-slate-900">Peak Warehouse Load</div>
              <div className="text-slate-600">High capacity, high priority, moderate processing</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
