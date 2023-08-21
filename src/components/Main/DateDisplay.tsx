type Props = {
  darkMode: boolean
  date: Date
}

export function DateDisplay({ darkMode, date }: Props) {
  return (
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
  )
}
