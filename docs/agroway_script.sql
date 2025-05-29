
create database agroway default character set utf8 default collate utf8_general_ci;
use agroway;

create table usuario (
id int not null auto_increment primary key,
nome varchar(100) not null,
email varchar(100) not null,
password varchar(255) not null,
status enum('ativo', 'inativo', 'pendente', 'banido') not null default 'ativo',
id_funcao int not null default 1,
data_criacao timestamp default current_timestamp,
data_atualizacao timestamp default current_timestamp,
foreign key(id_funcao) references funcao(id)
) Engine=InnoDB default charset=utf8;

create table funcao (
id int not null auto_increment primary key,
nome varchar(100) not null unique
)Engine=InnoDB default charset=utf8;

insert into usuario (nome, email, password, status, id_funcao) 
values
("Celson", "celson@gmail.com", "11111111", "ativo", 1), 
("Márcio", "marcion@gmail.com", "22222222", "ativo", 2), 
("Pedro", "pedro@gmail.com", "333", "ativo", 3);

insert into funcao (nome) 
values
("cliente"), 
("motorista"), 
("produtor");

select * from usuario;

select
    u.id,
    u.nome as nome_usuario,
    u.email,
    u.status,
    u.data_criacao,
    u.data_atualizacao,
    f.nome as nome_funcao
from
    usuario as u
inner join 
    funcao as f ON u.id_funcao = f.id;


