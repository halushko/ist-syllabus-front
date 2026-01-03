export type TabItem = { id: string; title: string }

export function Tabs(props: {
    items: TabItem[]
    activeId: string
    onChange: (id: string) => void
}) {
    return (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            {props.items.map((t) => (
                <button
                    key={t.id}
                    onClick={() => props.onChange(t.id)}
                    className={props.activeId === t.id ? "primary" : ""}
                    type="button"
                >
                    {t.title}
                </button>
            ))}
        </div>
    )
}
