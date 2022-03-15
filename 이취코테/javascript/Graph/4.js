import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");
const n = parseInt(input[0]);

class Queue {
  constructor() {
    this._arr = [];
  }
  enqueue(item) {
    this._arr.push(item);
  }
  dequeue() {
    return this._arr.shift();
  }
  isEmpty() {
    return this._arr.length === 0;
  }
}

const indegree = new Array(n + 1).fill(0); //진입차수
const graph = []; //그래프
for (let i = 0; i < n + 1; i++) {
  graph.push([]);
}
const cost = new Array(n + 1).fill(0); //시간

for (let i = 1; i < n + 1; i++) {
  const arr = input[i].split(" ").map(Number);
  arr.pop(); // -1 제거
  cost[i] = arr.shift(); //첫번째 원소 제거(시간)
  //간선 추가 (j가 i를 가리킴)
  for (let j of arr) {
    graph[j].push(i);
  }
  indegree[i] += arr.length; //진입차수 증가(시간과 -1을 제거한 배열의 개수만큼이 진입차수가됨)
}
const result = [...cost];
//javascript의 shallow copy vs deep copy 정리
//https://myhappyman.tistory.com/221
//1) let obj2 = obj1과 같은 대입연산자를 통한 복사는 얕은 복사. 같은 값이되므로 하나가 변경되면 같이 변경됨
//2) let obj2 = {...obj1} 전개연산자를 이용하여 복사하면 깊은 복사. 이때 단순배열 또는 단순객체여야만 깊은복사가 진행됨!!
//3) let obj1 = [{a:1, b:2}, {a:3, b:4}]와 같이 배열안에 객체들이 존재하는 경우
//let obj2 = [...obj1]을 하게되면 obj1과 obj2의 배열만 비교했을때는 다른 주소값을 가리킴.
//하지만 obj1[0].a와 obj2[0].a는 같은값을 가리킴!! 객체주소값은 같은곳을 가리키기 때문. 그래서 내부의 객체나 배열이 원본의 값을 참조하고 있으므로 얕은복사가 됨. (즉 전개연산자는 가장 바깥쪽의 값만 복사해준다고 생각하면 될듯)
//4) 따라서 내부의 객체까지 깊은복사를 하기 위해서는 let obj2=[...obj1]이후
// obj2[0]={...obj2[0], a:5}를 해줘야함. 그럼 obj1[0]과 obj2[0]도 다른 주소값을 가리키게됨.
// (이때 obj1[1]과 obj2[1]는 여전히 같은 주소값을 가리키고 있다는것도 알수있음.)

function topology_sort() {
  const q = new Queue();

  //진입차수가 0인 노드들을 큐에 삽입
  for (let i = 1; i < n + 1; i++) {
    if (indegree[i] === 0) q.enqueue(i);
  }

  while (!q.isEmpty()) {
    const now = q.dequeue();

    //현재 원소와 연결된 노드들의 진입차수 1씩 제거
    for (let i of graph[now]) {
      indegree[i] -= 1;
      result[i] = Math.max(result[now] + cost[i], result[i]); //❌❌시간 구하는 부분에서 실수!!
      //새롭게 진입차수가 0이 되는 노드를 큐에 삽입
      if (indegree[i] === 0) {
        q.enqueue(i);
      }
    }
  }

  for (let i = 1; i < n + 1; i++) {
    console.log(result[i]);
  }
}

topology_sort();

//solve인줄 알았으나 히든 케이스에서 틀린 코드 😥😫
//하나의 과목에 동일한 계층의 선수강이 2개 있을때, 더 긴 시간으로 갱신해야 하는 부분을 빼먹음!!
//테스트케이스만 만족한다고 solve가 아니며, 예외가 발생하는 히든케이스를 스스로 생각해낼 수 있는것도 중요한 능력인 것 같다 📝
//깊은복사, 얕은 복사도 기억해두자

// 5
// 10 -1
// 10 1 -1
// 4 1 -1
// 4 3 1 -1
// 3 3 -1
