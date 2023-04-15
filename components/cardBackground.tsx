import { PropsWithChildren } from 'react'

interface MyProps {}

const CardBackground: React.FC<PropsWithChildren<MyProps>> = (
  props: PropsWithChildren<MyProps>
) => {
  return (
    <div className="card-background">
      <div className="card-frame">{props.children}</div>
    </div>
  )
}

export default CardBackground
