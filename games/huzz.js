function huzz(){
    var huzz = document.getElementById("huzz").value;
    var hasNumber = /\d/;
    if(hasNumber.test(huzz)){
        alert("Please enter a valid string");
    }
    huzz = huzz.split("");
    huzz = huzz.join("");
    if (huzz == "girl"){
        document.getElementById("result").innerHTML = "huzz";
    }
    else{
        huzz = document.getElementById("huzz").value;
        huzz = huzz.split("");
        //now we delete last one
        huzz.pop();
        huzz = huzz.join("");
        huzz = huzz + "huzz";
        document.getElementById("result").innerHTML = huzz;
    }
    
}
    window.onload = function() {
        var huzz = document.createElement("h1");
        huzz.innerHTML = "rizz";
        huzz.style.position = "absolute";
        huzz.style.left = "0px";
        huzz.style.top = "0px";
        var colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
        var colorIndex = 0;
        function changeColor() {
            huzz.style.transition = "color 0.5s ease";
            huzz.style.color = colors[colorIndex];
            colorIndex = (colorIndex + 1) % colors.length;
            setTimeout(changeColor, 500);
        }
        changeColor();
        huzz.style.fontSize = "50px";
        huzz.style.transform = "rotate(0deg)";
        document.body.appendChild(huzz);
        var x = 0;
        var y = 0;
        var xSpeed = 5;
        var ySpeed = 5;
        var rotation = 0;
        var rotationSpeed = 5;
        function moveHuzz(){
            x += xSpeed;
            y += ySpeed;
            rotation += rotationSpeed;
            huzz.style.left = x + "px";
            huzz.style.top = y + "px";
            huzz.style.transform = "rotate(" + rotation + "deg)";
            if(x + huzz.offsetWidth > window.innerWidth || x < 0){
                xSpeed *= -1;
            }
            if(y + huzz.offsetHeight > window.innerHeight || y < 0){
                ySpeed *= -1;
            }
            requestAnimationFrame(moveHuzz);
        }
        moveHuzz();
    }