// import React, { useState } from 'react'
// import './style.css'
// const info = {
//     IDUser: 1,
//     ten: "Tang Kim Long",
//     gioiTinh: "Male",
//     tongTienDieuTri: 5000000.0,
//     tongTienThanhToan: 5000000.0,
//     thongTinTongQuan: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis, inventore. ",
//     soDienThoai: '0987479123'
// }

// const ThongTinCaNhan = () => {
//     const [userInfo, setUserInfo] = useState(info)
//     return (
//         <div className='info-container'>
//             <div className='inner'>
//                 <p><strong>Họ tên</strong>: {userInfo.ten}</p>
//                 <p><strong>Số điện thoại</strong>: {userInfo.soDienThoai}</p>
//                 <p><strong>Tổng tiền điều trị</strong>: {userInfo.tongTienDieuTri}</p>
//                 <p><strong>Tổng tiền thanh toán</strong>: {userInfo.tongTienThanhToan}</p>
//                 <p><strong>Thông tin tổng quan</strong>: {userInfo.thongTinTongQuan}</p>
//             </div>
//         </div>
//     )
// }

// export default ThongTinCaNhan

import React, { useEffect, useState } from 'react';
import './style.css';
import axios from '@/util/axios';
import { useParams } from 'next/navigation';

const initialInfo = {
    IDUser: 1,
    ten: "Tang Kim Long",
    gioiTinh: "Male",
    tongTienDieuTri: 5000000.0,
    tongTienThanhToan: 5000000.0,
    thongTinTongQuan: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis, inventore. ",
    soDienThoai: '0987479123'
};

const ThongTinCaNhan = () => {
    const params = useParams()
    const userId = params.id
    const [userInfo, setUserInfo] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [newTongQuan, setNewTongQuan] = useState("");
    useEffect(() => {
        const fetchUserData = async () => {
            const { data } = await axios.get(`/api/user/${userId}`)
            console.log(data[0])
            setUserInfo(data[0])
            if (data[0].thongTinTongQuan != null) {
                setNewTongQuan(data[0].thongTinTongQuan)
            } else {
                setNewTongQuan("")
            }
        }
        fetchUserData()
    }, [])
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setUserInfo({
            ...userInfo,
            thongTinTongQuan: newTongQuan
        });
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setNewTongQuan(userInfo.thongTinTongQuan);
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        setNewTongQuan(e.target.value);
    };
    const handleChange = async () => {
        const data = {
            thongTinTongQuan: newTongQuan
        }
        try {
            await axios.patch(`/api/user/${userId}/hoso`, data)
            alert("cập nhật thông tin user thành côgn")
        } catch (error) {
            alert("cập nhật thông tin user không ok ")
        }
    }
    return (
        <div className='info-container'>
            <div className='inner'>
                <p><strong>Họ tên</strong>: {userInfo.ten}</p>
                <p><strong>Số điện thoại</strong>: {userInfo.soDienThoai}</p>
                <p><strong>Tổng tiền điều trị</strong>: {userInfo.tongTienDieuTri}</p>
                <p><strong>Tổng tiền thanh toán</strong>: {userInfo.tongTienThanhToan}</p>
                <div>
                    <p><strong>Thông tin tổng quan</strong>: {userInfo.thongTinTongQuan == null ? "Chưa có " : userInfo.thongTinTongQuan}</p>
                    <button className="health-info-adjust-btn" onClick={handleEditClick}>Sửa</button>
                    {isEditing && (
                        <div>
                            <textarea className='health-info-tarea' value={newTongQuan} onChange={handleInputChange} />
                            <button className="health-info-save-btn" onClick={handleSaveClick}>Lưu</button>
                            <button className="health-info-cancel-btn" onClick={handleCancelClick}>Hủy</button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ThongTinCaNhan;

