import React from 'react'
import { GripVertical, ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react'

interface SubmitTrackerColumnChipsProps {
  columnList: string[]
  hiddenColumns: Set<string>
  toggleColumnVisibility: (colName: string) => void
  draggedColIndex: number | null
  dragOverColIndex: number | null
  selectedColIndex: number | null
  handleDragStart: (e: React.DragEvent, index: number) => void
  handleDragEnter: (e: React.DragEvent, index: number) => void
  handleDragOver: (e: React.DragEvent, index: number) => void
  handleDrop: (e: React.DragEvent, index: number) => void
  handleDragEnd: () => void
  handleChipClick: (index: number) => void
  moveColumnLeft: (index: number) => void
  moveColumnRight: (index: number) => void
}

export function SubmitTrackerColumnChips({
  columnList,
  hiddenColumns,
  toggleColumnVisibility,
  draggedColIndex,
  dragOverColIndex,
  selectedColIndex,
  handleDragStart,
  handleDragEnter,
  handleDragOver,
  handleDrop,
  handleDragEnd,
  handleChipClick,
  moveColumnLeft,
  moveColumnRight,
}: SubmitTrackerColumnChipsProps) {
  const visibleCount = columnList.filter(c => !hiddenColumns.has(c)).length

  return (
    <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
          COLUMN LAYOUT ({visibleCount} VISIBLE / {columnList.length} TOTAL)
        </span>
        <span className="text-[10px] text-[#6B3BF6] font-bold flex items-center gap-1">
          <GripVertical className="w-3 h-3" />
          <span>Drag & drop chips to change column position</span>
        </span>
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        {columnList.map((col, index) => {
          const isHidden = hiddenColumns.has(col)
          const isDragging = draggedColIndex === index
          const isDragOver = dragOverColIndex === index
          const isSelected = selectedColIndex === index

          return (
            <div
              key={col}
              draggable
              onDragStart={e => handleDragStart(e, index)}
              onDragEnter={e => handleDragEnter(e, index)}
              onDragOver={e => handleDragOver(e, index)}
              onDrop={e => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              onClick={() => handleChipClick(index)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-2xs transition-all select-none cursor-grab active:cursor-grabbing ${
                isDragging
                  ? 'opacity-40 scale-95 border-2 border-dashed border-[#6B3BF6] bg-purple-50'
                  : isDragOver
                  ? 'ring-4 ring-[#6B3BF6]/40 scale-105 bg-purple-100 border-[#6B3BF6]'
                  : isSelected
                  ? 'ring-2 ring-amber-500 bg-amber-100 border-amber-400 scale-105'
                  : isHidden
                  ? 'bg-slate-100 text-slate-400 border border-slate-200 line-through'
                  : 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:border-emerald-400 hover:shadow-xs'
              }`}
              title="Drag or click to reorder position"
            >
              <div className={`flex items-center gap-1.5 ${draggedColIndex !== null ? 'pointer-events-none' : ''}`}>
                <span className="p-0.5 shrink-0">
                  <GripVertical className="w-3.5 h-3.5 text-slate-400 hover:text-slate-700" />
                </span>

                {index > 0 && (
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation()
                      moveColumnLeft(index)
                    }}
                    className="p-0.5 hover:bg-black/10 rounded text-slate-500 hover:text-slate-900 cursor-pointer shrink-0"
                  >
                    <ChevronLeft className="w-3 h-3" />
                  </button>
                )}

                <span className="whitespace-nowrap">{col}</span>

                {index < columnList.length - 1 && (
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation()
                      moveColumnRight(index)
                    }}
                    className="p-0.5 hover:bg-black/10 rounded text-slate-500 hover:text-slate-900 cursor-pointer shrink-0"
                  >
                    <ChevronRight className="w-3 h-3" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation()
                    toggleColumnVisibility(col)
                  }}
                  className="cursor-pointer hover:scale-110 transition-transform p-0.5 ml-0.5 shrink-0"
                >
                  {isHidden ? (
                    <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    <Eye className="w-3.5 h-3.5 text-emerald-700" />
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
