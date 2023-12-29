import { db } from "./db";

export const updateGhiChuUser = async (IDUser, ghiChu, tinhTrangDiUng, chongChiDinh) => {
    try {
        const normalizedData = chongChiDinh.map(({ IDBenhNhan, IDThuoc }) => ({ IDBenhNhan, IDThuoc }));
        const res = await db("ChongChiDinh").where({ "IDBenhNhan": parseInt(IDUser) }).del()
        await db("ChongChiDinh").insert(normalizedData)
        await db("HoSoBenhNhan").where({ "IDBenhNhan": parseInt(IDUser) }).update({
            "ghiChu": ghiChu,
            "tinhTrangDiUng": tinhTrangDiUng
        })
        return true
    } catch (error) {
        return false
    }
}