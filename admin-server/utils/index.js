// 权限list转成tree
const filterArray = (data, p_id) => {
  let tree = [];
  let temp;
  for (let i = 0; i < data.length; i++) {
    if (data[i].p_id == p_id) {
      let obj = data[i];
      temp = filterArray(data, data[i]._id);
      if (temp.length > 0) {
        obj.children = temp;
      }
      tree.push(obj);
    }
  }
  return tree;
}

exports.filterArray = filterArray

