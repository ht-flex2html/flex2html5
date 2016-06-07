
// $(function(){ 
//     //阻止浏览器默认行。 
//     $(document).on({ 
//         dragleave:function(e){    //拖离 
//             e.preventDefault(); 
//         }, 
//         drop:function(e){  //拖后放 
//             e.preventDefault(); 
//         }, 
//         dragenter:function(e){    //拖进 
//             e.preventDefault(); 
//         }, 
//         dragover:function(e){    //拖来拖去 
//             e.preventDefault(); 
//         } 
//     }); 
//     var box = document.getElementById('submit'); //拖拽区域 
//     box.addEventListener("drop",function(e){ 
//         e.preventDefault(); //取消默认浏览器拖拽效果 
//         var fileList = e.dataTransfer.files; //获取文件对象 
//         //检测是否是拖拽文件到页面的操作 
//         if(fileList.length == 0){ 
//             return false; 
//         } 
//         //检测文件是不是图片 
//         // if(fileList[0].type.indexOf('image') === -1){ 
//         //     alert("您拖的不是图片！"); 
//         //     return false; 
//         // }
//         var img = window.URL.createObjectURL(fileList[0]);
//         var filename = fileList[0].name; //图片名称 
//         var filesize = Math.floor((fileList[0].size)/1024);  
//         if(filesize>500){ 
//             alert("上传大小不能超过500K."); 
//             return false; 
//         } 
//         var str = "<img src='"+img+"'><p>图片名称："+filename+"</p><p>大小："+filesize+"KB</p>"; 
//         $("#preview").html(str);
//     });
// }); 
function UploadFile(){
    var getTree = function (parentSub,parentFiles,parentName){
         var str="";
         str += "<li><a>" + parentName + "</a>";

         if(parentFiles.length > 0){//一级
              str += "<ul>";
              for(var i = 0; i < parentFiles.length; i++){
                str+="<li><a>"+parentFiles[i]+"</a></li>"
              }
         }
         if(parentSub.length > 0){
              if(parentFiles.length <= 0 && parentSub.length > 0){
                str += "<ul>";
              }
              for(var j=0; j < parentSub.length; j++){
                var name=parentSub[j].name;
                var sub=parentSub[j].sub;
                var files=parentSub[j].files;
                str+="<li><a>"+getTree(sub,files,name)+"</a></li>";
              }
         }

         if(parentSub.length > 0 || parentFiles.length > 0){
            str+="</ul></li>";
         } else {
            str+="</li>";
         }
         return str;
    }

    var getDir = function(disc,dir){
        var str;
        if($("#" + disc).val() == 'other'){
            str = $("#" + dir).val();
        } else {
            str = $("#" + disc).val() +　$("#" + dir).val();
        }
        return str;
    }

    // var formData = new FormData($("#submit")[0]);
    var input = getDir("discInput","sourceDir");
    var output = getDir("discOutput","outputDir");

    var changeData = {sourceDir:input,outputDir:output};
    console.log(changeData);
    $.ajax({
        url: '/upload',
        type: 'post',
        data: JSON.stringify(changeData),
        dataType:"json",
        async: false,  
        cache: false,  
        contentType: false,  
        processData: false,
        success: function(result){
            var data = JSON.stringify(data);
            data = result.anlyiseNum;
　         　var struct = "<li><span>" + (data.classNum || 0) + "</span>个</li>"
  　　                  + "<li><span>" + (data.interfaceNum || 0) + "</span>个</li>"
      　                + "<li><span>" + (data.functionNum || 0) + "</span>个</li>";
       　         
            $("#reportNum").html(struct);

            var directory = result.directory;
            var dirName=directory["name"];
            var praSub=directory["sub"];
            var praFiles=directory["files"];
            $(".tree").html("<ul>" + getTree(praSub,praFiles,dirName) + "</ul>");

            $( '.tree li' ).each( function() {

                if( $( this ).children( 'ul' ).length > 0 ) {
                    $( this ).addClass( 'parent' );   
                }
            });
            $( '.tree li.parent > a' ).click( function( ) {
                $( this ).parent().toggleClass( 'active' );
                $( this ).parent().children( 'ul' ).slideToggle( 'fast' );
            });
            $( '#all' ).click( function() {
                $( '.tree li' ).each( function() {
                    $( this ).toggleClass( 'active' );
                    $( this ).children( 'ul' ).slideToggle( 'fast' );
                });
            });
            $("#scanModule").show();
        }, 
        error: function(data){
            console.log("错误信息", data);
        }
    });
}



function discSelect(type){
    var item;
    if(type == 1){
        item = $("#discInput");
    } else {
        item = $("#discOutput");
    }

    if (item.val() == "other") {
            item.next().attr("placeholder","请填写完整路径");
    } else {
            item.next().attr("placeholder","");
    }
}