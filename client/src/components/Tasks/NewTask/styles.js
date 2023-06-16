export const styles={
    container:{
        position:'relative', 
        mb:3,
    },
    input:{
        height:'44px', 
        width:'80%', 
        padding:0, 
        lineHeight:'30px', 
        border:'none',
    },
    btn:{
        position:'absolute', 
        height:'55px', 
        lineHeight:'50px', 
        right:0, 
        top:0, 
        margin:0, 
        padding:0, 
        width:'20%',
        backgroundColor:'#5dbede',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        color:'white',
        "&:hover":{
            color:'#5dbede',
            backgroundColor:'#efefef'
        }
    },
    taskContainer:{
        display:'flex',
      alignItems:'center',
      justifyContent:'space-between',
      mb:2
    },
    btnGroup:{
        height:'100%'
    },
    helperText:{
        position:'absolute',
        left:0,
        top:'53px',
        color:'rgba(0,0,0,0.5)'
    },
    saveBtn:{
        
        
        
       
        margin:0, 
        padding:0, 
        
        backgroundColor:'#5dbede',
        
        color:'white',
        "&:hover":{
            color:'#5dbede',
            backgroundColor:'#efefef'
        }
    },
    saveWrapper:{
        display:'flex', 
        justifyContent:'center', 
        height:'35px', mt:2
    }
}