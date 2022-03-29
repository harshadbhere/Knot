let editor;

window.onload = function() {
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/c_cpp");
    editor.setFontSize(12);
    editor.setShowPrintMargin(false);
    editor.getSession().setAnnotations([{
      row: 1,
      column: 0,
      text: "Error Message", // Or the Json reply from the parser
      type: "error" // also "warning" and "information"
    }]);
}

function changeLanguage() {
  let language = $("#languages").val();
  if(language == 'C++' || language=='C'){editor.session.setMode("ace/mode/c_cpp"); editor.session.setValue(" ");}
  else if(language == 'Python'){ editor.session.setMode("ace/mode/python"); editor.session.setValue(" ");}
  else if(language == 'Java'){ editor.session.setMode("ace/mode/java"); editor.session.setValue(" ");}
}

function changeTheme(){
  let theme = $("#themes").val();
  if(theme=="monokai") editor.setTheme("ace/theme/monokai");
  else if(theme=="dracula") editor.setTheme("ace/theme/dracula");
  else if(theme=="github") editor.setTheme("ace/theme/github");
  else if(theme=="nord") editor.setTheme("ace/theme/nord_dark");
  else if(theme=="solarized") editor.setTheme("ace/theme/solarized_dark");
}

function changeSize(){
  let size = $("#font-size").val();
  if(size==6) editor.setFontSize(6);
  else if(size==8) editor.setFontSize(8);
  else if(size==10) editor.setFontSize(10);
  else if(size==12) editor.setFontSize(12);
  else if(size==14) editor.setFontSize(14);
  else if(size==16) editor.setFontSize(16);
  else if(size==18) editor.setFontSize(18);
  else if(size==20) editor.setFontSize(20);
}

function changebuttonAnime(){
  var x = document.getElementById("submit-button");
  var y = document.getElementById("loading-button");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
  } else {
    x.style.display = "none";
    y.style.display = "block";
  }

}
function changebuttonAnimation(){
  setTimeout(changebuttonAnime, 1000);
  changebuttonAnime();
}
