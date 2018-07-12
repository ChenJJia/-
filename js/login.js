window.onload = function(){
    
    var message = "网络传输有问题，请检查网络连接或刷新页面再次进行操作";

    var grade = document.getElementById("grade");
    var gradeList = document.getElementById("gradeList");
    var gradeLi = gradeList.getElementsByTagName("li");
    var major = document.getElementById("major");
    var majorList = document.getElementById("majorList");
    var classes = document.getElementById("classes");
    var classesList = document.getElementById("classesList");
    //点击选择年级
    grade.onclick = function(){
        if(majorList.style.display!="block" && classesList.style.display!="block"){
            grade.className="active-input";
            gradeList.style.display="block";
            gradeList.focus();
        }
    }
    for(var i=0;i<gradeLi.length;i++){
        gradeLi[i].onclick = function(){
            grade.value = this.innerText;
            grade.style.color="#434343";
            gradeList.style.display="none";
            getMajor(grade.value);
            if(major.value!="请选择专业"){
                major.value="请选择专业";
                major.style.color="#8d8d8d";
            }
            if(classes.value!="请选择班级"){
                classes.value="请选择班级";
                classes.style.color="#8d8d8d";
            }
        }
    }

    function getMajor(gradeName){
        gradeName = gradeName.substring(0,gradeName.length-1);
        $.ajax({
            url:'SelectAllClass.do',
            type:'POST',
            cache:false,
            dataType:'json',
            contentType : "application/json;charset=UTF-8",
            data:JSON.stringify({
                'grade':gradeName
            }),
            success:function(majorResult){
                createMajor(majorResult);
            },
            error:function(){
                alert(message);
            }
        })
    }
    //添加专业
    function createMajor(majorResult){
        while(majorList.hasChildNodes()){
            majorList.removeChild(majorList.firstChild);
        }
        for(var i=0;i<majorResult.classList.length;i++){
            var major_li = document.createElement("li");
            major_li.appendChild(document.createTextNode(majorResult.classList[i].major));
            majorList.appendChild(major_li);
        }
        var majorLi = majorList.getElementsByTagName("li");
        for(var i=0;i<majorLi.length;i++){
            majorLi[i].onclick = function(){
                major.value = this.innerText;
                major.style.color="#434343";
                majorList.style.display="none";
                if(classes.value!="请选择班级"){
                    classes.value="请选择班级";
                    classes.style.color="#8d8d8d";
                }
                //计算班级数量
                for(var i=0;i<majorResult.classList.length;i++){
                    if(major.value==majorResult.classList[i].major){
                        var classNum = majorResult.classList[i].classTotalNumber;
                    }
                }
                while(classesList.hasChildNodes()){
                    classesList.removeChild(classesList.firstChild);
                }
                //添加班级信息
                for(var i=1;i<=classNum;i++){
                    var class_li = document.createElement("li");
                    class_li.appendChild(document.createTextNode(major.value+i+"班"));
                    classesList.appendChild(class_li);
                }
                var classesLi = classesList.getElementsByTagName("li");
                for(var i=0;i<classesLi.length;i++){
                    classesLi[i].onclick = function(){
                        classes.value = this.innerText;
                        classes.style.color="#434343";
                        classesList.style.display="none";
                    }
                }
            }
        }
        

    }

    //点击选择专业
    major.onclick = function(){
        if(grade.value!="请选择年级" && gradeList.style.display!="block" && classesList.style.display!="block"){
            major.className="active-input";
            majorList.style.display="block";
            majorList.focus();
        }
    }

    //点击选择班级
    classes.onclick = function(){
        if(major.value!="请选择专业" && gradeList.style.display!="block" && majorList.style.display!="block"){
            classes.className="active-input";
            classesList.style.display="block";
            classesList.focus();
        }
    }
    

    //点击空白处
    gradeList.onblur = function(){
        gradeList.style.display="none";
        grade.className="";
    }
    majorList.onblur = function(){
        majorList.style.display="none";
        major.className="";
    }
    classesList.onblur = function(){
        classesList.style.display="none";
        classes.className="";
    }

  //密码
    var pswordText = document.getElementById("pswordText");
    var psword = document.getElementById("psword");
    pswordText.onfocus = function(){
    pswordText.style.display="none";
    psword.style.display="inline-block";
    psword.focus();
    psword.style.color="#434343";
    }
    psword.onblur = function(){
    if(psword.value==""){
    pswordText.style.display="inline-block";
         psword.style.display="none";
    }
    else{
    psword.className="";
    }
    }


    var login = document.getElementById("login");
    
    document.onkeydown = function (event){
	    	if(event.keyCode==13){
	    		login.click();
	    	}
    	}
    login.onclick = function(){
        if(grade.value!="请选择年级" && major.value!="请选择专业" && classes.value!="请选择班级" && psword.value!="请输入密码"){
            canLogin(grade.value,major.value,classes.value,psword.value);
        }
        else{
            alert("请完善登录信息");
        }
    }
    function canLogin(grade,major,classes,psword){
        grade = grade.substring(0,grade.length-1);
        classes = classes.substring(classes.length-2);
        classes = classes.substring(0,classes.length-1);
        $.ajax({
            url:'StudentLogin.do',
            type:'POST',
            cache: false,
            contentType : "application/json;charset=UTF-8",
            data:JSON.stringify({
                'studentGrade':grade,
                'studentMajor':major,
                'studentClassNumber':classes,
                'studentPassword':psword
            }),
            dataType:'json',
            success:function(loginResult){
                if(loginResult.status=="ok"){
                    window.location.href=loginResult.nextStep;    
                }
                else{
                    alert(loginResult.hint);
                }
            },
            error:function(){
                alert(message);
            }
        })
    }
}