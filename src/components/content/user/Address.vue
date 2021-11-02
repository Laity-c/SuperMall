<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center">收货地址</div>
    </nav-bar>
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      area-placeholder
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import { Toast } from "vant";

import NavBar from "../../common/navbar/NavBar.vue";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      areaList: {
        province_list: {
          110000: "北京市",
          120000: "天津市",
          130000: "湖南省",
        },
        city_list: {
          110100: "北京市",
          120100: "天津市",
          130100: "衡阳市",
          130200: "长沙市",
        },
        county_list: {
          110101: "东城区",
          110102: "西城区",
          130101: "珠晖区",
          130102: "石鼓区",
          130103: "雁峰区",
          130104: "蒸湘区",
          130105: "衡南县",
          130201: "长沙县",
          130202: "芙蓉区",
        },
      },
      searchResult: [],
    };
  },
  methods: {
    backClick() {
      //返回页面
      this.$router.back();
    },
    onSave() {
      Toast("save");
    },
    onDelete() {
      Toast("delete");
    },
    onChangeDetail(val) {
      if (val) {
        // console.log(this.searchResult);
        this.searchResult = [
          {
            name: "湖南财经工业职业技术学院",
            address: "衡阳市珠晖区",
          },
        ];
      } else {
        // console.log(this.searchResult);
        this.searchResult = [];
      }
    },
  },
};
</script>

<style scoped>
.nav-bar {
  text-align: center;
  background-color: #fff;
  /* background-color: #70a1ff; */
  /* background-color: rgba(0, 0, 0, 0); */
  /* color: #fff; */
}

.back {
  text-align: center;
}
.back img {
  margin-top: 10px;
}
</style>