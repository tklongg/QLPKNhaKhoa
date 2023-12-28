"use client"
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Tab from '@/src/components/Tab/Tab'
import Kehoachdieutri from '@/src/components/KeHoachDieuTri/Kehoachdieutri'
import './style.css'
const tabs = ['Thông tin cơ bản', 'Kế hoạch điều trị', 'Ghi chú', 'Thanh toán']
const page = () => {
    const [chosenTab, setChosenTab] = useState(0);
    const params = useParams()
    const id = params.id
    const handleTabClick = (index) => {
        setChosenTab(index);
    };
    const showTab = () => {
        switch (chosenTab) {
            case 0:
                return <div>Thông tin cơ bản</div>;
            case 1:
                return <Kehoachdieutri />
            case 2:
                return <div>Ghi chú</div>;
            case 3:
                return <div>Thanh toán</div>;
            default:
                return null;
        }
    }
    return (
        <>
            <div className='title-wrap'>
                <div className='page-title'>
                    <p>Chi tiết bệnh nhân</p>
                </div>
            </div>
            <div className='basic-info'>
                <div className="avatar-container">
                    <img
                        src="https://picsum.photos/200/300"
                        alt="Patient Avatar"
                        className="avatar"
                    />
                </div>
                <p className="patient-name">Nguyễn Văn A</p>
            </div>
            <div className='patient-detail'>
                <div className="tab-container">
                    <div className='nav-patient'>
                        {tabs.map((label, index) => (
                            <div
                                key={index}
                                className={`tab ${index === chosenTab ? 'active' : ''}`}
                                onClick={() => handleTabClick(index)}
                            >
                                {label}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <div className='tab-content'>
                {showTab()}
            </div>


        </>
    )
}

export default page