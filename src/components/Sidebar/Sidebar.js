import React from 'react';
import SidebarItem from './SidebarItem/SidebarItem';
import './Sidebar.scss';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <ul>
                <SidebarItem icon="discover" exact link="/discover" active>Discover</SidebarItem>
                <SidebarItem icon="recommended" exact link="/recommended" >Recommended</SidebarItem>
                <SidebarItem icon="favorites" exact link="/favorites" >Favorites</SidebarItem>
            </ul>
        </aside>
    )
}

export default Sidebar;