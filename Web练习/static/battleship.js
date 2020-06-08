let view = {
    displayMessage: function (msg) {
        let data = document.querySelector('#messageArea')
        data.innerHTML = msg
    },
    displayHit: function (location) {
        let cell = document.getElementById(location)
        cell.setAttribute('class', 'hit')
    },
    displayMiss: function (location) {
        let cell = document.getElementById(location)
        cell.setAttribute('class', 'miss')
    }
};
let model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,
    ships: [{locations: [0, 0, 0], hits: ["", "", ""]},
        {locations: [0, 0, 0], hits: ["", "", ""]},
        {locations: [0, 0, 0], hits: ["", "", ""]}],
    // 标记被击中的战舰
    fire: function (guess) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            // 如果击中了战舰,hits对应位置修改为击中
            if (ship.locations.indexOf(guess) >= 0) {
                ship.hits[ship.locations.indexOf(guess)] = 'hit'
                view.displayHit(guess);
                view.displayMessage('HIT')
                // 如果战舰被击沉,标记+1
                if (this.isSunk(ship)) {
                    view.displayMessage('你击沉了一艘战舰!')
                    this.shipsSunk++
                }
                return true
            }
        }
        view.displayMiss(guess);
        view.displayMessage("You missed.");
        return false
    },
    // 如果战舰的三个坐标都被击中,则战舰被击沉
    isSunk: function (ship) {
        for (let i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== 'hit') {
                return false
            }
        }
        return true
    },
    // 生成 战舰的主函数
    generateShipLocations: function () {
        let location;
        for (let i = 0; i < this.numShips; i++) {
            // 先生成位置,再判断战舰位置是否冲突,冲突则重试,否则返回
            do {
                location = this.generateShip()
                // while中条件成立才返回
            } while (this.collision(location))
            this.ships[i].locations = location
        }
    },
    // 生成战舰
    generateShip: function () {
        // 确定方向 1:水平 0:垂直
        let direction = Math.floor(Math.random() * 2);
        let row, col;
        let newShipLocations = []
        if (direction === 1) {
            // 生成战舰的位置,水平位置的战舰列数不能超过网格大小,要用网格长度-战舰长度=战舰在水平位置的最大位置
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
        } else {
            // 反之亦然,垂直放置,行数不能超过边界
            row = Math.floor(Math.random() * this.boardSize - this.shipLength);
            col = Math.floor(Math.random() * (this.boardSize));
            newShipLocations.push((row + i) + "" + col);
        }
        for (let i = 0; i < this.shipLength; i++) {
            if (direction === 1) {
                newShipLocations.push(row + "" + (col + i));
            } else {
                newShipLocations.push((row + i) + "" + col);
            }
            console.log(newShipLocations)
        }
        return newShipLocations
    },
    // 检查战舰位置是否有冲突
    collision: function (location) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = model.ships[i]
            for (let j = 0; j < location.length; j++) {
                // 如果生成的位置已经存在了,返回大于0的下标
                if (ship.locations.indexOf(location[j]) >= 0) {
                    return true;
                }
            }
        }
        return false
    }
}
let controller = {
    //记录猜测次数
    guesses: 0,
    processGuess: function (guess) {
        let location = parseGuess(guess)
        if (location) {
            this.guesses++
            let hit = model.fire(location)
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage('游戏结束,开火' + this.guesses + '次')
            }
        } else {

        }
    },

}

function parseGuess(guess) {
    let alphabet = ["A", "B", "C", "D", "E", "F", "G"];
    if (guess !== null && guess.length === 2) {
        let row = alphabet.indexOf(guess[0])
        let col = guess[1]
        if (row < model.boardSize && col < model.boardSize && row >= 0 && col < model.boardSize && col < model.boardSize) {
            return row + col
        } else {
            alert("超出边界了");
        }
    } else {
        alert('输入正确的坐标')
    }
    return null
}

function init() {
    // 开火按钮事件
    let fireButton = document.getElementById('fireButton')
    fireButton.onclick = handleFireButton
    let guessInput = document.getElementById('guessInput')
    guessInput.onkeypress = handleKeyPress
    // 舒适化战舰位置
    model.generateShipLocations();
}

function handleKeyPress(e) {
    let fireButton = document.getElementById("fireButton");
    // 13是Enter对应值
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}

function handleFireButton() {
    // 获取输入框的值
    let guessInput = document.getElementById('guessInput')
    let guess = guessInput.value
    controller.processGuess(guess)
    // 输入后清空输入框
    guessInput.value = ''
}

window.onload = init;


