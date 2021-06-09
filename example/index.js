import { gen, verify } from "../esm";

let answerData,
  storeData;
function genRandomOTN() {
  return Math.floor(Math.random() * 9) + 1;
}
function genGame() {
  $('.loader').stop().fadeIn();
  const Empty = 30;
  const list = gen({ gzip: false, mask: false })
  answerData = list;
  let count = 0, newArr = [];
  try {
    list.forEach(item => {
      let tempArr = [], insideCount = 0;
      item.forEach(ite => {
        if (count < Empty && insideCount < 3 && genRandomOTN() > 5) {
          count++;
          insideCount++;
          tempArr.push(0);
        } else {
          tempArr.push(ite);
        }
      });
      newArr.push(tempArr);
    });
  } catch (e) {
  }
  storeData = newArr;
  reSetHtml(newArr);
  $('.loader').stop().fadeOut();
}

function reSetHtml(list) {
  for (let i = 0; i < 9; i++) {
    for (let x = 0; x < 9; x++) {
      if (list[i][x]) {
        $('.play-box .row').eq(i).find('.column').eq(x).addClass('disabled').text(list[i][x]).attr('title', '该值已被锁定');
      } else {
        $('.play-box .row').eq(i).find('.column').eq(x).removeClass('disabled').text(0).removeAttr('title');
      }
    }
  }
}

$('.play-box').on('click', '.column', function () {
  if (!$(this).hasClass('disabled')) {
    $('.play-box .column').removeClass('checked');
    $(this).addClass('checked');
  }
});
$('.num-area').on('click', '.num', function () {
  const val = $(this).text();
  try {
    $('.play-box .column').each(function () {
      if ($(this).hasClass('checked')) {
        $(this).text(val);
        throw new Error('find');
      }
    });
  } catch (_a) {
  }
});
$('#restore').on('click', function () {
  if (window.confirm('确认恢复将会将您的答案恢复至原始状态，确认恢复？')) {
    reSetHtml(storeData);
  }
});
$('#reset').on('click', function () {
  if (window.confirm('确认重置将会重新生成数独')) {
    genGame();
  }
});
$('#submit').on('click', function () {
  let list = [];
  $('.play-box .row').each(function () {
    let insideArr = [];
    $(this).find('.column').each(function () {
      insideArr.push($(this).text() * 1);
    });
    list.push(insideArr);
  });
  if (!verify(list)) {
    alert('提交内容不合法，请检查后重试');
    return;
  }
  alert('真棒，您完成了本次测试，再来一个吧！');
  genGame();
});
$('#tip').on('click', function () {
  let str = '';
  answerData.forEach(item => {
    let tem = '';
    item.forEach(ite => {
      tem += ite + ' ';
    });
    tem += '\n';
    str += tem;
  });
  $('#code').html(str);
  $('.answer-box').stop().fadeIn();
});
$('.answer_area').on('click', '.close-btn', function () {
  $('.answer-box').stop().fadeOut();
});
genGame();
