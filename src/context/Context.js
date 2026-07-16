import { createContext, useReducer } from "react";

export const GlobalContext = createContext('Initial Value')

let data = {
    user:{},
    isLogin: null
}

const ContextProvider = ({children}) => {
    const [user, dispatch] = useReducer(reducer, data)

    return (<GlobalContext.Provider value={[user, dispatch]}>
        {children}
    </GlobalContext.Provider>)
}
    
export default ContextProvider

const reducer = (user, action) =>{
    if(action.type === 'USER_LOGIN'){
        console.log(action);
        
        return {...user, isLogin:true, user:action.user}
    }
    else if(action.type === 'USER_LOGOUT'){
        return {...user, isLogin: false, user: {}}
    }
    else{
        return user
    }
}