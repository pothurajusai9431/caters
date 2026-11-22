/* CORE: app state, helpers, logo, and the Find (location search) screen. */
var S={fv:'all',fc:'All',fq:'',tab:'find',loc:'',ci:null,sel:{},guests:50,staff:true,bookings:[]};
var A=-20,drag=false,lastX=0,S2=0;
var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
function $(id){return document.getElementById(id)}
function money(n){return '₹'+n.toLocaleString('en-IN')}
function toast(t){var e=$('toast');e.textContent=t;e.className='toast on';setTimeout(function(){e.className='toast'},2200)}
function logo(sz){var a=BRAND.accent;return '<svg width="'+sz+'" height="'+sz+'" viewBox="0 0 64 64" aria-label="'+BRAND.name+' logo"><rect width="64" height="64" rx="18" fill="'+a+'"/><path d="M13 47C12 25 28 12 51 14C53 36 38 51 13 47Z" fill="#0F3B2C"/><path d="M16 44L45 19" stroke="'+a+'" stroke-width="3.5" stroke-linecap="round"/><circle cx="46" cy="46" r="6" fill="#E0472D"/></svg>'}
function apply(){document.documentElement.style.setProperty('--accent',BRAND.accent);$('brand').textContent=BRAND.name;$('logo').innerHTML=logo(34);document.title=BRAND.name}
/* Find */
function matches(){var q=S.loc.trim().toLowerCase();if(!q)return null;return CATERERS.map(function(c,i){return{c:c,i:i}}).filter(function(o){return o.c.a.some(function(a){return a.toLowerCase().indexOf(q)>-1})})}
function resHtml(){var m=matches();
 if(m===null)return '<div class="empty"><p>Enter your area to see caterers serving it today.</p></div>';
 if(!m.length)return '<div class="empty"><h3>No caterers in “'+S.loc+'” yet</h3><p>Try a nearby area from the list above.</p></div>';
 var rk=m.map(function(o){return o.i}).join(),an=rk!==S._rk;S._rk=rk;return '<div class="lbl">'+m.length+' caterer'+(m.length>1?'s':'')+' near '+S.loc+'</div>'+m.map(function(o,ix){var c=o.c,from=Math.min.apply(null,c.i.map(function(k){return ITEMS[k].p}));
 return '<div class="cat'+(an?' n':'')+'" style="--i:'+Math.min(ix,6)+'"><div class="av">'+c.n[0]+'</div><div style="flex:1"><h3>'+c.n+'</h3><p><span class="rate">★ '+c.r+'</span>'+c.rv+' reviews · '+(c.open?'Taking orders':'Closed now')+'</p><div>'+c.a.map(function(a){return '<span class="tag">'+a+'</span>'}).join('')+'</div><p style="margin-top:6px">'+c.i.length+' dishes · items from <b>'+money(from)+'</b></p><button class="btn" onclick="openMenu('+o.i+')">See menu</button></div></div>'}).join('')}
function setLoc(v){S.loc=v;$('res').innerHTML=resHtml();var b=document.querySelectorAll('.chip');b.forEach(function(x){x.setAttribute('aria-pressed',x.textContent===v)})}
function findView(){return '<div class="hero"><h1>Where is your event?</h1></div><input class="loc" id="loc" list="ar" placeholder="Type your area, e.g. Jayanagar" aria-label="Event location" value="'+S.loc+'" oninput="setLoc(this.value)"><datalist id="ar">'+AREAS.map(function(a){return '<option value="'+a+'">'}).join('')+'</datalist><div class="lbl">Popular areas</div><div class="chips">'+AREAS.slice(0,8).map(function(a){return '<button class="chip" aria-pressed="'+(S.loc===a)+'" onclick="$(\'loc\').value=\''+a+'\';setLoc(\''+a+'\')">'+a+'</button>'}).join('')+'</div><div id="res">'+resHtml()+'</div>'}
