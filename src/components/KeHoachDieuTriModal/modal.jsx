import React, { useState } from 'react';
import './style.css'; // Import file CSS để tùy chỉnh style modal

const TreatmentPlanModal = ({ visible, onCancel, ngayDieuTri, IDNhaSi, IDBenhNhan, IDTroKham, IDDanhMucDieuTri, IDLieuTrinh, rang, chiPhi }) => {
    const modalStyle = {
        display: visible ? 'block' : 'none',
    };

    const closeModal = () => {
        onCancel();
    };

    return (
        <div className="modal" style={modalStyle}>
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <p><strong>Ngày điều trị:</strong> {ngayDieuTri}</p>
                <p><strong>ID Nha Sĩ:</strong> {IDNhaSi}</p>
                <p><strong>ID Bệnh Nhân:</strong> {IDBenhNhan}</p>
                <p><strong>ID Trợ Kham:</strong> {IDTroKham}</p>
                <p><strong>ID Danh Mục Điều Trị:</strong> {IDDanhMucDieuTri}</p>
                <p><strong>ID Liệu Trình:</strong> {IDLieuTrinh}</p>
                <p><strong>Răng:</strong> {rang.map(tooth => tooth.IDLoaiMatRang).join(', ')}</p>
                <p><strong>Chi Phí:</strong> {chiPhi.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
                {/* Các thông tin khác nếu cần */}
            </div>
        </div>
    );
};

export default TreatmentPlanModal;
