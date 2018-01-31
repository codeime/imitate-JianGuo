(function (){
	var audio = new Audio();
	var audioContext,analyser,sourceNode,freqArray,nowbtn,num,k,m,n,imgs;
	var  nextBtn=document.getElementById("nextbtn");
	var  lastBtn=document.getElementById("lastbtn");
	var  stopBtn=document.getElementById("stopbtn");


	var musicList = [
	'mp3/find.mp3'
	];

	function int(){
		audio.pause();
		audio = null;
		audio = new Audio();
	}

	var index=0;
	nextBtn.onclick = function(){
		index++;
		index%=musicList.length;
		playCtrl();	
	};
	lastBtn.onclick=function(){
		index--;
		if(index<0){
			index=musicList.length-1;
		}
		playCtrl();	

	}
	function playCtrl(){
		int();
		audio.src = musicList[index];
		imgs=document.getElementsByClassName("isSel")[0].getElementsByTagName("img");
		play();
		stopBtn.innerHTML="●";
		isStop=false;
	}
	var isStop=true;
	stopBtn.onclick = function(){
		if(isStop){
			playCtrl();
			
		}else{
			int();
		audio.pause();
			this.innerHTML="■";
            isStop=true;
		}
		
	}

			    //监听音频加载完成触发的事件
			    function play(){
			    	audio.addEventListener("canplay", function(e) {
			    		analyser = sourceNode = null;
			    		setup();
			    	}, false);
			    };
			    

			    function setup() {
			        // 为了得到音频数据创建的对象
			        audioContext = audioContext || new AudioContext();
			        // 调用音频解码器
			        analyser = (analyser || audioContext.createAnalyser());
			        //
			        sourceNode = audioContext.createMediaElementSource(audio);
			        //
			        sourceNode.connect(analyser);
			        sourceNode.connect(audioContext.destination);

			        audio.play();

			        update();
			    }
			    function update() {

			        //得到的音频是一个二进制的，需要，解析数据
			        freqArray = new Uint8Array(analyser.frequencyBinCount);
			        //得到数组
			        analyser.getByteFrequencyData(freqArray);

			        fn(freqArray);
			        
			        if(audio.paused){
			        	freqArray = null;
			        	stopBtn.innerHTML="■";
			        	imgStrat();
			        }else{
			        	requestAnimationFrame(update);
			        }
			    };

			    function fn(arr){
			    	var step = Math.round(arr.length /imgs.length); 
			    	for( var i = 0; i < imgs.length; i++ ){
			    		num = arr[i * step];
			    		k = (num) / imgs[i].offsetHeight * 100;
			    		m = 100 - k;
			    		n = (m-40)>0?(m-40):0;
			    		imgs[i].style.top=n/100*imgs[i].offsetHeight+"px";
					}
				}

				
			})()