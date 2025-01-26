"use client"

import * as React from "react"
import Select, {
    components,
    DropdownIndicatorProps,
    GroupBase,
    Props,
    StylesConfig
} from "react-select"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export type CustomSelectProps<
    Option = unknown,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
> = Omit<Props<Option, IsMulti, Group>, "styles"> & {
    className?: string
}

export function CustomSelect<
    Option = unknown,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
>({
    className,
    components: customComponents,
    ...props
}: CustomSelectProps<Option, IsMulti, Group>) {
    const customStyles: StylesConfig<Option, IsMulti, Group> = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: "hsl(var(--background))",
            borderColor: state.isFocused
                ? "hsl(var(--ring))"
                : "hsl(var(--border))",
            borderRadius: "calc(var(--radius) - 2px)",
            borderWidth: "1px",
            boxShadow: state.isFocused
                ? "0 0 0 calc(var(--ring-offset-width)) hsl(var(--ring))"
                : "none",
            "&:hover": {
                borderColor: "hsl(var(--border))"
            },
            transition: "all 150ms"
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: "hsl(var(--background))",
            borderRadius: "calc(var(--radius) - 2px)",
            border: "1px solid hsl(var(--border))",
            boxShadow: "0 0 0 1px hsl(var(--border))",
            overflow: "hidden"
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? "hsl(var(--primary))"
                : state.isFocused
                    ? "hsl(var(--accent))"
                    : "transparent",
            color: state.isSelected
                ? "hsl(var(--primary-foreground))"
                : "hsl(var(--foreground))",
            cursor: "pointer",
            "&:active": {
                backgroundColor: "hsl(var(--accent))"
            }
        }),
        input: (provided) => ({
            ...provided,
            color: "hsl(var(--foreground))"
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "hsl(var(--foreground))"
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: "hsl(var(--secondary))",
            borderRadius: "calc(var(--radius) - 4px)",
            padding: "0 2px"
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: "hsl(var(--secondary-foreground))",
            fontSize: "0.875rem"
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: "hsl(var(--secondary-foreground))",
            "&:hover": {
                backgroundColor: "hsl(var(--destructive))",
                color: "hsl(var(--destructive-foreground))"
            }
        }),
        indicatorSeparator: () => ({
            display: "none"
        }),
        clearIndicator: (provided) => ({
            ...provided,
            cursor: "pointer",
            color: "hsl(var(--foreground))",
            "&:hover": {
                color: "hsl(var(--foreground))"
            }
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            cursor: "pointer",
            color: "hsl(var(--foreground))",
            "&:hover": {
                color: "hsl(var(--foreground))"
            }
        }),
        placeholder: (provided) => ({
            ...provided,
            color: "hsl(var(--muted-foreground))"
        }),
        // Ajout des styles pour le groupe
        group: (provided) => ({
            ...provided,
            padding: 0
        }),
        groupHeading: (provided) => ({
            ...provided,
            color: "hsl(var(--muted-foreground))",
            fontSize: "0.875rem",
            fontWeight: "500",
            marginBottom: "0.5rem",
            padding: "0.5rem 0.75rem",
            textTransform: "none"
        })
    }

    return (
        <Select
            {...props}
            styles={customStyles}
            components={{
                DropdownIndicator: (props) => (
                    <components.DropdownIndicator {...props}>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                    </components.DropdownIndicator>
                ),
                ...customComponents,
            }}
            className={cn("w-full", className)}
            classNamePrefix="custom-select"
            theme={(theme) => ({
                ...theme,
                colors: {
                    ...theme.colors,
                    primary: "hsl(var(--primary))",
                    primary75: "hsl(var(--primary)/.75)",
                    primary50: "hsl(var(--primary)/.5)",
                    primary25: "hsl(var(--primary)/.25)",
                    danger: "hsl(var(--destructive))",
                    dangerLight: "hsl(var(--destructive)/.1)"
                }
            })}
        />
    )
}