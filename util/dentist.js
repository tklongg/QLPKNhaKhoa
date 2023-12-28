import { convertToSqlDate } from "./date";
import { db } from "./db";

export const getDentistDateSchedule = async (date, dentistId) => {
    const dateSql = convertToSqlDate(date)
    try {
        const result = await db("LichNgay as ln").where({ 'ln.IDNhaSi': dentistId, 'ln.ngay': dateSql })
        return result
    } catch (error) {
        console.log("lỗi dentist date:", error);
    }
}

export const getDentistAppointmentByDate = async (date, dentistId) => {
    const dateSql = convertToSqlDate(date)
    const result = await db("CuocHen as ch").where({ 'ch.IDNhaSi': dentistId, 'ch.ngayHen': dateSql }).orderBy('ch.thoiGian', 'asc')
    return result
}

export const getDentistsFreeOnDate = async (date) => {
    try {
        const dateArray = date.split("-")
        const dentistsFreeOnDate = await db('LichThang as lt')
            .where({ 'lt.thang': dateArray[1], 'lt.nam': dateArray[0] })
            .andWhereRaw(`CHARINDEX('${dateArray[2]}', lt.ngayRanh) > 0`)
            .join('UserTable as ut', 'lt.IDNhaSi', 'ut.IDUser')
            .select('lt.IDNhaSi as id', 'ut.ten as ten');
        return dentistsFreeOnDate;
        //{IDNhaSi,tenNhaSi}
    } catch (error) {
        console.error('Error getting dentists free on date:', error);
        throw error;
    }
}

export const getDentistFreeTime = async (date, dentistId) => {
    try {
        const dateSql = convertToSqlDate(date)
        const dentistSchedule = await db('LichNgay')
            .where({ ngay: dateSql, IDNhaSi: dentistId })
            .select('timeStart', 'timeEnd')
            .orderBy('timeEnd', 'asc');

        const bookedTimeSlots = await getDentistAppointmentByDate(date, dentistId);
        const bookedTimeSet = new Set(bookedTimeSlots.map((appointment) => appointment.thoiGian));

        const availableTimeSlots = [];

        if (dentistSchedule.length === 0) {
            // Nếu không có lịch ngày, giả sử làm việc từ 8h đến 21h
            availableTimeSlots.push(...Array.from({ length: 13 }, (_, index) => `${index + 8}:00`));
        } else {
            dentistSchedule.forEach(({ timeStart, timeEnd }) => {
                const startHour = parseInt(timeStart.split(':')[0]);
                const endHour = parseInt(timeEnd.split(':')[0]);
                for (let i = startHour; i < endHour; i++) {
                    const timeSlot = `${i}:00`;
                    if (!bookedTimeSet.has(timeSlot)) {
                        availableTimeSlots.push(timeSlot);
                    }
                }
            });
        }

        return availableTimeSlots;
    } catch (error) {
        console.error('Error getting dentist free time:', error);
        throw error;
    }
};



export const getAllDentistIds = async () => {
    try {
        const dentistIds = await db('UserTable')
            .where({ 'userType': 'Nhasi' })
            .pluck('IDUser');

        return dentistIds;
    } catch (error) {
        console.error('Error getting all dentist IDs:', error);
        throw error;
    }
};

