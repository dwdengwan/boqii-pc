SET NAMES UTF8;
DROP DATABASE IF EXISTS boqii;
CREATE DATABASE boqii CHARSET=UTF8;
USE boqii;

-- 用户
CREATE TABLE boqii_user(
  u_id INT PRIMARY KEY AUTO_INCREMENT,
  uphone CHAR(11) NOT NULL,
  upwd VARCHAR(20) NOT NULL,
  uname VARCHAR(20) NOT NULL
);

-- 添加用户的原始信息
INSERT INTO boqii_user VALUES
(NULL,"18874556958","123456","dingding"),
(NULL,"18596325863","abc123","dangdang");

--index_lunbotu创建轮播图表
-- CREATE TABLE boqii_index_lunbotu(
--   pid INT PRIMARY KEY AUTO_INCREMENT,
--   url VARCHAR(64)
-- );

-- 添加轮播图表的原始信息
-- INSERT INTO boqii_index_lunbotu values
-- (null,"http://127.0.0.1/img/index/shoppicpath1501209373.jpg"),
-- (null,"http://127.0.0.1/img/index/shoppicpath1543286172.jpg"),
-- (null,"http://127.0.0.1/img/index/shoppicpath1544509744.jpg"),
-- (null,"http://127.0.0.1/img/index/shoppicpath1544509744.jpg");

-- 创建index 轮播图下的图表
CREATE TABLE index_page(
  id INT PRIMARY KEY AUTO_INCREMENT,
  img_url VARCHAR(64)
);

-- 向index轮播图表插入数据
INSERT INTO index_page VALUES
(NULL,"img/index/index_page1.jpg"),
(NULL,"img/index/index_page2.jpg"),
(NULL,"img/index/index_page3.jpg");

-- list2 列表页
CREATE TABLE list2_lby (
  id INT PRIMARY KEY AUTO_INCREMENT,
  img_url VARCHAR(64),
  price1 DECIMAL(10,2),
  price2 DECIMAL(10,2),
  title VARCHAR(255),
  subtitle VARCHAR(255),
  num1 INT,
  num2 INT
);

-- 向list2列表页插入数据
INSERT INTO list2_lby VALUES
(NULL,"img/list2/list2_list1.jpg",63.9,34.95,"打了卡时间段来看","12.24-12.22加速度计好地方",8752,5814),
(NULL,"img/list2/list2_list2.jpg",73.9,34.95,"打了卡时间段来看","12.24-12.22加速度计好地方",8045,5824),
(NULL,"img/list2/list2_list3.jpg",83.9,38.95,"打了卡时间段来看","12.24-12.22加速度计好地方",8000,5784),
(NULL,"img/list2/list2_list4.jpg",93.9,41.95,"打了卡时间段来看","12.24-12.22加速度计好地方",8424,5874),
(NULL,"img/list2/list2_list5.jpg",63.9,51.95,"打了卡时间段来看","12.24-12.22加速度计好地方",8963,5874),
(NULL,"img/list2/list2_list6.jpg",73.9,31.95,"打了卡时间段来看","12.24-12.22加速度计好地方",8780,5874),
(NULL,"img/list2/list2_list7.jpg",53.9,11.95,"打了卡时间段来看","12.24-12.22加速度计好地方",8780,5874),
(NULL,"img/list2/list2_list8.jpg",43.9,41.95,"打了卡时间段来看","12.24-12.22加速度计好地方",8540,5874),
(NULL,"img/list2/list2_list1.jpg",33.9,71.95,"打了卡时间段来看","12.24-12.22加速度计好地方",8200,5874),
(NULL,"img/list2/list2_list2.jpg",83.9,37.95,"打了卡时间段来看","12.24-12.22加速度计好地方",8002,5874),
(NULL,"img/list2/list2_list3.jpg",65.9,34.95,"打了卡时间段来看","12.24-12.22加速度计好地方",8020,5874),
(NULL,"img/list2/list2_list4.jpg",64.9,38.95,"打了卡时间段来看","12.24-12.22加速度计好地方",8200,5874);

-- list2 热卖
CREATE TABLE list2_rm(
  id INT PRIMARY KEY AUTO_INCREMENT,
  img_url VARCHAR(64),
  price DECIMAL(10,2),
  num INT,
  title VARCHAR(255)
);

--list2 热卖商品添加数据
INSERT INTO list2_rm VALUES
(NULL,"img/list2/list2_rm1.jpg",49.50,88995,"小宠EHD犬猫肠胃宝益生菌10包,调理肠胃促消化..."),
(NULL,"img/list2/list2_rm2.jpg",59.50,88895,"小宠EHD犬猫肠胃宝益生菌10包,调理肠胃促消化..."),
(NULL,"img/list2/list2_rm3.jpg",48.50,75995,"小宠EHD犬猫肠胃宝益生菌10包,调理肠胃促消化..."),
(NULL,"img/list2/list2_rm1.jpg",65.50,68995,"小宠EHD犬猫肠胃宝益生菌10包,调理肠胃促消化..."),
(NULL,"img/list2/list2_rm2.jpg",46.50,87995,"小宠EHD犬猫肠胃宝益生菌10包,调理肠胃促消化..."),
(NULL,"img/list2/list2_rm3.jpg",78.50,33995,"小宠EHD犬猫肠胃宝益生菌10包,调理肠胃促消化..."),
(NULL,"img/list2/list2_rm1.jpg",60.50,95995,"小宠EHD犬猫肠胃宝益生菌10包,调理肠胃促消化...");

-- list2 品牌推荐
CREATE TABLE list2_pptj(
  id INT PRIMARY KEY AUTO_INCREMENT,
  img_url VARCHAR(64)
);

-- 向品牌推荐插入数据
INSERT INTO list2_pptj VALUES
(NULL,"img/list2/list2_pptj1.jpg"),
(NULL,"img/list2/list2_pptj2.jpg"),
(NULL,"img/list2/list2_pptj3.jpg"),
(NULL,"img/list2/list2_pptj4.jpg"),
(NULL,"img/list2/list2_pptj5.jpg"),
(NULL,"img/list2/list2_pptj6.jpg");

-- list列表 狗狗推荐
CREATE TABLE list_ggtj(
  id INT PRIMARY KEY AUTO_INCREMENT,
  img_url VARCHAR(64),
  title VARCHAR(255),
  price DECIMAL(10,2),
  num INT
);

-- 向狗狗推荐表插入数据
INSERT INTO list_ggtj VALUES
(NULL,"img/list/list_first1.jpg","小山羊奶粉450g,适用于幼犬,对幼犬身体棒棒哒",78.50,5896),
(NULL,"img/list/list_first2.jpg","小小山羊奶粉250g,适用于幼犬,对幼犬身体棒棒哒",69.50,3441),
(NULL,"img/list/list_first3.jpg","中山羊奶粉550g,适用于幼犬,对幼犬身体棒棒哒",55.50,6745),
(NULL,"img/list/list_first4.jpg","中中山羊奶粉650g,适用于幼犬,对幼犬身体棒棒哒",88.50,5896),
(NULL,"img/list/list_first5.jpg","大山羊奶粉750g,适用于幼犬,对幼犬身体棒棒哒",63.50,4521),
(NULL,"img/list/list_first1.jpg","大大山羊奶粉250g,适用于幼犬,对幼犬身体棒棒哒",55.50,3654),
(NULL,"img/list/list_first2.jpg","大大小山羊奶粉950g,适用于幼犬,对幼犬身体棒棒哒",33.50,2654),
(NULL,"img/list/list_first3.jpg","小小大山羊奶粉450g,适用于幼犬,对幼犬身体棒棒哒",77.50,4782),
(NULL,"img/list/list_first4.jpg","山羊奶粉550g,适用于幼犬,对幼犬身体棒棒哒",88.50,5686),
(NULL,"img/list/list_first5.jpg","山羊奶粉350g,适用于幼犬,对幼犬身体棒棒哒",55.50,5586);

-- 创建details 同类推荐
CREATE TABLE details_tltj(
  id INT PRIMARY KEY AUTO_INCREMENT,
  img_url VARCHAR(64),
  price DECIMAL(10,2),
  num INT,
  title VARCHAR(255)
);

-- 往同类推荐表插入数据
INSERT INTO details_tltj VALUES
(NULL,"img/details/details_tltj1.jpg",89.50,4785,"巴西小小淘淘 力派系列大小中型犬幼犬粮2.5kg 进口狗粮"),
(NULL,"img/details/details_tltj2.jpg",99.50,4624,"巴西小众淘淘 力派系列大小型犬幼犬粮2.8kg 进口狗粮"),
(NULL,"img/details/details_tltj3.jpg",189.50,4563,"巴西小大淘淘 力派系列小大型犬幼犬粮2.9kg 进口狗粮"),
(NULL,"img/details/details_tltj4.jpg",79.50,3358,"巴西大大淘淘 力派系列小中型犬幼犬粮2.2kg 进口狗粮"),
(NULL,"img/details/details_tltj5.jpg",69.50,4852,"巴西大小淘淘 力派系列小小型犬幼犬粮2.5kg 进口狗粮");