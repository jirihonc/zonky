"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_typescript_1 = require("mocha-typescript");
const chai_1 = require("chai");
let RatingTest = class RatingTest {
    method() {
        chai_1.assert.equal(1, 2, "Expected one to equal two.");
    }
};
__decorate([
    mocha_typescript_1.test
], RatingTest.prototype, "method", null);
RatingTest = __decorate([
    mocha_typescript_1.suite
], RatingTest);
//# sourceMappingURL=RatingTest.js.map