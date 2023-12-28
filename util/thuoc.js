import {db} from './db'

//các table lien quan den thuoc viet o file nay

//lay tat ca record chong chi dinh theo benh nhan
export const getChongChiDinhByUserId = async (userId) => {
    try {
        const chongChiDinh = await db('ChongChiDinh')
            .select('ChongChiDinh.IDBenhNhan', 'Thuoc.IDThuoc', 'Thuoc.TenThuoc')
            .where('IDBenhNhan', userId)
            .innerJoin('Thuoc', 'ChongChiDinh.IDThuoc', 'Thuoc.IDThuoc')
            

        console.log("🚀 ~ file: thuoc.js:16 ~ getChongChiDinhByUserId ~ chongChiDinh:", chongChiDinh)
        return chongChiDinh;
    } catch (error) {
        console.error('Error getting ChongChiDinh by ID:', error);
        throw error;
    }
}


export const postChongChiDinh = async (idBenhNhan, idThuoc) => {
    try {
        const result = await db('ChongChiDinh')
            .insert({
                IDBenhNhan: idBenhNhan,
                IDThuoc: idThuoc
            })
            .returning('*')
        console.log("result:", result)
        return result;
    } catch (error) {
        console.error('Error getting ChongChiDinh by ID:', error);
        throw error;
    }
}
