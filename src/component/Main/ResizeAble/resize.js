import './resize.css'
import { useMemo } from 'react';
import { useSelector } from 'react-redux'
export const Resize = ()=>{
    const select=useSelector((state)=>state.init)
    return (
     <div className='resize' style={{
        gridTemplateColumns: select.gridTemplateColumns,
        gridTemplateRows: select.gridTemplateRows,
        gap: select.gap,
        justifyItems: select.justifyItem,
        justifyContent: select.justifyContent,
        alignContent: select.alignContent,
        alignItems:select.alignItem
     }}>
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>
            <div>Item 4</div>
            <div>Item 5</div>
            <div>Item 6</div>
            <div>Item 7</div>
            <div>Item 8</div>
            <div>Item 9</div>
     </div>
    )
}