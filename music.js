/* Independent, optional audio. No autoplay, fetched audio or account tokens.
   The soft-key loop and ambient textures are generated locally with Web Audio.
   Spotify uses its own official player and sign-in, without claiming API access. */
const LittleMusic=(()=>{
  const $=s=>document.querySelector(s);let context=null,gain=null,mode='',interval=null,nodes=new Set(),volume=.15;
  const names={keys:'Soft keys',rain:'Window rain',forest:'Forest air',brown:'Brown noise'};
  function announce(text){$('#music-status').textContent=text;}
  function status(){document.querySelectorAll('[data-sound]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.sound===mode)));$('#music-toggle-label').textContent=mode?names[mode]+' · playing':'A little soundtrack';$('#music-dock').classList.toggle('has-sound',!!mode);document.dispatchEvent(new CustomEvent('little-sound',{detail:{mode}}));}
  function stop(){clearInterval(interval);interval=null;for(const n of nodes){try{n.stop();n.disconnect();}catch{}}nodes.clear();if(gain){gain.disconnect();gain=null;}mode='';status();announce('A little quiet. Your sound is paused.');}
  function track(node){nodes.add(node);node.addEventListener?.('ended',()=>{node.disconnect();nodes.delete(node);},{once:true});return node;}
  function noise(kind){const length=Math.floor(context.sampleRate*3),buffer=context.createBuffer(1,length,context.sampleRate),data=buffer.getChannelData(0);let last=0;for(let i=0;i<length;i++){const white=Math.random()*2-1;if(kind==='brown'){last=(last+.02*white)/1.02;data[i]=last*3.5;}else data[i]=white;}
    const source=track(context.createBufferSource());source.buffer=buffer;source.loop=true;const filter=context.createBiquadFilter();filter.type=kind==='rain'?'lowpass':'lowpass';filter.frequency.value=kind==='rain'?1600:kind==='forest'?550:350;source.connect(filter);filter.connect(gain);source.start();
  }
  function keys(){const chords=[[48,55,59,64],[45,52,55,60],[41,48,52,57],[43,50,54,59]];let index=0;
    function chord(){if(!gain)return;const now=context.currentTime;for(const [i,midi] of chords[index++%chords.length].entries()){const oscillator=track(context.createOscillator()),envelope=context.createGain();oscillator.type='sine';oscillator.frequency.value=440*Math.pow(2,(midi-69)/12);const t=now+i*.11;envelope.gain.setValueAtTime(0,t);envelope.gain.linearRampToValueAtTime(.2,t+.06);envelope.gain.exponentialRampToValueAtTime(.001,t+4.6);oscillator.connect(envelope);envelope.connect(gain);oscillator.onended=()=>{oscillator.disconnect();envelope.disconnect();nodes.delete(oscillator);};oscillator.start(t);oscillator.stop(t+4.8);}}
    chord();interval=setInterval(chord,4700);
  }
  function birds(){function bird(){if(!gain)return;const t=context.currentTime,osc=track(context.createOscillator()),env=context.createGain();osc.type='sine';osc.frequency.setValueAtTime(1900+Math.random()*500,t);osc.frequency.exponentialRampToValueAtTime(2800,t+.12);osc.frequency.exponentialRampToValueAtTime(1600,t+.28);env.gain.setValueAtTime(0,t);env.gain.linearRampToValueAtTime(.07,t+.06);env.gain.exponentialRampToValueAtTime(.001,t+.4);osc.connect(env);env.connect(gain);osc.onended=()=>{osc.disconnect();env.disconnect();nodes.delete(osc);};osc.start(t);osc.stop(t+.5);}interval=setInterval(bird,4000);}
  async function play(kind){if(mode===kind){stop();return;}stop();try{const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)throw Error('Audio unavailable');context=context||new Audio();await context.resume();gain=context.createGain();gain.gain.value=volume;gain.connect(context.destination);mode=kind;if(kind==='keys')keys();else{noise(kind);if(kind==='forest')birds();}status();announce(names[kind]+' is playing. Make a little room for yourself.');}catch{stop();announce('Sound could not start. Try again in an up-to-date browser.');}}
  function spotifyURL(value){try{const u=new URL(value);if(u.protocol!=='https:'||u.hostname!=='open.spotify.com'||u.username||u.password)return '';const path=u.pathname.replace(/^\/intl-[a-z]{2}\//,'/');return /^\/(playlist|album|track)\/[A-Za-z0-9]+\/?$/.test(path)?'https://open.spotify.com/embed'+path+'?theme=0':'';}catch{return '';}}
  function init(){if(!$('#music-dock'))return;try{const saved=Number(localStorage.getItem('little-music.volume'));if(Number.isFinite(saved)&&saved>=0&&saved<=.6&&localStorage.getItem('little-music.volume')!==null)volume=saved;$('#spotify-link').value=localStorage.getItem('little-music.playlist')||'https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn';}catch{}
    $('#ambient-volume').value=Math.round(volume*100);
    function expand(open){$('#music-panel').hidden=!open;$('#music-toggle').setAttribute('aria-expanded',String(open));document.body.classList.toggle('music-is-open',open);}
    $('#music-toggle').onclick=()=>expand($('#music-panel').hidden);$('#music-collapse').onclick=()=>expand(false);
    document.querySelectorAll('[data-music-tab]').forEach(b=>b.onclick=()=>{const spotify=b.dataset.musicTab==='spotify';$('#spotify-panel').hidden=!spotify;$('#ambient-panel').hidden=spotify;document.querySelectorAll('[data-music-tab]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));});
    document.querySelectorAll('[data-sound]').forEach(b=>b.onclick=()=>play(b.dataset.sound));$('#sound-stop').onclick=stop;
    $('#ambient-volume').oninput=()=>{volume=Number($('#ambient-volume').value)/100;if(gain&&context)gain.gain.setTargetAtTime(volume,context.currentTime,.05);try{localStorage.setItem('little-music.volume',String(volume));}catch{}};
    $('#spotify-form').onsubmit=e=>{e.preventDefault();const input=$('#spotify-link'),url=spotifyURL(input.value.trim());if(!url){input.setCustomValidity('Use a Spotify playlist, album or song link.');input.reportValidity();return;}input.setCustomValidity('');stop();$('#spotify-player').src=url;$('#spotify-player').hidden=false;$('#spotify-status').textContent='Your Spotify player is ready. Press play in it to begin.';try{localStorage.setItem('little-music.playlist',input.value.trim());}catch{}};$('#spotify-link').oninput=e=>e.target.setCustomValidity('');
    if(document.body.classList.contains('lofi-page'))expand(true);
  }
  if(typeof document!=='undefined')document.addEventListener('DOMContentLoaded',init);
  return {spotifyURL,play,stop,getMode:()=>mode};
})();
