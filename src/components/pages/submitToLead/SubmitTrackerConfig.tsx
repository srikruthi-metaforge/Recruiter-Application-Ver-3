import React from 'react'
import { CLIENT_TRACKER_PRESETS } from './submitToLeadData'
import { SubmitTrackerColumnChips } from './SubmitTrackerColumnChips'

interface SubmitTrackerConfigProps {
  clientName: string
  handleClientChange: (newClient: string) => void
  headerColor: string
  setHeaderColor: (color: string) => void
  columnList: string[]
  setColumnList: React.Dispatch<React.SetStateAction<string[]>>
  hiddenColumns: Set<string>
  toggleColumnVisibility: (colName: string) => void
  customColName: string
  setCustomColName: (val: string) => void
  customColPosition: string
  setCustomColPosition: (val: string) => void
  handleInsertCustomColumn: () => void
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
  showToast: (msg: string) => void
}

export const SubmitTrackerConfig: React.FC<SubmitTrackerConfigProps> = ({
  clientName,
  handleClientChange,
  headerColor,
  setHeaderColor,
  columnList,
  hiddenColumns,
  toggleColumnVisibility,
  customColName,
  setCustomColName,
  customColPosition,
  setCustomColPosition,
  handleInsertCustomColumn,
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
  showToast,
}) => {
  const visibleCount = columnList.filter(c => !hiddenColumns.has(c)).length

  return (
    <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold text-slate-900">Tracker customization</span>
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
          <span className="text-xs font-extrabold text-slate-700">Preset:</span>
          <select
            value={clientName}
            onChange={e => handleClientChange(e.target.value)}
            className="bg-transparent text-xs font-extrabold text-slate-800 focus:outline-none cursor-pointer"
          >
            {Object.keys(CLIENT_TRACKER_PRESETS).map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ADD CUSTOM COLUMN */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3">
        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
          ADD CUSTOM COLUMN
        </span>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Column name"
            value={customColName}
            onChange={e => setCustomColName(e.target.value)}
            className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
          />
          <select
            value={customColPosition}
            onChange={e => setCustomColPosition(e.target.value)}
            className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 cursor-pointer"
          >
            <option value="At start">At start</option>
            <option value="At end">At end</option>
          </select>
          <button
            type="button"
            onClick={handleInsertCustomColumn}
            className="px-5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-xs rounded-xl shadow-xs cursor-pointer"
          >
            + Insert
          </button>
        </div>
      </div>

      {/* COLUMN LAYOUT CHIPS */}
      <SubmitTrackerColumnChips
        columnList={columnList}
        hiddenColumns={hiddenColumns}
        toggleColumnVisibility={toggleColumnVisibility}
        draggedColIndex={draggedColIndex}
        dragOverColIndex={dragOverColIndex}
        selectedColIndex={selectedColIndex}
        handleDragStart={handleDragStart}
        handleDragEnter={handleDragEnter}
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
        handleDragEnd={handleDragEnd}
        handleChipClick={handleChipClick}
        moveColumnLeft={moveColumnLeft}
        moveColumnRight={moveColumnRight}
      />

      {/* APPEARANCE HEADER COLOR */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">APPEARANCE</span>
          <span className="text-xs text-slate-600 font-medium">Header row color</span>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={headerColor}
            onChange={e => setHeaderColor(e.target.value)}
            className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300"
          />
          <input
            type="text"
            value={headerColor}
            onChange={e => setHeaderColor(e.target.value)}
            className="w-24 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900"
          />
        </div>
      </div>

      <div className="flex justify-between items-center pt-2">
        <button
          onClick={() => showToast('Column layout & color preferences saved!')}
          className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
        >
          Save layout
        </button>
      </div>
    </div>
  )
}
