'use client'

import { DragDropContext } from '@hello-pangea/dnd'

export default function DraggableContainer ({ children, onDragEnd }) {
  return (
    <DragDropContext
      className="dragndrop-context__container"
      onDragEnd={onDragEnd}
    >
      {children}
    </DragDropContext>
  )
}
