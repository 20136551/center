function move(elem,attr){
			// var that = this;
			clearInterval(elem.timer);
			elem.timer = setInterval(function(){
				var bStop = true;
				for(var prop in attr){
					var curr = parseInt(getElem(elem,prop));
					if(prop == 'opacity'){
						curr = getElem(elem,prop)*100;
					}
					var speed = (attr[prop] - curr)/8;
					speed = speed > 0?Math.ceil(speed):Math.floor(speed);
					if(curr != attr[prop]){
						bStop = false;
					}
					// elem.curr = '500px';
					if (prop == 'opacity') {
						elem.style.opacity = (curr + speed)/100;
						elem.style.filter = 'alpha(opacity='+(curr + speed)+')';
					}else{
						elem.style[prop] = curr + speed + 'px';
					};
					
				};
				if(bStop){
						clearInterval(elem.timer);
					}
			}, 30);
			
		}
function getElem(elem,attr){
	if (elem.currentStyle) {
		return elem.currentStyle[attr];
	}else{
			return getComputedStyle(elem,false)[attr];
		}
}