// плавный скролл к якорям
function smoothTo(sel){ document.querySelector(sel)?.scrollIntoView({behavior:'smooth', block:'start'}); }

// FAQ аккордеон
document.querySelectorAll('.faq-q').forEach(q=>{
  q.addEventListener('click',()=>{
    const a=q.nextElementSibling; const opened=a.style.display==='block';
    document.querySelectorAll('.faq-a').forEach(el=>el.style.display='none');
    a.style.display= opened? 'none':'block';
  });
});

// Пиллы выбора направлений (форма)
const pills = Array.from(document.querySelectorAll('.pill'));
const anyPill = pills.find(p=>p.hasAttribute('data-any'));
const field = document.getElementById('tracksField');
if(pills.length && field){
  let selected = new Set();
  pills.forEach(p=>{
    p.addEventListener('click',()=>{
      if(p.hasAttribute('data-any')){
        // сбросить остальные
        selected.clear(); pills.forEach(x=>x.classList.remove('active'));
        p.classList.add('active'); selected.add(p.dataset.value || 'Не определились');
      }else{
        anyPill?.classList.remove('active');
        if(p.classList.contains('active')){ p.classList.remove('active'); selected.delete(p.dataset.value); }
        else{ p.classList.add('active'); selected.add(p.dataset.value); }
      }
      field.value = Array.from(selected).join(', ');
    });
  });
}

// Спасибо-экран формы
function showThanks(){
  const el = document.getElementById('thanks');
  if(el){ el.hidden = false; }
}

// Уважение prefers-reduced-motion (остановить анимацию)
const mediaReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
if(mediaReduced.matches){
  const mq = document.querySelector('.marquee');
  if(mq) mq.style.animation = 'none';
}
