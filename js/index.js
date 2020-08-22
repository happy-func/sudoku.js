import Suduku from './suduku.js';
const suduku = new Suduku();
const $ = window.$;
const Empty = 25;
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
    let list = suduku.recursionGetResult().reduce((pre, cur) => {
        const arr = cur.reduce((prev, curV) => {
            prev.push(curV.value);
            return prev;
        }, []);
        pre.push(arr);
        return pre;
    }, []);
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
genGame();
