function ToolTip({text}) {
    return (<div
    className="absolute z-50 bg-slate-500 bottom-[-29px] px-2 font-secondary rounded-sm text-white text-[12px]"
    >{text}</div>);
}

export default ToolTip;