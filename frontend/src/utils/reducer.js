
 const reducer = (state,action) => {
    switch(action.type){
      case 'FETCH_REQUEST':
        return {...state, loading:true};
      case 'FETCH_SUCCESS': 
      return {...state, products:action.payload, loading:false};
      case 'FETCH_FAILURE': 
      return {...state, error: action.payload, loading:false};
       default:return state
  };
 }
export default reducer