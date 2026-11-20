/* Bozza 2 – script condiviso da tutte le pagine. Demo: nessun dato viene inviato. */
(function(){
  function $(id){return document.getElementById(id)}

  // ---- Menu mobile: pannello laterale da destra
  var mBtn=$('menuBtn'),panel=$('panel'),bg=$('panelBg'),pClose=$('panelClose');
  if(mBtn&&panel){
    var openP=function(){panel.classList.add('open');bg.classList.add('open');panel.setAttribute('aria-hidden','false');mBtn.setAttribute('aria-expanded','true');pClose.focus();};
    var closeP=function(focus){panel.classList.remove('open');bg.classList.remove('open');panel.setAttribute('aria-hidden','true');mBtn.setAttribute('aria-expanded','false');if(focus)mBtn.focus();};
    mBtn.addEventListener('click',openP);
    pClose.addEventListener('click',function(){closeP(true)});
    bg.addEventListener('click',function(){closeP(true)});
    panel.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){closeP(false)})});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&panel.classList.contains('open'))closeP(true)});
  }

  // ---- Menu "Gare" a tendina (desktop)
  var ddBtn=$('ddBtn'),dd=$('ddGare');
  if(ddBtn&&dd){
    var ddSet=function(o){dd.classList.toggle('open',o);ddBtn.setAttribute('aria-expanded',o?'true':'false');};
    ddBtn.addEventListener('click',function(e){e.stopPropagation();ddSet(!dd.classList.contains('open'))});
    document.addEventListener('click',function(e){if(!dd.contains(e.target))ddSet(false)});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&dd.classList.contains('open')){ddSet(false);ddBtn.focus();}});
  }

  // ---- Schede Edizione 2027 / Edizioni passate (anche da link con #edizioni-passate)
  document.querySelectorAll('[role=tablist]').forEach(function(list){
    var tabs=[].slice.call(list.querySelectorAll('[role=tab]'));
    function select(t,focus){
      tabs.forEach(function(x){var on=x===t;x.setAttribute('aria-selected',on?'true':'false');x.tabIndex=on?0:-1;$(x.getAttribute('aria-controls')).hidden=!on;});
      if(focus)t.focus();
    }
    tabs.forEach(function(t,i){
      t.addEventListener('click',function(){select(t);if(history.replaceState)history.replaceState(null,'','#'+t.getAttribute('data-hash'));});
      t.addEventListener('keydown',function(e){
        var n=null;
        if(e.key==='ArrowRight')n=tabs[(i+1)%tabs.length];
        if(e.key==='ArrowLeft')n=tabs[(i-1+tabs.length)%tabs.length];
        if(e.key==='Home')n=tabs[0];
        if(e.key==='End')n=tabs[tabs.length-1];
        if(n){e.preventDefault();select(n,true);}
      });
    });
    var fromHash=tabs.filter(function(t){return '#'+t.getAttribute('data-hash')===location.hash})[0];
    if(fromHash)select(fromHash);
  });

  // ---- Edizioni passate: dati dimostrativi (link "#" e foto segnaposto)
  var DL='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v8m0 0l-3.5-3.5M8 10l3.5-3.5M2.5 13.5h11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var PAST={
    giro:[
      {y:'2026',sub:'54ª edizione, 1 maggio 2026',docs:['Classifica Giro delle Coste (PDF)','Classifica Trail delle Coste (PDF)'],photos:['gruppo.jpg',0,0,0,0,0]},
      {y:'2025',sub:'',docs:['Classifica (PDF)'],photos:[0,0,0,0,0,0]},
      {y:'2024',sub:'1 maggio 2024',docs:['Classifica (PDF)'],photos:[0,0,0,0,0,0]},
      {y:'2015',sub:'Corsa, MTB e duathlon',docs:['Corsa assoluta','MTB maschile','MTB femminile','Ironman','Ironwoman','Coppie maschili','Coppie femminili','Coppie miste'],photos:[0,0,0,0,0,0]}
    ],
    kv:[
      {y:'2025',sub:'31 agosto 2025',docs:['Classifica (PDF)'],photos:[0,0,0,0,0,0]},
      {y:'2017',sub:'',docs:['Classifica (PDF)'],photos:['montagna.jpg',0,0,0,0,0]},
      {y:'2016',sub:'',docs:['Classifica (PDF)'],photos:[]},
      {y:'2015',sub:'6 giugno 2015',docs:['Classifica (PDF)'],photos:[]},
      {y:'2014',sub:'14 giugno 2014',docs:['Classifica (PDF)'],photos:[]}
    ]
  };
  var RACE_NAME={giro:'Giro delle Coste',kv:'Cadore Km Verticale'};
  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  document.querySelectorAll('[data-years]').forEach(function(box){
    var key=box.getAttribute('data-years'),years=PAST[key],name=RACE_NAME[key];
    var chips=document.createElement('div');chips.className='chips';chips.setAttribute('role','group');chips.setAttribute('aria-label','Scegli l\'anno');
    var out=document.createElement('div');out.className='year';out.setAttribute('aria-live','polite');
    box.appendChild(chips);box.appendChild(out);
    function show(i){
      var d=years[i];
      chips.querySelectorAll('.chip').forEach(function(c,j){c.setAttribute('aria-pressed',j===i?'true':'false')});
      var h='<h3>'+esc(name)+' '+d.y+(d.sub?'<small>'+esc(d.sub)+'</small>':'')+'</h3><ul class="dls">';
      d.docs.forEach(function(t){h+='<li><a href="#">'+DL+esc(t)+'</a></li>'});
      if(d.photos.length)h+='<li><a href="#">'+DL+'Scarica tutte le foto (ZIP)</a></li>';
      h+='</ul>';
      if(d.photos.length){
        h+='<div class="pgal">';
        d.photos.forEach(function(p,k){
          if(p)h+='<figure><img src="../assets/img/'+p+'" alt="Foto '+(k+1)+' di '+esc(name)+' '+d.y+'" loading="lazy"><a class="dl" href="../assets/img/'+p+'" download>'+DL+'Scarica<span class="sr-only"> foto '+(k+1)+'</span></a></figure>';
          else h+='<figure><div class="ph">Foto da caricare</div></figure>';
        });
        h+='</div>';
      }else{
        h+='<p class="empty">Per questa edizione non abbiamo ancora foto. Se ne hai, mandale a <a href="mailto:info.gruppomarciatori@gmail.com">info.gruppomarciatori@gmail.com</a>.</p>';
      }
      out.innerHTML=h;
    }
    years.forEach(function(d,i){var b=document.createElement('button');b.type='button';b.className='chip';b.textContent=d.y;b.setAttribute('aria-pressed','false');b.addEventListener('click',function(){show(i)});chips.appendChild(b);});
    show(0);
  });

  // ---- Errori dei campi (usato da entrambi i moduli)
  function setErr(f,key,on,msg){
    var box=f.querySelector('[data-f="'+key+'"]');if(!box)return;
    box.classList.toggle('invalid',on);
    var m=box.querySelector('.err-msg');if(msg&&m)m.textContent=msg;
    box.querySelectorAll('input,select').forEach(function(inp){inp.setAttribute('aria-invalid',on?'true':'false')});
  }
  var EMAIL=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // ---- Iscrizione in 3 passaggi
  var form=$('regForm');
  if(form){
    var RACES={
      giro:{name:'Giro delle Coste',date:'Sabato 1 maggio 2027 (da confermare)',short:'1 maggio 2027',day:new Date(2027,4,1),dead:'Mercoledì 28 aprile',fee:12,dayFee:'In piazza la mattina della gara: 15 €',ritiro:'Ufficio gara in piazza a Calalzo',minAge:14},
      trail:{name:'Trail delle Coste',date:'Sabato 1 maggio 2027 (da confermare)',short:'1 maggio 2027',day:new Date(2027,4,1),dead:'Mercoledì 28 aprile',fee:12,dayFee:'In piazza la mattina della gara: 15 €',ritiro:'Ufficio gara in piazza a Calalzo',minAge:14},
      kv:{name:'Cadore Km Verticale',date:'Fine agosto 2027 (da confermare)',short:'Fine agosto 2027',day:new Date(2027,7,29),dead:'Il giovedì prima della gara, ore 24',fee:20,dayFee:'Il giorno della gara, fino alle 08:30: 25 €',ritiro:'Alla partenza a Vallesella',minAge:0}
    };
    var steps=[].slice.call(form.querySelectorAll('[data-step]'));
    var marks=[].slice.call(document.querySelectorAll('#steps li'));
    var cur=0;
    var val=function(name){var el=form.querySelector('input[name='+name+']:checked');return el?el.value:''};
    var ageAt=function(b,day){var a=day.getFullYear()-b.getFullYear();var m=day.getMonth()-b.getMonth();if(m<0||(m===0&&day.getDate()<b.getDate()))a--;return a;};
    var setSt=function(el,text,ok){el.textContent=text;el.className='st '+(ok?'st-ok':'st-wait');};

    // Gara preselezionata da ?gara=giro|trail|kv
    var q=new URLSearchParams(location.search).get('gara');
    if(q&&$('r-'+q))$('r-'+q).checked=true;

    var update=function(){
      var r=RACES[val('gara')],p=val('pag'),later=val('certmode')==='dopo';
      $('s-gara').textContent=r.name;$('s-data').textContent=r.date;$('s-dead').textContent=r.dead;
      $('s-quota').textContent=r.fee+' €';$('s-day').textContent=r.dayFee;
      $('bankAmount').textContent=r.fee+' €';
      var who=($('cognome').value.trim()||'Cognome')+' '+($('nome').value.trim()||'Nome');
      $('causale').textContent='Iscrizione '+r.name+' 2027 – '+who;
      $('cashWhere').textContent=r.ritiro.charAt(0).toLowerCase()+r.ritiro.slice(1);
      $('payOnline').classList.toggle('hidden',p!=='online');$('payBank').classList.toggle('hidden',p!=='bonifico');$('payCash').classList.toggle('hidden',p!=='contanti');
      $('submitBtn').textContent=p==='online'?'Conferma e paga '+r.fee+' €':'Conferma iscrizione';
      $('certNow').classList.toggle('hidden',later);$('certLater').classList.toggle('hidden',!later);
      setSt($('s-cert'),later?'Da inviare più tardi':'Lo carichi adesso',!later);
      setSt($('s-pag'),{online:'Online adesso',bonifico:'Bonifico',contanti:'Contanti al ritiro'}[p],p==='online');
      var b=$('nascita').value?new Date($('nascita').value):null;
      $('minorBox').classList.toggle('hidden',!(val('gara')==='kv'&&b&&ageAt(b,r.day)<18));
    };
    form.addEventListener('input',update);form.addEventListener('change',update);

    var showStep=function(i,focus){
      cur=i;
      steps.forEach(function(s,j){s.classList.toggle('hidden',j!==i)});
      marks.forEach(function(m,j){m.classList.toggle('done',j<i);if(j===i)m.setAttribute('aria-current','step');else m.removeAttribute('aria-current');});
      $('errors').classList.remove('show');
      if(focus){var h=steps[i].querySelector('h2');h.setAttribute('tabindex','-1');h.focus({preventScroll:true});$('steps').scrollIntoView({block:'start'});}
    };

    // Controlli per passaggio: restituisce l'elenco degli errori
    var check=function(i){
      var r=RACES[val('gara')],errs=[];
      var req=function(key,ok,label,msg){setErr(form,key,!ok,msg);if(!ok)errs.push({key:key,label:label});};
      if(i===0){
        req('nome',$('nome').value.trim(),'Nome');
        req('cognome',$('cognome').value.trim(),'Cognome');
        var bv=$('nascita').value,b=bv?new Date(bv):null;
        if(!b||isNaN(b))req('nascita',false,'Data di nascita','Inserisci la data di nascita.');
        else if(r.minAge&&ageAt(b,r.day)<r.minAge)req('nascita',false,'Data di nascita','Per '+r.name+' servono almeno '+r.minAge+' anni il giorno della gara.');
        else setErr(form,'nascita',false);
        req('sesso',!!val('sesso'),'Sesso');
        req('societa',$('societa').value.trim(),'Società');
        req('email',EMAIL.test($('email').value.trim()),'Email');
        var minor=val('gara')==='kv'&&b&&!isNaN(b)&&ageAt(b,r.day)<18;
        if(minor)req('consenso',$('consenso').checked,'Consenso del genitore');else setErr(form,'consenso',false);
      }
      if(i===1){
        if(val('certmode')==='ora')req('certfile',$('certfile').files.length>0,'Certificato medico');else setErr(form,'certfile',false);
      }
      if(i===2){
        req('reg',$('c-reg').checked,'Regolamento ed esonero di responsabilità');
        req('priv',$('c-priv').checked,'Trattamento dei dati');
      }
      return errs;
    };
    var showErrs=function(errs){
      var box=$('errors'),list=$('errList');list.innerHTML='';
      errs.forEach(function(x){var li=document.createElement('li');var a=document.createElement('a');a.href='#';a.textContent=x.label;
        a.addEventListener('click',function(ev){ev.preventDefault();var f=form.querySelector('[data-f="'+x.key+'"] input, [data-f="'+x.key+'"] select');if(f)f.focus();});
        li.appendChild(a);list.appendChild(li);});
      box.classList.add('show');box.focus();
    };

    form.querySelectorAll('[data-next]').forEach(function(b){b.addEventListener('click',function(){
      var errs=check(cur);if(errs.length){showErrs(errs);return;}
      showStep(cur+1,true);
    })});
    form.querySelectorAll('[data-prev]').forEach(function(b){b.addEventListener('click',function(){showStep(cur-1,true)})});

    form.addEventListener('submit',function(e){
      e.preventDefault();
      if(cur<steps.length-1){var errs0=check(cur);if(errs0.length){showErrs(errs0);return;}showStep(cur+1,true);return;}
      var errs=check(2);if(errs.length){showErrs(errs);return;}
      var r=RACES[val('gara')],later=val('certmode')==='dopo',p=val('pag');
      // Demo: nessun invio. Mostra il pettorale con gli stati di certificato e pagamento.
      $('b-gara').textContent=r.name+' 2027';
      $('b-nome').textContent=$('nome').value.trim()+' '+$('cognome').value.trim();
      $('b-soc').textContent=$('societa').value.trim();
      $('b-quota').textContent=r.fee+' €';
      $('b-data').textContent=r.short;
      $('b-ritiro').textContent=r.ritiro;
      setSt($('b-cert'),later?'Da inviare':'Caricato – in attesa di approvazione',!later);
      setSt($('b-pag'),{online:'Pagato online',bonifico:'Bonifico – da verificare sul conto',contanti:'Contanti al ritiro'}[p],p==='online');
      $('b-mailnote').textContent=later?', con il link per caricare il certificato':'';
      $('regArea').classList.add('hidden');$('steps').classList.add('hidden');
      var d=$('done');d.classList.remove('hidden');d.focus({preventScroll:true});d.scrollIntoView({block:'start'});
    });
    $('again').addEventListener('click',function(){
      form.reset();if(q&&$('r-'+q))$('r-'+q).checked=true;update();
      form.querySelectorAll('.invalid').forEach(function(f){f.classList.remove('invalid')});
      $('done').classList.add('hidden');$('regArea').classList.remove('hidden');$('steps').classList.remove('hidden');
      showStep(0,true);
    });
    update();showStep(0,false);
  }

  // ---- Invio del certificato in un secondo momento
  var cf=$('certForm');
  if(cf){
    cf.addEventListener('submit',function(e){
      e.preventDefault();
      var ok1=EMAIL.test($('c2email').value.trim()),ok2=!!$('c2gara').value,ok3=$('c2file').files.length>0;
      setErr(cf,'c2email',!ok1);setErr(cf,'c2gara',!ok2);setErr(cf,'c2file',!ok3);
      if(!(ok1&&ok2&&ok3)){var first=cf.querySelector('.invalid input,.invalid select');if(first)first.focus();return;}
      cf.classList.add('hidden');var ok=$('certOk');ok.classList.remove('hidden');ok.focus();
    });
  }
})();
