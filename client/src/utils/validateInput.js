export const validateLoginData = (state, keys) =>{
    //validate email and password. email needs to have . and @ and a certain length that is required(about 13) and password min 8 max 20
    const error = keys.filter(key=>{
      const val = state[key]
      if(key === 'password'){
        if(val.length < 8 || val.length > 20) return true
      }
      else if(val.indexOf('@') === -1 || val.indexOf('.')=== -1 || val.length < 15) return true;
  
      return false;
    })
  
    return error.length === 0 
  }
 
 export const validateRegisterData = (state,keys)=>{
    const error = keys.filter(key=>{
      const val = state[key]
      if(key==="firstName" || key==="lastName"){
        if(val.length < 5 || val.length > 14) return true
      }
      else if(key==="password" || key==="confirmPassword"){
        if(val.length < 8 || val.length > 20) return true
      }
      else{
        if(val.indexOf('@') === -1 || val.indexOf('.')=== -1 || val.length < 15) return true
      }
      return false;
    })
    return error.length === 0 && state["password"] === state["confirmPassword"];
  }