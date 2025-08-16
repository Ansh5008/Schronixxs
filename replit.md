# Schronix - Student Attendance Management System

## Overview

Schronix is a comprehensive student attendance management system built as a full-stack web application. The system helps students track their class attendance, manage academic schedules, and upload/process academic documents like timetables and calendars. The application features a modern React frontend with a Node.js/Express backend, utilizing PostgreSQL for data persistence and Drizzle ORM for database operations.

## User Preferences

Preferred communication style: Simple, everyday language.
Design preference: Modern minimal design with flowing curves and beautiful animations.
Landing page structure: Multi-section scrollable page with hero, team section, and upload functionality leading to dashboard.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system variables
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API endpoints
- **Database ORM**: Drizzle ORM for type-safe database operations
- **File Handling**: Multer for PDF document uploads with 10MB size limits
- **Session Management**: Connect PG Simple for PostgreSQL session storage
- **Development**: TSX for TypeScript execution in development

### Data Storage Architecture
- **Primary Database**: PostgreSQL with connection pooling via Neon serverless
- **Schema Design**: Four main entities (subjects, attendance_records, uploaded_documents, schedule_events)
- **Migration Strategy**: Drizzle Kit for database schema migrations
- **Storage Abstraction**: Interface-based storage layer with in-memory implementation for development

### Core Data Models
- **Subjects**: Track course information, total/attended classes, and minimum attendance requirements
- **Attendance Records**: Individual attendance entries linked to subjects with timestamps
- **Uploaded Documents**: PDF document metadata with extracted text content
- **Schedule Events**: Calendar events for classes, exams, and assignments

### Authentication & Security
- **File Upload Security**: PDF-only file type restrictions with size limits
- **CORS Configuration**: Configured for cross-origin requests
- **Input Validation**: Zod schemas for API request validation
- **Error Handling**: Centralized error middleware with status code handling

## External Dependencies

### Database Services
- **Neon Database**: PostgreSQL-compatible serverless database for production
- **Connection Management**: @neondatabase/serverless for optimized database connections

### UI Component Libraries
- **Radix UI**: Comprehensive set of accessible React primitives for complex components
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Modern icon library for consistent iconography

### Development Tools
- **Drizzle Kit**: Database migration and schema management toolkit
- **ESBuild**: Fast JavaScript bundler for production builds
- **Vite Plugins**: Development tooling including error overlay and cartographer

### File Processing
- **Multer**: Middleware for handling multipart/form-data file uploads
- **PDF Processing**: Placeholder implementation for PDF text extraction (ready for pdf-parse integration)

### Development Environment
- **Replit Integration**: Custom plugins and banner for Replit development environment
- **Hot Module Replacement**: Vite HMR for fast development iteration
- **TypeScript Configuration**: Strict type checking with path mapping for imports