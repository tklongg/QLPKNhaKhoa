export const getKeHoachDieuTriByUserId = async (IDUser) => {
    const result = await db('KeHoachDieuTri')
    .where('IDUser', IDUser)
    .innerJoin('UserTable', 'KeHoachDieuTri.IDBenhNhan', 'UserTable.IDUser')
    .innerJoin('DanhMucDieuTri', 'KeHoachDieuTri.IDDanhMuc', 'DanhMucDieuTri.IDDanhMucDieuTri')
    .innerJoin('KeHoachDieuTri_Rang', 'KeHoachDieuTri.IDKeHoachDieuTri', 'KeHoachDieuTri_Rang.IDKeHoachDieuTri')
    .innerJoin('LieuTrinh', 'KeHoachDieuTri.IDLieuTrinh', 'LieuTrinh.IDLieuTrinh')
    .innerJoin('Rang', function() {
        this.on('Rang.IDLoaiMatRang', '=', 'KeHoachDieuTri_Rang.IDLoaiMatRang')
            .andOn('Rang.STT', '=', 'KeHoachDieuTri_Rang.STT');
        })
}