// EmployeeSidebar.jsx
import React, { useState } from 'react';
import Link from 'next/link';
import SidebarItem from './SidebarItem';
import './EmployeeSidebar.css'; // Import CSS module for styling
const arr = ["Cuộc hẹn", "Nha sĩ", "Bệnh nhân"]
import { useSearchParams } from 'next/navigation';
const sidebarItems = [
    { link: '/dashboard/appointments', text: 'Cuộc hẹn' },
    { link: '/dashboard/dentists', text: 'Nha sĩ' },
    { link: '/dashboard/patients', text: 'Bệnh nhân' },
    { link: '/dashboard/employees', text: 'Nhân viên' },
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
                    <Link href="/dashboard">
                        <p className='title'>Dashboard</p>
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
