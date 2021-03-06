n, m = map(int, input().split())
ice = [list(map(int, input())) for _ in range(n)] #입력받을떄 split()붙였더니 한뭉텅이로 입력됨. 그래서 0110이 0,1,1,0이 아니라 110으로 입력됨
# 공백으로 구분해서 입력받을때만 split()사용

count = 0

def dfs(graph, x, y):
    # 예외처리
    if x<=-1 or x>=n or y<=-1 or y>= m:
        return
    if graph[x][y] == 0:
        graph[x][y] = -1 #방문 처리 (1로 해줘도 됨)
        dfs(graph, x-1, y) #좌
        dfs(graph, x+1, y) #우
        dfs(graph, x, y+1) #하
        dfs(graph, x, y-1) #상

# BFS로 풀어보기
from collections import deque

def bfs(graph, x, y):
    queue = deque([[x, y]])
    while queue:
        v = queue.popleft()
        x = v[0]
        y = v[1]
        if graph[x][y] == 0:
            graph[x][y] = 1
            if x-1>=0 and x-1<n and graph[x-1][y]==0:
                queue.append([x-1, y])
            if x+1>=0 and x+1<n and graph[x+1][y]==0:
                queue.append([x+1, y])
            if y-1>=0 and y-1<m and graph[x][y-1]==0:
                queue.append([x, y-1])
            if y+1>=0 and y+1<m and graph[x][y+1]==0:
                queue.append([x, y+1])

for i in range(0, n):
    for j in range(0, m):
        if ice[i][j] == 0:
            bfs(ice, i, j)
            count += 1


# for i in range(0, n):
#     for j in range(0, m):
#         if ice[i][j] == 0 :
#             dfs(ice, i, j)
#             count += 1

print(count)

# not sovled 😥
# dfs, bfs 문제를 풀어본 적 없어서 어떻게 풀어야 하는지 감이 안왔다.
# 또 오른쪽, 아래만 고려하면 된다고 생각했는데 그러면 모든 경우가 처리가 안돼서 상하좌우 4가지 모두를 고려해야했음.
# 그리고 2차원 배열 입력받을떄 숫자로 입력받으니까 00110인 경우 110으로 입력됨. -> split()이 문제였음 ㅠ
# count를 어디서 증가시켜야할지 감이 안왔었는데, 그냥 for문 이용해서 전체 ice돌면서 0일때만 dfs돌고 한번 돌때마다 +1시켜주면 됐었음.


# 4 5
# 00110
# 00011
# 11111
# 00000

# 15 14
# 00000111100000
# 11111101111110
# 11011101101110
# 11011101100000
# 11011111111111
# 11011111111100
# 11000000011111
# 01111111111111
# 00000000011111
# 01111111111000
# 00011111111000
# 00000001111000
# 11111111110011
# 11100011111111
# 11100011111111