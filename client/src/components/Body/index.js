import HomeContent from "../Home/HomeContent";
import SideBar from "../SideBar";
import { useLocation } from 'react-router-dom';
import TrashContent from "../Trash/TrashContent";
import { useSelector } from 'react-redux';
import ViewArea from "../Model/ViewArea";
import ViewContent from "../Model/ViewContent";
import ArchiveContent from "../Archive/ArchiveContent";
import Model from "../Model";

function Body({ listView, setListView }) {
    const location = useLocation();
    var path;
    path = location.pathname;
    return (<section className="flex">
        <SideBar />
        {path === "/" ?
            <HomeContent
                listView={listView}
                setListView={setListView}
            /> :
            path === "/trash" ?
                <TrashContent /> :
                path === "/archive"
                    ? <ArchiveContent />
                    : path === "/modelView" ?
                        <Model /> : null}
    </section>);
}

export default Body;