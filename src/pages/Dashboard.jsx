import FileDropzone from '../components/upload/FileDropzone'

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-100 via-white to-indigo-100 p-8 shadow-xl">
          <div className="absolute -top-20 -right-12 h-52 w-52 rounded-full bg-emerald-300/40 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-16 -left-12 h-60 w-60 rounded-full bg-indigo-300/40 blur-3xl" aria-hidden="true" />
          <div className="absolute top-6 right-16 h-32 w-32 rounded-full bg-sky-300/40 blur-2xl" aria-hidden="true" />
          <div className="absolute bottom-10 right-24 h-20 w-20 rounded-full bg-amber-200/40 blur-2xl" aria-hidden="true" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 shadow-sm">
              Ledger Analytics
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Balance Analyzer
            </h1>
            <p className="mt-3 max-w-2xl text-base text-slate-600">
              Upload PDF or Excel files and instantly surface the maximum balance with a clean, auditable summary.
            </p>

            <div className="mt-6 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
              <div className="rounded-2xl border border-emerald-200 bg-white/80 px-4 py-3 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">Speed</p>
                <p className="mt-1 text-slate-700">Batch uploads and smart parsing.</p>
              </div>
              <div className="rounded-2xl border border-sky-200 bg-white/80 px-4 py-3 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-widest text-sky-700">Security</p>
                <p className="mt-1 text-slate-700">Files stay in your local workflow.</p>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-white/80 px-4 py-3 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">Clarity</p>
                <p className="mt-1 text-slate-700">Professional reporting and outputs.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-semibold text-slate-900">Upload statements</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Drag in monthly statements or browse your device. We will highlight the max balance once processing finishes.
                </p>
              </div>
              <div className="rounded-full bg-gradient-to-r from-slate-700 via-indigo-600 to-emerald-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-sm">
                Secure Processing
              </div>
            </div>
            <div className="mt-8">
              <FileDropzone />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
