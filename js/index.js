(function(){
	var oBigImg = document.getElementById('big-img');
	var aBigImgs = oBigImg.children;
	for(var i=0;i<aBigImgs.length;i++){
		aBigImgs[i].style.zIndex  = aBigImgs.length - i;
	}
	var oLeftMask = document.getElementById('left-mask');
	var oRightMask = document.getElementById('right-mask');
	var oPrev = document.getElementById('prev');
	var oNext = document.getElementById('next');
	var oTitle = document.getElementById('title');
	var oCurrPage = document.getElementById('curr-page');
	var oLength = document.getElementById('length');
	var oSmallImg = document.getElementById('small-img');
	var aSmallImgs = oSmallImg.children;
	oLength.innerHTML = aBigImgs.length;
	oTitle.innerHTML = aBigImgs[0].children[0].title;
	var index = 0;
	var zIndex = 6;
	oLeftMask.onmouseover  = oRightMask.onmouseover = oPrev.onmouseover =oNext.onmouseover = function(){
		if (this == oLeftMask || this == oPrev ) {
			move(oPrev,{opacity:100});
		}
		if (this == oRightMask || this == oNext) {
			move(oNext,{opacity:100});
		}
	};
	oLeftMask.onmouseout = oRightMask.onmouseout = function(){
		if (this == oLeftMask) {
			move(oPrev,{opacity:0});
		}
		if (this == oRightMask) {
			move(oNext,{opacity:0});
		}
	}
	oNext.onclick = function(){
		// var nextIndex = index + 1;
		// if (nextIndex == aBigImgs.length) {
		// 	nextIndex = 0;
		index ++;
		if (index == aBigImgs.length) {
			index = 0;
		}
		changeImg(index);
	};

	oPrev.onclick = function(){
		index --;
		if (index <= 0) {
			index = aBigImgs.length - 1;
		}
		changeImg(index);
	};
	function changeImg(index){
		var oNextImg = aBigImgs[index];
		oNextImg.style.height = 0;
		oNextImg.style.zIndex = ++zIndex;
		oTitle.innerHTML = oNextImg.children[0].title;
		oCurrPage.innerHTML = index + 1;
		move(oNextImg,{height:320});
	}
	for(var i = 0;i<aSmallImgs.length;i++){
		aSmallImgs[i].index = i;
		aSmallImgs[i].onmouseover = function(){
			move(this,{opacity:100});
		}
		aSmallImgs[i].onmouseout = function(){
			if (this.className != 'selected') {
				move(this,{opacity:50});
			}
		};	
		aSmallImgs[i].onclick = function(){
			for(var i = 0;i<aSmallImgs.length;i++){
				aSmallImgs[i].className = '';
				aSmallImgs[i].style.opacity = 0.5;
				aSmallImgs[i].style.filter = 'alpha(opacity = 50)';
			}
				this.style.opacity = 1;
				this.style.filter = 'alpha(opacity = 100)';
				this.className = 'selected';
			index = this.index;
			changeImg(index);
			var iLeft = 0;
			if (index == 0) {
				iLeft = 0;
			}else if (index == aSmallImgs.length - 1) {
				iLeft  = ( index - 2)*aSmallImgs[0].offsetWidth ;
			}else{
				iLeft  = ( index - 1)*aSmallImgs[0].offsetWidth ;
			}
			iLeft -= 10;
			move(oSmallImg,{left:-iLeft});
		};

	}
})()