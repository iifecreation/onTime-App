import * as SQLite from "expo-sqlite";

// *
//***** creating table
export const initializeDatabase = async (db) => {
    try {
         await db.execAsync(
            `
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS Schedule(
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                title TEXT NOT NULL,
                fullday BOOLEAN,
                start DATE NOT NULL,
                finish DATE NOT NULL,
                repeat TEXT NOT NULL,
                reminder TEXT NOT NULL,
                place TEXT NOT NULL,
                note TEXT NOT NULL,
                completed BOOLEAN DEFAULT 0,
                createdAt TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS Note(
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                title TEXT NOT NULL,
                desc TEXT NOT NULL,
                completed BOOLEAN DEFAULT 0,
                createdAt TEXT NOT NULL
            );`,
        )
        console.log("successful created");
        
    } catch (error) {
        console.error('Error executing SQL statement:', error);
    }
};

// *
//***** UPDATE Schedule data
export const saveScheduleData = async (db, schedule) => {
    try {
        const insertQuery = `INSERT INTO Schedule (title, fullday, start, finish, repeat, reminder, place, note, createdAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        const statement = await db.prepareAsync(insertQuery)
        console.log(statement);
        
        await statement.executeAsync([
            schedule.title,
            schedule.fullday ? 1 : 0,
            schedule.start,
            schedule.finish,
            schedule.repeat,
            schedule.reminder,
            schedule.place,
            schedule.note,
            schedule.createdAt
        ])

        let data = await getScheduleData(db);
        console.log(data);
        
    } catch (error) {
        console.error('Error executing SQL statement:', error);
    }
};

// *
//***** UPDATE Note data
export const saveNoteData = async (db, note) => {
    try {
        const insertQuery = `INSERT INTO Note (title, desc, createdAt)
            VALUES (?, ?, ?)`;
        
        const statement = await db.prepareAsync(insertQuery)
        console.log(statement);
        
        await statement.executeAsync([
            note.title,
            note.desc,
            note.createdAt
        ])

        let data = await getNoteData(db);
        console.log(data);
        
    } catch (error) {
        console.error('Error executing SQL statement:', error);
    }
};

// *
//***** UPDATE Schedule data
export const getScheduleData = async (db) => {
    try {
        const allRows = await db.getAllAsync('SELECT * FROM Schedule')
        return allRows
    } catch (error) {
        console.log('Error while loading students : ', error);
    }
};

// *
//***** UPDATE Note data
export const getNoteData = async (db) => {
    try {
        const allRows = await db.getAllAsync('SELECT * FROM Note')
        return allRows
    } catch (error) {
        console.log('Error while loading students : ', error);
    }
};

// *
//***** UPDATE Schedule data
export const updateSchedule = async (db, scheduleId, schedule ) => {
    try {
        await db.runAsync(`
            UPDATE Schedule SET 
            title = ?, 
            fullday = ?, 
            start = ?, 
            finish = ?,
            repeat = ?,
            reminder = ?,
            place = ?,
            note = ?,
            createdAt = ?,
            completed = ?,
            WHERE id = ?`,
            [
            schedule.title,
            schedule.fullday ? 1 : 0,
            schedule.start,
            schedule.finish,
            schedule.repeat,
            schedule.reminder,
            schedule.place,
            schedule.note,
            schedule.createdAt,
            schedule.completed ? 1 : 0,
            studentId
            ]);
        await getScheduleData();
    } catch (error) {
        console.log('Error while updating schedule', error);
    }
};

// *
//***** UPDATE Note data
export const updateNote = async (db, noteId, note ) => {
    try {
        await db.runAsync(`
            UPDATE Schedule SET 
            title = ?, 
            desc = ?, 
            completed = ?, 
            createdAt = ?,
            WHERE id = ?`,
            [
                note.title,
                note.desc,
                note.completed ? 1 : 0,
                note.createdAt,
                noteId
            ]);
        await getNoteData();
    } catch (error) {
        console.log('Error while updating note', error);
    }
};

// *
//***** DELETE Schedule data
export const deleteScheduleData = async (db, id) => {
    try {
        await db.runAsync('DELETE FROM Schedule WHERE id = ?', [id]);
        await getScheduleData(db);
    } catch (error) {
        console.log('Error deleting data : ', error);
    }
}

// *
//***** DELETE Note data
export const deleteNoteData = async (db, id) => {
    try {
        await db.runAsync('DELETE FROM Note WHERE id = ?', [id]);
        await getNoteData(db);
    } catch (error) {
        console.log('Error deleting data : ', error);
    }
}

