-- =========================================================
-- UniBus — Schema PostgreSQL (Supabase)
-- Reconstruído a partir das queries usadas no backend (MySQL -> Postgres)
-- Rode este script inteiro no SQL Editor do Supabase.
-- =========================================================

-- Extensão útil (opcional, mas comum em projetos Supabase)
create extension if not exists pgcrypto;

-- =========================
-- USUARIO
-- =========================
create table usuario (
    id          integer generated always as identity primary key,
    nome        varchar(150) not null,
    email       varchar(150) not null unique,
    senha       varchar(255) not null, -- hash (bcrypt)
    tipo        varchar(20) not null check (tipo in ('estudante', 'motorista', 'admin')),
    criado_em   timestamptz not null default now()
);

-- =========================
-- ROTA
-- =========================
create table rota (
    id                integer generated always as identity primary key,
    nome              varchar(150) not null,
    origem            varchar(150) not null,
    destino            varchar(150) not null,
    horario_saida     time not null,
    horario_retorno   time not null
);

-- =========================
-- PONTO_ROTA
-- =========================
create table ponto_rota (
    id         integer generated always as identity primary key,
    rota_id    integer not null references rota(id) on delete cascade,
    nome       varchar(150) not null,
    latitude   double precision not null,
    longitude  double precision not null
);

-- =========================
-- ONIBUS
-- =========================
create table onibus (
    id           integer generated always as identity primary key,
    numero       varchar(20) not null,
    placa        varchar(15) not null,
    capacidade   integer not null,
    rota_id      integer references rota(id) on delete set null
);

-- =========================
-- MOTORISTA
-- =========================
create table motorista (
    id           integer generated always as identity primary key,
    nome         varchar(150) not null,
    foto         varchar(255),
    telefone     varchar(20),
    cnh          varchar(20),
    usuario_id   integer references usuario(id) on delete cascade
);

-- =========================
-- VIAGEM
-- (status observado no código: 'ativa' | 'finalizada')
-- =========================
create table viagem (
    id             integer generated always as identity primary key,
    data           date not null,
    onibus_id      integer references onibus(id) on delete set null,
    rota_id        integer references rota(id) on delete set null,
    motorista_id   integer references motorista(id) on delete set null,
    status         varchar(20) not null default 'ativa'
);

-- =========================
-- ESTUDANTE
-- (viagem_id é referenciado em perfilEstudante — mantém vínculo do estudante à viagem atual)
-- =========================
create table estudante (
    id           integer generated always as identity primary key,
    nome         varchar(150) not null,
    foto         varchar(255),
    faculdade    varchar(150),
    curso        varchar(150),
    telefone     varchar(20),
    usuario_id   integer references usuario(id) on delete cascade,
    viagem_id    integer references viagem(id) on delete set null
);

-- =========================
-- PRESENCA (confirmação de presença do estudante para a viagem)
-- =========================
create table presenca (
    id            integer generated always as identity primary key,
    estudante_id  integer not null references estudante(id) on delete cascade,
    viagem_id     integer not null references viagem(id) on delete cascade,
    vai           boolean default false,
    volta         boolean default false
);

-- =========================
-- EMBARQUE (registro de embarque efetivo)
-- =========================
create table embarque (
    id            integer generated always as identity primary key,
    estudante_id  integer not null references estudante(id) on delete cascade,
    viagem_id     integer not null references viagem(id) on delete cascade,
    embarcou      boolean default false
);

-- =========================
-- PASSAGEIRO_VIAGEM
-- (tabela paralela a presenca/embarque, usada no dashboard/controle do motorista —
--  mantida por já existir no código; avalie se não é redundante com presenca+embarque)
-- =========================
create table passageiro_viagem (
    id            integer generated always as identity primary key,
    viagem_id     integer not null references viagem(id) on delete cascade,
    estudante_id  integer not null references estudante(id) on delete cascade,
    vai           boolean default false,
    volta         boolean default false,
    embarcado     boolean default false
);

-- =========================
-- LOCALIZACAO_ONIBUS
-- =========================
create table localizacao_onibus (
    id          integer generated always as identity primary key,
    onibus_id   integer not null references onibus(id) on delete cascade,
    latitude    double precision not null,
    longitude   double precision not null,
    criado_em   timestamptz not null default now()
);

-- =========================
-- CHAMADO
-- =========================
create table chamado (
    id            integer generated always as identity primary key,
    estudante_id  integer not null references estudante(id) on delete cascade,
    viagem_id     integer references viagem(id) on delete set null,
    mensagem      text not null,
    status        varchar(30) not null default 'Pendente',
    criado_em     timestamptz not null default now()
);

-- =========================
-- MENSAGEM (chat vinculado a um chamado)
-- =========================
create table mensagem (
    id           integer generated always as identity primary key,
    chamado_id   integer not null references chamado(id) on delete cascade,
    remetente    varchar(30) not null, -- ex.: 'estudante' | 'motorista'
    mensagem     text not null,
    criado_em    timestamptz not null default now()
);

-- =========================
-- Índices úteis
-- =========================
create index idx_estudante_usuario on estudante(usuario_id);
create index idx_motorista_usuario on motorista(usuario_id);
create index idx_viagem_status on viagem(status);
create index idx_presenca_viagem on presenca(viagem_id);
create index idx_embarque_viagem on embarque(viagem_id);
create index idx_passageiro_viagem on passageiro_viagem(viagem_id);
create index idx_localizacao_onibus on localizacao_onibus(onibus_id);
create index idx_chamado_estudante on chamado(estudante_id);
create index idx_mensagem_chamado on mensagem(chamado_id);
