/* ACCOUNT: sign in, register, help (FAQs and contact), account screen, and screen routing. */
var TABS_IN=[['find','Find'],['book','Bookings'],['help','Help'],['acc','Account']],TABS_OUT=[['auth','Sign in'],['help','Help']];
var USERS=[];try{USERS=JSON.parse(localStorage.getItem('caters_users')||'[]')}catch(e){}
try{var ss=localStorage.getItem('caters_session');if(ss)S.user=JSON.parse(ss)}catch(e){}
S.mode='in';S.msgs=[];
async function hashPw(p,salt){try{var d=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(salt+p));return Array.from(new Uint8Array(d)).map(function(x){return ('0'+x.toString(16)).slice(-2)}).join('')}catch(e){return btoa(salt+p)}}
function fld(id,label,type,ph,auto){return '<div class="field"><label for="'+id+'">'+label+'</label><input class="inp" id="'+id+'" type="'+type+'" placeholder="'+ph+'" autocomplete="'+auto+'" onkeydown="if(event.key===\'Enter\')doAuth()"></div>'}
function authView(){var up=S.mode=='up';
 return '<div class="ahead">'+logo(64)+'<h1>'+(up?'Create your account':'Welcome back')+'</h1><p>Book food and serving staff for any event.</p></div>'+
 '<div class="seg"><button aria-pressed="'+!up+'" onclick="S.mode=\'in\';render()">Sign in</button><button aria-pressed="'+up+'" onclick="S.mode=\'up\';render()">Register</button></div>'+
 '<div class="panel">'+(up?fld('a_name','Full name','text','Your name','name')+fld('a_phone','Mobile number','tel','10-digit number','tel')+fld('a_email','Email','email','you@example.com','email')+fld('a_pw','Password','password','At least 8 characters','new-password'):fld('a_id','Mobile number or email','text','Mobile or email','username')+fld('a_pw','Password','password','Your password','current-password'))+
 '<label class="show"><input type="checkbox" onchange="$(\'a_pw\').type=this.checked?\'text\':\'password\'"> Show password</label><p class="err" id="err" role="alert"></p><button class="btn cta" onclick="doAuth()">'+(up?'Create account':'Sign in')+'</button></div>'+
 '<p class="alt">'+(up?'Already registered? <button class="ghost" onclick="S.mode=\'in\';render()">Sign in</button>':'New here? <button class="ghost" onclick="S.mode=\'up\';render()">Create an account</button>')+'</p><p class="alt"><button class="ghost" onclick="S.tab=\'help\';render()">FAQs and contact us</button></p>'}
function authErr(m){$('err').textContent=m;var p=document.querySelector('.panel');if(p){p.classList.remove('shake');void p.offsetWidth;p.classList.add('shake')}}
async function doAuth(){var up=S.mode=='up',v=function(i){return $(i)?$(i).value.trim():''},pw=$('a_pw').value;
 if(up){var n=v('a_name'),ph=v('a_phone').replace(/[\s-]/g,''),em=v('a_email').toLowerCase();
  if(n.length<2)return authErr('Enter your full name.');if(!/^[6-9]\d{9}$/.test(ph))return authErr('Enter a valid 10-digit mobile number.');if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em))return authErr('Enter a valid email address.');if(pw.length<8)return authErr('Password must be at least 8 characters.');
  if(USERS.some(function(u){return u.phone==ph||u.email==em}))return authErr('An account with this mobile or email already exists. Please sign in.');
  var salt=Math.random().toString(36).slice(2),u={name:n,phone:ph,email:em,salt:salt,h:await hashPw(pw,salt)};USERS.push(u);try{localStorage.setItem('caters_users',JSON.stringify(USERS))}catch(e){}return signIn(u)}
 var id=v('a_id').toLowerCase().replace(/[\s-]/g,''),f=USERS.filter(function(u){return u.phone==id||u.email==id})[0];
 if(!id||!pw)return authErr('Enter your mobile or email and password.');
 if(!f||(await hashPw(pw,f.salt))!==f.h)return authErr('Incorrect details. Please try again.');signIn(f)}
function signIn(u){S.user={name:u.name,phone:u.phone,email:u.email};try{localStorage.setItem('caters_session',JSON.stringify(S.user))}catch(e){}S.tab='find';render();toast('Welcome, '+u.name.split(' ')[0]+'!')}
function logout(){S.user=null;S.sel={};S.bookings=[];S.mode='in';try{localStorage.removeItem('caters_session')}catch(e){}S.tab='auth';render()}
function helpView(){var u=S.user||{};
 return '<h2 class="ph2">Help and support</h2><div class="lbl">Frequently asked questions</div>'+FAQS.map(function(f){return '<details class="faq"><summary>'+f[0]+'</summary><p>'+f[1]+'</p></details>'}).join('')+
 '<div class="lbl">Contact us</div><div class="cgrid"><a class="cc" href="tel:'+BRAND.support.phone.replace(/\s/g,'')+'"><b>Call</b><span>'+BRAND.support.phone+'</span></a><a class="cc" href="mailto:'+BRAND.support.email+'"><b>Email</b><span>'+BRAND.support.email+'</span></a></div><p class="note">'+BRAND.support.hours+'</p>'+
 '<div class="panel">'+fld('c_name','Your name','text','Your name','name')+fld('c_ct','Mobile or email','text','So we can reply','off')+'<div class="field"><label for="c_msg">Message</label><textarea class="inp" id="c_msg" rows="4" placeholder="How can we help?"></textarea></div><p class="err" id="cerr" role="alert"></p><button class="btn cta" onclick="sendMsg()">Send message</button></div><div style="height:20px"></div>'}
function sendMsg(){var n=$('c_name').value.trim(),c=$('c_ct').value.trim(),m=$('c_msg').value.trim();if(!n||!c)return $('cerr').textContent='Add your name and a way to reach you.';if(m.length<10)return $('cerr').textContent='Please write a few more words.';S.msgs.push({n:n,c:c,m:m});$('cerr').textContent='';$('c_msg').value='';toast('Message sent. We will get back to you soon.')}
function accView(){var u=S.user;return '<div class="panel acc"><div class="av big">'+u.name[0].toUpperCase()+'</div><div><h2>'+u.name+'</h2><p>'+u.phone+'</p><p>'+u.email+'</p></div></div>'+
 '<div class="menu"><button onclick="S.tab=\'book\';render()">My bookings <span>›</span></button><button onclick="S.tab=\'help\';render()">Help and contact us <span>›</span></button><button onclick="logout()">Log out <span>›</span></button></div>'+
 '<details class="faq"><summary>Brand this app (for sellers)</summary>'+setView()+'</details>'}
function V(t){return t=='auth'?authView():t=='help'?helpView():t=='acc'?accView():t=='find'?findView():t=='menu'?menuView():t=='book'?bookView():setView()}
