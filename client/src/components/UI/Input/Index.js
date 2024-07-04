import { useField } from 'formik'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
function Input({ labelText, placeholder, passwordFiled, vissable, setVissable,value, ...props }) {
    const [field, meta] = useField(props);
    return (<>
        {passwordFiled ? (<div className="input_wrapper my-2">
            <label className="font-main font-semibold">{labelText}</label>
            <div className="input_box mt-1">
                <div className="password_wrapper relative">
                    <input
                        value={value}
                        type={field.type}
                        name={field.name}
                        placeholder={placeholder}
                        className="w-full border border-stone-400 rounded-xl outline-none py-2 px-2 focus:border-blue-500"
                        {...field} {...props}
                    />
                    <div className="password_handler absolute top-[50%] translate-y-[-50%] right-3 cursor-pointer"
                        onClick={() => setVissable(!vissable)}
                    >
                        {vissable ? <MdVisibilityOff className='text-[#95a5a6]' /> : <MdVisibility className='text-[#95a5a6]' />}
                    </div>
                </div>
                {meta.error && meta.touched && <div className='error text-red-500 font-main'>{meta.error}</div>}
            </div>
        </div>) : (<div className="input_wrapper my-2">
            <label className="font-main font-semibold">{labelText}</label>
            <div className="input_box mt-1">
                <input
                value={value}
                    type={field.type}
                    name={field.name}
                    placeholder={placeholder}
                    className="w-full border border-stone-400 rounded-xl outline-none py-2 px-2 focus:border-blue-500"
                    {...field} {...props}
                />
                {meta.error && meta.touched && <div className='error text-red-500 font-main'>{meta.error}</div>}
            </div>
        </div>)}
    </>);
}

export default Input;