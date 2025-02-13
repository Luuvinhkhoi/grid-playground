import './sidebar.css'
import { useEffect, useState } from 'react'
import {  useSelector, useDispatch } from 'react-redux'
import { store } from '../../../store/store'
import { setAlignContents, setAlignItems, setGap, setGridTemplateColumns, setGridTemplateRows, setJustifyContents, setJustifyItems } from '../../../store/initial'
export const SideBar = ()=>{
    const [isOpen, setIsOpen]=useState(false)
    const dispatch=useDispatch()
    const initialSelect=useSelector((state)=>state.init)
    const gridTemplateColumns = useSelector((state) => state.init.gridTemplateColumns);
    const gridTemplateRows = useSelector((state) => state.init.gridTemplateRows);
    const gap = useSelector((state) => state.init.gap);
    const [localValues, setLocalValues] = useState({});
    const [inputValues, setInputValues] = useState({
        "Grid Template Columns": [],
        "Grid Template Rows": [],
        "Gap": []
    });    
    const [unit, setUnit] = useState({
        "Grid Template Columns": ["fr", "fr", "fr"],
        "Grid Template Rows": ["fr", "fr", "fr"],
        "Gap": ["rem", "rem"]
    });
    const init=Object.values(initialSelect)
    console.log(init)
    const dropdowns=[
        {
            id: 1,
            title: 'Grid Template Columns',
            selections: ['Grid column 1', 'Grid column 2', 'Grid column 1'],
            mesure:['fr', 'px']
        },
        {
            id: 2,
            title: 'Grid Template Rows',
            selections: ['Grid row 1', 'Grid row 2', 'Grid row 3'],
            mesure:['fr','px']
        },
        {
            id: 3,
            title: 'Gap',
            selections: ['Row gap', 'Column gap'],
            mesure:['rem','px']
        },
        {
            title:'Justify Item',
            selections:['stretch', 'start', 'center', 'end']
        },
        {
            title:'Align Item',
            selections:['stretch', 'start', 'center', 'end']
        },
        {
            title:'Justify Content',
            selections:['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly']
        },
        {
            title:'Align Content',
            selections:['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly']
        },   
    ]
    const handleChange = (title, value, index) => {
        let newValue = value  
        if (newValue === "") {
            newValue = "0";
        } else {
            // Xóa số 0 đứng đầu (chỉ khi nhập số mới)
            newValue = newValue.replace(/^0+(?=\d)/, "");
        }       
        setInputValues(prev => ({
            ...prev,
            [title]: prev[title].map((val, i) => i === index ? newValue : val)
        }));
        setLocalValues(prev => ({
            ...prev,
            [title]: prev[title] ? prev[title].map((val, i) => i === index ? newValue : val) : [newValue]
        }));
        console.log(inputValues)
        console.log(title)
        console.log(index)
        console.log(value)
        console.log(unit)
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
            let value = parseFloat(columnsArray[index]); // Lấy giá trị số của cột
            columnsArray[index] = `${value}${newUnit}`; // Thay đổi đơn vị
            dispatch(setGridTemplateColumns(columnsArray.join(" ")));;
        } else if(title==='Grid Template Rows'){
            let columnsArray = gridTemplateRows.split(" ");
            let value = parseFloat(columnsArray[index]); // Lấy giá trị số của cột
            columnsArray[index] = `${value}${newUnit}`; // Thay đổi đơn vị
            dispatch(setGridTemplateRows(columnsArray.join(" ")));;
        } else if(title==='Gap'){
            console.log(index)
            let columnsArray = gap.split(" ");
            let value = parseFloat(columnsArray[index]); // Lấy giá trị số của cột
            columnsArray[index] = `${value}${newUnit}`; // Thay đổi đơn vị
            dispatch(setGap(columnsArray.join(" ")));;
        }
    }
    useEffect(() => {
        if (initialSelect) {
            const columnsValues = initialSelect.gridTemplateColumns.split(' ').map(val => parseFloat(val));
            const rowsValues = initialSelect.gridTemplateRows.split(' ').map(val => parseFloat(val));
            
            setInputValues({
                "Grid Template Columns": columnsValues,
                "Grid Template Rows": rowsValues,
                "Gap": [1, 1] // Giá trị mặc định cho gap
            });
        }
    }, []);
    console.log(inputValues)
    return (
     <div className='sideBar'>
        <div className='container'>
            <div>Container</div>
            <div className='container-items'>
                {dropdowns.map((item, index)=>
                   item.id ? (
                    <div>
                        <div className='item' onClick={()=>{if(!item.id){setIsOpen(null)} else{setIsOpen(isOpen===item.id ? null : item.id )}}}>
                            <div>
                                <p>{item.title}</p>
                            </div>
                            <div className='item-value'>
                                <p>{init[index]}</p>
                            </div>
                        </div>
                        {isOpen===item.id ? (
                            <div className='selection'>
                                {item.selections.map((selection, index)=>
                                        <div>
                                            <p>{selection}</p>
                                            <div className='input-measurment'>
                                                <input type='number' step={1} min={0} max={10} onChange={(e)=>handleChange(item.title, e.target.value, index)} value={inputValues[item.title][index]||0}></input>
                                                <select onChange={(e)=>handleUnitChange(item.title,index,e.target.value)}  value={localValues[item.title]?.[index] ?? inputValues[item.title]?.[index] ?? "0"}>
                                                    {item.mesure.map((mesurement)=>
                                                      <option value={mesurement}>{mesurement}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                )}
                            </div>
                            ) : (
                                <div></div>
                        )}
                   </div>
                ):(
                  <div>
                        <div className='item' onClick={()=>{if(!item.id){setIsOpen(null)} else{setIsOpen(isOpen===item.id ? null : item.id )}}}>
                                <div>
                                    <p>{item.title}</p>
                                </div>
                                <select onChange={(e)=>handleSelectionChange(item.title,e.target.value)}>
                                    {item.selections.map((select)=>
                                       <option value={select}>{select}</option>
                                    )}
                                </select>
                        </div>
                  </div>
                )
                )}
            </div>
        </div>
     </div>
    )
 }