import{d as O,k as j,u as z,a as X,D as Y,C as b,l as k,r as f,o as a,c,e as s,b as r,w as d,t as m,s as p,g as G,i as H,q as J,z as K,p as Q,j as W,M as Z}from"./index.ea9520da.js";import{g as w}from"./play.d3e5bd87.js";import{_ as L}from"./plugin-vue_export-helper.21dcd24c.js";const ee=v=>(Q("data-v-10d2b9b6"),v=v(),W(),v),te={class:"table"},le={class:"buttons"},oe={style:{display:"flex","align-items":"center","justify-content":"space-between"}},ue={class:"num"},ne=["onClick"],se=["onClick"],ie=["title"],re={key:0,class:"noCopyright"},ae={key:1},ce={key:2,class:"trialTags"},de={key:3,class:"trialTags"},me=["title","onClick"],ve=["title","onClick"],pe={class:"rClickMenu"},_e=ee(()=>s("li",{class:"menuItem"},"\u4E0B\u4E00\u9996\u64AD\u653E",-1)),Ce=O({props:["dataList"],setup(v){const E=v;j();const _=z(),n=X();let{dataList:t}=Y(E);const D=e=>{let u=new Date(e),l=u.getMinutes();l=l<10?"0"+l:l;let i=u.getSeconds();return i=i<10?"0"+i:i,l+":"+i},y=e=>{if(e.privilege.cp==0){Z({message:"\u8BE5\u6B4C\u66F2\u56E0\u7248\u6743\u6216\u4F1A\u5458\u539F\u56E0\uFF0C\u6682\u65F6\u65E0\u6CD5\u64AD\u653E\uFF0C\u656C\u8BF7\u8C05\u89E3",offset:250,duration:2e3,customClass:"cpMessage"});let u=document.querySelectorAll(".cpMessage.el-message");if(u)for(let l=0;l<u.length;l++)u[l].style.cssText=" --el-message-bg-color: #000; --el-message-border-color: #000; --el-message-text-color: #ec4141;";return}w(e.id).then(u=>{let l=u.data[0].url;n.commit("setCurrentUrl",l),n.commit("pushRecent",{id:e.id,title:e.name,artist:e.ar,type:"\u6B4C\u66F2",time:+new Date,url:l}),n.commit("pushCurrentPlaylist",{id:e.id,title:e.name,artist:e.ar,from:"\u8BE6\u60C5",duration:e.dt,url:l}),n.commit("setCurrentSongId",e.id)})},F=e=>{_.push("/detail/artist/"+e)},x=e=>{_.push("/detail/album/"+e)},B=e=>{_.push("/detail/song/"+e)},S=e=>{if(e.privilege.cp==0)return;let u={id:e.id,title:e.name,artist:e.ar,album:e.al,duration:e.dt};n.commit("pushFav",u)},I=e=>{n.commit("removeFav",e)};let A=b(()=>n.getters.getFav);const M=b(()=>function(e){return A.value.some(l=>l.id==e)});let C=k(!1),g=k();const R=(e,u,l)=>{P(),l.preventDefault();let i=document.querySelector(".rClickMenu");i.style.top=l.clientY-192+"px",i.style.left=l.clientX-422+"px",g.value=e},P=()=>{C.value=!0},T=()=>{C.value=!1},$=(e,u,l)=>{let i=document.querySelector(".rClickMenu");l.path.includes(i)||T()},U=()=>{y(g.value)},V=async()=>{n.commit("clearPlaylist");for(let e=0;e<(t==null?void 0:t.value.length);e++){let l=(await w(t==null?void 0:t.value[e].id)).data[0].url;n.commit("pushCurrentPlaylistOrder",{id:t==null?void 0:t.value[e].id,title:t==null?void 0:t.value[e].name,artist:t==null?void 0:t.value[e].ar,from:"\u8BE6\u60C5",duration:t==null?void 0:t.value[e].dt,url:l}),e==0&&(n.commit("setCurrentUrl",l),n.commit("pushRecent",{id:t==null?void 0:t.value[e].id,title:t==null?void 0:t.value[e].name,artist:t==null?void 0:t.value[e].ar,type:"\u6B4C\u66F2",time:+new Date}),n.commit("setCurrentSongId",t==null?void 0:t.value[e].id))}},q=async()=>{for(let e=0;e<(t==null?void 0:t.value.length);e++){let l=(await w(t==null?void 0:t.value[e].id)).data[0].url;n.commit("pushCurrentPlaylistOrder",{id:t==null?void 0:t.value[e].id,title:t==null?void 0:t.value[e].name,artist:t==null?void 0:t.value[e].ar,from:"\u8BE6\u60C5",duration:t==null?void 0:t.value[e].dt,url:l})}};return(e,u)=>{const l=f("el-table-column"),i=f("el-progress"),N=f("el-table");return a(),c("div",te,[s("div",le,[s("div",{class:"button",onClick:u[0]||(u[0]=o=>V())},"\u5168\u90E8\u64AD\u653E"),s("div",{class:"button",onClick:u[1]||(u[1]=o=>q())},"\u6DFB\u52A0\u5230\u64AD\u653E\u5217\u8868")]),r(N,{data:p(t),stripe:"",style:{width:"100%"},"header-row-class-name":"tableheader",onRowDblclick:y,onRowContextmenu:R,onRowClick:$},{default:d(()=>[r(l,{type:"index",index:1,width:"35"}),r(l,{label:"",width:"30",class:"icon"},{default:d(o=>[s("div",oe,[s("span",ue,m(o.row.index<10?"0"+o.row.index:o.row.index),1),p(M)(o.row.id)?(a(),c("i",{key:1,id:"loveIcon",class:"iconfont icon-aixin",title:"\u53D6\u6D88\u559C\u6B22",onClick:h=>I(o.row.id)},null,8,se)):(a(),c("i",{key:0,id:"loveIcon",class:"iconfont icon-aixin1-copy",title:"\u559C\u6B22",onClick:h=>S(o.row)},null,8,ne))])]),_:1}),r(l,{label:"\u97F3\u4E50\u6807\u9898",width:"230",class:"title"},{default:d(o=>[s("div",{title:o.row.name},[o.row.privilege.cp===0?(a(),c("div",re,m(o.row.name),1)):(a(),c("div",ae,m(o.row.name),1)),o.row.fee==1&&o.row.privilege.cp!=0?(a(),c("span",ce,"\u8BD5\u542C")):o.row.fee==1&&o.row.privilege.cp==0?(a(),c("span",de,"VIP")):G("",!0)],8,ie)]),_:1}),r(l,{label:"\u6B4C\u624B",width:"100","class-name":"artist"},{default:d(o=>[s("div",{title:o.row.ar[0].name,onClick:h=>F(o.row.ar[0].id)},m(o.row.ar[0].name),9,me)]),_:1}),r(l,{label:"\u4E13\u8F91",width:"140","class-name":"album"},{default:d(o=>[s("div",{title:o.row.al.name,onClick:h=>x(o.row.al.id)},m(o.row.al.name),9,ve)]),_:1}),r(l,{label:"\u65F6\u957F",width:"60",class:"duration"},{default:d(o=>[H(m(D(o.row.dt)),1)]),_:1}),r(l,{label:"\u70ED\u5EA6",class:"hot"},{default:d(o=>[r(i,{percentage:o.row.pop,"show-text":!1,color:"#c8c8c8"},null,8,["percentage"])]),_:1})]),_:1},8,["data"]),J(s("div",pe,[s("ul",null,[s("li",{class:"menuItem",onClick:u[2]||(u[2]=o=>B(p(g).id))},"\u67E5\u770B\u8BE6\u60C5"),s("li",{class:"menuItem",onClick:U},"\u64AD\u653E"),_e])],512),[[K,p(C)]])])}}});var we=L(Ce,[["__scopeId","data-v-10d2b9b6"]]);export{we as S};