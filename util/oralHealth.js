import {db} from './db'

export const getOralHealthInfoByUserId = async (userId) => {
    return await db('HoSoBenhNhan').where('IDBenhNhan', id)
}
