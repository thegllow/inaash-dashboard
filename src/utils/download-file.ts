export const downloadFile = (blob: Blob, fileName?: string) => {
  const url = window.URL.createObjectURL(new Blob([blob]))
  const a = document.createElement("a")
  a.href = url
  a.download = fileName || "filename.xlsx" // Set the file name
  document.body.appendChild(a)
  a.click()
  a.remove()
  window.URL.revokeObjectURL(url)
}
