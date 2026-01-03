import { useEffect, useMemo, useState } from "react"
import { Tabs } from "../ui/Tabs"
import Basics from "../sections/Basics"
import Outcomes from "../sections/Outcomes"
import Content from "../sections/Content"
import Assessment from "../sections/Assessment"
import { SyllabusDraft, emptyDraft } from "./types"
import { clearDraft, loadDraft, saveDraft } from "./storage"
import { downloadBlob, exportSyllabusZip } from "./api"

type TabId = "basics" | "outcomes" | "content" | "assessment"

export default function App() {
    const [tab, setTab] = useState<TabId>("basics")
    const [draft, setDraftState] = useState<SyllabusDraft>(() => loadDraft())
    const [status, setStatus] = useState<string>("")
    const [busy, setBusy] = useState<boolean>(false)

    const tabs = useMemo(
        () => [
            { id: "basics", title: "Реквізити" },
            { id: "outcomes", title: "Мета та РН" },
            { id: "content", title: "Зміст" },
            { id: "assessment", title: "Контроль" }
        ],
        []
    )

    const setDraft = (updater: (d: SyllabusDraft) => SyllabusDraft) => {
        setDraftState((prev) => updater(prev))
    }

    useEffect(() => {
        saveDraft(draft)
    }, [draft])

    async function onExport() {
        setBusy(true)
        setStatus("Експорт…")
        try {
            const blob = await exportSyllabusZip(draft)
            downloadBlob(blob, "syllabus_export.zip")
            setStatus("Готово: завантажено ZIP")
        } catch (e: any) {
            setStatus(e?.message ?? "Export error")
        } finally {
            setBusy(false)
        }
    }

    function onClear() {
        clearDraft()
        setDraftState(emptyDraft)
        setStatus("Чернетку очищено")
    }

    return (
        <div className="container">
            <div className="toolbar">
                <div>
                    <h2 style={{ margin: 0 }}>Syllabus Tool</h2>
                    <small className="muted">Легка форма + експорт у DOCX/PDF через бек</small>
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button type="button" onClick={() => saveDraft(draft)} disabled={busy}>
                        Save
                    </button>
                    <button type="button" className="danger" onClick={onClear} disabled={busy}>
                        Clear
                    </button>
                    <button type="button" className="primary" onClick={onExport} disabled={busy}>
                        Export DOCX+PDF (ZIP)
                    </button>
                </div>
            </div>

            <div className="card">
                <Tabs items={tabs} activeId={tab} onChange={(id) => setTab(id as TabId)} />

                {tab === "basics" && <Basics draft={draft} setDraft={setDraft} />}
                {tab === "outcomes" && <Outcomes draft={draft} setDraft={setDraft} />}
                {tab === "content" && <Content draft={draft} setDraft={setDraft} />}
                {tab === "assessment" && <Assessment draft={draft} setDraft={setDraft} />}

                <div style={{ marginTop: 12 }}>
                    <small className="muted">{busy ? "Працюю…" : status}</small>
                </div>
            </div>

            <div className="card" style={{ marginTop: 12 }}>
                <small className="muted">Debug draft:</small>
                <pre style={{ margin: 0, fontSize: 12 }}>{JSON.stringify(draft, null, 2)}</pre>
            </div>
        </div>
    )
}
