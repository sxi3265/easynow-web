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
      v-model:layout="layouts"
      :col-num="12"
      :row-height="30"
      :is-draggable="editable"
      :is-resizable="editable"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
      style="min-height: 100%"
    >
      <grid-item
        :class="editable ? 'editable' : ''"
        v-for="item in widgets"
        :key="item.layout.i"
        :x="item.layout.x"
        :y="item.layout.y"
        :w="item.layout.w"
        :h="item.layout.h"
        :i="item.layout.i"
        :is-resiable="item.layout.isResiable"
        :min-w="item.layout.minW"
        :min-h="item.layout.minH"
        :max-w="item.layout.maxW || Infinity"
        :max-h="item.layout.maxH || Infinity"
      >
        <component :is="`Widget${item.type}`" v-bind="item.options" />
      </grid-item>
    </grid-layout>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-property-decorator";
import { GridLayout, GridItem, GridItemData } from "vue-grid-layout";
import Widgets from "../widgets";
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
    ...Widgets,
  },
})
export default class WidgetContainer extends Vue {
  private showLayout = true;
  private editable = false;
  private widgets: Array<any> = [];
  private layouts: GridItemData[] = [];

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
    console.log("confirm", this.layouts);
    this.editable = false;
  }

  private onCancel() {
    this.editable = false;
  }

  private onAdd() {
    console.log("add");
  }

  public mounted(): void {
    this.$http.get("/api/widget/getall").then((resp) => {
      this.widgets = resp.data;
      this.layouts = resp.data.map((i: any) => i.layout);
    });
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
