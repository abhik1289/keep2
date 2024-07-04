import { IoMenuSharp } from 'react-icons/io5'
import { BiGridAlt } from 'react-icons/bi';
import { AiOutlineReload, AiOutlineSearch, AiOutlineLogout } from 'react-icons/ai';
import { MdOutlineClose } from 'react-icons/md';
import RoundButton from '../UI/HeaderButton/RoundButton';
import logoSrc from "../../Asset/Images/logo.png"
import { useRef, useState } from 'react';
import useClickOutside from '../../helpers/useClickOutside';
import { useDispatch, useSelector } from 'react-redux';
import { menuClose, menuOpen } from '../../redux/features/MenuSlice';
import { logout } from '../../redux/features/AuthSlice'
import { useMediaQuery } from 'react-responsive';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import swal from 'sweetalert'
import toast, { Toaster } from 'react-hot-toast';
import { FaUserAlt } from 'react-icons/fa';
import { TfiViewList } from 'react-icons/tfi'
import { changeView } from '../../redux/features/NoteSlice';
import { setSearch } from '../../redux/features/SearchSlice';
function Header({ listView, setListView }) {
    const navigate = useNavigate()
    const location = useLocation();
    const searchREF = useRef(null);
    const [focus, setfocus] = useState(false);
    const [Text, setText] = useState("")
    const [responsive, setResponsive] = useState(false);
    const iconColor = "text-slate-600";
    const handleFocus = () => setfocus(true);
    const handleBlur = () => setfocus(false);
    const toogleSearch = () => {
        setResponsive(true)
    };
    const isMobile = useMediaQuery({ query: '(max-width: 750px)' })
    const isVissableSearchBar = useMediaQuery({ query: '(max-width: 750px)' })
    const dispatch = useDispatch();
    useClickOutside(searchREF, () => setResponsive(false));
    const menu = useSelector((state) => ({ ...state })).menubar;
    const userInfo = useSelector(state => state);
    const info = userInfo?.user?.info;
    const handleView = () => {
        Cookies.set("view", JSON.stringify(!listView));
        setListView(!listView);
        dispatch(changeView())
    }
    if (isMobile) {
        dispatch(menuClose())
    }
    const handleMenu = () => {
        if (menu.open == true) {
            dispatch(menuClose())
        } else {
            dispatch(menuOpen())

        }
    }
    const handleLogOut = () => {
        swal({
            title: "Logout",
            text: "If you want to log out",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    logOutExcute();
                }
            });

    }
    const logOutExcute = async () => {
        try {
            const res = await fetch("/logout", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (res.status === 200) {
                Cookies.remove('userInfo')
                Cookies.remove('labels')
                Cookies.remove('user')

                logout();
                navigate("/login", {
                    state: { logout: true }
                });
                window.location.reload();

            } else {
                toast.error("You are not  log out");
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleSearchText = (e) => {
         setText(e.target.value);
        dispatch(setSearch(e.target.value))
    }
    // setResponsive(false)

    return (<header className="static top-0 left-0 border-b flex border-b-slate-400 px-6 py-3 justify-between w-screen">

        {/* left part */}
        <div className="left_side flex items-center ">
            <RoundButton
                icon={<IoMenuSharp className={`text-2xl ${iconColor}`} />}
                toolTip="Menu"
                onPress={handleMenu}
            />
            <div className="main_wrapper flex items-center cursor-pointer" onClick={() => navigate("/")}>
                <div className="logo ml-2"
                    title='Keep'>
                    <img
                        src={logoSrc}
                        alt="logo_img"
                    />
                </div>
                <div className="app_name font-main text-icon font-semibold text-xl cursor-pointer"
                    title='Keep'>
                    Keep
                </div>
            </div>
        </div>
        {/* middle */}
        <div className="middle_part overflow-hidden rounded-xl hidden md:block">
            <div className={`serach_area_box w-[500px] border  h-[45px] flex px-1 relative ${focus && 'shadow-input_shadow '}`}>
                <RoundButton
                    icon={<AiOutlineSearch className='text-2xl text-icon group-hover:text-slate-800' />}
                    toolTip="Search"
                />
                <input
                    onChange={handleSearchText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className='w-full outline-none font-main tt'
                    type="text"
                    value={Text}
                />

                {Text && <RoundButton
                    onPress={() => setText("")}
                    icon={<MdOutlineClose

                        className='text-2xl text-icon group-hover:text-slate-800' />}
                    toolTip="Search"
                />}

            </div>
        </div>
        {responsive && <div ref={searchREF} className="responsive_search md:hidden  absolute z-30 bg-white">
            <div className={`serach_area_box w-[355px] border  h-[50px] flex px-1 relative rounded-lg overflow-hidden`}
                style={{
                    boxShadow: focus ? "0px 1px 4px #000000b0" : "none"
                }}
            >
                <RoundButton
                    icon={<AiOutlineSearch
                        className='text-2xl text-icon group-hover:text-slate-800' />}
                    toolTip="Search"
                />
                <input
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className='w-full outline-none font-main'
                    type="text"
                    onChange={(e) => dispatch(setSearch(e.target.value))}
                />

                <RoundButton
                    onPress={() => {
                        dispatch(setSearch(null))
                        setResponsive(false)
                    }}
                    icon={<MdOutlineClose className='text-2xl text-icon group-hover:text-slate-800' />}
                    toolTip="Search"
                />

            </div>
        </div>}
        {/* right */}
        <div className="right_part flex">
            <div className="div block md:hidden" onClick={toogleSearch} >
                <RoundButton
                    icon={<AiOutlineSearch className='text-2xl text-icon group-hover:text-slate-800' />}
                    toolTip="Search"
                />
            </div>
            {location.pathname === "/" &&
                <><RoundButton
                    icon={<AiOutlineReload className='text-2xl text-icon group-hover:text-slate-800' />}
                    toolTip="Reload"
                />
                    <RoundButton
                        onPress={handleView}
                        icon={listView ? <BiGridAlt
                            className='text-2xl text-icon group-hover:text-slate-800'
                        /> : <TfiViewList className='text-xl text-icon group-hover:text-slate-800' />}
                        toolTip={listView ? "Grid" : "List"}
                    /></>}
            <RoundButton
                onPress={handleLogOut}

                icon={<AiOutlineLogout className='text-2xl text-icon  group-hover:text-slate-800' />}
                toolTip="Logout"
            />
            <div onClick={() => navigate("/profile")} className="profile_view w-[40px] h-[40px] rounded-full overflow-hidden mx-2 cursor-pointer">
                {info?.profile_photo ? <img src={info?.profile_photo} alt="profile_pic" /> : <div className='icon w-full h-full relative bg-main-color flex justify-center items-center'><FaUserAlt /></div>}
            </div>
        </div>
        <Toaster />
    </header>);
}

export default Header;