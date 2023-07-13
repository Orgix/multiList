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
      if(key === "username"){
        if(val.length < 6 || val.length > 16) return true
      }
      else if(key==="firstName" || key==="lastName"){
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

export const validateTask = (state, keys) =>{
  //validate the create Task form 
  const error = keys.filter(key=>{
    const val = state[key]
    if(key === 'title' && (val.length === 0 || val.length < 5 || val.length > 25)) return true;
    else if(key === 'scope' && val === '') return true;
    else if(key === 'priority' && val === '') return true;
    else if(key === 'description' && val.length >120) return true;
    return false;
  })
  return error.length === 0 
}

export const validateSettings = (state, keys)=>{
  const error = keys.filter(key=>{
      const val = state[key]
      if(key === 'username'){
        if(val.length < 6 || val.length > 16) return true;
      }
      if(key==="firstName" || key==="lastName"){
          if(val.length < 5 || val.length > 14) return true
      }
      else if(key === "email"){
          if(val.indexOf('@') === -1 || val.indexOf('.')=== -1 || val.length < 15) return true
      }
      return false;
  })
  if(state['passwordOld'].length === 0 && (state['passwordNew'].length > 0 && state['passwordNewConfirm'].length > 0)) error.push('passwordOld')
  else if(state['passwordOld'].length > 0 &&(state['passwordNew'].length ===0 && state['passwordNewConfirm'].length ===0)) error.push('passwordNew')
  else if(state['passwordNew'] !== state['passwordNewConfirm']) error.push('passwordNew1')
  else if((state['passwordNew'].length > 20 || state['passwordNew'].length < 8) && state['passwordNew'].length !== 0) error.push('passwordNew')
  return error.length === 0
}