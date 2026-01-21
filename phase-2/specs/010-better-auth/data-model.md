# Data Model: Better Auth Implementation

## User Entity

**Description**: Represents a registered user in the system

**Fields**:
- `id` (string): Unique identifier for the user
- `email` (string): User's email address (unique, validated format)
- `createdAt` (Date): Timestamp when the user account was created
- `updatedAt` (Date): Timestamp when the user account was last updated
- `emailVerified` (Date | null): Timestamp when email was verified (if applicable)

**Validation Rules**:
- Email must follow standard email format
- Email must be unique across all users
- Email cannot be changed after account creation
- Required fields: email

## Session Entity

**Description**: Represents an active user session

**Fields**:
- `id` (string): Unique identifier for the session
- `userId` (string): Reference to the associated user
- `expiresAt` (Date): Timestamp when the session expires
- `createdAt` (Date): Timestamp when the session was created
- `ipAddress` (string | null): IP address of the session origin
- `userAgent` (string | null): Browser/device information

**Validation Rules**:
- Session must be associated with a valid user
- Session must not be expired when accessed
- Session should have reasonable expiration time (e.g., 7 days)
- Required fields: userId, expiresAt

## Authentication Token (Internal to Better Auth)

**Description**: Temporary tokens used for authentication processes (password reset, email verification)

**Fields**:
- `id` (string): Unique identifier for the token
- `token` (string): The actual token value (hashed)
- `type` (string): Type of token (e.g., "password_reset", "email_verification")
- `userId` (string): Reference to the associated user
- `expiresAt` (Date): Timestamp when the token expires
- `createdAt` (Date): Timestamp when the token was created

**Validation Rules**:
- Token must be associated with a valid user
- Token must not be expired when used
- Token can only be used once (for security)
- Required fields: token, type, userId, expiresAt

## State Transitions

### User State Transitions
- **Unregistered** → **Registered**: User completes signup flow
- **Registered** → **Email Verified**: User verifies email address (if required)
- **Active**: User is logged in and has valid session

### Session State Transitions
- **Created** → **Active**: Session is established after successful authentication
- **Active** → **Expired**: Session reaches expiration time
- **Active** → **Terminated**: User logs out or session is invalidated

## Relationships

- **User** 1 ←→ * **Session**: One user can have multiple active sessions
- **User** 1 ←→ * **Authentication Token**: One user can have multiple tokens (for different purposes)