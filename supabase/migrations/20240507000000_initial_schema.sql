-- XIDIGIS Platform Initial Schema Migration
-- Created: 2024-05-07

-- Enable PostGIS for geographic data
CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. Regions
CREATE TABLE IF NOT EXISTS regions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    code TEXT UNIQUE,
    type TEXT, -- admin0, admin1, etc.
    parent_id UUID REFERENCES regions(id),
    geometry GEOMETRY(Geometry, 4326),
    centroid GEOMETRY(Point, 4326),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Sources
CREATE TABLE IF NOT EXISTS sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    url TEXT,
    description TEXT,
    data_type TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Observations
CREATE TABLE IF NOT EXISTS observations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    region_id UUID REFERENCES regions(id) ON DELETE CASCADE,
    source_id UUID REFERENCES sources(id) ON DELETE SET NULL,
    variable TEXT NOT NULL,
    value NUMERIC NOT NULL,
    observed_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Indices
CREATE TABLE IF NOT EXISTS indices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    region_id UUID REFERENCES regions(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    value NUMERIC NOT NULL,
    calculated_at TIMESTAMPTZ DEFAULT now(),
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Alerts
CREATE TABLE IF NOT EXISTS alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    region_id UUID REFERENCES regions(id) ON DELETE CASCADE,
    severity TEXT CHECK (severity IN ('Low', 'Moderate', 'High', 'Severe', 'Critical')),
    message TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT now(),
    expires_at TIMESTAMPTZ
);

-- 6. Users (Public profiles linked to auth.users)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT UNIQUE,
    role TEXT DEFAULT 'viewer',
    organization TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Publications (Ensuring existence if not already created)
-- Note: Existing table 'publications' already exists in some projects, 
-- but we define it here for completeness if it's missing.
CREATE TABLE IF NOT EXISTS publications (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    abstract TEXT,
    summary TEXT,
    category TEXT,
    theme TEXT,
    region TEXT,
    type TEXT,
    author TEXT,
    date TEXT,
    data_sources TEXT[],
    methodology TEXT,
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE observations ENABLE ROW LEVEL SECURITY;
ALTER TABLE indices ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;

-- Basic Read Policies
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Read Access' AND tablename = 'regions') THEN
        CREATE POLICY "Public Read Access" ON regions FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Read Access' AND tablename = 'sources') THEN
        CREATE POLICY "Public Read Access" ON sources FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Read Access' AND tablename = 'observations') THEN
        CREATE POLICY "Public Read Access" ON observations FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Read Access' AND tablename = 'indices') THEN
        CREATE POLICY "Public Read Access" ON indices FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Read Access' AND tablename = 'alerts') THEN
        CREATE POLICY "Public Read Access" ON alerts FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Read Access' AND tablename = 'users') THEN
        CREATE POLICY "Public Read Access" ON users FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Read Access' AND tablename = 'publications') THEN
        CREATE POLICY "Public Read Access" ON publications FOR SELECT USING (true);
    END IF;
END $$;
