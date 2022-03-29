var loader;

function loadNow(opacity) {
    if (opacity <= 0) {
        displayContent();
    } else {
        loader.style.opacity = opacity;
        window.setTimeout(function() {
            loadNow(opacity - 1);
        }, 2000);
    }
}

function displayContent() {
    loader.style.display = 'none';
    document.getElementById('content').style.display = 'block';

swal({
  title: 'Login Successful!',
  icon: 'success',
  timer: 1500
})

}

document.addEventListener("DOMContentLoaded", function() {
    loader = document.getElementById('loader');
loadNow(1);
});
