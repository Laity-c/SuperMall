<template>
  <div>
    <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
      <div class="info-header">
        <div class="header-evaluate">用户评价</div>
        <div class="header-more">更多</div>
      </div>
      <div class="info.user">
        <div class="user-avatar">
          <img :src="commentInfo.user.avatar" alt="" />
          <span>{{ commentInfo.user.uname }}</span>
        </div>
        <div class="info-detail">
          <p>{{ commentInfo.content }}</p>
          <div class="info-other">
            <span class="info-created">{{
              commentInfo.created | showDate(commentInfo.created)
            }}</span>
            <span>{{ commentInfo.style }}</span>
          </div>
          <div class="info-imgs" v-if="commentInfo.images">
            <img
              :src="item"
              alt=""
              v-for="(item, index) in commentInfo.images"
              :key="index"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="zwpl">暂无评论</div>
  </div>
</template>

<script>
import { formatDate } from "common/utils";
export default {
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  //   过滤器
  filters: {
    showDate(value) {
      //1.将时间转换为date对象
      const date = new Date(value * 1000);
      //2.将date进行格式化
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
};
</script>

<style scoped>
.comment-info {
  padding: 20px 15px;
  border-bottom: 5px solid var(--border-color);
}
.info-header {
  padding: 10px;
  border-bottom: 1px solid var(--border-color);
}
.user-avatar {
  padding: 10px;
}
.user-avatar img {
  width: 45px;
  height: 45px;
  margin-right: 15px;
  vertical-align: middle;
}
.info-header {
  position: relative;
  height: 40px;
}
.header-evaluate {
  float: left;
}
.header-more {
  margin-right: 10px;
  float: right;
}
.header-more::before {
  content: "";
  position: absolute;
  right: -3px;
  top: 9px;
  width: 14px;
  height: 21px;
  background-image: url("~assets/img/common/back.svg");
  transform: rotate(182deg);
}
.info-detail {
  padding: 10px;
  font-size: 14px;
  line-height: 22px;
}
.info-other {
  margin-top: 8px;
}
.info-created {
  margin-right: 10px;
}
.info-imgs img {
  margin-right: 3px;
  width: 85px;
  height: 85px;
}

.zwpl {
  padding: 20px;
  text-align: center;
}
</style>