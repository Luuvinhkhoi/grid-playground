import './resize.css'
import { useMemo } from 'react';
import { useSelector } from 'react-redux'
export const Resize = ()=>{
    const select=useSelector((state)=>state.init)
    const gridStyles = useMemo(() => ({
       gridTemplateColumns: select.gridTemplateColumns,
       gridTemplateRows: select.gridTemplateRows,
       gap: select.gap,
       justifyItems: select.justifyItem,
       justifyContent: select.justifyContent,
       alignContent: select.alignContent,
       alignItems:select.alignItem
   }), [select]);
    return (
     <div className='resize' style={gridStyles}>
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