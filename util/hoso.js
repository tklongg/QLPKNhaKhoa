import { db } from "./db";

export const updateThongTinTongQuan = async ({ IDUser, thongTinTongQuan }) => {
    try {
        await db("HoSoBenhNhan").where({ "IDBenhNhan": IDUser }).update({
            thongTinTongQuan: thongTinTongQuan
        })
        return true
    } catch (error) {
        return false
    }
}