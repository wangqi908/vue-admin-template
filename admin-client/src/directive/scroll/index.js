export default {
  // 滚动到屏幕顶端吸附
  inserted: el => {
    let content = document.querySelector(".body-content");
    let width = el.parentNode.offsetWidth;
    let lastChild = el.parentNode.lastChild;
    let offsetTop = el.offsetTop;
    let height = el.offsetHeight;
    el.style.boxSizing = "border-box";
    el.style.width = width + "px";
    content.addEventListener("scroll", e => {
      let scrollTop = content.scrollTop || content.scrollTop;
      if (scrollTop >= offsetTop) {
        el.style.position = "fixed";
        el.style.top = "0";
        if (el != lastChild) {
          content.style.paddingTop = height + "px";
        }
      } else {
        el.style.position = "unset";
        if (el != lastChild) {
          content.style.paddingTop = 0;
        }
      }
    });
    window.onresize = () => {
      let width = el.parentNode.offsetWidth;
      el.style.width = width + "px";
    };
  }
}
