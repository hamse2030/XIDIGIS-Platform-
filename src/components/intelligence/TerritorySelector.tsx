import React, { useEffect } from 'react';

export type Territory = 'ALL' | 'SOMALIA' | 'SOMALILAND';

export interface TerritorySelectorProps {
  value: Territory;
  onChange: (territory: Territory) => void;
  isLoading?: boolean;
}

export function TerritorySelector({ value, onChange, isLoading = false }: TerritorySelectorProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement || 
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }
      
      if (isLoading) return;

      const key = e.key.toLowerCase();
      if (key === 'a') onChange('ALL');
      else if (key === 's') onChange('SOMALIA');
      else if (key === 'l') onChange('SOMALILAND');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onChange, isLoading]);

  const options: { id: Territory; label: string; shortcut: string }[] = [
    { id: 'ALL', label: 'All', shortcut: 'A' },
    { id: 'SOMALIA', label: 'Somalia', shortcut: 'S' },
    { id: 'SOMALILAND', label: 'Somaliland', shortcut: 'L' },
  ];

  return (
    <div className="inline-flex rounded border border-border bg-surface overflow-hidden">
      {options.map((option, index) => {
        const isActive = value === option.id;
        
        return (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            disabled={isLoading}
            title={`Shortcut: ${option.shortcut}`}
            className={`
              relative px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200
              ${isActive 
                ? 'bg-white text-black shadow-sm' 
                : 'bg-transparent text-text-muted hover:text-text-main hover:bg-surface-elevated'
              }
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              ${index !== options.length - 1 ? 'border-r border-border' : ''}
            `}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default TerritorySelector;
