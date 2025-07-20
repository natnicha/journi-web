import { DayPicker } from 'react-day-picker';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { CalendarDays } from 'lucide-react';
import { Button } from '@radix-ui/themes';
import { format } from 'date-fns';
import { useState } from 'react'
import type { Range } from './PlaceInfo';
import './TripDatePicker.css';

interface TripDatePickerProps {
  setItinerary: React.Dispatch<React.SetStateAction<String[]>>;
}

export function TripDatePicker({setItinerary} : TripDatePickerProps ) {
  const [range, setRange] = useState<Range>({ from: new Date(), to: new Date()});
  
  const formatRange = () => {
    if (range.from && range.to) {
      return `${format(range.from, 'PPP')} → ${format(range.to, 'PPP')}`;
    } else if (range.from) {
      return `${format(range.from, 'PPP')} → ...`;
    }
    return 'Pick a date range';
  };
  
  function addDays(currentDate: Date): Date { 
    let date = new Date(currentDate);
    date.setDate(date.getDate() + 1);
    return date;
  }

  const setItineraryDates = (fromDate: Date | undefined, toDate: Date | undefined) => {
    if (!fromDate || !toDate) {
      return [];
    }
    let currentDate: Date = fromDate;
    let itinerary = [];
    while (currentDate <= toDate) { 
        itinerary.push(currentDate.toLocaleDateString());
        currentDate = addDays(currentDate);
    }
    setItinerary(itinerary)
    return itinerary;
  }

  return (
    <div className='date-picker-panel'>
      <Popover >
        <PopoverTrigger asChild>
          <Button className="date-picker-button" variant="solid" size="2" radius="large">
          <CalendarDays className="w-4 h-4" />
          {formatRange()}
          </Button>
        </PopoverTrigger>
        <PopoverContent  side="bottom" align="center" className='date-picker-content'>
          <DayPicker
            mode="range"
            selected={range}
            onSelect={(selected) => {
              if (selected) {
                setRange({ from: selected.from, to: selected.to });
                setItineraryDates(selected.from , selected.to);
              } else {
                setRange({ from: undefined, to: undefined });
              }
          }}
          numberOfMonths={2}
          showOutsideDays
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default TripDatePicker;