/*
  # Fix Security Issues - Part 1: Add Missing Indexes on Foreign Keys

  1. Changes
    - Add index on articles.category_id
    - Add index on form_submissions.service_area_id
    - Add index on moderation_logs.admin_id
    - Add index on notification_queue.submission_id
    - Add index on review_responses.admin_id
    
  2. Purpose
    - Improve query performance for foreign key lookups
    - Prevent suboptimal query execution plans
    - Optimize JOIN operations
*/

-- Add index on articles.category_id foreign key
CREATE INDEX IF NOT EXISTS idx_articles_category_id 
ON articles(category_id);

-- Add index on form_submissions.service_area_id foreign key
CREATE INDEX IF NOT EXISTS idx_form_submissions_service_area_id 
ON form_submissions(service_area_id);

-- Add index on moderation_logs.admin_id foreign key
CREATE INDEX IF NOT EXISTS idx_moderation_logs_admin_id 
ON moderation_logs(admin_id);

-- Add index on notification_queue.submission_id foreign key
CREATE INDEX IF NOT EXISTS idx_notification_queue_submission_id 
ON notification_queue(submission_id);

-- Add index on review_responses.admin_id foreign key
CREATE INDEX IF NOT EXISTS idx_review_responses_admin_id 
ON review_responses(admin_id);
