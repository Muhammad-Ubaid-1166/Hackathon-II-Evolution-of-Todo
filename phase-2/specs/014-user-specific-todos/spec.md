# User-Specific Todos Specification

## Overview
Implement user isolation for todo management, ensuring each authenticated user can only access and manage their own todos. This transforms the application from a single-user system to a multi-user production-ready application.

## Current State
- Application has authentication via NextAuth.js
- JWT tokens are issued upon login
- Backend API endpoints exist but are not user-aware
- Database stores todos without user association

## Target State
- Each user sees only their own todos
- User data is properly isolated in the database
- API endpoints are secured with user authentication
- Application supports multiple concurrent users

## Requirements

### Functional Requirements
1. **User Authentication**: JWT tokens must be validated on all todo operations
2. **Data Isolation**: Todos must be filtered by authenticated user
3. **Security**: Users cannot access other users' todos
4. **Database Schema**: Add user_id field to Todo model
5. **API Security**: All CRUD operations must include user validation

### Non-Functional Requirements
1. **Performance**: User filtering should not impact query performance
2. **Security**: Proper error handling for unauthorized access
3. **Scalability**: Database design should support multiple users
4. **Maintainability**: Clean separation of authentication logic

## Implementation Details

### Database Changes
- Add `user_id` field to Todo table
- Field type: VARCHAR, indexed for performance
- Stores user's email address from JWT token

### API Changes
- Add authentication dependency to all todo endpoints
- Extract user information from JWT token
- Filter all database queries by user_id
- Return appropriate error responses for unauthorized access

### Authentication Flow
1. Frontend sends request with Authorization header containing JWT
2. Backend validates JWT and extracts user email
3. All database operations are filtered by user email
4. Response contains only user's todos

## Success Criteria
- [X] Users can only see their own todos
- [X] Creating todos associates them with the correct user
- [X] Updating/deleting todos validates ownership
- [X] API returns 401 for invalid/missing tokens
- [X] Database queries are optimized with proper indexing
- [X] Application supports multiple concurrent users

## Testing Scenarios
1. User A logs in and creates todos - only User A can see them
2. User B logs in - sees empty todo list (no todos created yet)
3. User A cannot access User B's todos
4. Invalid JWT tokens are rejected
5. Missing authorization headers return 401

## Dependencies
- NextAuth.js authentication system
- JWT token validation
- PostgreSQL database with proper schema
- FastAPI backend with authentication middleware
