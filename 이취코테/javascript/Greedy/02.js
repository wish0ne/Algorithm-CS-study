import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");
const s = input[0].split("").map(Number);

let answer = s[0];
for (let i = 1; i < s.length; i++) {
  if (answer <= 1 || s[i] <= 1) answer += s[i];
  else answer *= s[i];
}
console.log(answer);

//solve π―
//μ°μ°νλ λ μ μ€ νλλΌλ 0 λλ 1μ΄λ©΄ λνκΈ°, λλ¨Έμ§λ κ³±νκΈ°
