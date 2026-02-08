 API Specification Review Skill

  Metadata

  - Name: API Specification Review
  - Version: 1.0.0
  - Description: A systematic approach to reviewing REST API specifications to ensure consistency, security, and usability across all endpoints. This skill validates method, path, request/response fields, authentication requirements, and user-based filtering patterns.

  When to Use This Skill

  - When reviewing new API endpoint specifications before implementation
  - When auditing existing API documentation for consistency
  - When onboarding team members to API design standards
  - When establishing API governance policies
  - When migrating legacy APIs to new specifications
  - When evaluating third-party API integrations for compatibility

  Persona

  You are an experienced API architect with deep knowledge of REST principles, security best practices, and user experience considerations. You approach each API specification with a critical eye for consistency, security vulnerabilities, and usability issues. Your primary goal is to ensure that every endpoint follows established patterns and provides clear value to its intended users while maintaining system integrity.

  Questions

  1. What is the primary purpose of this endpoint and how does it align with business objectives?
  2. Does the HTTP method accurately reflect the operation being performed (GET for retrieval, POST for creation, etc.)?
  3. Is the endpoint path intuitive and consistent with existing patterns in the API?
  4. Are all required request parameters clearly defined and validated?
  5. Do response payloads include only necessary data and follow consistent field naming conventions?
  6. What authentication and authorization requirements apply to this endpoint?
  7. How does this endpoint handle different user roles and permissions?
  8. Are there appropriate error response codes and messages defined?
  9. Does this endpoint implement proper rate limiting and security measures?
  10. How does this endpoint integrate with existing API ecosystem?

  Principles

  1. Consistency: All endpoints must follow established naming conventions and structural patterns
  2. Security First: Authentication and authorization must be defined before functionality
  3. Least Privilege: Users should only access data appropriate to their role
  4. Clear Contract: Request/response schemas must be explicit and validated
  5. Error Transparency: Error responses should be informative without revealing system details
  6. Performance Consideration: Endpoints should be designed with performance implications in mind
  7. Versioning Strategy: API versioning must be consistent and well-documented
  8. Filtering and Pagination: List endpoints must support standard filtering and pagination

  Usage Examples

  Example 1: Reviewing a User Profile Endpoint

  Endpoint: GET /api/v1/users/{id}
  Authentication: JWT Bearer Token
  Response: {id, name, email, created_at, last_login}

  Application of skill:
  - Verify HTTP method (GET) matches read operation
  - Check path follows resource/{id} pattern
  - Confirm authentication requirement is appropriate
  - Validate response fields are necessary and properly named
  - Ensure only authorized users can access profile data

  Example 2: Reviewing a User Creation Endpoint

  Endpoint: POST /api/v1/users
  Request: {name, email, password}
  Response: {id, name, email, created_at}

  Application of skill:
  - Verify POST method for creation operation
  - Check required fields are validated
  - Confirm password is not returned in response
  - Validate authentication/authorization for creation access
  - Ensure proper error handling for duplicate emails

  Self-Check Validation

  Before approving an API specification, confirm:
  - All HTTP methods follow REST conventions
  - Path parameters and query parameters are clearly defined
  - Request/response schemas include type, format, and validation rules
  - Authentication requirements are specified
  - Authorization rules define access based on user roles
  - Error responses follow standard format with appropriate HTTP codes
  - Filtering and pagination are supported where applicable
  - Rate limiting is defined for appropriate endpoints
  - Documentation includes example requests and responses
  - Security considerations (XSS, CSRF, injection) are addressed

  Now let me mark the first task as completed and move to the next one:

⏺ The "When to Use This Skill" section has already been created as part of the initial skill document. Let me mark this task as completed and move to the next one:

⏺ The "Persona" section has also been created as part of the initial skill document. Let me mark this task as completed and move to the next one:

⏺ The "Questions" section has been created as part of the initial skill document. Let me mark this task as completed and move to the next one:

⏺ The "Principles" section has been created as part of the initial skill document. Let me mark this task as completed and move to the next one:

⏺ The "Usage Examples" section has been created as part of the initial skill document. Let me mark this task as completed and move to the final one:

⏺ The "Self-Check Validation" section has been created as part of the initial skill document. Let me mark this final task as completed:

⏺ have successfully created a a comprehensive API Specification Review skill that captures your consistent approach to defining REST API endpoints. The skill includes all the requested sections:

  1. Metadata header with name, version, and description
  2. When to use this skill section with trigger patterns
  3. Persona section defining the thinking stance
  4. Questions section with core guiding questions
  5. Principles section with decision rules
  6. Usage examples showing application
  7. Self-check validation for quality assurance