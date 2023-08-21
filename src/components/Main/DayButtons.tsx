import { days } from "../../helper"

type Props = {
    selectedDay: number,
    setSelectedDay: (a: number) => void
}

export function DayButtons({selectedDay, setSelectedDay}:Props) {

    return (
        <form id="answer">
          {days.map((day, index) => {
            return (
              <>
                <input
                  type="radio"
                  name="answer"
                  id={index.toString()}
                  checked={selectedDay === index}
                  onClick={() => {
                    setSelectedDay(index)
                  }}
                />
                <label className="radio-label" htmlFor={index.toString()}>
                  {day}
                </label>
              </>
            )
          })}
        </form>
    )
}