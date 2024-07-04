import { FaRegLightbulb, FaRegBell } from 'react-icons/fa';
import { BsCursorFill, BsTrash } from 'react-icons/bs';
import { HiOutlinePencil } from 'react-icons/hi';
import { BiArchiveOut } from 'react-icons/bi';
import ListItem from './ListItem';
import { useState, useRef } from 'react';
import Model from './../Model/index';
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux';
const menuList = [
    {
        id: 1,
        title: "Notes",
        icon: <FaRegLightbulb className='text-xl' />,
        path: "/"
    },
    {
        id: 2,
        title: "Reminders",
        icon: <FaRegBell className='text-xl' />,
        path: "/reminders"
    },
    {
        id: 3,
        title: "Archive",
        icon: <BiArchiveOut className='text-xl' />,
        path: "/archive"
    },
    {
        id: 4,
        title: "Trash",
        icon: <BsTrash className='text-xl' />,
        path: "/trash"
    },
];



function SideBar() {
    const [Vissable, setVissable] = useState(false);
    const editlabel = useRef(null);
    const labelsList = useSelector(state => state.user.lables);

    return (<div className={`menu_wrapper mr-5 h-[584px] sticky bottom-0 `}>
        <div className="first_part">
            {menuList && menuList.slice(0, 2).map((item, index) => {
                return <ListItem
                    key={index}
                    title={item.title}
                    icon={item.icon}
                    path={item.path}
                />
            })}
        </div>
        <ListItem
            REF={editlabel}
            title="Edit Lables"
            icon={<HiOutlinePencil />}
            path={"/modelView"}
            onPress={()=>setVissable(true)}
        />
        {
            labelsList !== 0 && labelsList.map((item, index) => {
                return <ListItem
                    key={item.labelID}
                    title={item.title}
                    icon={<BsCursorFill />}
                    path={`/label/${item.title}/${item._id}`}
                // onPress={
                //     () => setVissable(true)
                // }
                />
            })
        }
        <div className="second_part">
            {menuList && menuList.slice(2).map((item, index) => {
                return <ListItem
                    key={index}
                    title={item.title}
                    icon={item.icon}
                    path={item.path}
                />

            })}
        </div>
        {Vissable && <Model
            setVissable={setVissable}
        />}
    </div>);
}

export default SideBar;