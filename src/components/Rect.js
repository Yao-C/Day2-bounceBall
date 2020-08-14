import {
  h,
  defineComponent,
  ref,
  onMounted,
  onUnmounted,
} from "@vue/runtime-core";
import { game } from "../Game";

export default defineComponent({
  setup(props, { emit }) {
    const viewWidth = 400;
    // 需要改变 x
    const rectX1 = ref(50);

    let speed = 10;
    let count = 0;

    const handleBounce = () => {
      if (rectX1.value >= viewWidth - 50 || rectX1.value < 50) {
        speed *= -1;
        count++;

        console.log("rect" + count);

        if (count == 3) {
          emit("changeObj", "circle");
        }
      }

      rectX1.value += speed;
    };

    onMounted(() => {
      game.ticker.add(handleBounce);
      console.log("rect mounted");
    });

    onUnmounted(() => {
      game.ticker.remove(handleBounce);
      console.log("rect unmounted");
    });

    return {
      rectX1,
    };
  },

  render(ctx) {
    return h("Container", [h("rect", { y: 400, x: ctx.rectX1 })]);
  },
});
