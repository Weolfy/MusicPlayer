import{r}from"./request.985c1484.js";function e(t){return r({method:"post",url:"/artists",params:{id:t}})}function n(t){return r({method:"post",url:"/artist/mv",params:{id:t}})}function u(t,a=10){return r({method:"post",url:"/artist/album",params:{id:t,limit:a}})}function i(t){return r({method:"post",url:"/album",params:{id:t}})}function m(t){return r({method:"post",url:"/playlist/detail",params:{id:t}})}function l(t){return r({method:"post",url:"/playlist/track/all",params:{id:t}})}function p(t){return r({method:"post",url:"/dj/detail",params:{rid:t}})}function g(t,a=10,s=0){return r({method:"post",url:"/dj/program",params:{rid:t,limit:a,offset:s}})}function d(t){return r({method:"post",url:"/dj/program/detail",params:{id:t}})}function c(t){return r({method:"post",url:"/lyric",params:{id:t}})}export{e as a,n as b,u as c,i as d,m as e,l as f,c as g,g as h,d as i,p as j};