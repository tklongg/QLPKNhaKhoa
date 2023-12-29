import { convertToSqlDate, convertFromSqlDate, convertFromSqlTime } from './date';
import { db } from './db'


export const getCuocHenById = async (idCuocHen) => {
    try {
        const cuocHen = await db('CuocHen')
            .select('*')
            .where('IDCuocHen', idCuocHen)
            .first();

        return cuocHen;
    } catch (error) {
        console.error('Error getting CuocHen by ID:', error);
        throw error;
    }
}

export const getDentistAppointmentsInDate = async (date) => {
    const dateSql = convertToSqlDate(date);

    try {
        const result = await db("CuocHen")
            .where({ 'ngayHen': dateSql })
            .select('IDCuocHen');

        const appointmentIds = result.map(appointment => appointment.IDCuocHen);

        return appointmentIds;
    } catch (error) {
        console.error('Error getting appointments in date:', error);
        throw error;
    }
};

export const updateAppointment = async (appointmentId, appointmentData) => {
    try {
        // Lấy thông tin cơ bản từ bảng UserTable
        const basicInfo = await db('UserTable')
            .select('ten', 'ngaySinh', 'gioiTinh', 'soDienThoai', 'email')
            .where({ 'IDUser': appointmentData.IDBenhNhan })
            .first();

        // Cập nhật cuộc hẹn
        await db('CuocHen')
            .where({ 'IDCuocHen': appointmentId })
            .update({
                'thoiGian': appointmentData.thoiGian,
                'ngayHen': appointmentData.ngayHen,
                'IDPhong': appointmentData.IDPhong,
                'tinhTrang': appointmentData.tinhTrang,
            });

        return { basicInfo, updatedAppointmentData: appointmentData };
    } catch (error) {
        console.error('Error updating appointment:', error);
        throw error;
    }
};

export const getAppointmentByDate = async (date) => {
    try {
        const dateSql = convertToSqlDate(date)
        const result = await db("CuocHen").join('UserTable as BenhNhan', 'CuocHen.IDBenhNhan', '=', 'BenhNhan.IDUser')
            .join('UserTable as BacSi', 'CuocHen.IDNhaSi', '=', 'BacSi.IDUser')
            .leftJoin('UserTable as TroKham', 'CuocHen.IDTroKham', '=', 'TroKham.IDUser')
            .leftJoin('Phong', 'CuocHen.IDPhong', '=', 'Phong.IDPhong')
            .select(
                'CuocHen.IDCuocHen',
                'CuocHen.IDBenhNhan',
                'CuocHen.IDNhaSi',
                'CuocHen.IDTroKham',
                'CuocHen.thoiGian',
                'CuocHen.ngayHen',
                'CuocHen.soDienThoai',
                'CuocHen.IDPhong',
                'CuocHen.tinhTrang',
                'BenhNhan.ten as tenUser',
                'BacSi.ten as tenBacSi',
                'TroKham.ten as tenTroKham',
                'Phong.tenPhong as tenPhongKham'
            )
            .where('CuocHen.ngayHen', '=', dateSql);
        return result
    } catch (error) {
        return []
    }
}
export const getAllAppointments = async () => {
    try {
        const result = await db("CuocHen").join('UserTable as BenhNhan', 'CuocHen.IDBenhNhan', '=', 'BenhNhan.IDUser')
            .join('UserTable as BacSi', 'CuocHen.IDNhaSi', '=', 'BacSi.IDUser')
            .leftJoin('UserTable as TroKham', 'CuocHen.IDTroKham', '=', 'TroKham.IDUser')
            .leftJoin('Phong', 'CuocHen.IDPhong', '=', 'Phong.IDPhong')
            .select(
                'CuocHen.IDCuocHen',
                'CuocHen.IDBenhNhan',
                'CuocHen.IDNhaSi',
                'CuocHen.IDTroKham',
                'CuocHen.thoiGian',
                'CuocHen.ngayHen',
                'CuocHen.soDienThoai',
                'CuocHen.IDPhong',
                'CuocHen.tinhTrang',
                'BenhNhan.ten as tenUser',
                'BacSi.ten as tenBacSi',
                'TroKham.ten as tenTroKham',
                'Phong.tenPhong as tenPhongKham'
            ).limit(100).offset(0)
        const appointments = result.map((appointment) => ({
            ...appointment,
            ngayHen: convertFromSqlDate(appointment.ngayHen),
            thoiGian: convertFromSqlTime(appointment.thoiGian),
        }));
        return appointments
    } catch (error) {
        return []
    }
}

export const updateCuocHen = () => {

}