# Implementation Plan: Secure CORS Configuration (FastAPI)

**Related Spec**: spec.md
**Feature Branch**: `008-secure-cors-config`
**Status**: Planned
**Scope**: Phase-II Backend Security Hardening

---

## Objective

Secure the FastAPI backend by restricting Cross-Origin Resource Sharing (CORS) to a specific, authorized frontend origin defined through the `WEB_URL` environment variable, replacing the current insecure wildcard (`*`) configuration.

---

## High-Level Strategy

1. **Environment-Driven Configuration**
   - Use `WEB_URL` from backend `.env` as the single source of truth
   - Support environment-based values (development, staging, production)

2. **Secure-by-Default CORS Policy**
   - Remove all wildcard origin access
   - Explicitly allow only the configured origin
   - Fail securely when configuration is missing or invalid

3. **Origin Validation**
   - Parse and validate the origin portion of `WEB_URL`
   - Prevent malformed or unsafe values from enabling access

4. **Clear Feedback & Observability**
   - Log active CORS configuration at startup
   - Provide clear rejection behavior for unauthorized origins

5. **Testing & Verification**
   - Validate allowed vs disallowed origins
   - Confirm backend functionality remains unaffected for allowed origins

---

## Technical Approach

### Environment Management
- Load environment variables using `.env`
- Validate presence and correctness of `WEB_URL` at startup

### CORS Middleware
- Use FastAPI `CORSMiddleware`
- Configure:
  - `allow_origins=[parsed_origin]`
  - `allow_credentials=True`
  - Explicit HTTP methods and headers
- Avoid regex or wildcard origins

### Security Defaults
- If `WEB_URL` is missing or invalid:
  - Reject all cross-origin requests **OR**
  - Allow only a strictly defined localhost origin (explicit decision)

---

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Misconfigured WEB_URL blocks legitimate traffic | High | Medium | Validate origin format and provide clear error messages |
| Missing WEB_URL causes all CORS requests to fail | High | Low | Provide sensible default for development (localhost:3000) |
| Incomplete origin matching (subdomain issues) | Medium | Low | Use proper origin parsing and validation |

---

## Implementation Tasks

### Task 1: Environment Configuration
- [ ] Read `WEB_URL` from environment variables in `backend/main.py`
- [ ] Set default value for development (`http://localhost:3000`)
- [ ] Add `WEB_URL` to `.env` file with appropriate default

### Task 2: CORS Middleware Update
- [ ] Replace wildcard `["*"]` with `[WEB_URL]` in CORS configuration
- [ ] Ensure credentials are still properly handled
- [ ] Maintain existing method/header allowances

### Task 3: Origin Validation
- [ ] Add basic validation for WEB_URL format
- [ ] Log active CORS configuration at startup
- [ ] Add error handling for invalid configurations

### Task 4: Testing & Verification
- [ ] Test requests from allowed origin (should succeed)
- [ ] Test requests from unauthorized origin (should fail)
- [ ] Verify all API endpoints remain functional for allowed origins

---

## Dependencies

- FastAPI CORS middleware
- Existing `.env` file structure
- Frontend application deployment configuration

---

## Success Criteria

- [ ] Only requests from the configured WEB_URL origin are accepted
- [ ] Requests from other origins are rejected with CORS errors
- [ ] All API functionality remains intact for allowed origins
- [ ] Environment-based configuration works for different deployment scenarios
- [ ] Default development configuration allows localhost:3000