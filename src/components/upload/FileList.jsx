const formatBytes = size => {
  if (size === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const index = Math.floor(Math.log(size) / Math.log(1024))
  const value = (size / Math.pow(1024, index)).toFixed(index === 0 ? 0 : 1)
  return `${value} ${units[index]}`
}

const FileList = ({ files, onRemove }) => {
  return (
    <div className="mt-4 flex flex-wrap gap-3">
      {files.map((file, index) => (
        <div
          key={`${file.name}-${file.lastModified}-${index}`}
          className="flex items-center gap-4 border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 rounded-xl shadow-sm"
        >
          <div>
            <p className="text-slate-900 text-base font-semibold">{file.name}</p>
            <p className="text-slate-500 text-sm">{formatBytes(file.size)}</p>
          </div>
          <button
            onClick={() => onRemove(index)}
            className="border border-rose-200 text-rose-700 px-3 py-1.5 text-xs font-semibold hover:bg-rose-50 transition-colors rounded-md"
            aria-label={`Remove ${file.name}`}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  )
}

export default FileList