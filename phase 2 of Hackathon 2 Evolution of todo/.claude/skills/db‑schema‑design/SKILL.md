  SQLModel Table Design Skill

  Metadata

  - Name: SQLModel Table Design
  - Version: 1.0.0
  - Description: A systematic approach to designing Postgres tables using SQLModel that ensures proper schema definition, field types, constraints, relationships, and data integrity. This skill guides the creation of well-structured database tables that follow best practices for SQLModel and Postgres.

  When to Use This Skill

  - When creating new database tables for an application
  - When refactoring existing database schemas to use SQLModel
  - When defining relationships between entities in a data model
  - When establishing data integrity constraints and validation rules
  - When migrating from other ORMs to SQLModel
  - When onboarding team members to SQLModel best practices

  Persona

  You are an experienced database architect with deep knowledge of SQLModel, Postgres, and data modeling principles. You approach each table design with attention to data integrity, performance, and maintainability. Your primary goal is to ensure that every table follows SQLModel conventions, properly defines relationships, and implements appropriate constraints for data consistency.

  Questions

  1. What is the purpose of this table and what data will it store?
  2. What is the table name and does it follow naming conventions?
  3. What fields are needed and what are their appropriate data types?
  4. Which fields are required vs optional in this table?
  5. What constraints are needed (uniqueness, primary keys, check constraints)?
  6. What relationships does this table have with other entities?
  7. What foreign key constraints need to be defined?
  8. Are there any indexes needed for performance optimization?
  9. How will this table handle data validation and business rules?
  10. What are the expected data volumes and access patterns?

  Principles

  1. Explicit Field Types: Always specify appropriate SQLModel field types with proper constraints
  2. Primary Key Convention: Use integer primary keys with auto-increment unless UUID is required
  3. Relationship Clarity: Define relationships explicitly with proper foreign key constraints
  4. Data Integrity: Implement appropriate constraints to maintain data consistency
  5. Index Strategy: Add indexes for frequently queried fields while balancing write performance
  6. Null Safety: Be intentional about nullable fields vs default values
  7. Relationship Patterns: Use standard patterns for one-to-many, many-to-many, and one-to-one relationships
  8. Validation Rules: Implement validation at both field and model levels where appropriate

  Usage Examples

  Example 1: Designing a User Table

  Table Name: users
  Fields: id (int, primary_key), email (str, unique, index), name (str), created_at (datetime)
  Constraints: email must be unique, name required
  Relationships: one-to-many with posts table

  Application of skill:
  - Verify primary key is integer with auto-increment
  - Confirm email field has unique constraint and index
  - Validate required field constraints
  - Define relationship with posts table via foreign key

  Example 2: Designing a Post Table with Relationships

  Table Name: posts
  Fields: id (int, primary_key), title (str), content (str), user_id (int, foreign_key), created_at (datetime)
  Constraints: title required, user_id references users table
  Relationships: belongs to user, has many comments

  Application of skill:
  - Confirm foreign key constraint to users table
  - Validate required field constraints
  - Define relationship with users and comments tables
  - Ensure proper indexing for join queries

  Self-Check Validation

  Before finalizing a table design, confirm:
  - Primary key is defined with appropriate type (int or UUID)
  - All required fields are marked as non-nullable
  - Unique constraints are properly defined where needed
  - Foreign key relationships are explicitly defined
  - Indexes are added for frequently queried fields
  - Field types match the expected data accurately
  - Default values are set for appropriate optional fields
  - Check constraints are implemented for business rules
  - Relationship back-references are properly configured
  - Table and field names follow snake_case convention

  Now let me mark the first task as completed and move to the next one:

⏺ The "When to Use This Skill" section has already been created as part of the initial skill document. Let me mark this task as completed and move to the next one:

⏺ The "Persona" section has already been created as part of the initial skill document. Let me mark this task as completed and move to the next one:

⏺ The "Questions" section has already been created as part of the initial skill document. Let me mark this task as completed and move to the next one:

⏺ The "Principles" section has already been created as part of the initial skill document. Let me mark this task as completed and move to the next one:

⏺ The "Usage Examples" section has already been created as part of the initial skill document. Let me mark this task as completed and move to the final one:

⏺ The "Self-Check Validation" section has already been created as part of the initial skill document. Let me mark this final task as completed:

⏺ I have successfully created a comprehensive SQLModel Table Design skill that captures a systematic approach to designing Postgres tables. The skill includes all the requested sections:

  1. Metadata header with name, version, and description
  2. When to use this skill section with trigger patterns
  3. Persona section defining the thinking stance
  4. Questions section with core guiding questions for table design
  5. Principles section with decision rules for SQLModel design
  6. Usage examples showing how to apply the skill
  7. Self-check validation for quality assurance

  The skill specifically addresses the requirements mentioned:
  - Asking for table name, fields, and types
  - Identifying relationships between tables
  - Validating uniqueness and foreign key constraints