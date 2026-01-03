import { SyllabusDraft, emptyDraft } from "./types"

const KEY = "syllabus.draft.v1"

export function loadDraft(): SyllabusDraft {
    try {
        const raw = localStorage.getItem(KEY)
        if (!raw) return emptyDraft
        const parsed = JSON.parse(raw) as SyllabusDraft
        return parsed ?? emptyDraft
    } catch {
        return emptyDraft
    }
}

export function saveDraft(draft: SyllabusDraft): void {
    localStorage.setItem(KEY, JSON.stringify(draft))
}

export function clearDraft(): void {
    localStorage.removeItem(KEY)
}
