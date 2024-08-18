import * as SQLite from "expo-sqlite";
import { type SQLiteDatabase } from "expo-sqlite";

export const getDBConnection = async () => {
    try {
        const db = SQLite.openDatabaseAsync('onTime.db')
        return db
    } catch (error) {
        console.error('Error opening database:', error);
    }
};

export const createTable = async (db: SQLiteDatabase ) => {
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
                createdAt TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS Note(
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                title TEXT NOT NULL,
                desc TEXT NOT NULL,
                completed BOOLEAN,
                createdAt TEXT NOT NULL
            );`,
        )
        console.log("successful created");
        
    } catch (error) {
        console.error('Error executing SQL statement:', error);
    }
};

export const saveScheduleData = async (db: SQLiteDatabase, schedule) => {
    try {
        console.log(schedule);
        
        const insertQuery = `INSERT INTO Schedule (title, fullday, start, finish, repeat, reminder, place, note, createdAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        let data = await db.runAsync(
            insertQuery, 
            [
                schedule.title,
                schedule.fullday ? 1 : 0,
                schedule.start,
                schedule.finish,
                schedule.repeat,
                schedule.reminder,
                schedule.place,
                schedule.note,
                schedule.createdAt
            ],
        )

        console.log(data);
        
    } catch (error) {
        console.error('Error executing SQL statement:', error);
    }
};

export const getScheduleData = async (db) => {
    // const schedules = [];
    // const results = await db.getAllAsync("SELECT * FROM Schedule");
    // results.forEach(result => {
    //     for (let i = 0; i < result.rows.length; i++) {
    //         schedules.push(result.rows.item(i));
    //     }
    // });
    // return schedules;
};