<template>
  <widget-container :data-options="dataOptions" border="border-box-1" />
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
export default class Home extends Vue {
  dataOptions: DataOptions = {
    loaders: [
      {
        type: "rest",
        url: "/api/widget/getall",
        method: "GET",
      },
    ],
    filters: [
      {
        type: "global",
        name: "getFirstLoaderData",
      },
      {
        type: "custom",
        func: "return data.data;",
      },
    ],
  };
}
</script>
