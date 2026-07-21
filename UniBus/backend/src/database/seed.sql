-- =========================================================
-- UniBus — Dados de exemplo (seed) para testes
-- Rode DEPOIS do schema_supabase.sql, no SQL Editor do Supabase.
-- Assume as tabelas vazias (os ids abaixo seguem a ordem de inserção).
-- =========================================================

-- Se quiser limpar tudo antes de rodar de novo, descomente:
-- truncate table mensagem, chamado, localizacao_onibus, passageiro_viagem,
--   embarque, presenca, estudante, viagem, motorista, onibus, ponto_rota, rota, usuario
--   restart identity cascade;

-- =========================
-- USUARIOS
-- Senha de teste para todos: "123456"
-- (o login hoje compara texto puro — ver observação de segurança no final)
-- =========================
insert into usuario (nome, email, senha, tipo) values
('Admin UniBus',        'admin@unibus.com',   '123456', 'admin'),
('Carlos Andrade',      'carlos@unibus.com',  '123456', 'motorista'),
('Ana Beatriz Souza',   'ana@unibus.com',     '123456', 'motorista'),
('João Pedro Lima',     'joao@unibus.com',    '123456', 'estudante'),
('Maria Fernanda Costa','maria@unibus.com',   '123456', 'estudante'),
('Pedro Henrique Alves','pedro@unibus.com',   '123456', 'estudante'),
('Beatriz Santos',      'beatriz@unibus.com', '123456', 'estudante'),
('Lucas Gabriel Reis',  'lucas@unibus.com',   '123456', 'estudante');
-- ids: 1 admin, 2 Carlos, 3 Ana, 4 João, 5 Maria, 6 Pedro, 7 Beatriz, 8 Lucas

-- =========================
-- ROTAS
-- =========================
insert into rota (nome, origem, destino, horario_saida, horario_retorno) values
('Uibaí - Irecê (UNEB)',      'Uibaí, BA',      'Irecê, BA',      '06:00', '18:00'),
('Xique-Xique - Irecê (UNEB)','Xique-Xique, BA', 'Irecê, BA',     '05:30', '18:30');
-- ids: 1 Uibaí-Irecê, 2 Xique-Xique-Irecê

-- =========================
-- PONTOS DA ROTA
-- =========================
insert into ponto_rota (rota_id, nome, latitude, longitude) values
(1, 'Terminal Uibaí',        -11.3350, -41.8494),
(1, 'Entrada de Barro Alto', -11.2900, -41.8100),
(1, 'UNEB - Campus Irecê',   -11.3050, -41.8558),
(2, 'Terminal Xique-Xique',  -10.8233, -42.7256),
(2, 'UNEB - Campus Irecê',   -11.3050, -41.8558);

-- =========================
-- MOTORISTAS
-- =========================
insert into motorista (nome, foto, telefone, cnh, usuario_id) values
('Carlos Andrade',    null, '(74) 99911-2233', '01234567890', 2),
('Ana Beatriz Souza', null, '(74) 99822-3344', '09876543210', 3);
-- ids: 1 Carlos, 2 Ana

-- =========================
-- ÔNIBUS
-- =========================
insert into onibus (numero, placa, capacidade, rota_id) values
('01', 'IRC-1A23', 44, 1),
('02', 'IRC-2B45', 40, 2);
-- ids: 1, 2

-- =========================
-- VIAGENS (viagens ativas de hoje)
-- =========================
insert into viagem (data, onibus_id, rota_id, motorista_id, status) values
(current_date, 1, 1, 1, 'ativa'),
(current_date, 2, 2, 2, 'ativa');
-- ids: 1, 2

-- =========================
-- ESTUDANTES (já vinculados à viagem de hoje)
-- =========================
insert into estudante (nome, foto, faculdade, curso, telefone, usuario_id, viagem_id) values
('João Pedro Lima',      null, 'UNEB', 'Engenharia de Software', '(74) 99123-4567', 4, 1),
('Maria Fernanda Costa', null, 'UNEB', 'Administração',          '(74) 99234-5678', 5, 1),
('Pedro Henrique Alves', null, 'UNEB', 'Direito',                '(74) 99345-6789', 6, 1),
('Beatriz Santos',       null, 'UNEB', 'Pedagogia',              '(74) 99456-7890', 7, 2),
('Lucas Gabriel Reis',   null, 'UNEB', 'Ciência da Computação',  '(74) 99567-8901', 8, 2);
-- ids: 1 João, 2 Maria, 3 Pedro, 4 Beatriz, 5 Lucas

-- =========================
-- PRESENÇA (confirmação de ida/volta)
-- =========================
insert into presenca (estudante_id, viagem_id, vai, volta) values
(1, 1, true,  true),
(2, 1, true,  false),
(3, 1, false, true),
(4, 2, true,  true),
(5, 2, true,  true);

-- =========================
-- EMBARQUE (registrado pelo motorista)
-- =========================
insert into embarque (estudante_id, viagem_id, embarcou) values
(1, 1, true),
(2, 1, true),
(3, 1, false),
(4, 2, true),
(5, 2, false);

-- =========================
-- PASSAGEIRO_VIAGEM (estrutura paralela usada no dashboard/controle do motorista)
-- =========================
insert into passageiro_viagem (viagem_id, estudante_id, vai, volta, embarcado) values
(1, 1, true,  true,  true),
(1, 2, true,  false, true),
(1, 3, false, true,  false),
(2, 4, true,  true,  true),
(2, 5, true,  true,  false);

-- =========================
-- LOCALIZAÇÃO DO ÔNIBUS (últimas posições)
-- =========================
insert into localizacao_onibus (onibus_id, latitude, longitude) values
(1, -11.3350, -41.8494),
(1, -11.3180, -41.8320),
(1, -11.3050, -41.8558),
(2, -10.8233, -42.7256),
(2, -11.3050, -41.8558);

-- =========================
-- CHAMADOS + MENSAGENS
-- =========================
insert into chamado (estudante_id, viagem_id, mensagem, status) values
(3, 1, 'Motorista, vou me atrasar uns 5 minutos no ponto de Barro Alto, pode aguardar?', 'Pendente'),
(5, 2, 'Consegue confirmar o horário de volta de hoje?', 'Respondido');
-- ids: 1, 2

insert into mensagem (chamado_id, remetente, mensagem) values
(1, 'estudante',  'Motorista, vou me atrasar uns 5 minutos no ponto de Barro Alto, pode aguardar?'),
(2, 'estudante',  'Consegue confirmar o horário de volta de hoje?'),
(2, 'motorista',  'Confirmado, saída às 18:30 no mesmo ponto.');
