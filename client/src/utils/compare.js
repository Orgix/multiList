export const compareObjectValues = (obj1,obj2, keys, user) =>{
    //differences in val keys will go here
    const differences = []
    
    //scan keys
    keys.forEach((key)=>{
        //for each key, if the values from objects are different, add the key to the array
        if(obj1[key] !== obj2[key]){
            differences.push([user, key, obj2[key], obj1[key]])
        }
    })

    return differences
}

export const compareArrays = (finalArray, staticArray, user) => {
    //make stringified versions of both arrays
    const str1 = JSON.stringify(staticArray)
    const str2 = JSON.stringify(finalArray)

    //compare length of array and wether the strings match. if they do, no changes in the task list
    //return an empty array
    if(str1 === str2 && staticArray.length === finalArray.length) return []

    //array to save any changes
    const changes = []
    //for each element in the initial array
    staticArray.forEach(elem=> {
        //find if the id exists in the final array, this means the element is still there
        const found = finalArray.find(obj=>obj.id === elem.id)
        //if it's not there, add deletion message to the activities
        if(!found) changes.push([user, 'remove', elem.name])
        else{
            //if found element has its completion toggled, add the correspondent message to activities
            if(elem.completed !== found.completed) changes.push([user,'toggle', elem.name, found.completed])
            //if found element has the name changed, add the activity
            if(elem.name !== found.name) changes.push([user,'subtask', elem.name, found.name])
        }
    })
    //filter the final array to find any new entries
    //in other words, filter out the already existing etnries
    const newEntries = finalArray.filter((finalObj)=> {
        return !staticArray.some((obj) => obj.id === finalObj.id)
    })

    //for each new entry, add a new activity to the list
    newEntries.forEach(entry=>{
        changes.push([user,'add', entry.name])
    })
    //return the list 
    return changes;
}
//modify the pushes so they are of different types, according to activity schema.
//['title','privacy','subtasks','priority','subtask','toggle','add','remove']
//have a from and a to field, and preferably have the user a parameter
//array entry should be something like this 
//for editing a subtask changing its name  [username, ,'subtask', 'old_value', 'new_value']
// for deleting a subtask [username, 'remove', 'name']
// adding a subtask [username, 'add', 'name']
//toggling a subtask's completion [username, 'toggle', 'name', toggleStatus]