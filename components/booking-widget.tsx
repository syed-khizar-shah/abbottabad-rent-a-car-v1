"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, MapPin, Clock } from "lucide-react"

export function BookingWidget() {
  const [pickupDate, setPickupDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [location, setLocation] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle booking logic here
    console.log({ pickupDate, returnDate, location })
  }

  return (
    <Card className="p-6 shadow-xl">
      <h3 className="text-xl font-bold mb-6">Quick Booking</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Pickup Location
          </Label>
          <Input
            id="location"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pickupDate" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Pickup
            </Label>
            <Input
              id="pickupDate"
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="returnDate" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Return
            </Label>
            <Input
              id="returnDate"
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
            />
          </div>
        </div>

        <Button type="submit" className="w-full" size="lg">
          Search Available Vehicles
        </Button>
      </form>
    </Card>
  )
}
