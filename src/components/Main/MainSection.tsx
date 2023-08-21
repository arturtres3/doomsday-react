import { DayButtons } from "./DayButtons"
import { DateDisplay } from "./DateDisplay"

type Props = {
  darkMode: boolean
  date: Date
  selectedDay: number
  setSelectedDay: (a: number) => void
  onSubmit: () => void
}

export function MainSection({ darkMode, date, selectedDay, setSelectedDay, onSubmit }: Props) {
  return (
    <div className="main">
      <h1 id="title">Doomsday Game</h1>

      <DateDisplay darkMode={darkMode} date={date} />

      <DayButtons selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

      <button className="control" onClick={onSubmit}>
        Submit
      </button>
    </div>
  )
}
