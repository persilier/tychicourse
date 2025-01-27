"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Dot } from "lucide-react"

interface InputOTPLightProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    value: string
    maxLength?: number
    onChange: (value: string) => void
    className?: string
}

const InputOTPLight = React.forwardRef<HTMLDivElement, InputOTPLightProps>(
    ({ value, maxLength = 6, onChange, className, disabled, ...props }, ref) => {
        const [focusedIndex, setFocusedIndex] = React.useState<number>(-1)
        const inputsRef = React.useRef<(HTMLInputElement | null)[]>([])

        const focusInput = (index: number) => {
            if (index >= 0 && index < maxLength) {
                inputsRef.current[index]?.focus()
                setFocusedIndex(index)
            }
        }

        const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Backspace") {
                e.preventDefault()
                if (value[index]) {
                    const newValue = value.slice(0, index) + value.slice(index + 1)
                    onChange(newValue)
                } else {
                    focusInput(index - 1)
                }
            } else if (e.key === "ArrowLeft") {
                e.preventDefault()
                focusInput(index - 1)
            } else if (e.key === "ArrowRight") {
                e.preventDefault()
                focusInput(index + 1)
            }
        }

        const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
            const newChar = e.target.value.slice(-1)
            if (newChar.match(/[0-9]/)) {
                const newValue = value.slice(0, index) + newChar + value.slice(index + 1)
                onChange(newValue)
                if (index < maxLength - 1) {
                    focusInput(index + 1)
                }
            }
        }

        const handlePaste = (e: React.ClipboardEvent) => {
            e.preventDefault()
            const pastedData = e.clipboardData.getData("text/plain").slice(0, maxLength)
            if (pastedData.match(/^[0-9]+$/)) {
                onChange(pastedData.padEnd(maxLength, ""))
                focusInput(Math.min(pastedData.length, maxLength - 1))
            }
        }

        return (
            <div
                ref={ref}
                className={cn(
                    "flex items-center justify-center gap-2",
                    className
                )}
            >
                {Array.from({ length: maxLength }).map((_, index) => (
                    <div
                        key={index}
                        className={cn(
                            "relative h-11 w-9 rounded-md border bg-background text-center text-base shadow-sm transition-all duration-200",
                            focusedIndex === index && "ring-2 ring-primary",
                            value[index] && "border-primary",
                            "after:absolute after:inset-x-0 after:bottom-2 after:h-px after:bg-muted-foreground/25",
                            disabled && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        <input
                            ref={(el) => {
                                inputsRef.current[index] = el
                            }}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={1}
                            disabled={disabled}
                            value={value[index] || ""}
                            onChange={(e) => handleChange(index, e)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onFocus={() => setFocusedIndex(index)}
                            onBlur={() => setFocusedIndex(-1)}
                            onPaste={handlePaste}
                            className={cn(
                                "absolute inset-0 h-full w-full rounded-md text-center text-base font-medium tracking-wider",
                                "bg-transparent focus:outline-none focus:ring-0",
                                "disabled:cursor-not-allowed"
                            )}
                            {...props}
                        />
                        {!value[index] && (
                            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                <Dot className="h-4 w-4 fill-muted-foreground/40" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        )
    }
)
InputOTPLight.displayName = "InputOTPLight"

export { InputOTPLight }
export type { InputOTPLightProps }