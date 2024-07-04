import ToolTip from "../Tooltip";
import { useState } from 'react';


function RoundButton({ icon, toolTip, onPress, small, active,bottomWrapper,reference }) {
    const [visable, setVisable] = useState(false)
    const showTooltip = () => setVisable(true)
    const hideTooltip = () => setVisable(false)


    return (
       <div className="relative" ref={reference}>
        <div
            onClick={onPress}
            id='menu_btn' className={`${small ? "w-[30px]" : "w-[40px]"} ${small ? "h-[30px]" : "h-[40px]"} flex justify-center items-center cursor-pointer ${active===true && "bg-slate-200"} hover:bg-slate-200 rounded-full group relative`}
            onMouseOver={showTooltip}
            onMouseOut={hideTooltip}
        >
            {icon}
            {visable && <ToolTip text={toolTip} ></ToolTip>}
            
        </div>
        {bottomWrapper}
       </div>
    );
}

export default RoundButton;