"use strict";
var submitStatus = 0;
var grade;
var ss;
var classTxt="";
var workTxt="";
window.onload = function () {
	var a = document.getElementsByTagName("a");
//	a[0].onclick = function () {
//		alert("hhhs");
//	}
    var table = document.getElementsByTagName("table");
    // table[2].setAttribute("class","bottomTable");
    for(var i=0;i<table.length;i++){
        var tr = table[i].getElementsByTagName("tr");
        for(var j=0;j<tr.length;j++){
            if(j%2==0){
                tr[j].style.backgroundColor = "#fff";
            }
            else{
                tr[j].style.backgroundColor = "#f9f7f7";
            }
        }
    }

    var topRight = document.getElementById("topRight");
    var topRightH = topRight.getElementsByTagName("h2");
    var topRightDiv = topRight.getElementsByTagName("div");
    var topRightUl = topRight.getElementsByTagName("ul");
    var gradeName = 14;
    var spanClass = topRightDiv[2].getElementsByTagName("span");
    var spanWork = topRightDiv[3].getElementsByTagName("span");
    var spanGrade = topRightDiv[1].getElementsByTagName("span");
    // var finishTableTh = table[0].getElementsByTagName("th");
    var finishTableTr = table[0].getElementsByTagName("tr");
    var aside = topRightDiv[6];
    var asideImg = aside.getElementsByTagName("img");
    var btnWrap = document.getElementById("btnWrap");

    var removePage = function () {
        var tablePageLi = topRightUl[3].getElementsByTagName("li");
        var liLen = tablePageLi.length;
        // alert("d");
        for(var l=0;l<liLen;l++){
            topRightUl[3].removeChild(tablePageLi[0]);
        }
    }
    var removeTd = function () {
        for(var z=1;z<finishTableTr.length;z++){
            var td = finishTableTr[z].getElementsByTagName("td");
            for(var y=0;y<td.length;y++){
                td[y].innerText = "";
            }
        }
    }
    // alert(sele.length);


    var gradeSele = function (grade) {
//    	alert("hhh");
        $.ajax({
            url: 'InstructorSelectAllClass.do',
            type: 'POST',
            dataType: 'json',
            contentType : "application/json;charset=UTF-8",
            data: JSON.stringify({
                "grade": grade
            }),
            cache: false,
            success: function (gainGrade) {
//            	alert("kk");
                if(gainGrade.applyStatus.status == "ok"){
//                	alert(gainGrade.applyStatus.hint);
//                	alert(gainGrade.classList.length);
                    var ul = topRightDiv[2].getElementsByTagName("ul");
                    // alert("kk");
                    var li = ul[0].getElementsByTagName("li");
                    // alert(li.length);
                    var liLen = li.length;
                    for(var l=1;l<liLen;l++){
                        ul[0].removeChild(li[1]);
                        // alert("k");
                    }
                    // alert(li.length);
                    for(var l=0;l<gainGrade.classList.length;l++){
                        // ul[0].removeChild("li");
                        var txt = document.createTextNode(gainGrade.classList[l].major+gainGrade.classList[l].classNumber+"班");
                        var li2 = document.createElement("li");
                        var ul2 = document.createElement("ul");
                        li2.appendChild(txt);
                        ul[0].appendChild(li2);
                    }
                	var ul = document.getElementsByTagName("ul");
                    if(gainGrade.classList.length<3){
//	                    	var ul = document.getElementsByTagName("ul");
	                    	ul[1].style.height = 30*(gainGrade.classList.length+1)+"px";
//	                    	alert(gainGrade.classList.length);
                    	}
                    else{
                    		ul[1].style.height = "114px";
                    }
                }
            },
            error: function() {
                alert("接受数据ccc失败");
            }
        })
    }

    gradeSele(2014);
    for(var i=1;i<4;i++){
        (function(arg){
            // alert(i);
            var seleGrade = topRightDiv[arg].getElementsByTagName("span");
            var seleUl = topRightDiv[arg].getElementsByTagName("ul");
            seleGrade[0].onclick = function () {
                
                // alert(seleUl[0].classList);
                if(seleUl[0].classList!="sele-grade db" || seleUl[0].classList==""){

                    seleUl[0].setAttribute("class","sele-grade db");                   
                    seleUl[0].focus();
                    
                }
                else{
                    seleUl[0].setAttribute("class","dn");
                    // sele-grade cp db
                }
                // seleUl[0].focus();
                var seleLi = seleUl[0].getElementsByTagName("li");
                var seleSpan = topRightDiv[arg].getElementsByTagName("span");
                for(var j=0;j<seleLi.length;j++){
                    (function(arg2){
                        seleLi[arg2].onclick = function () {
                            asideImg[0].setAttribute("class","dn");
//                            btnWrap.setAttribute("class","dn");
                            var tablePage = topRightUl[3];
                            removePage();
                            removeTd();
                            asideDiv[2].innerText = "共0页";
                            if(arg == 1){
                                // var spanClass = topRightDiv[2].getElementsByTagName("span");
                                spanWork[1].innerText = "(不选)";
                                spanClass[1].innerText = "(不选)";
                                // var grade;
                                if(arg2 == 0){
                                    grade = 2014;
                                    // alert("14");
                                }
                                else if(arg2 == 1){
                                    grade = 2015;
                                }
                                else if(arg2 == 2){
                                    grade = 2016;
                                }
                                else if(arg2 == 3){
                                    grade = 2017;
                                }
                                gradeName = grade;
                                gradeSele(grade);
                                seleSpan[1].innerText = seleLi[arg2].innerText;
                                topRightH[0].innerText = gradeName+"级";
                            }
                            else{
                                asideImg[0].setAttribute("class","cp");
//                                btnWrap.setAttribute("class","");
                                // var classTxt="";
                                // var workTxt="";
                                seleSpan[1].innerText = seleLi[arg2].innerText;
                                var finishTh = finishTableTr[0].getElementsByTagName("th");

                                if(spanClass[1].innerText!="(不选)" && spanWork[1].innerText!="(不选)"){
                                    classTxt=spanClass[1].innerText;
                                    workTxt=spanWork[1].innerText;
                                    topRightH[0].innerText = gradeName+"级"+spanClass[1].innerText+spanWork[1].innerText;
                                    // alert("ss");
                                    asideImg[0].setAttribute("class","dn");
//                                    btnWrap.setAttribute("class","dn");
                                    finishTh[1].innerText = "";
                                }
                                else if(spanWork[1].innerText!="(不选)" && spanClass[1].innerText=="(不选)"){
                                    finishTh[1].innerText = "专业班级";
                                    classTxt="";
                                    workTxt=spanWork[1].innerText;
                                    topRightH[0].innerText = gradeName+"级"+spanWork[1].innerText;
                                }
                                else if(spanClass[1].innerText!="(不选)" && spanWork[1].innerText=="(不选)"){
                                    finishTh[1].innerText = "职务";
                                    workTxt="";
                                    // alert("s");
                                    classTxt=spanClass[1].innerText;
                                    topRightH[0].innerText = gradeName+"级"+spanClass[1].innerText;
                                }
                                else {
                                    finishTh[1].innerText = "";
                                    removePage();
                                    asideImg[0].setAttribute("class","dn");
//                                    btnWrap.setAttribute("class","dn");
                                }
                                if(spanClass[1].innerText!="(不选)" || spanWork[1].innerText!="(不选)"){
                                    $.ajax({
                                        url:'getPositionMessage.do',
                                        type:'POST',
                                        dataType:'json',
                                        contentType : "application/json;charset=UTF-8",
                                        data:JSON.stringify({
                                            "grade":grade,
                                            "classID":classTxt,
                                            "sposition":workTxt
                                        }),
                                        cache: false,
                                        success: function (finishData) {
                                            if(finishData.applyStatus.status == "ok"){
                                                if(finishData.classMemberMessage.length%12==0){
                                                    var tableNum = (finishData.classMemberMessage.length-(finishData.classMemberMessage.length%12))/12;
                                                }
                                                else{
                                                    var tableNum = (finishData.classMemberMessage.length-(finishData.classMemberMessage.length%12))/12+1;
                                                }
                                                
                                                for(var l=0;l<tableNum;l++){
                                                    var li = document.createElement("li");
                                                    var txt = document.createTextNode(l+1);
                                                    li.appendChild(txt);
                                                    li.setAttribute("class","cp");
                                                    tablePage.appendChild(li);
                                                }
                                                asideDiv[2].innerText = "共"+tableNum+"页";
                                                var asideLi = aside.getElementsByTagName("li");
                                                asideLi[0].setAttribute("class","cp circleBackground");
                                                ss=0;
                                                var starNum;
                                                var stuMessage = function (n1,n2,n) {             // 在表格里添加学生的信息
                                                    var finishTd = finishTableTr[n2].getElementsByTagName("td");
                                                    finishTd[0].innerText = n1;
                                                    finishTd[1].innerText = finishData.classMemberMessage[n].chosenMessage;
                                                    finishTd[2].innerText = finishData.classMemberMessage[n].sname;
                                                    finishTd[3].innerText = finishData.classMemberMessage[n].sphone_Long;
                                                    if(finishData.classMemberMessage[n].sphone_Short==0){
                                                    	finishTd[4].innerText = "";
                                                    }
                                                    else{
                                                    	finishTd[4].innerText = finishData.classMemberMessage[n].sphone_Short;
                                                    }
                                                }
                                                if(finishTableTr.length-1>=finishData.classMemberMessage.length){
                                                    starNum = finishData.classMemberMessage.length+1;
                                                }
                                                else{
                                                    starNum = finishTableTr.length;
                                                }
                                                for(var x=1;x<starNum;x++){
                                                    stuMessage(x,x,x-1);
                                                }
                                                for(var x=0;x<asideLi.length;x++){
                                                    (function(arg){
                                                        asideLi[arg].onclick = function () {
//                                                        	alert(arg);
                                                            // alert(asideLi.length);
                                                        	  if(asideLi[arg].className != "cp circleBackground"){
		                                                        removeTd();
		                                                        for(var h=0;h<asideLi.length;h++){
		                                                            if(arg==h){
		                                                                asideLi[h].setAttribute("class","cp circleBackground");
		                                                                ss=arg;
		                                                                // alert(asideLi[h].classList);
		                                                            }
		                                                            else{
		                                                                asideLi[h].setAttribute("class","cp");
		                                                            }
		                                                        }
		                                                        var cirleNum;
		                                                        if(arg == asideLi.length-1){
		                                                            cirleNum = finishData.classMemberMessage.length%12+1;
		                                                            // alert(cirleNum);
		                                                        }
		                                                        else{
		                                                            cirleNum = finishTableTr.length;
		                                                        }
		                                                        for(var z=1;z<cirleNum;z++){
		                                                            stuMessage(z+arg*12,z,z-1+arg*12);
		                                                        }
		                                                    }
                                                        }
                                                    })(x);
                                                }

                                                var record=0;
                                                // var s1=0;
                                                // var ss2=0;
                                                asideImg[1].onclick = function () {
                                                    // alert("s");
                                                	  if(asideLi[0].className=="cp circleBackground" && asideLi.length==1){
                                                		  
                                                	  }
                                                	  else {
	                                                    for(var x=0;x<asideLi.length;x++){
	                                                        (function(arg4){
	                                                            // alert(arg4+""+asideLi[arg4].classList);
	                                                            if(ss==arg4){
	                                                                // alert(arg4);
	                                                                record = arg4;
	                                                                
	                                                            }
	                                                        })(x);
	                                                    }
	                                                    if(record==0){
	                                                        asideLi[record].setAttribute("class","cp");
	                                                        asideLi[asideLi.length-1].setAttribute("class","cp circleBackground");
	                                                        ss=asideLi.length-1;
	                                                        removeTd();
	                                                        for(var t=1;t<=finishData.classMemberMessage.length%(finishTableTr.length-1);t++){
	                                                            stuMessage((asideLi.length-1)*12+t,t,(asideLi.length-1)*12+t-1);
	                                                            // removeTd();
	                                                        }
	                                                    }
	                                                    else if(record!=0){
	                                                        asideLi[record].setAttribute("class","cp");
	                                                        asideLi[record-1].setAttribute("class","cp circleBackground");
	                                                        ss=record-1;
	                                                        // alert(finishTableTr.length);
	                                                        for(var t=1;t<finishTableTr.length;t++){
	                                                            stuMessage((record-1)*12+t,t,(record-1)*12+t-1);
	                                                        }
	                                                    }
                                                	  }
                                                }
                                                // var record;
                                                asideImg[2].onclick = function () {
                                                    // alert(asideLi.length);
                                                    for(var x=0;x<asideLi.length;x++){
                                                        (function(arg4){
                                                            if(ss==arg4){
                                                                // alert(arg4);
                                                                record = arg4;
                                                            }
                                                        })(x);
                                                    }
                                                    if(record==asideLi.length-1 && asideLi.length>1){
                                                        asideLi[record].setAttribute("class","cp");
                                                        asideLi[0].setAttribute("class","cp circleBackground");
                                                        ss=0;
                                                        for(var t=1;t<finishTableTr.length;t++){
                                                            stuMessage(t,t,t-1);
                                                        }
                                                    }
                                                    else if(record!=asideLi.length-1){
                                                        // alert("sau");
                                                        asideLi[record].setAttribute("class","cp");
                                                        asideLi[record+1].setAttribute("class","cp circleBackground");
                                                        ss=record+1;
                                                        if(record!=asideLi.length-2){
                                                            for(var t=1;t<finishTableTr.length;t++){
                                                                // alert("ll");
                                                                stuMessage((record+1)*12+t,t,(record+1)*12+t-1);
                                                                
                                                            }
                                                        }
                                                        else{
                                                            removeTd();
                                                            // alert("Jj");
                                                            for(var t=1;t<=finishData.classMemberMessage.length%(finishTableTr.length-1);t++){
                                                                stuMessage((asideLi.length-1)*12+t,t,(asideLi.length-1)*12+t-1);
                                                                // removeTd();
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        error: function () {
                                        	alert("接受数据失败888");
                                        }
                                    })
                                }
                            }
                            // seleSpan[1].innerText = seleLi[arg2].innerText;
                            seleUl[0].setAttribute("class","dn");
                            // gradeName = garde;
                        }
                        seleUl[0].onblur = function () {
                            seleUl[0].setAttribute("class","dn");
                            // // if(seleUl[0].classList == "sele-grade cp db");{
                            //     // k=0;
                            // // }
                        }
  
                    })(j);
                }
            }
        })(i);
    }


    asideImg[0].onclick = function () {
    	
        // alert("ll");
        $.ajax({
            url: 'GetGradeExcel.do',
            type:'POST',
            dataType: 'json',
            contentType : "application/json;charset=UTF-8",
            cache: false,
            data: JSON.stringify({
                'grade':grade,
                'classID':classTxt,
                'sposition':workTxt
            }),
//            dataType: 'json',
//            contentType : "application/json;charset=UTF-8",
//            cache: false,
            success: function (finishDownloadData) {
                if(finishDownloadData.applyStatus.status == "ok"){
                    window.location.href = finishDownloadData.downLoadUrl+".do";
                }
            },
            error: function () {
                alert("接hahah收数据失败");
            }
        })
    }

    var mouseOverOut = function (a,b,c) {
        a.onmouseover = function () {
            b.setAttribute("class",c);
        }
        a.onmouseout = function () {
            b.setAttribute("class","dn");
        }
    }

    var asideDiv = aside.getElementsByTagName("div");
    var downloadResult = asideDiv[0].getElementsByTagName("img");
    var downloadAppear = asideDiv[1];
    mouseOverOut(downloadResult[0],downloadAppear,"download-appear db");



    var wrapBottom = document.getElementById("wrapBottom");
    var bottomDiv = wrapBottom.getElementsByTagName("div");
    var downloadNo = bottomDiv[5];
    var ifSpread = bottomDiv[7];
    var downloadNoImg = downloadNo.getElementsByTagName("img");
    var downloadNoAppear = downloadNo.getElementsByTagName("span");
    mouseOverOut(downloadNoImg[0],downloadNoAppear[0],"bottom-appear");
    var ifSpreadAppear = bottomDiv[6].getElementsByTagName("span");
    mouseOverOut(ifSpread,ifSpreadAppear[0],"bottom-appear");


    downloadNoImg[0].onclick = function () {
        // alert("s");
        $.ajax({
            url: 'getUnFinishClassExcel.do',
            type: 'POST',
            dataType: 'json',
            contentType : "application/json;charset=UTF-8",
            cache: false,
            success: function (unfinishDownloadData) {
                if(unfinishDownloadData.applyStatus.status == "ok"){
                    window.location.href = unfinishDownloadData.downLoadUrl+".do";
                }
            },
            error:function () {
                alert("接收数据失败");
            }
        })
    }

    // alert(ifSpreadAppear[0].innerText);
    var spreadUnfinish = function () {
        ifSpread.setAttribute("class","if-spread cp unfinish-spread");
        ifSpreadAppear[0].innerText = "展开所有未上传班级的信息";
    }

    var closeUnfinish = function () {
        ifSpread.setAttribute("class","if-spread cp unfinish-close");
        ifSpreadAppear[0].innerText = "收起未上传班级的信息";

    }

    var unfinish = function () {
//    	alert("hhh");
        $.ajax({
            url: 'IfFinish.do',
            type: 'POST',
            dataType: 'json',
            contentType : "application/json;charset=UTF-8",
            cache: false,

            success: function (unfinishData) {
//            	alert("llll");
                if(unfinishData.applyStatus.status == "ok"){
//                	alert("lljjl");
//                	alert(unfinishData.List2.unFinishClassNumber_In_Total);
                    var wrapBottomP = wrapBottom.getElementsByTagName("p");
                    // wrapBottomP[0].setAttribute("class","vv");
                    var tr1 = bottomDiv[1].getElementsByTagName("tr");
                    var tr2 = bottomDiv[2].getElementsByTagName("tr");
                    var tr3 = bottomDiv[3].getElementsByTagName("tr");
                    var len1 = unfinishData.List1.unFinishClass.length;
                    var len2 = unfinishData.List2.unFinishClass.length;
                    var len3 = unfinishData.List3.unFinishClass.length;
                    var len4 = unfinishData.List4.unFinishClass.length;
//                     alert("kkkk");
                    var allUnfinishNum = unfinishData.List1.unFinishClassNumber_In_Total+unfinishData.List2.unFinishClassNumber_In_Total+unfinishData.List3.unFinishClassNumber_In_Total+unfinishData.List4.unFinishClassNumber_In_Total;
                    var onclickNum = 0;

                    var statistic = document.getElementById("statistic");
                    var statisticPh = statistic.getElementsByTagName("div");
                    var box = echarts.init(statisticPh[0]);
                    var percentage = (len1+len2+len3+len4)/unfinishData.TotalClass;
                    var sucPercentage = 1-percentage;
                    var statisticSpan = statistic.getElementsByTagName("span");
                    statisticSpan[0].innerText = parseInt(100-percentage*100)+"%";
                    statisticSpan[1].innerText = unfinishData.TotalClass-(len1+len2+len3+len4);
                    statisticSpan[2].innerText = len1+len2+len3+len4;
                    var option = {
                        series: [{
                            name: '信息确认',
                            type: 'pie',
                            radius: '75%',
                            center: ['50%', '50%'], //位置
                            zIndex:'2',
                            data: [{
                                value: sucPercentage,
                                name: '已上传',
                                itemStyle: {
                                    normal: {
                                        color: '#00a0e9',
                                    }
                                }
                            }, {
                                value: percentage,
                                name: '未上传',
                                itemStyle: {
                                    normal: {
                                        color: '#dedede',
                                    }
                                }
                            }],
                        }]
                            };
                            box.setOption(option);

                    var closeTable = function () {
                        bottomDiv[2].setAttribute("class","dn");
                        bottomDiv[3].setAttribute("class","dn");
                        wrapBottom.setAttribute("class","bg1");
                        wrapBottomP[0].setAttribute("class","vh");
                        spreadUnfinish();
                        onclickNum = 0;
                    }

                    var addMessage14 = function (td1,td2,n) {
                        td1.innerText = "14级";
                        td2.innerText = unfinishData.List1.unFinishClass[n-1];
                    }

                    var addMessage15 = function (td1,td2,n){
                        td1.innerText = "15级";
                        td2.innerText = unfinishData.List2.unFinishClass[n-len1-1];
                    }

                    var addMessage16 = function (td1,td2,n){
                        td1.innerText = "16级";
                        td2.innerText = unfinishData.List3.unFinishClass[n-len1-len2-1];
                    }
                    var addMessage17 = function (td1,td2,n){
                        td1.innerText = "17级";
                        td2.innerText = unfinishData.List4.unFinishClass[n-len1-len2-len3-1];
                    }

                    var tableAll = function (r,d) {
                        for(var i=1;i<r.length;i++){
                            var td = r[i].getElementsByTagName("td");
                            td[0].innerText = i+d*10;
                        }
                    }
                    var table1 = function () {
                        tableAll(tr1,0);
                    }
                    var table2 = function () {
                        tableAll(tr2,1);
                    }
                    var table3 = function () {
                        tableAll(tr3,2);
                    }

                    if(allUnfinishNum > 0){
                        wrapBottom.setAttribute("class","bg1 db");
                        bottomDiv[0].setAttribute("class","bottom");
                        bottomDiv[1].setAttribute("class","bottomTable");

                        var insetMess10 = function (n) {
                            if(n<=10){
                                var td = tr1[n].getElementsByTagName("td");
                                if(n<=len1){
                                    addMessage14(td[1],td[2],n);
                                }
                                else if(n<=len1+len2){
                                    addMessage15(td[1],td[2],n);
                                }
                                else if(n<=len1+len2+len3){
                                    addMessage16(td[1],td[2],n);
                                }
                                else if(n<=len1+len2+len3+len4){
                                    addMessage17(td[1],td[2],n);
                                }
                                
                            }
                            else if(n>10 && n<=20){
                                var td = tr2[n-10].getElementsByTagName("td");
                                td[0].innerText = n;
                                if(len1>10){
                                    addMessage14(td[1],td[2],n);
                                    if(n>len1 && n<=len1+len2){
                                        addMessage15(td[1],td[2],n);
                                    }
                                    else if(n>len1+len2 && n<=len1+len2+len3){
                                        addMessage16(td[1],td[2],n);
                                    }
                                    else if(n>len1+len2+len3 && n<=len1+len2+len3+len4){
                                        addMessage17(td[1],td[2],n);
                                    }
                                }
                                else if(len1+len2>10){
                                    // alert(arg);
                                    if(n<=len1+len2){
                                        addMessage15(td[1],td[2],n);
                                    }
                                    else if(n>len1+len2 && n<=len1+len2+len3){
                                        addMessage16(td[1],td[2],n);
                                    }
                                    else if(n>len1+len2+len3 && n<=len1+len2+len3+len4){
                                        addMessage17(td[1],td[2],n);
                                    }
                                }
                                else if(len1+len2+len3>10){
                                    if(n<=len1+len2+len3){
                                        addMessage16(td[1],td[2],n);
                                    }
                                    else if(n>len1+len2+len3 && n<=len1+len2+len3+len4){
                                        addMessage17(td[1],td[2],n);
                                    }
                                }
                                else if(len1+len2+len3+len4>10){
                                    addMessage17(td[1],td[2],n);
                                }

                            }

                        }

                        if(allUnfinishNum <= 10){
                            ifSpread.setAttribute("class","dn");
                            for(var i=1;i<allUnfinishNum+1;i++){
                                (function(arg){
                                    var td = tr1[arg].getElementsByTagName("td");
                                    td[0].innerText = arg;
                                    if(arg<=len1){
                                        addMessage14(td[1],td[2],arg);
                                    }
                                    else if(arg<=len1+len2){
                                        addMessage15(td[1],td[2],arg);
                                    }
                                    else if(arg<=len1+len2+len3){
                                        addMessage16(td[1],td[2],arg);
                                    }
                                    else if(arg<=len1+len2+len3+len4){
                                        addMessage17(td[1],td[2],arg);
                                    }
                                })(i);
                            }
                        }

                        else if(allUnfinishNum>10 && allUnfinishNum<=20){
                            ifSpread.onclick = function () {
                                if(onclickNum==2){
                                    closeTable();
                                }
                                else{
                                    bottomDiv[2].setAttribute("class","bottomTable");
                                    closeUnfinish();
                                    wrapBottom.setAttribute("class","bg2");
                                    onclickNum = 2;
                                }
                            } 
                            table1();
                            for(var i=1;i<=allUnfinishNum;i++){
                                (function(arg){
                                    insetMess10(arg);
                                })(i);
                            }

                        }
                        else if(allUnfinishNum > 20){
                            ifSpread.onclick = function () {
                                if(onclickNum==2){
                                    closeTable();
                                }
                                else if(onclickNum == 1){
                                    wrapBottom.setAttribute("class","bg-transparent");
                                    bottomDiv[3].setAttribute("class","bottomTable");
                                    closeUnfinish();
                                    onclickNum = 2;
                                    if(allUnfinishNum > 30){
                                        wrapBottomP[0].setAttribute("class","vv");
                                    }
                                }
                                else if(onclickNum == 0){
                                    bottomDiv[2].setAttribute("class","bottomTable");
                                    wrapBottom.setAttribute("class","bg2");
                                    onclickNum = 1;
                                }                   
                            }
                            table1();
                            table2();
                            if(allUnfinishNum > 30){
                                table3();
                            }

                            for(var i=1;i<=allUnfinishNum;i++){
                                (function(arg){
                                    insetMess10(arg);
                                    if(arg>20 && arg<=30){
                                        var td = tr3[arg-20].getElementsByTagName("td");
                                        td[0].innerText = arg;
                                        if(len1>20){
                                            if(arg<=len1){
                                                addMessage14(td[1],td[2],arg);
                                            }
                                            else if(arg>len1 && arg<=len1+len2){
                                                addMessage15(td[1],td[2],arg);
                                            }
                                            else if(arg>len1+len2 && arg<=len1+len2+len3){
                                                addMessage16(td[1],td[2],arg);
                                            }
                                            else if(arg>len1+len2+len3 && arg<=len1+len2+len3+len4){
                                                addMessage17(td[1],td[2],arg);
                                            }
                                        }
                                        else if(len1+len2>20){
                                            if(arg<=len1+len2){
                                                addMessage15(td[1],td[2],arg);
                                            }
                                            else if(arg>len1+len2 && arg<=len1+len2+len3){
                                                addMessage16(td[1],td[2],arg);
                                            }
                                            else if(arg>len1+len2+len3 && arg<=len1+len2+len3+len4){
                                                addMessage17(td[1],td[2],arg);
                                            }
                                        }
                                        else if(len1+len2+len3>20){
                                            if(arg>len1+len2 && arg<=len1+len2+len3){
                                                addMessage16(td[1],td[2],arg);
                                            }
                                            else if(arg>len1+len2+len3 && arg<=len1+len2+len3+len4){
                                                addMessage17(td[1],td[2],arg);
                                            }
                                        }
                                        else if(len1+len2+len4+len3>20){
                                            if(arg>len1+len2+len3 && arg<=len1+len2+len3+len4){
                                                addMessage17(td[1],td[2],arg);
                                            }
                                        }
                                    }

                                })(i);
                            }
                        }
                    }
                }
            },
            error: function () {
            		alert("接受数据失败");
            }
        })
    }

    unfinish();
    $(document.getElementById("file")).click(function() {
    		submitStatus = 1;
    });
    


}


function downLoadTemplate(){
	$.ajax({
        url: 'downLoadTemplate.do',
        type:'POST',
        dataType: 'json',
        contentType : "application/json;charset=UTF-8",
        cache: false,
        success: function (finishDownloadData) {
            if(finishDownloadData.applyStatus.status == "ok"){
                window.location.href = finishDownloadData.downLoadUrl+".do";
            }
        },
        error: function () {
            alert("接收数据失败");
        }
    });
}
document.getElementById("file").onchange=function(){
	$.ajaxFileUpload({
        url:'uploadExcel.do',
        type:'POST',
        secureuri: false,
        fileElementId:'file',
        dataType:'json',
        success: function (finishDownloadData) {
        	console.log(finishDownloadData);
            if(finishDownloadData.status == "error"){
            		alert(finishDownloadData.hint);
                window.location.reload();
            }
            alert("成功上传,点击确定刷新页面");
            window.location.reload();
        },
        error: function () {
            alert("网络不稳定,请刷新页面");
        }
    });
};
	


