import React, { useEffect, useMemo, useState } from "react"
import {Select, useDependentSelectOptions} from "../ui/Field"
import {SyllabusDraft, Response, GetNameAndIdResult, Option} from "../app/types"
import { API_BASE } from "../main";
import {Field} from "../ui/Field";


function toOptions(items: Array<{ id: string; name: string }>): Option[] {
    return items.map((x) => ({
        value: x.id && x.id.trim() !== "" ? x.id : x.name,
        label: x.name
    }))
}

function useApiSelectOptions<T extends Response>(url: string, pick: (data: T) => Option[]) {
    const [options, setOptions] = useState<Option[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false

        async function load() {
            setLoading(true)
            setError(null)

            try {
                const resp = await fetch(`${API_BASE}${url}`)
                if (!resp.ok) throw new Error(`HTTP ${resp.status}`)

                const data = (await resp.json()) as T

                if (Array.isArray(data.errors) && data.errors.length > 0) {
                    throw new Error(data.errors.join("; "))
                }

                const opts = pick(data).filter((o) => o.value && o.label)
                if (!cancelled) setOptions(opts)
            } catch (e: any) {
                if (!cancelled) setError(e?.message ?? "Failed to load data")
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        load()
        return () => {
            cancelled = true
        }
    }, [url])

    const uiOptions = useMemo<Option[]>(() => {
        if (loading) return [{ value: "", label: "Завантаження..." }]
        if (error) return [{ value: "", label: `Помилка: ${error}` }]
        if (options.length === 0) return [{ value: "", label: "Немає даних" }]
        return options
    }, [loading, error, options])

    return { options: uiOptions, loading, error }
}

export default function Basics(props: {
    draft: SyllabusDraft
    setDraft: (updater: (d: SyllabusDraft) => SyllabusDraft) => void
}) {
    const b = props.draft.basics

    const set = (k: keyof typeof b, v: string) =>
        props.setDraft((d) => ({ ...d, basics: { ...d.basics, [k]: v } }))

    const statuses = useApiSelectOptions<GetNameAndIdResult>("/api/get-all-statuses", (data) =>
        toOptions(data.values ?? [])
    )

    const levels = useApiSelectOptions<GetNameAndIdResult>("/api/get-all-levels", (data) =>
        toOptions(data.values ?? [])
    )

    const forms = useApiSelectOptions<GetNameAndIdResult>("/api/get-all-forms", (data) =>
        toOptions(data.values ?? [])
    )

    const canLoadSemesters = b.level !== ""
    const semestersUrl = canLoadSemesters
        ? `/api/get-semesters?level=${encodeURIComponent(b.level)}`
        : null
    const semesters = useDependentSelectOptions<GetNameAndIdResult>(semestersUrl, (data) =>
        toOptions(data.values ?? [])
    )

    return (
        <div className="row">
            <Field label="Назва дисципліни" value={b.disciplineName} onChange={(v) => set("disciplineName", v)} />
            <Select
                label="Статус"
                value={b.status}
                onChange={(v) => set("status", v)}
                options={statuses.options}
            />
            <Select
                label="Рівень"
                value={b.level}
                onChange={(v) => set("level", v)}
                options={levels.options}
            />
            <Select
                label="Форма навчання"
                value={b.controlForm}
                onChange={(v) => set("controlForm", v)}
                options={forms.options}
            />
            <Select
                label="Семестр"
                value={b.semester}
                onChange={(v) => set("semester", v)}
                options={[{ value: "", label: "— оберіть —" }, ...semesters.options]}
                disabled={!canLoadSemesters}
            />
        </div>
    )
}
