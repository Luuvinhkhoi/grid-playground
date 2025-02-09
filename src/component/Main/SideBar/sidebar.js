import './sidebar.css'
import { useState } from 'react'
export const SideBar = ()=>{
    const [isOpen, setIsOpen]=useState(false)
    const dropdowns=[
        {
            id: 1,
            title: 'Grid Template Columns',
            selections: ['Grid column 1', 'Grid column 2', 'Grid column 1'],
            mesure:['fr','%']
        },
        {
            id: 2,
            title: 'Grid Template Rows',
            selections: ['Grid row 1', 'Grid row 2', 'Grid row 3'],
            mesure:['fr','%']
        },
        {
            id: 3,
            title: 'Gap',
            selections: ['Row gap', 'Column gap'],
            mesure:['fr','%']
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
    return (
     <div className='sideBar'>
        <div className='container'>
            <div>Container</div>
            <div className='container-items'>
                {dropdowns.map((item)=>
                   item.id ? (
                    <div>
                        <div className='item' onClick={()=>{if(!item.id){setIsOpen(null)} else{setIsOpen(isOpen===item.id ? null : item.id )}}}>
                            <div>
                                <p>{item.title}</p>
                            </div>
                            <div className='item-value'>
                                <p>1fr 1fr 1fr</p>
                            </div>
                        </div>
                        {isOpen===item.id ? (
                            <div className='selection'>
                                {item.selections.map((selection)=>
                                        <div>
                                            <p>{selection}</p>
                                            <div className='input-measurment'>
                                                <input></input>
                                                <select>
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
                                <select>
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