(function(){
  var el=document.getElementById('pop');
  var cols=['#ff7eb6','#6cc4ff','#ffd84d','#8ff0c8','#c5a8ff'];
  function burst(){
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    var r=el.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
    for(var i=0;i<28;i++){
      var d=document.createElement('span');d.className='dot';
      d.style.background=cols[i%cols.length];d.style.left=cx+'px';d.style.top=cy+'px';
      document.body.appendChild(d);
      var a=Math.random()*Math.PI*2,s=90+Math.random()*190;
      d.animate([{transform:'translate(0,0) scale(1)',opacity:1},{transform:'translate('+Math.cos(a)*s+'px,'+Math.sin(a)*s+'px) scale(.3)',opacity:0}],{duration:800+Math.random()*400,easing:'cubic-bezier(.2,.8,.3,1)'}).onfinish=(function(n){return function(){n.remove()}})(d);
    }
  }
  el.addEventListener('click',burst);
  el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();burst()}});
})();

(function(){
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ease='cubic-bezier(.2,.8,.3,1)';
  document.querySelectorAll('.faq details').forEach(function(d){
    var sum=d.querySelector('summary'),p=d.querySelector('p'),anim=null;
    function run(from,to,done){
      if(anim)anim.cancel();
      d.style.overflow='hidden';
      anim=d.animate([{height:from+'px'},{height:to+'px'}],{duration:380,easing:ease});
      anim.onfinish=anim.oncancel=function(){anim=null;d.style.overflow='';done&&done()};
    }
    function open(){
      var from=d.offsetHeight;d.open=true;d.classList.add('is-open');
      var to=d.offsetHeight;run(from,to);
      p.animate([{opacity:0,transform:'translateY(-8px)'},{opacity:1,transform:'none'}],{duration:420,easing:ease});
    }
    function close(){
      var from=d.offsetHeight,to=sum.offsetHeight+(d.offsetHeight-d.clientHeight);
      d.classList.remove('is-open');
      p.animate([{opacity:1},{opacity:0}],{duration:200,easing:'ease-out'});
      run(from,to,function(){d.open=false});
    }
    sum.addEventListener('click',function(e){
      e.preventDefault();
      if(reduce){d.open=!d.open;d.classList.toggle('is-open',d.open);return}
      d.classList.contains('is-open')?close():open();
    });
  });
})();
