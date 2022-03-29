function triggerStyle(x){
  var call_icon = document.getElementById("Call-icon");
  var whiteboard_icon = document.getElementById("Whiteboard-icon");
  var compiler_icon = document.getElementById("Compiler-icon");
  if(x=='Calls'){
    call_icon.style.borderLeft = "2px solid blue";
    call_icon.style.color = "#d4d5d9";
    call_icon.style.backgroundColor = "#181a1b";

    whiteboard_icon.style.borderLeft = "none";
    whiteboard_icon.style.color = "white";
    whiteboard_icon.style.backgroundColor = "black";

    compiler_icon.style.borderLeft = "none";
    compiler_icon.style.color = "white";
    compiler_icon.style.backgroundColor = "black";
  }
  else if(x=='Whiteboard'){
    whiteboard_icon.style.borderLeft = "2px solid blue";
    whiteboard_icon.style.color = "#d4d5d9";
    whiteboard_icon.style.backgroundColor = "#181a1b";

    call_icon.style.borderLeft = "none";
    call_icon.style.color = "white";
    call_icon.style.backgroundColor = "black";

    compiler_icon.style.borderLeft = "none";
    compiler_icon.style.color = "white";
    compiler_icon.style.backgroundColor = "black";
  }
  else if(x=='Compiler'){
    compiler_icon.style.borderLeft = "2px solid blue";
    compiler_icon.style.color = "#d4d5d9";
    compiler_icon.style.backgroundColor = "#181a1b";

    call_icon.style.borderLeft = "none";
    call_icon.style.color = "white";
    call_icon.style.backgroundColor = "black";

    whiteboard_icon.style.borderLeft = "none";
    whiteboard_icon.style.color = "white";
    whiteboard_icon.style.backgroundColor = "black";
  }
}

function trigger(x) {
  // var globalvar = document.getElementById("Global");
  // var chatvar = document.getElementById("Chat");
  var callsdiv = document.getElementById("call");
  var whiteboarddiv = document.getElementById("whiteboard");
  var compilerdiv = document.getElementById("compiler");
  if(x=='Calls'){
    callsdiv.style.display = "block";
    whiteboarddiv.style.display = "none";
    compilerdiv.style.display = "none";
  }
  else if(x=='Whiteboard'){
    callsdiv.style.display = "none";
    whiteboarddiv.style.display = "block";
    compilerdiv.style.display = "none";
  }
  else if(x=='Compiler'){
    callsdiv.style.display = "none";
    whiteboarddiv.style.display = "none";
    compilerdiv.style.display = "block";
  }
  triggerStyle(x);
}
