import { request } from "./request";

export function getDetail(iid) {
  return request({
    url: "/api/m5/detail",
    params: {
      iid,
    },
  });
}

export function getComment() {
  return request({
    url: "/api/m5/recommend",
  });
}

//当我们请求数据时，发现我们需要的数据在很多个属性里面。那么如果我们一个一个取的话就太浪费时间了
// 所以我们需要把这些属性都整合到一个对象里面去
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.discountBcolor = itemInfo.discountBgColor;
    this.desc = itemInfo.desc;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice;
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}

export class GoodsParam {
  constructor(info, rule) {
    //   注：images可能没有值（某些商品有值，某些没有）
    this.image = info.images ? info.images[0] : "";
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
