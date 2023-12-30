import { db } from "./db";

export const getTreatmentReportByDoctorAndDate = async (ngay) => {
    try {
        const report = await db.raw(`
            SELECT
                N.IDUser AS IDNhaSi,
                N.ten AS TenNhaSi,
                COUNT(K.IDKeHoachDieuTri) AS SoLuongDieuTri
            FROM
                UserTable N
            LEFT JOIN
                KeHoachDieuTri K ON N.IDUser = K.IDNhaSi
            WHERE
                K.ngayDieuTri = ?
            GROUP BY
                N.IDUser, N.ten
        `, [ngay]);

        return report[0];
    } catch (error) {
        console.error('Error getting treatment report:', error);
        throw error;
    }
};

export const getAppointmentReportByDoctorAndDateRange = async (ngayBatDau, ngayKetThuc) => {
    try {
        const report = await db.raw(`
            SELECT
                N.IDUser AS IDNhaSi,
                N.ten AS TenNhaSi,
                COUNT(CH.IDCuocHen) AS SoLuongCuocHen
            FROM
                UserTable N
            LEFT JOIN
                CuocHen CH ON N.IDUser = CH.IDNhaSi
            WHERE
                CH.ngayHen BETWEEN ? AND ?
            GROUP BY
                N.IDUser, N.ten
        `, [ngayBatDau, ngayKetThuc]);

        return report[0];
    } catch (error) {
        console.error('Error getting appointment report:', error);
        throw error;
    }
};