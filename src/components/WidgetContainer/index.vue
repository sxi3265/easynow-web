<template>
  <div>
    <div class="toolbar">
      <template v-if="editable">
        <PlusOutlined @click="onAdd" />
        <CloseOutlined @click="onCancel" />
        <CheckOutlined @click="onConfirm" />
      </template>
      <template v-else>
        <EditOutlined @click="onEdit" />
        <RedoOutlined @click="onReload" />
      </template>
    </div>
    <grid-layout
      v-if="showLayout"
      v-model:layout="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="editable"
      :is-resizable="editable"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >
      <grid-item
        :class="editable ? 'editable' : ''"
        v-for="item in layout"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
      >
        {{ item.i }}
      </grid-item>
    </grid-layout>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-property-decorator";
import { GridLayout, GridItem, GridItemData } from "vue-grid-layout";
import {
  RedoOutlined,
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";

@Options({
  components: {
    GridLayout,
    GridItem,
    RedoOutlined,
    EditOutlined,
    CheckOutlined,
    CloseOutlined,
    PlusOutlined,
  },
})
export default class WidgetContainer extends Vue {
  private showLayout = true;
  private editable = false;
  private layout: GridItemData[] = [
    { x: 0, y: 0, w: 2, h: 2, i: "0" },
    { x: 2, y: 0, w: 2, h: 4, i: "1" },
    { x: 4, y: 0, w: 2, h: 5, i: "2" },
    { x: 6, y: 0, w: 2, h: 3, i: "3" },
    { x: 8, y: 0, w: 2, h: 3, i: "4" },
    { x: 10, y: 0, w: 2, h: 3, i: "5" },
    { x: 0, y: 5, w: 2, h: 5, i: "6" },
    { x: 2, y: 5, w: 2, h: 5, i: "7" },
    { x: 4, y: 5, w: 2, h: 5, i: "8" },
    { x: 6, y: 3, w: 2, h: 4, i: "9" },
    { x: 8, y: 4, w: 2, h: 4, i: "10" },
    { x: 10, y: 4, w: 2, h: 4, i: "11" },
    { x: 0, y: 10, w: 2, h: 5, i: "12" },
    { x: 2, y: 10, w: 2, h: 5, i: "13" },
    { x: 4, y: 8, w: 2, h: 4, i: "14" },
    { x: 6, y: 8, w: 2, h: 4, i: "15" },
    { x: 8, y: 10, w: 2, h: 5, i: "16" },
    { x: 10, y: 4, w: 2, h: 2, i: "17" },
    { x: 0, y: 9, w: 2, h: 3, i: "18" },
    { x: 2, y: 6, w: 2, h: 2, i: "19" },
  ];

  private onReload() {
    this.showLayout = false;
    this.$nextTick(() => {
      this.showLayout = true;
    });
  }

  private onEdit() {
    this.editable = true;
  }

  private onConfirm() {
    console.log("confirm", this.layout);
    this.editable = false;
  }

  private onCancel() {
    this.editable = false;
  }

  private onAdd() {
    console.log("add");
  }
}
</script>

<style lang="scss" scoped>
.toolbar {
  position: absolute;
  right: 5px;
  z-index: 9999;

  .anticon {
    margin-left: 5px;
  }
}

.editable:hover {
  background: rgb(24, 144, 255);
}
</style>
