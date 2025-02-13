import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr',
    gap: '1rem 1rem',
    justifyItem: 'stretch',
    alignItem: 'stretch',
    justifyContent: 'start',
    alignContent: 'start'
}
const initalSlice=createSlice({
    name:'initial',
    initialState,
    reducers:{
        setGridTemplateColumns: (state, action) => {
            state.gridTemplateColumns = action.payload
        },
        setGridTemplateRows: (state, action) => {
            state.gridTemplateRows = action.payload  
        },
        setGap: (state, action) => {
            state.gap = action.payload
        },
        setJustifyItems: (state, action) => {
            state.justifyItem = action.payload
        },
        setAlignItems: (state, action) => {
            state.alignItem = action.payload
        },setJustifyContents: (state, action) => {
            state.justifyContent = action.payload
        },setAlignContents: (state, action) => {
            state.alignContent = action.payload
        },
        resetWorkspace: () => initialState
    }
})
export const { setGridTemplateColumns, setGridTemplateRows, setGap, setJustifyItems,setAlignItems, setJustifyContents, setAlignContents, resetWorkspace } = initalSlice.actions
export default initalSlice.reducer