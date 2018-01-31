var oheader=document.getElementById("header");
var ofooter=document.getElementById("footer");
var oclang=document.getElementById("cLang");
oclang.onmouseover=function(){
	clearTimeout(toHide);
	oclang.className="active";
}
var toHide=null;
oclang.onmouseout=function(ev){
	var ev=ev||event;
	var tar=ev.toElement||ev.relatedTarget;
	if(oclang.contains(tar)){return;}
	toHide=setTimeout(function(){
		oclang.className="";
	},500);
}

var Ht;
var Wt;
function getSize(){
	Ht=document.documentElement.clientHeight||document.body.clientHeight;
	Wt=document.documentElement.clientWidth||document.body.clientWidth;
}
getSize();

var oSectionDiv=document.getElementById("section");

var odiv=document.getElementsByClassName("page");
var obox=document.getElementById("box");
var obtns=document.getElementById("navBtn").children;
var omp4=document.getElementById("phonemp4");
var index=0;
for(var i=0;i<obtns.length;i++){
	(function(a){
		obtns[i].onclick=function(){
			index=a;
			pageShow();
			oheader.className="headerHide";
		   ofooter.style.transform="translateY(100%)"
           
		}	
	})(i);
}
var first=true;
addMouseWheel(document,headerHide);
function headerHide(down){
	
	if(down){
		index++;

	}else{
		index--;
	}
	if(first){
		oheader.className="headerHide";
		first=false;
		index=0;
	}
	if(index<0&&!first){
		oheader.className="";
		first=true;
		index=0;
	}
	if(index>=4){
		index=4;
		var toptemp=ofooter.offsetHeight;
		ofooter.style.transform="translateY(0)"
		obox.style.top=-3*Ht-toptemp+"px";
		return;
	}else{
		ofooter.style.transform="translateY(100%)"

	}
	pageShow();
}
pageShow();
function pageShow(){
	for(var i=0;i<odiv.length;i++){
		odiv[i].style.width=Wt+"px";
		odiv[i].style.height=Ht+"px";
		obtns[i].className="";
	}
	obtns[index].className="active";
	obox.style.top=-index*Ht+"px";
	setTimeout(showCtrl,500);
}
var canPlay=true;
function showCtrl(){
	if(index>1){
		odiv[1].classList.remove("botShow");
		odiv[1].classList.add("topShow");	
	}else if(index<1){
		odiv[1].classList.add("botShow");	
		odiv[1].classList.remove("topShow");
	}
	if(index==1){
			odiv[1].classList.remove("botShow");
			odiv[1].classList.remove("topShow");
	}
	if(index==3){
		odiv[index].classList.add("active");
	}else if(index==2&&canPlay){
		omp4.play();
		canPlay=false;
	}else{
		odiv[3].classList.remove("active");
	}
}

var osels=document.getElementById("selClassify").getElementsByTagName("li");
var oimgbox=document.getElementsByClassName("imgbox")[0];
var oImgul=oimgbox.getElementsByTagName("ul");
var oOverview=document.getElementById("page1_text");
var arrH=[[".5",".35",".5",".35",".1",".38",".5"],[".5",".35",".1",".35",".5",".2",".5",".3"]];

imgShow();
// 给手机图片宽高，和鼠标滑动事件
function imgShow(){
	var oSelul=oimgbox.getElementsByClassName("isSel")[0]; 
	var olis=oSelul.children;
	var oimgs=oSelul.getElementsByTagName("img");
	var len=olis.length;
	var liWt=(obox.offsetWidth-(len+1)*10)/len;
	for(var i=0;i<len;i++){	
		oimgs[i].style.width=olis[i].style.width=liWt+"px";
		olis[i].style.height=liWt*1.9+"px";
		olis[i].index=i;
		addEvent(olis[i],"mouseover",fn1);
	}
	imgStrat();
	var maxt=oSelul.offsetHeight*.55;
	function fn1(){  
		var b=this.index;
		for(var j=0;j<len;j++){
			var ty=Math.abs(j-b)*30*Math.sqrt(Math.abs(j-b)/2)
			ty=ty>maxt?maxt:ty;
			// oimgs[j].style.transform="translateY("+ty+"px)"; 
			domove(oimgs[j],"top",ty);   
		}
	}
	function fn3(ev){
		var ev=ev||event;
		oSelul.style.transform="";
		removeEvent(this,"click", fn3);
		addEvent(oSelul,"mouseout",fn2);
		for(var i=0;i<len;i++){
			addEvent(olis[i],"mouseover",fn1);
		} 
		addEvent(oSelul,"click",fn4);
		oOverview.classList.remove("toTopHide");

	}
	addEvent(oSelul,"click",fn4)
	function fn4(ev){
		var ev=ev||event; 
		var tar=ev.target||ev.scrElement;
		if(tar.nodeName.toLowerCase()=="img"){     	
			var mul=Wt*.4/tar.offsetWidth;
			var post=(Wt/2-offsetL(tar.offsetParent))*mul;
			this.style.transform="translate("+post+"px,60%) scale("+mul+")";
			oOverview.classList.add("toTopHide");
			for(var i=0;i<len;i++){
				removeEvent(olis[i],"mouseover",fn1);
			} 
			removeEvent(oSelul,"mouseout",fn2);
			removeEvent(oSelul,"click",fn4);
			addEvent(odiv[0],"click",fn3); 
			flag=true; 
		}
		ev.cancelBubble=true;
	} 
}

// 获得所li中心到屏幕右边的距离
function offsetL(obj){
	return obj.offsetWidth/2+obj.getBoundingClientRect().left;
}

function imgStrat(){
	for(var i=0;i<arrH.length;i++){
		var oimgs=oImgul[i].getElementsByTagName("img");
		for(var j=0;j<arrH[i].length;j++){
			// oimgs[j].style.transform="translateY("+arrH[i][j]+")"
			var  toptemp=arrH[i][j]*oimgs[j].offsetHeight
			domove(oimgs[j],"top",toptemp);
		}
	}

}
function domove(obj,dir,target,fn){
	clearInterval(obj.timer);
	var step=target>obj.offsetTop?1:-1;
	var speed=obj.offsetTop;
	obj.timer=setInterval(function(){
		speed=speed+(target-speed)/10;
		if(step>0&&speed>=target||step<0&&speed<=target){
			speed=target;
			clearInterval(obj.timer);
		}
		obj.style[dir]=speed+"px";
	},17);

}
// 第一页选择手机版本选项卡
for(var i=0;i<osels.length;i++){
	(function(a){
		osels[i].onclick=function(){
			for(var i=0;i<osels.length;i++){
				osels[i].className="";
				oImgul[i].className=""
			}
			osels[a].className="selPhone";
			oImgul[a].className="isSel";
			imgShow();
		}	
	})(i);
	addEvent(oImgul[i],"mouseout",fn2);
}
function fn2(ev){
	var ev=ev||event;
	var tar=ev.toElement||ev.relatedTarget;
	if(this.contains(tar)){return;}
	imgStrat();
	stopBubble(ev);
}

// 第二页选项卡
var ocolorBox=document.getElementById("colorbox");
var ocolor=ocolorBox.children;
var oDimgBox=document.getElementsByClassName("designImg")[0];
var oDimg01=document.getElementById("DImg01");
var oDimg02=document.getElementById("DImg02");
var odesignlis=document.getElementById("designClassify").getElementsByTagName("li");
for(var i=0;i<odesignlis.length;i++){
	(function(a){
		odesignlis[i].onclick=function(){
			selIndex=a;
			canSel(); 
			imgColorChange();
		}

		
	})(i);
	
}
//第二页双层选项卡
var selIndex=0,colorIndex=0;
canSel();
function canSel(){
	colorIndex=0;
	for(var i=0;i<odesignlis.length;i++){
		ocolor[i].className="";    
		odesignlis[i].className="";   
	}
	odesignlis[selIndex].className="selPhone"; 
	ocolor[selIndex].className="colorShow"; 
	var colorlis=ocolor[selIndex].getElementsByTagName("li");
	for(var j=0;j<colorlis.length;j++){
		(function(b){
			colorlis[j].onclick=function(){
				colorIndex=b;
				imgColorChange();
			}
		})(j); 
	}

}
function imgColorChange(){
	var colorlis=ocolor[selIndex].getElementsByTagName("li");
	for(var j=0;j<colorlis.length;j++){
		colorlis[j].className="";
	}
	colorlis[colorIndex].className="selColor";
	var str=colorlis[colorIndex].getAttribute("id");
	oDimgBox.classList.remove("imgChange");
	setTimeout(function(){oDimgBox.classList.add("imgChange");},5);
	setTimeout(function(){
		oDimg01.src="img/overview/colorful/"+str.substring(str.lastIndexOf("-")+1)+"1.png ";
		oDimg02.src="img/overview/colorful/"+str.substring(str.lastIndexOf("-")+1)+"2.png ";
	},150);

}

function setSize(){
	getSize();
	odiv[index].style.width=oSectionDiv.style.width=Wt+"px";
	odiv[index].style.height=oSectionDiv.style.height=Ht+"px";
	imgShow();
}
setSize();
window.onresize=setSize;


function addEvent(obj,events,fn){
	if(obj.addEventListener){
		obj.addEventListener(events,fn,false);
	}else{
		obj.attachEvent("on"+event,function(){
			fn.bind(obj);
		});
	}
}
function removeEvent(obj,events,fn){
	if(obj.removeEventListener){
		obj.removeEventListener(events,fn,false);
	}else{
		obj.detachEvent("on"+events,fn);
	}
}
//阻止事件冒泡
function stopBubble(e){
	  if(e&&e.stopPropagation){//非IE
	  	e.stopPropagation();
	  }else{//IE
	  	window.event.cancelBubble=true;
	  }
	} 

//阻止浏览器默认行为
function stopDefault( e ) {
         //阻止默认浏览器动作(W3C)
         if ( e && e.preventDefault ){
         	e.preventDefault();
         }else{ 
         //IE中阻止函数器默认动作的方式
         window.event.returnValue = false;
     }
     return false;
 }
 var canwheel=true;

 function addMouseWheel(obj, fn){  

 	function fnWheel(ev){
 		var ev=ev||event;
 		var down=true;
 		if (!canwheel) {
 			return false;
 		}
 			canwheel=false;
 			if(ev.wheelDelta)
 			{
 				down=ev.wheelDelta<0?true:false;
 			}
 			else
 			{
 				down=ev.detail<0?false:true;
 			}

 			fn(down);

 			setTimeout(function(){canwheel=true;},100);


 			ev.preventDefault && ev.preventDefault();
 			return false;
 		
 	}
 	if(navigator.userAgent.toLowerCase().indexOf('firefox')!=-1)
 	{
 		obj.addEventListener('DOMMouseScroll', fnWheel, false);
 	}
 	else
 	{
 		obj.onmousewheel=fnWheel;
 	}
 }

