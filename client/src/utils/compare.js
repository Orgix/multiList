export const compareObjectValues = (obj1,obj2, keys) =>{
    //differences in val keys will go here
    const differences = []

    //scan keys
    keys.forEach((key)=>{
        //for each key, if the values from objects are different, add the key to the array
        if(obj1[key] !== obj2[key]){
            differences.push(key)
        }
    })

    return differences
}

export const compareArrays = (finalArray, staticArray) => {
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
        if(!found) changes.push(`removed subtask with id: ${elem.id} , named: ${elem.name}`)
        else{
            //if found element has its completion toggled, add the correspondent message to activities
            if(elem.completed !== found.completed) changes.push(`modified subtask with id: ${found.id} : marked as ${found.completed ? 'completed' : 'not completed'}`)
            //if found element has the name changed, add the activity
            if(elem.name !== found.name) changes.push(`modified subtask with id: ${elem.id}: changed name from ${elem.name} to ${found.name}`)
        }
       
    })
    //filter the final array to find any new entries
    //in other words, filter out the already existing etnries
    const newEntries = finalArray.filter((finalObj)=> {
        return !staticArray.some((obj) => obj.id === finalObj.id)
    })

    //for each new entry, add a new activity to the list
    newEntries.forEach(entry=>{
        changes.push(`added a new subtask with id: ${entry.id} and name ${entry.name}`)
    })
    //return the list 
    return changes;
}