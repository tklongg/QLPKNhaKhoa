import React, { useState, useRef, useEffect } from 'react';
import axios from '@/util/axios';
import './style.css'
import { toast } from 'react-toastify';


const CCDCard = ({ IDThuoc, tenThuoc, onClick }) => {
    const handleDeleteThuoc = () => {
        onClick();
    };

    return (
        <div className='ccd-card'>
            <div className='inner-card' onClick={handleDeleteThuoc}>
                {IDThuoc} - {tenThuoc}
                <span className='delete-icon'>x</span>
            </div>
        </div>
    );
};

const AddCCD = ({ userInfo, setUserInfo, setCCDD }) => {
    // const [userInfo,setUserInfo] = useState(user)
    const [thuoc, setThuoc] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [ccd, setCCD] = useState(userInfo.chongChiDinh)
    const [selectedThuoc, setSelectedThuoc] = useState()
    const selectRef = useRef(null);
    const [ghiChu, setGhiChu] = useState(userInfo.ghiChu)
    const [tinhTrangDiUng, setTinhTrangDiUng] = useState(userInfo.tinhTrangDiUng)
    useEffect(() => {
        const fetchThuoc = async () => {
            const { data } = await axios.get('/api/thuoc')
            setThuoc(data)
        }
        fetchThuoc()
    }, [])
    const handleAddThuoc = () => {
        const selectedValue = selectRef.current.value;
        console.log("nè mày", selectedValue)
        const { IDThuoc, tenThuoc } = JSON.parse(selectedValue);

        setCCD([...ccd, { IDBenhNhan: userInfo.IDUser, IDThuoc, tenThuoc }]);

        console.log(ccd)
    };
    const filteredThuoc = thuoc.filter((item) =>
        item.tenThuoc.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleDeleteThuoc = (i) => {
        setCCD((prev) => prev.filter((item, index) => index !== i));
    };
    const handleChangeGhiChu = (e) => {
        setGhiChu(e.target.value);
    }
    const handleChangeDiUng = (e) => {
        setTinhTrangDiUng(e.target.value);
    }
    const handleSave = async (e) => {
        // e.preventDefault()
        setUserInfo({ ...userInfo, chongChiDinh: ccd, ghiChu: ghiChu, tinhTrangDiUng: tinhTrangDiUng })
        setCCDD(ccd)
        console.log(userInfo)
        await updateGhiChu()
    }
    const updateGhiChu = async () => {
        const body = {
            IDUser: userInfo.IDUser,
            chongChiDinh: ccd,
            ghiChu: ghiChu,
            tinhTrangDiUng: tinhTrangDiUng,
        }
        try {
            const result = await axios.patch(`/api/user/${userInfo.IDUser}/ghichu`, body)
            toast.info("thành công")
        } catch (error) {
            toast.error(error)
        }

    }
    return (
        <div className='ghichu-container'>
            <div className='ghichu'>
                <p>Ghi chú bệnh nhân</p>
                {/* <TextComponent text={gc} /> */}
                <p><strong>Tình trạng dị ứng</strong>: {userInfo != undefined ? userInfo.tinhTrangDiUng : "Không có"}</p>
                <input type="text" value={tinhTrangDiUng} onChange={handleChangeDiUng} className='input_diung' />
                <p><strong>Ghi chú bác sĩ</strong>: {userInfo != undefined ? userInfo.ghiChu : "Không có"}</p>
                <input type="text" value={ghiChu} onChange={handleChangeGhiChu} className='input_ghichu' />
            </div>
            <div className='form-section'>
                <p>Thuốc chống chỉ định đã chọn</p>
                <div className='ccd-list'>
                    {ccd.map((thuoc, index) => (
                        <CCDCard
                            key={index}
                            IDThuoc={thuoc.IDThuoc}
                            tenThuoc={thuoc.tenThuoc}
                            onClick={() => handleDeleteThuoc(index)}
                        />
                    ))}
                </div>
            </div>

            <div className='form-section'>
                <p>Thêm thuốc</p>
            </div>
            <div className='med-search-section'>
                <input
                    type='text'
                    placeholder='Tìm kiếm thuốc...'
                    value={searchTerm}

                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className='tooth-select'>
                <div className='section'>
                    <select
                        className='select-surfaces'
                        value={selectedThuoc}
                        ref={selectRef}
                        onChange={(e) => setSelectedThuoc(e.target.value)}
                    >
                        {filteredThuoc.map((item) => (
                            <option key={item.IDThuoc} value={JSON.stringify(item)}>
                                {item.tenThuoc}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='tooth-button' onClick={handleAddThuoc}>
                    Thêm
                </div>

            </div>
            <div className='ghichu-btn-container'>
                <div className='save-med-button' onClick={handleSave}>
                    Lưu
                </div>
                <div className='save-med-button' onClick={() => { }}>
                    Huy
                </div>
            </div>

        </div>
    );
};

export default AddCCD;
