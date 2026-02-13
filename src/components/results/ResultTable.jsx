const formatCellValue = value => {
  if (value === null || value === undefined) return '-'
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

export default function ResultTable({ rows = [] }) {
  if (!rows.length) {
    return (
      <section aria-label="Results Section">
        <h2 className="text-xl font-medium mb-4">Results</h2>
        <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
          No results yet. Upload a file to see the table output.
        </div>
      </section>
    )
  }
}

  