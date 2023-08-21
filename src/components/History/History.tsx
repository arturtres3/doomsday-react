import { useEffect, useRef } from "preact/hooks"
import { HistoryEntry } from "./HistoryEntry"

export type HistoryType = {
  id: string
  date: Date
  answer: number
}

export function History({ history }: { history: HistoryType[] }) {
  const bottomHistoryRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomHistoryRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [history])

  return (
    <div className="history">
      <h2>History</h2>

      <div id="entries">
        {history.map((entry) => (
          <HistoryEntry {...entry} />
        ))}
        
        <div ref={bottomHistoryRef} />
      </div>

      <div id="bottom-line"></div>
    </div>
  )
}
