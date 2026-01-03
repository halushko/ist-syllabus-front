import { Area } from "../ui/Field"
import { SyllabusDraft } from "../app/types"

export default function Outcomes(props: {
    draft: SyllabusDraft
    setDraft: (updater: (d: SyllabusDraft) => SyllabusDraft) => void
}) {
    const o = props.draft.outcomes
    const set = (k: keyof typeof o, v: string) =>
        props.setDraft((d) => ({ ...d, outcomes: { ...d.outcomes, [k]: v } }))

    return (
        <div style={{ display: "grid", gap: 12 }}>
            <Area label="Мета дисципліни" value={o.goal} onChange={(v) => set("goal", v)} rows={5} />
            <Area label="Предмет / короткий опис" value={o.subject} onChange={(v) => set("subject", v)} rows={5} />
            <Area label="Результати навчання (можна списком)" value={o.learningOutcomes} onChange={(v) => set("learningOutcomes", v)} rows={8} />
            <Area label="Пререквізити" value={o.prerequisites} onChange={(v) => set("prerequisites", v)} rows={4} />
            <Area label="Постреквізити" value={o.postrequisites} onChange={(v) => set("postrequisites", v)} rows={4} />
        </div>
    )
}
