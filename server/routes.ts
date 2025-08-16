import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer, { type FileFilterCallback } from "multer";
import { z } from "zod";
import { insertSubjectSchema, insertAttendanceRecordSchema, insertScheduleEventSchema } from "@shared/schema";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// Configure multer for file uploads
const upload = multer({ 
  dest: 'uploads/',
  fileFilter: (req: Express.Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Simple PDF text extraction (for demonstration)
function extractTextFromPDF(buffer: Buffer): string {
  // In a real implementation, you'd use a proper PDF parsing library
  // For now, return a simple extracted text simulation
  return "Sample extracted text from PDF document. This would contain the actual parsed content in a real implementation.";
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all subjects with attendance statistics
  app.get("/api/subjects", async (req, res) => {
    try {
      const subjects = await storage.getSubjects();
      const subjectsWithStats = subjects.map(subject => {
        const attendanceRate = (subject.attendedClasses / subject.totalClasses) * 100;
        const requiredClasses = Math.ceil((subject.totalClasses * subject.minimumAttendance) / 100);
        const canSkip = Math.max(0, subject.attendedClasses - requiredClasses);
        
        return {
          ...subject,
          attendanceRate: Math.round(attendanceRate * 10) / 10,
          canSkip,
          status: attendanceRate >= subject.minimumAttendance ? 'safe' : 'warning'
        };
      });
      
      res.json(subjectsWithStats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subjects" });
    }
  });

  // Get subject by ID
  app.get("/api/subjects/:id", async (req, res) => {
    try {
      const subject = await storage.getSubject(req.params.id);
      if (!subject) {
        return res.status(404).json({ message: "Subject not found" });
      }
      res.json(subject);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subject" });
    }
  });

  // Create new subject
  app.post("/api/subjects", async (req, res) => {
    try {
      const validatedData = insertSubjectSchema.parse(req.body);
      const subject = await storage.createSubject(validatedData);
      res.status(201).json(subject);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid subject data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create subject" });
      }
    }
  });

  // Update subject attendance
  app.patch("/api/subjects/:id/attendance", async (req, res) => {
    try {
      const { attendedClasses } = req.body;
      if (typeof attendedClasses !== 'number') {
        return res.status(400).json({ message: "Invalid attendance data" });
      }
      
      const updated = await storage.updateSubject(req.params.id, { attendedClasses });
      if (!updated) {
        return res.status(404).json({ message: "Subject not found" });
      }
      
      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Failed to update attendance" });
    }
  });

  // Get attendance records
  app.get("/api/attendance", async (req, res) => {
    try {
      const { subjectId } = req.query;
      let records;
      
      if (subjectId) {
        records = await storage.getAttendanceBySubject(subjectId as string);
      } else {
        records = await storage.getAttendanceRecords();
      }
      
      res.json(records);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch attendance records" });
    }
  });

  // Create attendance record
  app.post("/api/attendance", async (req, res) => {
    try {
      const validatedData = insertAttendanceRecordSchema.parse(req.body);
      const record = await storage.createAttendanceRecord(validatedData);
      
      // Update subject's attended classes count
      const subject = await storage.getSubject(validatedData.subjectId);
      if (subject && validatedData.attended) {
        await storage.updateSubject(validatedData.subjectId, {
          attendedClasses: subject.attendedClasses + 1
        });
      }
      
      res.status(201).json(record);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid attendance data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create attendance record" });
      }
    }
  });

  // Get schedule events
  app.get("/api/schedule", async (req, res) => {
    try {
      const { upcoming } = req.query;
      let events;
      
      if (upcoming === 'true') {
        events = await storage.getUpcomingEvents(5);
      } else {
        events = await storage.getScheduleEvents();
      }
      
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch schedule events" });
    }
  });

  // Create schedule event
  app.post("/api/schedule", async (req, res) => {
    try {
      const validatedData = insertScheduleEventSchema.parse(req.body);
      const event = await storage.createScheduleEvent(validatedData);
      res.status(201).json(event);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid event data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create schedule event" });
      }
    }
  });

  // Upload PDF document
  app.post("/api/upload", upload.single('pdf'), async (req: MulterRequest, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const { type } = req.body;
      if (!type || !['calendar', 'timetable'].includes(type)) {
        return res.status(400).json({ message: "Invalid document type" });
      }

      // Extract text from PDF (simplified for demo)
      const extractedText = "Sample extracted text from PDF document";

      const document = await storage.createUploadedDocument({
        filename: req.file.originalname,
        type,
        extractedText,
        processed: false
      });

      // Process the document based on type
      if (type === 'timetable') {
        // Parse timetable and create schedule events
        // This is a simplified example - in reality, you'd parse the PDF properly
        await storage.createScheduleEvent({
          title: "Programming Lab",
          startTime: new Date(Date.now() + 86400000), // Tomorrow
          endTime: new Date(Date.now() + 90000000),
          type: "class",
          location: "Computer Lab"
        });
      }

      // Mark as processed
      await storage.updateUploadedDocument(document.id, { processed: true });

      res.status(201).json({ 
        message: "PDF uploaded and processed successfully",
        document
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to upload PDF" });
    }
  });

  // Get uploaded documents
  app.get("/api/documents", async (req, res) => {
    try {
      const documents = await storage.getUploadedDocuments();
      res.json(documents);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch documents" });
    }
  });

  // Calculate skip strategy
  app.get("/api/skip-calculator/:subjectId", async (req, res) => {
    try {
      const subject = await storage.getSubject(req.params.subjectId);
      if (!subject) {
        return res.status(404).json({ message: "Subject not found" });
      }

      const attendanceRate = (subject.attendedClasses / subject.totalClasses) * 100;
      const requiredClasses = Math.ceil((subject.totalClasses * subject.minimumAttendance) / 100);
      const canSkip = Math.max(0, subject.attendedClasses - requiredClasses);
      const needToAttend = Math.max(0, requiredClasses - subject.attendedClasses);

      res.json({
        subjectName: subject.name,
        currentAttendance: attendanceRate,
        canSkip,
        needToAttend,
        status: attendanceRate >= subject.minimumAttendance ? 'safe' : 'warning',
        recommendation: attendanceRate >= subject.minimumAttendance 
          ? `You can skip up to ${canSkip} more classes safely.`
          : `You need to attend at least ${needToAttend} more classes to meet minimum requirement.`
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to calculate skip strategy" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
