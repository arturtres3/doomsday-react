import { useEffect, useRef, useState } from "preact/hooks"
import "./index.css"
import "./base.css"

// import React from "preact"

type History = {
  id: string
  date: Date
  answer: number
}

function getLocalValue<T>(key: string, defaultValue: T) {
  const localValue = localStorage.getItem(key)

  if (localValue === null) return defaultValue

  return JSON.parse(localValue)
}

function randomDate(start: Date, end: Date) {
  let nextDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )

  return nextDate
}

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

const yearsDayTraining = [1700, 2022, 2023, 1900, 2002, 1800, 2026] // index = doomsday

function fixedDay(date: Date) {
  date.setDate(4)
  date.setMonth(3) // dia 04/04 doomsday
  return date
}

export function App() {
  const [history, setHistory] = useState<History[]>(() => {
    return getLocalValue<History[]>("HISTORY", [])
  })

  const [startDate, setStartDate] = useState(() => {
    return new Date(getLocalValue("START_DATE", "1900-01-01T03:06:28.000Z"))
  })

  const [endDate, setEndDate] = useState(() => {
    return new Date(getLocalValue("END_DATE", "2100-01-01T03:06:28.000Z"))
  })

  const [date, setDate] = useState(() => {
    return new Date(getLocalValue("DATE", randomDate(startDate, endDate)))
  })

  const [darkMode, setDarkMode] = useState(() => {
    return getLocalValue("DARK_MODE", true)
  })

  const [dayTraining, setDayTraining] = useState(() => {
    return getLocalValue("DAY_TRAINING", false)
  })

  const [yearTraining, setYearTraining] = useState(() => {
    return getLocalValue("YEAR_TRAINING", false)
  })

  const [numberDayTraining, setNumberDayTraining] = useState(() => {
    return getLocalValue("N_DAY_TRAINING", 0)
  })

  const [selectedDay, setSelectedDay] = useState(-1)

  const bottomHistoryRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomHistoryRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [history])

  useEffect(() => {
    localStorage.setItem("DATE", JSON.stringify(date))
    localStorage.setItem("HISTORY", JSON.stringify(history))
    localStorage.setItem("START_DATE", JSON.stringify(startDate))
    localStorage.setItem("END_DATE", JSON.stringify(endDate))
    localStorage.setItem("DAY_TRAINING", JSON.stringify(dayTraining))
    localStorage.setItem("YEAR_TRAINING", JSON.stringify(yearTraining))
    localStorage.setItem("N_DAY_TRAINING", JSON.stringify(numberDayTraining))
  }, [date, history, startDate, endDate])

  useEffect(() => {
    const root = document.querySelector(":root") as HTMLElement

    if (darkMode) {
      root.style.setProperty("--accent-color", "lightgray")
      root.style.setProperty("--background-color", "darkgray")
    } else {
      root.style.setProperty("--accent-color", "white")
      root.style.setProperty("--background-color", "lightgrey")
    }
    localStorage.setItem("DARK_MODE", JSON.stringify(darkMode))
  }, [darkMode])

  useEffect(() => {
    if (dayTraining) {
      let year = yearsDayTraining[numberDayTraining]

      let start = new Date(year, 0, 1)
      let end = new Date(year + 1, 0, 1)

      localStorage.setItem("SAVED_START_DATE", JSON.stringify(startDate))
      localStorage.setItem("SAVED_END_DATE", JSON.stringify(endDate))

      setStartDate(start)
      setEndDate(end)

      setDate(randomDate(start, end))
    } else {
      let start = new Date(
        getLocalValue("SAVED_START_DATE", "1900-01-01T03:06:28.000Z")
      )
      let end = new Date(
        getLocalValue("SAVED_END_DATE", "2100-01-01T03:06:28.000Z")
      )

      setStartDate(start)
      setEndDate(end)

      setDate(randomDate(start, end))
    }
  }, [dayTraining])

  useEffect(() => {
    if (yearTraining) {
      setDate(fixedDay(randomDate(startDate, endDate)))
    } else {
      setDate(randomDate(startDate, endDate))
    }
  }, [yearTraining])

  function addHistEntry(date: Date, answer: number) {
    setHistory((currentHistory) => {
      let entry: History = {
        id: crypto.randomUUID(),
        date: date,
        answer: answer,
      }

      return [...currentHistory, entry]
    })
  }

  return (
    <>
      <ul id="navbar">
        <li>
          From:
          <input
            id="since"
            class="range"
            type="number"
            min="500"
            max="3000"
            step="10"
            value={startDate.getFullYear()}
            onChange={(e) =>
              setStartDate(
                new Date(
                  parseInt((e.target as HTMLInputElement).value) || "1900-01-01T03:06:28.000Z"
                )
              )
            }
          />
        </li>

        <li>
          Until:
          <input
            id="until"
            class="range"
            type="number"
            min="500"
            max="3000"
            step="10"
            value={endDate.getFullYear()}
            onChange={(e) =>
              setEndDate(
                new Date(
                  parseInt((e.target as HTMLInputElement).value) || "2100-01-01T03:06:28.000Z"
                  )
              )
            }
          />
        </li>

        <li class="button" id="clear-hist" onClick={() => setHistory([])}>
          Clear History
        </li>

        <li>
          Dark mode
          <label class="switch">
            <input
              id="dark-mode"
              type="checkbox"
              checked={darkMode}
              onChange={() => {
                setDarkMode(!darkMode)
              }}
            />
            <span class="slider"></span>
          </label>
        </li>

        <li class="game-modes">
          <input
            id="day-training-input"
            class="day-training"
            type="number"
            min="0"
            max="6"
            value={numberDayTraining}
            onChange={(e) => {
              setNumberDayTraining(
                parseInt((e.target as HTMLInputElement).value) || 0
              )
            }}
          />
          Day &nbsp;&nbsp;&nbsp;
          <label class="switch">
            <input
              id="day-training"
              type="checkbox"
              checked={dayTraining}
              onChange={() => {
                setDayTraining(!dayTraining)
              }}
            />
            <span class="slider"></span>
          </label>
        </li>

        <li class="game-modes">
          Year &nbsp;&nbsp;&nbsp;
          <label class="switch">
            <input
              id="year-training"
              type="checkbox"
              checked={yearTraining}
              onChange={() => {
                setYearTraining(!yearTraining)
              }}
            />
            <span class="slider"></span>
          </label>
        </li>
      </ul>

      <div className="main">
        <h1 id="title">Doomsday Game</h1>

        <div id="date-display" className={darkMode ? "dark-date" : ""}>
          <h1>
            {date.toLocaleDateString("en-UK", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h1>
          <h3>{date.toLocaleDateString("en-UK")}</h3>
        </div>

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

        <button
          className="control"
          onClick={() => {
            if (selectedDay == -1) return

            addHistEntry(date, selectedDay)

            setSelectedDay(-1)

            if (yearTraining) {
              setDate(fixedDay(randomDate(startDate, endDate)))
            } else {
              setDate(randomDate(startDate, endDate))
            }
          }}
        >
          Submit
        </button>
      </div>

      <div className="history">
        <h2>History</h2>

        <div id="entries">
          {history.map((entry) => {
            let entryDate = new Date(entry.date)
            return (
              <div
                className="hist-entry"
                style={`background-color: ${
                  entryDate.getDay() == entry.answer
                    ? "var(--right)"
                    : "var(--wrong)"
                }`}
              >
                {entryDate.toLocaleDateString("en-UK")}

                <div>{`Your: ${days[entry.answer]}`}</div>
                <div>{`Correct: ${days[entryDate.getDay()]}`}</div>
              </div>
            )
          })}

          <div ref={bottomHistoryRef} />
        </div>

        <div id="bottom-line"></div>
      </div>
    </>
  )
}
