-- Run in the chosen Supabase project. Each signed-in user can access only their
-- own room. No public reads or anonymous writes. Coins remain personal points.
create table if not exists public.little_desk_rooms (
  user_id uuid primary key references auth.users(id) on delete cascade,
  room jsonb not null check (jsonb_typeof(room) = 'object' and octet_length(room::text) <= 400000),
  updated_at timestamptz not null default now()
);
alter table public.little_desk_rooms enable row level security;
revoke all on public.little_desk_rooms from anon;
grant select, insert, update, delete on public.little_desk_rooms to authenticated;
drop policy if exists "Own rooms only" on public.little_desk_rooms;
create policy "Own rooms only" on public.little_desk_rooms for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
