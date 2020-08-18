
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
        {value: "M795 525V472H729V495.67V525H760.807H795Z"},
        //{value: "M1498.5 999V1H497.5L731 202L913 466L1031 779.5L1498.5 999Z"},
        {value: "M1498.5 999V1H0V423V999H744.5H1498.5Z"},
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


