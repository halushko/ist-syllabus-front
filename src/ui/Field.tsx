import {useEffect, useMemo, useState} from "react";
import {API_BASE} from "../main";
import {Response, GetNameAndIdResult, Option} from "../app/types"


export function Field(props: {
    label: string
    value: string
    onChange: (v: string) => void
    placeholder?: string
}) {
    return (
        <label style={{display: "block"}}>
            <div style={{fontSize: 12, marginBottom: 6, color: "#444"}}>{props.label}</div>
            <input
                value={props.value}
                placeholder={props.placeholder ?? ""}
                onChange={(e) => props.onChange(e.target.value)}
                style={{
                    width: "100%",
                    border: "1px solid #d7d7e6",
                    borderRadius: 10,
                    padding: "10px 12px"
                }}
            />
        </label>
    )
}

export function Select(props: {
    label: string
    value: string
    onChange: (v: string) => void
    options: { value: string; label: string }[]
    disabled?: boolean
}) {
    return (
        <label style={{display: "block"}}>
            <div style={{fontSize: 12, marginBottom: 6, color: "#444"}}>
                {props.label}
            </div>
            <select
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                style={{
                    width: "100%",
                    border: "1px solid #d7d7e6",
                    borderRadius: 10,
                    padding: "10px 12px",
                    background: "#fff"
                }}
            >
                <option value="">
                    — оберіть —
                </option>
                {props.options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
        </label>
    )
}

export function useDependentSelectOptions<T extends GetNameAndIdResult>(
    urlOrNull: string | null,
    pick: (data: T) => Option[]
) {
    const [options, setOptions] = useState<Option[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let cancelled = false

        async function load() {
            if (!urlOrNull) {
                setOptions([])
                setLoading(false)
                setError(null)
                return
            }

            setLoading(true)
            setError(null)

            try {
                const resp = await fetch(`${API_BASE}${urlOrNull}`)
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
    }, [urlOrNull])

    const uiOptions = useMemo<Option[]>(() => {
        if (!urlOrNull) return [{value: "", label: "Спочатку оберіть рівень"}]
        if (loading) return [{value: "", label: "Завантаження..."}]
        if (error) return [{value: "", label: `Помилка: ${error}`}]
        if (options.length === 0) return [{value: "", label: "Немає даних"}]
        return options
    }, [urlOrNull, loading, error, options])

    return {options: uiOptions, loading, error}
}

export function Area(props: {
    label: string
    value: string
    onChange: (v: string) => void
    placeholder?: string
    rows?: number
}) {
    return (
        <label style={{display: "block"}}>
            <div style={{fontSize: 12, marginBottom: 6, color: "#444"}}>{props.label}</div>
            <textarea
                value={props.value}
                placeholder={props.placeholder ?? ""}
                onChange={(e) => props.onChange(e.target.value)}
                rows={props.rows ?? 6}
                style={{
                    width: "100%",
                    border: "1px solid #d7d7e6",
                    borderRadius: 10,
                    padding: "10px 12px",
                    resize: "vertical"
                }}
            />
        </label>
    )
}
