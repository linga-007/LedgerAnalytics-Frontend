const UploadProgress = ({ percent }) => {
  const value = Number.isFinite(percent) ? Math.min(100, Math.max(0, percent)) : 0

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500">
        <span>Uploading</span>
        <span>{value}%</span>
      </div>
      <div className="mt-2 h-2 w-full bg-slate-100 border border-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 transition-all duration-200"
          style={{ width: `${value}%` }}
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
        />
      </div>
    </div>
  )
}

export default UploadProgress