// [문제 이름]
// : 유기농 배추

// [문제 설명]
// : 차세대 영농인 한나는 강원도 고랭지에서 유기농 배추를 재배하기로 하였다. 농약을 쓰지 않고 배추를 재배하려면 배추를 해충으로부터 보호하는 것이 중요하기 때문에, 한나는 해충 방지에 효과적인 배추흰지렁이를 구입하기로 결심한다.
//   이 지렁이는 배추근처에 서식하며 해충을 잡아 먹음으로써 배추를 보호한다. 특히, 어떤 배추에 배추흰지렁이가 한 마리라도 살고 있으면 이 지렁이는 인접한 다른 배추로 이동할 수 있어, 그 배추들 역시 해충으로부터 보호받을 수 있다.
//   한 배추의 상하좌우 네 방향에 다른 배추가 위치한 경우에 서로 인접해있는 것이다. 배추들이 모여있는 곳에는 배추흰지렁이가 한 마리만 있으면 되므로 서로 인접해있는 배추들이 몇 군데에 퍼져있는지 조사하면 총 몇 마리의 지렁이가 필요한지 알 수 있다.
//   예를 들어 배추밭이 아래와 같이 구성되어 있으면 최소 5마리의 배추흰지렁이가 필요하다. 0은 배추가 심어져 있지 않은 땅이고, 1은 배추가 심어져 있는 땅을 나타낸다.

// [문제 링크]
// : https://www.acmicpc.net/problem/1012

// e.g.
// 1	1	0	0	0	0	0	0	0	0
// 0	1	0	0	0	0	0	0	0	0
// 0	0	0	0	1	0	0	0	0	0
// 0	0	0	0	1	0	0	0	0	0
// 0	0	1	1	0	0	0	1	1	1
// 0	0	0	0	1	0	0	1	1	1

function solution() {
  let cnt = 0;
  //그래프 전체 탐색
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      //그래프의 값을 돌면서 1이 존재하고 방문한적 없다면
      //해당 위치의 범위에는 DFS가 실행되지 않았으므로 실행
      if (graph[i][j] === 1) {
        DFS(i, j);
        //DFS가 한번 수행되고 나면 해당 노드의 인접노드까지 방문처리가 된다.
        //즉 하나의 배추집단을 파악한 셈이다.
        cnt += 1;
      }
    }
  }
  console.log(cnt);
}

function DFS(i, j) {
  //현재 i,j값이 그래프 범위내인지 검사
  if (RangeCheck(i, j) === true) {
    //현재 위치가 1이고(배추 존재)하고 방문한적없다면
    //방문 처리후 순서대로 DFS
    if (graph[i][j] === 1) {
      graph[i][j] = 0;
      DFS(i + 1, j); //아래
      DFS(i, j + 1); //오른쪽
      DFS(i - 1, j); //위
      DFS(i, j - 1); //왼쪽
    }
  } else {
    return;
  }
}

//그래프(배열) 범위 검증
function RangeCheck(i, j) {
  if (i >= 0 && i < m && j >= 0 && j < n) {
    return true;
  } else return false;
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let [m, n, k] = [0];
let graph = [];

rl.on('line', function (line) {
  //여러줄 입력
  input.push(line);
}).on('close', function () {
  let t = parseInt(input[0]);
  input = input.slice(1);
  //테스트 케이스 개수만큼 반복
  for (let i = 0; i < t; i++) {
    [m, n, k] = input[0].split(' ').map((el) => parseInt(el));
    //가로 세로 길이에 맞게 그래프와 방문자 수 초기화
    graph = Array.from(Array(m), () => Array(n).fill(0));
    //일반적인 DFS와 다르게 정점과 간선으로 이루어진 그래프가 아니라 배추의 위치가 주어지기 때문에
    //input배열 0에는 n,m,k값이 있으므로 1부터 수행
    for (let j = 1; j <= k; j++) {
      //배추 위치
      let [x, y] = input[j].split(' ').map((el) => parseInt(el));
      graph[x][y] = 1;
    }
    solution();
    //하나의 테스트 케이스가 끝난후 배열을 잘라 다음 테스트케이스 수행
    input = input.slice(k + 1);
    //배열 초기화
    graph.length = 0;
  }

  process.exit();
});
