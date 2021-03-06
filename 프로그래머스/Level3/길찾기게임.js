function solution(nodeinfo) {
  nodeinfo.forEach((info, idx) => info.push(idx + 1));
  nodeinfo.sort((a, b) => {
    if (a[1] !== b[1]) return b[1] - a[1];
    else return a[0] - b[0];
  });

  //νΈλ¦¬ μμ±π₯
  const graph = new Array(nodeinfo.length + 1);
  for (let i = 0; i <= nodeinfo.length; i++) graph[i] = new Array(2);

  const make_tree = (parent, node) => {
    //left sub tree
    if (parent[0] > node[0]) {
      if (!graph[parent[2]][0]) {
        graph[parent[2]][0] = node;
        //console.log(parent[2], node[2]);
        return;
      }
      make_tree(graph[parent[2]][0], node);
    }
    //right sub tree
    else {
      if (!graph[parent[2]][1]) {
        graph[parent[2]][1] = node;
        //console.log(parent[2], node[2]);
        return;
      }
      make_tree(graph[parent[2]][1], node); //right
    }
  };

  for (let i = 0; i < nodeinfo.length - 1; i++)
    make_tree(nodeinfo[0], nodeinfo[i + 1]);

  const preorder = [];
  const postorder = [];

  //μ μ μν : root -> left -> right
  const preOrder = (parent, parent_idx) => {
    preorder.push(parent_idx); //root μΆκ°
    let [left, right] = parent;
    if (left) preOrder(graph[left[2]], left[2]);
    if (right) preOrder(graph[right[2]], right[2]);
  };
  preOrder(graph[nodeinfo[0][2]], nodeinfo[0][2]); //root
  console.log(preorder);

  //νμ μν : left -> right -> root
  const postOrder = (parent, parent_idx) => {
    let [left, right] = parent;
    if (left) postOrder(graph[left[2]], left[2]);
    if (right) postOrder(graph[right[2]], right[2]);
    postorder.push(parent_idx);
  };
  postOrder(graph[nodeinfo[0][2]], nodeinfo[0][2]);
  console.log(postorder);

  const answer = [];
  answer.push(preorder, postorder);
  return answer;
}

//solve
//νΈλ¦¬ μννλκ±΄ μμΈλ‘ μμ²­ μ¬μ κ³ , νΈλ¦¬ μμ±μμ λ§νμ νλ£¨μ’μΌ νμλ€..
//μ¬μ€ νΈλ¦¬ μμ±μ κ΅¬νμ΄λΌ μ§μ€νλ©΄ λΉ λ₯΄κ² ν μ μμμ κ² κ°μλ°, μ²μμ μκ°ν μμ΄λμ΄κ° νλ Έμ΄μ λ μκ° λ§μ΄ μ‘μλ¨Ήμλ―
//κ΅¬νλ¬Έμ λ ν­μ λ¬Έμ  λμ΄λλ³΄λ€ μ²΄κ° λμ΄λλ₯Ό λ ν¬κ² μκ°ν΄μ λ§λ§ν΄νλ κ² κ°μ
//κ΅¬κΈλ§ κ°λ₯ν μνμ΄μλ€λ©΄ tree μλ£κ΅¬μ‘° κ·Έλλ‘ μ¬μ©νμ΄λ μ’μλ―

console.log(
  solution([
    [5, 3],
    [11, 5],
    [13, 3],
    [3, 5],
    [6, 1],
    [1, 3],
    [8, 6],
    [7, 2],
    [2, 2],
  ])
);
