import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()

//reducer function for workouts and set to export since it will be use in other files
//state reliable previous value and action is to check the action type if it is for set, create or delete(crud)
export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return { 
        workouts: action.payload 
        }
    case 'CREATE_WORKOUT':
      return { 
        workouts: [action.payload, ...state.workouts] 
      } 
    case 'DELETE_WORKOUT':
    return { 
        workouts: state.workouts.filter((w)=> w._id !== action.payload._id)
    } 
    default:
      return state
  }
}

export const WorkoutsContextProvider = ({ children }) => {
    // just same with usestate
  const [state, dispatch] = useReducer(workoutsReducer, { 
    workouts: null
  })
  
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </WorkoutsContext.Provider>
  )
}