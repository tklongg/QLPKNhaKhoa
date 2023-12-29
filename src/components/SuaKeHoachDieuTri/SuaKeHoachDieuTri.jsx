// AddTreatment.jsx

import React, { useEffect, useState } from 'react';
import Calendar from '../Calender/Calender';
import CustomDropdown from '../ChooseDoctorDropdown/ChooseDoctorDropdown';
import './style.css';
import axios from '@/util/axios';
import { toast } from 'react-toastify';

const loaiRang = [
    { IDLoaiMatRang: "L", "tenLoaiRang": "Mặt trong" },
    { IDLoaiMatRang: "F", "tenLoaiRang": "Mặt ngoài" },
    { IDLoaiMatRang: "D", "tenLoaiRang": "Mặt xa" },
    { IDLoaiMatRang: "M", "tenLoaiRang": "Mặt gần" },
    { IDLoaiMatRang: "T", "tenLoaiRang": "Mặt đỉnh" },
    { IDLoaiMatRang: "R", "tenLoaiRang": "Mặt chân răng" },
]

const TeethCard = ({ IDLoaiMatRang, STT, onClick }) => {
    const handleDeleteTeeth = () => {
        onClick();
    };
    return (
        <div className='teeth-card' onClick={handleDeleteTeeth}>
            <div className='inner' >
                {IDLoaiMatRang} - {STT}
            </div>

        </div>
    )
}
const defaultPrice = 500000.0
const AdjustTreatment = ({ IDKeHoachDieuTri, date, doctor, assistant, category, treatment, selectedTotalTeeth, setShowAdjustTreatment, status, doctors, treatments, categories, moTa }) => {

    const [selectedDate, setSelectedDate] = useState(date);
    const [selectedDoctor, setSelectedDoctor] = useState(doctor);
    const [selectedAssistant, setSelectedAssistant] = useState(assistant);
    const [selectedCategory, setSelectedCategory] = useState(category);
    const [selectedTreatment, setSelectedTreatment] = useState(treatment);
    const [totalTeeth, setTotalTeeth] = useState(selectedTotalTeeth);
    const [selectedTeeth, setSelectedTeeth] = useState(1);
    const [selectedSurfaces, setSelectedSurfaces] = useState("L");
    const [selectedStatus, setSelectedStatus] = useState(status)
    // const [chiPhi, setChiPhi] = useState(chiPhi)
    const [selectedMota, setSelectedMota] = useState(moTa)



    const handleDeleteTeeth = (i) => {
        setTotalTeeth((prev) => prev.filter((value, index) => index !== i));
    };
    const handleDoctorSelect = (doctor) => {

        setSelectedDoctor(doctor.id);

        console.log(doctor)
        // setIsDoctorDropdownOpen(false);
    };
    const handleAssistantSelect = (assistant) => {

        setSelectedAssistant(assistant.id)
        console.log(assistant)
        // setIsDoctorDropdownOpen(false);
    };
    const handleDateSelect = (date) => {
        setSelectedDate(date);
        console.log(date)
    };
    const handleCancelAdjusting = () => {
        setShowAdjustTreatment((prev) => !prev)
    }
    const handleAddTeeth = () => {
        setTotalTeeth(prev => [...prev, { IDLoaiMatRang: selectedSurfaces, STT: selectedTeeth }])
    }

    const handleAdjustTreatment = async () => {
        const data = {
            IDKeHoachDieuTri: IDKeHoachDieuTri,
            ngayDieuTri: selectedDate,
            IDNhaSi: selectedDoctor,
            IDTroKham: selectedAssistant,
            IDDanhMuc: selectedCategory,
            IDLieuTrinh: selectedTreatment,
            rang: totalTeeth,
            chiPhi: defaultPrice * totalTeeth.length,
            moTa: selectedMota,
            trangThai: selectedStatus
        }
        try {
            const result = await axios.patch('/api/kehoachdieutri', data)
            console.log(result)
            toast.info("OKOKKOKO")
        } catch (error) {
            toast.error(error)
        }


    };

    return (
        <div className="add-treatment-container">
            <form>
                <div className="form-section">
                    <label>Chọn ngày điều trị:</label>
                    <Calendar selectedDate={selectedDate} handleDateClick={handleDateSelect} />
                </div>

                <div className="form-section">
                    <label>Chọn bác sĩ:</label>
                    <CustomDropdown
                        selected={doctor}
                        options={doctors}
                        onSelect={(selectedOption) => handleDoctorSelect(selectedOption)}
                        type="bác sĩ"
                        excluded={selectedAssistant}
                    />
                </div>

                <div className="form-section">
                    <label>Chọn trợ khám:</label>
                    <CustomDropdown
                        selected={assistant}
                        options={doctors}
                        onSelect={(selectedOption) => handleAssistantSelect(selectedOption)}
                        type="trợ khám"
                        excluded={selectedDoctor}
                    />
                </div>

                <div className="form-section">
                    <label> Danh Mục Điều Trị:</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categories.map((item) => (
                            <option value={item.IDDanhMucDieuTri}>{item.tenDanhMuc}</option>
                        ))}
                        {/* <option value="danhMuc1">Danh Mục 1</option>
                        <option value="danhMuc2">Danh Mục 2</option> */}
                        {/* Add other options as needed */}
                    </select>
                </div>
                <div className="form-section">
                    <label> Liệu Trình Điều Trị:</label>
                    <select
                        value={selectedTreatment}
                        onChange={(e) => setSelectedTreatment(e.target.value)}
                    >
                        {treatments.map((item) => (
                            <option value={item.IDLieuTrinh}>{item.tenLieuTrinh}</option>
                        ))}
                        {/* <option value="danhMuc1">Danh Mục 1</option>
                        <option value="danhMuc2">Danh Mục 2</option> */}
                        {/* Add other options as needed */}
                    </select>
                </div>

                {/* <div className="form-section">
                    <label>Chọn Bề Mặt Răng:</label>
                    <CustomDropdown
                        selected={selectedSurfaces}
                        options={Object.entries(loaiRang).map(([key, value]) => ({ id: key, name: value }))}
                        onSelect={(selectedOptions) => setSelectedSurfaces(selectedOptions)}
                        type="bề mặt răng"
                    />
                </div> */}
                <div className='form-section'>
                    <p>Răng đã chọn</p>
                    <div className='tooth'>

                        {totalTeeth.map((teeth, index) => (
                            <React.Fragment key={index}>
                                {/* {index} */}
                                <TeethCard
                                    IDLoaiMatRang={teeth.IDLoaiMatRang}
                                    STT={teeth.STT}
                                    onClick={() => handleDeleteTeeth(index)}
                                />
                            </React.Fragment>

                        ))}
                    </div>
                </div>

                <div className='form-section'>
                    <p>Thêm răng</p>
                </div>
                <div className="tooth-select">

                    <div className='section'>
                        <p>Chọn bề mặt</p>
                        <select
                            className='select-surfaces'
                            value={selectedSurfaces}
                            onChange={(e) => setSelectedSurfaces(e.target.value)}
                        >
                            {loaiRang.map((item) => (
                                <option value={item.IDLoaiMatRang}>{item.tenLoaiRang}</option>
                            ))}
                        </select>
                    </div>
                    <div className='section'>
                        <p>Chọn STT</p>
                        <select
                            className='select-surfaces'
                            value={selectedTeeth}
                            onChange={(e) => setSelectedTeeth(e.target.value)}
                        >
                            {[...Array(32)].map((_, index) => (
                                <option key={index + 1} value={index + 1}>{`Răng số ${index + 1}`}</option>
                            ))}
                        </select>
                    </div>
                    <div className="tooth-button" onClick={handleAddTeeth}>
                        Thêm
                    </div>


                </div>
                <div className='form-section'>
                    <br />
                </div>
                {/* <div className="form-section">
                    <label>Chọn STT Răng:</label>
                    <CustomDropdown
                        selected={selectedTeeth}
                        options={Array.from({ length: 32 }, (_, index) => ({ id: index + 1, name: `Răng số ${index + 1}` }))}
                        onSelect={(selectedOptions) => setSelectedTeeth(selectedOptions)}
                        type="răng"
                    />
                </div> */}
                <div className='form-section'>
                    <p>Thêm mô tả</p>
                    <input type="text" value={selectedMota} onChange={(e) => setSelectedMota(e.target.value)} />
                </div>
                <div className='form-section'>
                    <p>Trạng thái</p>
                    <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} >
                        <option value="Kế hoạch">Kế hoạch</option>
                        <option value="Đã hoàn thành">Đã hoàn thành</option>
                        <option value="Đã hủy">Đã hủy</option>
                    </select>
                </div>



                <button type="button" onClick={handleAdjustTreatment}>
                    Sửa
                </button>
                <div style={{ cursor: "pointer", paddingTop: "20px", paddingLeft: "10px" }} onClick={handleCancelAdjusting}>
                    Hủy
                </div>
            </form>
        </div>
    );
};

export default AdjustTreatment;
