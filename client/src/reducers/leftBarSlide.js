const leftBarSlideReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_SILDE_BOOLEAN":
      return action.payload;
    default:
      return state;
  }
};

export default leftBarSlideReducer;
