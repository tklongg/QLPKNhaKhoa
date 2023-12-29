// PopupComponent.jsx
import React, { useEffect } from 'react';
import jsPDF from 'jspdf';

const PopupComponent = ({ data }) => {
    useEffect(() => {
        const generatePDF = () => {
            const pdf = new jsPDF();

            pdf.output('dataurlnewwindow');
        };

        // Gọi hàm để tạo trang PDF khi component được render
        generatePDF();
    }, [data]);

    return (
        <div>
            {/* Hiển thị thông tin kế hoạch điều trị */}
            <p><strong>Ngày điều trị:</strong> {data.ngayDieuTri}</p>
            <p><strong>ID Nha Sĩ:</strong> {data.IDNhaSi}</p>
            <p><strong>ID Bệnh Nhân:</strong> {data.IDBenhNhan}</p>
            <p><strong>ID Trợ Kham:</strong> {data.IDTroKham}</p>
            <p><strong>ID Danh Mục Điều Trị:</strong> {data.IDDanhMucDieuTri}</p>
            <p><strong>ID Liệu Trình:</strong> {data.IDLieuTrinh}</p>
            <p><strong>Răng:</strong> {data.rang.map(tooth => `${tooth.IDLoaiMatRang} - ${tooth.STT}`).join(', ')}</p>
            <p><strong>Chi Phí:</strong> {data.chiPhi.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
        </div>
    );
};

export default PopupComponent;
