---
id: 0001
title: Update Project Constitution
stage: constitution
date: 2025-12-24
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: main
user: Claude Code
command: sp.constitution
labels: [constitution, setup, governance]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  - none
---

## Prompt

```text
"Todo Full-Stack Web Application

You are operating in a hackathon environment with the objective of building a production-quality, multi-user Todo full-stack web application using a strict Specification-Driven Development approach.

### Project Goal
Transform a basic Todo application into a modern, scalable, and secure full-stack web application with persistent storage, authentication, and user isolation.

### Technology Stack
- Frontend: Next.js 16+ using App Router
- Backend: Python FastAPI
- ORM: SQLModel
- Database: Neon Serverless PostgreSQL
- Authentication: Better Auth (JWT-based)
- Development Methodology: Claude Code + Spec-Kit Plus (Agentic Dev Stack)

### Core Requirements
- Implement all 5 Basic Level Todo features as a web application
- Create RESTful API endpoints following REST principles
- Build a responsive and accessible frontend UI
- Persist all data in Neon Serverless PostgreSQL
- Implement secure user signup and signin using Better Auth
- Enforce strict user isolation (each user accesses only their own tasks)

### Development Constraints
- Follow the Agentic Dev Stack workflow strictly:
  1. Write specification
  2. Generate implementation plan
  3. Break work into tasks
  4. Implement via Claude Code
- No manual coding outside Claude Code–generated outputs
- Every implementation must trace back to a written specification
- Authentication must be JWT-based with shared secret verification between frontend and backend

### API Security Rules
- All API endpoints must require a valid JWT token
- JWT must be verified on the FastAPI backend
- User identity must be derived from the token, not from client input
- All data access must be filtered by authenticated user ID
- Unauthorized requests must return proper HTTP error codes (401/403)

### Quality Standards
- Code must be clean, consistent, and production-ready
- API behavior must match the specification exactly
- Error handling must be explicit and informative
- Database schema must enforce ownership and integrity constraints
- Frontend must correctly attach JWT tokens to all protected requests

### Success Criteria
The project is successful when:
- All required features are implemented and working
- Authentication and authorization are enforced correctly
- Frontend, backend, and database are fully integrated
- The system passes security, consistency, and usability reviews
"
```

## Response snapshot

Updated the project constitution file (.specify/memory/constitution.md) with specific principles and requirements for the Todo Full-Stack Web Application. The constitution now includes 6 core principles: Specification-Driven Development, Security-First, Test-First, API-First Design, User Isolation, and Full-Stack Integration. It also includes sections on Technology Stack Requirements, Development Workflow, and Governance.

## Outcome

- ✅ Impact: Created project constitution with security-first and spec-driven development principles
- 🧪 Tests: No tests required for constitution update
- 📁 Files: Updated .specify/memory/constitution.md with project-specific principles
- 🔁 Next prompts: Plan and implement initial todo features based on constitution
- 🧠 Reflection: Constitution provides clear governance framework for project development

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS - All constitution placeholders filled with specific project requirements
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin feature specification based on constitution