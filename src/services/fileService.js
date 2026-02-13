import axios from 'axios'

const baseUrl = process.env.REACT_APP_BACKEND_URL

export const uploadFiles = async (files, onProgress) => {
  const formData = new FormData()

  files.forEach(file => formData.append('files', file))

  const res = await axios.post(`${baseUrl}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: event => {
      if (!onProgress || !event.total) return
      const percent = Math.round((event.loaded * 100) / event.total)
      onProgress(percent)
    },
  })

  return res.data
}
