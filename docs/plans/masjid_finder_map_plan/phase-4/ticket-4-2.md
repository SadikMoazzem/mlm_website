# Ticket 2: Create filter dropdown components (Madhab, Type)

Complexity level: medium

Create dropdown chip components for filters with multiple options.

## Actions

### Action 1: Create FilterDropdownChip component

Action type: create file

Path: `src/app/masjids/finder/components/FilterDropdownChip.tsx`

Description: Create a dropdown chip component with popover:

```tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface FilterDropdownChipProps {
  label: string;
  value?: string;
  options: Option[];
  onChange: (value: string) => void;
}

export default function FilterDropdownChip({
  label,
  value,
  options,
  onChange,
}: FilterDropdownChipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);
  const hasValue = value && value !== '';

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative flex-shrink-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
          transition-colors border
          ${hasValue
            ? 'bg-emerald-600 text-white border-emerald-600'
            : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-300'
          }
        `}
      >
        <span>{hasValue ? selectedOption?.label : label}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[120px] z-20">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center justify-between gap-2 px-3 py-2 text-left text-sm
                hover:bg-gray-50 transition-colors
                ${option.value === value ? 'text-emerald-600 font-medium' : 'text-gray-700'}
              `}
            >
              {option.label}
              {option.value === value && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

**Features:**
- Shows current selection or label when empty
- Opens dropdown on click
- Closes on outside click or escape
- Check icon for selected option
- Styled differently when has a value

## Checks

- Dropdown opens and closes correctly
- Selection updates the chip appearance
- Click outside closes dropdown
- Escape key closes dropdown
- Selected option shows check mark
- Z-index correct for overlay

## Coding standards

N/A
