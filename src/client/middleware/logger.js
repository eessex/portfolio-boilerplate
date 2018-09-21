export const loggerMiddleware = ({ getState, dispatch }) => next => action => {
  console.log(`${action.type}`)
  next(action)
}
