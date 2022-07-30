window.addEventListener('load', function() {
	var leftarrow = document.querySelector('.leftarrow')
	var rightarrow = document.querySelector('.ringhtarrow')
	var box = document.querySelector('.box')
	var imgs = document.querySelectorAll('.box>ul li')
	var circle = document.querySelector('.circle')
	var ul = document.querySelector('.box>ul')
	box.addEventListener('mouseover', function() {
		leftarrow.style.display = 'block'
		rightarrow.style.display = 'block'
		clearInterval(timer)
		timer = null
	})
	box.addEventListener('mouseout', function() {
		leftarrow.style.display = 'none'
		rightarrow.style.display = 'none'
		clearInterval(timer)
		timer = setInterval(function() {
			//手动调用点击事件
			rightarrow.click();
		}, 1000)
	})
	//动态创建小圆点并添加小圆点，有几个图片添加几个小圆点
	for (var i = 0; i < imgs.length; i++) {
		//创建节点
		var a = document.createElement('a')
		//创建自定义属性
		a.setAttribute('index', i)
		//插入节点
		circle.appendChild(a)
		//给每个a创建点击事件
		a.addEventListener('click', function() {
			//排他思想，创建小圆圈的同时绑定了点击事件，所以要写for循环里面
			for (var i = 0; i < circle.children.length; i++) {
				circle.children[i].className = ''
			}
			this.className = 'cuurrent'
			//得到所点击的自定义属性
			var index = this.getAttribute('index')
			//当点击了小a，把索引号赋值给num
			num = index
			//当点击了小a，把索引号赋值给circle1
			circle1 = index
			//盒子宽度和图片宽度一样所以获取盒子宽度等于图片宽度
			var boxWidth = box.offsetWidth
			//移动的是ul不是li或者说ul带着li在移动（点击小圆点图片变化）
			//索引值*盒子宽度就是ul所移动的距离
			animate(ul, -index * boxWidth);
		})
	}
	circle.children[0].className = 'cuurrent'
	//克隆第一张图片
	var first = ul.children[0].cloneNode(true)
	//把克隆的第一张图片添加到最后
	ul.appendChild(first)
	var num = 0
	//设置一个新的变量，控制小圆圈的播放
	var circle1 = 0
	//节流阀
	var flag = true
	//右侧按钮
	rightarrow.addEventListener('click', function() {
		if (flag) {
			flag=false//关闭节流阀
			var boxWidth = box.offsetWidth
			num++
			//复制第一张图片放到最后面，当图片滚到被复制的图片时，让ul快速的不做动画的跳到最左侧，此时left=0同时num=0
			if (num == ul.children.length - 1) {
				ul.style.left = 0
				num = 0
			}
			circle1++
			//当circle1=5的时候circle1重新赋值为0从第一张开始
			if (circle1 == circle.children.length) {
				circle1 = 0
			}
			animate(ul, -num * boxWidth,function(){
				flag=true
			})
			circleChange();
		}
	})
	//左侧按钮
	leftarrow.addEventListener('click', function() {
		if(flag){
			flag=false
			var boxWidth = box.offsetWidth
			if (num == 0) {
				num = ul.children.length - 1
				ul.style.left = -num * boxWidth + 'px'
			}
			num--
			circle1--
			//当circle1<0的时候,说明是第一张图片，则小圆圈要改成第五个小圆圈
			if (circle1 < 0) {
				circle1 = circle.children.length - 1
			}
			animate(ul, -num * boxWidth,function(){
				flag=true
			})
			circleChange();
		}
	})

	function circleChange() {
		for (var i = 0; i < circle.children.length; i++) {
			circle.children[i].className = ''
		}
		circle.children[circle1].className = 'cuurrent'

	}
	//自动播放图片
	var timer = setInterval(function() {
		//手动调用点击事件
		rightarrow.click();
	}, 3000)
})
