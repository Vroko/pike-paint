console.log("Running");
let canvas = document.getElementById("paint");
let ctx = canvas.getContext("2d");

let width = canvas.width, height = canvas.height;
let curX, curY, prevX, prevY;
let hold = false;
let fill_value = true, stroke_value = false;
let canvas_data = { "pencil": [], "eraser": [] };
// Set default line width
document.getElementById("pencilThickness").value = 2;
document.getElementById("eraserThickness").value = 2;

// Since the canvas is centered you this fixes the offset
function getCenterW() {    
    let toolbarW = document.getElementById("toolbar-container").offsetWidth;
    let midGrid =((document.getElementById("grid").offsetWidth) - (toolbarW * 2) - 750) / 2
    // console.log(toolbarW, midGrid)
    return toolbarW + midGrid;
}
function getCenterH() {
    let navbarH = document.getElementById("mainnav").offsetHeight;
    const margin = 20;
    return navbarH + margin
}

// Pencil function
function pencil(mode) {
    // If the mode is eraser than the stroke color is white
    if(mode == "eraser")
    {
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth =  document.getElementById("eraserThickness").value;
    }
    else
    {
        ctx.strokeStyle = document.getElementById("colorpicker").value;
        ctx.lineWidth =  document.getElementById("pencilThickness").value;
    }
    
    canvas.onmousedown = function(e){
        console.log("drawing")
        // Get the correct position relative to your curser and canvas
        let additionalWidth = getCenterW();
        let additionalHeight = getCenterH();
        console.log(canvas.offsetLeft)
        curX = e.clientX - additionalWidth;
        curY = e.clientY - (e.clientY / 8) - additionalHeight;
        hold = true;
        
        // Creates a path using the position of your mouse
        prevX = curX;
        prevY = curY;
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
    };
        
    canvas.onmousemove = function(e){
        if(hold){
            // If the mouse button is down then repeated set new mouse poisition and draw it
            let additionalWidth = getCenterW();
            let additionalHeight = getCenterH();
            curX = e.clientX - additionalWidth;
            console.log(e.clientY)
            curY = e.clientY - (e.clientY / 8) - additionalHeight;
            draw();
        }
    };
        
    canvas.onmouseup = function(){
        hold = false;
    };
        
    canvas.onmouseout = function(){
        hold = false;
    };
        
    function draw (){
        // Fill the created line
        ctx.lineTo(curX, curY);
        ctx.stroke();
        canvas_data.pencil.push({ 
            "startx": prevX,
            "starty": prevY, 
            "endx": curX, 
            "endy": curY, 
            "thick": ctx.lineWidth, 
            "color": ctx.strokeStyle 
        });
    }
}

// Save function
function save() {
    let data = JSON.stringify(canvas_data);
    let image = canvas.toDataURL();
    toggleModal();
}
// Toggle modal
function toggleModal() {
    let saveModal = document.getElementById("saveModal");
    saveModal.classList.toggle("is-active")
}

