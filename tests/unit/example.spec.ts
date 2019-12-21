import { shallowMount } from "@vue/test-utils";
import Pokelist from "@/components/Pokelist.vue";

describe("Pokelist.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(Pokelist, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
