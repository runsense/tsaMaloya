// ===== p222 : « Radio lontan » — une playlist SoundCloud en fond, par le lecteur officiel de SoundCloud (on n'enregistre ni ne copie rien :
// la musique reste chez SoundCloud, avec ses droits). Le joueur colle l'adresse d'une playlist ou d'un morceau ; le son du jeu se fait discret pendant la radio. =====
const RADIO222={el:null,url:''};try{RADIO222.url=localStorage.getItem('tsa-radio')||''}catch(e){}
function radio222(on){try{if(RADIO222.el){RADIO222.el.remove();RADIO222.el=null}
  const c=typeof SND!=='undefined'&&SND.ctx;if(c&&SND.out)SND.out.gain.setTargetAtTime(SND.on?(on?SND.vol*.3:SND.vol):0,c.currentTime,.3);
  if(!on||!RADIO222.url)return;const f=document.createElement('iframe');f.allow='autoplay';f.title='Radio lontan';
  f.src='https://w.soundcloud.com/player/?url='+encodeURIComponent(RADIO222.url)+'&auto_play=true&visual=false&show_comments=false&hide_related=true&show_teaser=false';
  f.style.cssText='position:fixed;left:10px;bottom:52px;width:300px;height:120px;border:0;border-radius:8px;z-index:9998;box-shadow:0 4px 18px #0008';document.body.appendChild(f);RADIO222.el=f}catch(e){}}
function panneau222(){let p=document.getElementById('radio222p');if(p){p.remove();return}p=document.createElement('div');p.id='radio222p';
 p.style.cssText='position:fixed;left:10px;bottom:52px;width:300px;padding:10px;background:#1d1a16f2;color:#f3e8d2;border:1px solid #6a5a40;border-radius:8px;z-index:9999;font:13px/1.4 system-ui,sans-serif';
 p.innerHTML='<b>📻 Radio lontan</b><br><small>Collez l’adresse d’une playlist ou d’un morceau SoundCloud, Deezer, Audiomack ou archive.org (séga, maloya, vieux 78 tours…). Elle joue par le lecteur de SoundCloud ; le son du jeu se fait plus discret.</small><input id="radio222u" placeholder="https://soundcloud.com/…" style="width:100%;box-sizing:border-box;margin:6px 0;padding:6px"><button class="bt" id="radio222g" style="margin:0 6px 0 0">▶ Écouter</button><button class="bt sec" id="radio222s" style="margin:0">■ Couper</button>';
 document.body.appendChild(p);const u=p.querySelector('#radio222u');u.value=RADIO222.url;
 p.querySelector('#radio222g').onclick=()=>{const v=u.value.trim();if(!/^https:\/\/((on\.|m\.)?soundcloud\.com|audiomack\.com|archive\.org\/details|(?:www\.)?deezer\.com)\//.test(v)){toast('Il faut une adresse SoundCloud, Deezer, Audiomack ou archive.org');return}RADIO222.url=v;try{localStorage.setItem('tsa-radio',v)}catch(e){}radio222(true);p.remove()};
 p.querySelector('#radio222s').onclick=()=>{radio222(false);p.remove()}}
{const b=document.createElement('button');b.id='radio222';b.textContent='📻';b.title='Radio lontan (SoundCloud)';b.style.cssText='position:fixed;left:10px;bottom:10px;width:36px;height:36px;border-radius:50%;border:1px solid #6a5a40;background:#1d1a16cc;color:#fff;font-size:17px;cursor:pointer;z-index:9999;padding:0';b.onclick=panneau222;
 const pose=()=>{if(document.body)document.body.appendChild(b);else setTimeout(pose,300)};pose()}
