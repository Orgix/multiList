import { createSlice} from '@reduxjs/toolkit'
import { fetchTaskSuggestions} from '../actions/tasks';


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
           
    }
})

export const getComments = (state) => state.suggestions.suggestions;
export default suggestionSlice.reducer