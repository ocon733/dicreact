CREATE TABLE IF NOT EXISTS dic_diccionario(
   id int(11) not null AUTO_INCREMENT,
   english varchar(200) not null,
   spain varchar(200) not null,
   descripcion text,
   relmemotec text,
   fonetic varchar(200) not null,
   primary key (id)
)ENGINE=InnoDB;




