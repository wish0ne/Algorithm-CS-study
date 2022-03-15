n, m = map(int, input().split())
arr = []
for i in range(n):
    arr.append(int(input()))

d = [10000] * (m+1) #불가능하다는 의미로 10000이 아니라 10001을 했어야함. 화폐가치가 10000인 경우 10000개가 가능하기 때문.
d[0] = 0
# 각 화폐가치는 최소개수가 1가지
for i in arr:
    if i<m:
        d[i] = 1

for i in range(1, m+1):
    for j in arr: # 각 화폐가치 반복
        if i - j < 0:
            continue
        # 하나라도 방법이 없는경우 불가능한 경우가 됨.
        if d[i - j] == 0 or d[j] == 0:
            continue
        if d[i - j] + d[j] < d[i]:
            d[i] = d[i - j] + d[j] # d[j]는 어차피 다 1이니까 +1 해도됨.
    # 방법이 없으면 0
    if d[i] == 10000:
        d[i] = 0

if d[m] == 0:
    print(-1)
else:
    print(d[m])


# -----
# solve🙃지만 헷갈린다
# 답은 arr[i]부터 반복을 시작했기 때문에 i - j < 0일때를 고려하는 부분이 없어도 되고,
# d[i - j] + d[j]가 아니라 +1을 했기 때문에 화폐단위의 d를 1로 초기화하는 부분이 없어도 된것.

d = [10001] * (m + 1)
d[0] = 0
for i in range(n): # 각 화폐단위만큼 반복
    for j in range(arr[i], m + 1): # 화폐단위 최소부터 반복시작 (그보다 작은값은 어차피 불가능이니까 10001임)
        if d[j - arr[i]] != 10001: # 내 코드의 d[i-j]와 같은것. (i-k)원을 만드는 방법이 존재하는지 검사. 이부분 생략가능(어차피 불가능하더라도 d[j]==10001이기 때문)
            d[j] = min(d[j], d[j - arr[i]] + 1) # 내 코드의 d[i] = d[i - j] + d[j](1)과 동일

if d[m] == 10001:
    print(-1)
else:
    print(d[m])