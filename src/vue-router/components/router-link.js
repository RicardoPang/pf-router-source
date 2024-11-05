export default {
  props: {
    to: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      default: 'a',
    },
  },
  methods: {
    handleClick() {
      // 可能是hash模式 还有可能是history模式
      // window.location.hash = this.to;
      this.$router.push(this.to);
    },
  },
  render(h) {
    // 复杂的组件全部可以采用render函数的写法
    const tagName = this.tag;
    return <tagName onClick={this.handleClick}>{this.$slots.default}</tagName>;
  },
};
