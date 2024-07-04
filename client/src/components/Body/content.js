import { useEffect } from 'react';
import {  useLocation} from 'react-router-dom';
import Header from '../Header';
import Trash from '../Trash';
import Home from './../Home/index';

function Content() {
    const location = useLocation();

    useEffect(()=>{
       path = location.pathname;
    },[])
    window.addEventListener("resize", () => {
        console.log(window.screen.width);
    })
    const scrren = window.screen.width - 280;
    return (<div className={`w-[${scrren}]`}>

      {
         location.pathname === "/trash" && <Trash/>
      }
    </div>);
}

export default Content;