import{d as v,a as g,k as b,u as f,C as k,l as B,n as V,m as I,r as l,o as r,A as m,w as L,c as y,f as N,s as S,F as w,e as o,t as A,b as h,i as D,p as F,j as R}from"./index.ea9520da.js";import{_ as x}from"./plugin-vue_export-helper.21dcd24c.js";const j=v({setup(e){const n=g(),t=b(),u=f(),p=k(()=>n.getters.getTabList),a=B(""),d=()=>{a.value=t.meta.base},C=(i,c)=>{const{props:_}=i;u.push({path:"/search/result"+_.name+t.params.keywords})};return V(()=>t.path,()=>{d()}),I(()=>{d()}),(i,c)=>{const _=l("el-tab-pane"),T=l("el-tabs");return r(),m(T,{modelValue:a.value,"onUpdate:modelValue":c[0]||(c[0]=s=>a.value=s),class:"demo-tabs",onTabClick:C},{default:L(()=>[(r(!0),y(w,null,N(S(p),s=>(r(),m(_,{label:s.title,name:s.path,key:s.path},null,8,["label","name"]))),128))]),_:1},8,["modelValue"])}}});var E=x(j,[["__scopeId","data-v-3b1bf13a"]]);const M=e=>(F("data-v-2db0d884"),e=e(),R(),e),U={id:"title"},$=D("\u641C\u7D22 "),q=M(()=>o("br",null,null,-1)),z={class:"searchLayout"},G={id:"searchTable"},H=v({props:["searchTitle"],setup(e){const n=b();f();let t=k(()=>n.params.keywords);return(u,p)=>{const a=l("router-view");return r(),y(w,null,[o("div",U,[$,o("span",null,A(S(t)),1)]),q,o("div",z,[h(E),o("div",G,[h(a)])])],64)}}});var O=x(H,[["__scopeId","data-v-2db0d884"]]);export{O as default};
