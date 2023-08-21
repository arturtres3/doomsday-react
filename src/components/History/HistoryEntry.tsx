import { HistoryType } from "./History"
import { days } from "../../helper"

export function HistoryEntry({ id, date, answer }: HistoryType) {
  let entryDate = new Date(date)

  return (
    <div
      key={id}
      className="hist-entry"
      style={`background-color: ${entryDate.getDay() == answer ? "var(--right)" : "var(--wrong)"}`}
    >
      {entryDate.toLocaleDateString("en-UK")}

      <div>{`Your: ${days[answer]}`}</div>
      <div>{`Correct: ${days[entryDate.getDay()]}`}</div>
    </div>
  )
}
