(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[449],{29776:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/farm/[farmId]/crop/[cropId]",function(){return s(70279)}])},24915:function(e,t,s){"use strict";s.d(t,{Z:function(){return p}});var a=s(85893),r=s(67294);s(67814);var n=s(78603),l=s(73032),i=s(46897),c=s(59417),o=s(95867),d=s(61590),x=s(61463),m=s(25720),u=s(1040);function f(e){let{documents:t}=e;console.log("debug:",t);try{let e=t.map(e=>(console.log("debug:",e),(0,a.jsx)("div",{className:"flex",children:(0,a.jsx)("a",{target:"_blank",href:"https://ipfs.io/ipfs/"+e.hash,rel:"noopener noreferrer",children:(0,a.jsx)(i.Z,{icon:c.gMD,text:e.name})})})));return(0,a.jsx)("div",{className:"px-4 py-2",children:(0,a.jsx)("div",{className:" mx-2 my-2",children:e})})}catch(e){return(0,a.jsx)(a.Fragment,{})}}function p(e){let{challenge:t,status:s,auth:p,full:h=!0}=e;console.log("challenge",t);let{loading:j,setLoading:g}=(0,r.useContext)(l.O),{snackbarInfo:y,setSnackbarInfo:w}=(0,r.useContext)(o.S),[v,b]=(0,r.useState)(null),[N,k]=(0,r.useState)(null),S=async e=>{g(!0);try{1==e?await (0,n.uG)(p,"claimChallenge",[t.id]):2==e?await (0,n.uG)(p,"giveVerdict",[t.id,(0,n.d_)("SUCCESSFUL")]):await (0,n.uG)(p,"giveVerdict",[t.id,(0,n.d_)("REJECTED")])}catch(e){w({...y,open:!0,message:"Failure"})}g(!1)};async function Z(){var e;let s={},a=await (0,n.uG)(p,"crops",[parseInt(null==t?void 0:null===(e=t.challenged)||void 0===e?void 0:e._hex)]);s.crop=a.data,a=await (0,n.uG)(p,"farms",[parseInt(a.data.id._hex)]),s.farm=a.data,k(s)}return(0,r.useEffect)(()=>{h&&Z()},[]),(0,a.jsx)("div",{children:(0,a.jsx)("div",{className:"flex-none bg-white rounded-lg shadow-lg mr-6 p-4 w-full border-l-4 ".concat((0,n.z2)(t.status)),children:(0,a.jsxs)("div",{className:"flex flex-col justify-evenly py-2 px-2",children:[h&&(0,a.jsxs)("div",{className:"flex justify-between mb-4 items-center",children:[N&&(0,a.jsx)("p",{className:"text-xl font-bold whitespace-nowrap overflow-hidden text-ellipsis",children:N.farm.name}),(0,a.jsx)(d.Z,{anchor:(0,a.jsx)("div",{className:"right-4 top-4",children:(0,a.jsx)(m.Z,{icon:c.YHc,styles:"!bg-yellow !w-6 !h-6"})}),popover:(0,a.jsx)(x.Z,{stake:N,full:!1})})]}),(0,a.jsx)("div",{className:"flex justify-between border-".concat(h?"y":"b","-[1.5px] border-darkGray mb-5"),children:(0,a.jsx)("p",{className:"text-md font-bold text-gray/80 font-comfortaa text-justify py-2.5 h-24 overflow-hidden",children:t.description})}),(0,a.jsx)("a",{children:(0,a.jsx)(d.Z,{anchor:(0,a.jsx)(i.Z,{text:"Supporting Documents",icon:c.Pk,style:"text-blue",textStyle:"!text-blue"}),popover:(0,a.jsx)(f,{documents:t.documents?JSON.parse(t.documents).proofs:""})})}),(0,a.jsxs)("div",{className:"".concat(h?"mt-4":""," flex-row flex gap-2"),children:[0==s&&(0,a.jsx)(u.Z,{text:"Accept",styles:"text-sm px-6 py-2",onClick:()=>S(1)}),1==s&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(m.Z,{icon:c.LEp,styles:"!bg-primary",onClick:()=>S(2)}),(0,a.jsx)(m.Z,{icon:c.g82,styles:"!bg-red",onClick:()=>S(3)})]})]})]})})})}s(19806)},61463:function(e,t,s){"use strict";var a=s(85893),r=s(41664),n=s.n(r),l=s(93024),i=s(59417),c=s(89032),o=s(46897);let d=e=>{let{stake:t,full:s=!0}=e,r=JSON.parse(t.crop.details),d=new Date(1e3*r.sowedOn),x=d.toLocaleDateString(),m=parseInt(d.getMonth())+parseInt(r.duration)+c.J8;return(0,a.jsx)(n(),{href:"/farm/".concat(t.farm.id,"/crop/").concat(t.cropId),children:(0,a.jsx)("div",{className:"p-6 w-full max-w-72 flex-none bg-white rounded-xl shadow-lg mr-6 hover:scale-[101%]",children:(0,a.jsxs)("div",{className:"flex flex-col justify-evenly",children:[s&&(0,a.jsx)("div",{className:"flex justify-between",children:(0,a.jsx)("p",{className:"text-xl font-bold text-gray-800 font-comfortaa whitespace-nowrap text-ellipsis overflow-hidden",title:t.farm.name,children:t.farm.name})}),s&&(0,a.jsx)("hr",{className:"my-2"}),(0,a.jsxs)("section",{className:"flex flex-col gap-1 font-medium",children:[(0,a.jsx)(o.Z,{text:r.name,icon:l.U27,style:"text-brown"}),s&&(0,a.jsx)(o.Z,{text:"".concat(parseInt(t.crop.stakeAmount._hex),"/- staked"),icon:i.egO,style:"text-primary",textStyle:"text-primary"}),(0,a.jsx)(o.Z,{text:x,icon:i.WRo}),(0,a.jsx)(o.Z,{text:"".concat(m,"M (to mature)"),icon:i.OqI}),(0,a.jsx)(o.Z,{text:t.farm.location,icon:i.opg,style:"text-red"})]})]})})})};t.Z=d},49485:function(e,t,s){"use strict";s.d(t,{Z:function(){return l}});var a=s(85893),r=s(86529),n=s(25720);function l(e){let{children:t,responsive:s}=e;return(0,a.jsx)(r.default,{className:"!overflow-visible",swipeable:!0,draggable:!1,responsive:s,keyBoardControl:!0,customTransition:"transform 300ms ease-in-out",transitionDuration:500,containerClass:"carousel-container",removeArrowOnDeviceType:["sm","xs"],dotListClass:"carousel-dot-list",itemClass:"mx-4",centerMode:!0,customRightArrow:(0,a.jsx)(n.Z,{styles:"react-multiple-carousel__arrow react-multiple-carousel__arrow--right !bg-darkGray/30 hover:!bg-darkGray/60 z-0"}),customLeftArrow:(0,a.jsx)(n.Z,{styles:"react-multiple-carousel__arrow react-multiple-carousel__arrow--left !bg-darkGray/30 hover:!bg-darkGray/60 z-0"}),children:t})}},82349:function(e,t,s){"use strict";s.d(t,{Z:function(){return l}});var a=s(85893),r=s(25675),n=s.n(r);function l(e){let{text:t}=e;return(0,a.jsxs)("div",{className:"items-center flex flex-col w-[20vw] min-w-[280px] my-4",children:[(0,a.jsx)(n(),{src:"/em.gif",width:0,height:0,className:"w-[15vw] min-w-[280px] bg-blend-multiply",alt:"Empty"}),(0,a.jsx)("p",{className:"text-gray text-center max-w-[200px]",children:t})]})}},91671:function(e,t,s){"use strict";s.d(t,{Z:function(){return r}});var a=s(85893);function r(e){let{profile:t,onlyPic:s}=e;return t=JSON.parse(t),console.log("https://ipfs.io/ipfs/".concat(t.profilePic),"Profile pic url"),(0,a.jsx)(a.Fragment,{children:s?(0,a.jsx)("img",{src:"https://ipfs.io/ipfs/".concat(t.profilePic),className:"rounded-full w-[60px] h-[60px]",onError:e=>e.currentTarget.src="/images/jonathan.png"}):(0,a.jsxs)("div",{className:"flex items-center gap-8 px-8 py-4",children:[(0,a.jsx)("div",{className:"mr-4",children:(0,a.jsx)("img",{src:"https://ipfs.io/ipfs/".concat(t.profilePic),className:"rounded-full w-[60px] h-[60px]",onError:e=>e.currentTarget.src="/images/jonathan.png"})}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-darkGray text-2xl font-bold",children:t.name}),(0,a.jsx)("p",{className:"text-gray text-base font-bold",children:t.email})]})]})})}s(78603)},25720:function(e,t,s){"use strict";s.d(t,{Z:function(){return n}});var a=s(85893),r=s(67814);function n(e){let{icon:t,styles:s,onClick:n}=e;return(0,a.jsx)("div",{onClick:n,class:"".concat(null!=s?s:""," flex justify-center items-center text-white bg-gray rounded-full w-8 h-8 hover:scale-105 cursor-pointer"),children:t&&(0,a.jsx)(r.G,{icon:t})})}},70279:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return D}});var a=s(85893),r=s(11163),n=s(67294),l=s(41664),i=s.n(l),c=s(67814),o=s(59417),d=s(13314),x=s(77365),m=s(46897);function u(e){let{details:t,...s}=e;return(0,a.jsxs)("div",{className:"flex flex-col gap-2.5 py-6 px-5 shadow-lg rounded-2xl w-full cursor-pointer hover:scale-105",...s,children:[(0,a.jsx)(m.Z,{icon:o.Stf,text:t.name,style:"!w-[32px] !h-[32px]",textStyle:"font-semibold text-xl"}),(0,a.jsx)(m.Z,{icon:o.olY,text:t.id._hex,style:"text-gray !w-[18px] !h-[18px]",iconDivStyle:"w-[32px]",textStyle:"!text-gray font-bold"})]})}var f=s(91671),p=s(1040),h=s(78603),j=s(95867),g=s(73032),y=s(24915),w=s(25720);s(82349);var v=s(61590),b=s(1653);function N(e){let{value:t}=e,s=()=>{};return(0,a.jsxs)("div",{className:"p-6 rounded-xl",children:[(0,a.jsx)("p",{className:"text-primary text-lg font-bold",children:"QR"}),(0,a.jsx)("div",{children:(0,a.jsx)(b.Z,{value:t,className:"w-full",size:128,id:"qr-img"})}),(0,a.jsx)("div",{className:"flex mt-2 justify-center",children:(0,a.jsx)(w.Z,{icon:o.q7m,onClick:()=>s(),styles:"bg-transparent !text-gray"})})]})}var k=s(49485),S=s(89032),Z=s(78840),C=s.n(Z);s(18393);var _=s(75708),G=s.n(_);function I(e){let{sensorData:t}=e,s=Object.keys(t[0].data);var r=[];s.map(e=>{let s={},a=[];t.map(t=>{let s=new Date(1e3*t.time),r=t.data[e];s=Date.UTC(s.getFullYear(),s.getMonth(),s.getDate()),a.push([s,r])}),s.name=e,s.data=a,r.push(s)});let[l,i]=(0,n.useState)(r[s[0]]);return(0,a.jsx)("div",{className:" shadow-2xl w-[70vw]",children:(0,a.jsx)(G(),{highcharts:C(),options:{chart:{type:"spline"},title:{text:"Sensor Data"},subtitle:{text:""},xAxis:{type:"datetime",dateTimeLabelFormats:{month:"%e. %b",year:"%b"},title:{text:"Date"}},yAxis:{title:{text:"Sensor Readings"},min:0},tooltip:{headerFormat:"<b>{series.name}</b><br>",pointFormat:"{point.x:%e. %b}: {point.y:.2f} m"},plotOptions:{series:{marker:{enabled:!0,radius:2.5}}},series:r}})})}s(33884),s(67091);let E=()=>{var e;let t=(0,r.useRouter)(),{farmId:s,cropId:l}=t.query,b=(0,x.a)(),[Z,C]=(0,n.useState)(null),{snackbarInfo:_,setSnackbarInfo:G}=(0,n.useContext)(j.S),[E,D]=(0,n.useState)(!0),{loading:O,setLoading:F}=(0,n.useContext)(g.O),[A,T]=(0,n.useState)(!1),[P,J]=(0,n.useState)(""),[z,R]=(0,n.useState)(null),[L,M]=(0,n.useState)(!1),[q,U]=(0,n.useState)(!1),[Y,B]=(0,n.useState)(!1),[V,W]=(0,n.useState)([{time:1676460952,data:{temperature:30,humidity:50,light:120}},{time:1676633752,data:{temperature:50,humidity:10,light:100}},{time:1676806552,data:{temperature:20,humidity:50,light:190}}]);async function X(){let e;F(!0);let t={};try{for(let s of(e=await (0,h.uG)(b,"crops",[l]),t.crop={...e.data,...JSON.parse(e.data.details)},t.farmId=Number(e.data.farmId),e=await (0,h.uG)(b,"fetchCropStakes",[l]),e=await (0,h.uG)(b,"farms",[t.farmId]),t.farm=e.data,e=await (0,h.uG)(b,"farmers",[t.farm.farmerId]),t.farmerProfile=e.data.profile,e=await (0,h.uG)(b,"fetchCropSensors",[l]),t.sensors=e.data,e=await (0,h.uG)(b,"fetchCropStakes",[l]),t.stakes=e.data,e=await (0,h.uG)(b,"fetchCropChallenges",[l]),t.challenges=e.data,t.challenges))s.challenged==l&&3==s.status&&B(!0);for(let s of(t.stakeholders=[],t.stakes)){e=await (0,h.uG)(b,"addressToFarmerIds",[s.stakeholder]);let a=parseInt(e.data._hex);e=await (0,h.uG)(b,"farmers",[a]),t.stakeholders.push(e.data)}if(e=await (0,h.uG)(b,"fetchUserType"),"farmer"==e.data){let e=await (0,h.uG)(b,"addressToFarmerIds",[b.user.address]);parseInt(t.farm.farmerId._hex)==parseInt(e.data._hex)&&M(!0)}if(C(t),t.sensors.length>0&&(e=await (0,h.uG)(b,"sensors",[parseInt(t.sensors[0].id._hex)]),console.log("sensors",e.data.data)),null!=e.data.data){console.log("sensors2",e.data.data),e=await fetch("https://ipfs.io/ipfs/".concat(e.data.data));let t=await e.json();console.log("sensors1",t),W(t)}}catch(e){G({..._,open:!0,message:"Error ".concat(e.code,": ").concat(e.message)})}F(!1)}return(0,n.useEffect)(()=>{b.user&&X()},[b.user,b.loading]),(0,a.jsx)(a.Fragment,{children:Z&&(0,a.jsxs)("div",{children:[Y&&(0,a.jsx)(d.Z,{severity:"warning",className:"mb-10 text-comfortaa fixed bottom-0 z-10 left-10",children:"A challenge against this crop has be verified to be true"}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:" fixed flex-col inset-0 z-10 backdrop-blur-xl space-y-4 shadow-2xl  h-screen w-screen justify-center items-center "+(E?"hidden":"flex"),children:[(0,a.jsx)(I,{sensorData:V}),(0,a.jsx)(p.Z,{text:"Close",onClick:()=>D(!0),children:"Close"})]}),(0,a.jsx)(i(),{href:"/farm/"+Z.farmId,children:(0,a.jsx)("h1",{children:Z.farm.name})}),(0,a.jsxs)("div",{className:"flex mb-10 opacity-".concat(Y?"50":"100"),children:[(0,a.jsx)("div",{className:"shrink hidden md:flex",children:(0,a.jsx)("img",{src:"/images/plant.png",className:"mr-10 my-auto object-fill"})}),(0,a.jsxs)("div",{className:"grow",children:[(0,a.jsx)("div",{children:(0,a.jsxs)("div",{className:"flex justify-between items-start xl:items-center pt-4 flex-col xl:flex-row",children:[(0,a.jsxs)("div",{className:"flex justify-center gap-4 flex-col max-w-[320px]",children:[(0,a.jsxs)("div",{className:"flex flex-row justify-between",children:[(0,a.jsx)("h2",{className:"mb-0",children:Z.crop.name}),(0,a.jsx)(v.Z,{anchor:(0,a.jsx)(c.G,{icon:o.rtB,className:"text-gray !w-[32px] !h-[32px]"}),popover:(0,a.jsx)(N,{value:"".concat(S.M5,"/farm/").concat(s,"/crop/").concat(l)})})]}),(0,a.jsxs)("div",{className:"flex flex-row gap-10",children:[(0,a.jsx)(m.Z,{icon:o.opg,text:Z.farm.location,style:"text-red"}),(0,a.jsx)(m.Z,{icon:o.OS1,text:"".concat(Z.crop.size," Acre"),style:"text-gray"})]})]}),(0,a.jsx)("div",{children:L?(0,a.jsx)("div",{}):(0,a.jsx)(i(),{href:"/farm/".concat(s,"/crop/").concat(l,"/challenge"),children:(0,a.jsx)(p.Z,{text:"Challenge",icon:o.WA2,styles:"bg-red !px-8 !justify-between !py-2 !gap-3 mt-4 xl:mt-0"})})})]})}),(0,a.jsx)("div",{className:"my-20",children:(0,a.jsx)(f.Z,{profile:Z.farmerProfile})}),(0,a.jsxs)("div",{className:"flex flex-row gap-10 items-center mb-2",children:[(0,a.jsx)("h3",{className:"mb-0",children:"Sensors"}),L&&(0,a.jsx)(i(),{href:"/farm/".concat(s,"/crop/").concat(l,"/sensor/add"),children:(0,a.jsx)(w.Z,{icon:o.r8p,styles:"!w-6 !h-6"})})]}),(0,a.jsx)("div",{className:"grid grid-cols-1: sm:grid-cols-2 gap-10",children:Z.sensors.length>0?Z.sensors.map(e=>(0,a.jsx)(u,{onClick:()=>{D(!1)},details:e})):(0,a.jsx)("p",{className:"text-gray text-center max-w-[200px]",children:"No sensor added yet!"})}),(0,a.jsx)("h3",{className:"mt-10 mb-0",children:"Stakeholders"}),(0,a.jsxs)("div",{className:"flex mt-2 items-center",children:[(0,a.jsx)(c.G,{icon:o.aj4,className:"text-gray w-[26px] h-[26px] mr-4"}),"\xa0",(0,a.jsxs)("p",{className:"",children:[(0,a.jsxs)("span",{className:"text-primary font-semibold",children:[parseInt(Z.crop.stakeAmount._hex),"/-"]})," each"]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{className:"flex my-3 gap-3",children:Z.stakeholders.map(e=>(0,a.jsx)(f.Z,{profile:e.profile,onlyPic:!0}))}),(0,a.jsxs)("div",{className:"flex mt-10 flex-wrap justify-start items-start gap-x-2",children:[L?(0,a.jsx)("div",{}):(0,a.jsx)(p.Z,{text:"Sponsor",icon:o.owJ,styles:"!px-8 !justify-between !py-2 !gap-3 mt-4 xl:mt-0",onClick:async()=>{F(!0);try{await (0,h.uG)(b,"addStake",[l,{value:parseInt(Z.crop.stakeAmount._hex)}])}catch(e){G({..._,open:!0,message:"Error ".concat(e.code,": ").concat(e.message)})}F(!1)}}),(0,a.jsx)(p.Z,{text:"Request Sponsorship",icon:o.owJ,styles:"!px-8 !justify-between !py-2 !gap-3 mt-4 xl:mt-0",onClick:async()=>{F(!0);try{await (0,h.i6)("sub","bod")}catch(e){G({..._,open:!0,message:"Error ".concat(e.code,": ").concat(e.message)})}F(!1)}})]})]})]})]}),(0,a.jsx)("div",{children:Z.challenges.length>0&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("h3",{children:"Pending Challenges"}),(0,a.jsx)("div",{className:"static my-8",children:(0,a.jsx)(k.Z,{responsive:h.Db,children:null===(e=Z.challenges)||void 0===e?void 0:e.map((e,t)=>(0,a.jsx)(y.Z,{challenge:e,full:!1},t))})})]})})]})]})})};var D=E},72950:function(){},22868:function(){},14777:function(){},99830:function(){},70209:function(){}},function(e){e.O(0,[296,948,898,185,524,805,33,774,888,179],function(){return e(e.s=29776)}),_N_E=e.O()}]);