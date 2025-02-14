import './sidebar.css'
import { useEffect, useState } from 'react'
import {  useSelector, useDispatch } from 'react-redux'
import { store } from '../../../store/store'
import { motion } from "framer-motion";
import { LayoutTemplate, BetweenVerticalStart,AlignHorizontalJustifyStart,AlignVerticalJustifyEnd} from 'lucide-react';
import { resetWorkspace, setAlignContents, setAlignItems, setGap, setGridTemplateColumns, setGridTemplateRows, setJustifyContents, setJustifyItems } from '../../../store/initial'
export const SideBar = ()=>{
    const [isOpen, setIsOpen]=useState(false)
    const dispatch=useDispatch()
    const initialSelect=useSelector((state)=>state.init)
    let gridTemplateColumns = useSelector((state) => state.init.gridTemplateColumns);
    let gridTemplateRows = useSelector((state) => state.init.gridTemplateRows);
    const gap = useSelector((state) => state.init.gap);
    let columnsValues = initialSelect.gridTemplateColumns.split(' ').map(val => parseFloat(val));
    let rowsValues = initialSelect.gridTemplateRows.split(' ').map(val => parseFloat(val));
    const [inputValues, setInputValues] = useState({
        "Grid Template Columns": columnsValues,
        "Grid Template Rows": rowsValues,
        "Gap": [1,1]
    });    
    const [unit, setUnit] = useState({
        "Grid Template Columns": ["fr", "fr", "fr"],
        "Grid Template Rows": ["fr", "fr", "fr"],
        "Gap": ["rem", "rem"]
    });
    const init=Object.values(initialSelect)
    const dropdowns=[
        {
            id: 1,
            title: 'Grid Template Columns',
            svg:<LayoutTemplate></LayoutTemplate>,
            selections: ['Grid column 1', 'Grid column 2', 'Grid column 1'],
            mesure:['fr', 'px']
        },
        {
            id: 2,
            title: 'Grid Template Rows',
            svg:<LayoutTemplate></LayoutTemplate>,
            selections: ['Grid row 1', 'Grid row 2', 'Grid row 3'],
            mesure:['fr','px']
        },
        {
            id: 3,
            title: 'Gap',
            svg:<BetweenVerticalStart/>,
            selections: ['Row gap', 'Column gap'],
            mesure:['rem','px']
        },
        {
            title:'Justify Item',
            svg:<AlignHorizontalJustifyStart />,
            selections:['stretch', 'start', 'center', 'end']
        },
        {
            title:'Align Item',
            svg:<AlignVerticalJustifyEnd />,
            selections:['stretch', 'start', 'center', 'end']
        },
        {
            title:'Justify Content',
            svg:<AlignHorizontalJustifyStart />,
            selections:['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly']
        },
        {
            title:'Align Content',
            svg:<AlignVerticalJustifyEnd />,
            selections:['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly']
        },   
    ]
    const handleChange = (title, value, index) => {
        let newValue = value  
        if (newValue === "") {
            newValue = "0";
        } else {
            newValue = newValue.replace(/^0+(?=\d)/, "");
        }       
        setInputValues(prev => ({
            ...prev,
            [title]: prev[title].map((val, i) => i === index ? newValue : val)
        }));
        if(title==='Grid Template Columns'){
            let newColumns = init[0].split(' '); 
            newColumns[index]=`${newValue}${unit['Grid Template Columns'][index]}`
            dispatch(setGridTemplateColumns(newColumns.join(' ')));
        } else if(title==='Grid Template Rows'){
            let newColumns = init[1].split(' '); 
            newColumns[index]=`${newValue}${unit['Grid Template Rows'][index]}`
            dispatch(setGridTemplateRows(newColumns.join(' ')));
        } else if(title==='Gap'){
            let newColumns = init[2].split(' '); 
            newColumns[index]=`${newValue}${unit['Gap'][index]}`
            dispatch(setGap(newColumns.join(' ')));
        } 
    };
    const handleSelectionChange=(title, value)=>{
        if(title==='Justify Item'){
            dispatch(setJustifyItems(value))
        } else if(title==='Align Item'){
            dispatch(setAlignItems(value))
        } else if(title==='Justify Content'){
            dispatch(setJustifyContents(value))
        } else if(title==='Align Content'){
            dispatch(setAlignContents(value))
        }
    }
    const handleUnitChange=(title,index, newUnit)=>{
        setUnit(prev => ({
            ...prev,
            [title]: prev[title].map((unit, i) => i === index ? newUnit : unit)
        }));  
        if(title==='Grid Template Columns'){
            let columnsArray = gridTemplateColumns.split(" ");
            let value = parseFloat(columnsArray[index]); 
            columnsArray[index] = `${value}${newUnit}`; 
            dispatch(setGridTemplateColumns(columnsArray.join(" ")));;
        } else if(title==='Grid Template Rows'){
            let columnsArray = gridTemplateRows.split(" ");
            let value = parseFloat(columnsArray[index]);
            columnsArray[index] = `${value}${newUnit}`; 
            dispatch(setGridTemplateRows(columnsArray.join(" ")));;
        } else if(title==='Gap'){
            let columnsArray = gap.split(" ");
            let value = parseFloat(columnsArray[index]); 
            columnsArray[index] = `${value}${newUnit}`;
            dispatch(setGap(columnsArray.join(" ")));;
        }
    }
    const resetButton= async()=>{
        await dispatch(resetWorkspace())
        setInputValues({
            "Grid Template Columns": [1,1,1],
            "Grid Template Rows": [1,1,1],
            "Gap": [1,1]
        });
        setUnit({
            "Grid Template Columns": ["fr", "fr", "fr"],
            "Grid Template Rows": ["fr", "fr", "fr"],
            "Gap": ["rem", "rem"]
        });

    }
    
    return (
     <div className='sideBar'>
        <div className='container'>
            <div style={{fontSize:'18px'}}>CSS Container</div>
            <div style={{
                display:'inline-block', 
                padding:'1rem 3rem', 
                float:'right', 
                margin:'1rem 0.5rem 1rem 0', 
                borderRadius: '.5rem', 
                backgroundColor:'rgb(36, 41, 45)',
                cursor:'pointer'
            }}
                onClick={()=>resetButton()}
            >
                    Reset
            </div>
            <div className='container-items'>
                {dropdowns.map((item, index)=>
                   item.id ? (
                    <div>
                        <div className='item' onClick={()=>{if(!item.id){setIsOpen(null)} else{setIsOpen(isOpen===item.id ? null : item.id )}}}>
                            <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
                                <div style={{padding:'.7rem', borderRadius:'0.5rem', backgroundColor:'rgb(44, 50, 54)'}}>{item.svg}</div>
                                <div>
                                    <div style={{marginLeft:'.5rem', marginBottom:'.5rem'}}>
                                        <p>{item.title}</p>
                                    </div>
                                    <div className='item-value'>
                                        <p>{init[index]}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {isOpen===item.id ? (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }} 
                                animate={{ height: isOpen === item.id ? "auto" : 0, opacity: isOpen === item.id ? 1 : 0 }} 
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="selection"
                            >
                                {item.selections.map((selection, index) => (
                                <div key={index}>
                                    <p>{selection}</p>
                                    <div className="input-measurment">
                                    <input type="number" step={1} min={0} max={10} 
                                            onChange={(e) => handleChange(item.title, e.target.value, index)} 
                                            value={inputValues[item.title][index] || 0}
                                            style={{fontWeight:'600'}} />
                                    <select onChange={(e) => handleUnitChange(item.title, index, e.target.value)}  
                                            value={unit[item.title][index]}>
                                        {item.mesure.map((mesurement) => (
                                        <option key={mesurement} value={mesurement} style={{fontWeight:'600'}}>{mesurement}</option>
                                        ))}
                                    </select>
                                    </div>
                                </div>
                                ))}
                            </motion.div>
                            ) : (
                                <div></div>
                        )}
                   </div>
                ):(
                  <div>
                        <div className='item' onClick={()=>{if(!item.id){setIsOpen(null)} else{setIsOpen(isOpen===item.id ? null : item.id )}}}>
                                <div style={{display:'flex',alignItems:'center', gap:'1rem'}}>
                                    <div style={{padding:'.7rem', borderRadius:'0.5rem', backgroundColor:'rgb(44, 50, 54)'}}>{item.svg}</div>
                                    <div>
                                        <div style={{marginLeft:'.5rem', marginBottom:'.5rem'}}>
                                            <p>{item.title}</p>
                                        </div>
                                        <select onChange={(e)=>handleSelectionChange(item.title,e.target.value)}>
                                            {item.selections.map((select)=>
                                            <option value={select} style={{fontWeight:'600'}}>{select}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                        </div>
                  </div>
                )
                )}
            </div>
        </div>
     </div>
    )
 }