import { useState, useRef } from 'react'
import { CLIENT_TRACKER_PRESETS } from './submitToLeadData'
import { getInitialTrackerRows } from './getInitialTrackerRows'

export function useSubmitToLeadTracker(selectedCandidates: any[], requirement: any) {
  const defaultPreset = CLIENT_TRACKER_PRESETS['METAFORGE (INTERNAL)']
  const [columnList, setColumnList] = useState<string[]>(defaultPreset.columns)
  const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set())
  const [customColName, setCustomColName] = useState('')
  const [customColPosition, setCustomColPosition] = useState('At start')
  const [headerColor, setHeaderColor] = useState(defaultPreset.headerColor)

  const isDraggingRef = useRef<boolean>(false)
  const draggedColIndexRef = useRef<number | null>(null)
  const [draggedColIndex, setDraggedColIndex] = useState<number | null>(null)
  const [dragOverColIndex, setDragOverColIndex] = useState<number | null>(null)
  const [selectedColIndex, setSelectedColIndex] = useState<number | null>(null)

  const [trackerRows, setTrackerRows] = useState<Record<string, string>[]>(() =>
    getInitialTrackerRows(selectedCandidates, requirement)
  )

  const handleDragStart = (e: React.DragEvent, index: number) => {
    isDraggingRef.current = true
    draggedColIndexRef.current = index
    setDraggedColIndex(index)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', String(index))
  }

  const handleDragEnter = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (dragOverColIndex !== index) setDragOverColIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (dragOverColIndex !== index) setDragOverColIndex(index)
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    e.stopPropagation()
    let fromIndex = draggedColIndexRef.current
    if (fromIndex !== null && fromIndex !== dropIndex) {
      setColumnList(prev => {
        const next = [...prev]
        const [moved] = next.splice(fromIndex!, 1)
        next.splice(dropIndex, 0, moved)
        return next
      })
    }
    draggedColIndexRef.current = null
    setDraggedColIndex(null)
    setDragOverColIndex(null)
  }

  const handleDragEnd = () => {
    draggedColIndexRef.current = null
    setDraggedColIndex(null)
    setDragOverColIndex(null)
    setTimeout(() => { isDraggingRef.current = false }, 200)
  }

  const handleChipClick = (index: number) => {
    if (isDraggingRef.current) return
    if (selectedColIndex === null) setSelectedColIndex(index)
    else if (selectedColIndex === index) setSelectedColIndex(null)
    else {
      setColumnList(prev => {
        const next = [...prev]
        const [moved] = next.splice(selectedColIndex!, 1)
        next.splice(index, 0, moved)
        return next
      })
      setSelectedColIndex(null)
    }
  }

  const moveColumnLeft = (index: number) => {
    if (index <= 0) return
    setColumnList(prev => {
      const next = [...prev]
      const [col] = next.splice(index, 1)
      next.splice(index - 1, 0, col)
      return next
    })
  }

  const moveColumnRight = (index: number) => {
    if (index >= columnList.length - 1) return
    setColumnList(prev => {
      const next = [...prev]
      const [col] = next.splice(index, 1)
      next.splice(index + 1, 0, col)
      return next
    })
  }

  const toggleColumnVisibility = (colName: string) => {
    const next = new Set(hiddenColumns)
    if (next.has(colName)) next.delete(colName)
    else next.add(colName)
    setHiddenColumns(next)
  }

  const handleInsertCustomColumn = () => {
    if (!customColName.trim()) return
    const col = customColName.trim()
    if (columnList.includes(col)) return
    if (customColPosition === 'At start') setColumnList([col, ...columnList])
    else setColumnList([...columnList, col])
    setCustomColName('')
  }

  const handleUpdateCell = (rowIndex: number, colName: string, value: string) => {
    setTrackerRows(prev => {
      const next = [...prev]
      next[rowIndex] = { ...next[rowIndex], [colName]: value }
      return next
    })
  }

  return {
    columnList,
    setColumnList,
    hiddenColumns,
    setHiddenColumns,
    customColName,
    setCustomColName,
    customColPosition,
    setCustomColPosition,
    headerColor,
    setHeaderColor,
    isDraggingRef,
    draggedColIndexRef,
    draggedColIndex,
    setDraggedColIndex,
    dragOverColIndex,
    setDragOverColIndex,
    selectedColIndex,
    setSelectedColIndex,
    trackerRows,
    setTrackerRows,
    handleDragStart,
    handleDragEnter,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    handleChipClick,
    moveColumnLeft,
    moveColumnRight,
    toggleColumnVisibility,
    handleInsertCustomColumn,
    handleUpdateCell,
  }
}
