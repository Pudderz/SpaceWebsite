
let navMorph = document.querySelector('.navBackground');
let navButton = document.querySelector('.container');
let menu = document.querySelector('#menu')
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
    easing: 'easeInOutQuad',
    duration: 500,
    rotate: anime.stagger([-360, 360]),
    autoplay: false,
    loop: 1, 

    update: function(anim){
        console.log('progress : '+Math.round(anim.progress)+'%');
    },
    changeBegin: function(){
        changeBegan++;
        console.log('animation began');
        if(!(changeBegan%2)){
            menu.classList.remove('showing');
            console.log('removed')
        }
        
    },

    changeComplete: function() {
        changeCompleted++;
        console.log('completed')
          if(changeCompleted%2){
            menu.classList.add('showing');
            console.log('added');
        }
    },
    loopComplete: function(){
        morphing.reverse();
        console.log('loopComplete ran')
    }
});   

navButton.addEventListener('click', ()=>{
    console.log('clicked')
    morphing.play();
})


