export const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export const yearsDayTraining = [1700, 2022, 2023, 1900, 2002, 1800, 2026] // index = doomsday


export function getLocalValue<T>(key: string, defaultValue: T) {
    const localValue = localStorage.getItem(key)
    
    if (localValue === null) return defaultValue
    
    return JSON.parse(localValue)
}

export function saveLocalStorage(key:string, value:any){
    localStorage.setItem(key, JSON.stringify(value))
}

export function randomDate(start: Date, end: Date) {
  let nextDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))

  return nextDate
}

export function fixedDay(date: Date) {
  date.setDate(4)
  date.setMonth(3) // dia 04/04 doomsday
  return date
}

export function toggleDarkMode(darkMode:boolean){
    const root = document.querySelector(":root") as HTMLElement

    if (darkMode) {
      root.style.setProperty("--accent-color", "lightgray")
      root.style.setProperty("--background-color", "darkgray")
    } else {
      root.style.setProperty("--accent-color", "white")
      root.style.setProperty("--background-color", "lightgrey")
    }
    localStorage.setItem("DARK_MODE", JSON.stringify(darkMode))
}




