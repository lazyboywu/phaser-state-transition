/// <reference path='../definitions.d.ts'/>

import View from '../view';
import Base from './base';

export default class Line extends Base {

    lineWidth: number;
    tween: Phaser.Tween;
    mask: any;

    constructor(game: Phaser.Game, outView: View, inView: View) {
        super(game, outView, inView);

        this.lineWidth = 6;
    }

    run() {
        this.game.world.add(this.outView);
        this.game.world.add(this.inView);
        this.inView.visible = false;

        var mask = this.game.make.graphics(0, 0);
        mask.beginFill(0xFFFFFF);
        this.mask = mask;

        var lines = this.createLines();
        var maxLength = lines.length;

        var that = this;
        var processStart = {
            set lineIndex(lineIndex) {
                that.fillLine(lineIndex, lines, maxLength);
            },
            get lineIndex() {
                return 0;
            }
        }
        var processEnd = {
            lineIndex: maxLength,
        }


        var tween = this.game.add.tween(processStart);
        tween.to(processEnd, 1000, Phaser.Easing.Linear.None, true);
        tween.onStart.addOnce(this.onStartHandle, this);
        tween.onComplete.addOnce(this.complete, this);

        this.tween = tween;
    }

    onStartHandle() {
        this.inView.mask = this.mask;
        this.inView.visible = true;
    }

    createLines() {
        var w = this.game.width / this.inView.scale.x;

        var lines: number[] = [];

        for (var x = 0; x < w; x += this.lineWidth) {
            lines.push(x);
        }

        lines = lines.slice(0);
        Phaser.ArrayUtils.shuffle(lines);

        return lines;
    }

    fillLine(lineIndex: number, lines: number[], maxLength: number) {

        lineIndex = Math.floor(lineIndex)
        while (maxLength - lineIndex < lines.length) {
            var x = lines.pop();
            this.mask.drawRect(x, 0, this.lineWidth, this.game.height);
        }

    }

    complete() {
        this.mask.destroy();
        this.inView.mask = null;
        this.game.tweens.remove(this.tween);
        this.game.world.remove(this.outView);
        this.game.world.remove(this.inView);
        super.complete();
    }
}
