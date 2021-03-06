/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>

var width = 800;
var height = 600;
// 创建游戏主对象
var game = new Phaser.Game(width, height, Phaser.AUTO, 'container');

var transitionFunc = 'cover';
var transitionData = { direction: 'left' };

var StateTransition = window.StateTransition;

var outState = {
    preload: function () {
        game.load.image('out-view', 'assets/out-view.jpg');
        game.load.image('in-view', 'assets/in-view.jpg');
    },

    create: function () {
        var outView = game.add.image(0, 0, 'out-view');
        outView.scale.setTo(height / outView.getLocalBounds().height);
    },
};

var inState = {
    preload: function () {
    },

    create: function () {
        var inView = game.add.image(0, 0, 'in-view');
        inView.scale.setTo(height / inView.getLocalBounds().height);
    },
}

game.state.add('out', outState);
game.state.add('in', inState);

window.onload = function () {
    game.load.crossOrigin = 'anonymous';
    game.plugins.add(StateTransition.Manager);
    var config = {
        type: ''
    };
    var gui = new dat.GUI({
        closeOnTop: false,
        width: 300,
    });

    gui.add(config, 'type', {
        '选择': '',
        '无': 'none',
        '盒状(box)': 'box',
        '新闻快报(bulletin)': 'bulletin',
        '棋盘(chessboard)': 'chessboard',
        '覆盖(cover)': 'cover',
        '揭开(uncover)': 'uncover',
        '时钟(clock)': 'clock',
        '溶解(dissolve)': 'dissolve',
        '淡出(fade)': 'fade',
        '线条(line)': 'line',
        '推进(push)': 'push',
        '形状(shape)': 'shape',
        '展开(spread)': 'spread',
        '收缩(shrink)': 'shrink',
        '百叶窗(shutter)': 'shutter',
        '擦除(wipe)': 'wipe',
    })
        .onFinishChange(function (type) {
            createGUI(gui, type);
        });
}

var tmpGUI = null;
function createGUI(gui, type) {

    for (var i = 0; i < gui.__controllers.length; i++) {
        var controller = gui.__controllers[i];
        if (controller.property && controller.property !== 'type') {
            gui.remove(controller);
        }
    }
    controller = null;

    if (type === 'none') {
        changeState();
    } else if (type === 'box') {
        var config = {
            'direction': '',
        }
        gui.add(config, 'direction', {
            '收缩(SHRINK)': StateTransition.Transition.Box.DIRECTION.SHRINK,
            '展开(SPREAD)': StateTransition.Transition.Box.DIRECTION.SPREAD,
        })
            .onFinishChange(function (direction) {
                changeStateByTransition({
                    type: 'box',
                    direction: direction,
                });
            });

    } else if (type === 'bulletin') {
        changeStateByTransition({
            type: 'bulletin',
        });

    } else if (type === 'cover') {
        var config = {
            'direction': '',
        }
        gui.add(config, 'direction', {
            '上(TOP)': StateTransition.Transition.Cover.DIRECTION.TOP,
            '下(BOTTOM)': StateTransition.Transition.Cover.DIRECTION.BOTTOM,
            '左(LEFT)': StateTransition.Transition.Cover.DIRECTION.LEFT,
            '右(RIGHT)': StateTransition.Transition.Cover.DIRECTION.RIGHT,
            '左上(LEFT_TOP)': StateTransition.Transition.Cover.DIRECTION.LEFT_TOP,
            '左下(LEFT_BOTTOM)': StateTransition.Transition.Cover.DIRECTION.LEFT_BOTTOM,
            '右上(RIGHT_TOP)': StateTransition.Transition.Cover.DIRECTION.RIGHT_TOP,
            '右下(RIGHT_BOTTOM)': StateTransition.Transition.Cover.DIRECTION.RIGHT_BOTTOM,
        })
            .onFinishChange(function (direction) {
                changeStateByTransition({
                    type: 'cover',
                    direction: direction,
                });
            });

    } else if (type === 'uncover') {
        var config = {
            'direction': '',
        }
        gui.add(config, 'direction', {
            '上(TOP)': StateTransition.Transition.Uncover.DIRECTION.TOP,
            '下(BOTTOM)': StateTransition.Transition.Uncover.DIRECTION.BOTTOM,
            '左(LEFT)': StateTransition.Transition.Uncover.DIRECTION.LEFT,
            '右(RIGHT)': StateTransition.Transition.Uncover.DIRECTION.RIGHT,
            '左上(LEFT_TOP)': StateTransition.Transition.Uncover.DIRECTION.LEFT_TOP,
            '左下(LEFT_BOTTOM)': StateTransition.Transition.Uncover.DIRECTION.LEFT_BOTTOM,
            '右上(RIGHT_TOP)': StateTransition.Transition.Uncover.DIRECTION.RIGHT_TOP,
            '右下(RIGHT_BOTTOM)': StateTransition.Transition.Uncover.DIRECTION.RIGHT_BOTTOM,
        })
            .onFinishChange(function (direction) {
                changeStateByTransition({
                    type: 'uncover',
                    direction: direction,
                });
            });

    } else if (type === 'clock') {
        changeStateByTransition({
            type: 'clock',
        });
    } else if (type === 'dissolve') {
        changeStateByTransition({
            type: 'dissolve',
        });
    } else if (type === 'fade') {
        var config = {
            'tipe': '',
        }
        gui.add(config, 'tipe', {
            '平滑(SMOOTHLY)': StateTransition.Transition.Fade.TIPE.SMOOTHLY,
            '全黑(BLACK)': StateTransition.Transition.Fade.TIPE.BLACK,
        })
            .onFinishChange(function (tipe) {
                changeStateByTransition({
                    type: 'fade',
                    tipe: tipe,
                });
            });

    } else if (type === 'line') {
        changeStateByTransition({
            type: 'line',
        });
    } else if (type === 'push') {
        var config = {
            'direction': '',
        }
        gui.add(config, 'direction', {
            '上(TOP)': StateTransition.Transition.Cover.DIRECTION.TOP,
            '下(BOTTOM)': StateTransition.Transition.Cover.DIRECTION.BOTTOM,
            '左(LEFT)': StateTransition.Transition.Cover.DIRECTION.LEFT,
            '右(RIGHT)': StateTransition.Transition.Cover.DIRECTION.RIGHT,
            // '左上(LEFT_TOP)': StateTransition.Transition.Cover.DIRECTION.LEFT_TOP,
            // '左下(LEFT_BOTTOM)': StateTransition.Transition.Cover.DIRECTION.LEFT_BOTTOM,
            // '右上(RIGHT_TOP)': StateTransition.Transition.Cover.DIRECTION.RIGHT_TOP,
            // '右下(RIGHT_BOTTOM)': StateTransition.Transition.Cover.DIRECTION.RIGHT_BOTTOM,
        })
            .onFinishChange(function (direction) {
                changeStateByTransition({
                    type: 'push',
                    direction: direction,
                });
            });

    } else if (type === 'shape') {
        var config = {
            'shape': '',
        }
        gui.add(config, 'shape', {
            '圆形(CIRCLE)': StateTransition.Transition.Shape.SHAPE.CIRCLE,
            '菱形(DIAMOND)': StateTransition.Transition.Shape.SHAPE.DIAMOND,
            '加号(PLUS)': StateTransition.Transition.Shape.SHAPE.PLUS,
        }).onFinishChange(function (shape) {
            changeStateByTransition({
                type: 'shape',
                shape: shape,
            });
        });
    } else if (type === 'shutter') {
        var config = {
            'direction': '',
        }
        gui.add(config, 'direction', {
            '水平(HORIZONTAL)': StateTransition.Transition.Shutter.DIRECTION.HORIZONTAL,
            '垂直(VERTICAL)': StateTransition.Transition.Shutter.DIRECTION.VERTICAL,
        }).onFinishChange(function (direction) {
            changeStateByTransition({
                type: 'shutter',
                direction: direction,
            });
        });
    } else if (type === 'wipe') {
        var config = {
            'direction': '',
        }
        gui.add(config, 'direction', {
            '向上(TOP)': StateTransition.Transition.Wipe.DIRECTION.TOP,
            '向下(BOTTOM)': StateTransition.Transition.Wipe.DIRECTION.BOTTOM,
            '向左(LEFT)': StateTransition.Transition.Wipe.DIRECTION.LEFT,
            '向右(RIGHT)': StateTransition.Transition.Wipe.DIRECTION.RIGHT,
            '左上(LEFT_TOP)': StateTransition.Transition.Wipe.DIRECTION.LEFT_TOP,
            '左下(LEFT_BOTTOM)': StateTransition.Transition.Wipe.DIRECTION.LEFT_BOTTOM,
            '右上(RIGHT_TOP)': StateTransition.Transition.Wipe.DIRECTION.RIGHT_TOP,
            '右下(RIGHT_BOTTOM)': StateTransition.Transition.Wipe.DIRECTION.RIGHT_BOTTOM,
        })
            .onFinishChange(function (direction) {
                changeStateByTransition({
                    type: 'wipe',
                    direction: direction,
                });
            });
    } else if (type === 'chessboard') {
        var config = {
            'direction': '',
        }
        gui.add(config, 'direction', {
            '水平(HORIZONTAL)': StateTransition.Transition.Chessboard.DIRECTION.HORIZONTAL,
            '垂直(VERTICAL)': StateTransition.Transition.Chessboard.DIRECTION.VERTICAL,
        }).onFinishChange(function (direction) {
            changeStateByTransition({
                type: 'chessboard',
                direction: direction,
            });
        });
    } else if (type === 'spread') {
        var config = {
            'direction': '',
        }
        gui.add(config, 'direction', {
            '上下(TOP_BOTTOM)': StateTransition.Transition.Spread.DIRECTION.TOP_BOTTOM,
            '左右(LEFT_RIGHT)': StateTransition.Transition.Spread.DIRECTION.LEFT_RIGHT,
            '左上(LEFT_TOP)': StateTransition.Transition.Spread.DIRECTION.LEFT_TOP,
            '左下(LEFT_BOTTOM)': StateTransition.Transition.Spread.DIRECTION.LEFT_BOTTOM,
            '右上(RIGHT_TOP)': StateTransition.Transition.Spread.DIRECTION.RIGHT_TOP,
            '右下(RIGHT_BOTTOM)': StateTransition.Transition.Spread.DIRECTION.RIGHT_BOTTOM,
        }).onFinishChange(function (direction) {
            changeStateByTransition({
                type: 'spread',
                direction: direction,
            });
        });
    } else if (type === 'shrink') {
        var config = {
            'direction': '',
        }
        gui.add(config, 'direction', {
            '上下(TOP_BOTTOM)': StateTransition.Transition.Shrink.DIRECTION.TOP_BOTTOM,
            '左右(LEFT_RIGHT)': StateTransition.Transition.Shrink.DIRECTION.LEFT_RIGHT,
        }).onFinishChange(function (direction) {
            changeStateByTransition({
                type: 'shrink',
                direction: direction,
            });
        });
    }
}

function changeState() {
    game.state.start('out');
    setTimeout(function () {
        game.state.start('in');
    }, 1000);
}

function changeStateByTransition(transitionData) {
    game.state.start('out');
    setTimeout(function () {
        game.stateTransition.start('in', transitionData);
    }, 1000);
}



