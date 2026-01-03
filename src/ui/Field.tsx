export function Field(props: {
    label: string
    value: string
    onChange: (v: string) => void
    placeholder?: string
}) {
    return (
        <label style={{ display: "block" }}>
            <div style={{ fontSize: 12, marginBottom: 6, color: "#444" }}>{props.label}</div>
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
}) {
    return (
        <label style={{ display: "block" }}>
            <div style={{ fontSize: 12, marginBottom: 6, color: "#444" }}>
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
                <option value="" disabled>
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


export function Area(props: {
    label: string
    value: string
    onChange: (v: string) => void
    placeholder?: string
    rows?: number
}) {
    return (
        <label style={{ display: "block" }}>
            <div style={{ fontSize: 12, marginBottom: 6, color: "#444" }}>{props.label}</div>
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
