n, k = map(int, input().split())
a = list(map(int, input().split()))
b = list(map(int, input().split()))

# 최대!! K번 바꿔치기(K번 무조건 바꿔야하는것 아님)
a.sort() #오름차순
b.sort(reverse=True) #내림차순
for i in range(k):
    # A의 원소가 더 작을때만 교체
    if a[i] < b[i]:
        #바꿔치기
        a[i], b[i] = b[i], a[i]
    else:
        break

# A의 합
sum = 0
for i in a:
    sum+=i
print(sum)

# solve...인줄 알았지만 아예 문제를 틀리게 읽음😇
# 무조건 K번을 바꿔야 하는줄 알았지만 최대 K번이였음.
# 문제를 꼼꼼히 읽는 습관을 들이자!!

# 5 3
# 1 2 5 4 3
# 5 5 6 6 5