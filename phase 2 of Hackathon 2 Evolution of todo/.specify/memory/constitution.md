<!-- SYNC IMPACT REPORT:
Version change: N/A → 1.0.0
Modified principles: N/A (new constitution)
Added sections: All principles and sections (new constitution)
Removed sections: N/A
Templates requiring updates:
  - .specify/templates/plan-template.md: ⚠ pending
  - .specify/templates/spec-template.md: ⚠ pending
  - .specify/templates/tasks-template.md: ⚠ pending
  - .specify/templates/commands/*.md: ⚠ pending
Follow-up TODOs: None
-->

# Todo Full-Stack Web Application Constitution

## Core Principles

### Specification-Driven Development
All implementation must trace back to a written specification; No manual coding outside specification-driven outputs; Every feature starts with clear requirements documented in specs/; Implementation follows the strict sequence: Write specification → Generate implementation plan → Break work into tasks → Implement via Claude Code.

### Security-First
Authentication and authorization enforced at all layers; All API endpoints require valid JWT tokens; User identity derived from token, not client input; All data access filtered by authenticated user ID; Database schema enforces ownership and integrity constraints; Unauthorized requests return proper HTTP error codes (401/403).

### Test-First (NON-NEGOTIABLE)
TDD mandatory for all features: Tests written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced; API behavior must match specification exactly; Error handling must be explicit and informative; Frontend must correctly attach JWT tokens to all protected requests.

### API-First Design
RESTful API design following industry standards; FastAPI backend with proper HTTP status codes; Clear API contracts with defined inputs, outputs, and errors; Versioning strategy for future API evolution; Proper error taxonomy with appropriate status codes.

### User Isolation
Strict data isolation between users; Each user accesses only their own tasks; Database-level enforcement of user ownership; No cross-user data leakage permitted; Authentication tokens must be verified on backend.

### Full-Stack Integration
Frontend-backend-database integration as single unit; Next.js 16+ with App Router for frontend; Python FastAPI with SQLModel ORM for backend; Neon Serverless PostgreSQL for persistence; Authentication system (Better Auth) shared between frontend and backend.

## Technology Stack Requirements

Frontend: Next.js 16+ using App Router; Backend: Python FastAPI; ORM: SQLModel; Database: Neon Serverless PostgreSQL; Authentication: Better Auth (JWT-based); Development Methodology: Claude Code + Spec-Kit Plus (Agentic Dev Stack); All data must persist in Neon Serverless PostgreSQL; Frontend must be responsive and accessible.

## Development Workflow

Follow the Agentic Dev Stack workflow strictly: 1. Write specification, 2. Generate implementation plan, 3. Break work into tasks, 4. Implement via Claude Code; Every implementation must trace back to a written specification; Authentication must be JWT-based with shared secret verification; Code must be clean, consistent, and production-ready; Quality standards: Clean, consistent, production-ready code; API behavior matching specification exactly; Explicit error handling; Database schema enforcing ownership constraints.

## Governance

Constitution supersedes all other practices; All development must follow Specification-Driven Development methodology; Amendments require documentation, approval, and migration plan; All PRs/reviews must verify compliance with security-first principles; Complexity must be justified; Use spec-driven workflow for all development activities; Every user input must be recorded as a Prompt History Record (PHR); Architectural decisions require ADR documentation when significant.

**Version**: 1.0.0 | **Ratified**: 2025-12-24 | **Last Amended**: 2025-12-24