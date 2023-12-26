// EmployeeSidebar.jsx
import React, { useState } from 'react';
import Link from 'next/link';
import SidebarItem from './SidebarItem';
import './EmployeeSidebar.css'; // Import CSS module for styling
const arr = ["Cuộc hẹn", "Nha sĩ", "Bệnh nhân"]
const sidebarItems = [
    { link: '/nhanvien/appointments', text: 'Cuộc hẹn' },
    { link: '/nhanvien/dentists', text: 'Nha sĩ' },
    { link: '/nhanvien/patients', text: 'Bệnh nhân' },
];
const EmployeeSidebar = () => {
    const [chosen, setChosen] = useState(0);

    const handleSelect = (index) => {
        setChosen(index);
    };
    return (
        <div className='sidebar'>
            <div className='sidebar-title-wrap'>
                <div className='sidebar-title'>
                    <Link href="/nhanvien">
                        <p className='title'>Nhân viên</p>
                    </Link>

                </div>
            </div>

            <div className='nav'>
                <ul>
                    {/* <li>
                        <div className='navItem'>
                            <Link href="/nhanvien/appointments">
                                <p className='navLink'>Cuộc hẹn</p>
                            </Link>
                        </div>

                    </li>
                    <li>
                        <div className='navItem'>
                            <Link href="/nhanvien/dentists">
                                <p className='navLink'>Nha sĩ</p>
                            </Link>
                        </div>
                    </li>
                    <li>
                        <div className='navItem'>
                            <Link href="/nhanvien/patients">
                                <p className='navLink'>Bệnh nhân</p>
                            </Link>
                        </div>
                    </li> */}
                    {sidebarItems.map((item, index) => (
                        <SidebarItem
                            key={index}
                            link={item.link}
                            text={item.text}
                            selected={index === chosen}
                            onSelect={() => handleSelect(index)}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default EmployeeSidebar;
