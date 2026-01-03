import { Area } from "../ui/Field"
import { SyllabusDraft } from "../app/types"

export default function Assessment(props: {
    draft: SyllabusDraft
    setDraft: (updater: (d: SyllabusDraft) => SyllabusDraft) => void
}) {
    const a = props.draft.assessment
    const set = (k: keyof typeof a, v: string) =>
        props.setDraft((d) => ({ ...d, assessment: { ...d.assessment, [k]: v } }))

    return (
        <div style={{ display: "grid", gap: 12 }}>
            <Area label="Політики дисципліни" value={a.policy} onChange={(v) => set("policy", v)} rows={10} />
            <Area label="Оцінювання / шкала / критерії" value={a.grading} onChange={(v) => set("grading", v)} rows={10} />
        </div>
    )
}
