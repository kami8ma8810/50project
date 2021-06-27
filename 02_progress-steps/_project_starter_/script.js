const progress = document.getElementById('progress');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const circles = document.querySelectorAll('.circle');
const activeClassName = 'is-active';

let currentActive = 1;

nextBtn.addEventListener('click', () => {
  // nextボタンクリックでカウントを1プラス
  currentActive++;

  // もしcurrentActiveカウントの上限をサークルの数より大きくならないようにする
  if (currentActive > circles.length) {
    currentActive = circles.length;
  }

  // サークルとプログレスバーのスタイルを反映
  styleUpdate();
});
prevBtn.addEventListener('click', () => {
  // prevボタンクリックでカウントを１マイナス
  currentActive--;

  // もしcurrentActiveカウントが1より小さくなったらcurrentActiveは1にする（0にならないようにする）
  if (currentActive < 1) {
    currentActive = 1;
  }
  // サークルとプログレスバーのスタイルを反映
  styleUpdate();
});

// サークルとプログレスバーのスタイルを制御
const styleUpdate = () => {
  // currentActiveのカウントよりcircleのインデックス番号（indexとする）が小さいときにis-activeを付与する
  circles.forEach((circle, index) => {
    if (index < currentActive) {
      circle.classList.add(activeClassName);
    } else {
      circle.classList.remove(activeClassName);
    }
  });

  // is-activeの要素を取得
  const activeItems = document.querySelectorAll('.is-active');

  // プログレスバーの制御
  // プログレスバーは、currentActiveが2の時は1/3分のwidthにする、3の時は2/3にする。分母はcircles -1になり 、分子はis-activeの数 -1 になる。
  progress.style.width =
    ((activeItems.length - 1) / (circles.length - 1)) * 100 + '%';

  // 初期状態のプロパティを制御
  if (currentActive === 1) {
    prevBtn.disabled = true;
  }
  // circleの上限までいったときはnextを押せないようにする
  else if (currentActive === circles.length) {
    nextBtn.disabled = true;
  } else {
    // それ以外はprev,nextどちらも押せるようにする
    prevBtn.disabled = false;
    nextBtn.disabled = false;
  }
};
