"use strict";
window.onload = function () {
    var main = document.getElementById("main");
    var mainInput = main.getElementsByTagName("input");
    var fault = main.getElementsByTagName("p");
    var txtIn = function (m,n) {
        mainInput[m].onfocus = function () {
            if(mainInput[m].value==n){
                // alert("iu");
                mainInput[m].value="";
            }
            if(m==1){
                mainInput[m].type="password";
                fault[0].setAttribute("class","dn");
                // mainInput[1].style.borderBottom = "1px solid #676767";
            }
            mainInput[m].setAttribute("class","focus");
        }
        mainInput[m].onblur = function () {
            mainInput[m].setAttribute("class","blur");
            if(mainInput[m].value == ""){
                mainInput[m].value = n;
                if(m==1){
                    mainInput[m].type="text";
                }
            }
        }
    }
    txtIn(0,"请输入用户名");
    txtIn(1,"请输入密码");
    var btn = main.getElementsByTagName("button");
    document.onkeydown = function (event){
	    	if(event.keyCode==13){
	    		btn[0].click();
	    	}
    	}
    btn[0].onclick = function () {
//    	alert("gggfsdf");
        if(mainInput[0].value!="请输入用户名" && mainInput[1].value!="请输入密码"){
            $.ajax({
                url:'BackgroundLogincheak.do',
                type: 'POST',
                dataType: 'json',
                cache:false,
                contentType : "application/json;charset=UTF-8",
                data: JSON.stringify({
                    "backgroundName": mainInput[0].value,
                    "backgroundPassword": mainInput[1].value
                }),
//                dataType: 'json',
//                cache:false,
                success: function (loginData) {
                	if(loginData.applyStatus.status=="ok"){
                        window.location.href="manage.cheak";
                    }
                    else{
                        fault[0].setAttribute("class","fault db");
                        mainInput[1].setAttribute("class","border-red");
                    }
                },
                error: function () {
                    alert("接受数据失败");
                }
            })
        }
        else if(mainInput[0].value=="请输入用户名"){
            alert("用户名不能为空");
        }
        else if(mainInput[1].value!="请输入密码"){
            alert("密码不能为空");
        }

    }
}
