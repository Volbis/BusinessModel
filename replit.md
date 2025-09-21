# Overview

This is a Business Model Canvas application built with React and TypeScript. It provides an interactive web interface for creating and managing business model canvases, allowing users to add items to nine key business model categories (key partners, activities, value propositions, customer relationships, segments, resources, channels, cost structure, and revenue streams). The application uses local storage for data persistence and includes export functionality.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The application uses a modern React architecture with TypeScript:
- **Component Library**: Built on shadcn/ui components with Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **State Management**: React hooks with local component state, no external state management library
- **Routing**: Wouter for lightweight client-side routing
- **Data Fetching**: TanStack React Query for server state management (though currently unused as the app is client-side only)
- **Forms & Validation**: React Hook Form with Zod for schema validation

## Data Storage Solution
The application currently uses browser localStorage for data persistence:
- **Schema Definition**: Zod schemas in `shared/schema.ts` define the canvas data structure
- **Storage Layer**: Custom `CanvasStorage` class handles localStorage operations
- **Data Structure**: Canvas data organized by block types with unique item IDs

## Backend Architecture
The backend is set up with Express.js but currently serves as a minimal API server:
- **Framework**: Express.js with TypeScript
- **Database Setup**: Configured for PostgreSQL with Drizzle ORM but not actively used
- **API Routes**: Placeholder routes in `server/routes.ts` for future backend functionality
- **Development**: Vite development server integration for hot module replacement

## Build & Development System
- **Build Tool**: Vite for fast development and optimized production builds
- **Package Manager**: npm with comprehensive dependency management
- **TypeScript**: Strict type checking with path aliases for clean imports
- **Development**: Hot reload with Vite, error overlays, and development banners for Replit

## External Dependencies

### Core Frontend Libraries
- **React 18**: Modern React with concurrent features
- **TypeScript**: Full type safety across the application
- **Tailwind CSS**: Utility-first CSS framework for styling
- **shadcn/ui**: Pre-built component library with Radix UI accessibility

### Development & Build Tools
- **Vite**: Fast build tool and development server
- **Drizzle Kit**: Database migration and schema management tool
- **PostCSS**: CSS processing with Autoprefixer

### Backend Infrastructure
- **Express.js**: Web application framework for Node.js
- **Drizzle ORM**: Type-safe PostgreSQL database toolkit
- **Neon Database**: Serverless PostgreSQL database service (@neondatabase/serverless)

### Utility Libraries
- **Zod**: Runtime type validation and schema definition
- **date-fns**: Modern date utility library
- **nanoid**: URL-safe unique ID generator
- **clsx & class-variance-authority**: Conditional CSS class utilities

The application is designed as a progressive web app that can evolve from client-side localStorage to full backend persistence when needed. The database schema and ORM are already configured for future backend integration.