CREATE DATABASE IF NOT EXISTS sabordigital_b;
USE sabordigital_b;

-- Criação da tabela produto
CREATE TABLE IF NOT EXISTS produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    disponivel BOOLEAN NOT NULL
);

select * from produto;

alter table produto add column imagem varchar(255);
