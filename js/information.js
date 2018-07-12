
window.onload = function(){

    var message = "网络传输有问题，请检查网络连接或刷新页面再次进行操作";

    var table = document.getElementById("table");
    var tbody = table.getElementsByTagName("tbody")[0];
    var submit = document.getElementById("submit");
    var bombFrame = document.getElementById("bombFrame");
    var cover = document.getElementById("cover");
    var confirm = document.getElementById("confirm");
    var cancel = document.getElementById("cancel");
    var resultFrame = document.getElementById("resultFrame");
    var cross = document.getElementById("cross");
    var resultText = document.getElementById("resultText");
    
    var majorClass = document.getElementById("majorClass");
    function stuMessage(){
        $.ajax({
            url:'select_Class_Member.do',
            type:'POST',
            dataType:'json',
            cache: false,
            success:function(messageResult){
                if(messageResult.applyStatus.status=="ok"){
                	majorClass.innerText=messageResult.classRoomMessage.grade+"级"+messageResult.classRoomMessage.major+messageResult.classRoomMessage.classNumber+"班";
                    for(var i=0;i<messageResult.classMemberMessage.length;i++){
                        for(var j=1;j<=12;j++){
                            if(messageResult.classMemberMessage[i].sposition==tbody.rows[j].cells[1].innerText){
                                tbody.rows[j].cells[2].childNodes[0].value = messageResult.classMemberMessage[i].sname;
                                tbody.rows[j].cells[3].childNodes[0].value = messageResult.classMemberMessage[i].sphone_Long;
                                if(messageResult.classMemberMessage[i].sphone_Short!=0){
                                    tbody.rows[j].cells[4].childNodes[0].value = messageResult.classMemberMessage[i].sphone_Short;
                                }
                                break;
                            }
                        }
                    }
                }
            },
            error:function(){
                alert(message);
                // if(messageResult.applyStatus.status=="ok"){
                //     for(var i=0;i<messageResult.classMemberMessage.length;i++){
                //         for(var j=1;j<=12;j++){
                //             if(messageResult.classMemberMessage[i].sposition==tbody.rows[j].cells[1].innerText){
                //                 tbody.rows[j].cells[2].childNodes[0].value = messageResult.classMemberMessage[i].sname;
                //                 tbody.rows[j].cells[3].childNodes[0].value = messageResult.classMemberMessage[i].sphone_Long;
                //                 if(messageResult.classMemberMessage[i].sphone_Short!=0){
                //                     tbody.rows[j].cells[4].childNodes[0].value = messageResult.classMemberMessage[i].sphone_Short;
                //                 }
                //                 break;
                //             }
                //         }
                //     }
                // }
            }
        })
    }
    stuMessage();

    submit.onclick = function(){
        var can=true;
        for(var i=1;i<=12;i++){
            if(i!=8){
                if(tbody.rows[i].cells[2].childNodes[0].value=="" || tbody.rows[i].cells[3].childNodes[0].value==""){
                    can=false;
                }
            }
        }
        if(can==true){
            cover.className="db";
            bombFrame.className="db";
        }
        else{
            alert("请填写完整所有班干的必填信息");
        }
    }
    //确认提交
    confirm.onclick = function(){
        var submitlist="";
        for(var i=1;i<=12;i++){
            var sposition = tbody.rows[i].cells[1].innerText;
            var sname = tbody.rows[i].cells[2].childNodes[0].value;
            var sphoneLong = tbody.rows[i].cells[3].childNodes[0].value;
            var sphoneShort = tbody.rows[i].cells[4].childNodes[0].value;
            if(sphoneShort==''){
                sphoneShort=0;
            }
            submitlist +=sname+","+sphoneLong+","+sphoneShort+","+sposition+"}";
        }
        submitlist = submitlist.substring(0,submitlist.length-1);
        canSubmit(submitlist);
    }
    function canSubmit(list){

        $.ajax({
            url:'In_Student_Message.do',
            type:'POST',
            cache:false,
            dataType:'json',
            data:({
                'inStudentMessageStringList':list
            }),
            success:function(submitResult){
                if(submitResult.status=="ok"){
                    resultText.innerText="提交成功";
                    bombFrame.className="dn";
                    resultFrame.className="db";
                }
                else{
                    alert(submitResult.hint);
                }
            },
            error:function(){
                alert(message);
                // if(submitResult.status=="ok"){
                //     resultText.innerText="提交成功";
                //     bombFrame.className="dn";
                //     resultFrame.className="db";
                // }
                // else{
                //     alert(submitResult.hint);
                // }
            }
        })
    }
    cross.onclick = function(){
        cover.className="dn";
        resultFrame.className="dn";
    }
    //取消提交
    cancel.onclick = function(){
        cover.className="dn";
        bombFrame.className="dn";
    }

    //点击临时保存
    var save = document.getElementById("save");
    save.onclick = function(){
        var saveList = "";
        for(var i=1;i<=12;i++){
            if(tbody.rows[i].cells[2].childNodes[0].value!="" && tbody.rows[i].cells[3].childNodes[0].value!=""){
                var sposition = tbody.rows[i].cells[1].innerText;
                var sname = tbody.rows[i].cells[2].childNodes[0].value;
                var sphoneLong = tbody.rows[i].cells[3].childNodes[0].value;
                var sphoneShort = tbody.rows[i].cells[4].childNodes[0].value;
                if(sphoneShort==''){
                    sphoneShort=0;
                }
                saveList +=sname+","+sphoneLong+","+sphoneShort+","+sposition+"}";
            }
            
        }
        saveList = saveList.substring(0,saveList.length-1);
        if(saveList!=""){
            canSave(saveList);
        }
    }

    function canSave(list){
//    	list = "["+list+"]";
        $.ajax({
            url: 'In_Student_Message.do',
            type: 'POST',
            dataType: 'json',
            cache: false,
            data:{
            	'inStudentMessageStringList':list
            },
            success:function(saveResult){
                if(saveResult.status=="ok"){
                    cover.className="db";
                    resultText.innerText="保存成功";
                    bombFrame.className="dn";
                    resultFrame.className="db";
                }
                else{
                    alert(saveResult.hint);
                }
            },
            error:function(){
                alert(message);
                // if(saveResult.status=="ok"){
                //     cover.className="db";
                //     resultText.innerText="保存成功";
                //     bombFrame.className="dn";
                //     resultFrame.className="db";
                // }
                // else{
                //     alert(saveResult.hint);
                // }
            }
        })
    }
}


// var submitResult=
// {
//     "status":"ok"
// }
// var saveResult=
// {
//     "status":"ok"
// }
// var messageResult=
// {
//     "classMemberMessage":[
//         // {
//         //     "sposition":"学习委员",
//         //     "sphone_Long":15217312189,
//         //     "sphone_Short":1,
//         //     "sname":"哈哈哈"
//         // },
//         // {
//         //     "sposition":"文体委员",
//         //     "sphone_Long":15217703450,
//         //     "sphone_Short":1,
//         //     "sname":"小明"
//         // },
//         // {
//         //     "sposition":"生活委员",
//         //     "sphone_Long":15222222222,
//         //     "sphone_Short":0,
//         //     "sname":"嗯嗯嗯"
//         // }
//     ],
//     "applyStatus":{
//         "status":"ok",
//         "hint":"信息获取成功"
//     }
// }