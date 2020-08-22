import Suduku from './suduku.js';
const suduku = new Suduku();
// @ts-ignore
const $ = window.$;
interface processInnerVal {
    is_set: boolean,
    value: number,
}

/* 游戏难度 */
const Empty: number = 25;
// 本次生成的可行解
let answerData:number[][];
// 数独库备份
let storeData:number[][];

/* 生成1-9随机数 */
function genRandomOTN():number {
    return Math.floor(Math.random() * 9) + 1;
};

/* 生成游戏棋盘 */
function genGame():void {
    let initArr: number[][] = [];
    for (let i = 0; i < 9; i++) {
        let innerArr: number[] = [];
        for (let x = 0; x < 9; x++) {
            initArr.push([i, x]);
        }
        initArr.push(innerArr);
    }
    suduku.initData(initArr);
    const list = suduku.recursionGetResult().reduce((pre: processInnerVal[][], cur: processInnerVal[]) => {
        const arr = cur.reduce((prev, curV: processInnerVal) => {
            prev.push(curV.value);
            return prev;
        }, [])
        pre.push(arr);
        return pre;
    }, []);
    // @ts-ignore
    answerData=list;
    let count = 0, newArr:number[][] = [];
    try {
        list.forEach(item => {
            let tempArr = [];
            item.forEach(ite => {
                if (count < Empty && genRandomOTN() > 5) {
                    count++;
                    tempArr.push(0);
                } else {
                    tempArr.push(ite);
                }
            })
            newArr.push(tempArr);
        })
    } catch (e) {
    }
    storeData=newArr;
    reSetHtml(newArr);
};

// 为棋盘添加指定数字
function reSetHtml(list:number[][]):void{
    for (let i = 0;i < 9; i++){
        for(let x = 0; x < 9; x++){
            if(list[i][x]){
                $('.play-box .row').eq(i).find('.column').eq(x).addClass('disabled').text(list[i][x]).attr('title','该值已被锁定');
            }else {
                $('.play-box .row').eq(i).find('.column').eq(x).removeClass('disabled').text(0).removeAttr('title');
            }
        }
    }
};

// 点击空格添加数字
$('.play-box').on('click','.column',function (){
    if(!$(this).hasClass('disabled')){
        $('.play-box .column').removeClass('checked');
        $(this).addClass('checked');
    }
});

// 点击数字填入选中表格
$('.num-area').on('click','.num',function (){
    const val = $(this).text();
    try{
        $('.play-box .column').each(function (){
            if($(this).hasClass('checked')){
                $(this).text(val);
                throw (new Error('find'));
            }
        })
    }catch {

    }
});

// 恢复本次数独初始状态
$('#restore').on('click',function (){
    reSetHtml(storeData);
});

// 重置游戏
$('#reset').on('click',function (){
    genGame();
});

// 提交数独
$('#submit').on('click',function (){
    let list:number[][]=[];
    $('.play-box .row').each(function (){
        let insideArr:number[]=[];
        $(this).find('.column').each(function (){
            insideArr.push($(this).text()*1);
        })
        list.push(insideArr);
    })
    if(!suduku.verify(list)){
        alert('提交内容不合法，请检查后重试');
        return;
    }
    alert('真棒，您完成了本次测试，再来一个吧！');
    genGame();
});

// 展示可行解
$('#tip').on('click',function (){
    let str = '';
    answerData.forEach(item => {
        let tem = '';
        item.forEach(ite => {
            tem += ite + ' ';
        })
        tem += '\n';
        str += tem;
    })
    console.log(str)
    $('#code').html(str);
    $('.shadow-box').stop().fadeIn();
})

// 关闭可行解弹窗
$('.answer_area').on('click','.close-btn',function (){
    $('.shadow-box').stop().fadeOut();
})
genGame();
