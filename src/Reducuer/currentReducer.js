export const currentReducer = (state, action)=>{
    switch(action.type){
        case "event":
            return{
                ...state,
                isEvent:true,
                isNabor:false,
                data: action.payload
            }
        
        case "naibor":
            return{
                ...state,
                isEvent:false,
                isNabor:true,
                data: action.payload
            }
    }
}