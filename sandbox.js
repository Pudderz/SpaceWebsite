
let navMorph = document.querySelector('.navBackground');
let navButton = document.querySelector('.container');
let div = document.querySelector('#nav');
let changeBegan, changeCompleted = 0;
let changeNav = (x) =>{
    x.classList.toggle('change');
    
}
let morphing = anime({
    targets: navMorph,
    d:[
        {value: "M354.5 532C317 463.167 -90.9999 352 19.5001 -1.72067H1029.5V998C1012.83 996.667 1045.4 1001.8 805 985C504.5 964 480.5 883.5 426 775C369.888 663.291 391.333 600.167 354.5 532Z"},
        {value: "M-34.4999 859C-71.9999 790.167 -110.5 352 -1.52588e-05 -1.72067H1502.5V998C1485.83 996.667 1497.99 1008 1257 1008C943.5 1008 258.627 1053.84 138 1040C-75.4999 1015.5 2.3334 927.167 -34.4999 859Z"},
    ],
    easing: 'easeInOutQuint',
    duration: 1000,
    autoplay: false,
    loop: 1, 

    update: function(anim){
        console.log('progress : '+Math.round(anim.progress)+'%');
    },
    changeBegin: function(){
        changeBegan++;
        console.log('animation began')

    },
    changeComplete: function(anim) {
        changeCompleted++;
        console.log('completed')
    
    },
    loopComplete: function(anim){
        morphing.reverse();
        console.log('loopComplete ran')
    }
});   

navButton.addEventListener('click', ()=>{
    console.log('clicked')
    morphing.play();
    div.classList.toggle('show');
})


