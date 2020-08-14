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
    const viewHeight = 1080;
    // 需要改变 y
    const circleY1 = ref(50);
    //console.log(circleY1);

    let speed = 10;
    let count = 0;

    const handleBounce = () => {
      if (circleY1.value >= viewHeight - 50 || circleY1.value < 50) {
        speed *= -1;
        count++;

        console.log("circle" + count);

        if (count == 3) {
          emit("changeObj", "rect");
        }
      }

      circleY1.value += speed;
    };

    onMounted(() => {
      game.ticker.add(handleBounce);
      console.log("circle mounted");
    });

    onUnmounted(() => {
      game.ticker.remove(handleBounce);
      console.log("circle unmounted");
    });

    return {
      circleY1,
    };
  },

  render(ctx) {
    return h("Container", [h("circle", { x: 200, y: ctx.circleY1 })]);
  },
});
