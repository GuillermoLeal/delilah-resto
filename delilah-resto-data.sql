INSERT INTO `delilah-resto`.order_products (id,orderId,productId,amount,price) VALUES
	 (1,2,1,2,2.5),
	 (2,2,2,1,8.5);INSERT INTO `delilah-resto`.orders (id,description,`date`,stateId,paymentId,userId) VALUES
	 (2,'2xHelado 1xHamburguesa ','2021-07-31 21:09:52',1,1,2);INSERT INTO `delilah-resto`.payments (id,name) VALUES
	 (1,'Efectivo'),
	 (2,'Tarjeta');INSERT INTO `delilah-resto`.products (id,image,name,price) VALUES
	 (1,'https://www.supersoftitalia.com/wp-content/uploads/2020/01/SOFTAREQUIPE.png','Helado',2.5),
	 (2,'https://gourmetdemexico.com.mx/wp-content/uploads/2021/05/dia-de-la-hamburguesa.jpg','Hamburguesa',8.5),
	 (3,'https://www.hola.com/imagenes/cocina/noticiaslibros/20210209183991/dia-mundial-pizza-recetas/0-917-728/dia-pizza-m.jpg','pizza',5.0);INSERT INTO `delilah-resto`.roles (id,name) VALUES
	 (1,'ROLE_ADMIN'),
	 (2,'ROLE_USER');INSERT INTO `delilah-resto`.states (id,name) VALUES
	 (2,'CONFIRMADO'),
	 (5,'ENTREGADO'),
	 (4,'ENVIADO'),
	 (1,'NUEVO'),
	 (3,'PREPARADO');INSERT INTO `delilah-resto`.users (id,username,fullname,email,password,phone,address,roleId,createdAt,updatedAt) VALUES
	 (1,'admin','Administrador','admin@gmail.com','$2b$10$doOXvTTtpM5TQ.1CLxVNHu88fcxvLM79fXxn10aP1EnYx2SlLTAxO','3004906899','Bogotá, Colombia',1,'2021-07-31 20:58:36','2021-07-31 20:58:36'),
	 (2,'usertest','John Doe','user@gmail.com','$2b$10$affdg8bfGgvqULU5/qPMS.P8jx.pQaBtJKMUhubRLRxBAwTFHATnC','3004906899','Bogotá, Colombia',2,'2021-07-31 20:59:22','2021-07-31 20:59:22');