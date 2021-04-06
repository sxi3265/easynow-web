<template>
  <component v-if="border" :is="border">
    <div :ref="ref" class="chart"></div>
  </component>
  <div v-else :ref="ref" class="chart"></div>
</template>

<script lang="ts">
import { Prop, mixins } from "vue-property-decorator";
import WidgetBase from "../WidgetBase";
import { DualAxes, Line, Column, Area, Bar, Plot } from "@antv/g2plot";

export interface ChartOptions {
  series: ChartSeries[];
}

export interface ChartSeries {
  type: "line" | "column" | "bar" | "area";
  options: Record<string, unknown>;
}

export default class WidgetChart extends mixins(WidgetBase) {
  ref = "chart";
  $refs!: {
    chart: HTMLElement;
  };

  @Prop({ default: {} }) contentOptions!: ChartOptions;

  public refreshContent(contentData: any): void {
    if (!this.contentOptions) {
      throw new Error("Chart内容配置有误");
    }
    this.$nextTick(() => {
      if (!this.$refs.chart) {
        return;
      }
      this.$refs.chart.innerHTML = "";
      const chart = this.getChart(contentData);
      chart.render();
    });
  }

  private getChart(data: any): Plot<any> {
    if (this.contentOptions.series.length > 1) {
      return new DualAxes(this.$refs.chart, {
        data,
        xField: "x",
        yField: this.contentOptions.series.map(() => "y"),
        geometryOptions: this.contentOptions.series.map((v) => {
          return {
            geometry: v.type,
            seriesField: "s",
            ...v.options,
          };
        }),
      });
    }
    const series = this.contentOptions.series[0];
    switch (series.type) {
      case "line":
        return new Line(this.$refs.chart, {
          data: data[0],
          xField: "x",
          yField: "y",
          seriesField: "s",
          ...series.options,
        });
      case "column":
        return new Column(this.$refs.chart, {
          data: data[0],
          xField: "x",
          yField: "y",
          seriesField: "s",
          ...series.options,
        });
      case "area":
        return new Area(this.$refs.chart, {
          data: data[0],
          xField: "x",
          yField: "y",
          seriesField: "s",
          ...series.options,
        });
      case "bar":
        return new Bar(this.$refs.chart, {
          data: data[0],
          xField: "x",
          yField: "y",
          seriesField: "s",
          ...series.options,
        });
      default:
        throw new Error(`未找到图表${series.type}`);
    }
  }

  public mounted(): void {
    this.refreshWidget();
  }
}
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
