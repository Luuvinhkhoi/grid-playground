import './main.css'
import { SideBar } from './SideBar/sidebar.js'
import { Resize } from './ResizeAble/resize.js'
export const Main = ()=>{
   return (
    <div className='main'>
       <SideBar></SideBar>
       <Resize></Resize>
    </div>
   )
}