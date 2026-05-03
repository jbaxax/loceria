import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface DatePickerProps {
  label?: string;
  value?: string | Date | null;
  onChange?: (value?: string) => void;
  onSelect?: (date: Date) => void;

  placeholder?: string;
  disabled?: boolean;
  disabledCalendar?: boolean | ((date: Date) => boolean);
  className?: string;
}

const formatDateLocal = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const parseLocalDate = (value: string | Date) => {
  if (value instanceof Date) return value;
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const fixDayPickerDate = (date: Date) => {
  const fixed = new Date(date);
  fixed.setHours(12, 0, 0, 0);
  return fixed;
};

export function DatePicker({
  label,
  value,
  onChange,
  onSelect,
  placeholder = "Seleccionar Fecha",
  disabled = false,
  disabledCalendar = false,
  className,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  const displayValue = value
    ? fixDayPickerDate(parseLocalDate(value))
    : undefined;

  const handleSelectDate = (date: Date | undefined) => {
    if (date) {
      const fixed = fixDayPickerDate(date);
      const formatted = formatDateLocal(fixed);

      onChange?.(formatted);
      onSelect?.(fixed);
    } else {
      onChange?.(undefined);
    }

    setOpen(false);
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <Label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">
          {label}
        </Label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full pl-3 text-left font-normal focus:ring-primary/30 focus:border-primary/50",
              !displayValue && "text-muted-foreground",
            )}
          >
            {displayValue
              ? displayValue.toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : placeholder}

            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={displayValue}
            onSelect={handleSelectDate}
            captionLayout="dropdown"
            disabled={disabledCalendar}
            defaultMonth={displayValue}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}