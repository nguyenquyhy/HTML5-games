var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Boundary = (function (_super) {
    __extends(Boundary, _super);
    function Boundary(context, x, y, normal) {
        _super.call(this, context, x, y, 0, 0, 1.1);
        this.normal = normal;
    }
    Boundary.prototype.update = function (elapsed, entities) {
        // Stand still
    };
    return Boundary;
})(Entity);
