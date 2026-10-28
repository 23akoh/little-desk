/* Managed authentication. Only a public publishable key belongs here. NEVER add
   a Supabase secret/service_role key. Apply cloud-schema.sql before enabling. */
const LITTLE_DESK_CLOUD={url:'',publishableKey:''};
const DeskCloud=(()=>{
  let client=null,user=null;
  const configured=()=>/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/.test(LITTLE_DESK_CLOUD.url)&&LITTLE_DESK_CLOUD.publishableKey.startsWith('sb_publishable_');
  async function init(){
    if(!configured())return false;
    await new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.118.0/dist/umd/supabase.js';s.onload=resolve;s.onerror=()=>reject(new Error('Could not load the sign-in service.'));document.head.append(s);});
    client=window.supabase.createClient(LITTLE_DESK_CLOUD.url,LITTLE_DESK_CLOUD.publishableKey);
    client.auth.onAuthStateChange((event,session)=>{user=session?.user||null;document.dispatchEvent(new CustomEvent('desk-auth',{detail:{event,user}}));});
    const {data,error}=await client.auth.getUser();if(!error)user=data.user;return true;
  }
  function need(){if(!client)throw new Error('Cloud accounts are not connected to this preview yet.');return client;}
  async function auth(action,email,password){
    let result;
    const redirect=location.origin+location.pathname;
    if(action==='signup')result=await need().auth.signUp({email,password,options:{emailRedirectTo:redirect}});
    else if(action==='recover')result=await need().auth.updateUser({password});
    else result=await need().auth.signInWithPassword({email,password});
    if(result.error)throw result.error;user=result.data.user||user;return result.data;
  }
  async function save(room){if(!user)throw new Error('Sign in to save a cloud room.');const {error}=await need().from('little_desk_rooms').upsert({user_id:user.id,room,updated_at:new Date().toISOString()});if(error)throw error;}
  async function load(){if(!user)throw new Error('Sign in to load a cloud room.');const {data,error}=await need().from('little_desk_rooms').select('room').eq('user_id',user.id).maybeSingle();if(error)throw error;return data?.room||null;}
  async function logout(){const {error}=await need().auth.signOut();if(error)throw error;user=null;}
  async function reset(email){const {error}=await need().auth.resetPasswordForEmail(email,{redirectTo:location.origin+location.pathname});if(error)throw error;}
  return {configured,init,auth,save,load,logout,reset,getUser:()=>user};
})();
