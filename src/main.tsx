import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import App from "./app/App"
import "./styles.css"

export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080"


ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
)
