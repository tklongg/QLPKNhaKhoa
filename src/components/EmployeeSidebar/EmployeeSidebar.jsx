// EmployeeSidebar.jsx
import React, { useState } from 'react';
import Link from 'next/link';
import SidebarItem from './SidebarItem';
import './EmployeeSidebar.css'; // Import CSS module for styling
const arr = ["Cuộc hẹn", "Nha sĩ", "Bệnh nhân"]
import { useSearchParams } from 'next/navigation';
import useLocalStorage from '@/src/hooks/useLocalStorage';
const sidebarItems = [
    { link: '/dashboard/appointments', text: 'Cuộc hẹn' },
    { link: '/dashboard/dentists', text: 'Nha sĩ' },
    { link: '/dashboard/patients', text: 'Bệnh nhân' },
    { link: '/dashboard/employees', text: 'Nhân viên' },
];
const EmployeeSidebar = () => {
    const [userData, setUserData] = useLocalStorage("userData", "")
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
                    {
                        userData.userType != "Patient" && <SidebarItem
                            key={0}
                            link={sidebarItems[0].link}
                            text={sidebarItems[0].text}
                            selected={0 === chosen}
                            onSelect={() => handleSelect(0)}
                        />
                    }
                    {
                        userData.userType != "Patient" && <SidebarItem
                            key={1}
                            link={sidebarItems[1].link}
                            text={sidebarItems[1].text}
                            selected={1 === chosen}
                            onSelect={() => handleSelect(1)}
                        />
                    }
                    {
                        <SidebarItem
                            key={2}
                            link={sidebarItems[2].link}
                            text={sidebarItems[2].text}
                            selected={2 === chosen}
                            onSelect={() => handleSelect(2)}
                        />
                    }
                    {
                        (userData.userType != "Patient" && userData.userType != "Dentist") && <SidebarItem
                            key={3}
                            link={sidebarItems[3].link}
                            text={sidebarItems[3].text}
                            selected={3 === chosen}
                            onSelect={() => handleSelect(3)}
                        />
                    }
                    {/* {sidebarItems.map((item, index) => (
                        <SidebarItem
                            key={index}
                            link={item.link}
                            text={item.text}
                            selected={index === chosen}
                            onSelect={() => handleSelect(index)}
                        />
                    ))} */}
                </ul>
            </div>
        </div>
    );
};

export default EmployeeSidebar;
