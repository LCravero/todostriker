'use client'

import ListItem from './ListItem'

export default function List (props) {
  const { items } = props

  return (
    <div className="list__container">
      {
        items.length
          ? (
              items.map(({ id, ...restData }) => <ListItem data={restData} key={id} />)
            )
          : null
      }
    </div>
  )
}
