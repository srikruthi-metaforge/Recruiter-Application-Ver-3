import {
  WireframeHeader,
  WireframeCard,
  WireframeButton,
  KpiGrid,
  Panel,
  DataTable,
  QuickActions,
  AiInsightBanner,
  ActivityFeed,
  WorkflowStrip,
  ChartBlock,
} from './WireframeElements'

export {
  WireframeHeader,
  WireframeCard,
  WireframeButton,
  KpiGrid,
  Panel,
  DataTable,
  QuickActions,
  AiInsightBanner,
  ActivityFeed,
  WorkflowStrip,
  ChartBlock,
}

export function WireframeKit() {
  return (
    <div className="p-6 space-y-6 font-mono bg-white rounded-2xl border border-slate-200">
      <WireframeHeader title="System Wireframe Component Library" subtitle="Modular UI scaffolding wireframes for quick structural prototyping" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <WireframeCard title="Navigation Controls">
          <p className="text-xs text-slate-600">Standard wireframe action triggers and menu items.</p>
          <div className="flex items-center gap-2 pt-2">
            <WireframeButton label="Primary Action" />
            <WireframeButton label="Secondary Action" />
          </div>
        </WireframeCard>

        <WireframeCard title="Data Grid Scaffolding">
          <p className="text-xs text-slate-600">Table container with column headers and sample data rows.</p>
          <div className="border border-slate-300 rounded-lg p-2 text-[11px] bg-white mt-2">
            <div className="flex justify-between font-bold border-b border-slate-200 pb-1">
              <span>Col 1</span><span>Col 2</span><span>Col 3</span>
            </div>
            <div className="flex justify-between py-1 text-slate-500">
              <span>Val 1</span><span>Val 2</span><span>Val 3</span>
            </div>
          </div>
        </WireframeCard>

        <WireframeCard title="Form Input Preview">
          <p className="text-xs text-slate-600">Form input fields and dropdown controls.</p>
          <input type="text" placeholder="Sample input field..." className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white mt-2 font-mono" readOnly />
        </WireframeCard>
      </div>
    </div>
  )
}
