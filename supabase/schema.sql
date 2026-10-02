create table if not exists centers (
  id text primary key,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists policies (
  id text primary key,
  center_id text not null references centers(id) on delete cascade,
  category text not null,
  title text not null,
  content text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists interactions (
  id text primary key,
  center_id text not null references centers(id) on delete cascade,
  question text not null,
  answer text not null,
  status text not null default 'uncertain' check (status in ('answered','uncertain','escalated')),
  confidence text not null default 'low' check (confidence in ('high','medium','low')),
  operator_note text,
  category text,
  created_at timestamptz not null default now()
);

create table if not exists interaction_sources (
  id text primary key,
  interaction_id text not null references interactions(id) on delete cascade,
  policy_id text not null references policies(id) on delete cascade
);

create table if not exists feedback (
  id text primary key,
  interaction_id text not null references interactions(id) on delete cascade,
  rating integer check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

create index if not exists policies_active_idx on policies(active);
create index if not exists policies_category_idx on policies(category);
create index if not exists interactions_created_idx on interactions(created_at desc);
