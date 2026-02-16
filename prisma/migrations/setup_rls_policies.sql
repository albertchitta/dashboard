-- Enable Row Level Security on dashboards table
ALTER TABLE dashboards ENABLE ROW LEVEL SECURITY;

-- Grant usage on the sequence to authenticated users
GRANT USAGE ON SEQUENCE dashboards_id_seq TO authenticated;

-- Policy: Allow authenticated users to view their own dashboards
CREATE POLICY "Users can view their own dashboards"
ON dashboards
FOR SELECT
TO authenticated
USING (auth.uid()::text = "userId");

-- Policy: Allow authenticated users to insert their own dashboards
CREATE POLICY "Users can insert their own dashboards"
ON dashboards
FOR INSERT
TO authenticated
WITH CHECK (auth.uid()::text = "userId");

-- Policy: Allow authenticated users to update their own dashboards
CREATE POLICY "Users can update their own dashboards"
ON dashboards
FOR UPDATE
TO authenticated
USING (auth.uid()::text = "userId")
WITH CHECK (auth.uid()::text = "userId");

-- Policy: Allow authenticated users to delete their own dashboards
CREATE POLICY "Users can delete their own dashboards"
ON dashboards
FOR DELETE
TO authenticated
USING (auth.uid()::text = "userId");

-- Grant necessary permissions to authenticated role
GRANT ALL ON dashboards TO authenticated;
