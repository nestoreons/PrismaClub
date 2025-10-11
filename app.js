// плавный скролл
function smoothTo(sel){ document.querySelector(sel)?.scrollIntoView({behavior:'smooth'}); }

// FAQ
document.querySelectorAll('.faq-q').forEach(q=>{
  q.addEventListener('click',()=>{
    const a=q.nextElementSibling;
    const open=a.style.display==='block';
    document.querySelectorAll('.faq-a').forEach(x=>x.style.display='none');
    a.style.display=open?'none':'block';
  });
});

// Пиллы направлений в форме
const pills=[...document.querySelectorAll('.pill')];
const any=pills.find(p=>p.hasAttribute('data-any'));
const field=document.getElementById('tracksField');

function updateField(){
  if(!field) return;
  const active=pills
    .filter(p=>p.classList.contains('active') && !p.hasAttribute('data-any'))
    .map(p=>p.dataset.value);
  field.value = (any && any.classList.contains('active')) ? 'Не определился' : active.join(', ');
}

pills.forEach(p=>{
  const toggle=()=>{
    if(p.hasAttribute('data-any')){
      pills.forEach(x=>{ if(x!==p) x.classList.remove('active'); });
      p.classList.toggle('active');
    }else{
      any?.classList.remove('active');
      p.classList.toggle('active');
    }
    p.setAttribute('aria-pressed', p.classList.contains('active')?'true':'false');
    updateField();
  };
  p.addEventListener('click',toggle);
  p.addEventListener('keydown',e=>{ if(e.key===' '||e.key==='Enter'){e.preventDefault();toggle();}});
  p.setAttribute('tabindex','0');
});

// Спасибо-уведомление формы
function showThanks(){
  const t=document.getElementById('thanks');
  if(t){ t.hidden=false; t.scrollIntoView({behavior:'smooth', block:'center'}); }
}
window.showThanks=showThanks;

// Табы (менторы и курсы)
document.querySelectorAll('.tabs').forEach(group=>{
  const targetName=group.dataset.tabs; // только пометка
  const tabs=[...group.querySelectorAll('.tab')];
  tabs.forEach(tab=>{
    tab.addEventListener('click',()=>{
      tabs.forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      const id=tab.dataset.target;
      // тело
      const bodies=group.parentElement.querySelectorAll('.tab-body');
      bodies.forEach(b=>b.classList.remove('active'));
      const active = group.parentElement.querySelector('#'+id);
      active?.classList.add('active');
      active?.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
});

// reduce motion — остановка фоновой анимации в hero
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  document.querySelectorAll('.blob,.capsule,.dot').forEach(el=>el.style.animation='none');
}
