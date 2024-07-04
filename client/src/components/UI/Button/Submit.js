function Submit({buttonTxt,type}) {
    return (<button className="w-full bg-button py-2 font-main rounded-md text-white"
    type={type}
    >{buttonTxt}</button>);
}

export default Submit;