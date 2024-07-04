import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
function ListItem({ title, icon, path, onPress, REF }) {
    const location = useLocation();
    const pathName = location.pathname;
    const menu = useSelector(state => ({ ...state })).menubar;
    let isOpen = menu.open;
    return (<Link to={path}>
        <div ref={REF} onClick={onPress} className={`wrapper list_item pl-[12px]  flex items-center rounded-tr-full rounded-br-full my-1 py-1 ${path === pathName ? "text-slate-900" : "text-slate-700"}
          ${isOpen && path === pathName && "bg-[#feefc3]"}
          transition duration-200
          `}>
            <div className={`icon w-[50px] ${path  === pathName && "bg-[#feefc3]"} rounded-full h-[50px] flex justify-center items-center`}>{icon}</div>
            {isOpen && <div className={`title font-secondary font-medium pr-[120px] transition duration-200`}>{title}</div>}
        </div>
    </Link>);
}
export default ListItem;

