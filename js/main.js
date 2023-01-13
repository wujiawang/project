
	// 获取元素
	var box = document.querySelector('.bx');
	var ul = document.querySelector('ul');
	var ol = document.querySelector('ol');
	var arrow_l = document.querySelector('.arrow_l');
	var arrow_r = document.querySelector('.arrow_r');
	// 定义变量num，控制图片展示
	var num = 0;
	// 定义变量cricle控制小圆圈展示
	var cricle = 0;
	// 定义节流阀（防止动画叠加）
	var flag = true;
	// 鼠标经过盒子显示翻页按钮(离开隐藏)
	box.addEventListener('mouseenter', function() {
		arrow_l.style.display = 'block';
		arrow_r.style.display = 'block';
		// 鼠标经过，停止播放
		clearInterval(myTimer);
		myTimer = null;
	});
	box.addEventListener('mouseleave', function() {
		arrow_l.style.display = 'none';
		arrow_r.style.display = 'none';
		// 鼠标离开，继续播放
		myTimer = setInterval(function() {
			arrow_r.click();
		}, 2000)
	});

	// 动态生成小圆点
	for (var i = 0; i < ul.children.length; i++) {
		// 创建li节点
		var li = document.createElement('li');
		// 为li节点添加自定义属性
		li.setAttribute('index', i);
		// 把动态生成的li追加到ol中
		ol.appendChild(li);
		// 默认第一个li被选中
		ol.children[0].className = 'current';
		// 利用排他思想，点击小圆圈，小圆圈变色
		li.addEventListener('click', function() {
			for (var i = 0; i < ol.children.length; i++) {
				// 去除所有li的样式
				ol.children[i].className = '';
			}
			var index = this.getAttribute('index');
			// 把图片及小圆圈与圆圈的自定义属性进行绑定
			num = cricle = index;
			ol.children[index].className = 'current';
			for (var i = 0; i < ul.children.length; i++) {
				ul.children[i].className = '';
			}
			ul.children[index].className = 'active';
		});
	}
	// 右击按钮（让图片播放）
	arrow_r.addEventListener('click', function() {
		if (flag) {
			flag = false;
			if (num < ul.children.length - 1) {
				num++;
				cricle++;
			} else {
				num = 0;
				cricle = 0;
			}
			goFalg();
		}
	});
	// 左击按钮（让图片播放）
	arrow_l.addEventListener('click', function() {
		if (flag) {
			flag = false;
			if (num == 0) {
				num = ul.children.length - 1;
				cricle = ol.children.length - 1;
			} else {
				num--;
				cricle--;
			}
			goFalg();
		}
	});

	// 定义定时器，让图片自动播放
	var myTimer = setInterval(function() {
		arrow_r.click();
	}, 3000);

	// 小圆点样式及图片变化代码重复封装函数
	function cricleChange() {
		// 排他思想，去除所有的样式，点击的索引添加样式
		for (var i = 0; i < ul.children.length; i++) {
			ul.children[i].className = '';
			ol.children[i].className = '';
		}
		ul.children[num].className = 'active';
		ol.children[cricle].className = 'current';
	}

	function goFalg() {
		cricleChange();
		var flagTimer = setInterval(function() {
			flag = true;
		}, 2000)
	}
