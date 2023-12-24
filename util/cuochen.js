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