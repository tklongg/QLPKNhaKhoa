import {db} from './db'

// get all payment id
export const getAllPaymentId = async () => {
    return await db('ThanhToan').select('IDKeHoachDieuTri')
}

export const getPaymentById = async (id) => {
    return await db('ThanhToan').where('IDKeHoachDieuTri', id)
}

//Total payment per user
export const getTotalPayment = async (id) => {
    // connect 2 table KeHoachDieuTri and ThanhToan
    return await db('ThanhToan').where('IDKeHoachDieuTri', id).sum('chiPhi as TongTien')
}