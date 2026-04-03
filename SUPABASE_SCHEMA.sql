-- Run this in your Supabase SQL Editor
-- Go to: supabase.com → your project → SQL Editor → New Query

-- 1. Create the watchlist table
create table watchlist (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  ticker text not null,
  company_name text not null,
  sector text,
  verdict text,
  rating text,
  growth_score int,
  value_score int,
  momentum_score int,
  risk_score int,
  summary text,
  saved_at timestamptz default now()
);

-- 2. Enable Row Level Security (users can only see their own data)
alter table watchlist enable row level security;

-- 3. Policy: users can only read/write their own rows
create policy "Users manage own watchlist"
  on watchlist for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
