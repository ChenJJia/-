window.onload = function(){

    var message = "网络传输有问题，请检查网络连接或刷新页面再次进行操作";

    var wrap = document.getElementById("wrap");
    var content = document.getElementById("content");
    wrap.style.minHeight=document.body.clientHeight+"px";
    content.style.minHeight=document.body.clientHeight-130+"px";
    window.onresize = function(){
        if(document.body.clientHeight<650){
            wrap.style.minHeight="650px";
            content.style.minHeight="520px";
        }
        else{
            wrap.style.minHeight=document.body.clientHeight+"px";
            content.style.minHeight=document.body.clientHeight-130+"px";
        }
    }

    var choiceBtn = document.getElementById("choiceBtn");
    var choiceDiv = choiceBtn.getElementsByTagName("div");

    var grade = document.getElementById("grade");
    var gradeList = document.getElementById("gradeList");
    var gradeLi = gradeList.getElementsByTagName("li");

    var classes = document.getElementById("classes");
    var classesList = document.getElementById("classesList");
    var classesLi = classesList.getElementsByTagName("li");

    var post = document.getElementById("post");
    var postList = document.getElementById("postList");
    var postLi = postList.getElementsByTagName("li");

    getClass("2014");
    grade.onclick = function(){
        if(classesList.style.display!="table" && postList.style.display!="table"){
            grade.className="click-input";
            gradeList.style.display="table";
            choiceDiv[0].className +=" item-select";
            gradeList.focus();
        }
    }
    for(var i=0;i<gradeLi.length;i++){
        gradeLi[i].onclick = function(){
            grade.value=this.innerText;
            grade.className="";
            gradeList.style.display="none";
            choiceDiv[0].className="item";
            if(classes.value!="班级"){
                classes.value="班级";
            }
            getClass(grade.value);
            if(classes.value!="班级" && classes.value!="不选" || post.value!="职务" && post.value!="不选"){
                getMessage(classes.value,grade.value,post.value);
            }
        }
    }

    //添加班级
    function getClass(grade){
        grade = grade.substring(0,grade.length-1);
        $.ajax({
            url:'SelectAllClass.do',
            type:'POST',
            cache:false,
            contentType : "application/json;charset=UTF-8",
            dataType:'json',
            data:JSON.stringify({
                'grade':grade
            }),
            success:function(getClassResult){
                if(getClassResult.applyStatus.status=="ok"){
                    createClass(getClassResult);
                }
            },
            error:function(){
                 alert(message);
//                if(getClassResult.applyStatus.status=="ok"){
//                    createClass(getClassResult);
//                }
            }
        })
    }

    function createClass(getClassResult){
        while(classesList.hasChildNodes()){
            classesList.removeChild(classesList.firstChild);
        }
        var classes_li = document.createElement("li");
        classes_li.appendChild(document.createTextNode("不选"));
        classesList.appendChild(classes_li);
        for(var i=0;i<getClassResult.classList.length;i++){
            for(var j=1;j<=getClassResult.classList[i].classTotalNumber;j++){
                var classes_li = document.createElement("li");
                var liText = document.createTextNode(getClassResult.classList[i].major+j+"班");
                classes_li.appendChild(liText);
                classesList.appendChild(classes_li);
            }
        }
        //点击班级
        classes.onclick = function(){
            if(gradeList.style.display!="table" && postList.style.display!="table"){
                classes.className="click-input";
                classesList.style.display="table";
                choiceDiv[1].className +=" item-select";
                classesList.focus();
            }
        }
        for(var i=0;i<classesLi.length;i++){
            if(i%2==0){
                classesLi[i].className="li-bg";
            }
            classesLi[i].onclick = function(){
                classes.value=this.innerText;
                classes.className="";
                classesList.style.display="none";
                choiceDiv[1].className="item";
                if(classes.value!="班级" && classes.value!="不选" || post.value!="职务" && post.value!="不选"){
                    getMessage(classes.value,grade.value,post.value);
                }
            }
        }
    }
    function getMessage(classes,grade,sposition){
//    	alert(classes+grade+sposition);
        if(classes=="班级" || classes=="不选"){
            classes="";
        }
        if(sposition=="职务" || sposition=="不选"){
            sposition="";
        }
        grade = grade.substring(0,grade.length-1);
        $.ajax({
            url:'backgroundGetMessage.do',
            type:'POST',
            dataType:'json',
            cache:false,
            contentType : "application/json;charset=UTF-8",
            data:JSON.stringify({
                'classID':classes,
                'grade':grade,
                'sposition':sposition
            }),
            success:function(messageResult){
                if(messageResult.applyStatus.status=="ok"){
                    createTable(messageResult);
                }
                else{
                    alert(messageResult.applyStatus.hint);
                }
            },
            error:function(){
                 alert(message);
//                if(messageResult.applyStatus.status=="ok"){
//                    createTable(messageResult);
//                }
//                else{
//                    alert(messageResult.applyStatus.hint);
//                }
            }
        })
    }
    //获取表格信息
    var table = document.getElementById("table");
    var tbody = table.getElementsByTagName("tbody")[0];
    var loadMore = document.getElementById("loadMore");
    function createTable(messageResult){
        for(var i=tbody.rows.length-1;i>=1;i--){
            tbody.removeChild(tbody.rows[i]);
        }
        for(var i=0;i<messageResult.studentMessage.length;i++){
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            var td3 = document.createElement("td");
            var td4 = document.createElement("td");
            var td5 = document.createElement("td");
            var td6 = document.createElement("td");
            var td7 = document.createElement("td");

            var tr = document.createElement("tr");
            td1.appendChild(document.createTextNode(messageResult.studentMessage[i].grade+"级"));
            tr.appendChild(td1);
            td2.appendChild(document.createTextNode(messageResult.studentMessage[i].major+messageResult.studentMessage[i].classNumber+"班"));
            tr.appendChild(td2);
            td3.appendChild(document.createTextNode(messageResult.studentMessage[i].sposition));
            tr.appendChild(td3);
            td4.appendChild(document.createTextNode(messageResult.studentMessage[i].sname));
            tr.appendChild(td4);
            td5.appendChild(document.createTextNode(messageResult.studentMessage[i].sphone_Long));
            tr.appendChild(td5);
            var short_phone = "";
            if(messageResult.studentMessage[i].sphone_Short!=0){
                short_phone = messageResult.studentMessage[i].sphone_Short;
            }
            td6.appendChild(document.createTextNode(short_phone));
            tr.appendChild(td6);
            var span1 = document.createElement("span");
            var span2 = document.createElement("span");
            span1.appendChild(document.createTextNode("修改"));
            span1.setAttribute("class","modify");
            span2.appendChild(document.createTextNode("删除"));
            span2.setAttribute("class","delete");
            td7.appendChild(span1);
            td7.appendChild(span2);
            tr.appendChild(td7);
            if(i%2==0){
                tr.className="tr-bg";
            }
            tbody.appendChild(tr);
        }
        for(var i=16;i<=messageResult.studentMessage.length;i++){
            tbody.rows[i].className="dn";
        }
        if(messageResult.studentMessage.length>15){
            loadMore.className="db";
        }
        loadMore.onclick = function(){
            for(var i=16;i<=messageResult.studentMessage.length;i++){
                tbody.rows[i].className="";
                if(i%2!=0){
                    tbody.rows[i].className="tr-bg";
                }
            }
            loadMore.className="dn";
        }
        for(var i=1;i<tbody.rows.length;i++){
            var modifyBtn = tbody.rows[i].cells[6].getElementsByTagName("span")[0];
            var deleteBtn = tbody.rows[i].cells[6].getElementsByTagName("span")[1];
            modifyBtn.onclick = function(){
                modifyMessage(this.parentNode.parentNode.childNodes[0].innerText,this.parentNode.parentNode.childNodes[1].innerText,
                    this.parentNode.parentNode.childNodes[2].innerText,this.parentNode.parentNode.childNodes[3].innerText,
                    this.parentNode.parentNode.childNodes[4].innerText,this.parentNode.parentNode.childNodes[5].innerText);
            }
            deleteBtn.onclick = function(){
                deleteMessage(this.parentNode.parentNode.childNodes[0].innerText,this.parentNode.parentNode.childNodes[1].innerText,
                    this.parentNode.parentNode.childNodes[2].innerText,this.parentNode.parentNode.childNodes[3].innerText,
                    this.parentNode.parentNode.childNodes[4].innerText,this.parentNode.parentNode.childNodes[5].innerText);
            }
        }
    }

    //点击添加班干信息
    var add = document.getElementById("add");
    add.onclick = function(){
        if(classes.value=="班级" || classes.value=="不选" || post.value=="职务" ||post.value=="不选"){
            alert("添加班干信息需选择完整年级、班级、职务");
        }
        else{
            addMessage(grade.value,classes.value,post.value);
        }
    }

    var cover = document.getElementById("cover");
    var operationFrame = document.getElementById("operationFrame");
    var frameTitle = operationFrame.getElementsByTagName("h2")[0];
    var tipsText = operationFrame.getElementsByTagName("p")[0];
    var operationTable = document.getElementById("operationTable");
    var operationTbody = operationTable.getElementsByTagName("tbody")[0];
    var successFrame = document.getElementById("successFrame");
    var successText = successFrame.getElementsByTagName("h2")[0];
    var successConfirm = document.getElementById("successConfirm");
    //修改班干信息
    function modifyMessage(gradeText,classesText,postText,name,long,short){
        cover.className="db";
        operationFrame.className="db";
        frameTitle.innerText="修改信息";
        tipsText.innerText="您正在修改以下班干信息";
        operationTbody.rows[0].cells[6].innerText="信息修改";
        operationTbody.rows[1].cells[0].innerText=gradeText;
        operationTbody.rows[1].cells[1].innerText=classesText;
        operationTbody.rows[1].cells[2].innerText=postText;
        operationTbody.rows[1].cells[3].childNodes[0].value=name;
        operationTbody.rows[1].cells[3].childNodes[0].removeAttribute("readonly");
        operationTbody.rows[1].cells[4].childNodes[0].value=long;
        operationTbody.rows[1].cells[4].childNodes[0].removeAttribute("readonly");
        operationTbody.rows[1].cells[5].childNodes[0].value=short;
        operationTbody.rows[1].cells[5].childNodes[0].removeAttribute("readonly");
        var confirm = document.getElementById("confirm");
        var cancel = document.getElementById("cancel");
        cancel.onclick = function(){
            cover.className="dn";
            operationFrame.className="dn";
        }
        confirm.onclick = function(){
            if(operationTbody.rows[1].cells[5].childNodes[0].value==""){
                operationTbody.rows[1].cells[5].childNodes[0].value=0;
            }
            gradeText = gradeText.substring(0,gradeText.length-1);
            $.ajax({
                url:'UpdateStudentMessage.do',
                type:'POST',
                dataType:'json',
                cache:false,
                contentType : "application/json;charset=UTF-8",
                data:JSON.stringify({
                    'sname':operationTbody.rows[1].cells[3].childNodes[0].value,
                    'sphone_Long':operationTbody.rows[1].cells[4].childNodes[0].value,
                    'sposition':postText,
                    'grade':gradeText,
                    'sphone_Short':operationTbody.rows[1].cells[5].childNodes[0].value,
                    'classID':classesText
                }),
                success:function(modifyResult){
                    if(modifyResult.applyStatus.status=="ok"){
                        operationFrame.className="dn";
                        successText.innerText="修改成功";
                        successFrame.className="db";
                        successConfirm.onclick = function(){
                            successFrame.className="dn";
                            cover.className="dn";
                        }
                        getMessage(classes.value,grade.value,post.value);
                    }
                    else{
                        alert(modifyResult.applyStatus.hint);
                    }
                },
                error:function(){
                    alert(message);
                    // if(modifyResult.applyStatus.status=="ok"){
                    //     operationFrame.className="dn";
                    //     successText.innerText="修改成功";
                    //     successFrame.className="db";
                    //     successConfirm.onclick = function(){
                    //         successFrame.className="dn";
                    //         cover.className="dn";
                    //     }
                    //     getMessage(classes.value,grade.value,post.value);
                    // }
                    // else{
                    //     alert(modifyResult.applyStatus.hint);
                    // }
                }
            })
        }
    }
    //删除班干信息
    function deleteMessage(gradeText,classesText,postText,name,long,short){
        cover.className="db";
        operationFrame.className="db";
        frameTitle.innerText="删除信息";
        tipsText.innerText="您正在删除以下班干信息";
        operationTbody.rows[0].cells[6].innerText="信息删除";
        operationTbody.rows[1].cells[0].innerText=gradeText;
        operationTbody.rows[1].cells[1].innerText=classesText;
        operationTbody.rows[1].cells[2].innerText=postText;
        operationTbody.rows[1].cells[3].childNodes[0].value=name;
        operationTbody.rows[1].cells[3].childNodes[0].setAttribute("readonly","readonly");
        operationTbody.rows[1].cells[4].childNodes[0].value=long;
        operationTbody.rows[1].cells[4].childNodes[0].setAttribute("readonly","readonly");
        operationTbody.rows[1].cells[5].childNodes[0].value=short;
        operationTbody.rows[1].cells[5].childNodes[0].setAttribute("readonly","readonly");
        var confirm = document.getElementById("confirm");
        var cancel = document.getElementById("cancel");
        cancel.onclick = function(){
            cover.className="dn";
            operationFrame.className="dn";
        }
        confirm.onclick = function(){
            if(operationTbody.rows[1].cells[5].childNodes[0].value==""){
                operationTbody.rows[1].cells[5].childNodes[0].value=0;
            }
            gradeText = gradeText.substring(0,gradeText.length-1);
            $.ajax({
                url:'DeleteStudent.do',
                type:'POST',
                dataType:'json',
                cache:false,
                contentType : "application/json;charset=UTF-8",
                data:JSON.stringify({
                    'sposition':postText,
                    'grade':gradeText,
                    'classID':classesText
                }),
                success:function(deleteResult){
                    if(deleteResult.applyStatus.status=="ok"){
                        operationFrame.className="dn";
                        successText.innerText="删除成功";
                        successFrame.className="db";
                        successConfirm.onclick = function(){
                            successFrame.className="dn";
                            cover.className="dn";
                        }
                        getMessage(classes.value,grade.value,post.value);
                    }
                    else{
                        alert(deleteResult.applyStatus.hint);
                    }
                },
                error:function(){
                     alert(message);
//                    if(deleteResult.applyStatus.status=="ok"){
//                        operationFrame.className="dn";
//                        successText.innerText="删除成功";
//                        successFrame.className="db";
//                        successConfirm.onclick = function(){
//                            successFrame.className="dn";
//                            cover.className="dn";
//                        }
//                        getMessage(classes.value,grade.value,post.value);
//                    }
//                    else{
//                        alert(deleteResult.applyStatus.hint);
//                    }
                }
            })
        }
    }

    //添加班干信息
    function addMessage(gradeText,classesText,postText){
        cover.className="db";
        operationFrame.className="db";
        frameTitle.innerText="添加信息";
        tipsText.innerText="您正在添加以下班干信息";
        operationTbody.rows[0].cells[6].innerText="信息添加";
        operationTbody.rows[1].cells[0].innerText=gradeText;
        operationTbody.rows[1].cells[1].innerText=classesText;
        operationTbody.rows[1].cells[2].innerText=postText;
        operationTbody.rows[1].cells[3].childNodes[0].value="";
        operationTbody.rows[1].cells[3].childNodes[0].removeAttribute("readonly");
        operationTbody.rows[1].cells[4].childNodes[0].value="";
        operationTbody.rows[1].cells[4].childNodes[0].removeAttribute("readonly");
        operationTbody.rows[1].cells[5].childNodes[0].value="";
        operationTbody.rows[1].cells[5].childNodes[0].removeAttribute("readonly");
        var confirm = document.getElementById("confirm");
        var cancel = document.getElementById("cancel");
        cancel.onclick = function(){
            cover.className="dn";
            operationFrame.className="dn";
        }
        var shortPhone = "";
        confirm.onclick = function(){
        	if(operationTbody.rows[1].cells[5].childNodes[0].value==""){
        		shortPhone=0;
        		}
        		else{
        		shortPhone=operationTbody.rows[1].cells[5].childNodes[0].value;
        		}
        	if(gradeText.charAt(gradeText.length-1)=="级"){
        		gradeText = gradeText.substring(0,gradeText.length-1);
        		}
            $.ajax({
                url:'InStudentMessage.do',
                type:'POST',
                dataType:'json',
                cache:false,
                contentType : "application/json;charset=UTF-8",
                data:JSON.stringify({
                    'sname':operationTbody.rows[1].cells[3].childNodes[0].value,
                    'sphone_Long':operationTbody.rows[1].cells[4].childNodes[0].value,
                    'sposition':postText,
                    'grade':gradeText,
                    'sphone_Short':shortPhone,
                    'classID':classesText
                }),
                success:function(addResult){
                    if(addResult.applyStatus.status=="ok"){
                        operationFrame.className="dn";
                        successText.innerText="添加成功";
                        successFrame.className="db";
                        successConfirm.onclick = function(){
                            successFrame.className="dn";
                            cover.className="dn";
                        }
                        getMessage(classes.value,grade.value,post.value);
                    }
                    else{
                        alert(addResult.applyStatus.hint);
                    }
                },
                error:function(){
                     alert(message);
//                    if(addResult.applyStatus.status=="ok"){
//                        operationFrame.className="dn";
//                        successText.innerText="添加成功";
//                        successFrame.className="db";
//                        successConfirm.onclick = function(){
//                            successFrame.className="dn";
//                            cover.className="dn";
//                        }
//                        getMessage(classes.value,grade.value,post.value);
//                    }
//                    else{
//                        alert(deleteResult.applyStatus.hint);
//                    }
                }
            })
        }
    }


    //点击职务
    post.onclick = function(){
        if(gradeList.style.display!="table" && classesList.style.display!="table"){
            post.className="click-input";
            postList.style.display="table";
            choiceDiv[2].className +=" item-select";
            postList.focus();
        }
    }
    for(var i=0;i<postLi.length;i++){
        if(i%2==0){
            postLi[i].className="li-bg";
        }
        postLi[i].onclick = function(){
            post.value=this.innerText;
            post.className="";
            postList.style.display="none";
            choiceDiv[2].className="item";
            if(classes.value!="班级" && classes.value!="不选" || post.value!="职务" && post.value!="不选"){
                getMessage(classes.value,grade.value,post.value);
            }
        }
    }


    //点击空白处
    gradeList.onblur = function(){
        grade.className="";
        gradeList.style.display="none";
        choiceDiv[0].className="item";
    }
    classesList.onblur = function(){
        classes.className="";
        classesList.style.display="none";
        choiceDiv[1].className="item";
    }
    postList.onblur = function(){
        post.className="";
        postList.style.display="none";
        choiceDiv[2].className="item";
    }
}

