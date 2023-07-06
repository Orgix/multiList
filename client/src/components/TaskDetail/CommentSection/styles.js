export const styles = {
    authorLink:{
        color:'black',
        "&:hover":{
            textDecoration: 'underline',
            color:'#5dbede'
        }
    },
    Editcontainer:{
        position:'relative', 
        mb:3,
        padding:0
    },
    input:{
        height:'30px', 
        width:'80%', 
        padding:0, 
        lineHeight:'30px', 
        border:'none',
    },
    saveEditbtn:{
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
}