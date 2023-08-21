import { useEffect, useState } from "preact/hooks"
import { History, HistoryType } from "./components/History/History"
import "./index.css"
import "./base.css"
import { MainSection } from "./components/Main/MainSection"
import { getLocalValue, randomDate, yearsDayTraining, fixedDay, toggleDarkMode, saveLocalStorage } from "./helper"
import { Slider } from "./components/Control/Slider"
import { SmallInput } from "./components/Control/SmallInput"
import { useLocalValue, useLocalDate } from "./hooks"

export function App() {
  const [history, setHistory] = useLocalValue<HistoryType[]>("HISTORY", [])

  const [startDate, setStartDate] = useLocalDate("START_DATE", "1900-01-01T03:06:28.000Z")

  const [endDate, setEndDate] = useLocalDate("END_DATE", "2100-01-01T03:06:28.000Z")

  const [darkMode, setDarkMode] = useLocalValue("DARK_MODE", true)

  const [dayTraining, setDayTraining] = useLocalValue("DAY_TRAINING", false)

  const [yearTraining, setYearTraining] = useLocalValue("YEAR_TRAINING", false)

  const [numberDayTraining, setNumberDayTraining] = useLocalValue("N_DAY_TRAINING", 0)

  const [date, setDate] = useLocalDate("DATE", JSON.stringify(randomDate(startDate, endDate)))

  const [selectedDay, setSelectedDay] = useState(-1)


  useEffect(() => {toggleDarkMode(darkMode)}, [darkMode])

  function toggleDayTraining() {
    if (!dayTraining) {
      let year = yearsDayTraining[numberDayTraining]

      let start = new Date(year, 0, 1)
      let end = new Date(year + 1, 0, 1)

      saveLocalStorage("SAVED_START_DATE", startDate)
      saveLocalStorage("SAVED_END_DATE", endDate)
      saveLocalStorage("SAVED_DATE", date)

      setStartDate(start)
      setEndDate(end)

      setDate(randomDate(start, end))
    } else {
      let start = new Date(getLocalValue("SAVED_START_DATE", "1900-01-01T03:06:28.000Z"))
      let end = new Date(getLocalValue("SAVED_END_DATE", "2100-01-01T03:06:28.000Z"))

      setStartDate(start)
      setEndDate(end)

      setDate(new Date(getLocalValue("SAVED_DATE", "1968-07-03T03:06:28.000Z")))
    }
  }

  function toggleYearTraining() {
    if (!yearTraining) {
      localStorage.setItem("SAVED_DATE", JSON.stringify(date))
      setDate(fixedDay(randomDate(startDate, endDate)))
    } else {
      setDate(new Date(getLocalValue("SAVED_DATE", "1968-07-03T03:06:28.000Z")))
    }
  }

  function addHistEntry(date: Date, answer: number) {
    setHistory((currentHistory:HistoryType[]) => {
      let entry: HistoryType = {
        id: crypto.randomUUID(),
        date: date,
        answer: answer,
      }

      return [...currentHistory, entry]
    })
  }

  function onSubmit() {
    if (selectedDay == -1) return

    addHistEntry(date, selectedDay)

    setSelectedDay(-1)

    if (yearTraining) {
      setDate(fixedDay(randomDate(startDate, endDate)))
    } else {
      setDate(randomDate(startDate, endDate))
    }
  }

  function newStartDate(value: number) {
    setStartDate(new Date(value, 0, 1))
  }

  function newEndDate(value: number) {
    setEndDate(new Date(value, 0, 1))
  }

  function onDayTrainingChange(value: number) {
    if (dayTraining) {
      let year = yearsDayTraining[value]

      let start = new Date(year, 0, 1)
      let end = new Date(year + 1, 0, 1)

      setStartDate(start)
      setEndDate(end)

      setNumberDayTraining(value)
      setDate(randomDate(start, end))
    }else{
      setNumberDayTraining(value)
    }
  }

  return (
    <>
      <ul id="navbar">
        <li>
          From:
          <SmallInput
            id="since"
            className="range"
            limits={[500, 3000, 10]}
            value={startDate.getFullYear()}
            setter={newStartDate}
          />
        </li>

        <li>
          Until:
          <SmallInput
            id="until"
            className="range"
            limits={[500, 3000, 10]}
            value={endDate.getFullYear()}
            setter={newEndDate}
          />
        </li>

        <li class="button" id="clear-hist" onClick={() => setHistory([])}>
          Clear History
        </li>

        <li>
          Dark mode
          <Slider id="dark-mode" state={darkMode} setter={setDarkMode} />
        </li>

        <li class="game-modes">
          <SmallInput
            id="day-training-input"
            className="day-training"
            limits={[0, 6, 1]}
            value={numberDayTraining}
            setter={onDayTrainingChange}
          />
          Day &nbsp;&nbsp;&nbsp;
          <Slider
            id="day-training"
            state={dayTraining}
            setter={setDayTraining}
            toggle={toggleDayTraining}
          />
        </li>

        <li class="game-modes">
          Year &nbsp;&nbsp;&nbsp;
          <Slider
            id="year-training"
            state={yearTraining}
            setter={setYearTraining}
            toggle={toggleYearTraining}
          />
        </li>
      </ul>

      <MainSection
        darkMode={darkMode}
        date={date}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        onSubmit={onSubmit}
      />

      <History history={history} />
    </>
  )
}
