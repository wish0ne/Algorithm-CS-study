# not solved 😥
# dp 첫 입문이라 어떻게 풀어야할지도 아예 감이 안왔다.
# 바텀업 방식을 잘 기억해두면 좋을듯

x = int(input())
d = [0] * (x + 1)

for i in range(2, x+1):
    d[i] = d[i-1] + 1 # 1을 빼는 경우
    if i % 2 == 0: # 2로 나누어지는 경우
        d[i] = min(d[i], d[i // 2] + 1)
    if i % 3 == 0: # 3으로 나누어지는 경우
        d[i] = min(d[i], d[i // 3] + 1)
    if i % 5 == 0: # 5로 나누어지는 경우
        d[i] = min(d[i], d[i // 5] + 1)

print(d[x])
