import { convertToSqlDate } from "./date";

const { db } = require("./db");

export const testAA = async (IDBenhNhan) => {
    try {
        const result = await db('KeHoachDieuTri')
            .select(
                'KeHoachDieuTri.IDKeHoachDieuTri',
                'KeHoachDieuTri.IDNhaSi',
                'UserTable1.ten as tenNhaSi',
                'KeHoachDieuTri.IDTroKham',
                'UserTable2.ten as tenTroKham',
                'KeHoachDieuTri.IDDanhMuc',
                'DanhMucDieuTri.tenDanhMuc',
                'KeHoachDieuTri.IDLieuTrinh',
                'LieuTrinh.tenLieuTrinh',
                'KeHoachDieuTri.ngayDieuTri',
                'KeHoachDieuTri.moTa',
                'KeHoachDieuTri.chiPhi',
                'KeHoachDieuTri.trangThai',
            )
            .leftJoin('UserTable as UserTable1', 'KeHoachDieuTri.IDNhaSi', 'UserTable1.IDUser')
            .leftJoin('UserTable as UserTable2', 'KeHoachDieuTri.IDTroKham', 'UserTable2.IDUser')
            .leftJoin('DanhMucDieuTri', 'KeHoachDieuTri.IDDanhMuc', 'DanhMucDieuTri.IDDanhMucDieuTri')
            .leftJoin('LieuTrinh', 'KeHoachDieuTri.IDLieuTrinh', 'LieuTrinh.IDLieuTrinh')
            .where('KeHoachDieuTri.IDBenhNhan', IDBenhNhan)


        // Process the result to match the desired output format
        const formattedResult = await Promise.all(result.map(async (row) => {
            const teeth = await db('KeHoachDieuTri_Rang')
                .select('IDLoaiMatRang', 'STT')
                .where('IDKeHoachDieuTri', row.IDKeHoachDieuTri);

            return {
                IDKeHoachDieuTri: row.IDKeHoachDieuTri,
                IDNhaSi: row.IDNhaSi,
                tenNhaSi: row.tenNhaSi,
                IDTroKham: row.IDTroKham,
                tenTroKham: row.tenTroKham,
                IDDanhMuc: row.IDDanhMuc,
                tenDanhMuc: row.tenDanhMuc,
                IDLieuTrinh: row.IDLieuTrinh,
                tenLieuTrinh: row.tenLieuTrinh,
                ngayDieuTri: row.ngayDieuTri.toISOString().split('T')[0], // Format date as "YYYY-MM-DD"
                moTa: row.moTa,
                chiPhi: row.chiPhi,
                trangThai: row.trangThai,
                rang: teeth,
            };
        }));


        return formattedResult;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const themKeHoachDieuTri = async ({ ngayDieuTri, IDBenhNhan, IDNhaSi, IDTroKham, IDDanhMuc, IDLieuTrinh, rang, chiPhi }) => {
    try {

        const moTa = ""
        const trangThai = "Kế hoạch"
        const ngayDTSQL = convertToSqlDate(ngayDieuTri)
        const inserted = await db("KeHoachDieuTri").returning('IDKeHoachDieuTri').insert({ ngayDieuTri: ngayDTSQL, IDBenhNhan, IDNhaSi, IDTroKham, IDDanhMuc, IDLieuTrinh, moTa, trangThai, chiPhi })
        console.log("inserted", inserted)
        const insertedID = inserted[0].IDKeHoachDieuTri;
        const rangArr = rang.map(({ IDLoaiMatRang, STT }) => ({
            IDLoaiMatRang: IDLoaiMatRang,
            STT: STT,
            IDKeHoachDieuTri: insertedID,
        }))
        console.log(rangArr)
        await db("KeHoachDieuTri_Rang").insert(rangArr)
        await db("ThanhToan").insert({
            IDKeHoachDieuTri: insertedID,
        })
        return {
            IDKeHoachDieuTri: insertedID,
            ngayDieuTri, IDBenhNhan, IDNhaSi, IDTroKham, IDDanhMuc, IDLieuTrinh, rang
        }
    } catch (error) {
        return false
    }
}

export const suaKeHoachDieuTri = async ({ IDKeHoachDieuTri, ngayDieuTri, IDBenhNhan, IDNhaSi, IDTroKham, IDDanhMuc, IDLieuTrinh, rang, chiPhi, moTa, trangThai }) => {
    try {
        await db("KeHoachDieuTri_Rang").where({ "IDKeHoachDieuTri": IDKeHoachDieuTri }).del()
        await db("KeHoachDieuTri").where({ "IDKeHoachDieuTri": IDKeHoachDieuTri }).update({
            chiPhi: chiPhi,
            trangThai: trangThai,
            IDNhaSi: IDNhaSi,
            IDTroKham: IDTroKham,
            IDDanhMuc: IDDanhMuc,
            IDLieuTrinh: IDLieuTrinh,
            moTa: moTa,
        })
        const rangArr = rang.map(({ IDLoaiMatRang, STT }) => ({
            IDLoaiMatRang: IDLoaiMatRang,
            STT: STT,
            IDKeHoachDieuTri: IDKeHoachDieuTri,
        }))
        await db("KeHoachDieuTri_Rang").insert(rangArr)
        return true
    } catch (error) {
        return false
    }
}