import{d as B,k as R,u as W,a as I,B as D,n as x,C as b,l as y,r as C,L as Z,o as u,c,e as i,q as E,A as M,w as d,b as r,t as p,s as m,g as tt,i as et,z as st,x as ot,F as at,p as lt,j as nt,M as it,m as ut}from"./index.68ce3c5c.js";import{s as A}from"./search.fc5bb9cc.js";import{g as rt}from"./play.0be1cf54.js";import{_ as L}from"./plugin-vue_export-helper.21dcd24c.js";import"./request.6f08c656.js";const ct=_=>(lt("data-v-38273c80"),_=_(),nt(),_),dt={class:"table"},mt={style:{display:"flex","align-items":"center","justify-content":"space-between"}},_t={class:"num"},gt=["onClick"],pt=["onClick"],ht=["title"],vt={key:0,class:"noCopyright"},ft={key:1},Ct={key:2,class:"trialTags"},yt={key:3,class:"trialTags"},wt=["title","onClick"],kt=["title","onClick"],St={class:"rClickMenu"},bt=ct(()=>i("li",{class:"menuItem"},"\u4E0B\u4E00\u9996\u64AD\u653E",-1)),Ft={class:"pagi"},Dt=B({props:["loading"],setup(_){const h=R(),v=W(),a=I();let l=D([]);const f=D([]);x(()=>a.state.searchStatus,()=>{l=a.getters.getSongResult,f.length=0;for(let t=0;t<l.length;t++)f.push({loved:!1,title:l[t].name,artist:l[t].ar,album:l[t].al,duration:l[t].dt,hot:l[t].pop,id:l[t].id,num:t+1,mvid:l[t].mv,fee:l[t].fee,copyright:l[t].privilege.cp})});const P=t=>{let o=new Date(t),s=o.getMinutes();s=s<10?"0"+s:s;let n=o.getSeconds();return n=n<10?"0"+n:n,s+":"+n},F=t=>{if(t.copyright==0){it({message:"\u8BE5\u6B4C\u66F2\u56E0\u7248\u6743\u6216\u4F1A\u5458\u539F\u56E0\uFF0C\u6682\u65F6\u65E0\u6CD5\u64AD\u653E\uFF0C\u656C\u8BF7\u8C05\u89E3",offset:250,duration:2e3,customClass:"cpMessage"});let o=document.querySelectorAll(".cpMessage.el-message");if(o)for(let s=0;s<o.length;s++)o[s].style.cssText=" --el-message-bg-color: #000; --el-message-border-color: #000; --el-message-text-color: #ec4141;";return}rt(t.id).then(o=>{let s=o.data[0].url;a.commit("setCurrentUrl",s),a.commit("pushRecent",{id:t.id,title:t.title,artist:t.artist,type:"\u6B4C\u66F2",time:+new Date,url:s}),a.commit("pushCurrentPlaylist",{id:t.id,title:t.title,artist:t.artist,from:"\u641C\u7D22",duration:t.duration,url:s}),a.commit("setCurrentSongId",t.id)})},V=b(()=>a.getters.getSongCount);let g=y(1);x(()=>g.value,()=>{A(h.params.keywords,(g.value-1)*50).then(t=>{a.commit("setSongResult",t.result.songs),a.commit("changeStatus")})});const $=t=>{v.push("/detail/artist/"+t)},q=t=>{v.push("/detail/album/"+t)},N=t=>{v.push("/detail/song/"+t)},T=t=>{if(t.copyright==0)return;let o={id:t.id,title:t.title,artist:t.artist,album:t.album,duration:t.duration};a.commit("pushFav",o)},U=t=>{a.commit("removeFav",t)};let j=b(()=>a.getters.getFav);const z=b(()=>function(t){return j.value.some(s=>s.id==t)});let w=y(!1),k=y();const O=(t,o,s)=>{X(),s.preventDefault();let n=document.querySelector(".rClickMenu");n.style.top=s.clientY-192+"px",n.style.left=s.clientX-422+"px",k.value=t},X=()=>{w.value=!0},Y=()=>{w.value=!1},G=(t,o,s)=>{let n=document.querySelector(".rClickMenu");s.path.includes(n)||Y()},H=()=>{F(k.value)};return(t,o)=>{const s=C("el-table-column"),n=C("el-progress"),J=C("el-table"),K=C("el-pagination"),Q=Z("loading");return u(),c(at,null,[i("div",dt,[E((u(),M(J,{data:m(f),style:{width:"100%"},"header-row-class-name":"tableheader",onRowDblclick:F,onRowContextmenu:O,onRowClick:G},{default:d(()=>[r(s,{label:"",width:"60",class:"icon"},{default:d(e=>[i("div",mt,[i("span",_t,p(e.row.num<10?"0"+e.row.num:e.row.num),1),m(z)(e.row.id)?(u(),c("i",{key:1,id:"loveIcon",class:"iconfont icon-aixin",title:"\u53D6\u6D88\u559C\u6B22",onClick:S=>U(e.row.id)},null,8,pt)):(u(),c("i",{key:0,id:"loveIcon",class:"iconfont icon-aixin1-copy",title:"\u559C\u6B22",onClick:S=>T(e.row)},null,8,gt))])]),_:1}),r(s,{label:"\u97F3\u4E50\u6807\u9898",width:"230",class:"title"},{default:d(e=>[i("div",{title:e.row.title},[e.row.copyright===0?(u(),c("div",vt,p(e.row.title),1)):(u(),c("div",ft,p(e.row.title),1)),e.row.fee==1&&e.row.copyright!=0?(u(),c("span",Ct,"\u8BD5\u542C")):e.row.fee==1&&e.row.copyright==0?(u(),c("span",yt,"VIP")):tt("",!0)],8,ht)]),_:1}),r(s,{label:"\u6B4C\u624B",width:"100","class-name":"artist"},{default:d(e=>[i("div",{title:e.row.artist[0].name,onClick:S=>$(e.row.artist[0].id)},p(e.row.artist[0].name),9,wt)]),_:1}),r(s,{label:"\u4E13\u8F91",width:"140","class-name":"album"},{default:d(e=>[i("div",{title:e.row.album.name,onClick:S=>q(e.row.album.id)},p(e.row.album.name),9,kt)]),_:1}),r(s,{label:"\u65F6\u957F",width:"60",class:"duration"},{default:d(e=>[et(p(P(e.row.duration)),1)]),_:1}),r(s,{label:"\u70ED\u5EA6",class:"hot"},{default:d(e=>[r(n,{percentage:e.row.hot,"show-text":!1,color:"#c8c8c8"},null,8,["percentage"])]),_:1})]),_:1},8,["data"])),[[Q,_.loading]]),E(i("div",St,[i("ul",null,[i("li",{class:"menuItem",onClick:o[0]||(o[0]=e=>N(m(k).id))},"\u67E5\u770B\u8BE6\u60C5"),i("li",{class:"menuItem",onClick:H},"\u64AD\u653E"),bt])],512),[[st,m(w)]])]),i("div",Ft,[r(K,{background:"",layout:"prev, pager, next","page-size":50,currentPage:m(g),"onUpdate:currentPage":o[1]||(o[1]=e=>ot(g)?g.value=e:g=e),total:m(V)},null,8,["currentPage","total"])])],64)}}});var xt=L(Dt,[["__scopeId","data-v-38273c80"]]);const Et=B({setup(_){const h=I(),v=R();let a=y(!1);return ut(()=>{A(v.params.keywords).then(l=>{a.value=!0,h.commit("setSongResult",l.result.songs),h.commit("setSongCount",l.result.songCount),h.commit("changeStatus"),a.value=!1})}),(l,f)=>(u(),M(xt,{loading:m(a)},null,8,["loading"]))}});var Lt=L(Et,[["__scopeId","data-v-4013f0cc"]]);export{Lt as default};