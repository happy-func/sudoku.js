import Suduku from './suduku.js';
const suduku = new Suduku();
const $ = window.$;
const Empty = 25;
let answerData;
let storeData;
function genRandomOTN() {
    return Math.floor(Math.random() * 9) + 1;
}
;
function genGame() {
    let initArr = [];
    for (let i = 0; i < 9; i++) {
        let innerArr = [];
        for (let x = 0; x < 9; x++) {
            initArr.push([i, x]);
        }
        initArr.push(innerArr);
    }
    suduku.initData(initArr);
    const list = suduku.recursionGetResult().reduce((pre, cur) => {
        const arr = cur.reduce((prev, curV) => {
            prev.push(curV.value);
            return prev;
        }, []);
        pre.push(arr);
        return pre;
    }, []);
    answerData = list;
    let count = 0, newArr = [];
    try {
        list.forEach(item => {
            let tempArr = [];
            item.forEach(ite => {
                if (count < Empty && genRandomOTN() > 5) {
                    count++;
                    tempArr.push(0);
                }
                else {
                    tempArr.push(ite);
                }
            });
            newArr.push(tempArr);
        });
    }
    catch (e) {
    }
    storeData = newArr;
    reSetHtml(newArr);
}
;
function reSetHtml(list) {
    for (let i = 0; i < 9; i++) {
        for (let x = 0; x < 9; x++) {
            if (list[i][x]) {
                $('.play-box .row').eq(i).find('.column').eq(x).addClass('disabled').text(list[i][x]).attr('title', '该值已被锁定');
            }
            else {
                $('.play-box .row').eq(i).find('.column').eq(x).removeClass('disabled').text(0).removeAttr('title');
            }
        }
    }
}
;
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
                throw (new Error('find'));
            }
        });
    }
    catch (_a) {
    }
});
$('#restore').on('click', function () {
    reSetHtml(storeData);
});
$('#reset').on('click', function () {
    genGame();
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
    if (!suduku.verify(list)) {
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
    console.log(str);
    $('#code').html(str);
    $('.shadow-box').stop().fadeIn();
});
$('.answer_area').on('click', '.close-btn', function () {
    $('.shadow-box').stop().fadeOut();
});
genGame();
