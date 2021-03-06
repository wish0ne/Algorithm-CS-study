function solution(N, stages) {
  //ë¶ì
  let count = new Array(N + 2).fill(0);
  for (let i of stages) {
    count[i] += 1;
  }

  //ë¶ëª¨
  let sum = new Array(N + 2).fill(0);
  sum[N + 1] = count[N + 1];
  for (let i = count.length - 2; i > 0; i--) {
    sum[i] = sum[i + 1] + count[i];
  }

  let fail = new Array(N + 2).fill(0);
  for (let i = 1; i < N + 1; i++) {
    if (sum[i] === 0) fail[i] = { index: i, fail: 0 };
    else fail[i] = { index: i, fail: count[i] / sum[i] };
  }
  //   fail.splice(0, 1);
  //   fail.splice(N, 1);

  let answer = fail
    .slice(1, N + 1)
    .sort((a, b) => {
      if (b.fail === a.fail) return a.index - b.index;
      else return b.fail - a.fail;
    })
    .map((v) => v.index);

  //   var answer = [];
  //   for (let i = 0; i < fail.length; i++) {
  //     answer.push(fail[i].index);
  //   }
  return answer;
}

console.log(solution(5, [2, 1, 2, 6, 2, 4, 3, 3]));

//solve ð
//ì½ëë¥¼ ë ê°ê²°íê² ìì±í´ë³´ëë¡ íì! (ì£¼ìì²ë¦¬í ë¶ë¶ë¤ -> mapì ì¬ì© ë±ì¼ë¡ ì½ë íë¶ë¶ì¼ë¡ ì¶ì½ê°ë¥íì)

//ë ê°ë¨í ì± íì´ ì°¸ê³  (ìììë¶í° ì¤í¨ì¨ì êµ¬íê² ë¤ë¦)
function solution2(N, stages) {
  //ë¶ì
  let count = new Array(N + 2).fill(0);
  for (let i of stages) {
    count[i] += 1;
  }

  let length = stages.length;

  //ì¤í¨ì¨
  const fail = [];
  for (let i = 1; i < N + 1; i++) {
    if (length === 0) fail.push({ index: i, fail: 0 });
    else fail.push({ index: i, fail: count[i] / length });
    length -= count[i];
  }

  fail.sort((a, b) => {
    if (b.fail === a.fail) return a.index - b.index;
    else return b.fail - a.fail;
  });

  const answer = fail.map((v) => v.index);

  return answer;
}

console.log(solution2(5, [2, 1, 2, 6, 2, 4, 3, 3]));
