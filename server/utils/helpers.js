export const validateSuggestion = (obj) =>{
    // Check if the required keys exist in the object
 if (obj.hasOwnProperty('text') && obj.hasOwnProperty('author'))
 {
   if(obj.author.hasOwnProperty('name') && obj.author.hasOwnProperty('authorID')) return true; // Object is valid
 }

 return false; // Object is invalid
}