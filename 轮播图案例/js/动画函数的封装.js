function animate(obj, target,callback) {
			clearInterval(obj.timer)
			obj.timer = setInterval(function() {
				var objLfet = obj.offsetLeft
				//(目标值-现在的位置)/10 做为每步移动的距离步长
				var distance = (target - objLfet) / 10
				//避免出现小数，所以进行取整,进行判断正值（往大了取），负值（往小了取）
				if(distance>0){
					distance=Math.ceil(distance)
				}else{
					distance=Math.floor(distance)
				}
				if (objLfet == target) {
					clearInterval(obj.timer)
					//判断是否存在回调函数
					if(callback){
						callback();
					}
				} else {
					obj.style.left = objLfet + distance + 'px'
				}
			}, 100)
		}