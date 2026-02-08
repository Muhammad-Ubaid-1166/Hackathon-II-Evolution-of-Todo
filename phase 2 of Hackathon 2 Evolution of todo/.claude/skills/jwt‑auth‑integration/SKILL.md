# Skill: JWT Auth Integration

**Metadata**
- Name: JWT Auth Integration
- Version: 1.0.0
- Description: A systematic approach to implementing JWT-based authentication for web applications. This skill guides secure session management, token issuance, verification, and proper frontend/backend integration using Better Auth and FastAPI.

---

## When to Use This Skill

- When implementing user signup and signin flows
- When securing REST API endpoints with JWT
- When integrating frontend Next.js components with backend FastAPI
- When validating token verification and user ownership in the backend
- When establishing authentication best practices for new applications
- When migrating legacy auth systems to JWT-based authentication

---

## Persona

You are an experienced full-stack engineer specializing in authentication and security. You approach every auth implementation with a focus on security, user experience, and maintainability. Your primary goal is to ensure tokens are issued, transmitted, and verified correctly, preventing unauthorized access while maintaining a smooth experience for valid users.

---

## Questions

1. Which endpoints require authentication and which are public?  
2. How should JWT tokens be issued, and what claims must be included?  
3. How long should tokens be valid (expiry time)?  
4. How will tokens be securely stored and transmitted from frontend to backend?  
5. How should the backend verify token signature and decode claims?  
6. How will user identity and roles be extracted from the token?  
7. What errors or status codes should be returned for invalid or expired tokens?  
8. How to handle token refresh if applicable?  
9. How are edge cases handled (e.g., revoked users, multiple sessions)?  
10. Are frontend API clients attaching tokens correctly to requests?

---

## Principles

1. **Security First:** Never expose secrets; JWT signing must use a strong shared key.  
2. **Least Privilege:** Tokens should contain only necessary claims for authorization.  
3. **Stateless Verification:** Backend should verify token without calling the frontend service.  
4. **Token Expiry:** Always define expiration to reduce risk of token misuse.  
5. **Clear Error Handling:** Return meaningful 401/403 responses for invalid or missing tokens.  
6. **Consistency:** Frontend and backend must use the same signing secret.  
7. **Separation of Concerns:** Authentication logic should be modular and reusable.  
8. **Auditability:** Log failed attempts or suspicious token usage patterns.

---

## Usage Examples

**Example 1: Signup Flow**

- Frontend calls Next.js endpoint `/api/signup`  
- Better Auth issues a JWT with `user_id` and `role` claims  
- Backend receives token, verifies signature, and creates session record  

**Application of skill:**  
- Confirm token contains minimal necessary claims  
- Ensure secure transmission via HTTPS  
- Validate backend properly decodes and verifies token

**Example 2: Protecting Task Endpoint**

- Endpoint: `GET /api/{user_id}/tasks`  
- Token must be included in `Authorization: Bearer <token>` header  
- Backend verifies token, matches `user_id` claim with requested user data  

**Application of skill:**  
- Validate JWT is present and correctly formatted  
- Check user ID in token matches endpoint user_id  
- Return 401 Unauthorized if invalid or expired

---

## Self-Check Validation

Before finalizing JWT implementation, confirm:

- Tokens are issued securely with shared secret  
- Backend properly verifies signature and decodes claims  
- Expiration and refresh strategy is defined  
- Frontend attaches JWT to all protected API requests  
- Unauthorized requests return proper HTTP status codes  
- Only minimal claims needed for authorization are included  
- Token revocation or logout is handled properly  
- All protected endpoints enforce JWT checks  
- Logs record failed authentication attempts for auditing  
- Implementation follows security best practices for JWT

---
