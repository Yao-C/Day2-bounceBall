// vue3
import { ref, computed, defineComponent, h } from "@vue/runtime-core";
import Circle from "./components/Circle";
import Rect from "./components/Rect";

// template -> render
export default defineComponent({
  setup() {
    // vue2 data
    // 创建响应式对象 ref
    // const currentPageName = ref("StartPage");
    const currentObjName = ref("circle");
    // 计算属性
    // 依赖别的属性的属性
    const currentObj = computed(() => {
      if (currentObjName.value === "rect") {
        return Rect;
      } else {
        return Circle;
      }
    });

    return {
      currentObj,
      currentObjName,
    };
  },

  render(ctx) {
    return h("Container", [
      h(ctx.currentObj, {
        onChangeObj(obj) {
          ctx.currentObjName = obj;
        },
      }),
    ]);
  },
});
