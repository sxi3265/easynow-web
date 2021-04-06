<template>
  <widget-container
    v-if="dataOptions"
    :data-options="dataOptions"
    :border="border"
  />
  <a-spin v-else />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import WidgetContainer from "@/components/Widget/components/WidgetContainer/index.vue";
import { DataOptions } from "@/components/Widget/components/WidgetBase";
@Options({
  components: {
    WidgetContainer,
  },
})
export default class BigScreen extends Vue {
  border = "";
  dataOptions: DataOptions = {
    loaders: [],
    filters: [],
  };

  public mounted(): void {
    this.$http
      .get("/api/DashBoard/GetByCode", { params: { code: "main" } })
      .then((resp) => {
        this.border = resp.data.border;
        this.dataOptions = resp.data.dataOptions;
      });
  }
}
</script>
