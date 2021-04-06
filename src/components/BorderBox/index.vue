<template>
  <component v-if="border" :is="border">
    <div class="border-box-content"><slot /></div>
  </component>
  <div v-else class="border-box-content"><slot /></div>
</template>

<script lang="ts">
import { Vue, Prop, Options } from "vue-property-decorator";
import borderBoxes from "./borderBoxes";

@Options({
  components: {
    ...borderBoxes,
  },
})
export default class BorderBox extends Vue {
  @Prop({ default: "" }) border!: string;
}
</script>

<style lang="scss" scoped>
.border-box-content {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
