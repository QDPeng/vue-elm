var config = require('../config/index')
var express = require('express');
var path = require('path');
var app = express();
var webpackConfig = require('../config/webpack.prod.conf')
var webpack = require('webpack')

//serve pure static assets
var staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory)
//设置静态访问目录，所有dist/static文件都映射到D:\web-project\VueInAndroid\dist\static目录下
app.use(staticPath, express.static(path.resolve(__dirname, '../dist/static')))

// console.log(config.build.assetsPublicPath+ '/'+config.build.assetsSubDirectory)
// console.log('staticPath:' + staticPath)///dist/static
// console.log('path:'+path.resolve(__dirname, '../dist'))//D:\web-project\VueInAndroid\dist

// var compiler = webpack(webpackConfig)
// var devMiddleware = require('webpack-dev-middleware')(compiler, {
//     publicPath: config.build.assetsPublicPath,
//     stats: {
//         colors: true,
//         chunks: false
//     }
// })
// // serve webpack bundle output
// app.use(devMiddleware)
var ejs = require('ejs') //使用ejs模板引擎来渲染html静态页面
app.set('views', path.resolve(__dirname, '../dist')) //模板保存目录
app.engine('.html',ejs.__express)
app.set('view engine','html')
//利用模板文件渲染为html
app.get("/", function(req, res) {
    res.render('index');
});


app.get('/v1/cities',function(req,res){
	var home = require('../testdata/home')
	var type = req.query.type;
	if(type == 'guess'){
		res.json(home.guesscity);//获取首页默认地址
	}else if(type == 'hot'){
		res.json(home.hotcity);//首页热门城市
	}else if(type == 'group'){
		res.json(home.groupcity);//首页所有城市
	}else{
		res.json('');
	}
	console.log('首页城市')

})

app.get('/v1/user',function(req,res){
	var login = require('../testdata/login')
	res.json(login.userInfo);
})

app.get('/v1/users/:userId/addresses',function(req,res){
	console.log('addresses' + req.params.userId)
	var addressPart = require('../testdata/address')
	res.json(addressPart.address);
})

//获取当前所在城市
app.get('/v1/cities/:cityId',function(req,res){
	var city = require('../testdata/city')
	res.json(city.currentcity);
	console.log('获取当前所在城市cityId:' + req.params.cityId)
	
})
//获取搜索地址
app.get('/v1/pois',function(req,res){
	console.log("获取搜索地址query:" + req.query)
	var type = req.query.type;
	if(type == 'nearby'){
		var confirm = require('../testdata/confirm')
		res.json(confirm.searchAddress);
	}else{
		var city = require('../testdata/city')
		res.json(city.searchdata);
	}
	
	
})
//获取msite页面地址信息
app.get('/v2/pois/:geoHash',function(req,res){
	console.log("获取msite页面地址信息geoHash:" + req.params.geoHash)
	var msite = require('../testdata/msite')
	res.json(msite.msiteAdress);
})
//获取msite页面食品分类列表
app.get('/v2/index_entry',function(req,res){
	console.log("query:" + req.query)
	var msite = require('../testdata/msite')
	res.json(msite.foodTypes);
})
//获取msite商铺列表
app.get('/shopping/restaurants',function(req,res){
	console.log("query:" + req.query)
	var msite = require('../testdata/msite')
	res.json(msite.shopList);
})
//获取search页面搜索结果
app.get('/v4/restaurants',function(req,res){
	console.log("query:" + req.query)
	var search = require('../testdata/search')
	res.json(search.searchData);
})
//获取food页面的 category 种类列表
app.get('/shopping/v2/restaurant/category',function(req,res){
	console.log("query:" + req.query)
	var food = require('../testdata/food')
	res.json(food.category);
})
//获取food页面的配送方式
app.get('/shopping/v1/restaurants/delivery_modes',function(req,res){
	console.log("query:" + req.query)
	var food = require('../testdata/food')
	res.json(food.delivery);
})
//获取food页面的商家属性活动列表
app.get('/shopping/v1/restaurants/activity_attributes',function(req,res){
	console.log("query:" + req.query)
	var food = require('../testdata/food')
	res.json(food.activity);
})
//获取shop页面商铺详情
app.get('/shopping/restaurant/:shopId',function(req,res){
	console.log("shopId:" + req.params.shopId + ',query:' + req.query)
	var shop = require('../testdata/shop')
	res.json(shop.shopDetails);
})
//获取food页面的商家属性活动列表
app.get('/shopping/v2/menu',function(req,res){
	console.log(',query:' + req.query)
	var shop = require('../testdata/shop')
	res.json(shop.shopMenu);
})
//获取商铺评价列表
app.get('/ugc/v2/restaurants/834828/ratings',function(req,res){
	console.log(',query:' + req.query)
	var shop = require('../testdata/shop')
	res.json(shop.ratingList);
})

//获取商铺评价分数
app.get('/ugc/v2/restaurants/:shopId/ratings/scores',function(req,res){
	console.log(',shopId:' + req.params.shopId)
	var shop = require('../testdata/shop')
	res.json(shop.scores);
})
//获取商铺评价分类
app.get('/ugc/v2/restaurants/:shopId/ratings/tags',function(req,res){
	console.log(',shopId:' + req.params.shopId)
	var shop = require('../testdata/shop')
	res.json(shop.tage);
})
//获取短信验证码
app.post('/v4/mobile/verify_code/send',function(req,res){
	console.log(',query:' + req.query)
	var login = require('../testdata/login')
	res.json(login.validate_token);
})

app.post('/v1/captchas',function(req,res){
	console.log(',query:' + req.query)
	var login = require('../testdata/login')
	res.json(login.cpatchs);
})
//账号密码登陆
app.post('/v2/login',function(req,res){
	console.log('账号密码登陆,query:' + req.query)
	var login = require('../testdata/login')
	res.json(login.userInfo);
})
//检测帐号是否存在
app.get('/v1/users/exists',function(req,res){
	console.log('检测帐号是否存在,query:' + req.query)
	var login = require('../testdata/login')
	res.json(login.checkExsis);
})
//发送帐号
app.post('/v1/mobile/verify_code/send',function(req,res){
	console.log('发送帐号,query:' + req.query)
	var login = require('../testdata/login')
	res.json(login.send);
})
//确认订单
app.post('/v1/carts/checkout',function(req,res){
	console.log('确认订单,query:' + req.query)
	var confirm = require('../testdata/confirm')
	res.json(confirm.checkout);
})
//获取快速备注列表
app.get('/v1/carts/:remarkId/remarks',function(req,res){
	console.log(',remarkId:' + req.params.remarkId)
	var confirm = require('../testdata/confirm')
	res.json(confirm.remark);
})
//获取地址列表
app.get('/v1/carts/:remarkId/addresses',function(req,res){
	console.log(',remarkId:' + req.params.remarkId)
	var confirm = require('../testdata/confirm')
	res.json(confirm.addressList);
})
//添加地址
app.post('/v1/users/:userId/addresses',function(req,res){
	console.log(',userId:' + req.params.userId)
	var confirm = require('../testdata/confirm')
	res.json(confirm.addAddress);
})
//下订单
app.post('/v1/users/:userId/carts/:cartId/orders',function(req,res){
	console.log(',userId:' + req.params.userId + ',cartId:' + req.params.cartId)
	var confirm = require('../testdata/confirm')
	res.json(confirm.palceOrder);
})
//重新发送订单验证码
app.post('/v1/carts/:cartId/verify_code',function(req,res){
	console.log( ',cartId:' + req.params.cartId)
	var confirm = require('../testdata/confirm')
	res.json(confirm.verfiyCode);
})
//验证订单
app.post('/v1/users/:userId/carts/:cartId/orders/validate',function(req,res){
	console.log(',userId:' + req.params.userId + ',cartId:' + req.params.cartId)
	var confirm = require('../testdata/confirm')
	res.json(confirm.orderSuccess);
})

//重新发送订单验证码
app.get('/payapi/payment/queryOrder',function(req,res){
	var confirm = require('../testdata/confirm')
	res.json(confirm.payDetail);
})
//获取服务中心信息
app.get('/m.ele.me@json/profile/explain',function(req,res){
	var service = require('../testdata/service')
	res.json(service.serviceData);
})
//兑换会员卡
app.post('/member/v1/users/:cardId/delivery_card/physical_card/bind',function(req,res){
	console.log(',cartId:' + req.params.cartId)
	var vip = require('../testdata/vip')
	res.json(vip.vipcart);
})
//获取红包数量
app.get('/promotion/v2/users/:id/hongbaos',function(req,res){
	var hongbao = require('../testdata/hongbao')
	res.json(hongbao.dataList);
})
//获取过期红包
app.get('/promotion/v2/users/:id/expired_hongbaos?limit=10&offset=0',function(req,res){
	var hongbao = require('../testdata/hongbao')
	res.json(hongbao.expired);
})
//兑换红包
app.post('/v1/users/:id/hongbao/exchange',function(req,res){
	var hongbao = require('../testdata/hongbao')
	res.json(hongbao.exchange);
})
//手机号登陆
app.post('/v1/login/app_mobile',function(req,res){
	
	var login = require('../testdata/login')
	res.json(login.userInfo);
	console.log('手机号登陆'+login.userInfo)
})
//获取订单列表
app.get('/bos/v2/users/:userId/orders',function(req,res){
	var order = require('../testdata/order')
	res.json(order.orderList);
})
//获取订单详情
app.get('/bos/v1/users/:userId/orders/:orderId/snapshot',function(req,res){
	var order = require('../testdata/order')
	res.json(order.orderDetail);
})
//个人中心里编辑地址
app.get('/v1/users/:userId/addresses',function(req,res){
	var addresspart = require('../testdata/address')
	res.json(addresspart.address);
})
//个人中心里搜索地址
app.get('v1/pois/search',function(req,res){
	var addDetail = require('../testdata/addDetail')
	res.json(addDetail.addData);
})
//删除地址
app.delete('/v1/users/:userId/addresses/:addressid',function(req,res){
	var vip = require('../testdata/vip')
	res.json(vip.vipcart);
})



//===============================
var server = app.listen(config.server.port, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("服務器啟動-访问地址为 http://%s:%s", host, port)
 
})