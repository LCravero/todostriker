/* eslint-disable camelcase */
const reducer = (state, action) => {
  const { type, payload } = action
  const newState = { ...state }

  switch (type) {
    case 'SET_TODO_TITLE': {
      const { title } = payload

      // return { ...state, title }
      newState.title = title
      break
    }
    case 'SET_TODO_DESCRIPTION': {
      const { description } = payload

      // return { ...state, description }
      newState.description = description
      break
    }
    case 'SET_TODO_PRIORITY': {
      const { priority } = payload

      // return { ...state, priority }
      newState.priority = priority
      break
    }
    case 'SET_TODO_COMPLETION': {
      const { is_completed } = payload

      newState.is_completed = is_completed
      break
    }
    case 'SET_TODO_EDITABLE': {
      const { editable, toUpdate } = payload

      newState.editable = editable
      newState.toUpdate = toUpdate
      break
    }
    case 'SAVE_TODO_CHANGES': {
      return { ...payload, editable: false, toUpdate: false }
    }
    case 'SAVE_TODO': {
      return { ...payload, editable: false, toUpdate: false }
    }

    default: {
      return newState
    }
  }

  return newState
}

export default reducer
