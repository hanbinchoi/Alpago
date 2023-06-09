// [문제 이름]
// : 완주하지 못한 선수

// [문제 설명]
// : 네오는 평소 프로도가 비상금을 숨겨놓는 장소를 알려줄 비밀지도를 손에 넣었다.
// 그런데 이 비밀지도는 숫자로 암호화되어 있어 위치를 확인하기 위해서는 암호를 해독해야 한다.
// 다행히 지도 암호를 해독할 방법을 적어놓은 메모도 함께 발견했다.

// 1. 지도는 한 변의 길이가 n인 정사각형 배열 형태로, 각 칸은 "공백"(" ") 또는 "벽"("#") 두 종류로 이루어져 있다.
// 2. 전체 지도는 두 장의 지도를 겹쳐서 얻을 수 있다. 각각 "지도 1"과 "지도 2"라고 하자.
// 지도 1 또는 지도 2 중 어느 하나라도 벽인 부분은 전체 지도에서도 벽이다.
// 지도 1과 지도 2에서 모두 공백인 부분은 전체 지도에서도 공백이다.
// 3. "지도 1"과 "지도 2"는 각각 정수 배열로 암호화되어 있다.
// 4. 암호화된 배열은 지도의 각 가로줄에서 벽 부분을 1, 공백 부분을 0으로 부호화했을 때 얻어지는 이진수에 해당하는 값의 배열이다.
// 네오가 프로도의 비상금을 손에 넣을 수 있도록, 비밀지도의 암호를 해독하는 작업을 도와줄 프로그램을 작성하라.

// [문제 링크]
// : https://school.programmers.co.kr/learn/courses/30/lessons/17681?language=javascript

function solution(n, arr1, arr2) {
  // 주어진 지도 2진수 형태로 변환
  arr1 = arr1.map((ele) => parseInt(ele.toString(2)));
  arr2 = arr2.map((ele) => parseInt(ele.toString(2)));

  const secretMap = [];

  for (let i = 0; i < arr1.length; i++) {
    // 각 이진수를 그대로 더해줌. (ex. 1000 + 1001 = 2001 )
    // 더해진 값은 지도의 크기(n)로 자릿수를 맞춰줌 (ex. 2001 -> 02001)
    // 그렇게 얻어진 문자열을 secretMap의 원소로 추가.
    secretMap.push(('' + (arr1[i] + arr2[i])).padStart(n, 0));
  }

  // secretMap의 원소를 원하는 형태로 변환
  // 각 자리가 2or1인 경우 #, 0이면 " " (ex. 02001 -> " #  #")
  return secretMap.map((ele) => {
    return ele.replaceAll('2', '#').replaceAll('1', '#').replaceAll('0', ' ');
  });
}
console.log(solution(5, [9, 20, 28, 18, 11], [30, 1, 21, 17, 28]));
console.log(solution(6, [46, 33, 33, 22, 31, 50], [27, 56, 19, 14, 14, 10]));
