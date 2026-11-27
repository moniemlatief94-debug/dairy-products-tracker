-- الصق هذا الملف في Supabase > SQL Editor ثم Run
create table if not exists products (
  id bigint generated always as identity primary key,
  name text not null,
  type text,
  qty numeric,
  unit text,
  produced_on date,
  expires_on date,
  created_at timestamptz not null default now()
);

create table if not exists trucks (
  id bigint generated always as identity primary key,
  plate text not null,
  driver text,
  temperature numeric,
  seal_no text,
  created_at timestamptz not null default now()
);

create table if not exists sales (
  id bigint generated always as identity primary key,
  sold_on date not null default current_date,
  customer text,
  product_id bigint references products(id) on delete set null,
  truck_id bigint references trucks(id) on delete set null,
  qty numeric,
  price numeric,
  created_at timestamptz not null default now()
);

-- فريق واحد: كل مستخدم مسجّل يقرأ ويكتب كل البيانات، وغير المسجّل لا يرى شيئاً
alter table products enable row level security;
alter table trucks   enable row level security;
alter table sales    enable row level security;

create policy "team access" on products for all to authenticated using (true) with check (true);
create policy "team access" on trucks   for all to authenticated using (true) with check (true);
create policy "team access" on sales    for all to authenticated using (true) with check (true);
