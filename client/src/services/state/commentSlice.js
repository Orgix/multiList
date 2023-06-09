import { createSlice} from '@reduxjs/toolkit'
import { fetchTaskSuggestions, postSuggestion, deleteSuggestion, editSuggestion} from '../actions/tasks';



const initialState = {
    isLoading: false,
    error:'',
    success:false,
    suggestions:[]
}

const suggestionSlice = createSlice({
    name:'suggestions',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
            .addCase(fetchTaskSuggestions.pending, (state, action) => {
                state.isLoading = true
                state.error = ''
            })
            .addCase(fetchTaskSuggestions.fulfilled, (state,action)=>{
                state.isLoading = false
                state.success = true
                state.suggestions = action.payload
            })
            .addCase(postSuggestion.fulfilled , (state,action)=>{
                state.suggestions.unshift(action.payload)
            })
            .addCase(deleteSuggestion.fulfilled, (state,action)=>{
                const {id} = action.payload;
                state.suggestions = state.suggestions.filter(suggestion => suggestion.id !== id)
            })
           .addCase(editSuggestion.fulfilled, (state,action)=>{
                
                const updatedSuggestion = action.payload
                console.log(updatedSuggestion)
                state.suggestions = state.suggestions.map(suggestion=>{
                    if(suggestion.id === updatedSuggestion.id){
                        return updatedSuggestion;
                    }
                    return suggestion
                })
           })
    }
})

export const getComments = (state) => state.suggestions.suggestions;
export default suggestionSlice.reducer