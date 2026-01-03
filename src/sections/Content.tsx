import { Area } from "../ui/Field"
import { SyllabusDraft } from "../app/types"

export default function Content(props: {
    draft: SyllabusDraft
    setDraft: (updater: (d: SyllabusDraft) => SyllabusDraft) => void
}) {
    const c = props.draft.content
    const set = (k: keyof typeof c, v: string) =>
        props.setDraft((d) => ({ ...d, content: { ...d.content, [k]: v } }))

    return (
        <div style={{ display: "grid", gap: 12 }}>
            <Area label="Зміст дисципліни (розділи/теми)" value={c.topics} onChange={(v) => set("topics", v)} rows={10} />
            <Area label="Лекції (№ — тема — питання)" value={c.lectures} onChange={(v) => set("lectures", v)} rows={8} />
            <Area label="Лабораторні (№ — назва — мета — години)" value={c.labs} onChange={(v) => set("labs", v)} rows={8} />
            <Area label="Самостійна робота" value={c.selfStudy} onChange={(v) => set("selfStudy", v)} rows={6} />
            <Area label="Література / ресурси" value={c.literature} onChange={(v) => set("literature", v)} rows={6} />
        </div>
    )
}
