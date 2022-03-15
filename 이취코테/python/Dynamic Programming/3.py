n = int(input())
arr = list(map(int, input().split()))

d=[0]*(n+1)
d[1] = arr[0]
d[2] = arr[1]

for i in range(3, n+1):
    d[i] = max(d[i-3:i-1]) + arr[i-1]

print(max(d))

# ---
# solve지만 답에 비해 비효율적인것 같다~ 😑
# 내 코드는 d[i]에 i번째 창고를 무조건 털때의 최대값을 저장했는데, 답은 d[i]에 i까지의 최대값을 저장(i번째 창고를 털수도 있고 안털수도 있다.)
# 현재 창고로부터 전 창고, 전전창고만 고려하면 됨
d=[0]*(n)
d[0] = arr[0]
d[1] = max(arr[0], arr[1])
for i in range(2, n):
    d[i] = max(d[i-1], d[i-2]+arr[i]) #현재 창고를 터는 경우와 안터는 경우 중 최대값을 저장.
print(d[n-1]) #이렇게 풀면 그냥 마지막값을 print하면됨.