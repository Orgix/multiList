export const determineUser = (req,res,next)=>{
    const {userId} = req.params;
    //if userId is defined, this means we're at the /profile/:id/ whilst if undefined we're at the /profile/me.
    if(userId){
        req.determinedUser = "id"
    }else{
        req.determinedUser = "me"
    }
    next()
}

export const compareTokens = (req,res,next) =>{
    //if req.determinedUser !== 'id'
    //get userToken from searching the userId with user model. userToken can be acquired from req.headers.authorization
    //if tokens do not match return false
    //in other case return true
    next();
}
