import { useDropzone } from 'react-dropzone'
import { useMemo, useState } from 'react'
import { uploadFiles } from '../../services/fileService.js'
import ResultTable from '../results/ResultTable.jsx'
import FileList from './FileList.jsx'
import UploadProgress from './UploadProgress.jsx'

export default function FileDropzone() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [errors, setErrors] = useState([])
  const [resultRows, setResultRows] = useState([])
  const [maxBalance, setMaxBalance] = useState(null)
  const [minBalance, setMinBalance] = useState(null)
  const [showResults, setShowResults] = useState(false)

  const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024

  const hintText = useMemo(() => {
    const sizeLimit = `${Math.floor(MAX_FILE_SIZE_BYTES / (1024 * 1024))}MB`
    return `PDF or Excel only. Max ${sizeLimit} per file.`
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    multiple: true,
    maxSize: MAX_FILE_SIZE_BYTES,
    onDrop: (acceptedFiles, rejectedFiles) => {
      setFiles(acceptedFiles)
      setProgress(0)
      setShowResults(false)
      setResultRows([])
      setMaxBalance(null)
      setMinBalance(null)

      if (rejectedFiles.length === 0) {
        setErrors([])
        return
      }

      const nextErrors = rejectedFiles.map(rejection => {
        const fileName = rejection.file?.name || 'File'
        const reason = rejection.errors[0]?.message || 'Unsupported file.'
        return `${fileName}: ${reason}`
      })

      setErrors(nextErrors)
    },
  })

  const handleUpload = async () => {
    if (files.length === 0) {
      setErrors(['Select at least one file to upload.'])
      return
    }

    setLoading(true)
    setErrors([])
    setProgress(0)

    try {
      const data = await uploadFiles(files, percent => setProgress(percent))
      setResultRows(Array.isArray(data?.table) ? data.table : [])
      setMaxBalance(data?.max_balance ?? null)
      setMinBalance(data?.min_balance ?? null)
      setShowResults(true)
    } catch (error) {
      const message = error?.message || 'Upload failed. Please try again.'
      setErrors([message])
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveFile = index => {
    setFiles(prevFiles => prevFiles.filter((_, fileIndex) => fileIndex !== index))
    setProgress(0)
    setResultRows([])
    setMaxBalance(null)
    setMinBalance(null)
    setShowResults(false)
  }

  const handleClearAll = () => {
    setFiles([])
    setErrors([])
    setProgress(0)
    setResultRows([])
    setMaxBalance(null)
    setMinBalance(null)
    setShowResults(false)
  }

  return (
    <section className="rounded-2xl p-8 mb-10 bg-gradient-to-br from-slate-50 via-white to-slate-100 border border-slate-200 shadow-sm">
      <div
        {...getRootProps()}
        className={`cursor-pointer border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200
        ${isDragActive ? 'border-emerald-400 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-200' : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300'}`}
        aria-label="File Upload Area"
      >
        <input {...getInputProps()} />
        <p className={`text-sm font-semibold ${isDragActive ? 'text-emerald-900' : 'text-slate-900'}`}>
          Drag and drop your files
        </p>
        <p className={`mt-2 text-xs ${isDragActive ? 'text-emerald-700' : 'text-slate-500'}`}>
          {hintText}
        </p>
      </div>

      {errors.length > 0 && (
        <div className="mt-4 border border-rose-200 bg-rose-50 text-rose-800 p-4 text-sm rounded-lg">
          {errors.map(error => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}

      {files.length > 0 && <FileList files={files} onRemove={handleRemoveFile} />}

      {files.length > 0 && (
        <div className="mt-6 border-t border-slate-200 pt-4">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs text-slate-500">
              {files.length} file(s) selected
            </p>

            <button
              onClick={handleClearAll}
              disabled={loading}
              className="border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors rounded-lg"
            >
              Clear all
            </button>

            <button
              onClick={handleUpload}
              disabled={loading}
              className="bg-slate-900 text-white px-6 py-2 text-xs font-semibold hover:bg-slate-800 border border-slate-900 transition-colors rounded-lg"
            >
              {loading ? 'Processing...' : 'Upload'}
            </button>
          </div>

          {loading && <UploadProgress percent={progress} />}
        </div>
      )}

      {showResults && (
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Max Balance</p>
              <p className="mt-2 text-lg font-bold text-emerald-900">
                {maxBalance !== null ? `Rs. ${String(maxBalance)}` : 'Not available'}
              </p>
            </div>
            <div className="rounded-xl border border-sky-200 bg-sky-50 p-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-sky-700">Min Balance</p>
              <p className="mt-2 text-lg font-bold text-sky-900">
                {minBalance !== null ? `Rs. ${String(minBalance)}` : 'Not available'}
              </p>
            </div>
          </div>

          {resultRows.length > 0 ? (
            <ResultTable rows={resultRows} />
          ) : (
            <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
              Table data not available for this upload.
            </div>
          )}
        </section>
      )}
    </section>
  )
}
