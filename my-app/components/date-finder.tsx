"use client"

import { useState, useEffect } from "react"
import { format, parse } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { scheduleData } from "./data/schedule-data"
import { sortDates } from "./utils/date-utils"
import { Loader2 } from 'lucide-react'

export default function DateFinder() {
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [sortedDates, setSortedDates] = useState<string[]>([])

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
  }

  const formatDate = (dateString: string) => {
    return format(parse(dateString, "yyyy-MM-dd", new Date()), "EEEE, MMMM d, yyyy")
  }

  useEffect(() => {
    const sortDatesAsync = async () => {
      const sorted = await sortDates(Object.keys(scheduleData))
      setSortedDates(sorted)
      setIsLoading(false)
    }
    sortDatesAsync()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Select a Hire Date</CardTitle>
        </CardHeader>
        <CardContent>
          <Select onValueChange={handleDateSelect} value={selectedDate} disabled={isLoading}>
            <SelectTrigger className="w-full">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <SelectValue placeholder="Choose a hire date" />
              )}
            </SelectTrigger>
            <SelectContent>
              {sortedDates.map((date) => (
                <SelectItem key={date} value={date}>
                  {formatDate(date)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle>Hire Date Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date Type</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Benefits-Eligible Deadline</TableCell>
                  <TableCell>{formatDate(scheduleData[selectedDate].benefitsEligibleDeadline)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Non-Benefits-Eligible Deadline</TableCell>
                  <TableCell>{formatDate(scheduleData[selectedDate].nonBenefitsEligibleDeadline)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Hire Date</TableCell>
                  <TableCell>{formatDate(scheduleData[selectedDate].hireDate)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Onboarding Date</TableCell>
                  <TableCell>{formatDate(scheduleData[selectedDate].onboardingDate)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Employee Types</TableCell>
                  <TableCell>{scheduleData[selectedDate].employeeTypes}</TableCell>
                </TableRow>
                {scheduleData[selectedDate].notes && (
                  <TableRow>
                    <TableCell>Notes</TableCell>
                    <TableCell>{scheduleData[selectedDate].notes}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

