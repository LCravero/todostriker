'use client'

export default function ListItem (props) {
  const { data } = props

  return (
    <div className="list-item__container">
      {JSON.stringify(data, null, 2)}
    </div>
  )
}
