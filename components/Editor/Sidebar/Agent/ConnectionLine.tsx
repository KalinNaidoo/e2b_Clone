export interface Props {
  className: string
}

function ConnectionLine({ className }: Props) {
  return (
    <div className={`${className} border-l my-2 border-slate-200`} />
  )
}

export default ConnectionLine
