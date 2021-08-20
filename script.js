// How do u play this game?????
// Revamp seedItems() 
// Add an actionable item 
// Add in functionality to interact with actionable items
// 

const height = window.innerHeight;
const width = window.innerWidth;

const max_vel = 5;
const acc = 0.2;

size = 35;

console.log(height)
console.log(width)

var character = {
    xpos: 0,
    ypos: 0,
    xvelocity: 0,
    yvelocity: 0,
    place: function () {
        var img = new Image(size, size)
        img.src = "character.png";
        img.style = "position: absolute; left: " + (width/2 - size/2) + "px; top:" + (height/2 - size/2) + "px";
        document.body.appendChild(img);
    }
}

var controls = {
    up: false,
    down: false,
    right: false,
    left: false
}

var items = [];

var itemTypes = [
    {
        name: "rainbow",
        src: "rainbow.png",
        interact: function () {
            size += 5;
        }
    }
]

document.addEventListener("keydown", function (bort) {
    if (bort.code == "ArrowUp") {
        controls.up = true;
    } else if (bort.code == "ArrowDown") {
        controls.down = true;
    } else if (bort.code == "ArrowLeft") {
        controls.left = true;
    } else if (bort.code == "ArrowRight") {
        controls.right = true;
    } else if (bort.code == "KeyI") {
        // 1. Look for items within 100px of the player
        // 2. If there are items, action them 
    }
});

document.addEventListener("keyup", function (bort) {
    if (bort.code == "ArrowUp") {
        controls.up = false;
    } else if (bort.code == "ArrowDown") {
        controls.down = false;
    } else if (bort.code == "ArrowLeft") {
        controls.left = false;
    } else if (bort.code == "ArrowRight") {
        controls.right = false;
    } 
});

function beginGame () {
    seedItems();
    loop();
}

function seedItems () {
    for (let i = 0; i < 100; i++) {
        let x = Math.floor(Math.random() * 5000) - 2500;
        let y = Math.floor(Math.random() * 5000) - 2500;

        items.push({
            xpos: x,
            ypos: y,
            itemType: 0
        })
    }
}

function loop () {
    document.body.innerHTML = "";
    
    character.xpos += character.xvelocity;
    character.ypos += character.yvelocity;
    
    move();
    resist();
    placeItems();
    character.place();
    action();

    window.requestAnimationFrame(loop);
}

// Applies linear resistance to the player's movement
function resist () {
    if (character.xvelocity > 0) {
        character.xvelocity += -0.05;
    } else if (character.xvelocity < 0) {
        character.xvelocity += 0.05;
    }

    if (character.yvelocity > 0) {
        character.yvelocity += -0.05;
    } else if (character.yvelocity < 0) {
        character.yvelocity += 0.05;
    }

    if (Math.abs(character.xvelocity) < 0.1) {
        character.xvelocity = 0;
    }

    if (Math.abs(character.yvelocity) < 0.1) {
        character.yvelocity = 0;
    }
}

// Places the items on the map
function placeItems() {
    items.forEach(element => {
        if (isInScreen(element.xpos, element.ypos)) {
            
            var img = new Image(25, 25);
            img.src = itemTypes[element.itemType].src;
            img.style = "position: absolute; left:" + (element.xpos - topLeft()[0]) + "px; top:" + (-element.ypos - topLeft()[1]) + "px";

            document.body.appendChild(img);

        }
    })
}

// Not currently used
function mapToScreen (x, y) {
    return {
        x: x - topLeft()[0],
        y: y - topLeft()[1]
    }
}

// Not currently used
function isInScreen (xpos, ypos) {
    // Working leave it alone you idiot
    if (character.xpos + width/2 > xpos && character.xpos - width/2 < xpos) {
        var withinX = true;
    } else {
        var withinX = false;
    }


    if (-ypos - topLeft()[1] > 0 && -ypos - topLeft()[1] < height) {
        var withinY = true;
    } else {
        var withinY = false;
    }

    return withinY && withinX;
}

function topLeft () {
    var x = character.xpos - width/2;
    var y = character.ypos - height/2;

    return [x,y];
}

function move () {
    if (controls.up && Math.abs(character.yvelocity) <= max_vel) {
        character.yvelocity += -acc;  
    } else if (controls.down && Math.abs(character.yvelocity) <= max_vel) {
        character.yvelocity += acc;
    } else if (controls.left && Math.abs(character.xvelocity) <= max_vel) {
        character.xvelocity += -acc;
    } else if (controls.right && Math.abs(character.xvelocity) <= max_vel) {
        character.xvelocity += acc;
    }
}

function action () {
    items.forEach((item, i) => {
        if (Math.abs(item.ypos + character.ypos) < size && Math.abs(item.xpos - character.xpos) < size) {
            size += 5;
            items.splice(i, 1);
        }
    })
}