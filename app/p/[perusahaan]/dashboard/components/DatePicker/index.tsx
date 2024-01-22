"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils/utils"
import { formatStripDate } from "@/lib/formatter"

export function DatePicker({ selectedDate, disabled } : { selectedDate: (date: any) => void, disabled: boolean }) {
  const [date, setDate] = React.useState<Date>();
    
  const onDateChange = (newDate: any) => {
    setDate(newDate)
    const formattedDate = formatStripDate(newDate);
    selectedDate(formattedDate)
    console.log("date yang akan dikirim", formattedDate)
  }
    
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal dark:!bg-boxdark-2",
            !date && "text-muted-foreground"
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd-MM-yyyy") : <span>pilih tanggal</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          disabled={disabled}
          mode="single"
          selected={date}
          onSelect={onDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
