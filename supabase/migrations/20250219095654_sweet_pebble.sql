/*
  # Add notification trigger for form submissions

  1. Changes
    - Creates a trigger function to send notifications
    - Adds a trigger to call the Edge Function on form submission
*/

-- Create the notification trigger function
CREATE OR REPLACE FUNCTION notify_form_submission()
RETURNS TRIGGER AS $$
BEGIN
  -- Call the Edge Function
  PERFORM net.http_post(
    url := current_setting('supabase_functions_endpoint') || '/send-notification',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('supabase_service_role_key')
    ),
    body := jsonb_build_object('record', row_to_json(NEW))
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
DROP TRIGGER IF EXISTS trigger_form_notification ON form_submissions;
CREATE TRIGGER trigger_form_notification
  AFTER INSERT ON form_submissions
  FOR EACH ROW
  EXECUTE FUNCTION notify_form_submission();