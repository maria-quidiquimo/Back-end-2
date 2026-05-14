-- Script do banco da Academia
CREATE DATABASE IF NOT EXISTS academia_db;
USE academia_db;

CREATE TABLE IF NOT EXISTS treino (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_aluno VARCHAR(100) NOT NULL,
    instrutor VARCHAR(100) NOT NULL,
    grupo_muscular VARCHAR(50) NOT NULL,
    frequencia_semanal INT NOT NULL CHECK (frequencia_semanal >= 1 AND frequencia_semanal <= 7),
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO treino (nome_aluno, instrutor, grupo_muscular, frequencia_semanal, ativo) VALUES 
('Lucas Pereira', 'Renato Souza', 'Peito e Tríceps', 3, true),
('Mariana Lima', 'Carla Dias', 'Pernas e Glúteos', 4, true),
('Felipe Gomes', 'Renato Souza', 'Costas e Bíceps', 2, false);
