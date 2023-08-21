type Props = {
    id: string 
    state: boolean
    setter: (value: any) => void
    toggle?: () => void
}

export function Slider({ id, state, setter, toggle}:Props){

    return (
          <label class="switch">
            <input
              id={id}
              type="checkbox"
              checked={state}
              onChange={() => {
                setter(!state)
                toggle?.()
              }}
            />
            <span class="slider"></span>
          </label>
    )
}