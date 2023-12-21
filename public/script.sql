--create database QuanLyNhaKhoa
--use QuanLyNhaKhoa
--go
--drop database QuanLyNhaKhoa

create table UserTable (
	IDUser int IDENTITY(1,1) primary key,
	soDienThoai char(11),
	ten nvarchar(100),
	ngaySinh date,
	gioiTinh nvarchar(10),
	email nvarchar(100),
	userType nvarchar(11)
)

create table LichNgay (
	IDLich int IDENTITY(1,1) primary key,
	IDNhaSi int,
	ngay date,
	timeStart time,
	timeEnd time,
	--calenderType nvarchar(11),
)

create table LichTuan (
	IDLich int IDENTITY(1,1) primary key,
	IDNhaSi int,
	weekStart date,
	weekEnd date,
	mon int,
	tue int,
	wed int,
	thu int,
	fri int,
	sat int,
	sun int
)

create table LichThang (
	IDLich int IDENTITY(1,1) primary key,
	IDNhaSi int,
	thang int,
	nam int,
	ngayRanh char(100)
)

create table HoSoBenhNhan (
	IDHoSoBenhNhan int IDENTITY(1,1) primary key,
	IDBenhNhan int,
	thongTinTongQuan nvarchar(max),
	tinhTrangDiUng nvarchar(max),
	ghiChu nvarchar(max)
)

create table Thuoc (
	IDThuoc int IDENTITY(1,1) primary key,
	tenThuoc nvarchar(50)
)

create table DonThuoc (
	IDDonThuoc int IDENTITY(1,1) primary key,
	IDKeHoachDieuTri int
)

create table KeHoachDieuTri (
	IDKeHoachDieuTri int identity(1,1) primary key,
	IDBenhNhan int,
	IDNhaSi int,
	IDTroKham int,
	IDDanhMuc int,
	IDLieuTrinh int,
	moTa nvarchar(max),
	chiPhi decimal
)

create table ChongChiDinh (
	IDBenhNhan int,
	IDThuoc int
	primary key (IDBenhNhan,IDThuoc)
)


create table Thuoc_DonThuoc (
	IDThuoc int,
	IDDonThuoc int,
	SoLuong int
	primary key (IDThuoc,IDDonThuoc)
)

create table Rang (
	IDLoaiMatRang char(1),
	STT int,
	tenRang nvarchar(50)
	primary key (IDLoaiMatRang,STT)
)

create table KeHoachDieuTri_Rang (
	IDKeHoachDieuTri int,
	IDLoaiMatRang char(1),
	STT int,
	primary key (IDKeHoachDieuTri,IDLoaiMatRang,STT)
)

create table DanhMucDieuTri (
	IDDanhMucDieuTri int identity(1,1) primary key,
	tenDanhMuc nvarchar(100)
)

create table LieuTrinh (
	IDLieuTrinh int identity (1,1) primary key,
	tenLieuTrinh nvarchar(100)
)

create table ThanhToan (
	IDThanhToan int identity (1,1) primary key,
	IDKeHoachDieuTri int,
	tienTra decimal,
	ngayGiaoDich date,
	tienThoi decimal,
	loaiThanhToan int
)

create table CuocHen (
	IDCuocHen int identity(1,1) primary key,
	IDBenhNhan int,
	IDNhaSi int,
	IDTroKham int,
	thoiGian time,
	soDienThoai char(11),
	IDPhong int,
	tinhTrang nvarchar(15)
)



alter table HoSoBenhNhan add constraint FK_HoSoBenhNhan_BenhNhan foreign key (IDBenhNhan) references UserTable(IDUser)

alter table ChongChiDinh add constraint FK_CCD_BenhNhan foreign key (IDBenhNhan) references UserTable(IDUser)
alter table ChongChiDinh add constraint FK_CCD_Thuoc foreign key (IDThuoc) references Thuoc(IDThuoc)

alter table Thuoc_DonThuoc add constraint FK_T_DT_Thuoc foreign key (IDThuoc) references Thuoc(IDThuoc)
alter table Thuoc_DonThuoc add constraint FK_T_DT_DonThuoc foreign key (IDDonThuoc) references DonThuoc(IDDonThuoc)

alter table DonThuoc add constraint FK_DonThuoc_KHDT foreign key (IDKeHoachDieuTri) references KeHoachDieuTri(IDKeHoachDieuTri)

alter table CuocHen add constraint FK_CuocHen_BenhNhan foreign key (IDBenhNhan) references UserTable(IDUser)
alter table CuocHen add constraint FK_CuocHen_NhaSi foreign key (IDNhaSi) references UserTable(IDUser)
alter table CuocHen add constraint FK_CuocHen_TroKham foreign key (IDTroKham) references UserTable(IDUser)

alter table KeHoachDieuTri add constraint FK_KeHoachDieuTri_BenhNhan foreign key (IDBenhNhan) references UserTable(IDUser)
alter table KeHoachDieuTri add constraint FK_KeHoachDieuTri_NhaSi foreign key (IDNhaSi) references UserTable(IDUser)
alter table KeHoachDieuTri add constraint FK_KeHoachDieuTri_TroKham foreign key (IDTroKham) references UserTable(IDUser)
alter table KeHoachDieuTri add constraint FK_KeHoachDieuTri_LieuTrinh foreign key (IDLieuTrinh) references LieuTrinh(IDLieuTrinh)
alter table KeHoachDieuTri add constraint FK_KeHoachDieuTri_DanhMuc foreign key (IDDanhMuc) references DanhMucDieuTri(IDDanhMucDieuTri)

alter table LichNgay add constraint FK_LichNgay_NhaSi foreign key (IDNhaSi) references UserTable(IDUser)

alter table LichTuan add constraint FK_LichTuan_NhaSi foreign key (IDNhaSi) references UserTable(IDUser)

alter table LichThang add constraint FK_LichThang_NhaSi foreign key (IDNhaSi) references UserTable(IDUser)

alter table KeHoachDieuTri_Rang add constraint FK_KeHoachDieuTri_Rang_KH foreign key (IDKeHoachDieuTri) references KeHoachDieuTri(IDKeHoachDieuTri)
alter table KeHoachDieuTri_Rang add constraint FK_KeHoachDieuTri_Rang_Rang foreign key (IDLoaiMatRang,STT) references Rang(IDLoaiMatRang,STT)

alter table ThanhToan add constraint FK_ThanhToan_KHDT foreign key (IDKeHoachDieuTri) references KeHoachDieuTri(IDKeHoachDieuTri)


---index
CREATE NONCLUSTERED INDEX IX_LichNgay_IDNhaSi
ON LichNgay(IDNhaSi);

CREATE NONCLUSTERED INDEX IX_LichNgay_Ngay
ON LichNgay (Ngay);