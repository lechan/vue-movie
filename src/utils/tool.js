import AV from 'leancloud-storage';
const appId = 'PGw4c4KlYFavFHmw6nOwg3Li';
const appKey = 'XiC1O9I9oNfzcglUwfxt5uEY';
AV.init({
  appId,
  appKey
});

//获取种类编码
const getTabData = (callBack) => {
  let Post = AV.Object.extend('FilmType');
  let post = new Post();
  let query = new AV.Query(Post);
  let listObj = [];
  query.limit(20);
  query.find().then((results) => {
    for (let i = 0; i < results.length; i++) {
      let object = results[i];
      listObj.push(object.attributes);
      listObj[i].id = object.id;
    }
    callBack(listObj);
  }).catch((error) => {
    console.log("Error: " + error.code + " " + error.message);
  });
};

//获取列表数据
const getListData = (className, p, pNum, type, callBack) => {
  let Post = AV.Object.extend(className);
  let post = new Post();
  let query = new AV.Query(Post);
  let listObj = [];
  query.descending('publish_time');
  query.equalTo('type_code', type);
  query.exists('film_imgs');
  query.limit(pNum);
  query.skip((p - 1) * pNum);
  query.find().then((results) => {
    for (let i = 0; i < results.length; i++) {
      let object = results[i];
      listObj.push(object.attributes);
      listObj[i].id = object.id;
    }
    callBack(listObj);
  }).catch((error) => {
    console.log("Error: " + error.code + " " + error.message);
  });
};

//获取详情数据
const getDetailData = (className, id, callBack) => {
  let Post = AV.Object.extend(className);
  let post = new Post();
  let query = new AV.Query(Post);
  let listObj = {};
  query.equalTo('objectId', id);
  query.find().then((results) => {
    listObj = results[0].attributes;
    listObj.id = results[0].id;
    callBack(listObj);
  }).catch((error) => {
    console.log("Error: " + error.code + " " + error.message);
  });
};

//模糊搜索获取列表数据
const searchListData = (className, keyword, p, pNum, callBack) => {
  let Post = AV.Object.extend(className);
  let post = new Post();
  let query = new AV.Query(Post);
  let listObj = [];
  query.descending('publish_time');
  query.exists('film_imgs');
  query.contains('film_name', keyword);
  query.limit(pNum);
  query.skip((p - 1) * pNum);
  query.find().then((results) => {
    for (let i = 0; i < results.length; i++) {
      let object = results[i];
      listObj.push(object.attributes);
      listObj[i].id = object.id;
    }
    callBack(listObj);
  }).catch((error) => {
    console.log("Error: " + error.code + " " + error.message);
  });
};

/**
 * 格式化日期
 * @param {String} nS [时间戳：e.g. 1430370000000]
 * @param {String} Ft [日期格式：默认yyyy-MM-dd hh:mm:ss]
 * @usage
 * formatDate(nS,Ft)
 */
const formatDate = (nS, Ft) => {
  Date.prototype.format = function(fmt){
    var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
  Ft = Ft || "yyyy-MM-dd hh:mm:ss";
  return new Date(parseInt(nS)).format(Ft);
}

export {
  getTabData,
  getListData,
  getDetailData,
  searchListData,
  formatDate
}