<template>
  <border-box :border="border">
    <div class="toolbar" v-if="contentOptions.showToolbar">
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
      :ref="ref"
      v-if="showLayout"
      v-model:layout="layouts"
      :col-num="contentOptions.colNum"
      :row-height="contentOptions.rowHeight"
      :is-draggable="editable"
      :is-resizable="editable"
      :is-mirrored="contentOptions.isMirrored"
      :vertical-compact="contentOptions.verticalCompact"
      :margin="contentOptions.margin"
      :use-css-transforms="contentOptions.useCssTransforms"
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
  </border-box>
</template>

<script lang="ts">
import { Options, mixins, Prop } from "vue-property-decorator";
import { GridLayout, GridItem, GridItemData } from "vue-grid-layout";
import WidgetBase from "../WidgetBase";
import Widgets from "../widgets";
import BorderBox from "@/components/BorderBox/index.vue";
import {
  RedoOutlined,
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";

export interface ContainerOptions {
  colNum: number;
  rowHeight: number;
  isMirrored: boolean;
  verticalCompact: boolean;
  margin: number[];
  useCssTransforms: boolean;
  showToolbar: boolean;
}

const DefaultContainerOptions: ContainerOptions = {
  colNum: 12,
  rowHeight: 30,
  isMirrored: false,
  verticalCompact: true,
  margin: [10, 10],
  useCssTransforms: true,
  showToolbar: false,
};

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
    BorderBox,
  },
})
export default class WidgetContainer extends mixins(WidgetBase) {
  ref = "grid-layout";
  private showLayout = true;
  private editable = false;
  private widgets: Array<any> = [];
  private layouts: GridItemData[] = [];

  @Prop({ default: DefaultContainerOptions }) contentOptions!: ContainerOptions;

  refreshContent(contentData: Array<any>): void {
    this.widgets = contentData;
    this.layouts = contentData.map((i: any) => i.layout);
  }

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
