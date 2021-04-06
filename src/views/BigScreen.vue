<template>
  <widget-container />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import WidgetContainer from "@/components/Widget/components/WidgetContainer/index.vue";
@Options({
  components: {
    WidgetContainer,
  },
})
export default class Home extends Vue {}
</script>
