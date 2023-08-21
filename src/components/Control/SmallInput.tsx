
type Props = {
    id: string 
    className: string
    limits: [min:number, max:number, step:number]
    value: number
    setter: (value:number) => void
}

export function SmallInput({ id, className, limits, value, setter} : Props){

    const [min, max, step] = limits

    return (
        <input
            id={id}
            class={className}
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => setter(parseInt((e.target as HTMLInputElement).value))}
          />
    )
}