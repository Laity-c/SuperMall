<template>
  <div v-if="Object.keys(paramInfo).length !== 0" class="param-info">
    <table
      v-for="(item, index) in paramInfo.sizes"
      :key="index"
      class="info-sizes"
    >
      <tr v-for="(tr, index) in item" :key="index">
        <td v-for="(td, index) in tr" :key="index">{{ td }}</td>
      </tr>
    </table>
    <table class="info-infos">
      <tr v-for="(item, index) in paramInfo.infos" :key="index">
        <td class="infos-key">{{ item.key }}</td>
        <td class="infos-value">{{ item.value }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.param-info {
  padding: 20px 15px;
  font-size: 14px;
  border-bottom: 5px solid var(--border-color);
}

.param-info table {
  width: 100%;
  border-collapse: collapse;
}

.param-info table tr {
  height: 42px;
}

.param-info table tr td {
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}

.infos-key {
  /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
  width: 94px;
}

.infos-value {
  color: var(--color-tint);
}
</style>