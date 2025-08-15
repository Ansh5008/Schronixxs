import { 
  type Subject, 
  type InsertSubject,
  type AttendanceRecord,
  type InsertAttendanceRecord,
  type UploadedDocument,
  type InsertUploadedDocument,
  type ScheduleEvent,
  type InsertScheduleEvent
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Subject methods
  getSubjects(): Promise<Subject[]>;
  getSubject(id: string): Promise<Subject | undefined>;
  createSubject(subject: InsertSubject): Promise<Subject>;
  updateSubject(id: string, updates: Partial<Subject>): Promise<Subject | undefined>;
  
  // Attendance methods
  getAttendanceRecords(): Promise<AttendanceRecord[]>;
  getAttendanceBySubject(subjectId: string): Promise<AttendanceRecord[]>;
  createAttendanceRecord(record: InsertAttendanceRecord): Promise<AttendanceRecord>;
  
  // Document methods
  getUploadedDocuments(): Promise<UploadedDocument[]>;
  getUploadedDocument(id: string): Promise<UploadedDocument | undefined>;
  createUploadedDocument(document: InsertUploadedDocument): Promise<UploadedDocument>;
  updateUploadedDocument(id: string, updates: Partial<UploadedDocument>): Promise<UploadedDocument | undefined>;
  
  // Schedule methods
  getScheduleEvents(): Promise<ScheduleEvent[]>;
  getUpcomingEvents(limit?: number): Promise<ScheduleEvent[]>;
  createScheduleEvent(event: InsertScheduleEvent): Promise<ScheduleEvent>;
}

export class MemStorage implements IStorage {
  private subjects: Map<string, Subject>;
  private attendanceRecords: Map<string, AttendanceRecord>;
  private uploadedDocuments: Map<string, UploadedDocument>;
  private scheduleEvents: Map<string, ScheduleEvent>;

  constructor() {
    this.subjects = new Map();
    this.attendanceRecords = new Map();
    this.uploadedDocuments = new Map();
    this.scheduleEvents = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample subjects
    const subjects = [
      { id: "ds-1", name: "Data Structures", totalClasses: 30, attendedClasses: 24, minimumAttendance: 75, createdAt: new Date() },
      { id: "math-1", name: "Mathematics", totalClasses: 30, attendedClasses: 27, minimumAttendance: 75, createdAt: new Date() },
      { id: "physics-1", name: "Physics", totalClasses: 30, attendedClasses: 19, minimumAttendance: 75, createdAt: new Date() },
      { id: "chem-1", name: "Chemistry", totalClasses: 30, attendedClasses: 22, minimumAttendance: 75, createdAt: new Date() },
    ];

    subjects.forEach(subject => this.subjects.set(subject.id, subject));

    // Sample schedule events
    const events = [
      {
        id: "event-1",
        title: "Database Lab",
        subjectId: "ds-1",
        startTime: new Date(Date.now() + 2700000), // 45 minutes from now
        endTime: new Date(Date.now() + 8100000), // 2 hours 15 minutes from now
        type: "class",
        location: "Lab 101",
        createdAt: new Date()
      },
      {
        id: "event-2",
        title: "Math Assignment Due",
        subjectId: "math-1",
        startTime: new Date(Date.now() + 86400000), // Tomorrow
        endTime: new Date(Date.now() + 86400000),
        type: "assignment",
        location: "Online",
        createdAt: new Date()
      },
      {
        id: "event-3",
        title: "Physics Quiz",
        subjectId: "physics-1",
        startTime: new Date(Date.now() + 259200000), // 3 days from now
        endTime: new Date(Date.now() + 262800000),
        type: "exam",
        location: "Room 203",
        createdAt: new Date()
      }
    ];

    events.forEach(event => this.scheduleEvents.set(event.id, event));
  }

  // Subject methods
  async getSubjects(): Promise<Subject[]> {
    return Array.from(this.subjects.values());
  }

  async getSubject(id: string): Promise<Subject | undefined> {
    return this.subjects.get(id);
  }

  async createSubject(insertSubject: InsertSubject): Promise<Subject> {
    const id = randomUUID();
    const subject: Subject = { 
      ...insertSubject, 
      id,
      createdAt: new Date()
    };
    this.subjects.set(id, subject);
    return subject;
  }

  async updateSubject(id: string, updates: Partial<Subject>): Promise<Subject | undefined> {
    const subject = this.subjects.get(id);
    if (!subject) return undefined;
    
    const updatedSubject = { ...subject, ...updates };
    this.subjects.set(id, updatedSubject);
    return updatedSubject;
  }

  // Attendance methods
  async getAttendanceRecords(): Promise<AttendanceRecord[]> {
    return Array.from(this.attendanceRecords.values());
  }

  async getAttendanceBySubject(subjectId: string): Promise<AttendanceRecord[]> {
    return Array.from(this.attendanceRecords.values()).filter(
      record => record.subjectId === subjectId
    );
  }

  async createAttendanceRecord(insertRecord: InsertAttendanceRecord): Promise<AttendanceRecord> {
    const id = randomUUID();
    const record: AttendanceRecord = { 
      ...insertRecord, 
      id,
      createdAt: new Date()
    };
    this.attendanceRecords.set(id, record);
    return record;
  }

  // Document methods
  async getUploadedDocuments(): Promise<UploadedDocument[]> {
    return Array.from(this.uploadedDocuments.values());
  }

  async getUploadedDocument(id: string): Promise<UploadedDocument | undefined> {
    return this.uploadedDocuments.get(id);
  }

  async createUploadedDocument(insertDocument: InsertUploadedDocument): Promise<UploadedDocument> {
    const id = randomUUID();
    const document: UploadedDocument = { 
      ...insertDocument, 
      id,
      createdAt: new Date()
    };
    this.uploadedDocuments.set(id, document);
    return document;
  }

  async updateUploadedDocument(id: string, updates: Partial<UploadedDocument>): Promise<UploadedDocument | undefined> {
    const document = this.uploadedDocuments.get(id);
    if (!document) return undefined;
    
    const updatedDocument = { ...document, ...updates };
    this.uploadedDocuments.set(id, updatedDocument);
    return updatedDocument;
  }

  // Schedule methods
  async getScheduleEvents(): Promise<ScheduleEvent[]> {
    return Array.from(this.scheduleEvents.values());
  }

  async getUpcomingEvents(limit: number = 10): Promise<ScheduleEvent[]> {
    const now = new Date();
    return Array.from(this.scheduleEvents.values())
      .filter(event => event.startTime > now)
      .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
      .slice(0, limit);
  }

  async createScheduleEvent(insertEvent: InsertScheduleEvent): Promise<ScheduleEvent> {
    const id = randomUUID();
    const event: ScheduleEvent = { 
      ...insertEvent, 
      id,
      createdAt: new Date()
    };
    this.scheduleEvents.set(id, event);
    return event;
  }
}

export const storage = new MemStorage();
