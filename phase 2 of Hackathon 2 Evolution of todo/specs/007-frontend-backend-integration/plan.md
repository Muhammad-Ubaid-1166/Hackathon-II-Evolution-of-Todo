# Implementation Plan: Frontend–Backend Integration (Next.js + FastAPI)

**Related Spec**: spec.md  
**Feature Branch**: `007-frontend-backend-integration`  
**Status**: Planned  
**Scope**: Phase-II Frontend Integration

---

## Objective

Establish a reliable and scalable integration between the Next.js frontend and FastAPI backend using an environment-based configuration (`NEXT_PUBLIC_BACKEND_URL`) and clearly defined API communication patterns.

---

## High-Level Strategy

1. **Environment Configuration**
   - Configure backend base URL using `.env.local`
   - Ensure environment variables are accessible in Next.js runtime

2. **API Communication Layer**
   - Create a centralized API utility/service layer
   - Use `fetch` or a wrapper for consistent request handling

3. **CRUD Integration**
   - Integrate all backend todo endpoints:
     - GET `/todos`
     - POST `/todos`
     - PUT `/todos/{id}`
     - DELETE `/todos/{id}`

4. **Error & Edge Case Handling**
   - Gracefully handle API failures, timeouts, and invalid responses
   - Display user-friendly error messages in UI

5. **Documentation Sync**
   - Use context7 MCP to retrieve and validate updated backend API documentation
   - Cross-check documentation with `main.py`

6. **Validation & Testing**
   - Verify backend availability before requests
   - Test API integration manually and via UI flows

---

## Technical Approach

### Frontend (Next.js)
- Use `process.env.NEXT_PUBLIC_NEXT_PUBLIC_BACKEND_URL`
- Centralize API calls in a dedicated module (e.g. `services/todoApi.ts`)
- Ensure JSON serialization/deserialization
- Handle loading, success, and error states

### Backend (FastAPI)
- Consume existing endpoints defined in `main.py`
- Assume REST-compliant JSON APIs

---

## Risks & Mitigations

| Risk | Mitigation |
|----|----|
| Misconfigured NEXT_PUBLIC_BACKEND_URL | Add validation & fallback error messaging |
| Backend downtime | Graceful UI error handling |
| API changes | Keep documentation synced via context7 MCP |
| Slow responses | Timeout handling & loading indicators |

---

## Completion Criteria

- All CRUD operations work end-to-end
- Environment-based backend switching works
- Errors are handled gracefully
- API documentation is verified and accurate
