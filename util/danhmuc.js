import { db } from "./db";

export const getAllDanhMuc = async () => {
    const result = db("DanhMucDieuTri").select().where({})
    return result
}