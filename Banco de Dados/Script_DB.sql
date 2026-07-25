USE db_conecta_chat;

CREATE TABLE tbl_usuario (
  id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  numero VARCHAR(45) UNIQUE NOT NULL,
  senha_hash VARCHAR(255) NOT NULL
  );
  
  SHOW tables;


CREATE TABLE tbl_conversa (
  id_conversa INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  data_inicio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE tbl_participantes (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_conversa INT NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES tbl_usuario(id_usuario),
  FOREIGN KEY (id_conversa) REFERENCES tbl_conversa(id_conversa),
  UNIQUE(id_usuario, id_conversa)
  );

CREATE TABLE tbl_mensagem (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_conversa INT NOT NULL,
  id_usuario INT NOT NULL,
  conteudo TEXT NOT NULL,
  data_envio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (id_usuario) 
  REFERENCES tbl_usuario(id_usuario) 
  ON DELETE RESTRICT,
  FOREIGN KEY (id_conversa) 
  REFERENCES tbl_conversa(id_conversa) 
  ON DELETE CASCADE
  );


CREATE TABLE tbl_token (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  expiracao DATETIME NOT NULL,
  usado TINYINT NOT NULL DEFAULT 0,
  criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (id_usuario) REFERENCES tbl_usuario(id_usuario) ON DELETE CASCADE
);

alter table tbl_usuario add imagem text;