import { SyllabusDraft } from "./types"

const API_BASE = (import.meta as any).env?.VITE_API_BASE ?? "http://localhost:8080"

export async function exportSyllabusZip(draft: SyllabusDraft): Promise<Blob> {
    const res = await fetch(`${API_BASE}/api/syllabus/export`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft)
    })

    if (!res.ok) {
        const text = await res.text().catch(() => "")
        throw new Error(`Export failed: ${res.status} ${res.statusText}${text ? ` — ${text}` : ""}`)
    }

    return await res.blob()
}

export function downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
}
