import React from 'react'

interface SubmitCandidateTableProps {
  visibleColumns: string[]
  headerColor: string
  trackerRows: Record<string, string>[]
  handleUpdateCell: (rowIndex: number, colName: string, value: string) => void
}

export const SubmitCandidateTable: React.FC<SubmitCandidateTableProps> = ({
  visibleColumns,
  headerColor,
  trackerRows,
  handleUpdateCell,
}) => {
  return (
    <div className="border-2 border-slate-800 rounded-xl overflow-x-auto shadow-xs">
      <table className="w-full text-left border-collapse font-mono text-xs">
        <thead>
          <tr style={{ backgroundColor: headerColor }} className="text-slate-950 font-black border-b-2 border-slate-800 text-[10px] uppercase">
            {visibleColumns.map(col => (
              <th key={col} className="p-2.5 border-r-2 border-slate-800">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y-2 divide-slate-800 font-semibold text-slate-900">
          {trackerRows.map((row, rIdx) => (
            <tr key={rIdx}>
              {visibleColumns.map(col => (
                <td key={col} className="p-1 border-r-2 border-slate-800">
                  <input
                    type="text"
                    value={row[col] || ''}
                    onChange={e => handleUpdateCell(rIdx, col, e.target.value)}
                    className="w-full px-2 py-1 bg-transparent focus:bg-white focus:outline-none text-xs font-mono"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
