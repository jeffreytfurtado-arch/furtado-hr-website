/**
 * Drizzle ORM schema entrypoint.
 */
import { mysqlTable, varchar, text, boolean, timestamp, int } from 'drizzle-orm/mysql-core';

// User table - stores user account information
export const user = mysqlTable('user', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: boolean('email_verified').default(false),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// Session table - stores active user sessions
export const session = mysqlTable('session', {
  id: varchar('id', { length: 36 }).primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: varchar('token', { length: 255 }).notNull().unique(),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  userId: varchar('user_id', { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// Account table - stores authentication provider information
export const account = mysqlTable('account', {
  id: varchar('id', { length: 36 }).primaryKey(),
  accountId: varchar('account_id', { length: 255 }).notNull(),
  providerId: varchar('provider_id', { length: 255 }).notNull(), // 'credential' for email/password
  userId: varchar('user_id', { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  // OAuth tokens (only used for OAuth providers)
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  // Hashed password (only used when providerId='credential' for email/password auth)
  password: varchar('password', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// Password Reset Tokens table - stores password reset tokens
export const passwordResetToken = mysqlTable('password_reset_token', {
  id: varchar('id', { length: 36 }).primaryKey(),
  token: varchar('token', { length: 255 }).notNull().unique(),
  userId: varchar('user_id', { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Verification table - stores email verification tokens
export const verification = mysqlTable('verification', {
  id: varchar('id', { length: 36 }).primaryKey(),
  identifier: varchar('identifier', { length: 255 }).notNull(),
  value: varchar('value', { length: 255 }).notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// Contact submissions table - stores contact form submissions
// Portal: Employees
export const employees = mysqlTable('employees', {
  id: int('id').primaryKey().autoincrement(),
  userId: varchar('user_id', { length: 255 }).notNull(), // Links to user.id from auth
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  position: varchar('position', { length: 255 }),
  department: varchar('department', { length: 255 }),
  hireDate: timestamp('hire_date'),
  status: varchar('status', { length: 50 }).default('active'), // active, inactive, terminated
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Portal: Documents
export const documents = mysqlTable('documents', {
  id: int('id').primaryKey().autoincrement(),
  userId: varchar('user_id', { length: 255 }).notNull(), // Links to user.id from auth
  employeeId: int('employee_id'), // Optional: link to specific employee
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  fileName: varchar('file_name', { length: 255 }).notNull(),
  fileUrl: varchar('file_url', { length: 500 }).notNull(),
  fileSize: int('file_size'), // in bytes
  fileType: varchar('file_type', { length: 100 }),
  category: varchar('category', { length: 100 }), // policy, contract, handbook, etc.
  uploadedAt: timestamp('uploaded_at').defaultNow().notNull(),
});

// Portal: Time Off Requests
export const timeOffRequests = mysqlTable('time_off_requests', {
  id: int('id').primaryKey().autoincrement(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  employeeId: int('employee_id').notNull(),
  employeeName: varchar('employee_name', { length: 255 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // vacation, sick, personal, etc.
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  days: int('days').notNull(),
  reason: text('reason'),
  status: varchar('status', { length: 50 }).default('pending'), // pending, approved, denied
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Portal: Performance Reviews
export const performanceReviews = mysqlTable('performance_reviews', {
  id: int('id').primaryKey().autoincrement(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  employeeId: int('employee_id').notNull(),
  employeeName: varchar('employee_name', { length: 255 }).notNull(),
  reviewPeriod: varchar('review_period', { length: 100 }).notNull(), // Q1 2024, etc.
  reviewDate: timestamp('review_date').notNull(),
  overallRating: int('overall_rating'), // 1-5 scale
  goals: text('goals'),
  achievements: text('achievements'),
  areasForImprovement: text('areas_for_improvement'),
  comments: text('comments'),
  status: varchar('status', { length: 50 }).default('draft'), // draft, completed
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const contactSubmissions = mysqlTable('contact_submissions', {
  id: int('id').primaryKey().autoincrement(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  company: varchar('company', { length: 255 }).notNull(),
  employees: varchar('employees', { length: 50 }),
  serviceInterest: varchar('service_interest', { length: 255 }),
  message: text('message'),
  emailSent: boolean('email_sent').default(false),
  emailError: text('email_error'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Newsletter subscribers table - stores newsletter subscriptions
export const newsletterSubscribers = mysqlTable('newsletter_subscribers', {
  id: int('id').primaryKey().autoincrement(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  company: varchar('company', { length: 255 }),
  subscribedAt: timestamp('subscribed_at').defaultNow().notNull(),
  unsubscribedAt: timestamp('unsubscribed_at'),
  isActive: boolean('is_active').default(true).notNull(),
});
