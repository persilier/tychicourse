"use client";

import * as React from "react";
import ReactDatePicker from "react-datepicker";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import "react-datepicker/dist/react-datepicker.css";
import { cva, type VariantProps } from "class-variance-authority";

const datePickerVariants = cva(
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        success: "border-success/50 focus-visible:ring-success",
        warning: "border-warning/50 focus-visible:ring-warning",
        destructive:
          "border-destructive/50 bg-destructive/5 focus-visible:ring-destructive",
        info: "border-info/50 focus-visible:ring-info",
      },
      size: {
        default: "h-10",
        sm: "h-8 px-2 text-xs",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface DatePickerProps
  extends VariantProps<typeof datePickerVariants> {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  className?: string;
  error?: string;
  label?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  showTimeSelect?: boolean;
  timeFormat?: string;
  dateFormat?: string;
  isClearable?: boolean;
  required?: boolean;
  timeIntervals?: number;
  showTimeSelectOnly?: boolean;
  timeCaption?: string;
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      placeholder = "Select date",
      className,
      error,
      label,
      variant,
      size,
      minDate,
      maxDate,
      disabled,
      showTimeSelect = false,
      timeFormat = "HH:mm",
      dateFormat = showTimeSelect ? "MM/dd/yyyy HH:mm" : "MM/dd/yyyy",
      isClearable = true,
      required = false,
      timeIntervals = 15,
      showTimeSelectOnly = false,
      timeCaption = "Time",
    },
    ref
  ) => {
    const CustomInput = React.forwardRef<HTMLInputElement, any>(
      ({ value, onClick, onChange }, ref) => (
        <div className="relative">
          <input
            ref={ref}
            value={value}
            onChange={onChange}
            onClick={onClick}
            className={cn(
              datePickerVariants({ variant, size }),
              error &&
                "border-destructive bg-destructive/5 focus-visible:ring-destructive",
              "cursor-pointer pl-10",
              className
            )}
            placeholder={placeholder}
            readOnly
          />
          <Icon
            icon={
              showTimeSelectOnly
                ? "solar:clock-circle-bold-duotone"
                : "solar:calendar-bold-duotone"
            }
            className={cn(
              "absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground",
              error && "text-destructive"
            )}
          />
        </div>
      )
    );
    CustomInput.displayName = "CustomInput";

    const renderCustomHeader = ({
      date,
      changeYear,
      changeMonth,
      decreaseMonth,
      increaseMonth,
      prevMonthButtonDisabled,
      nextMonthButtonDisabled,
    }: any) => (
      <div className="flex items-center justify-between px-2 py-2">
        <button
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
          type="button"
          className={cn(
            "p-1.5 rounded-md hover:bg-muted",
            prevMonthButtonDisabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <Icon icon="solar:alt-arrow-left-bold-duotone" className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <select
            value={date.getFullYear()}
            onChange={({ target: { value } }) => changeYear(Number(value))}
            className="p-1 rounded-md bg-background border border-input hover:bg-muted"
          >
            {Array.from(
              { length: 20 },
              (_, i) => date.getFullYear() - 10 + i
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            value={date.getMonth()}
            onChange={({ target: { value } }) => changeMonth(Number(value))}
            className="p-1 rounded-md bg-background border border-input hover:bg-muted"
          >
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
          type="button"
          className={cn(
            "p-1.5 rounded-md hover:bg-muted",
            nextMonthButtonDisabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <Icon icon="solar:alt-arrow-right-bold-duotone" className="h-5 w-5" />
        </button>
      </div>
    );

    return (
      <div ref={ref} className="w-full">
        {label && (
          <label className="text-sm font-medium mb-1.5 block">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <ReactDatePicker
            selected={value}
            onChange={onChange}
            customInput={<CustomInput />}
            renderCustomHeader={
              !showTimeSelectOnly ? renderCustomHeader : undefined
            }
            minDate={minDate}
            maxDate={maxDate}
            disabled={disabled}
            showTimeSelect={showTimeSelect}
            showTimeSelectOnly={showTimeSelectOnly}
            timeFormat={timeFormat}
            timeIntervals={timeIntervals}
            timeCaption={timeCaption}
            dateFormat={dateFormat}
            isClearable={isClearable}
            className="w-full"
            calendarClassName="shadow-lg border border-border rounded-lg p-2 bg-background"
            wrapperClassName="w-full"
            popperClassName="!z-[9999] relative"
            showPopperArrow={false}
            popperPlacement="bottom-start"
            portalId="date-picker-portal"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            timeClassName={() => "text-sm"}
            dayClassName={(date) =>
              cn(
                "rounded hover:bg-muted",
                date.toDateString() === (value?.toDateString() ?? "") &&
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
              )
            }
          />
        </div>
        {error && <p className="text-sm text-destructive mt-1.5">{error}</p>}
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";

export { DatePicker };
