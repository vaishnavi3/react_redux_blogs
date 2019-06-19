export default ( state = [], action) => {
  switch (action.type) {
    case 'FETCH_USER':
      // returns new array
      // similar to state.push(action.payload)
      // however push() changes the original arr instead of creating a new one
      return [...state, action.payload];
    default:
      return state;
  }
}
