const scroll = new LocomotiveScroll({
    el: document.querySelector('#cont'),
    smooth: true
});
 var timeout;

function firstpageAnim() {
    var tl= gsap.timeline()

    tl.from("#navbar",{
        y:'-10',
        opacity:0,
        duration:2,
        ease: Expo.easeInOut
    })
    .to(".boundingelem",{
        y:0,
        ease: Expo.easeInOut,
        duration:2,
        stagger:0.2,
        delay:-1
    })
    .from("#herofooter",{
        y:'-10',
        opacity:0,
        duration:1.5,
        delay:-1,
        ease: Expo.easeInOut
    })
    
}

function flatcircle(){
    var xscale=1;
    var yscale=1;

    var prevx=0
    var prevy=0

    window.addEventListener("mousemove", function (dets) {

        clearTimeout(timeout)

        var xdiff= dets.clientX-prevx 
        var ydiff= dets.clientY-prevy
        
        xscale=gsap.utils.clamp(2,2.5, xdiff ) // what ever the value of xdiff come it will set to nearest either 0.8 or 1.2
        yscale=gsap.utils.clamp(2,2.5, ydiff )

        prevx=dets.clientX
        prevy=dets.clientY

        // console.log(xdiff,ydiff);
        // console.log(xscale,yscale);
        circlemousefollower(xscale,yscale)

        setTimeout(() => {
            
            document.querySelector("#minicircle").style.transform=`translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`
        }, 100);


    })
}

function circlemousefollower(xscale, yscale){
    window.addEventListener("mousemove",function (dets){
        document.querySelector("#minicircle").style.transform=`translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale} ,${yscale})`
    })
}



document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate=0;
    var diffrot=0;
    elem.addEventListener("mousemove",function (details) {
        var diff=details.clientY-elem.getBoundingClientRect().top
        diffrot=details.clientX-rotate;
        rotate=details.clientX

        console.log(diff);
        gsap.to(elem.querySelector("img"),{
            opacity:9999,
            ease:Power1,
            display:'block',
            top:diff,
            left:details.clientX,
            duration:0.5 ,
            rotate:gsap.utils.clamp(-20,20,diffrot)
        })
    })

    elem.addEventListener("mouseleave",function (details) {
       
        gsap.to(elem.querySelector("img"),{
            opacity:0,
            ease:Power3,
          
        })
    })
})

firstpageAnim()
circlemousefollower()
flatcircle()
