/*
 Basic Primitives orgDiagram v2.0.23
 Copyright (c) 2013 - 2015 Basic Primitives Inc

 Non-commercial - Free
 http://creativecommons.org/licenses/by-nc/3.0/

 Commercial and government licenses:
 http://www.basicprimitives.com/pdf/license.pdf

*/
(function() {
    var a = function(a) {
        var a = a.split("."),
            c = window,
            d;
        for (d = 0; d < a.length; d += 1) c = c[a[d]] = c[a[d]] || {};
        return c
    };
    a("primitives.common");
    a("primitives.common.perimeter");
    a("primitives.orgdiagram");
    a("primitives.famdiagram");
    a("primitives.text");
    a("primitives.callout");
    a("primitives.connector");
    a("primitives.shape")
})();
primitives.common.isNullOrEmpty = function(a) {
    var b = !0;
    void 0 !== a && null !== a && (a = a.toString(), 0 < a.length && (b = !1));
    return b
};
primitives.common.isEmptyObject = function(a) {
    var b = !0,
        c;
    for (c in a)
        if (a.hasOwnProperty(c)) {
            b = !1;
            break
        }
    return b
};
primitives.common.hashCode = function(a) {
    var b = 0,
        c, d;
    if (0 < a.length)
        for (d = 0; d < a.length; d += 1) c = a.charCodeAt(d), b = (b << 5) - b + c, b &= b;
    return b
};
primitives.common.attr = function(a, b) {
    var c, d;
    if (a.hasOwnProperty("attrHash"))
        for (c in b) b.hasOwnProperty(c) && (d = b[c], a.attrHash[c] != d && (a.attrHash[c] = d, a.attr(c, d)));
    else a.attr(b), a.attrHash = b
};
primitives.common.css = function(a, b) {
    var c, d;
    if (a.hasOwnProperty("cssHash"))
        for (c in b) b.hasOwnProperty(c) && (d = b[c], a.cssHash[c] != d && (a.cssHash[c] = d, a.css(c, d)));
    else a.css(b), a.cssHash = b
};
primitives.common.stopPropagation = function(a) {
    void 0 !== a.stopPropagation ? a.stopPropagation() : void 0 !== a.cancelBubble ? a.cancelBubble = !0 : void 0 !== a.preventDefault && a.preventDefault()
};
primitives.common.indexOf = function(a, b, c) {
    var d, e;
    for (d = 0; d < a.length; d += 1)
        if (e = a[d], null != c ? c(e, b) : e === b) return d;
    return -1
};
primitives.common._supportsSVG = null;
primitives.common.supportsSVG = function() {
    null === primitives.common._supportsSVG && (primitives.common._supportsSVG = document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Shape", "1.0"));
    return primitives.common._supportsSVG
};
primitives.common._supportsVML = null;
primitives.common.supportsVML = function() {
    var a, b;
    null === primitives.common._supportsVML && (primitives.common._supportsVML = !1, jQuery.support.opacity || (a = document.createElement("div"), a = document.body.appendChild(a), a.innerHTML = '<v:shape adj="1" />', b = a.firstChild, b.style.behavior = "url(#default#VML)", primitives.common._supportsVML = b ? "object" === typeof b.adj : !1, a.parentNode.removeChild(a)));
    return primitives.common._supportsVML
};
primitives.common._supportsCanvas = null;
primitives.common.supportsCanvas = function() {
    null === primitives.common._supportsCanvas && (primitives.common._supportsCanvas = !!window.HTMLCanvasElement);
    return primitives.common._supportsCanvas
};
primitives.common.createGraphics = function(a, b) {
    var c = null,
        d, e;
    d = [a];
    for (e in primitives.common.GraphicsType) primitives.common.GraphicsType.hasOwnProperty(e) && d.push(primitives.common.GraphicsType[e]);
    for (e = 0; null === c && e < d.length; e += 1) switch (d[e]) {
        case 2:
            primitives.common.supportsVML() && (c = new primitives.common.VmlGraphics(b));
            break;
        case 0:
            primitives.common.supportsSVG() && (c = new primitives.common.SvgGraphics(b));
            break;
        case 1:
            primitives.common.supportsCanvas() && (c = new primitives.common.CanvasGraphics(b))
    }
    return c
};
primitives.common.getColorHexValue = function(a) {
    var b, c, d;
    if ("#" === a.substr(0, 1)) return a;
    b = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(a);
    if (null !== b && 0 < b.length) return a = parseInt(b[2], 10), c = parseInt(b[3], 10), d = parseInt(b[4], 10), a = (a << 16 | c << 8 | d).toString(16), b[1] + "000000".substr(0, 6 - a.length) + a;
    if (void 0 === primitives.common.ColorHexs)
        for (c in primitives.common.ColorHexs = {}, primitives.common.Colors) primitives.common.Colors.hasOwnProperty(c) && (primitives.common.ColorHexs[c.toUpperCase()] = primitives.common.Colors[c]);
    return primitives.common.ColorHexs[a.toUpperCase()]
};
primitives.common.getColorName = function(a) {
    var b, a = primitives.common.getColorHexValue(a);
    if (void 0 === primitives.common.ColorNames)
        for (b in primitives.common.ColorNames = {}, primitives.common.Colors) primitives.common.Colors.hasOwnProperty(b) && (primitives.common.ColorNames[primitives.common.Colors[b]] = b);
    return primitives.common.ColorNames[a]
};
primitives.common.getRed = function(a) {
    return "#" === a.substr(0, 1) && 7 === a.length ? parseInt(a.substr(1, 2), 16) : null
};
primitives.common.getGreen = function(a) {
    return "#" === a.substr(0, 1) && 7 === a.length ? parseInt(a.substr(3, 2), 16) : null
};
primitives.common.getBlue = function(a) {
    return "#" === a.substr(0, 1) && 7 === a.length ? parseInt(a.substr(5, 2), 16) : null
};
primitives.common.beforeOpacity = function(a, b) {
    var c = primitives.common,
        d, e, a = c.getColorHexValue(a);
    d = Math.ceil((c.getRed(a) - 255 * (1 - b)) / b);
    e = Math.ceil((c.getGreen(a) - 255 * (1 - b)) / b);
    c = Math.ceil((c.getBlue(a) - 255 * (1 - b)) / b);
    d = (d << 16 | e << 8 | c).toString(16);
    return "#" + "000000".substr(0, 6 - d.length) + d
};
primitives.common.highestContrast = function(a, b, c) {
    var d = b,
        e = primitives.common,
        f = a + "," + b + "," + c;
    void 0 === e.highestContrasts && (e.highestContrasts = {});
    e.highestContrasts.hasOwnProperty(f) ? d = e.highestContrasts[f] : (e.luminosity(b, a) < e.luminosity(c, a) && (d = c), e.highestContrasts[f] = d);
    return d
};
primitives.common.luminosity = function(a, b) {
    var c = primitives.common,
        d = c.getColorHexValue(a),
        e = c.getColorHexValue(b),
        d = 0.2126 * Math.pow(c.getRed(d) / 255, 2.2) + 0.7152 * Math.pow(c.getRed(d) / 255, 2.2) + 0.0722 * Math.pow(c.getRed(d) / 255, 2.2),
        c = 0.2126 * Math.pow(c.getRed(e) / 255, 2.2) + 0.7152 * Math.pow(c.getRed(e) / 255, 2.2) + 0.0722 * Math.pow(c.getRed(e) / 255, 2.2);
    return d > c ? (d + 0.05) / (c + 0.05) : (c + 0.05) / (d + 0.05)
};
primitives.common.compareArrays = function(a, b, c) {
    var d = !0,
        e, f, g, h;
    if (a.length != b.length) d = !1;
    else {
        h = {};
        e = 0;
        for (f = a.length; e < f; e += 1) g = null != c ? c(a[e]) : a[e], h[g] = h.hasOwnProperty(g) ? h[g] + 1 : 1;
        e = 0;
        for (f = b.length; e < f; e += 1)
            if (g = null != c ? c(b[e]) : b[e], h.hasOwnProperty(g)) {
                if (h[g] -= 1, 0 > h[g]) {
                    d = !1;
                    break
                }
            } else {
                d = !1;
                break
            }
    }
    return d
};
var mouseHandled2 = !1;
jQuery(document).mouseup(function() {
    mouseHandled2 = !1
});
jQuery.widget("ui.mouse2", {
    version: "1.10.1",
    options: {
        cancel: "input,textarea,button,select,option",
        distance: 1,
        delay: 0
    },
    _mouseInit: function(a) {
        var b = this;
        this.element2 = a;
        this.element2.bind("mousedown." + this.widgetName, function(a) {
            return b._mouseDown(a)
        }).bind("click." + this.widgetName, function(a) {
            if (!0 === jQuery.data(a.target, b.widgetName + ".preventClickEvent")) return jQuery.removeData(a.target, b.widgetName + ".preventClickEvent"), a.stopImmediatePropagation(), !1
        });
        this.started = !1
    },
    _mouseDestroy: function() {
        this.element2.unbind("." +
            this.widgetName);
        this._mouseMoveDelegate && jQuery(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
    },
    _mouseDown: function(a) {
        if (!mouseHandled2) {
            this._mouseStarted && this._mouseUp(a);
            this._mouseDownEvent = a;
            var b = this,
                c = 1 === a.which,
                d = "string" === typeof this.options.cancel && a.target.nodeName ? jQuery(a.target).closest(this.options.cancel).length : !1;
            if (!c || d || !this._mouseCapture(a)) return !0;
            this.mouseDelayMet = !this.options.delay;
            this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                b.mouseDelayMet = !0
            }, this.options.delay));
            if (this._mouseDistanceMet(a) && this._mouseDelayMet(a) && (this._mouseStarted = !1 !== this._mouseStart(a), !this._mouseStarted)) return a.preventDefault(), !0;
            !0 === jQuery.data(a.target, this.widgetName + ".preventClickEvent") && jQuery.removeData(a.target, this.widgetName + ".preventClickEvent");
            this._mouseMoveDelegate = function(a) {
                return b._mouseMove(a)
            };
            this._mouseUpDelegate = function(a) {
                return b._mouseUp(a)
            };
            jQuery(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
            a.preventDefault();
            return mouseHandled2 = !0
        }
    },
    _mouseMove: function(a) {
        if (jQuery.ui.ie && (!document.documentMode || 9 > document.documentMode) && !a.button) return this._mouseUp(a);
        if (this._mouseStarted) return this._mouseDrag(a), a.preventDefault();
        this._mouseDistanceMet(a) && this._mouseDelayMet(a) && ((this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, a)) ? this._mouseDrag(a) :
            this._mouseUp(a));
        return !this._mouseStarted
    },
    _mouseUp: function(a) {
        jQuery(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
        this._mouseStarted && (this._mouseStarted = !1, a.target === this._mouseDownEvent.target && jQuery.data(a.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(a));
        return !1
    },
    _mouseDistanceMet: function(a) {
        return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY -
            a.pageY)) >= this.options.distance
    },
    _mouseDelayMet: function() {
        return this.mouseDelayMet
    },
    _mouseStart: function() {},
    _mouseDrag: function() {},
    _mouseStop: function() {},
    _mouseCapture: function() {
        return !0
    }
});
primitives.common.AdviserPlacementType = {
    Auto: 0,
    Left: 2,
    Right: 3
};
primitives.orgdiagram.AdviserPlacementType = primitives.common.AdviserPlacementType;
primitives.common.VerticalAlignmentType = {
    Top: 0,
    Middle: 1,
    Bottom: 2
};
primitives.common.UpdateMode = {
    Recreate: 0,
    Refresh: 1,
    PositonHighlight: 2
};
primitives.orgdiagram.UpdateMode = primitives.common.UpdateMode;
primitives.text.TextOrientationType = {
    Horizontal: 0,
    RotateLeft: 1,
    RotateRight: 2,
    Auto: 3
};
primitives.common.SideFlag = {
    Top: 1,
    Right: 2,
    Bottom: 4,
    Left: 8
};
primitives.common.ShapeType = {
    Rectangle: 0,
    Oval: 1,
    Triangle: 2,
    CrossOut: 3,
    Circle: 4,
    Rhombus: 5,
    None: 6
};
primitives.common.SelectionPathMode = {
    None: 0,
    FullStack: 1
};
primitives.orgdiagram.SelectionPathMode = primitives.common.SelectionPathMode;
primitives.common.SegmentType = {
    Line: 0,
    Move: 1,
    QuadraticArc: 2,
    CubicArc: 3,
    Dot: 4
};
primitives.common.RenderingMode = {
    Create: 0,
    Update: 1
};
primitives.common.PlacementType = {
    Auto: 0,
    TopLeft: 8,
    Top: 1,
    TopRight: 2,
    RightTop: 11,
    Right: 3,
    RightBottom: 12,
    BottomRight: 4,
    Bottom: 5,
    BottomLeft: 6,
    LeftBottom: 10,
    Left: 7,
    LeftTop: 9
};
primitives.common.PageFitMode = {
    None: 0,
    PageWidth: 1,
    PageHeight: 2,
    FitToPage: 3,
    PrintPreview: 4
};
primitives.orgdiagram.PageFitMode = primitives.common.PageFitMode;
primitives.common.OrientationType = {
    Top: 0,
    Bottom: 1,
    Left: 2,
    Right: 3
};
primitives.orgdiagram.OrientationType = primitives.common.OrientationType;
primitives.common.LineType = {
    Solid: 0,
    Dotted: 1,
    Dashed: 2
};
primitives.common.Layers = {
    BackgroundAnnotations: 1,
    Connector: 2,
    Highlight: 3,
    Marker: 4,
    Label: 5,
    Cursor: 6,
    Item: 7,
    ForegroundAnnotations: 8,
    Annotation: 9,
    Controls: 10
};
primitives.common.LabelType = {
    Regular: 0,
    Dummy: 1,
    Fixed: 2
};
primitives.orgdiagram.ItemType = {
    Regular: 0,
    Assistant: 1,
    Adviser: 2,
    SubAssistant: 4,
    SubAdviser: 5,
    GeneralPartner: 6,
    LimitedPartner: 7,
    AdviserPartner: 8
};
primitives.common.HorizontalAlignmentType = {
    Center: 0,
    Left: 1,
    Right: 2
};
primitives.common.GroupByType = {
    None: 0,
    Parents: 1,
    Children: 2
};
primitives.common.GraphicsType = {
    SVG: 0,
    Canvas: 1,
    VML: 2
};
primitives.common.Enabled = {
    Auto: 0,
    True: 1,
    False: 2
};
primitives.common.ElbowType = {
    None: 0,
    Dot: 1,
    Bevel: 2,
    Round: 3
};
primitives.common.ConnectorType = {
    Squared: 0,
    Angular: 1,
    Curved: 2
};
primitives.orgdiagram.ConnectorType = primitives.common.ConnectorType;
primitives.common.ConnectorStyleType = {
    Extra: 0,
    Regular: 1,
    Highlight: 2
};
primitives.common.ConnectorShapeType = {
    OneWay: 0,
    TwoWay: 1
};
primitives.common.ConnectorLabelPlacementType = {
    From: 0,
    Between: 1,
    To: 2
};
primitives.common.Colors = {
    AliceBlue: "#f0f8ff",
    AntiqueWhite: "#faebd7",
    Aqua: "#00ffff",
    Aquamarine: "#7fffd4",
    Azure: "#f0ffff",
    Beige: "#f5f5dc",
    Bisque: "#ffe4c4",
    Black: "#000000",
    BlanchedAlmond: "#ffebcd",
    Blue: "#0000ff",
    BlueViolet: "#8a2be2",
    Brown: "#a52a2a",
    BurlyWood: "#deb887",
    Bronze: "#cd7f32",
    CadetBlue: "#5f9ea0",
    ChartReuse: "#7fff00",
    Chocolate: "#d2691e",
    Coral: "#ff7f50",
    CornflowerBlue: "#6495ed",
    Cornsilk: "#fff8dc",
    Crimson: "#dc143c",
    Cyan: "#00ffff",
    DarkBlue: "#00008b",
    DarkCyan: "#008b8b",
    DarkGoldenrod: "#b8860b",
    DarkGray: "#a9a9a9",
    DarkGreen: "#006400",
    DarkKhaki: "#bdb76b",
    DarkMagenta: "#8b008b",
    DarkOliveGreen: "#556b2f",
    Darkorange: "#ff8c00",
    DarkOrchid: "#9932cc",
    DarkRed: "#8b0000",
    DarkSalmon: "#e9967a",
    DarkSeaGreen: "#8fbc8f",
    DarkSlateBlue: "#483d8b",
    DarkSlateGray: "#2f4f4f",
    DarkTurquoise: "#00ced1",
    DarkViolet: "#9400d3",
    DeepPink: "#ff1493",
    DeepSkyBlue: "#00bfff",
    DimGray: "#696969",
    DodgerBlue: "#1e90ff",
    FireBrick: "#b22222",
    FloralWhite: "#fffaf0",
    ForestGreen: "#228b22",
    Fuchsia: "#ff00ff",
    Gainsboro: "#dcdcdc",
    GhostWhite: "#f8f8ff",
    Gold: "#ffd700",
    Goldenrod: "#daa520",
    Gray: "#808080",
    Green: "#008000",
    GreenYellow: "#adff2f",
    Honeydew: "#f0fff0",
    Hotpink: "#ff69b4",
    IndianRed: "#cd5c5c",
    Indigo: "#4b0082",
    Ivory: "#fffff0",
    Khaki: "#f0e68c",
    Lavender: "#e6e6fa",
    LavenderBlush: "#fff0f5",
    Lawngreen: "#7cfc00",
    Lemonchiffon: "#fffacd",
    LightBlue: "#add8e6",
    LightCoral: "#f08080",
    LightCyan: "#e0ffff",
    LightGoldenrodYellow: "#fafad2",
    LightGray: "#d3d3d3",
    LightGreen: "#90ee90",
    LightPink: "#ffb6c1",
    LightSalmon: "#ffa07a",
    LightSeaGreen: "#20b2aa",
    LightSkyBlue: "#87cefa",
    LightSlateGray: "#778899",
    LightSteelBlue: "#b0c4de",
    LightYellow: "#ffffe0",
    Lime: "#00ff00",
    Limegreen: "#32cd32",
    Linen: "#faf0e6",
    Magenta: "#ff00ff",
    Maroon: "#800000",
    MediumAquamarine: "#66cdaa",
    MediumBlue: "#0000cd",
    MediumOrchid: "#ba55d3",
    MediumPurple: "#9370d8",
    MediumSeaGreen: "#3cb371",
    MediumSlateBlue: "#7b68ee",
    MediumSpringGreen: "#00fa9a",
    MediumTurquoise: "#48d1cc",
    MediumVioletRed: "#c71585",
    MidnightBlue: "#191970",
    MintCream: "#f5fffa",
    MistyRose: "#ffe4e1",
    Moccasin: "#ffe4b5",
    NavajoWhite: "#ffdead",
    Navy: "#000080",
    Oldlace: "#fdf5e6",
    Olive: "#808000",
    Olivedrab: "#6b8e23",
    Orange: "#ffa500",
    OrangeRed: "#ff4500",
    Orchid: "#da70d6",
    PaleGoldenRod: "#eee8aa",
    PaleGreen: "#98fb98",
    PaleTurquoise: "#afeeee",
    PaleVioletRed: "#d87093",
    Papayawhip: "#ffefd5",
    Peachpuff: "#ffdab9",
    Peru: "#cd853f",
    Pink: "#ffc0cb",
    Plum: "#dda0dd",
    PowderBlue: "#b0e0e6",
    Purple: "#800080",
    Red: "#ff0000",
    RosyBrown: "#bc8f8f",
    RoyalBlue: "#4169e1",
    SaddleBrown: "#8b4513",
    Salmon: "#fa8072",
    SandyBrown: "#f4a460",
    SeaGreen: "#2e8b57",
    Seashell: "#fff5ee",
    Sienna: "#a0522d",
    Silver: "#c0c0c0",
    SkyBlue: "#87ceeb",
    SlateBlue: "#6a5acd",
    SlateGray: "#708090",
    Snow: "#fffafa",
    SpringGreen: "#00ff7f",
    SteelBlue: "#4682b4",
    Tan: "#d2b48c",
    Teal: "#008080",
    Thistle: "#d8bfd8",
    Tomato: "#ff6347",
    Turquoise: "#40e0d0",
    Violet: "#ee82ee",
    Wheat: "#f5deb3",
    White: "#ffffff",
    WhiteSmoke: "#f5f5f5",
    Yellow: "#ffff00",
    YellowGreen: "#9acd32"
};
primitives.common.ChildrenPlacementType = {
    Auto: 0,
    Vertical: 1,
    Horizontal: 2,
    Matrix: 3
};
primitives.orgdiagram.ChildrenPlacementType = primitives.common.ChildrenPlacementType;
primitives.common.AnnotationType = {
    Connector: 0,
    Shape: 1,
    HighlightPath: 2,
    Label: 3,
    Background: 4
};
primitives.common.Visibility = {
    Auto: 0,
    Normal: 1,
    Dot: 2,
    Line: 3,
    Invisible: 4
};
primitives.common.ZOrderType = {
    Auto: 0,
    Background: 1,
    Foreground: 2
};
primitives.common.RenderEventArgs = function() {
    this.renderingMode = this.templateName = this.context = this.element = null;
    this.isSelected = this.isCursor = !1
};
primitives.common.BaseShape = function() {};
primitives.common.BaseShape.prototype._getLabelPosition = function(a, b, c, d, e, f, g, h) {
    var i = null;
    switch (h) {
        case 1:
            i = new primitives.common.Rect(a + c / 2 - e / 2, b - g - f, e, f);
            break;
        case 2:
            i = new primitives.common.Rect(a + c - e, b - g - f, e, f);
            break;
        case 8:
            i = new primitives.common.Rect(a, b - g - f, e, f);
            break;
        case 3:
            i = new primitives.common.Rect(a + c + g, b + d / 2 - f / 2, e, f);
            break;
        case 11:
            i = new primitives.common.Rect(a + c + g, b, e, f);
            break;
        case 12:
            i = new primitives.common.Rect(a + c + g, b + d - f, e, f);
            break;
        case 4:
            i = new primitives.common.Rect(a + c - e,
                b + d + g, e, f);
            break;
        case 6:
            i = new primitives.common.Rect(a, b + d + g, e, f);
            break;
        case 7:
            i = new primitives.common.Rect(a - e - g, b + d / 2 - f / 2, e, f);
            break;
        case 9:
            i = new primitives.common.Rect(a - e - g, b, e, f);
            break;
        case 10:
            i = new primitives.common.Rect(a - e - g, b + d - f, e, f);
            break;
        default:
            i = new primitives.common.Rect(a + c / 2 - e / 2, b + d + g, e, f)
    }
    return i
};
primitives.common.BaseShape.prototype._betweenPoint = function(a, b) {
    return new primitives.common.Point((a.x + b.x) / 2, (a.y + b.y) / 2)
};
primitives.common.BaseShape.prototype._offsetPoint = function(a, b, c) {
    var d = null,
        d = a.distanceTo(b);
    return d = 0 == d || 0 == c ? new primitives.common.Point(a) : new primitives.common.Point(a.x + (b.x - a.x) / d * c, a.y + (b.y - a.y) / d * c)
};
primitives.common.Callout = function(a) {
    this.m_graphics = a;
    this.pointerPlacement = 0;
    this.cornerRadius = "10%";
    this.offset = 0;
    this.lineWidth = this.opacity = 1;
    this.pointerWidth = "10%";
    this.borderColor = "#000000";
    this.lineType = 0;
    this.fillColor = "#d3d3d3";
    this.m_map = [
        [8, 7, 6],
        [1, null, 5],
        [2, 3, 4]
    ]
};
primitives.common.Callout.prototype = new primitives.common.BaseShape;
primitives.common.Callout.prototype.draw = function(a, b) {
    var b = (new primitives.common.Rect(b)).offset(this.offset),
        c = new primitives.common.Point(b.x, b.y),
        d = new primitives.common.Point(b.right(), b.y),
        e = new primitives.common.Point(b.right(), b.bottom()),
        f = new primitives.common.Point(b.left(), b.bottom()),
        g = [null, null, null, null, null, null, null, null],
        f = [c, d, e, f],
        d = this.m_graphics.getPxSize(this.cornerRadius, Math.min(c.distanceTo(d), d.distanceTo(e))),
        h;
    null !== a && (c = 0 === this.pointerPlacement ? this._getPlacement(a,
        c, e) : this.pointerPlacement, null !== c && (g[c] = a));
    c = [];
    for (h = 0; h < f.length; h += 1) this._drawSegment(c, f[0], f[1], f[2], this.pointerWidth, d, g[1], g[2]), e = f.shift(), f.push(e), e = g.shift(), g.push(e), e = g.shift(), g.push(e);
    g = {};
    null !== this.fillColor && (g.fillColor = this.fillColor, g.opacity = this.opacity);
    null !== this.borderColor && (g.borderColor = this.borderColor);
    g.lineWidth = this.lineWidth;
    g.lineType = this.lineType;
    this.m_graphics.polyline(c, g)
};
primitives.common.Callout.prototype._getPlacement = function(a, b, c) {
    var d = null,
        e = null,
        d = a.x < b.x ? 0 : a.x > c.x ? 2 : 1,
        e = a.y < b.y ? 0 : a.y > c.y ? 2 : 1;
    return this.m_map[d][e]
};
primitives.common.Callout.prototype._drawSegment = function(a, b, c, d, e, f, g, h) {
    var i = this._offsetPoint(b, c, f),
        j = this._offsetPoint(c, b, f),
        d = this._offsetPoint(c, d, f),
        e = this.m_graphics.getPxSize(e, b.distanceTo(c) / 2);
    0 === a.length && a.push(new primitives.common.MoveSegment(i));
    null !== g && (i = this._betweenPoint(b, c), b = this._offsetPoint(i, b, e), e = this._offsetPoint(i, c, e), a.push(new primitives.common.LineSegment(b)), a.push(new primitives.common.LineSegment(g)), a.push(new primitives.common.LineSegment(e)));
    a.push(new primitives.common.LineSegment(j));
    null !== h ? (a.push(new primitives.common.LineSegment(h)), a.push(new primitives.common.LineSegment(d))) : a.push(new primitives.common.QuadraticArcSegment(c, d))
};
primitives.common.Connector = function(a) {
    this.m_graphics = a;
    this.transform = null;
    this.orientationType = 0;
    this.panelSize = null;
    this.connectorShapeType = 1;
    this.offset = 0;
    this.lineWidth = 1;
    this.labelOffset = 4;
    this.labelSize = new primitives.common.Size(60, 30);
    this.lineType = 0;
    this.labelPlacementType = primitives.common.ConnectorLabelPlacementType.Between;
    this.color = "#000000";
    this.hasLabel = !1;
    this.labelTemplateHashCode = this.labelTemplate = null
};
primitives.common.Connector.prototype = new primitives.common.BaseShape;
primitives.common.Connector.prototype.draw = function(a, b, c) {
    var d, e, f, g, h, i, j, k, l, m = 6 * this.lineWidth,
        n, p, q = 0,
        r = 0,
        t, v = new primitives.common.PaletteItem({
            lineColor: this.color,
            lineWidth: this.lineWidth,
            lineType: this.lineType
        }),
        s = new primitives.common.PolylinesBuffer,
        w = s.getPolyline(v),
        a = (new primitives.common.Rect(a)).offset(this.offset),
        b = (new primitives.common.Rect(b)).offset(this.offset);
    i = [];
    switch (this.connectorShapeType) {
        case 1:
            i = [-m / 2, m / 2];
            break;
        case 0:
            i = [0]
    }
    this.transform = new primitives.common.Transform;
    this.transform.size = this.panelSize;
    this.transform.setOrientation(this.orientationType);
    this.transform.transformRect(a.x, a.y, a.width, a.height, !1, this, function(b, c, d, e) {
        a = new primitives.common.Rect(b, c, d, e)
    });
    this.transform.transformRect(b.x, b.y, b.width, b.height, !1, this, function(a, c, d, e) {
        b = new primitives.common.Rect(a, c, d, e)
    });
    this.transform.transformRect(0, 0, this.labelSize.width, this.labelSize.height, !1, this, function(a, b, c, d) {
        n = new primitives.common.Size(c, d)
    });
    this.transform.transformRect(0, 0, this.panelSize.width,
        this.panelSize.height, !1, this,
        function(a, b, c, d) {
            t = new primitives.common.Size(c, d)
        });
    q = Math.max(this.hasLabel ? n.width : 0, 5 * m);
    if (a.right() + q < b.left() || a.left() > b.right() + q)
        if (a.left() > b.right() ? (d = new primitives.common.Point(a.left(), a.verticalCenter()), e = new primitives.common.Point(b.right(), b.verticalCenter()), q = 7, r = 3) : (d = new primitives.common.Point(a.right(), a.verticalCenter()), e = new primitives.common.Point(b.left(), b.verticalCenter()), q = 3, r = 7), f = new primitives.common.Rect(d, e), l = d.y <= e.y, k = d.x <
            e.x, f.height < f.width) {
            f.height < 2 * m && f.offset(0, l ? 2 * m : 0, 0, l ? 0 : 2 * m);
            g = 0;
            for (h = i.length; g < h; g += 1) j = i[g], s.addInverted(function(a) {
                a = a.getPolyline(v);
                a.segments.push(new primitives.common.MoveSegment(d.x, d.y + j));
                a.segments.push(new primitives.common.QuadraticArcSegment(f.horizontalCenter(), (l ? f.top() : f.bottom()) + j, e.x, e.y + j))
            }, !g), w.addArrow(this.lineWidth, function(a, b) {
                var c = s.getPolyline(b);
                c.segments = c.segments.concat(a)
            });
            i = n.width < 2 * (f.width / 5) ? primitives.common.QuadraticArcSegment.prototype.offsetPoint(d.x,
                d.y, f.horizontalCenter(), l ? f.top() : f.bottom(), e.x, e.y, 0.5) : new primitives.common.Point(d.x, l ? f.top() : f.bottom());
            p = new primitives.common.Rect(i.x + (k ? m : -n.width - m), l ? i.y - n.height - m : i.y + m, n.width, n.height)
        } else {
            g = 0;
            for (h = i.length; g < h; g += 1) j = i[g], s.addInverted(function(a) {
                a = a.getPolyline(v);
                a.segments.push(new primitives.common.MoveSegment(d.x, d.y + j));
                a.segments.push(new primitives.common.QuadraticArcSegment(f.horizontalCenter() + j * (l != k ? 1 : -1), (l ? f.top() : f.bottom()) + j, f.horizontalCenter() + j * (l != k ? 1 : -1),
                    f.verticalCenter() + j));
                a.segments.push(new primitives.common.QuadraticArcSegment(f.horizontalCenter() + j * (l != k ? 1 : -1), (l ? f.bottom() : f.top()) + j, e.x, e.y + j))
            }, !g), w.addArrow(this.lineWidth, function(a, b) {
                var c = s.getPolyline(b);
                c.segments = c.segments.concat(a)
            });
            p = new primitives.common.Rect(f.horizontalCenter() + (l != k ? m : -(m + n.width)), f.verticalCenter() - n.height / 2, n.width, n.height)
        } else if (a.verticalCenter() < b.top() || a.verticalCenter() > b.bottom()) {
        k = a.x < t.width / 2;
        d = new primitives.common.Point(k ? a.right() : a.left(),
            a.verticalCenter());
        e = new primitives.common.Point(k ? b.right() : b.left(), b.verticalCenter());
        r = q = k ? 3 : 7;
        f = new primitives.common.Rect(d, e);
        f.offset(10 * m, 0, 10 * m, 0);
        l = d.y <= e.y;
        g = 0;
        for (h = i.length; g < h; g += 1) j = i[g], s.addInverted(function(a) {
            a = a.getPolyline(v);
            a.segments.push(new primitives.common.MoveSegment(d.x, d.y + j));
            a.segments.push(new primitives.common.QuadraticArcSegment(k ? f.right() + j * (l ? -1 : 1) : f.left() - j * (l ? -1 : 1), f.verticalCenter(), k ? b.right() : b.left(), b.verticalCenter() - j))
        }, !g), w.addArrow(this.lineWidth,
            function(a, b) {
                var c = s.getPolyline(b);
                c.segments = c.segments.concat(a)
            });
        i = primitives.common.QuadraticArcSegment.prototype.offsetPoint(d.x, d.y, k ? f.right() : f.left(), f.verticalCenter(), e.x, e.y, 0.5);
        p = new primitives.common.Rect(i.x + (k ? m / 2 : -m / 2 - n.width), i.y - n.height / 2, n.width, n.height)
    } else {
        d = new primitives.common.Point(a.horizontalCenter(), a.top());
        e = new primitives.common.Point(b.horizontalCenter(), b.top());
        r = q = 1;
        f = new primitives.common.Rect(d, e);
        f.offset(0, 7 * m, 0, 0);
        k = d.x < e.x;
        g = 0;
        for (h = i.length; g < h; g +=
            1) j = i[g], s.addInverted(function(a) {
            a = a.getPolyline(v);
            a.segments.push(new primitives.common.MoveSegment(d.x + j, d.y));
            a.segments.push(new primitives.common.QuadraticArcSegment(f.horizontalCenter(), f.top() - j * (k ? -1 : 1), b.horizontalCenter() - j, b.top()))
        }, !g), w.addArrow(this.lineWidth, function(a, b) {
            var c = s.getPolyline(b);
            c.segments = c.segments.concat(a)
        });
        i = primitives.common.QuadraticArcSegment.prototype.offsetPoint(d.x, d.y, f.horizontalCenter(), f.top(), e.x, e.y, 0.5);
        p = new primitives.common.Rect(i.x - n.width /
            2, i.y - (this.labelOffset + n.height), n.width, n.height)
    }
    s.transform(this.transform, !0);
    this.m_graphics.polylinesBuffer(s);
    if (this.hasLabel) {
        switch (this.labelPlacementType) {
            case primitives.common.ConnectorLabelPlacementType.From:
                p = this._getLabelPosition(a.x, a.y, a.width, a.height, p.width, p.height, this.labelOffset, q);
                break;
            case primitives.common.ConnectorLabelPlacementType.To:
                p = this._getLabelPosition(b.x, b.y, b.width, b.height, p.width, p.height, this.labelOffset, r)
        }
        this.transform.transformRect(p.x, p.y, p.width,
            p.height, !0, this,
            function(a, b, c, d) {
                p = new primitives.common.Rect(a, b, c, d)
            });
        this.m_graphics.template(p.x, p.y, 0, 0, 0, 0, p.width, p.height, this.labelTemplate, this.labelTemplateHashCode, "onAnnotationLabelTemplateRender", c, null)
    }
};
primitives.common.Perimeter = function(a) {
    this.m_graphics = a;
    this.transform = null;
    this.opacity = this.lineWidth = 1;
    this.fillColor = null;
    this.lineType = 0;
    this.borderColor = null
};
primitives.common.Perimeter.prototype = new primitives.common.BaseShape;
primitives.common.Perimeter.prototype.draw = function(a) {
    var b = new primitives.common.PaletteItem({
            lineColor: this.borderColor,
            lineWidth: this.lineWidth,
            fillColor: this.fillColor,
            lineType: this.lineType,
            opacity: this.opacity
        }),
        c = new primitives.common.Polyline(b),
        d = this.lineWidth / 2,
        e = null,
        f = null,
        g = null,
        h = {};
    a.segments.iterate(function(b) {
        var j = 0,
            k = 0,
            l = !1;
        if (0 < d) switch (b.orientationType) {
            case 3:
                j = -d;
                l = !1;
                break;
            case 2:
                j = d;
                l = !1;
                break;
            case 0:
                k = d;
                l = !0;
                break;
            case 1:
                k = -d;
                l = !0;
                break;
            default:
                throw "Orientation is not defined!";
        }
        0 == c.segments.length && (f = new primitives.common.MoveSegment(b.fromPoint), c.segments.push(f), h[a.segments.endSegmentKey] = {
            point: f,
            isVertical: l
        });
        j = a.segments.segmentsHash.hasOwnProperty(b.oppositeKey) ? new primitives.common.MoveSegment(b.toPoint.x + j, b.toPoint.y + k) : new primitives.common.LineSegment(b.toPoint.x + j, b.toPoint.y + k);
        c.segments.push(j);
        0 < d && (l ? f.y = j.y : f.x = j.x, null != e && (!a.segments.segmentsHash.hasOwnProperty(e.oppositeKey) && a.segments.segmentsHash.hasOwnProperty(b.oppositeKey) ? h.hasOwnProperty(b.oppositeKey) ?
            (k = h[b.oppositeKey], k.isVertical ? f.y = k.point.y : f.x = k.point.x, g ? k.point.y = f.y : k.point.x = f.x) : h[b.oppositeKey] = {
                point: f,
                isVertical: g
            } : a.segments.segmentsHash.hasOwnProperty(e.oppositeKey) && !a.segments.segmentsHash.hasOwnProperty(b.oppositeKey) && (h.hasOwnProperty(e.key) ? (k = h[e.key], k.isVertical ? f.y = k.point.y : f.x = k.point.x, g ? k.point.y = f.y : k.point.x = f.x) : h[e.key] = {
                point: f,
                isVertical: l
            })), g = l, e = b);
        f = j
    });
    0 < d && !a.segments.segmentsHash.hasOwnProperty(e.oppositeKey) && (b = h[e.key], b.isVertical ? f.y = b.point.y :
        f.x = b.point.x, g ? b.point.y = f.y : b.point.x = f.x);
    c.transform(this.transform, !0);
    this.m_graphics.polyline(c.segments, c.paletteItem.toAttr())
};
primitives.common.Shape = function(a) {
    this.m_graphics = a;
    this.transform = null;
    this.orientationType = 0;
    this.panelSize = null;
    this.shapeType = 0;
    this.offset = new primitives.common.Thickness(0, 0, 0, 0);
    this.lineWidth = 1;
    this.labelOffset = 4;
    this.cornerRadius = "10%";
    this.opacity = 1;
    this.fillColor = null;
    this.labelSize = new primitives.common.Size(60, 30);
    this.lineType = 0;
    this.borderColor = null;
    this.hasLabel = !1;
    this.labelTemplateHashCode = this.labelTemplate = null;
    this.labelPlacement = 0
};
primitives.common.Shape.prototype = new primitives.common.BaseShape;
primitives.common.Shape.prototype.draw = function(a, b) {
    var c, d, e, f, g, a = (new primitives.common.Rect(a)).offset(this.offset);
    this.transform = new primitives.common.Transform;
    this.transform.size = this.panelSize;
    this.transform.setOrientation(this.orientationType);
    this.hasLabel && (c = this._getLabelPosition(a.x, a.y, a.width, a.height, this.labelSize.width, this.labelSize.height, this.labelOffset, this.labelPlacement));
    switch (this.shapeType) {
        case 0:
            f = new primitives.common.Callout(this.m_graphics);
            f.cornerRadius = this.cornerRadius;
            f.opacity = this.opacity;
            f.lineWidth = this.lineWidth;
            f.lineType = this.lineType;
            f.borderColor = this.borderColor;
            f.fillColor = this.fillColor;
            f.draw(null, a);
            break;
        default:
            g = new primitives.common.PaletteItem({
                lineColor: this.borderColor,
                lineWidth: this.lineWidth,
                lineType: this.lineType,
                fillColor: this.fillColor,
                opacity: this.opacity
            });
            f = new primitives.common.PolylinesBuffer;
            g = f.getPolyline(g);
            this.transform.transformRect(a.x, a.y, a.width, a.height, !1, this, function(b, c, d, e) {
                a = new primitives.common.Rect(b, c, d, e)
            });
            switch (this.shapeType) {
                case 4:
                    d = Math.min(a.width / 2, a.height / 2), a = new primitives.common.Rect(a.horizontalCenter() - d, a.verticalCenter() - d, 2 * d, 2 * d);
                case 1:
                    d = 0.5522848 * (a.width / 2);
                    e = 0.5522848 * (a.height / 2);
                    g.segments.push(new primitives.common.MoveSegment(a.x, a.verticalCenter()));
                    g.segments.push(new primitives.common.CubicArcSegment(a.x, a.verticalCenter() - e, a.horizontalCenter() - d, a.y, a.horizontalCenter(), a.y));
                    g.segments.push(new primitives.common.CubicArcSegment(a.horizontalCenter() + d, a.y, a.right(), a.verticalCenter() -
                        e, a.right(), a.verticalCenter()));
                    g.segments.push(new primitives.common.CubicArcSegment(a.right(), a.verticalCenter() + e, a.horizontalCenter() + d, a.bottom(), a.horizontalCenter(), a.bottom()));
                    g.segments.push(new primitives.common.CubicArcSegment(a.horizontalCenter() - d, a.bottom(), a.x, a.verticalCenter() + e, a.x, a.verticalCenter()));
                    break;
                case 5:
                    g.segments.push(new primitives.common.MoveSegment(a.horizontalCenter(), a.bottom()));
                    g.segments.push(new primitives.common.LineSegment(a.left(), a.verticalCenter()));
                    g.segments.push(new primitives.common.LineSegment(a.horizontalCenter(), a.y));
                    g.segments.push(new primitives.common.LineSegment(a.right(), a.verticalCenter()));
                    g.segments.push(new primitives.common.LineSegment(a.horizontalCenter(), a.bottom()));
                    break;
                case 2:
                    g.segments.push(new primitives.common.MoveSegment(a.left(), a.bottom()));
                    g.segments.push(new primitives.common.LineSegment(a.horizontalCenter(), a.y));
                    g.segments.push(new primitives.common.LineSegment(a.right(), a.bottom()));
                    g.segments.push(new primitives.common.LineSegment(a.left(),
                        a.bottom()));
                    break;
                case 3:
                    g.segments.push(new primitives.common.MoveSegment(a.horizontalCenter(), a.verticalCenter())), g.segments.push(new primitives.common.LineSegment(a.x, a.y)), g.segments.push(new primitives.common.MoveSegment(a.horizontalCenter(), a.verticalCenter())), g.segments.push(new primitives.common.LineSegment(a.right(), a.bottom())), g.segments.push(new primitives.common.MoveSegment(a.horizontalCenter(), a.verticalCenter())), g.segments.push(new primitives.common.LineSegment(a.right(), a.y)),
                        g.segments.push(new primitives.common.MoveSegment(a.horizontalCenter(), a.verticalCenter())), g.segments.push(new primitives.common.LineSegment(a.left(), a.bottom()))
            }
            f.transform(this.transform, !0);
            this.m_graphics.polylinesBuffer(f)
    }
    this.hasLabel && this.m_graphics.template(c.x, c.y, 0, 0, 0, 0, c.width, c.height, this.labelTemplate, this.labelTemplateHashCode, "onAnnotationLabelTemplateRender", b, null)
};
primitives.common.Point = function(a, b) {
    this.y = this.x = null;
    switch (arguments.length) {
        case 1:
            this.x = a.x;
            this.y = a.y;
            break;
        case 2:
            this.x = a, this.y = b
    }
};
primitives.common.Point.prototype.distanceTo = function(a, b) {
    var c = 0,
        d = 0;
    switch (arguments.length) {
        case 1:
            c = a.x;
            d = a.y;
            break;
        case 2:
            c = a, d = b
    }
    c = this.x - c;
    d = this.y - d;
    return Math.sqrt(c * c + d * d)
};
primitives.common.Point.prototype.swap = function(a) {
    var b = a.x,
        c = a.y;
    a.x = this.x;
    a.y = this.y;
    this.x = b;
    this.y = c
};
primitives.common.Point.prototype.clone = function() {
    return new primitives.common.Point(this)
};
primitives.common.Point.prototype.toString = function(a) {
    var b, a = void 0 !== a ? a : "px";
    b = "" + ("left:" + this.x + a + ";");
    return b += "top:" + this.y + a + ";"
};
primitives.common.MoveSegment = function() {
    this.parent = primitives.common.Point.prototype;
    this.parent.constructor.apply(this, arguments);
    this.segmentType = 1
};
primitives.common.MoveSegment.prototype = new primitives.common.Point;
primitives.common.MoveSegment.prototype.getEndPoint = function() {
    return this
};
primitives.common.MoveSegment.prototype.invert = function(a) {
    this.x = a.x;
    this.y = a.y
};
primitives.common.MoveSegment.prototype.transform = function(a, b) {
    var c = this;
    a.transformPoint(c.x, c.y, b, c, function(a, b) {
        c.x = a;
        c.y = b
    })
};
primitives.common.CubicArcSegment = function(a, b, c, d, e, f) {
    this.parent = primitives.common.Point.prototype;
    this.cpY2 = this.cpX2 = this.cpY1 = this.cpX1 = this.y = this.x = null;
    switch (arguments.length) {
        case 3:
            this.parent.constructor.apply(this, [c.x, c.y]);
            this.cpX1 = a.x;
            this.cpY1 = a.y;
            this.cpX2 = b.x;
            this.cpY2 = b.y;
            break;
        case 6:
            this.parent.constructor.apply(this, [e, f]), this.cpX1 = a, this.cpY1 = b, this.cpX2 = c, this.cpY2 = d
    }
    this.segmentType = 3
};
primitives.common.CubicArcSegment.prototype = new primitives.common.Point;
primitives.common.CubicArcSegment.prototype.getEndPoint = function() {
    return this
};
primitives.common.CubicArcSegment.prototype.invert = function(a) {
    var b = this.cpX1,
        c = this.cpY1;
    this.x = a.x;
    this.y = a.y;
    this.cpX1 = this.cpX2;
    this.cpY1 = this.cpY2;
    this.cpX2 = b;
    this.cpY2 = c
};
primitives.common.CubicArcSegment.prototype.transform = function(a, b) {
    var c = this;
    a.transform3Points(c.x, c.y, c.cpX1, c.cpY1, c.cpX2, c.cpY2, b, c, function(a, b, f, g, h, i) {
        c.x = a;
        c.y = b;
        c.cpX1 = f;
        c.cpY1 = g;
        c.cpX2 = h;
        c.cpY2 = i
    })
};
primitives.common.CubicArcSegment.prototype.trim = function(a, b) {
    var c = 0.5,
        d = this.offsetPoint(this.x, this.y, this.cpX2, this.cpY2, this.cpX1, this.cpY1, a.x, a.y, c),
        e = this.offsetPoint(this.x, this.y, this.cpX2, this.cpY2, this.cpX1, this.cpY1, a.x, a.y, 0.1),
        c = b * (c / d.distanceTo(this.x, this.y) + 0.1 / e.distanceTo(this.x, this.y)) / 2,
        d = this.offsetPoint(this.x, this.y, this.cpX2, this.cpY2, this.cpX1, this.cpY1, a.x, a.y, c);
    this.x = d.x;
    this.y = d.y;
    return this
};
primitives.common.CubicArcSegment.prototype.offsetPoint = function(a, b, c, d, e, f, g, h, i) {
    return new primitives.common.Point((1 - i) * (1 - i) * (1 - i) * a + 3 * (1 - i) * (1 - i) * i * c + 3 * (1 - i) * i * i * e + i * i * i * g, (1 - i) * (1 - i) * (1 - i) * b + 3 * (1 - i) * (1 - i) * i * d + 3 * (1 - i) * i * i * f + i * i * i * h)
};
primitives.common.DotSegment = function(a, b, c, d, e) {
    this.segmentType = 4;
    this.x = a;
    this.y = b;
    this.width = c;
    this.height = d;
    this.cornerRadius = e
};
primitives.common.Label = function() {
    this.position = this.text = null;
    this.weight = 0;
    this.isActive = !0;
    this.horizontalAlignmentType = this.labelOrientation = this.labelType = 0;
    this.verticalAlignmentType = 2
};
primitives.common.LineSegment = function() {
    this.parent = primitives.common.MoveSegment.prototype;
    this.parent.constructor.apply(this, arguments);
    this.segmentType = 0
};
primitives.common.LineSegment.prototype = new primitives.common.MoveSegment;
primitives.common.LineSegment.prototype.trim = function(a, b) {
    var c = this._offsetPoint(this, a, b);
    this.x = c.x;
    this.y = c.y;
    return this
};
primitives.common.LineSegment.prototype._offsetPoint = function(a, b, c) {
    var d = null,
        d = a.distanceTo(b);
    return d = 0 == d || 0 == c ? new primitives.common.Point(a) : new primitives.common.Point(a.x + (b.x - a.x) / d * c, a.y + (b.y - a.y) / d * c)
};
primitives.common.PaletteItem = function(a) {
    this.lineColor = "#c0c0c0";
    this.lineWidth = 1;
    this.lineType = 0;
    this.opacity = this.fillColor = null;
    this._key = "";
    var b, c, d, e;
    c = ["lineColor", "lineWidth", "lineType", "fillColor", "opacity"];
    d = 0;
    for (e = c.length; d < e; d += 1) b = c[d], null != a && a.hasOwnProperty(b) && (this[b] = a[b]), this._key += (!primitives.common.isNullOrEmpty(this._key) ? ", " : "") + b + ":" + this[b]
};
primitives.common.PaletteItem.prototype.toAttr = function() {
    var a = {
        lineWidth: this.lineWidth,
        lineType: this.lineType
    };
    null !== this.fillColor && (a.fillColor = this.fillColor);
    null !== this.opacity && (a.opacity = this.opacity);
    null !== this.lineColor && (a.borderColor = this.lineColor);
    return a
};
primitives.common.PaletteItem.prototype.toString = function() {
    return this._key
};
primitives.common.PaletteManager = function(a) {
    this.palette = [];
    this.cursor = 0;
    var b, c;
    if (0 == a.linesPalette.length) this.palette = [new primitives.common.PaletteItem({
        lineColor: a.linesColor,
        lineWidth: a.linesWidth,
        lineType: a.linesType
    })], this.paletteLength = this.palette.length, this.regularIndex = 0;
    else {
        b = 0;
        for (c = a.linesPalette.length; b < c; b += 1) this.palette.push(new primitives.common.PaletteItem(a.linesPalette[b]));
        this.paletteLength = this.palette.length;
        this.palette.push(new primitives.common.PaletteItem({
            lineColor: a.linesColor,
            lineWidth: a.linesWidth,
            lineType: a.linesType
        }));
        this.regularIndex = this.palette.length - 1
    }
    this.palette.push(new primitives.common.PaletteItem({
        lineColor: a.highlightLinesColor,
        lineWidth: a.highlightLinesWidth,
        lineType: a.highlightLinesType
    }));
    this.highlightIndex = this.palette.length - 1
};
primitives.common.PaletteManager.prototype.selectPalette = function(a) {
    this.cursor = a % this.paletteLength
};
primitives.common.PaletteManager.prototype.getPalette = function(a) {
    var b = null;
    switch (a) {
        case 1:
            b = this.regularIndex;
            break;
        case 2:
            b = this.highlightIndex;
            break;
        case 0:
            b = this.cursor
    }
    return this.palette[b]
};
primitives.common.Polyline = function(a) {
    this.paletteItem = new primitives.common.PaletteItem;
    this.segments = [];
    switch (arguments.length) {
        case 1:
            this.paletteItem = a
    }
    this.arrowPaletteItem = new primitives.common.PaletteItem({
        lineColor: this.paletteItem.lineColor,
        lineWidth: 0,
        fillColor: this.paletteItem.lineColor,
        opacity: 1
    })
};
primitives.common.Polyline.prototype.transform = function(a, b) {
    var c, d, e;
    c = 0;
    for (d = this.segments.length; c < d; c += 1) e = this.segments[c], null != e.transform && e.transform(a, b)
};
primitives.common.Polyline.prototype.isInvertable = function() {
    return primitives.common.isNullOrEmpty(this.paletteItem.fillColor)
};
primitives.common.Polyline.prototype.addInverted = function(a) {
    var b = a.segments,
        c, d;
    if (0 < b.length)
        if (this.isInvertable()) {
            d = b[b.length - 1].getEndPoint();
            this.segments.push(new primitives.common.MoveSegment(d));
            for (a = b.length - 1; 0 < a; a -= 1) c = b[a], d = b[a - 1], 4 != c.segmentType && 4 != d.segmentType && (d = d.getEndPoint(), c.invert(d)), this.segments.push(c)
        } else this.segments = this.segments.concat(b)
};
primitives.common.Polyline.prototype.addArrow = function(a, b) {
    var c, d, e;
    d = this.segments.length;
    var f;
    f = 8 * a;
    var g = 6 * a;
    null != b && 1 < d && (c = this.segments[d - 2].getEndPoint(), e = this.segments[d - 1], null != e.trim && (d = new primitives.common.Point(e.getEndPoint()), c = e.trim(c, g), f = this._getArrow(c.x, c.y, d.x, d.y, f, g), b(f, this.arrowPaletteItem, c)))
};
primitives.common.Polyline.prototype.optimizeMoveSegments = function() {
    var a, b, c, d, e;
    c = {};
    var f = [],
        g = [];
    a = 0;
    for (b = this.segments.length; a < b - 1; a += 1) switch (d = this.segments[a], e = this.segments[a + 1], d.segmentType) {
        case 0:
        case 2:
        case 3:
            switch (e.segmentType) {
                case 1:
                case 4:
                    d = d.x + "&" + d.y, c.hasOwnProperty(d) || (c[d] = a)
            }
            break;
        case 1:
            d = d.x + "&" + d.y, c.hasOwnProperty(d) && !f[c[d]] && (f[c[d]] = a + 1, g[a] = !0)
    }
    e = [];
    for (a = 0; a < b; a += 1)
        if (!g[a] && (d = this.segments[a], e.push(d), g[a] = !0, 0 < f[a]))
            for (c = f[a]; c < b && !g[c];) d = this.segments[c],
                e.push(d), g[c] = !0, c = 0 < f[c] ? f[c] : c + 1;
    this.segments = e
};
primitives.common.Polyline.prototype._getArrow = function(a, b, c, d, e, f) {
    for (var g = [], h, i, e = [new primitives.common.Point(e, -f / 2), new primitives.common.Point(0, 0), new primitives.common.Point(e, f / 2), new primitives.common.Point(3 * (e / 4), 0)], j = Math.atan2(b - d, a - c), a = 0, b = e.length; a < b; a += 1) f = e[a], h = f.x * Math.cos(j) - f.y * Math.sin(j), i = f.x * Math.sin(j) + f.y * Math.cos(j), f.x = h + c, f.y = i + d;
    g.push(new primitives.common.MoveSegment(e[0].x, e[0].y));
    g.push(new primitives.common.LineSegment(e[1].x, e[1].y));
    g.push(new primitives.common.LineSegment(e[2].x,
        e[2].y));
    g.push(new primitives.common.QuadraticArcSegment(e[3].x, e[3].y, e[0].x, e[0].y));
    return g
};
primitives.common.Polyline.prototype.toString = function() {
    return this.paletteItem.toString()
};
primitives.common.PolylinesBuffer = function() {
    this.polylines = {}
};
primitives.common.PolylinesBuffer.prototype._getPolyline = function(a, b) {
    a[b.toString()] || (a[b.toString()] = new primitives.common.Polyline(b));
    return a[b.toString()]
};
primitives.common.PolylinesBuffer.prototype.getPolyline = function(a) {
    return this._getPolyline(this.polylines, a)
};
primitives.common.PolylinesBuffer.prototype.getPolylines = function() {
    var a, b, c = [];
    for (a in this.polylines)
        if (this.polylines.hasOwnProperty(a) && (b = this.polylines[a])) b.optimizeMoveSegments(), c.push(b);
    return c
};
primitives.common.PolylinesBuffer.prototype.addInverted = function(a, b) {
    var c, d, e, f;
    d = this.polylines;
    this.polylines = [];
    null != a && a(this);
    for (c in this.polylines) this.polylines.hasOwnProperty(c) && (e = this._getPolyline(this.polylines, c), f = this._getPolyline(d, e.paletteItem), b ? f.segments = f.segments.concat(e.segments) : f.addInverted(e));
    this.polylines = d
};
primitives.common.PolylinesBuffer.prototype.transform = function(a, b) {
    var c, d;
    for (c in this.polylines) this.polylines.hasOwnProperty(c) && (d = this.polylines[c]) && d.transform(a, b)
};
primitives.common.QuadraticArcSegment = function(a, b, c, d) {
    this.cpY = this.cpX = this.y = this.x = null;
    switch (arguments.length) {
        case 2:
            this.x = b.x;
            this.y = b.y;
            this.cpX = a.x;
            this.cpY = a.y;
            break;
        case 4:
            this.cpX = a, this.cpY = b, this.x = c, this.y = d
    }
    this.segmentType = 2
};
primitives.common.QuadraticArcSegment.prototype.getEndPoint = function() {
    return this
};
primitives.common.QuadraticArcSegment.prototype.invert = function(a) {
    this.x = a.x;
    this.y = a.y
};
primitives.common.QuadraticArcSegment.prototype.transform = function(a, b) {
    var c = this;
    a.transformPoints(c.x, c.y, c.cpX, c.cpY, b, c, function(a, b, f, g) {
        c.x = a;
        c.y = b;
        c.cpX = f;
        c.cpY = g
    })
};
primitives.common.QuadraticArcSegment.prototype.trim = function(a, b) {
    var c = 0.5,
        d = this.offsetPoint(this.x, this.y, this.cpX, this.cpY, a.x, a.y, c),
        e = this.offsetPoint(this.x, this.y, this.cpX, this.cpY, a.x, a.y, 0.1),
        c = b * (c / d.distanceTo(this.x, this.y) + 0.1 / e.distanceTo(this.x, this.y)) / 2,
        d = this.offsetPoint(this.x, this.y, this.cpX, this.cpY, a.x, a.y, c);
    this.x = d.x;
    this.y = d.y;
    return this
};
primitives.common.QuadraticArcSegment.prototype.offsetPoint = function(a, b, c, d, e, f, g) {
    return new primitives.common.Point((1 - g) * (1 - g) * a + 2 * (1 - g) * g * c + g * g * e, (1 - g) * (1 - g) * b + 2 * (1 - g) * g * d + g * g * f)
};
primitives.common.Rect = function(a, b, c, d) {
    this.height = this.width = this.y = this.x = null;
    switch (arguments.length) {
        case 1:
            this.x = a.x;
            this.y = a.y;
            this.width = a.width;
            this.height = a.height;
            break;
        case 2:
            this.x = Math.min(a.x, b.x);
            this.y = Math.min(a.y, b.y);
            this.width = Math.abs(b.x - a.x);
            this.height = Math.abs(b.y - a.y);
            break;
        case 4:
            this.x = a, this.y = b, this.width = c, this.height = d
    }
};
primitives.common.Rect.prototype.left = function() {
    return this.x
};
primitives.common.Rect.prototype.top = function() {
    return this.y
};
primitives.common.Rect.prototype.right = function() {
    return this.x + this.width
};
primitives.common.Rect.prototype.bottom = function() {
    return this.y + this.height
};
primitives.common.Rect.prototype.verticalCenter = function() {
    return this.y + this.height / 2
};
primitives.common.Rect.prototype.horizontalCenter = function() {
    return this.x + this.width / 2
};
primitives.common.Rect.prototype.isEmpty = function() {
    return null === this.x || null === this.y || null === this.width || null === this.height || 0 > this.width || 0 > this.height
};
primitives.common.Rect.prototype.offset = function(a, b, c, d) {
    switch (arguments.length) {
        case 1:
            null !== a && "object" == typeof a ? (this.x -= a.left, this.y -= a.top, this.width = this.width + a.left + a.right, this.height = this.height + a.top + a.bottom) : (this.x -= a, this.y -= a, this.width += 2 * a, this.height += 2 * a);
            break;
        case 4:
            this.x -= a, this.y -= b, this.width = this.width + a + c, this.height = this.height + b + d
    }
    return this
};
primitives.common.Rect.prototype.translate = function(a, b) {
    this.x += a;
    this.y += b;
    return this
};
primitives.common.Rect.prototype.invert = function() {
    var a = this.width,
        b = this.x;
    this.width = this.height;
    this.height = a;
    this.x = this.y;
    this.y = b;
    return this
};
primitives.common.Rect.prototype.contains = function(a, b) {
    switch (arguments.length) {
        case 1:
            return this.x <= a.x && a.x <= this.x + this.width && this.y <= a.y && a.y <= this.y + this.height;
        case 2:
            return this.x <= a && a <= this.x + this.width && this.y <= b && b <= this.y + this.height;
        default:
            return !1
    }
};
primitives.common.Rect.prototype.cropByRect = function(a) {
    this.x < a.x && (this.width -= a.x - this.x, this.x = a.x);
    this.right() > a.right() && (this.width -= this.right() - a.right());
    this.y < a.y && (this.height -= a.y - this.y, this.y = a.y);
    this.bottom() > a.bottom() && (this.height -= this.bottom() - a.bottom());
    this.isEmpty() && (this.height = this.width = this.y = this.x = null);
    return this
};
primitives.common.Rect.prototype.overlaps = function(a) {
    var b = !0;
    if (this.x + this.width < a.x || a.x + a.width < this.x || this.y + this.height < a.y || a.y + a.height < this.y) b = !1;
    return b
};
primitives.common.Rect.prototype.addRect = function(a, b, c, d) {
    var e, f;
    switch (arguments.length) {
        case 1:
            a.isEmpty() || (this.isEmpty() ? (this.x = a.x, this.y = a.y, this.width = a.width, this.height = a.height) : (e = Math.max(this.right(), a.right()), f = Math.max(this.bottom(), a.bottom()), this.x = Math.min(this.x, a.x), this.y = Math.min(this.y, a.y), this.width = e - this.x, this.height = f - this.y));
            break;
        case 2:
            this.isEmpty() ? (this.x = a, this.y = b, this.height = this.width = 0) : (e = Math.max(this.right(), a), f = Math.max(this.bottom(), b), this.x = Math.min(this.x,
                a), this.y = Math.min(this.y, b), this.width = e - this.x, this.height = f - this.y);
            break;
        case 4:
            this.isEmpty() ? (this.x = a, this.y = b, this.width = c, this.height = d) : (e = Math.max(this.right(), a + c), f = Math.max(this.bottom(), b + d), this.x = Math.min(this.x, a), this.y = Math.min(this.y, b), this.width = e - this.x, this.height = f - this.y)
    }
    return this
};
primitives.common.Rect.prototype.getCSS = function(a) {
    a = void 0 !== a ? a : "px";
    return {
        left: this.x + a,
        top: this.y + a,
        width: this.width + a,
        height: this.height + a
    }
};
primitives.common.Rect.prototype.toString = function(a) {
    var b, a = void 0 !== a ? a : "px";
    b = "" + ("left:" + this.x + a + ";");
    b += "top:" + this.y + a + ";";
    b += "width:" + this.width + a + ";";
    return b += "height:" + this.height + a + ";"
};
primitives.common.Size = function(a, b) {
    this.height = this.width = 0;
    switch (arguments.length) {
        case 1:
            this.width = a.width;
            this.height = a.height;
            break;
        case 2:
            this.width = a, this.height = b
    }
};
primitives.common.Size.prototype.invert = function() {
    var a = this.width;
    this.width = this.height;
    this.height = a;
    return this
};
primitives.common.Thickness = function(a, b, c, d) {
    this.left = a;
    this.top = b;
    this.right = c;
    this.bottom = d
};
primitives.common.Thickness.prototype.isEmpty = function() {
    return 0 === this.left && 0 === this.top && 0 === this.right && 0 === this.bottom
};
primitives.common.Thickness.prototype.toString = function(a) {
    a = void 0 !== a ? a : "px";
    return this.left + a + ", " + this.top + a + ", " + this.right + a + ", " + this.bottom + a
};
primitives.common.Graphics = function(a) {
    this.m_widget = a;
    this.m_placeholders = {};
    this.m_activePlaceholder = null;
    this.m_cache = new primitives.common.Cache;
    this.boxModel = jQuery.support.boxModel;
    this.graphicsType = null;
    this.debug = this.hasGraphics = !1
};
primitives.common.Graphics.prototype.clean = function() {
    var a, b, c, d;
    this.m_cache.clear();
    this.m_widget = this.m_cache = null;
    for (a in this.m_placeholders)
        if (this.m_placeholders.hasOwnProperty(a)) {
            b = this.m_placeholders[a];
            for (c in b.layers) b.layers.hasOwnProperty(c) && (d = b.layers[c], d.canvas.remove(), d.canvas = null);
            b.layers.length = 0;
            b.activeLayer = null;
            b.size = null;
            b.rect = null;
            b.div = null
        }
    this.m_placeholders.length = 0;
    this.m_activePlaceholder = null
};
primitives.common.Graphics.prototype.resize = function(a, b, c) {
    a = this.m_placeholders[a];
    null != a && this.resizePlaceholder(a, b, c)
};
primitives.common.Graphics.prototype.resizePlaceholder = function(a, b, c) {
    var d;
    a.size = new primitives.common.Size(b, c);
    a.rect = new primitives.common.Rect(0, 0, b, c);
    for (d in a.layers) a.layers.hasOwnProperty(d) && (b = a.layers[d], -1 !== b.name && b.canvas.css({
        position: "absolute",
        width: "0px",
        height: "0px"
    }))
};
primitives.common.Graphics.prototype.begin = function() {
    this.m_cache.begin()
};
primitives.common.Graphics.prototype.end = function() {
    this.m_cache.end()
};
primitives.common.Graphics.prototype.reset = function(a, b) {
    var c = "none",
        d = -1;
    switch (arguments.length) {
        case 1:
            "string" === typeof a ? c = a : d = a;
            break;
        case 2:
            c = a, d = b
    }
    this.m_cache.reset(c, d)
};
primitives.common.Graphics.prototype.activate = function(a, b) {
    switch (arguments.length) {
        case 1:
            "string" === typeof a ? (this._activatePlaceholder(a), this._activateLayer(-1)) : (this._activatePlaceholder("none"), this._activateLayer(a));
            break;
        case 2:
            this._activatePlaceholder(a), this._activateLayer(b)
    }
    return this.m_activePlaceholder
};
primitives.common.Graphics.prototype._activatePlaceholder = function(a) {
    var b = this.m_placeholders[a],
        c;
    void 0 === b && (c = "none" === a ? this.m_widget.element : this.m_widget.element.find("." + a), b = new primitives.common.Placeholder(a), b.div = c, b.size = new primitives.common.Size(c.innerWidth(), c.innerHeight()), b.rect = new primitives.common.Rect(0, 0, b.size.width, b.size.height), this.m_placeholders[a] = b);
    this.m_activePlaceholder = b
};
primitives.common.Graphics.prototype._activateLayer = function(a) {
    var b = this.m_activePlaceholder.layers[a],
        c, d, e, f;
    if (void 0 === b) {
        c = this.m_activePlaceholder;
        if (-1 === a) b = new primitives.common.Layer(a), b.canvas = c.div;
        else {
            d = jQuery("<div></div>");
            d.addClass("Layer" + a);
            new primitives.common.Rect(c.rect);
            d.css({
                position: "absolute",
                width: "0px",
                height: "0px"
            });
            e = null;
            for (f in c.layers) c.layers.hasOwnProperty(f) && (b = c.layers[f], b.name < a && (e = null !== e ? Math.max(e, b.name) : b.name));
            b = new primitives.common.Layer(a);
            b.canvas = d;
            null === e ? c.div.prepend(b.canvas[0]) : b.canvas.insertAfter(c.layers[e].canvas)
        }
        c.layers[a] = b
    }
    this.m_activePlaceholder.activeLayer = b
};
primitives.common.Graphics.prototype.text = function(a, b, c, d, e, f, g, h, i) {
    var j = this.m_activePlaceholder,
        g = {
            position: "absolute",
            padding: 0,
            margin: 0,
            "text-align": this._getTextAlign(g),
            "font-size": i["font-size"],
            "font-family": i["font-family"],
            "font-weight": i["font-weight"],
            "font-style": i["font-style"],
            color: i["font-color"],
            "line-height": i["font-size"]
        },
        i = "";
    switch (f) {
        case 0:
        case 3:
            g.left = a;
            g.top = b;
            g.width = c;
            g.height = d;
            break;
        case 1:
            g.left = a + Math.round(c / 2 - d / 2);
            g.top = b + Math.round(d / 2 - c / 2);
            g.width = d;
            g.height =
                c;
            i = "rotate(-90deg)";
            break;
        case 2:
            g.left = a + Math.round(c / 2 - d / 2), g.top = b + Math.round(d / 2 - c / 2), g.width = d, g.height = c, i = "rotate(90deg)"
    }
    g["-webkit-transform-origin"] = "center center";
    g["-moz-transform-origin"] = "center center";
    g["-o-transform-origin"] = "center center";
    g["-ms-transform-origin"] = "center center";
    g["-webkit-transform"] = i;
    g["-moz-transform"] = i;
    g["-o-transform"] = i;
    g["-ms-transform"] = i;
    g.transform = i;
    g["max-width"] = g.width;
    g["max-height"] = g.height;
    e = e.replace(RegExp("\n", "g"), "<br/>");
    switch (h) {
        case 0:
            this.debug &&
                (g.border = "solid 1px black");
            a = this.m_cache.get(j.name, j.activeLayer.name, "text");
            null === a ? (a = jQuery("<div></div>"), a.css(g), a.html(e), j.activeLayer.canvas.append(a), this.m_cache.put(j.name, j.activeLayer.name, "text", a)) : (a.css(g), a.html(e));
            break;
        default:
            g["border-collapse"] = "collapse", b = {
                "vertical-align": this._getVerticalAlignment(h),
                padding: 0
            }, this.debug && (b.border = "solid 1px black"), a = this.m_cache.get(j.name, j.activeLayer.name, "textintable"), null === a ? (a = jQuery("<table><tbody><tr><td></td></tr></tbody></table>"),
                primitives.common.css(a, g), a.find("td").css(b).html(e), j.activeLayer.canvas.append(a), this.m_cache.put(j.name, j.activeLayer.name, "textintable", a)) : (primitives.common.css(a, g), a.find("td").css(b).html(e))
    }
};
primitives.common.Graphics.prototype._getTextAlign = function(a) {
    var b = null;
    switch (a) {
        case 0:
            b = "center";
            break;
        case 1:
            b = "left";
            break;
        case 2:
            b = "right"
    }
    return b
};
primitives.common.Graphics.prototype._getVerticalAlignment = function(a) {
    var b = null;
    switch (a) {
        case 1:
            b = "middle";
            break;
        case 0:
            b = "top";
            break;
        case 2:
            b = "bottom"
    }
    return b
};
primitives.common.Graphics.prototype.polylinesBuffer = function(a) {
    var a = a.getPolylines(),
        b, c, d, e;
    d = 0;
    for (e = a.length; d < e; d += 1) b = a[d], 0 < b.segments.length && (c = b.paletteItem.toAttr(), this.polyline(b.segments, c))
};
primitives.common.Graphics.prototype.polyline = function(a, b) {
    var c = null,
        d = null,
        e, f;
    for (e = 0; e < a.length; e += 1) switch (f = a[e], f.segmentType) {
        case 1:
            c = Math.round(f.x) + 0.5;
            d = Math.round(f.y) + 0.5;
            break;
        case 0:
            this.rightAngleLine(c, d, Math.round(f.x) + 0.5, Math.round(f.y) + 0.5, b);
            c = Math.round(f.x) + 0.5;
            d = Math.round(f.y) + 0.5;
            break;
        case 4:
            this.dot(f.x, f.y, f.width, f.height, f.cornerRadius, b)
    }
};
primitives.common.Graphics.prototype.dot = function(a, b, c, d, e, f) {
    var g = this.m_activePlaceholder,
        h = this.m_cache.get(g.name, g.activeLayer.name, "dot"),
        i = void 0 !== f.lineWidth && void 0 !== f.borderColor,
        a = {
            position: "absolute",
            width: c - (i ? 1 : 0),
            top: Math.round(b),
            left: Math.round(a),
            padding: 0,
            margin: 0,
            "line-height": "0px",
            overflow: "hidden",
            height: d - (i ? 1 : 0),
            background: f.fillColor,
            "-moz-border-radius": e,
            "-webkit-border-radius": e,
            "-khtml-border-radius": e,
            "border-radius": e,
            "font-size": "0px",
            "border-style": i ? "Solid" : "None",
            "border-width": i ? "1px" : "0px",
            "border-color": i ? f.borderColor : ""
        };
    null === h ? (h = jQuery("<div></div>"), primitives.common.css(h, a), g.activeLayer.canvas.append(h), this.m_cache.put(g.name, g.activeLayer.name, "dot", h)) : primitives.common.css(h, a)
};
primitives.common.Graphics.prototype.rightAngleLine = function(a, b, c, d, e) {
    var f = this.m_activePlaceholder,
        g = Math.abs(d - b) > Math.abs(c - a),
        h = e.lineWidth,
        e = {
            position: "absolute",
            top: Math.round(Math.min(b, d) - (g ? 0 : h / 2)),
            left: Math.round(Math.min(a, c) - (g ? h / 2 : 0)),
            padding: 0,
            margin: 0,
            opacity: 0.5,
            "line-height": "0px",
            overflow: "hidden",
            background: e.borderColor,
            "font-size": "0px"
        };
    g ? (e.width = h, e.height = Math.abs(Math.round(d - b))) : (e.width = Math.abs(Math.round(c - a)), e.height = h);
    a = this.m_cache.get(f.name, f.activeLayer.name,
        "rect");
    null === a ? (a = jQuery("<div></div>"), primitives.common.css(a, e), f.activeLayer.canvas.append(a), this.m_cache.put(f.name, f.activeLayer.name, "rect", a)) : primitives.common.css(a, e)
};
primitives.common.Graphics.prototype.template = function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
    var c = this.m_activePlaceholder,
        d = "template" + (null !== j ? j : primitives.common.hashCode(i)),
        n = 0,
        j = this.m_cache.get(c.name, c.activeLayer.name, d);
    null !== m && void 0 !== m["border-width"] && (n = this.boxModel ? this.getPxSize(m["border-width"]) : 0);
    a = {
        width: g - n + "px",
        height: h - n + "px",
        top: b + f + "px",
        left: a + e + "px"
    };
    jQuery.extend(a, m);
    null == l && (l = new primitives.common.RenderEventArgs);
    null == j ? (j = jQuery(i), jQuery.extend(a, {
        position: "absolute",
        padding: "0px",
        margin: "0px"
    }, m), primitives.common.css(j, a), l.element = j, l.renderingMode = 0, null !== k && this.m_widget._trigger(k, null, l), c.activeLayer.canvas.append(j), this.m_cache.put(c.name, c.activeLayer.name, d, j)) : (l.element = j, l.renderingMode = 1, primitives.common.css(j, a), null !== k && this.m_widget._trigger(k, null, l));
    return j
};
primitives.common.Graphics.prototype.getPxSize = function(a, b) {
    var c = a;
    "string" === typeof a && (c = 0 < a.indexOf("pt") ? 96 * parseInt(a, 10) / 72 : 0 < a.indexOf("%") ? parseFloat(a) / 100 * b : parseInt(a, 10));
    return c
};
primitives.common.Graphics.prototype.polylineLength = function(a) {
    var b = 0,
        c, d, e, f = null;
    c = 0;
    for (d = a.length; c < d; c += 1) {
        e = a[c];
        switch (e.segmentType) {
            case 0:
                b += f.distanceTo(e.x, e.y)
        }
        f = e
    }
    return b
};
primitives.common.Cache = function() {
    this.threshold = 20;
    this.m_visible = {};
    this.m_invisible = {}
};
primitives.common.Cache.prototype.begin = function() {
    var a, b, c, d;
    for (a in this.m_visible)
        if (this.m_visible.hasOwnProperty(a))
            for (b in this.m_visible[a])
                if (this.m_visible[a].hasOwnProperty(b)) {
                    for (c = this.m_visible[a][b].length - 1; 0 <= c; c -= 1) d = this.m_visible[a][b][c], d.css({
                        visibility: "hidden"
                    }), this.m_invisible[a][b].push(d);
                    this.m_visible[a][b].length = 0
                }
};
primitives.common.Cache.prototype.end = function() {
    var a, b, c;
    for (a in this.m_visible)
        if (this.m_visible.hasOwnProperty(a))
            for (b in this.m_visible[a])
                if (this.m_visible[a].hasOwnProperty(b) && this.m_invisible[a][b].length > this.threshold)
                    for (; void 0 !== (c = this.m_invisible[a][b].pop());) c.remove()
};
primitives.common.Cache.prototype.reset = function(a, b) {
    var a = a + "-" + b,
        c = null,
        d, e;
    for (d in this.m_visible[a])
        if (this.m_visible[a].hasOwnProperty(d)) {
            for (e = this.m_visible[a][d].length - 1; 0 <= e; e -= 1) c = this.m_visible[a][d][e], this.m_invisible[a][d].push(c), c.css({
                visibility: "hidden"
            });
            this.m_visible[a][d].length = 0
        }
};
primitives.common.Cache.prototype.clear = function() {
    var a, b, c;
    for (a in this.m_visible)
        if (this.m_visible.hasOwnProperty(a))
            for (b in this.m_visible[a])
                if (this.m_visible[a].hasOwnProperty(b)) {
                    for (; void 0 !== (c = this.m_visible[a][b].pop());) c.remove();
                    for (; void 0 !== (c = this.m_invisible[a][b].pop());) c.remove()
                }
};
primitives.common.Cache.prototype.get = function(a, b, c) {
    a = a + "-" + b;
    b = null;
    void 0 === this.m_visible[a] && (this.m_visible[a] = {}, this.m_invisible[a] = {});
    void 0 === this.m_visible[a][c] && (this.m_visible[a][c] = [], this.m_invisible[a][c] = []);
    b = this.m_invisible[a][c].pop() || null;
    null !== b && (this.m_visible[a][c].push(b), b.css({
        visibility: "inherit"
    }));
    return b
};
primitives.common.Cache.prototype.put = function(a, b, c, d) {
    this.m_visible[a + "-" + b][c].push(d)
};
primitives.common.CanvasGraphics = function(a) {
    this.parent = primitives.common.Graphics.prototype;
    this.parent.constructor.apply(this, arguments);
    this.graphicsType = 1;
    this.m_maximum = 6E3
};
primitives.common.CanvasGraphics.prototype = new primitives.common.Graphics;
primitives.common.CanvasGraphics.prototype.clean = function() {
    var a, b, c, d;
    for (a in this.m_placeholders)
        if (this.m_placeholders.hasOwnProperty(a))
            for (c in b = this.m_placeholders[a], b.layers) b.layers.hasOwnProperty(c) && (d = b.layers[c], null !== d.canvascanvas && (d.canvascanvas.remove(), d.canvascanvas = null));
    this.parent.clean.apply(this, arguments)
};
primitives.common.CanvasGraphics.prototype._activatePlaceholder = function(a) {
    var b, c, d;
    this.parent._activatePlaceholder.apply(this, arguments);
    b = this.m_activePlaceholder;
    c = b.size.width;
    d = b.size.height;
    b.hasGraphics = c > this.m_maximum || d > this.m_maximum ? !1 : !0
};
primitives.common.CanvasGraphics.prototype.resizePlaceholder = function(a, b, c) {
    var d, e;
    this.parent.resizePlaceholder.apply(this, arguments);
    for (d in a.layers) a.layers.hasOwnProperty(d) && (e = a.layers[d], null !== e.canvascanvas && (e.canvascanvas.css({
        position: "absolute",
        width: b + "px",
        height: c + "px"
    }), e.canvascanvas.attr({
        width: b + "px",
        height: c + "px"
    })))
};
primitives.common.CanvasGraphics.prototype.begin = function() {
    var a, b, c, d, e, f;
    this.parent.begin.apply(this);
    for (a in this.m_placeholders)
        if (this.m_placeholders.hasOwnProperty(a))
            for (c in b = this.m_placeholders[a], e = b.size.width, f = b.size.height, b.layers) b.layers.hasOwnProperty(c) && (d = b.layers[c], null !== d.canvascanvas && d.canvascontext.clearRect(0, 0, e, f))
};
primitives.common.Graphics.prototype._getContext = function(a, b) {
    var c = a.size.width,
        d = a.size.height;
    null === b.canvascanvas && (b.canvascanvas = jQuery("<canvas></canvas>"), b.canvascanvas.attr({
        width: c + "px",
        height: d + "px"
    }), a.activeLayer.canvas.prepend(b.canvascanvas), b.canvascontext = b.canvascanvas[0].getContext("2d"));
    return b.canvascontext
};
primitives.common.CanvasGraphics.prototype.reset = function(a, b) {
    var c = "none",
        d = -1,
        e, f;
    switch (arguments.length) {
        case 1:
            "string" === typeof a ? c = a : d = a;
            break;
        case 2:
            c = a, d = b
    }
    this.parent.reset.apply(this, arguments);
    e = this.m_placeholders[c];
    void 0 !== e && (c = e.size.width, f = e.size.height, d = e.layers[d], void 0 !== d && null !== d.canvascanvas && d.canvascontext.clearRect(0, 0, c, f))
};
primitives.common.CanvasGraphics.prototype.polyline = function(a, b) {
    var c = this.m_activePlaceholder,
        d, e, f;
    if (c.hasGraphics) {
        d = c.activeLayer;
        c = this._getContext(c, d);
        c.save();
        void 0 !== b.lineWidth && void 0 !== b.borderColor ? (c.strokeStyle = b.borderColor, c.lineWidth = b.lineWidth) : (c.lineWidth = 0, c.strokeStyle = "Transparent");
        if (null != b.lineType) {
            d = Math.round(b.lineWidth) || 1;
            switch (b.lineType) {
                case 0:
                    e = [];
                    break;
                case 1:
                    e = [d, d];
                    break;
                case 2:
                    e = [5 * d, 3 * d]
            }
            void 0 !== c.setLineDash ? c.setLineDash(e) : void 0 !== c.webkitLineDash ?
                c.webkitLineDash = e : void 0 !== c.mozDash && (c.mozDash = e)
        }
        c.beginPath();
        for (e = 0; e < a.length; e += 1) switch (d = a[e], d.segmentType) {
            case 1:
                c.moveTo(Math.round(d.x) + 0.5, Math.round(d.y) + 0.5);
                break;
            case 0:
                c.lineTo(Math.round(d.x) + 0.5, Math.round(d.y) + 0.5);
                break;
            case 4:
                d.width == d.height && d.width / 2 <= d.cornerRadius ? (c.moveTo(Math.round(d.x) + d.width + 0.5, Math.round(d.y) + d.height / 2 + 0.5), c.arc(Math.round(d.x) + d.width / 2 + 0.5, Math.round(d.y) + d.height / 2 + 0.5, Math.round(d.width / 2), 0, 2 * Math.PI, !1)) : 0 == d.cornerRadius ? (c.moveTo(Math.round(d.x) +
                    0.5, Math.round(d.y) + 0.5), c.lineTo(Math.round(d.x + d.width) + 0.5, Math.round(d.y) + 0.5), c.lineTo(Math.round(d.x + d.width) + 0.5, Math.round(d.y + d.height) + 0.5), c.lineTo(Math.round(d.x) + 0.5, Math.round(d.y + d.height) + 0.5), c.lineTo(Math.round(d.x) + 0.5, Math.round(d.y) + 0.5)) : (f = Math.min(d.cornerRadius, Math.min(d.width / 2, d.height / 2)), c.moveTo(Math.round(d.x) + 0.5, Math.round(d.y + f) + 0.5), c.arc(Math.round(d.x + f) + 0.5, Math.round(d.y + f) + 0.5, Math.round(f), Math.PI, -Math.PI / 2, !1), c.lineTo(Math.round(d.x + d.width - f) + 0.5, Math.round(d.y) +
                    0.5), c.arc(Math.round(d.x + d.width - f) + 0.5, Math.round(d.y + f) + 0.5, Math.round(f), -Math.PI / 2, 0, !1), c.lineTo(Math.round(d.x + d.width) + 0.5, Math.round(d.y + d.height - f) + 0.5), c.arc(Math.round(d.x + d.width - f) + 0.5, Math.round(d.y + d.height - f) + 0.5, Math.round(f), 0, Math.PI / 2, !1), c.lineTo(Math.round(d.x + f) + 0.5, Math.round(d.y + d.height) + 0.5), c.arc(Math.round(d.x + f) + 0.5, Math.round(d.y + d.height - f) + 0.5, Math.round(f), Math.PI / 2, Math.PI, !1), c.lineTo(Math.round(d.x) + 0.5, Math.round(d.y + f) + 0.5));
                break;
            case 2:
                c.quadraticCurveTo(Math.round(d.cpX) +
                    0.5, Math.round(d.cpY) + 0.5, Math.round(d.x) + 0.5, Math.round(d.y) + 0.5);
                break;
            case 3:
                c.bezierCurveTo(Math.round(d.cpX1) + 0.5, Math.round(d.cpY1) + 0.5, Math.round(d.cpX2) + 0.5, Math.round(d.cpY2) + 0.5, Math.round(d.x) + 0.5, Math.round(d.y) + 0.5)
        }
        void 0 !== b.lineWidth && c.stroke();
        void 0 !== b.fillColor && (c.fillStyle = b.fillColor, c.globalAlpha = b.opacity, c.fill());
        c.restore()
    } else this.parent.polyline.apply(this, arguments)
};
primitives.common.Element = function(a, b) {
    this.name = this.ns = null;
    this.attr = {};
    this.style = {};
    this.children = [];
    switch (arguments.length) {
        case 1:
            this.name = a;
            break;
        case 2:
            this.ns = a, this.name = b
    }
};
primitives.common.Element.prototype.setAttribute = function(a, b) {
    this.attr[a] = b
};
primitives.common.Element.prototype.appendChild = function(a) {
    this.children[this.children.length] = a
};
primitives.common.Element.prototype.create = function(a) {
    var b = null,
        c, d, b = null !== this.ns ? document.createElementNS(this.ns, this.name) : document.createElement(this.name);
    for (c in this.attr) this.attr.hasOwnProperty(c) && (void 0 !== a ? b[c] = this.attr[c] : b.setAttribute(c, this.attr[c]));
    for (c in this.style) this.style.hasOwnProperty(c) && (b.style[c] = this.style[c]);
    for (d = 0; d < this.children.length; d += 1) c = this.children[d], "string" === typeof c ? b.appendChild(document.createTextNode(c)) : b.appendChild(c.create(a));
    return b
};
primitives.common.Element.prototype.update = function(a, b) {
    var c, d, e;
    for (c in this.style) this.style.hasOwnProperty(c) && (d = this.style[c], a.style[c] !== d && (a.style[c] = d));
    for (c in this.attr) this.attr.hasOwnProperty(c) && (d = this.attr[c], void 0 !== b ? a[c] !== d && (a[c] = d) : a.getAttribute(c) !== d && a.setAttribute(c, d));
    c = this.children.length;
    for (d = 0; d < c; d += 1) e = this.children[d], "string" === typeof e ? a.innerHtml !== e && (a.innerHtml = e) : this.children[d].update(a.children[d], b)
};
primitives.common.Layer = function(a) {
    this.name = a;
    this.svgcanvas = this.canvascanvas = this.canvas = null
};
primitives.common.Placeholder = function(a) {
    this.name = a;
    this.layers = {};
    this.div = this.rect = this.size = this.activeLayer = null;
    this.hasGraphics = !0
};
primitives.common.SvgGraphics = function(a) {
    this.parent = primitives.common.Graphics.prototype;
    this.parent.constructor.apply(this, arguments);
    this._svgxmlns = "http://www.w3.org/2000/svg";
    this.graphicsType = 0;
    this.hasGraphics = !0
};
primitives.common.SvgGraphics.prototype = new primitives.common.Graphics;
primitives.common.SvgGraphics.prototype.clean = function() {
    var a, b, c, d;
    for (a in this.m_placeholders)
        if (this.m_placeholders.hasOwnProperty(a))
            for (c in b = this.m_placeholders[a], b.layers) b.layers.hasOwnProperty(c) && (d = b.layers[c], null !== d.svgcanvas && (d.svgcanvas.remove(), d.svgcanvas = null));
    this.parent.clean.apply(this, arguments)
};
primitives.common.SvgGraphics.prototype.resizePlaceholder = function(a, b, c) {
    var d, e, f;
    this.parent.resizePlaceholder.apply(this, arguments);
    for (d in a.layers) a.layers.hasOwnProperty(d) && (e = a.layers[d], null !== e.svgcanvas && (f = {
        position: "absolute",
        width: b + "px",
        height: c + "px"
    }, e.svgcanvas.css(f), e.svgcanvas.attr({
        viewBox: "0 0 " + b + " " + c
    })))
};
primitives.common.SvgGraphics.prototype._getCanvas = function() {
    var a = this.m_activePlaceholder,
        b = a.activeLayer,
        c = a.rect;
    null === b.svgcanvas && (b.svgcanvas = jQuery('<svg version = "1.1"></svg>'), b.svgcanvas.attr({
        viewBox: c.x + " " + c.y + " " + c.width + " " + c.height
    }), b.svgcanvas.css({
        width: c.width + "px",
        height: c.height + "px"
    }), a.activeLayer.canvas.prepend(b.svgcanvas));
    return b.svgcanvas
};
primitives.common.SvgGraphics.prototype.polyline = function(a, b) {
    var c = this.m_activePlaceholder,
        d, e, f, g, h;
    d = new primitives.common.Element(this._svgxmlns, "path");
    void 0 !== b.fillColor ? (d.setAttribute("fill", b.fillColor), d.setAttribute("fill-opacity", b.opacity)) : d.setAttribute("fill-opacity", 0);
    void 0 !== b.lineWidth && void 0 !== b.borderColor ? (d.setAttribute("stroke", b.borderColor), d.setAttribute("stroke-width", b.lineWidth)) : (d.setAttribute("stroke", "transparent"), d.setAttribute("stroke-width", 0));
    if (null !=
        b.lineType) switch (e = Math.round(b.lineWidth) || 1, b.lineType) {
        case 0:
            d.setAttribute("stroke-dasharray", "");
            break;
        case 1:
            d.setAttribute("stroke-dasharray", e + "," + e);
            break;
        case 2:
            d.setAttribute("stroke-dasharray", 5 * e + "," + 3 * e)
    }
    e = "";
    for (f = 0; f < a.length; f += 1) switch (g = a[f], g.segmentType) {
        case 1:
            e += "M" + (Math.round(g.x) + 0.5) + " " + (Math.round(g.y) + 0.5);
            break;
        case 0:
            e += "L" + (Math.round(g.x) + 0.5) + " " + (Math.round(g.y) + 0.5);
            break;
        case 2:
            e += "Q" + (Math.round(g.cpX) + 0.5) + " " + (Math.round(g.cpY) + 0.5) + " " + (Math.round(g.x) +
                0.5) + " " + (Math.round(g.y) + 0.5);
            break;
        case 4:
            g.width == g.height && g.width / 2 <= g.cornerRadius ? (h = g.width / 2, e += "M" + (Math.round(g.x) + 0.5) + " " + (Math.round(g.y) + g.height / 2 + 0.5), e += "A" + h + " " + h + " 0 0 0 " + (Math.round(g.x + g.width) + 0.5) + " " + (Math.round(g.y) + g.height / 2 + 0.5), e += "A" + h + " " + h + " 0 0 0 " + (Math.round(g.x) + 0.5) + " " + (Math.round(g.y) + g.height / 2 + 0.5)) : 0 == g.cornerRadius ? (e += "M" + (Math.round(g.x) + 0.5) + " " + (Math.round(g.y) + 0.5), e += "L" + (Math.round(g.x + g.width) + 0.5) + " " + (Math.round(g.y) + 0.5), e += "L" + (Math.round(g.x +
                g.width) + 0.5) + " " + (Math.round(g.y + g.height) + 0.5), e += "L" + (Math.round(g.x) + 0.5) + " " + (Math.round(g.y + g.height) + 0.5), e += "L" + (Math.round(g.x) + 0.5) + " " + (Math.round(g.y) + 0.5)) : (h = Math.min(g.cornerRadius, Math.min(g.width / 2, g.height / 2)), e += "M" + (Math.round(g.x) + 0.5) + " " + (Math.round(g.y + h) + 0.5), e += "A" + Math.round(h) + " " + Math.round(h) + " 0 0 1 " + (Math.round(g.x + h) + 0.5) + " " + (Math.round(g.y) + 0.5), e += "L" + (Math.round(g.x + g.width - h) + 0.5) + " " + (Math.round(g.y) + 0.5), e += "A" + Math.round(h) + " " + Math.round(h) + " 0 0 1 " + (Math.round(g.x +
                g.width) + 0.5) + " " + (Math.round(g.y + h) + 0.5), e += "L" + (Math.round(g.x + g.width) + 0.5) + " " + (Math.round(g.y + g.height - h) + 0.5), e += "A" + Math.round(h) + " " + Math.round(h) + " 0 0 1 " + (Math.round(g.x + g.width - h) + 0.5) + " " + (Math.round(g.y + g.height) + 0.5), e += "L" + (Math.round(g.x + h) + 0.5) + " " + (Math.round(g.y + g.height) + 0.5), e += "A" + Math.round(h) + " " + Math.round(h) + " 0 0 1 " + (Math.round(g.x) + 0.5) + " " + (Math.round(g.y + g.height - h) + 0.5), e += "L" + (Math.round(g.x) + 0.5) + " " + (Math.round(g.y + h) + 0.5));
            break;
        case 3:
            e += "C" + (Math.round(g.cpX1) +
                0.5) + " " + (Math.round(g.cpY1) + 0.5) + " " + (Math.round(g.cpX2) + 0.5) + " " + (Math.round(g.cpY2) + 0.5) + " " + (Math.round(g.x) + 0.5) + " " + (Math.round(g.y) + 0.5)
    }
    d.setAttribute("d", e);
    e = this.m_cache.get(c.name, c.activeLayer.name, "path");
    null === e ? (e = jQuery(d.create()), d = this._getCanvas(), d.append(e), this.m_cache.put(c.name, c.activeLayer.name, "path", e)) : d.update(e[0])
};
primitives.common.Transform = function() {
    this.invertVertically = this.invertHorizontally = this.invertArea = !1;
    this.size = null
};
primitives.common.Transform.prototype.setOrientation = function(a) {
    switch (a) {
        case 0:
            this.invertVertically = this.invertHorizontally = this.invertArea = !1;
            break;
        case 1:
            this.invertHorizontally = this.invertArea = !1;
            this.invertVertically = !0;
            break;
        case 2:
            this.invertArea = !0;
            this.invertVertically = this.invertHorizontally = !1;
            break;
        case 3:
            this.invertHorizontally = this.invertArea = !0, this.invertVertically = !1
    }
};
primitives.common.Transform.prototype.getOrientation = function(a) {
    var b = a;
    if (this.invertHorizontally) switch (a) {
        case 2:
            b = 3;
            break;
        case 3:
            b = 2
    }
    if (this.invertVertically) switch (a) {
        case 0:
            b = 1;
            break;
        case 1:
            b = 0
    }
    if (this.invertArea) switch (b) {
        case 0:
            b = 2;
            break;
        case 1:
            b = 3;
            break;
        case 2:
            b = 0;
            break;
        case 3:
            b = 1
    }
    return b
};
primitives.common.Transform.prototype.transformPoint = function(a, b, c, d, e) {
    var f;
    c && this.invertArea && (f = a, a = b, b = f);
    this.invertHorizontally && (a = this.size.width - a);
    this.invertVertically && (b = this.size.height - b);
    !c && this.invertArea && (f = a, a = b, b = f);
    e.call(d, a, b)
};
primitives.common.Transform.prototype.transformPoints = function(a, b, c, d, e, f, g) {
    var h;
    e && this.invertArea && (h = a, a = b, b = h, h = c, c = d, d = h);
    this.invertHorizontally && (a = this.size.width - a, c = this.size.width - c);
    this.invertVertically && (b = this.size.height - b, d = this.size.height - d);
    !e && this.invertArea && (h = a, a = b, b = h, h = c, c = d, d = h);
    g.call(f, a, b, c, d)
};
primitives.common.Transform.prototype.transform3Points = function(a, b, c, d, e, f, g, h, i) {
    var j;
    g && this.invertArea && (j = a, a = b, b = j, j = c, c = d, d = j, j = e, e = f, f = j);
    this.invertHorizontally && (a = this.size.width - a, c = this.size.width - c, e = this.size.width - e);
    this.invertVertically && (b = this.size.height - b, d = this.size.height - d, f = this.size.height - f);
    !g && this.invertArea && (j = a, a = b, b = j, j = c, c = d, d = j, j = e, e = f, f = j);
    i.call(h, a, b, c, d, e, f)
};
primitives.common.Transform.prototype.transformRect = function(a, b, c, d, e, f, g) {
    var h;
    e && this.invertArea && (h = a, a = b, b = h, h = c, c = d, d = h);
    this.invertHorizontally && (a = this.size.width - a - c);
    this.invertVertically && (b = this.size.height - b - d);
    !e && this.invertArea && (h = a, a = b, b = h, h = c, c = d, d = h);
    g.call(f, a, b, c, d)
};
primitives.common.VmlGraphics = function(a) {
    var b, c, d;
    this.parent = primitives.common.Graphics.prototype;
    this.parent.constructor.apply(this, arguments);
    this.prefix = "rvml";
    this.ie8mode = document.documentMode && 8 <= document.documentMode;
    try {
        eval("document.namespaces")
    } catch (e) {}
    document.namespaces[this.prefix] || document.namespaces.add(this.prefix, "urn:schemas-microsoft-com:vml");
    if (!primitives.common.VmlGraphics.prototype.vmlStyle) {
        b = primitives.common.VmlGraphics.prototype.vmlStyle = document.createStyleSheet();
        c = " *;fill;shape;path;textpath;stroke".split(";");
        for (d = 0; d < c.length; d += 1) b.addRule(this.prefix + "\\:" + c[d], "behavior:url(#default#VML); position:absolute;")
    }
    this.graphicsType = 2;
    this.hasGraphics = !0
};
primitives.common.VmlGraphics.prototype = new primitives.common.Graphics;
primitives.common.VmlGraphics.prototype.text = function(a, b, c, d, e, f, g, h, i) {
    var j, k, l;
    switch (f) {
        case 0:
        case 3:
            this.parent.text.call(this, a, b, c, d, e, f, g, h, i);
            break;
        default:
            j = this.m_activePlaceholder;
            f = 1 === f;
            a = new primitives.common.Rect(a, b, c, d);
            d = new primitives.common.Rect(0, 0, 10 * c, 10 * d);
            c = new primitives.common.Element(this.prefix + ":shape");
            c.setAttribute("CoordSize", d.width + "," + d.height);
            c.setAttribute("filled", !0);
            c.setAttribute("stroked", !1);
            c.setAttribute("fillcolor", i["font-color"]);
            c.style.top = a.y +
                "px";
            c.style.left = a.x + "px";
            c.style.width = a.width + "px";
            c.style.height = a.height + "px";
            c.style["font-family"] = i["font-family"];
            a = new primitives.common.Element(this.prefix + ":path");
            a.setAttribute("TextPathOk", !0);
            b = 16 * Math.floor(this.getPxSize(i["font-size"])) * Math.max(e.split("\n").length - 1, 1);
            l = k = null;
            if (f) switch (h) {
                case 0:
                    k = new primitives.common.Point(d.x + b / 2, d.bottom());
                    l = new primitives.common.Point(d.x + b / 2, d.y);
                    break;
                case 1:
                    k = new primitives.common.Point(d.horizontalCenter(), d.bottom());
                    l = new primitives.common.Point(d.horizontalCenter(),
                        d.y);
                    break;
                case 2:
                    k = new primitives.common.Point(d.right() - b / 2, d.bottom()), l = new primitives.common.Point(d.right() - b / 2, d.y)
            } else switch (h) {
                case 0:
                    k = new primitives.common.Point(d.right() - b / 2, d.y);
                    l = new primitives.common.Point(d.right() - b / 2, d.bottom());
                    break;
                case 1:
                    k = new primitives.common.Point(d.horizontalCenter(), d.y);
                    l = new primitives.common.Point(d.horizontalCenter(), d.bottom());
                    break;
                case 2:
                    k = new primitives.common.Point(d.x + b / 2, d.y), l = new primitives.common.Point(d.x + b / 2, d.bottom())
            }
            a.setAttribute("v",
                " m" + k.x + "," + k.y + " l" + l.x + "," + l.y + " e");
            h = new primitives.common.Element(this.prefix + ":textpath");
            h.setAttribute("on", !0);
            h.setAttribute("string", e);
            h.style.trim = !1;
            h.style["v-text-align"] = this._getTextAlign(g);
            h.style.font = "normal normal normal " + i["font-size"] + "pt " + i["font-family"];
            c.appendChild(a);
            c.appendChild(h);
            e = this.m_cache.get(j.name, j.activeLayer.name, "vmltext");
            null === e ? (e = jQuery(c.create(this.ie8mode)), j.activeLayer.canvas.append(e), this.m_cache.put(j.name, j.activeLayer.name, "vmltext",
                e)) : c.update(e[0], this.ie8mode)
    }
};
primitives.common.VmlGraphics.prototype.polyline = function(a, b) {
    var c = this.m_activePlaceholder,
        d = new primitives.common.Rect(c.rect),
        e = new primitives.common.Rect(0, 0, 10 * d.width, 10 * d.height),
        f = new primitives.common.Element(this.prefix + ":shape"),
        g, h, i, j, k;
    void 0 !== b.borderColor && void 0 !== b.lineWidth ? (f.setAttribute("strokecolor", b.borderColor), f.setAttribute("strokeweight", b.lineWidth), f.setAttribute("stroked", !0)) : f.setAttribute("stroked", !1);
    f.setAttribute("CoordSize", e.width + "," + e.height);
    f.style.top =
        d.y + "px";
    f.style.left = d.x + "px";
    f.style.width = d.width + "px";
    f.style.height = d.height + "px";
    d = "";
    for (e = 0; e < a.length; e += 1) switch (g = a[e], g.segmentType) {
        case 1:
            d += " m" + 10 * Math.round(g.x) + "," + 10 * Math.round(g.y);
            break;
        case 0:
            d += " l" + 10 * Math.round(g.x) + "," + 10 * Math.round(g.y);
            break;
        case 4:
            h = Math.round(g.x);
            i = Math.round(g.y);
            j = Math.round(g.x + g.width);
            g = Math.round(g.y + g.height);
            h > j && (k = h, h = j, j = k);
            i > g && (k = i, i = g, g = k);
            h = 10 * h + 5;
            i = 10 * i + 5;
            j = 10 * j - 5;
            g = 10 * g - 5;
            d += " m" + h + "," + i;
            d += " l" + j + "," + i;
            d += " l" + j + "," + g;
            d += " l" + h + "," +
                g;
            d += " l" + h + "," + i;
            break;
        case 2:
            d += " qb" + 10 * Math.round(g.cpX) + "," + 10 * Math.round(g.cpY) + " l" + 10 * Math.round(g.x) + "," + 10 * Math.round(g.y);
            break;
        case 3:
            d += " c" + 10 * Math.round(g.cpX1) + "," + 10 * Math.round(g.cpY1) + "," + 10 * Math.round(g.cpX2) + "," + 10 * Math.round(g.cpY2) + "," + 10 * Math.round(g.x) + "," + 10 * Math.round(g.y)
    }
    d += " e";
    e = "shapepath";
    h = new primitives.common.Element(this.prefix + ":path");
    h.setAttribute("v", d);
    f.appendChild(h);
    if (null != b.lineType) {
        d = new primitives.common.Element(this.prefix + ":stroke");
        switch (b.lineType) {
            case 0:
                d.setAttribute("dashstyle",
                    "Solid");
                break;
            case 1:
                d.setAttribute("dashstyle", "ShortDot");
                break;
            case 2:
                d.setAttribute("dashstyle", "Dash")
        }
        f.appendChild(d);
        e += "stroke"
    }
    null !== b.fillColor ? (f.setAttribute("filled", !0), d = new primitives.common.Element(this.prefix + ":fill"), d.setAttribute("opacity", b.opacity), d.setAttribute("color", b.fillColor), f.appendChild(d), e += "fill") : f.setAttribute("filled", !1);
    d = this.m_cache.get(c.name, c.activeLayer.name, e);
    null === d ? (d = jQuery(f.create(this.ie8mode)), c.activeLayer.canvas.append(d), this.m_cache.put(c.name,
        c.activeLayer.name, e, d)) : f.update(d[0], this.ie8mode)
};
primitives.text.Config = function() {
    this.classPrefix = "bptext";
    this.graphicsType = 0;
    this.actualGraphicsType = null;
    this.orientation = 0;
    this.text = "";
    this.verticalAlignment = 1;
    this.horizontalAlignment = 0;
    this.fontSize = "16px";
    this.fontFamily = "Arial";
    this.color = "#000000";
    this.fontStyle = this.fontWeight = "normal"
};
primitives.text.Controller = function() {
    this.widgetEventPrefix = "bptext";
    this.options = new primitives.text.Config;
    this.m_graphics = this.m_panelSize = this.m_placeholder = null
};
primitives.text.Controller.prototype._create = function() {
    this.element.addClass("ui-widget");
    this._createLayout();
    this._redraw()
};
primitives.text.Controller.prototype.destroy = function() {
    this._cleanLayout()
};
primitives.text.Controller.prototype._createLayout = function() {
    this.m_panelSize = new primitives.common.Rect(0, 0, this.element.outerWidth(), this.element.outerHeight());
    this.m_placeholder = jQuery("<div></div>");
    this.m_placeholder.css({
        position: "relative",
        overflow: "hidden",
        top: "0px",
        left: "0px",
        padding: "0px",
        margin: "0px"
    });
    this.m_placeholder.css(this.m_panelSize.getCSS());
    this.m_placeholder.addClass("placeholder");
    this.m_placeholder.addClass(this.widgetEventPrefix);
    this.element.append(this.m_placeholder);
    this.m_graphics = primitives.common.createGraphics(this.options.graphicsType, this);
    this.options.actualGraphicsType = this.m_graphics.graphicsType
};
primitives.text.Controller.prototype._cleanLayout = function() {
    null !== this.m_graphics && this.m_graphics.clean();
    this.m_graphics = null;
    this.element.find("." + this.widgetEventPrefix).remove()
};
primitives.text.Controller.prototype._updateLayout = function() {
    this.m_panelSize = new primitives.common.Rect(0, 0, this.element.innerWidth(), this.element.innerHeight());
    this.m_placeholder.css(this.m_panelSize.getCSS())
};
primitives.text.Controller.prototype.update = function(a) {
    a ? (this._cleanLayout(), this._createLayout(), this._redraw()) : (this._updateLayout(), this.m_graphics.resize("placeholder", this.m_panelSize.width, this.m_panelSize.height), this.m_graphics.begin(), this._redraw(), this.m_graphics.end())
};
primitives.text.Controller.prototype._redraw = function() {
    var a = this.m_graphics.activate("placeholder");
    this.m_graphics.text(a.rect.x, a.rect.y, a.rect.width, a.rect.height, this.options.text, this.options.orientation, this.options.horizontalAlignment, this.options.verticalAlignment, {
        "font-size": this.options.fontSize,
        "font-family": this.options.fontFamily,
        "font-style": this.options.fontStyle,
        "font-weight": this.options.fontWeight,
        "font-color": this.options.color
    })
};
primitives.text.Controller.prototype._setOption = function(a, b) {
    jQuery.Widget.prototype._setOption.apply(this, arguments);
    switch (a) {
        case "disabled":
            var c = jQuery([]);
            b ? (c.filter(".ui-state-focus").blur(), c.removeClass("ui-state-hover"), c.propAttr("disabled", !0), this.element.addClass("ui-disabled")) : (c.propAttr("disabled", !1), this.element.removeClass("ui-disabled"))
    }
};
(function(a) {
    a.widget("ui.bpText", new primitives.text.Controller)
})(jQuery);
primitives.orgdiagram.BaseController = function() {
    this.transform = this.graphics = null;
    this._treeItemConfigs = {};
    this._orgItems = {};
    this._orgItemChildren = {};
    this._orgItemRoot = null;
    this._orgPartners = {};
    this._treeItems = {};
    this._treeItemCounter = 0;
    this._treeItemsByUserId = {};
    this._treeLevels = [];
    this._leftMargins = {};
    this._rightMargins = {};
    this._templates = {};
    this.m_scrollPanel = this._highlightTreeItem = this._cursorTreeItem = this._printPreviewTemplateHashCode = this._printPreviewTemplate = this._annotationLabelTemplateHashCode =
        this._annotationLabelTemplate = this._groupTitleTemplateHashCode = this._groupTitleTemplate = this._buttonsTemplateHashCode = this._buttonsTemplate = this._checkBoxTemplateHashCode = this._checkBoxTemplate = this._defaultTemplate = null;
    this.m_scrollPanelRect = new primitives.common.Rect(0, 0, 0, 0);
    this.m_placeholder = null;
    this.m_placeholderRect = new primitives.common.Rect(0, 0, 0, 0);
    this.m_calloutShape = this.m_calloutPlaceholder = null;
    this.boxModel = jQuery.support.boxModel;
    this._cancelMouseClick = !1;
    this._itemsInterval = [];
    this._scale = null;
    this.scale = 1;
    this._debug = this.showElbowDots = this.showInvisibleSubTrees = !1
};
primitives.orgdiagram.BaseController.prototype._create = function() {
    this.element.addClass("ui-widget");
    this._createLayout();
    this._virtualBind();
    this.transform = this.graphics = null;
    this._redraw()
};
primitives.orgdiagram.BaseController.prototype.destroy = function() {
    this._virtualUnbind();
    this._clean();
    this._cleanLayout()
};
primitives.orgdiagram.BaseController.prototype._clean = function() {
    null !== this.graphics && this.graphics.clean();
    this.transform = this.graphics = null
};
primitives.orgdiagram.BaseController.prototype._cleanLayout = function() {
    this.options.enablePanning && this._mouseDestroy();
    this.element.find("." + this.widgetEventPrefix).remove()
};
primitives.orgdiagram.BaseController.prototype._createLayout = function() {
    this.m_scrollPanelRect = new primitives.common.Rect(0, 0, this.element.outerWidth(), this.element.outerHeight());
    this.m_placeholderRect = new primitives.common.Rect(this.m_scrollPanelRect);
    var a = this.element.offset();
    this.m_scrollPanel = jQuery('<div tabindex="0"></div>');
    this.m_scrollPanel.css({
        position: "relative",
        overflow: "auto",
        top: "0px",
        left: "0px",
        width: this.m_scrollPanelRect.width + "px",
        height: this.m_scrollPanelRect.height + "px",
        padding: "0px",
        "margin-bottom": "0px",
        "margin-right": "0px",
        "margin-top": -a.top + Math.floor(a.top) + "px",
        "margin-left": -a.left + Math.floor(a.left) + "px",
        "-webkit-overflow-scrolling": "touch"
    });
    this.m_scrollPanel.addClass(this.widgetEventPrefix);
    this.m_placeholder = jQuery("<div></div>");
    this.m_placeholder.css({
        position: "absolute",
        overflow: "hidden",
        top: "0px",
        left: "0px"
    });
    this.m_placeholder.addClass("placeholder");
    this.m_placeholder.addClass(this.widgetEventPrefix);
    this.m_placeholder.css(this.m_placeholderRect.getCSS());
    this.m_scrollPanel.append(this.m_placeholder);
    this.m_calloutPlaceholder = jQuery("<div></div>");
    this.m_calloutPlaceholder.css({
        position: "absolute",
        overflow: "visible"
    });
    this.m_calloutPlaceholder.addClass("calloutplaceholder");
    this.m_calloutPlaceholder.addClass(this.widgetEventPrefix);
    this.m_calloutPlaceholder.css({
        top: "0px",
        left: "0px",
        width: "0px",
        height: "0px"
    });
    this.m_placeholder.append(this.m_calloutPlaceholder);
    this.element.append(this.m_scrollPanel);
    this.options.enablePanning && this._mouseInit(this.m_placeholder)
};
primitives.orgdiagram.BaseController.prototype._updateLayout = function() {
    var a = this.element.offset();
    this.m_scrollPanelRect = new primitives.common.Rect(0, 0, this.element.outerWidth(), this.element.outerHeight());
    this.m_scrollPanel.css({
        top: "0px",
        left: "0px",
        width: this.m_scrollPanelRect.width + "px",
        height: this.m_scrollPanelRect.height + "px",
        "margin-bottom": "0px",
        "margin-right": "0px",
        "margin-top": -a.top + Math.floor(a.top) + "px",
        "margin-left": -a.left + Math.floor(a.left) + "px"
    })
};
primitives.orgdiagram.BaseController.prototype._virtualBind = function() {
    var a = this;
    this.m_placeholder.mousemove(function(b) {
        a._onMouseMove(b)
    }).click(function(b) {
        a._onMouseClick(b)
    });
    this.m_scrollPanel.keydown(function(b) {
        a._onKeyDown(b)
    });
    "ontouchstart" in document.documentElement && (this.m_scrollPanel[0].addEventListener("gesturestart", a.onGestureStartHandler = function(b) {
        a.onGestureStart(b)
    }, !1), this.m_scrollPanel[0].addEventListener("gesturechange", a.onGestureChangeHandler = function(b) {
        a.onGestureChange(b)
    }, !1));
    this.options.onDefaultTemplateRender = function(b, c) {
        a._onDefaultTemplateRender(b, c)
    };
    this.options.onCheckBoxTemplateRender = function(b, c) {
        a._onCheckBoxTemplateRender(b, c)
    };
    this.options.onGroupTitleTemplateRender = function(b, c) {
        a._onGroupTitleTemplateRender(b, c)
    };
    this.options.onButtonsTemplateRender = function(b, c) {
        a._onButtonsTemplateRender(b, c)
    };
    this.options.onAnnotationLabelTemplateRender = function(b, c) {
        a._onAnnotationLabelTemplateRender(b, c)
    }
};
primitives.orgdiagram.BaseController.prototype._virtualUnbind = function() {
    this.m_placeholder.unbind("mousemove");
    this.m_placeholder.unbind("click");
    this.m_scrollPanel.unbind("keydown");
    "ontouchstart" in document.documentElement && (this.m_scrollPanel[0].removeEventListener("gesturestart", this.onGestureStartHandler, !1), this.m_scrollPanel[0].removeEventListener("gesturechange", this.onGestureChangeHandler, !1));
    this.options.onDefaultTemplateRender = null;
    this.options.onCheckBoxTemplateRender = null;
    this.options.onGroupTitleTemplateRender =
        null;
    this.options.onButtonsTemplateRender = null;
    this.options.onAnnotationLabelTemplateRender = null
};
primitives.orgdiagram.BaseController.prototype.update = function(a) {
    switch (a) {
        case 2:
            this._redrawHighlight();
            break;
        case 1:
            this._refresh();
            break;
        default:
            this._redraw()
    }
};
primitives.orgdiagram.BaseController.prototype._mouseCapture = function(a) {
    this._dragStartPosition = new primitives.common.Point(this.m_scrollPanel.scrollLeft() + a.pageX, this.m_scrollPanel.scrollTop() + a.pageY);
    return !0
};
primitives.orgdiagram.BaseController.prototype._mouseDrag = function(a) {
    var b = new primitives.common.Point(a.pageX, a.pageY),
        a = -b.x + this._dragStartPosition.x,
        b = -b.y + this._dragStartPosition.y;
    this.m_scrollPanel.css("visibility", "hidden");
    this.m_scrollPanel.scrollLeft(a).scrollTop(b);
    this.m_scrollPanel.css("visibility", "inherit");
    return !1
};
primitives.orgdiagram.BaseController.prototype._mouseStop = function() {
    this._cancelMouseClick = !0
};
primitives.orgdiagram.BaseController.prototype._virtualGetEventArgs = function() {
    return null
};
primitives.orgdiagram.BaseController.prototype._onMouseMove = function(a) {
    var b = this.m_placeholder.offset(),
        c = a.pageX - b.left,
        b = a.pageY - b.top;
    this._mouseStarted || (this._cancelMouseClick = !1, c = this._getTreeItemForMousePosition(c, b), this._setHighlightItem(a, c))
};
primitives.orgdiagram.BaseController.prototype._onMouseClick = function(a) {
    var b = this._highlightTreeItem,
        c, d;
    null !== b && !this._cancelMouseClick && (c = jQuery(a.target), c.hasClass(this.widgetEventPrefix + "button") || 0 < c.parent("." + this.widgetEventPrefix + "button").length ? (c = c.hasClass(this.widgetEventPrefix + "button") ? c : c.parent("." + this.widgetEventPrefix + "button"), d = c.data("buttonname"), c = this._virtualGetEventArgs(null, b, d), this._trigger("onButtonClick", a, c)) : "selectiontext" !== c.attr("name") && ("checkbox" ===
        c.attr("name") ? (c = this._virtualGetEventArgs(null, b, d), this._trigger("onSelectionChanging", a, c), d = primitives.common.indexOf(this.options.selectedItems, b.itemConfig.id), 0 <= d ? this.options.selectedItems.splice(d, 1) : this.options.selectedItems.push(b.itemConfig.id), this._trigger("onSelectionChanged", a, c)) : (c = this._virtualGetEventArgs(null, b), this._trigger("onMouseClick", a, c), c.cancel || (this._setCursorItem(a, b), this.m_scrollPanel.focus()))));
    this._cancelMouseClick = !1
};
primitives.orgdiagram.BaseController.prototype._setHighlightItem = function(a, b) {
    var c = !0,
        d;
    null !== b ? b.itemConfig.id !== this.options.highlightItem && (d = this._virtualGetEventArgs(this._highlightTreeItem, b), this._highlightTreeItem = b, this.options.highlightItem = b.itemConfig.id, this._trigger("onHighlightChanging", a, d), d.cancel ? c = !1 : (this._refreshHighlight(), this._trigger("onHighlightChanged", a, d))) : null !== this.options.highlightItem && (d = this._virtualGetEventArgs(this._highlightTreeItem, null), this._highlightTreeItem =
        null, this.options.highlightItem = null, this._trigger("onHighlightChanging", a, d), d.cancel ? c = !1 : (this._refreshHighlight(), this._trigger("onHighlightChanged", a, d)));
    return c
};
primitives.orgdiagram.BaseController.prototype._setCursorItem = function(a, b) {
    var c;
    b.itemConfig.id !== this.options.cursorItem && (c = this._virtualGetEventArgs(null != this.options.cursorItem ? this._treeItemsByUserId[this.options.cursorItem] : null, b), this.options.cursorItem = b.itemConfig.id, this._trigger("onCursorChanging", a, c), c.cancel || (this._refresh(), this._trigger("onCursorChanged", a, c)))
};
primitives.orgdiagram.BaseController.prototype._getNextLevelTreeItem = function(a, b) {
    var c = a.actualPosition.horizontalCenter(),
        d, e, f, g, h = null,
        i = null,
        j, k, l, m = b ? this._treeLevels.slice(a.level + 1, this._treeLevels.length) : this._treeLevels.slice(0, a.level).reverse();
    f = 0;
    for (g = m.length; f < g; f += 1) {
        k = m[f].treeItems;
        d = 0;
        for (e = k.length; d < e; d += 1)
            if (l = this._treeItems[k[d]], 1 == l.actualVisibility)
                if (j = Math.abs(c - l.actualPosition.horizontalCenter()), j < i || null == i) i = j, h = l;
                else break;
        if (null != i) break
    }
    return h
};
primitives.orgdiagram.BaseController.prototype._onKeyDown = function(a) {
    var b, c, d, e = null != this._highlightTreeItem ? this._highlightTreeItem : this._cursorTreeItem,
        f, g, h = null,
        i;
    if (null != e) {
        switch (a.which) {
            case 13:
                this._setCursorItem(a, e);
                a.preventDefault();
                this.m_scrollPanel.focus();
                break;
            case 40:
                h = 1;
                break;
            case 38:
                h = 0;
                break;
            case 37:
                h = 2;
                break;
            case 39:
                h = 3
        }
        if (null != h) {
            for (i = !1; !i;) {
                i = !0;
                h = this.transform.getOrientation(h);
                switch (h) {
                    case 0:
                        g = this._getNextLevelTreeItem(e, !1);
                        break;
                    case 1:
                        g = this._getNextLevelTreeItem(e, !0);
                        break;
                    case 2:
                        b = this._treeLevels[e.level];
                        for (c = e.levelPosition - 1; 0 <= c; c -= 1)
                            if (f = this._treeItems[b.treeItems[c]], 1 == f.actualVisibility) {
                                g = f;
                                break
                            }
                        break;
                    case 3:
                        b = this._treeLevels[e.level];
                        c = e.levelPosition + 1;
                        for (d = b.treeItems.length; c < d; c += 1)
                            if (f = this._treeItems[b.treeItems[c]], 1 == f.actualVisibility) {
                                g = f;
                                break
                            }
                }
                null != g && (a.preventDefault(), this._centerOnCursor(g, !1), (i = this._setHighlightItem(a, g)) || (e = g))
            }
            this.m_scrollPanel.focus()
        }
    }
};
primitives.orgdiagram.BaseController.prototype.onGestureStart = function(a) {
    this._scale = this.scale;
    a.preventDefault()
};
primitives.orgdiagram.BaseController.prototype.onGestureChange = function(a) {
    var b = Math.round(10 * this._scale * a.scale) / 10;
    b > this.options.maximumScale ? b = this.options.maximumScale : b < this.options.minimumScale && (b = this.options.minimumScale);
    this.scale = b;
    this._refresh();
    a.preventDefault()
};
primitives.orgdiagram.BaseController.prototype._updateScale = function() {
    var a = "scale(" + this.scale + "," + this.scale + ")";
    this.m_placeholder.css({
        "transform-origin": "0 0",
        transform: a,
        "-ms-transform": a,
        "-webkit-transform": a,
        "-o-transform": a,
        "-moz-transform": a
    })
};
primitives.orgdiagram.BaseController.prototype._redraw = function() {
    this._clean();
    this.graphics = primitives.common.createGraphics(this.options.graphicsType, this);
    this.graphics.debug = this._debug;
    this.transform = new primitives.common.Transform;
    this.options.actualGraphicsType = this.graphics.graphicsType;
    this.m_calloutShape = new primitives.common.Callout(this.graphics);
    this._virtualReadTemplates();
    this._createCheckBoxTemplate();
    this._createButtonsTemplate();
    this._createGroupTitleTemplate();
    this._createAnnotationLabelTemplate();
    this._createPrintPreviewTemplate();
    this._refresh()
};
primitives.orgdiagram.BaseController.prototype._refresh = function() {
    this._updateLayout();
    this.m_scrollPanel.css({
        display: "none",
        "-webkit-overflow-scrolling": "auto"
    });
    this._updateScale();
    this._setItemsIntervals();
    this._virtualCreateOrgTree();
    this._createVisualTree();
    this._positionTreeItems();
    this.graphics.resize("placeholder", this.m_placeholderRect.width, this.m_placeholderRect.height);
    this.transform.size = new primitives.common.Size(this.m_placeholderRect.width, this.m_placeholderRect.height);
    this.graphics.begin();
    this._redrawTreeItems();
    this._tracePathAnnotations();
    this._redrawConnectors();
    this._drawPrintPreview();
    this._drawAnnotations();
    this._drawHighlight();
    this._hideHighlightAnnotation();
    this._drawCursor();
    this.graphics.end();
    this.m_scrollPanel.css({
        display: "block"
    });
    this._centerOnCursor(this._cursorTreeItem, !0);
    this.m_scrollPanel.css({
        "-webkit-overflow-scrolling": "touch"
    })
};
primitives.orgdiagram.BaseController.prototype._setItemsIntervals = function() {
    this._itemsInterval[1] = this.options.normalItemsInterval;
    this._itemsInterval[2] = this.options.dotItemsInterval;
    this._itemsInterval[3] = this.options.lineItemsInterval;
    this._itemsInterval[4] = this.options.lineItemsInterval
};
primitives.orgdiagram.BaseController.prototype._redrawHighlight = function() {
    null != this._treeItemsByUserId[this.options.highlightItem] && (this._highlightTreeItem = this._treeItemsByUserId[this.options.highlightItem]);
    this._refreshHighlight()
};
primitives.orgdiagram.BaseController.prototype._refreshHighlight = function() {
    this.graphics.reset("placeholder", 3);
    this.graphics.reset("calloutplaceholder", 9);
    this._drawHighlight();
    this._drawHighlightAnnotation()
};
primitives.orgdiagram.BaseController.prototype._drawHighlight = function() {
    var a, b, c, d;
    null !== this._highlightTreeItem && (this.graphics.activate("placeholder", 3), a = this._highlightTreeItem.actualPosition, b = new primitives.common.Rect(0, 0, Math.round(this._highlightTreeItem.actualSize.width), Math.round(this._highlightTreeItem.actualSize.height)), c = this._highlightTreeItem.template.highlightPadding, b.offset(c.left, c.top, c.right, c.bottom), d = new primitives.common.RenderEventArgs, d.context = this._highlightTreeItem.itemConfig,
        d.isCursor = this._highlightTreeItem.isCursor, d.isSelected = this._highlightTreeItem.isSelected, d.templateName = this._highlightTreeItem.template.name, this.transform.transformRect(a.x, a.y, a.width, a.height, !0, this, function(a, c, g, h) {
            1 == this._highlightTreeItem.actualVisibility ? this.graphics.template(a, c, g, h, b.x, b.y, b.width, b.height, this._highlightTreeItem.template.highlightTemplate, this._highlightTreeItem.template.highlightTemplateHashCode, this._highlightTreeItem.template.highlightTemplateRenderName, d, null) :
                this.graphics.template(a, c, g, h, b.x, b.y, b.width - 1, b.height - 1, this._highlightTreeItem.template.dotHighlightTemplate, this._highlightTreeItem.template.dotHighlightTemplateHashCode, null, d, null)
        }))
};
primitives.orgdiagram.BaseController.prototype._drawCursor = function() {
    var a = this._cursorTreeItem,
        b, c, d, e;
    null !== a && 1 == a.actualVisibility && (this.graphics.activate("placeholder", 6), b = a.actualPosition, c = new primitives.common.Rect(a.contentPosition), d = a.template.cursorPadding, c.offset(d.left, d.top, d.right, d.bottom), e = new primitives.common.RenderEventArgs, e.context = a.itemConfig, e.isCursor = a.isCursor, e.isSelected = a.isSelected, e.templateName = a.template.name, this.transform.transformRect(b.x, b.y, b.width, b.height, !0, this, function(b, d, h, i) {
        this.graphics.template(b, d, h, i, c.x, c.y, c.width, c.height, a.template.cursorTemplate, a.template.cursorTemplateHashCode, a.template.cursorTemplateRenderName, e, {
            "border-width": a.template.cursorBorderWidth
        })
    }))
};
primitives.orgdiagram.BaseController.prototype._redrawTreeItems = function() {
    var a, b, c, d, e, f, g = {},
        h, i, j, k;
    this.transform.setOrientation(this.options.orientationType);
    i = 0;
    for (j = this._treeLevels.length; i < j; i += 1) c = this._treeLevels[i], c.labels = [], c.labelsRect = null, c.hasFixedLabels = !1, c.showLabels = !0;
    for (f in this._treeItems) this._treeItems.hasOwnProperty(f) && (a = this._treeItems[f], b = a.orgItem, c = this._treeLevels[a.level], a.setActualPosition(c, this.options), this.transform.transformRect(a.actualPosition.x,
        a.actualPosition.y, a.actualPosition.width, a.actualPosition.height, !0, this,
        function(f, i, j, p) {
            switch (a.actualVisibility) {
                case 1:
                    d = new primitives.common.RenderEventArgs;
                    d.context = a.itemConfig;
                    d.isCursor = a.isCursor;
                    d.isSelected = a.isSelected;
                    d.templateName = a.template.name;
                    this.graphics.activate("placeholder", 7);
                    this.graphics.template(f, i, j, p, a.contentPosition.x, a.contentPosition.y, a.contentPosition.width, a.contentPosition.height, a.template.itemTemplate, a.template.itemTemplateHashCode, a.template.itemTemplateRenderName,
                        d, {
                            "border-width": a.template.itemBorderWidth
                        });
                    a.actualHasGroupTitle && this.graphics.template(f, i, j, p, 2, a.contentPosition.y, this.options.groupTitlePanelSize - 4, a.contentPosition.height + 2, this._groupTitleTemplate, this._groupTitleTemplateHashCode, "onGroupTitleTemplateRender", a, null);
                    a.actualHasSelectorCheckbox && (this.graphics.activate("placeholder", 10), this.graphics.template(f, i, j, p, a.contentPosition.x, a.actualSize.height - (this.options.checkBoxPanelSize - 4), a.contentPosition.width, this.options.checkBoxPanelSize -
                        4, this._checkBoxTemplate, this._checkBoxTemplateHashCode, "onCheckBoxTemplateRender", a, null));
                    a.actualHasButtons && (this.graphics.activate("placeholder", 10), this.graphics.template(f, i, j, p, a.actualSize.width - (this.options.buttonsPanelSize - 4), a.contentPosition.y, this.options.buttonsPanelSize - 4, Math.max(a.contentPosition.height, a.actualSize.height - a.contentPosition.y), this._buttonsTemplate, a.template.name + this._buttonsTemplateHashCode, "onButtonsTemplateRender", a, null));
                    0 == this.options.showLabels && (k = new primitives.common.Label,
                        k.text = b.title, k.position = new primitives.common.Rect(f, i, j, p), k.weight = 1E4, k.labelType = 1, c.labels.push(k));
                    break;
                case 2:
                    e = b.itemTitleColor;
                    null == e && (e = "#000080");
                    g.hasOwnProperty(e) || (g[e] = []);
                    h = g[e];
                    h.push(new primitives.common.DotSegment(f, i, j, p, a.template.minimizedItemCornerRadius));
                    k = this._createLabel(f, i, j, p, a);
                    null != k && c.labels.push(k);
                    break;
                default:
                    this._debug && (e = "#ff0000", g.hasOwnProperty(e) || (g[e] = []), h = g[e], h.push(new primitives.common.DotSegment(f - 1, i - 1, 2, 2, 1)))
            }
        }));
    this.graphics.activate("placeholder",
        4);
    for (e in g) g.hasOwnProperty(e) && (h = g[e], f = {
        fillColor: e,
        borderColor: e,
        opacity: 1,
        lineWidth: 1,
        lineType: 0
    }, this.graphics.polyline(h, f));
    this._redrawLabels()
};
primitives.orgdiagram.BaseController.prototype._redrawLabels = function() {
    var a, b, c, d, e, f, g, h;
    if (0 == this.options.showLabels) {
        g = 0;
        for (h = this._treeLevels.length; g < h; g += 1) {
            e = this._treeLevels[g];
            a = e.labels;
            d = 0;
            for (f = a.length; d < f; d += 1) b = a[d], null == e.labelsRect ? e.labelsRect = new primitives.common.Rect(b.position) : e.labelsRect.addRect(b.position), e.hasFixedLabels = e.hasFixedLabels || 2 == b.labelType
        }
        for (g = this._treeLevels.length - 1; 0 < g; g -= 1) a = this._treeLevels[g - 1], b = this._treeLevels[g], null != a.labelsRect && null !=
            b.labelsRect && a.labelsRect.overlaps(b.labelsRect) && (b.showLabels = !1);
        g = 0;
        for (h = this._treeLevels.length; g < h; g += 1)
            if (e = this._treeLevels[g], a = e.labels, e.showLabels) {
                d = 0;
                for (f = a.length; d < f; d += 1)
                    if (b = a[d], b.isActive)
                        for (e = d + 1; e < f; e += 1)
                            if (c = a[e], c.isActive)
                                if (b.position.overlaps(c.position))
                                    if (b.weight >= c.weight) 0 == c.labelType && (c.isActive = !1);
                                    else {
                                        0 == b.labelType && (b.isActive = !1);
                                        break
                                    } else break
            }
    }
    this.graphics.activate("placeholder", 5);
    c = {
        "font-size": this.options.labelFontSize,
        "font-family": this.options.labelFontFamily,
        "font-style": this.options.labelFontStyle,
        "font-weight": this.options.labelFontWeight,
        "font-color": this.options.labelColor
    };
    g = 0;
    for (h = this._treeLevels.length; g < h; g += 1)
        if (e = this._treeLevels[g], e.showLabels || e.hasFixedLabels) {
            a = e.labels;
            d = 0;
            for (f = a.length; d < f; d += 1)
                if (b = a[d], b.isActive) switch (b.labelType) {
                    case 0:
                    case 2:
                        this.graphics.text(b.position.x, b.position.y, b.position.width, b.position.height, b.text, b.labelOrientation, b.horizontalAlignmentType, b.verticalAlignmentType, c)
                }
        }
};
primitives.orgdiagram.BaseController.prototype._createLabel = function(a, b, c, d, e) {
    var f, g, h = null,
        i = this.options.labelOffset,
        j;
    j = e.orgItem;
    if (!primitives.common.isNullOrEmpty(j.label)) {
        switch (j.showLabel) {
            case 0:
                switch (this.options.showLabels) {
                    case 0:
                        switch (e.actualVisibility) {
                            case 3:
                            case 2:
                                h = new primitives.common.Label, h.labelType = 0, h.weight = e.leftPadding + e.rightPadding
                        }
                        break;
                    case 1:
                        h = new primitives.common.Label, h.labelType = 2, h.weight = 1E4
                }
                break;
            case 1:
                h = new primitives.common.Label, h.weight = 1E4, h.labelType =
                    2
        }
        if (null != h) {
            h.text = j.label;
            e = null != j.labelSize ? j.labelSize : this.options.labelSize;
            h.labelOrientation = 3 != j.labelOrientation ? j.labelOrientation : 3 != this.options.labelOrientation ? this.options.labelOrientation : 0;
            j = 0 != j.labelPlacement ? j.labelPlacement : 0 != this.options.labelPlacement ? this.options.labelPlacement : 1;
            switch (h.labelOrientation) {
                case 0:
                    f = e.width;
                    g = e.height;
                    break;
                case 1:
                case 2:
                    g = e.width, f = e.height
            }
            switch (j) {
                case 0:
                case 1:
                    h.position = new primitives.common.Rect(a + c / 2 - f / 2, b - i - g, f, g);
                    switch (h.labelOrientation) {
                        case 0:
                            h.horizontalAlignmentType =
                                0;
                            h.verticalAlignmentType = 2;
                            break;
                        case 1:
                            h.horizontalAlignmentType = 1;
                            h.verticalAlignmentType = 1;
                            break;
                        case 2:
                            h.horizontalAlignmentType = 2, h.verticalAlignmentType = 1
                    }
                    break;
                case 2:
                case 11:
                    h.position = new primitives.common.Rect(a + c + i, b - i - g, f, g);
                    switch (h.labelOrientation) {
                        case 0:
                            h.horizontalAlignmentType = 1;
                            h.verticalAlignmentType = 2;
                            break;
                        case 1:
                            h.horizontalAlignmentType = 1;
                            h.verticalAlignmentType = 0;
                            break;
                        case 2:
                            h.horizontalAlignmentType = 2, h.verticalAlignmentType = 2
                    }
                    break;
                case 3:
                    h.position = new primitives.common.Rect(a +
                        c + i, b + d / 2 - g / 2, f, g);
                    switch (h.labelOrientation) {
                        case 0:
                            h.horizontalAlignmentType = 1;
                            h.verticalAlignmentType = 1;
                            break;
                        case 1:
                            h.horizontalAlignmentType = 0;
                            h.verticalAlignmentType = 0;
                            break;
                        case 2:
                            h.horizontalAlignmentType = 0, h.verticalAlignmentType = 2
                    }
                    break;
                case 4:
                case 12:
                    h.position = new primitives.common.Rect(a + c + i, b + d + i, f, g);
                    switch (h.labelOrientation) {
                        case 0:
                            h.horizontalAlignmentType = 1;
                            h.verticalAlignmentType = 0;
                            break;
                        case 1:
                            h.horizontalAlignmentType = 2;
                            h.verticalAlignmentType = 0;
                            break;
                        case 2:
                            h.horizontalAlignmentType =
                                1, h.verticalAlignmentType = 2
                    }
                    break;
                case 5:
                    h.position = new primitives.common.Rect(a + c / 2 - f / 2, b + d + i, f, g);
                    switch (h.labelOrientation) {
                        case 0:
                            h.horizontalAlignmentType = 0;
                            h.verticalAlignmentType = 0;
                            break;
                        case 1:
                            h.horizontalAlignmentType = 2;
                            h.verticalAlignmentType = 1;
                            break;
                        case 2:
                            h.horizontalAlignmentType = 1, h.verticalAlignmentType = 1
                    }
                    break;
                case 6:
                case 10:
                    h.position = new primitives.common.Rect(a - f - i, b + d + i, f, g);
                    switch (h.labelOrientation) {
                        case 0:
                            h.horizontalAlignmentType = 2;
                            h.verticalAlignmentType = 0;
                            break;
                        case 1:
                            h.horizontalAlignmentType =
                                2;
                            h.verticalAlignmentType = 2;
                            break;
                        case 2:
                            h.horizontalAlignmentType = 1, h.verticalAlignmentType = 0
                    }
                    break;
                case 7:
                    h.position = new primitives.common.Rect(a - f - i, b + d / 2 - g / 2, f, g);
                    switch (h.labelOrientation) {
                        case 0:
                            h.horizontalAlignmentType = 2;
                            h.verticalAlignmentType = 1;
                            break;
                        case 1:
                            h.horizontalAlignmentType = 0;
                            h.verticalAlignmentType = 2;
                            break;
                        case 2:
                            h.horizontalAlignmentType = 0, h.verticalAlignmentType = 0
                    }
                    break;
                case 8:
                case 9:
                    switch (h.position = new primitives.common.Rect(a - f - i, b - i - g, f, g), h.labelOrientation) {
                        case 0:
                            h.horizontalAlignmentType =
                                2;
                            h.verticalAlignmentType = 2;
                            break;
                        case 1:
                            h.horizontalAlignmentType = 1;
                            h.verticalAlignmentType = 2;
                            break;
                        case 2:
                            h.horizontalAlignmentType = 2, h.verticalAlignmentType = 0
                    }
            }
        }
    }
    return h
};
primitives.orgdiagram.BaseController.prototype._tracePathAnnotations = function() {
    var a, b, c, d, e, f, g, h, i, j, k, l;
    a = 0;
    for (b = this.options.annotations.length; a < b; a += 1) switch (c = this.options.annotations[a], c.annotationType) {
        case 2:
            if (null == i && (i = this._getConnectionsGraph()), null != c.items && 0 < c.items.length) {
                k = c.items.slice(0);
                e = this._treeItemsByUserId[k[0]];
                if (1 == k.length) {
                    c = 0;
                    for (d = e.logicalParents.length; c < d; c += 1) g = this._treeItems[e.logicalParents[c]], null != g.itemConfig && k.push(g.itemConfig.id)
                }
                if (1 < k.length) {
                    c =
                        1;
                    for (d = k.length; c < d; c += 1) {
                        g = this._treeItemsByUserId[k[c]];
                        j = primitives.common.getShortestPath(i, e, g, function(a) {
                            return a.weight
                        });
                        e = 1;
                        for (f = j.length; e < f; e += 1) l = i[j[e - 1]][j[e]], h = this._treeItems[l.id], h.highlightPath = 1, l.hasOwnProperty("partnerid") && (h = this._treeItems[l.partnerid], h.partnerHighlightPath = 1);
                        e = g
                    }
                }
            }
    }
};
primitives.orgdiagram.BaseController.prototype._getConnectionsGraph = function() {
    var a, b, c, d, e, f, g, h, i, j, k, l, m = {};
    b = 0;
    for (c = this._treeLevels.length; b < c; b += 1) {
        a = this._treeLevels[b];
        d = 0;
        for (e = a.treeItems.length; d < e; d += 1) {
            h = a.treeItems[d];
            h = this._treeItems[h];
            j = h.actualIsActive ? 100 : 1;
            h.connectorPlacement & 8 ? k = [a.treeItems[h.levelPosition - 1]] : h.connectorPlacement & 2 ? k = [a.treeItems[h.levelPosition + 1]] : h.connectorPlacement & 1 ? (f = this._treeItems[h.visualParentId], k = 1 < f.partners.length ? f.partners.slice(0) : [h.visualParentId],
                0 < f.extraPartners.length && (k = k.concat(f.extraPartners))) : k = [];
            f = 0;
            for (g = k.length; f < g; f += 1) l = k[f], i = this._treeItems[l], i = i.actualIsActive ? 100 : 1, m.hasOwnProperty(h.id) || (m[h.id] = {}), m[h.id][l] = 1 == g ? {
                id: h.id,
                weight: i
            } : {
                id: h.id,
                partnerid: l,
                weight: i
            }, m.hasOwnProperty(l) || (m[l] = {}), m[l][h.id] = 1 == g ? {
                id: h.id,
                weight: j
            } : {
                id: h.id,
                partnerid: l,
                weight: j
            }
        }
    }
    return m
};
primitives.orgdiagram.BaseController.prototype._drawPrintPreview = function() {
    var a = this.options.printPreviewPageSize,
        b, c, d;
    if (4 == this.options.pageFitMode) {
        this.graphics.activate("placeholder", 1);
        for (b = 0;
            (b + 1) * a.width < this.m_placeholderRect.width;) {
            for (c = 0;
                (c + 1) * a.height < this.m_placeholderRect.height;) d = this.graphics.template(b * a.width, c * a.height, a.width, a.height, 0, 0, a.width, a.height, this._printPreviewTemplate, this._printPreviewTemplateHashCode, null, null, null), d.data({
                column: b,
                row: c
            }), c += 1;
            b += 1
        }
    }
};
primitives.orgdiagram.BaseController.prototype._drawAnnotations = function() {
    var a;
    a = 8;
    var b, c, d, e, f, g, h, i, j, k, l, m;
    b = 0;
    for (c = this.options.annotations.length; b < c; b += 1) switch (k = this.options.annotations[b], k.annotationType) {
        case 0:
            if (null != k.fromItem && null != k.toItem && (e = this._treeItemsByUserId[k.fromItem], f = this._treeItemsByUserId[k.toItem], null != e && null != f)) {
                h = new primitives.orgdiagram.ConnectorAnnotationConfig;
                g = new primitives.common.Connector(this.graphics);
                g.orientationType = this.options.orientationType;
                i = "connectorShapeType labelPlacementType offset lineWidth color lineType labelSize zOrderType".split(" ");
                a = 0;
                for (d = i.length; a < d; a += 1) j = i[a], g[j] = k.hasOwnProperty(j) ? k[j] : h[j];
                g.labelTemplate = this._annotationLabelTemplate;
                g.labelTemplateHashCode = this._annotationLabelTemplateHashCode;
                g.hasLabel = !primitives.common.isNullOrEmpty(k.label);
                l = new primitives.common.RenderEventArgs;
                l.context = k;
                switch (g.zOrderType) {
                    case 1:
                        a = 1;
                        break;
                    default:
                        a = 8
                }
                a = this.graphics.activate("placeholder", a);
                g.panelSize = a.size;
                this.transform.transformRect(e.actualPosition.x,
                    e.actualPosition.y, e.actualPosition.width, e.actualPosition.height, !0, this,
                    function(a, b, c, d) {
                        var e = new primitives.common.Rect(a, b, c, d);
                        this.transform.transformRect(f.actualPosition.x, f.actualPosition.y, f.actualPosition.width, f.actualPosition.height, !0, this, function(a, b, c, d) {
                            a = new primitives.common.Rect(a, b, c, d);
                            g.draw(e, a, l)
                        })
                    })
            }
            break;
        case 1:
            if (null != k.items && 0 < k.items.length) {
                e = new primitives.common.Rect;
                a = 0;
                for (d = k.items.length; a < d; a += 1) h = this._treeItemsByUserId[k.items[a]], null != h && e.addRect(h.actualPosition);
                if (!e.isEmpty()) {
                    g = new primitives.common.Shape(this.graphics);
                    h = new primitives.orgdiagram.ShapeAnnotationConfig;
                    i = "opacity cornerRadius shapeType offset lineWidth borderColor fillColor lineType labelSize labelOffset labelPlacement zOrderType".split(" ");
                    a = 0;
                    for (d = i.length; a < d; a += 1) j = i[a], g[j] = k.hasOwnProperty(j) ? k[j] : h[j];
                    switch (g.zOrderType) {
                        case 2:
                            a = 8;
                            break;
                        case 1:
                            a = 1;
                            break;
                        default:
                            switch (g.shapeType) {
                                case 3:
                                case 1:
                                case 2:
                                    a = 8;
                                    break;
                                default:
                                    a = 1
                            }
                    }
                    a = this.graphics.activate("placeholder", a);
                    g.position =
                        e;
                    g.orientationType = this.options.orientationType;
                    g.panelSize = a.size;
                    g.labelTemplate = this._annotationLabelTemplate;
                    g.labelTemplateHashCode = this._annotationLabelTemplateHashCode;
                    g.hasLabel = null != k.templateName || null != k.label;
                    l = new primitives.common.RenderEventArgs;
                    l.context = k;
                    l.templateName = g.labelTemplate;
                    this.transform.transformRect(e.x, e.y, e.width, e.height, !0, this, function(a, b, c, d) {
                        a = new primitives.common.Rect(a, b, c, d);
                        g.draw(a, l)
                    })
                }
            }
            break;
        case 4:
            if (null != k.items && 0 < k.items.length) {
                m || (m = this._getBackgroundManager());
                g = new primitives.common.Perimeter(this.graphics);
                g.transform = this.transform;
                h = new primitives.orgdiagram.BackgroundAnnotationConfig;
                i = "opacity lineWidth borderColor fillColor lineType zOrderType".split(" ");
                a = 0;
                for (d = i.length; a < d; a += 1) j = i[a], g[j] = k.hasOwnProperty(j) ? k[j] : h[j];
                switch (g.zOrderType) {
                    case 2:
                        a = 8;
                        break;
                    case 1:
                        a = 1;
                        break;
                    default:
                        a = 1
                }
                a = this.graphics.activate("placeholder", a);
                e = [];
                if (k.includeChildren) {
                    i = [];
                    a = 0;
                    for (d = k.items.length; a < d; a += 1) h = k.items[a], h = this._treeItemsByUserId[h], null != h &&
                        i.push(h);
                    i = this._getAllLogicalChildren(i, "logicalChildren");
                    a = 0;
                    for (d = i.length; a < d; a += 1) h = i[a], null != h.orgItem && e.push(h.orgItem.id)
                } else e = k.items;
                k = m.getMergedPerimeters(e);
                for (a = 0; a < k.length; a += 1) g.draw(k[a])
            }
    }
};
primitives.orgdiagram.BaseController.prototype._getBackgroundManager = function() {
    var a = new primitives.common.perimeter.Manager,
        b, c, d, e, f, g, h, i, j, k, l;
    if (0 < this._treeLevels.length) {
        i = [];
        f = [];
        b = 0;
        for (c = this._treeLevels.length; b < c; b += 1)
            if (h = j = null, d = this._treeLevels[b], 4 != d.actualVisibility) {
                i.push(b);
                g = [];
                k = d.treeItems;
                d = 0;
                for (e = k.length; d < e; d += 1) l = this._treeItems[k[d]], 4 != l.actualVisibility && null != l.orgItem && (null != h && this._addOffset(g, j, h, l), j = h, h = l);
                null != h && this._addOffset(g, j, h, null);
                f.push(g)
            }
        j = [];
        g = [];
        b = 0;
        for (c = f.length; b < c; b += 1) g = primitives.common.mergeSort([g, f[b]], null, !0), j.push(g), g = f[b];
        j.push(primitives.common.mergeSort([f[b - 1]], null, !0));
        f = [];
        b = 0;
        for (c = j.length; b < c; b += 1) {
            h = {};
            g = j[b];
            d = 0;
            for (e = g.length; d < e; d += 1) k = g[d], h[k] = d;
            f.push(h)
        }
        h = [];
        d = g = null;
        b = 0;
        for (c = i.length; b < c; b += 1) e = this._treeLevels[i[b]], null != d && this._addTreeLevelPerimeters(h, b - 1, f, j, g, d, e), g = d, d = e;
        null != d && this._addTreeLevelPerimeters(h, b - 1, f, j, g, d, null);
        a.add(h)
    }
    return a
};
primitives.orgdiagram.BaseController.prototype._addTreeLevelPerimeters = function(a, b, c, d, e, f, g) {
    var h = Math.floor(this.options.normalItemsInterval / 2),
        e = null != e ? Math.floor(3 * (e.shift + e.depth) / 7 + 4 * f.shift / 7) : f.shift - h,
        g = null != g ? Math.floor(3 * (f.shift + f.depth) / 7 + 4 * g.shift / 7) : f.shift + f.depth + h,
        i = h = null,
        j = f.treeItems,
        k, l;
    k = 0;
    for (l = j.length; k < l; k += 1) f = this._treeItems[j[k]], 4 != f.actualVisibility && null != f.orgItem && (null != i && this._addPerimeter(a, c[b], c[b + 1], d[b], d[b + 1], e, g, h, i, f), h = i, i = f);
    null != i && this._addPerimeter(a,
        c[b], c[b + 1], d[b], d[b + 1], e, g, h, i, null)
};
primitives.orgdiagram.BaseController.prototype._addOffset = function(a, b, c, d) {
    var e = Math.floor(this.options.normalItemsInterval / 2),
        d = null != d ? Math.floor(3 * (c.offset + c.actualSize.width) / 7 + 4 * d.offset / 7) : c.offset + c.actualSize.width + e;
    a.push(null != b ? Math.floor(3 * (b.offset + b.actualSize.width) / 7 + 4 * c.offset / 7) : c.offset - e);
    a.push(d)
};
primitives.orgdiagram.BaseController.prototype._addPerimeter = function(a, b, c, d, e, f, g, h, i, j) {
    var k = [],
        l = primitives.common.perimeter.SegmentItem,
        m = Math.floor(this.options.normalItemsInterval / 2),
        h = null != h ? Math.floor(3 * (h.offset + h.actualSize.width) / 7 + 4 * i.offset / 7) : i.offset - m,
        j = null != j ? Math.floor(3 * (i.offset + i.actualSize.width) / 7 + 4 * j.offset / 7) : i.offset + i.actualSize.width + m;
    k.push(new l(h, f, h, g));
    for (m = c[h] + 1; m <= c[j]; m += 1) k.push(new l(e[m - 1], g, e[m], g));
    k.push(new l(j, g, j, f));
    for (m = b[j] - 1; m >= b[h]; m -= 1) k.push(new l(d[m +
        1], f, d[m], f));
    a.push(new primitives.common.perimeter.Item(i.orgItem.id, k))
};
primitives.orgdiagram.BaseController.prototype._redrawConnectors = function() {
    var a = this.graphics.activate("placeholder", 2),
        b, c, d, e, f, g, h, i;
    if (this._treeItems.hasOwnProperty(this._visualRootItem)) {
        e = new primitives.common.PaletteManager(this.options);
        f = new primitives.common.PolylinesBuffer;
        for (i = 0; i < this._treeLevels.length; i += 1) {
            d = this._treeLevels[i];
            c = d.treeItems;
            g = 0;
            for (h = c.length; g < h; g += 1) b = this._treeItems[c[g]], this._redrawConnector(a.hasGraphics, f, e, b, d)
        }
        this.graphics.polylinesBuffer(f)
    }
};
primitives.orgdiagram.BaseController.prototype._redrawConnector = function(a, b, c, d, e) {
    var f = this,
        g, h, i, j, k, l, m, n, p, q, r, t, v = 0,
        s, w = 0 == this.options.connectorType,
        u;
    t = 0 < d.partnerConnectorOffset ? e.shift + e.connectorShift - e.levelSpace / 2 * (e.partnerConnectorOffset - d.partnerConnectorOffset + 1) : d.connectorPlacement & 4 ? d.actualPosition.bottom() : e.shift + e.connectorShift;
    1 >= d.partnerConnectorOffset ? c.selectPalette(0) : 1 < d.partnerConnectorOffset ? c.selectPalette(d.partnerConnectorOffset - 1) : c.selectPalette(e.partnerConnectorOffset);
    0 < d.visualChildren.length && (g = 4 === d.actualVisibility && d.id === this._visualRootItem, r = d.actualPosition.horizontalCenter());
    i = [];
    if (1 < d.partners.length || 0 < d.extraPartners.length) {
        j = d.partners;
        for (m = 0; m < j.length; m += 1) k = this._treeItems[j[m]], s = new primitives.orgdiagram.ConnectorPoint(k.actualPosition.horizontalCenter(), k.actualPosition.bottom()), s.isSquared = !0, s.highlightPath = k.partnerHighlightPath, s.connectorStyleType = k.partnerHighlightPath ? 2 : 1, s.visibility = k.actualVisibility, i.push(s);
        j = d.extraPartners;
        for (m = 0; m < j.length; m += 1) k = this._treeItems[j[m]], s = new primitives.orgdiagram.ConnectorPoint(k.actualPosition.horizontalCenter(), k.actualPosition.bottom()), s.isSquared = !0, s.highlightPath = k.partnerHighlightPath, s.connectorStyleType = k.partnerHighlightPath ? 2 : 0, s.visibility = k.actualVisibility, i.push(s);
        0 < i.length && (i.sort(function(a, b) {
            return a.x - b.x
        }), 0 == d.visualChildren.length && (r = (i[0].x + i[i.length - 1].x) / 2), b.addInverted(function(b) {
            f._drawTopConnectors(b, c, r, t, i, !0, a, 1 == f.options.arrowsDirection)
        }))
    }
    h = [];
    if (0 < d.visualChildren.length) {
        q = !1;
        j = d.visualChildren;
        for (m = 0; m < j.length; m += 1)
            if (k = this._treeItems[j[m]], l = this._treeLevels[k.level], s = c.getPalette(k.highlightPath ? 2 : 1), u = b.getPolyline(s), k.connectorPlacement & 8) n = this._treeItems[l.treeItems[k.levelPosition - 1]], this.transform.transformPoints(k.actualPosition.x, k.actualPosition.verticalCenter(), n.actualPosition.right(), k.actualPosition.verticalCenter(), !0, this, function(a, c, d, e) {
                f._drawLineWithArrow(a, c, d, e, b, u, k.actualVisibility, n.actualVisibility)
            });
            else if (k.connectorPlacement & 2) p = this._treeItems[l.treeItems[k.levelPosition + 1]], this.transform.transformPoints(k.actualPosition.right(), k.actualPosition.verticalCenter(), p.actualPosition.x, k.actualPosition.verticalCenter(), !0, this, function(a, c, d, e) {
            f._drawLineWithArrow(a, c, d, e, b, u, k.actualVisibility, p.actualVisibility)
        });
        else if (k.connectorPlacement & 1 && !g) {
            l = !0;
            if (a) switch (k.actualVisibility) {
                case 2:
                case 3:
                    l = w
            }
            s = new primitives.orgdiagram.ConnectorPoint(k.actualPosition.horizontalCenter() + 0, k.actualPosition.top());
            s.isSquared = l;
            s.connectorStyleType = k.highlightPath ? 2 : 1;
            s.visibility = k.actualVisibility;
            h.push(s);
            v = Math.max(v, s.connectorStyleType);
            q = q || s.isSquared
        }!g && 0 < h.length && (this.transform.transformPoints(r, t, r, e.shift + e.connectorShift, !0, this, function(a, e, g, j) {
            var k = Math.round(f.options.elbowDotSize / 2),
                l = c.getPalette(v),
                m = b.getPolyline(l),
                m = b.getPolyline(m.arrowPaletteItem);
            this.showElbowDots && (0 != this.options.elbowType && 0 < d.partners.length) && m.segments.push(new primitives.common.DotSegment(a - k, e - k, 2 * k,
                2 * k, k));
            b.addInverted(function(c) {
                c = c.getPolyline(l);
                c.segments.push(new primitives.common.MoveSegment(g, j));
                c.segments.push(new primitives.common.LineSegment(a, e));
                1 == f.options.arrowsDirection && (4 != d.visibility && 1 >= i.length) && c.addArrow(f.options.linesWidth, function(a, c) {
                    var d = b.getPolyline(c);
                    d.segments = d.segments.concat(a)
                })
            });
            this.showElbowDots && (0 != this.options.elbowType && 1 < h.length) && m.segments.push(new primitives.common.DotSegment(g - k, j - k, 2 * k, 2 * k, k))
        }), this._drawTopConnectors(b, c, r, e.shift +
            e.connectorShift, h, q, a, 2 == this.options.arrowsDirection))
    }
};
primitives.orgdiagram.BaseController.prototype._drawLineWithArrow = function(a, b, c, d, e, f, g, h) {
    a = new primitives.common.Point(a, b);
    c = new primitives.common.Point(c, d);
    d = !1;
    switch (this.options.arrowsDirection) {
        case 1:
            4 != h && (d = !0);
            break;
        case 2:
            4 != g && (a.swap(c), d = !0)
    }
    f.segments.push(new primitives.common.MoveSegment(a));
    f.segments.push(new primitives.common.LineSegment(c));
    d && f.addArrow(this.options.linesWidth, function(a, b) {
        var c = e.getPolyline(b);
        c.segments = c.segments.concat(a)
    })
};
primitives.orgdiagram.BaseController.prototype._drawTopConnectors = function(a, b, c, d, e, f, g, h) {
    var i = this,
        j, k, l, m = [],
        n, p, q;
    if (f) {
        m = [];
        f = 0;
        for (k = e.length; f < k; f += 1)
            if (l = e[f], l.x < c && !l.isSquared) m.push(l);
            else break;
        k = m.length;
        0 < k && this._drawAngularConnectors(a, b, c, d, m, !1, h);
        m = [];
        for (j = e.length - 1; j >= f; j -= 1)
            if (l = e[j], l.x > c && !l.isSquared) m.push(l);
            else break;
        k = m.length;
        0 < k && this._drawAngularConnectors(a, b, c, d, m, !1, h);
        m = {};
        k = {};
        for (p in primitives.common.ConnectorStyleType) primitives.common.ConnectorStyleType.hasOwnProperty(p) &&
            (m[primitives.common.ConnectorStyleType[p]] = c, k[primitives.common.ConnectorStyleType[p]] = c);
        for (p = f; p <= j; p += 1) {
            l = e[p];
            n = b.getPalette(l.connectorStyleType);
            q = a.getPolyline(n);
            n = this.options.dotItemsInterval / 2;
            2 > n && (n = 0);
            if (g) switch (this.options.elbowType) {
                case 2:
                case 3:
                    0 < n && (Math.abs(c - l.x) > n && Math.abs(d - l.y) > n) && (l.hasElbow = !0, l.elbowPoint1 = new primitives.common.Point(l.x, d + (d > l.y ? -n : n)), l.elbowPoint2 = new primitives.common.Point(l.x + (c > l.x ? n : -n), d));
                    break;
                case 1:
                    0 < j - f && this.transform.transformPoints(l.x,
                        d, l.x, l.y, !0, this,
                        function(b, c) {
                            var d = Math.round(i.options.elbowDotSize / 2);
                            a.getPolyline(q.arrowPaletteItem).segments.push(new primitives.common.DotSegment(b - d, c - d, 2 * d, 2 * d, d))
                        })
            }
            m[l.connectorStyleType] = Math.min(m[l.connectorStyleType], l.hasElbow ? l.elbowPoint2.x : l.x);
            k[l.connectorStyleType] = Math.max(k[l.connectorStyleType], l.hasElbow ? l.elbowPoint2.x : l.x)
        }
        n = [Math.max(0, f - 1), Math.min(j + 1, e.length - 1)];
        for (p = 0; p < n.length; p += 1) l = e[n[p]], m[l.connectorStyleType] = Math.min(m[l.connectorStyleType], l.hasElbow ?
            l.elbowPoint2.x : l.x), k[l.connectorStyleType] = Math.max(k[l.connectorStyleType], l.hasElbow ? l.elbowPoint2.x : l.x);
        l = c;
        for (p = 2; 0 <= p; p -= 1) n = b.getPalette(p), q = a.getPolyline(n), n = m[p], null != n && n < l && (this.transform.transformPoints(l, d, n, d, !0, this, function(a, b, c, d) {
            q.segments.push(new primitives.common.MoveSegment(a, b));
            q.segments.push(new primitives.common.LineSegment(c, d))
        }), l = n), n = k[p], null != n && n > c && (this.transform.transformPoints(c, d, n, d, !0, this, function(a, b, c, d) {
            q.segments.push(new primitives.common.MoveSegment(a,
                b));
            q.segments.push(new primitives.common.LineSegment(c, d))
        }), c = n);
        for (p = f; p <= j; p += 1) l = e[p], n = b.getPalette(l.connectorStyleType), q = a.getPolyline(n), l.hasElbow ? (this.transform.transform3Points(l.elbowPoint2.x, l.elbowPoint2.y, l.elbowPoint1.x, l.elbowPoint2.y, l.elbowPoint1.x, l.elbowPoint1.y, !0, this, function(a, b, c, d, e, f) {
            switch (this.options.elbowType) {
                case 2:
                    q.segments.push(new primitives.common.MoveSegment(a, b));
                    q.segments.push(new primitives.common.LineSegment(e, f));
                    break;
                case 3:
                    q.segments.push(new primitives.common.MoveSegment(a,
                        b)), q.segments.push(new primitives.common.CubicArcSegment(a, b, c, d, e, f))
            }
        }), this.transform.transformPoints(l.elbowPoint1.x, l.elbowPoint1.y, l.x, l.y, !0, this, function(a, b, c, d) {
            q.segments.push(new primitives.common.LineSegment(c, d))
        })) : this.transform.transformPoints(l.x, d, l.x, l.y, !0, this, function(a, b, c, d) {
            q.segments.push(new primitives.common.MoveSegment(a, b));
            q.segments.push(new primitives.common.LineSegment(c, d))
        }), g && (h && 4 != l.visibility) && q.addArrow(this.options.linesWidth, function(b, c) {
            var d = a.getPolyline(c);
            d.segments = d.segments.concat(b)
        })
    } else this._drawAngularConnectors(a, b, c, d, e, !0, h)
};
primitives.orgdiagram.BaseController.prototype._drawAngularConnectors = function(a, b, c, d, e, f, g) {
    var h = null,
        i = e.length,
        j, k, l, m, h = f ? c : e[i - 1].x;
    k = new primitives.common.Point(h, d);
    for (c = 0; c < i; c += 1) {
        l = e[c];
        j = b.getPalette(l.connectorStyleType);
        m = a.getPolyline(j);
        this.transform.transformPoint(h, d, !0, this, function(a, b) {
            m.segments.push(new primitives.common.MoveSegment(a, b))
        });
        switch (this.options.connectorType) {
            case 1:
                this.transform.transformPoint(l.x, l.y, !0, this, function(a, b) {
                    m.segments.push(new primitives.common.LineSegment(a,
                        b))
                });
                break;
            case 2:
                j = new primitives.common.Rect(k, l), f ? h > j.x ? this.transform.transform3Points(j.right(), j.verticalCenter(), j.x, j.verticalCenter(), j.x, j.bottom(), !0, this, function(a, b, c, d, e, f) {
                    m.segments.push(new primitives.common.CubicArcSegment(a, b, c, d, e, f))
                }) : this.transform.transform3Points(j.x, j.verticalCenter(), j.right(), j.verticalCenter(), j.right(), j.bottom(), !0, this, function(a, b, c, d, e, f) {
                    m.segments.push(new primitives.common.CubicArcSegment(a, b, c, d, e, f))
                }) : h > j.x ? this.transform.transformPoints(j.x,
                    j.y, j.x, j.bottom(), !0, this,
                    function(a, b, c, d) {
                        m.segments.push(new primitives.common.QuadraticArcSegment(a, b, c, d))
                    }) : this.transform.transformPoints(j.right(), j.y, j.right(), j.bottom(), !0, this, function(a, b, c, d) {
                    m.segments.push(new primitives.common.QuadraticArcSegment(a, b, c, d))
                })
        }
        g && 4 != l.visibility && m.addArrow(this.options.linesWidth, function(b, c, d) {
            c = a.getPolyline(c);
            c.segments = c.segments.concat(b);
            this._debug && (b = a.getPolyline({
                fillColor: "#ff0000"
            }), b.segments.push(new primitives.common.DotSegment(d.x -
                1, d.y - 1, 2, 2, 1)))
        })
    }
};
primitives.orgdiagram.BaseController.prototype._centerOnCursor = function(a, b) {
    var c;
    if (null !== a && (this.graphics.activate("placeholder", 7), c = this._getTransformedItemPosition(a), b || this._isAnnotationNeeded(a, this._getPanelPosition()))) this.m_scrollPanel.scrollLeft(c.horizontalCenter() - this.m_scrollPanelRect.horizontalCenter()), this.m_scrollPanel.scrollTop(c.verticalCenter() - this.m_scrollPanelRect.verticalCenter())
};
primitives.orgdiagram.BaseController.prototype._setOption = function(a, b) {
    jQuery.Widget.prototype._setOption.apply(this, arguments);
    switch (a) {
        case "disabled":
            var c = jQuery([]);
            b ? (c.filter(".ui-state-focus").blur(), c.removeClass("ui-state-hover"), c.propAttr("disabled", !0), this.element.addClass("ui-disabled")) : (c.propAttr("disabled", !1), this.element.removeClass("ui-disabled"))
    }
};
primitives.orgdiagram.BaseController.prototype._getTreeItemForMousePosition = function(a, b) {
    var c = null,
        d = this,
        e, f, g;
    this.graphics.activate("placeholder", 7);
    a /= this.scale;
    b /= this.scale;
    this.transform.transformPoint(a, b, !1, this, function(a, b) {
        e = 0;
        for (f = this._treeLevels.length; e < f; e += 1)
            if (g = d._treeLevels[e], 0 < g.activeTreeItems.length && b > g.shift + g.topConnectorShift && b <= g.shift + g.connectorShift) {
                c = d._treeItems[primitives.common.binarySearch(g.activeTreeItems, function(c) {
                    c = d._treeItems[c];
                    switch (c.actualVisibility) {
                        case 1:
                            if (c.actualPosition.contains(a,
                                    b)) return 0;
                        case 2:
                        case 3:
                            return a - c.actualPosition.horizontalCenter();
                        case 4:
                            if (d._debug) throw "Clickable items collection should contain only visible items.";
                    }
                })];
                break
            }
    });
    return c
};
primitives.orgdiagram.BaseController.prototype._drawHighlightAnnotation = function() {
    var a = primitives.common,
        b, c, d, e, f;
    e = !0;
    var g;
    if (null !== this._highlightTreeItem) switch (this._highlightTreeItem.actualVisibility) {
        case 2:
        case 3:
        case 1:
            b = this._highlightTreeItem;
            c = b.orgItem;
            switch (c.showCallout) {
                case 2:
                    e = !1;
                    break;
                case 1:
                    e = !1;
                    break;
                default:
                    e = this.options.showCallout
            }
            e ? (this.graphics.activate("placeholder", 7), e = this._getTransformedItemPosition(b), e = new a.Point(e.horizontalCenter(), e.verticalCenter()), d =
                this._getPanelPosition(), this._isAnnotationNeeded(b, d) ? (c = !a.isNullOrEmpty(c.calloutTemplateName) ? c.calloutTemplateName : !a.isNullOrEmpty(c.templateName) ? c.templateName : !a.isNullOrEmpty(this.options.defaultCalloutTemplateName) ? this.options.defaultCalloutTemplateName : this.options.defaultTemplateName, c = this._templates[c], null == c && (c = this._defaultTemplate), f = this._getAnnotationPosition(e, d, c.itemSize), d = new a.Rect(f), d.addRect(e.x, e.y), d.offset(50), g = d.getCSS(), g.display = "inherit", g.visibility = "inherit",
                    this.m_calloutPlaceholder.css(g), e.x -= d.x, e.y -= d.y, f.x -= d.x, f.y -= d.y, a = new a.RenderEventArgs, a.context = b.itemConfig, a.isCursor = b.isCursor, a.isSelected = b.isSelected, a.templateName = c.name, this.graphics.resize("calloutplaceholder", d.width, d.height), this.graphics.activate("calloutplaceholder", 9), this.graphics.template(f.x, f.y, f.width, f.height, 0, 0, f.width, f.height, c.itemTemplate, c.itemTemplateHashCode, c.itemTemplateRenderName, a, null), this.pointerPlacement = 0, this.m_calloutShape.cornerRadius = this.options.calloutCornerRadius,
                    this.m_calloutShape.offset = this.options.calloutOffset, this.m_calloutShape.opacity = this.options.calloutOpacity, this.m_calloutShape.lineWidth = this.options.calloutLineWidth, this.m_calloutShape.pointerWidth = this.options.calloutPointerWidth, this.m_calloutShape.borderColor = this.options.calloutBorderColor, this.m_calloutShape.fillColor = this.options.calloutfillColor, this.m_calloutShape.draw(e, f)) : this.m_calloutPlaceholder.css({
                    display: "none",
                    visibility: "hidden"
                })) : this.m_calloutPlaceholder.css({
                display: "none",
                visibility: "hidden"
            });
            break;
        case 4:
            this.m_calloutPlaceholder.css({
                display: "none",
                visibility: "hidden"
            })
    }
};
primitives.orgdiagram.BaseController.prototype._hideHighlightAnnotation = function() {
    this.m_calloutPlaceholder.css({
        display: "none",
        visibility: "hidden"
    })
};
primitives.orgdiagram.BaseController.prototype._getPanelPosition = function() {
    return new primitives.common.Rect(this.m_scrollPanel.scrollLeft(), this.m_scrollPanel.scrollTop(), Math.min(this.m_scrollPanelRect.width - 25, this.m_placeholderRect.width), Math.min(this.m_scrollPanelRect.height - 25, this.m_placeholderRect.height))
};
primitives.orgdiagram.BaseController.prototype._getTransformedItemPosition = function(a) {
    var b = !1;
    this.transform.transformRect(a.actualPosition.x * this.scale, a.actualPosition.y * this.scale, a.actualPosition.width * this.scale, a.actualPosition.height * this.scale, !0, this, function(a, d, e, f) {
        b = new primitives.common.Rect(a, d, e, f)
    });
    return b
};
primitives.orgdiagram.BaseController.prototype._isAnnotationNeeded = function(a, b) {
    var c = !1,
        d = this._getTransformedItemPosition(a);
    if (1 != a.actualVisibility || !b.overlaps(d)) c = !0;
    return c
};
primitives.orgdiagram.BaseController.prototype._getAnnotationPosition = function(a, b, c) {
    var d = new primitives.common.Rect(a.x, a.y, c.width, c.height);
    a.y > b.bottom() - b.height / 4 ? (d.y -= c.height / 2, d.x = a.x < b.horizontalCenter() ? d.x + c.width / 4 : d.x - (c.width / 4 + c.width)) : (d.y += c.height / 4, d.x -= c.width / 2);
    d.x < b.x ? d.x = b.x + 5 : d.right() > b.right() && (d.x -= d.right() - b.right() + 5);
    d.y < b.y ? d.y = b.y + 5 : d.bottom() > b.bottom() && (d.y -= d.bottom() - b.bottom() + 5);
    return d
};
primitives.orgdiagram.BaseController.prototype._positionTreeItems = function() {
    var a = new primitives.common.Rect(0, 0, (this.m_scrollPanelRect.width - 25) / this.scale, (this.m_scrollPanelRect.height - 25) / this.scale),
        b = new primitives.common.Rect(0, 0, 0, 0),
        c, d, e, f, g;
    switch (this.options.orientationType) {
        case 2:
        case 3:
            a.invert()
    }
    if (0 < this._treeLevels.length) {
        switch (this.options.pageFitMode) {
            case 0:
            case 4:
                c = [new primitives.orgdiagram.LevelVisibility(0, 1)];
                b = this._setTreeLevelsVisibilityAndPositionTreeItems(c, 0);
                break;
            default:
                c = [new primitives.orgdiagram.LevelVisibility(0, 1)];
                b = [];
                switch (this.options.minimalVisibility) {
                    case 2:
                        b.push(2);
                        break;
                    case 0:
                    case 3:
                    case 4:
                        b.push(2), b.push(3)
                }
                for (d = this._treeLevels.length - 1; 0 <= d; d -= 1)
                    for (e = 0; e < b.length; e += 1) c.push(new primitives.orgdiagram.LevelVisibility(d, b[e]));
                d = this._setTreeLevelsVisibilityAndPositionTreeItems(c, c.length - 1);
                d.addRect(a);
                d.offset(0, 0, 5, 5);
                b = this._setTreeLevelsVisibilityAndPositionTreeItems(c, 0);
                if (!this._checkDiagramSize(b, d) && (e = 0, b = this._setTreeLevelsVisibilityAndPositionTreeItems(c,
                        c.length - 1), this._checkDiagramSize(b, d))) {
                    for (g = f = c.length - 1; 1 < f - e;) g = Math.floor((f + e) / 2), b = this._setTreeLevelsVisibilityAndPositionTreeItems(c, g), this._checkDiagramSize(b, d) ? f = g : e = g;
                    f !== g && (b = this._setTreeLevelsVisibilityAndPositionTreeItems(c, f))
                }
        }
        switch (this.options.pageFitMode) {
            case 4:
                a = this._stretchToAvoidPageMargins();
                b.width = a.width;
                b.height = a.height;
                break;
            default:
                b.width < a.width && (this._stretchToWidth(b.width, a.width), b.width = a.width), b.height < a.height && (b.height = a.height)
        }
        switch (this.options.orientationType) {
            case 2:
            case 3:
                b.invert()
        }
        this.m_placeholder.css(b.getCSS());
        this.m_placeholderRect = new primitives.common.Rect(b)
    }
};
primitives.orgdiagram.BaseController.prototype._stretchToAvoidPageMargins = function() {
    var a = new primitives.common.Size(this.options.printPreviewPageSize),
        b = this,
        c, d, e, f, g, h;
    switch (this.options.orientationType) {
        case 2:
        case 3:
            a.invert()
    }
    c = [];
    e = 0;
    for (f = this._treeLevels.length; e < f; e += 1) c.push(this._treeLevels[e].treeItems);
    d = primitives.common.mergeSort(c, function(a) {
        return b._treeItems[a].offset
    });
    c = 0;
    g = a.width;
    e = 0;
    for (f = d.length; e < f; e += 1) h = b._treeItems[d[e]], h.offset + c < g && h.offset + h.actualSize.width +
        c > g && (c += g - h.offset - c + this.options.normalItemsInterval / 2), h.offset += c, h.offset > g && (g += a.width);
    c = 0;
    f = a.height;
    for (e = 0; e < this._treeLevels.length; e += 1) d = this._treeLevels[e], d.shift + c < f && d.shift + d.depth + c > f && (c += f - d.shift - c + this.options.normalLevelShift / 2), d.shiftDown(c), d.shift > f && (f += a.height);
    return new primitives.common.Size(g + 1, f + 1)
};
primitives.orgdiagram.BaseController.prototype._checkDiagramSize = function(a, b) {
    var c = !1;
    switch (this.options.pageFitMode) {
        case 1:
            b.width >= a.width && (c = !0);
            break;
        case 2:
            b.height >= a.height && (c = !0);
            break;
        case 3:
            b.height >= a.height && b.width >= a.width && (c = !0)
    }
    return c
};
primitives.orgdiagram.BaseController.prototype._setTreeLevelsVisibilityAndPositionTreeItems = function(a, b) {
    var c, d;
    for (c = 0; c < this._treeLevels.length; c += 1) this._treeLevels[c].currentvisibility = 1;
    for (c = 0; c <= b; c += 1) d = a[c], this._treeLevels[d.level].currentvisibility = d.currentvisibility;
    this._recalcItemsSize();
    this._setOffsets();
    this._recalcLevelsDepth();
    this._shiftLevels();
    return new primitives.common.Rect(0, 0, Math.round(this._getDiagramWidth()), Math.round(this._getDiagramHeight()))
};
primitives.orgdiagram.BaseController.prototype._getDiagramHeight = function() {
    var a = this._treeLevels[this._treeLevels.length - 1];
    return a.shift + a.nextLevelShift
};
primitives.orgdiagram.BaseController.prototype._getDiagramWidth = function() {
    var a = 0,
        b, c;
    b = 0;
    for (c = this._treeLevels.length; b < c; b += 1) a = Math.max(a, this._treeLevels[b].currentOffset);
    return a += this.options.normalItemsInterval
};
primitives.orgdiagram.BaseController.prototype._setOffsets = function() {
    var a, b;
    a = 0;
    for (b = this._treeLevels.length; a < b; a += 1) this._treeLevels[a].currentOffset = 0;
    void 0 !== this._treeItems[this._visualRootItem] && this._setOffset(this._treeItems[this._visualRootItem])
};
primitives.orgdiagram.BaseController.prototype._setOffset = function(a) {
    var b = this._treeLevels[a.level],
        c = this._itemsInterval[0 === a.visibility ? b.currentvisibility : a.visibility] / 2,
        d, e, f, g, h, i;
    e = 8 * this.options.linesWidth;
    a.leftPadding = c + (0 < b.currentOffset ? c * a.relationDegree * this.options.cousinsIntervalMultiplier : 0);
    a.rightPadding = c;
    0 != this.options.arrowsDirection && (a.connectorPlacement & 8 && (a.leftPadding += e), a.connectorPlacement & 2 && (a.rightPadding += e));
    a.offset = b.currentOffset + a.leftPadding;
    b.currentOffset =
        a.offset + a.actualSize.width + a.rightPadding;
    if (0 < a.visualChildren.length) {
        b = 0;
        for (d = a.visualChildren.length; b < d; b += 1) this._setOffset(this._treeItems[a.visualChildren[b]]);
        c = this._getChildrenOffset(a);
        if (0 < c) this._offsetItemChildren(a, c);
        else if (0 > c && (c = -c, this._offsetItem(a, c), d = null, e = {}, g = null, h = this._getParentItem(a), null !== h)) {
            for (b = h.visualChildren.length - 1; 0 <= b; b -= 1)
                if (i = h.visualChildren[b], i === a) d = [];
                else if (null !== d)
                if (f = this._getGapBetweenSiblings(i, a), e[i.id] = f, 0 < f) d.splice(0, 0, i);
                else {
                    g =
                        i;
                    break
                }
            if (0 < d.length) {
                if (null !== g) {
                    f = [g];
                    f = f.concat(d);
                    f.push(a);
                    g = [
                        [g]
                    ];
                    b = 1;
                    for (d = f.length; b < d; b += 1) a = f[b - 1], h = f[b], 2 == a.gravity || 1 == h.gravity ? g[g.length - 1].push(h) : g.push([h])
                } else g = [d.slice(0)], g[g.length - 1].push(a);
                if (0 < g.length) {
                    d = g[g.length - 1];
                    for (b = d.length - 2; 0 <= b; b -= 1) a = d[b], f = e[a.id], c = Math.min(f, c), this._offsetItem(a, c), this._offsetItemChildren(a, c)
                }
                h = c / (g.length - 1);
                for (d = g.length - 2; 0 < d; d -= 1) {
                    i = g[d];
                    for (b = i.length - 1; 0 <= b; b -= 1) a = i[b], f = e[a.id], c = Math.min(d * h, Math.min(f, c)), this._offsetItem(a,
                        c), this._offsetItemChildren(a, c)
                }
            }
        }
    }
};
primitives.orgdiagram.BaseController.prototype._getGapBetweenSiblings = function(a, b) {
    var c = null,
        d = this._getRightMargins(a),
        e = this._getLeftMargins(b),
        f = Math.min(d.length, e.length),
        g, h;
    for (g = 0; g < f && !(h = e[g] - d[g], c = null !== c ? Math.min(c, h) : h, 0 >= h); g += 1);
    return Math.floor(c)
};
primitives.orgdiagram.BaseController.prototype._getRightMargins = function(a) {
    var b = [],
        c, d, e;
    c = this._rightMargins[a];
    void 0 === c && (c = []);
    c = c.slice();
    c.splice(0, 0, a.id);
    a = 0;
    for (d = c.length; a < d; a += 1) e = this._treeItems[c[a]], b[a] = e.offset + e.actualSize.width + e.rightPadding;
    return b
};
primitives.orgdiagram.BaseController.prototype._getLeftMargins = function(a) {
    var b = [],
        c, d, e;
    c = this._leftMargins[a];
    void 0 === c && (c = []);
    c = c.slice();
    c.splice(0, 0, a.id);
    a = 0;
    for (d = c.length; a < d; a += 1) e = this._treeItems[c[a]], b[a] = e.offset - e.leftPadding;
    return b
};
primitives.orgdiagram.BaseController.prototype._getChildrenOffset = function(a) {
    var b = a.offset + a.actualSize.width / 2,
        c = null,
        d, e, f;
    if (null === a.visualAggregatorId) {
        a = a.visualChildren;
        d = null;
        f = 0;
        for (e = a.length; f < e && !(d = this._treeItems[a[f]], d.connectorPlacement & 1); f += 1);
        e = null;
        for (f = a.length - 1; 0 <= f && !(e = this._treeItems[a[f]], e.connectorPlacement & 1); f -= 1);
        switch (this.options.horizontalAlignment) {
            case 1:
                c = d.offset + d.actualSize.width / 2;
                break;
            case 2:
                c = e.offset + e.actualSize.width / 2;
                break;
            case 0:
                c = (d.offset +
                    e.offset + e.actualSize.width) / 2
        }
    } else c = this._treeItems[a.visualAggregatorId], c = c.offset + c.actualSize.width / 2;
    return b - c
};
primitives.orgdiagram.BaseController.prototype._getParentItem = function(a) {
    var b = null;
    null !== a && null !== a.visualParentId && (b = this._treeItems[a.visualParentId]);
    return b
};
primitives.orgdiagram.BaseController.prototype._offsetItem = function(a, b) {
    a.offset += b;
    var c = this._treeLevels[a.level];
    c.currentOffset = Math.max(c.currentOffset, a.offset + a.actualSize.width)
};
primitives.orgdiagram.BaseController.prototype._offsetItemChildren = function(a, b) {
    var c = a.visualChildren,
        d, e, f;
    if (0 < c.length) {
        d = null;
        e = 0;
        for (f = c.length; e < f; e += 1) d = this._treeItems[c[e]], d.offset += b, this._offsetItemChildren(d, b);
        c = this._treeLevels[d.level];
        c.currentOffset = Math.max(c.currentOffset, d.offset + d.actualSize.width)
    }
};
primitives.orgdiagram.BaseController.prototype._stretchToWidth = function(a, b) {
    var c, d;
    switch (this.options.horizontalAlignment) {
        case 1:
            c = 0;
            break;
        case 2:
            c = b - a;
            break;
        case 0:
            c = (b - a) / 2
    }
    if (0 < c)
        for (d in this._treeItems) this._treeItems.hasOwnProperty(d) && (this._treeItems[d].offset += c)
};
primitives.orgdiagram.BaseController.prototype._recalcItemsSize = function() {
    var a, b, c, d, e, f, g;
    a = 0;
    for (b = this._treeLevels.length; a < b; a += 1) {
        f = this._treeLevels[a];
        g = f.treeItems;
        c = 0;
        for (d = g.length; c < d; c += 1) e = this._treeItems[g[c]], e.setActualSize(f, this.options)
    }
};
primitives.orgdiagram.BaseController.prototype._recalcLevelsDepth = function() {
    var a, b, c, d, e, f, g, h, i, j, k;
    a = 0;
    for (b = this._treeLevels.length; a < b; a += 1) {
        g = this._treeLevels[a];
        f = g.treeItems;
        c = 0;
        for (d = f.length; c < d; c += 1);
    }
    a = 0;
    for (b = this._treeLevels.length; a < b; a += 1) {
        g = this._treeLevels[a];
        g.shift = 0;
        g.depth = 0;
        g.partnerConnectorOffset = 0;
        g.actualVisibility = 4;
        f = g.treeItems;
        i = [];
        c = 0;
        for (d = f.length; c < d; c += 1) e = this._treeItems[f[c]], g.depth = Math.max(g.depth, e.actualSize.height), g.actualVisibility = Math.min(g.actualVisibility,
            e.actualVisibility), (0 < e.partners.length || 0 < e.extraPartners.length) && i.push(new primitives.common.StackSegment(e));
        if (0 < i.length) {
            c = 0;
            for (d = i.length; c < d; c += 1) {
                j = i[c];
                k = j.context.partners.slice(0).concat(j.context.extraPartners);
                e = 0;
                for (f = k.length; e < f; e += 1) h = this._treeItems[k[e]], h = h.offset + h.actualSize.width / 2, j.startIndex = null != j.startIndex ? Math.min(j.startIndex, h) : h, j.endIndex = null != j.endIndex ? Math.max(j.endIndex, h) : h
            }
            g.partnerConnectorOffset = primitives.common.stackSegments(i, function(a, b) {
                a.context.partnerConnectorOffset =
                    b
            })
        }
    }
};
primitives.orgdiagram.BaseController.prototype._shiftLevels = function() {
    var a = this.options.lineLevelShift,
        b, c, d, e = 0,
        f = 0;
    b = 8 * this.options.linesWidth;
    switch (this.options.arrowsDirection) {
        case 1:
            e = b;
            f = 0;
            break;
        case 2:
            e = 0, f = b
    }
    b = 0;
    for (c = this._treeLevels.length; b < c; b += 1) d = this._treeLevels[b], a += d.setShift(a, this._getLevelSpace(d.actualVisibility), f, e)
};
primitives.orgdiagram.BaseController.prototype._getLevelSpace = function(a) {
    var b = 0;
    switch (a) {
        case 1:
            b = this.options.normalLevelShift;
            break;
        case 2:
            b = this.options.dotLevelShift;
            break;
        case 3:
        case 4:
            b = this.options.lineLevelShift
    }
    return b
};
primitives.orgdiagram.BaseController.prototype._virtualReadTemplates = function() {
    var a, b = new primitives.orgdiagram.TemplateConfig,
        c;
    this._templates = {};
    a = new primitives.orgdiagram.Template(b, b);
    a.name = this.widgetEventPrefix + "Template";
    a.createDefaultTemplates();
    this._templates[a.name] = a;
    for (a = 0; a < this.options.templates.length; a += 1) c = this.options.templates[a], c = new primitives.orgdiagram.Template(c, b), c.createDefaultTemplates(), this._templates[c.name] = c
};
primitives.orgdiagram.BaseController.prototype._onDefaultTemplateRender = function(a, b) {
    var c = b.context,
        d = null != c.itemTitleColor ? c.itemTitleColor : "#4169e1",
        e = primitives.common.highestContrast(d, this.options.itemTitleSecondFontColor, this.options.itemTitleFirstFontColor);
    b.element.find("[name=titleBackground]").css({
        background: d
    });
    b.element.find("[name=photo]").attr({
        src: c.image,
        alt: c.title
    });
    b.element.find("[name=title]").css({
        color: e
    }).text(c.title);
    b.element.find("[name=description]").text(c.description)
};
primitives.orgdiagram.BaseController.prototype._createCheckBoxTemplate = function() {
    var a = jQuery("<div></div>");
    a.addClass("bp-item bp-selectioncheckbox-frame");
    a.append(jQuery('<label><nobr><input type="checkbox" name="checkbox" class="bp-selectioncheckbox" />&nbsp;<span name="selectiontext" class="bp-selectiontext">' + this.options.selectCheckBoxLabel + "</span></nobr></label>"));
    this._checkBoxTemplate = a.wrap("<div>").parent().html();
    this._checkBoxTemplateHashCode = primitives.common.hashCode(this._checkBoxTemplate)
};
primitives.orgdiagram.BaseController.prototype._onCheckBoxTemplateRender = function(a, b) {
    b.element.find("[name=checkbox]").prop("checked", b.isSelected)
};
primitives.orgdiagram.BaseController.prototype._createGroupTitleTemplate = function() {
    var a = jQuery("<div></div>");
    a.addClass("bp-item bp-corner-all bp-grouptitle-frame");
    this._groupTitleTemplate = a.wrap("<div>").parent().html();
    this._groupTitleTemplateHashCode = primitives.common.hashCode(this._groupTitleTemplate)
};
primitives.orgdiagram.BaseController.prototype._onGroupTitleTemplateRender = function(a, b) {
    var c = new primitives.text.Config,
        d = null != b.itemConfig.groupTitleColor ? b.itemConfig.groupTitleColor : "#4169e1";
    c.orientation = 2;
    c.horizontalAlignment = 0;
    c.verticalAlignment = 1;
    c.text = b.itemConfig.groupTitle;
    c.fontSize = "12px";
    c.color = primitives.common.highestContrast(d, this.options.itemTitleSecondFontColor, this.options.itemTitleFirstFontColor);
    c.fontFamily = "Arial";
    switch (b.renderingMode) {
        case 0:
            b.element.bpText(c);
            break;
        case 1:
            b.element.bpText("option", c), b.element.bpText("update")
    }
    primitives.common.css(b.element, {
        background: d
    })
};
primitives.orgdiagram.BaseController.prototype._createButtonsTemplate = function() {
    var a = jQuery("<ul></ul>");
    a.css({
        position: "absolute"
    }).addClass("ui-widget ui-helper-clearfix");
    this._buttonsTemplate = a.wrap("<div>").parent().html();
    this._buttonsTemplateHashCode = primitives.common.hashCode(this._buttonsTemplate)
};
primitives.orgdiagram.BaseController.prototype._onButtonsTemplateRender = function(a, b) {
    var c = 0,
        d, e, f, g;
    switch (b.renderingMode) {
        case 0:
            f = null != b.template.buttons ? b.template.buttons : this.options.buttons;
            for (g = 0; g < f.length; g += 1) d = f[g], e = jQuery('<li data-buttonname="' + d.name + '"></li>').css({
                position: "absolute",
                top: c + "px",
                left: "0px",
                width: d.size.width + "px",
                height: d.size.height + "px",
                padding: "3px"
            }).addClass(this.widgetEventPrefix + "button"), b.element.append(e), e.button({
                icons: {
                    primary: d.icon
                },
                text: d.text,
                label: d.label
            }), primitives.common.isNullOrEmpty(d.tooltip) || null != e.tooltip && e.tooltip({
                content: d.tooltip
            }), c += 10 + d.size.height
    }
};
primitives.orgdiagram.BaseController.prototype._createAnnotationLabelTemplate = function() {
    var a = jQuery("<div></div>");
    a.addClass("bp-item bp-corner-all bp-connector-label");
    this._annotationLabelTemplate = a.wrap("<div>").parent().html();
    this._annotationLabelTemplateHashCode = primitives.common.hashCode(this._annotationLabelTemplate)
};
primitives.orgdiagram.BaseController.prototype._onAnnotationLabelTemplateRender = function(a, b) {
    b.element.html(b.context.label)
};
primitives.orgdiagram.BaseController.prototype._createPrintPreviewTemplate = function() {
    var a = jQuery("<div></div>");
    a.addClass("bp-item bp-printpreview");
    this._printPreviewTemplate = a.wrap("<div>").parent().html();
    this._printPreviewTemplateHashCode = primitives.common.hashCode(this._printPreviewTemplate)
};
primitives.orgdiagram.BaseController.prototype._virtualCreateOrgTree = function() {};
primitives.orgdiagram.BaseController.prototype._createVisualTree = function() {
    var a, b, c, d, e, f;
    this._defaultTemplate = this._highlightTreeItem = this._cursorTreeItem = null;
    this._defaultTemplate = this._templates[this.options.defaultTemplateName];
    void 0 === this._defaultTemplate && (this._defaultTemplate = this._templates[this.widgetEventPrefix + "Template"]);
    this._treeItems = {};
    this._treeItemCounter = 0;
    this._treeItemsByUserId = {};
    this._treeLevels = [];
    this._leftMargins = {};
    this._rightMargins = {};
    this._visualRootItem = 0;
    if (null !=
        this._orgItemRoot && (a = this._getNewTreeItem({
                visibility: 4,
                visualChildren: [],
                connectorPlacement: 0,
                visualParentId: null,
                parentId: null,
                orgItem: this._orgItemRoot,
                itemConfig: null,
                actualItemType: 0
            }), this._createVisualTreeItem(a), this._treeItemsByUserId.hasOwnProperty(this.options.cursorItem) && (this._cursorTreeItem = this._treeItemsByUserId[this.options.cursorItem], this._cursorTreeItem.isCursor = !0), this._treeItemsByUserId.hasOwnProperty(this.options.highlightItem) && (this._highlightTreeItem = this._treeItemsByUserId[this.options.highlightItem]),
            this._readVisualTree(this._treeItems[this._visualRootItem], 0), this._addExtraConnections(), this._showSelectedItems(), this._virtualShowCursorNeighbours(), this._debug))
        for (d in this._treeItems)
            if (this._treeItems.hasOwnProperty(d)) {
                c = this._treeItems[d];
                a = 0;
                for (b = c.logicalChildren.length; a < b; a += 1)
                    if (e = c.logicalChildren[a], e = this._treeItems[e], f = !0, jQuery.each(e.logicalParents, function(a, b) {
                            if (b == d) return f = !1
                        }), f) throw "Family tree is broken. Logical child does not reference logical parent.";
            }
};
primitives.orgdiagram.BaseController.prototype._addExtraConnections = function() {
    var a, b, c, d, e, f;
    for (a in this._orgPartners)
        if (this._orgPartners.hasOwnProperty(a) && null != this._orgPartners[a]) {
            c = this._orgPartners[a];
            f = this._treeItemsByUserId[a];
            d = 0;
            for (e = c.length; d < e; d += 1) b = c[d], 0 == f.partners.length && f.partners.push(f.id), b = this._treeItemsByUserId[b], f.extraPartners.push(b.id)
        }
};
primitives.orgdiagram.BaseController.prototype._getNewTreeItem = function(a) {
    var b = new primitives.orgdiagram.TreeItem(this._treeItemCounter),
        c;
    for (c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
    this._treeItemCounter += 1;
    this._treeItems[b.id] = b;
    a = a.orgItem;
    null != a && (this._treeItemsByUserId[a.id] = b, c = this._templates[a.templateName], b.template = void 0 !== c ? c : this._defaultTemplate, b.actualHasSelectorCheckbox = this._getSelectionVisibility(this.options.cursorItem == a.id, a.hasSelectorCheckbox, this.options.hasSelectorCheckbox),
        b.actualHasButtons = (0 < this.options.buttons.length || null != b.template.buttons && 0 < b.template.buttons.length) && this._getSelectionVisibility(this.options.cursorItem == a.id, a.hasButtons, this.options.hasButtons), b.actualIsActive = a.isActive && b.template.isActive);
    return b
};
primitives.orgdiagram.BaseController.prototype._createVisualTreeItem = function(a) {
    var b, c, d, e, f, g, h, i, j, k;
    j = i = 0;
    null !== a.visualParentId && (j = this._treeItems[a.visualParentId].visualChildren, i = h = primitives.common.indexOf(j, a), j = j.length - h - 1);
    g = [];
    f = this._orgItemChildren[a.orgItem.id];
    if (null != f) {
        h = 0;
        for (e = f.length; h < e; h += 1)
            if (c = f[h], this.showInvisibleSubTrees || this._hasVisibleChildren(c)) {
                b = this._getNewTreeItem({
                    orgItem: c,
                    itemConfig: c.context,
                    parentId: a.id,
                    visualParentId: a.id,
                    actualItemType: c.itemType
                });
                g.push(b);
                b.visibility = !b.orgItem.isVisible ? 4 : 0;
                switch (a.actualItemType) {
                    case 7:
                    case 8:
                    case 6:
                        switch (b.actualItemType) {
                            case 7:
                            case 8:
                            case 6:
                                b.actualItemType = 0;
                                break;
                            case 0:
                                b.actualItemType = 1
                        }
                }
                switch (b.actualItemType) {
                    case 5:
                        this._defineLogicalParent(a, b), b.connectorPlacement = 5, b = this._createNewVisualParent(b);
                    case 8:
                    case 2:
                        d = this._treeItems[a.visualParentId];
                        if (a.connectorPlacement & 2) c = this._findLeftSiblingIndex(d.visualChildren, a), d.visualChildren.splice(c + 1, 0, b), b.connectorPlacement = 6, b.gravity =
                            2;
                        else if (a.connectorPlacement & 8) c = this._findRightSiblingIndex(d.visualChildren, a), d.visualChildren.splice(c, 0, b), b.connectorPlacement = 12, b.gravity = 1;
                        else switch (c.adviserPlacementType) {
                            case 2:
                                c = this._findLeftSiblingIndex(d.visualChildren, a);
                                d.visualChildren.splice(c + 1, 0, b);
                                b.connectorPlacement = 6;
                                b.gravity = 2;
                                break;
                            default:
                                c = this._findRightSiblingIndex(d.visualChildren, a), d.visualChildren.splice(c, 0, b), b.connectorPlacement = 12, b.gravity = 1
                        }
                        b.visualParentId = a.visualParentId;
                        switch (b.actualItemType) {
                            case 8:
                                this._defineLogicalParent(this._treeItems[a.parentId ||
                                    a.logicalParents[0]], b);
                                break;
                            case 2:
                                this._defineLogicalParent(a, b)
                        }
                        break;
                    case 4:
                        this._defineLogicalParent(a, b), b.connectorPlacement = 5, b = this._createNewVisualParent(b);
                    case 1:
                        null === a.visualAggregatorId && this._createNewVisualAggregator(a);
                        switch (c.adviserPlacementType) {
                            case 2:
                                a.visualChildren.splice(0, 0, b);
                                b.connectorPlacement = 6;
                                b.gravity = 2;
                                break;
                            default:
                                a.visualChildren.push(b), b.connectorPlacement = 12, b.gravity = 1
                        }
                        b.visualParentId = a.id;
                        1 == b.actualItemType && this._defineLogicalParent(a, b);
                        break;
                    case 0:
                        d =
                            a;
                        null !== a.visualAggregatorId && (d = this._treeItems[d.visualAggregatorId]);
                        d.visualChildren.push(b);
                        b.visualParentId = d.id;
                        this._defineLogicalParent(a, b);
                        b.connectorPlacement = (c.hideParentConnection ? 0 : 1) | (c.hideChildrenConnection ? 0 : 4);
                        break;
                    case 7:
                    case 6:
                        d = this._treeItems[a.visualParentId];
                        if (a.connectorPlacement & 2) d.visualChildren.splice(i, 0, b), b.connectorPlacement = 6, b.gravity = 2;
                        else if (a.connectorPlacement & 8) d.visualChildren.splice(d.visualChildren.length - j, 0, b), b.connectorPlacement = 12, b.gravity = 1;
                        else {
                            switch (c.adviserPlacementType) {
                                case 2:
                                    d.visualChildren.splice(i, 0, b);
                                    b.gravity = 2;
                                    break;
                                default:
                                    d.visualChildren.splice(d.visualChildren.length - j, 0, b), b.gravity = 1
                            }
                            switch (b.actualItemType) {
                                case 6:
                                    b.connectorPlacement = 5;
                                    break;
                                case 7:
                                    b.connectorPlacement = 4
                            }
                        }
                        b.visualParentId = a.visualParentId;
                        this._defineLogicalParent(this._treeItems[a.parentId || a.logicalParents[0]], b)
                }
            }
    }
    b = [];
    switch (a.actualItemType) {
        case 7:
        case 8:
        case 6:
            break;
        default:
            if (null !== a.visualParentId) {
                d = this._treeItems[a.visualParentId];
                for (h = i; h < d.visualChildren.length - j; h += 1)
                    if (e = d.visualChildren[h], e.id == a.id) b.push(e);
                    else switch (e.actualItemType) {
                        case 7:
                        case 8:
                        case 6:
                            b.push(e)
                    }
            }
    }
    d = [];
    c = [];
    this._layoutChildren(a, a.orgItem.childrenPlacementType, d, c);
    h = 0;
    for (e = g.length; h < e; h += 1) this._createVisualTreeItem(g[h]);
    if (null !== a.visualAggregatorId && (e = this._treeItems[a.visualAggregatorId], 0 < e.visualChildren.length && (j = this._getAssitantsDepth(a), 1 < j)))
        for (h = 0; h < j - 1; h += 1) e = this._createNewVisualAggregator(e);
    if (0 < a.visualChildren.length &&
        (j = this._getAdvisersDepth(a), 1 < j)) {
        e = a;
        for (h = 0; h < j - 1; h += 1) e = this._createNewVisualAggregator(e)
    }
    f = [];
    h = 0;
    for (e = c.length; h < e; h += 1) {
        j = c[h];
        g = f[h] = 0;
        for (i = j.length; g < i; g += 1) f[h] = Math.max(f[h], this._getItemDepth(j[g]))
    }
    h = 0;
    for (e = f.length; h < e; h += 1)
        if (c = f[h], 1 < c) {
            g = 0;
            for (i = d[h].length; g < i; g += 1)
                if (k = d[h][g], 0 < k.visualChildren.length)
                    for (j = c; 1 < j;) k = this._createNewVisualAggregator(k), j -= 1
        }
    this._layoutPartners(a, b)
};
primitives.orgdiagram.BaseController.prototype._layoutPartners = function(a, b) {
    var c, d, e, f, g, h = 0,
        i = [],
        j;
    f = [];
    if (1 < b.length) {
        d = this._getLastVisualAggregator(a);
        f = f.concat(d.visualChildren.slice(0));
        d = d.visualChildren.length = 0;
        for (e = b.length; d < e; d += 1) c = b[d], g = this._getAdvisersDepth(c), c = this._getItemDepth(c), h = Math.max(Math.max(h, c), g);
        d = 0;
        for (e = b.length; d < e; d += 1) {
            c = b[d];
            j = this._getLastVisualAggregator(c);
            for (c = this._getLastVisualAggregatorDepth(c); c < h;) j = this._createNewVisualAggregator(j), c += 1;
            i.push(this._getLastVisualAggregator(j).id)
        }
        if (0 <
            f.length) {
            j = b[Math.floor(b.length / 2)];
            if (1 < b.length && 0 == b.length % 2) {
                d = this._treeItems[j.visualParentId];
                e = this._findLeftSiblingIndex(d.visualChildren, j);
                c = d.visualChildren[e].gravity || d.visualChildren[e + 1].gravity;
                j = this._getNewTreeItem({
                    visibility: 4,
                    visualParentId: d.id,
                    connectorPlacement: j.connectorPlacement & 10,
                    gravity: c
                });
                d.visualChildren.splice(e + 1, 0, j);
                for (c = 1; c < h;) j = this._createNewVisualAggregator(j), j.connectorPlacement = 0, c += 1
            }
            j = this._getLastVisualAggregator(j);
            j.visualChildren = f;
            d = 0;
            for (e =
                f.length; d < e; d += 1) h = f[d], h.visualParentId = j.id;
            d = 0;
            for (e = b.length; d < e; d += 1)
                if (c = b[d], c.id != a.id) {
                    f = 0;
                    for (g = a.logicalChildren.length; f < g; f += 1) switch (h = a.logicalChildren[f], h.actualItemType) {
                        case 5:
                        case 2:
                        case 4:
                        case 1:
                            break;
                        default:
                            this._defineLogicalParent(c, h)
                    }
                }
        }
        j.partners = i
    }
};
primitives.orgdiagram.BaseController.prototype._defineLogicalParent = function() {};
primitives.orgdiagram.BaseController.prototype._getLastVisualAggregatorDepth = function(a) {
    for (var b = 0; null != a.visualAggregatorId;) a = this._treeItems[a.visualAggregatorId], b += 1;
    return b + 1
};
primitives.orgdiagram.BaseController.prototype._getLastVisualAggregator = function(a) {
    for (; null != a.visualAggregatorId;) a = this._treeItems[a.visualAggregatorId];
    return a
};
primitives.orgdiagram.BaseController.prototype._createNewVisualParent = function(a) {
    var b;
    b = this._getNewTreeItem({
        visibility: 4,
        visualChildren: [a]
    });
    a.visualParentId = b.id;
    return b
};
primitives.orgdiagram.BaseController.prototype._hasVisibleChildren = function(a) {
    var b = !0,
        c, d;
    if (!a.isVisible && (b = !1, a = this._orgItemChildren[a.id], null != a)) {
        c = 0;
        for (d = a.length; c < d; c += 1)
            if (this._hasVisibleChildren(a[c])) {
                b = !0;
                break
            }
    }
    return b
};
primitives.orgdiagram.BaseController.prototype._getAdvisersDepth = function(a) {
    var b = 0,
        c = this._getParentItem(a),
        d, e;
    if (null !== c) {
        a = primitives.common.indexOf(c.visualChildren, a);
        for (d = a + 1; d < c.visualChildren.length; d += 1)
            if (e = c.visualChildren[d], e.connectorPlacement & 8) b = Math.max(b, this._getItemDepth(e));
            else break;
        for (d = a - 1; 0 <= d; d -= 1)
            if (e = c.visualChildren[d], e.connectorPlacement & 2) b = Math.max(b, this._getItemDepth(e));
            else break
    }
    return b
};
primitives.orgdiagram.BaseController.prototype._getAssitantsDepth = function(a) {
    var b = 0,
        c, d;
    for (c = 0; c < a.visualChildren.length; c += 1) d = a.visualChildren[c], d.connectorPlacement & 1 || (b = Math.max(b, this._getItemDepth(d)));
    return b
};
primitives.orgdiagram.BaseController.prototype._getItemsDepth = function(a) {
    var b = 0,
        c, d, e;
    c = 0;
    for (d = a.length; c < d; c += 1) e = a[c], b = Math.max(b, this._getItemDepth(e));
    return b
};
primitives.orgdiagram.BaseController.prototype._getItemDepth = function(a) {
    var b = 0,
        c, d;
    c = 0;
    for (d = a.visualChildren.length; c < d; c += 1) b = Math.max(b, this._getItemDepth(a.visualChildren[c]));
    return b + 1
};
primitives.orgdiagram.BaseController.prototype._layoutChildren = function(a, b, c, d) {
    var e, f, g, h, i, j, k, l, m, n = 4 == a.visibility && 0 == a.connectorPlacement;
    switch (this.options.horizontalAlignment) {
        case 0:
        case 1:
            f = 3;
            break;
        case 2:
            f = 2
    }
    0 === b && (b = this._hasLeavesOnly(a) ? 0 === this.options.leavesPlacementType ? 3 : this.options.leavesPlacementType : 0 === this.options.childrenPlacementType ? 2 : this.options.childrenPlacementType);
    e = a;
    null !== a.visualAggregatorId && (e = this._treeItems[a.visualAggregatorId]);
    switch (b) {
        case 2:
            0 < e.visualChildren.length &&
                (this._treeItems[e.visualChildren[0]].relationDegree = 1);
            break;
        case 3:
            if (3 < e.visualChildren.length) {
                a = e.visualChildren.slice(0);
                e.visualChildren.length = 0;
                i = Math.min(this.options.maximumColumnsInMatrix, Math.ceil(Math.sqrt(a.length)));
                j = Math.ceil(a.length / i);
                k = Math.ceil(i / 2);
                for (l = 0; l < k; l += 1) {
                    f = e;
                    for (m = 0; m < j; m += 1) {
                        b = this._getMatrixItem(a, 2 * l, m, i);
                        g = this._getMatrixItem(a, 2 * l + 1, m, i);
                        void 0 === c[m] && (c[m] = [], d[m] = []);
                        null !== b && (0 == l && (b.relationDegree = 1), f.visualChildren.push(b), b.visualParentId = f.id, b.connectorPlacement =
                            (n ? 0 : 2) | 4, b.gravity = 2, d[m].push(b));
                        if (null !== b || null !== g) h = this._getNewTreeItem({
                            visibility: 4,
                            visualParentId: f.id,
                            connectorPlacement: n ? 0 : 5
                        }), f.visualChildren.push(h), f.visualAggregatorId = h.id, c[m].push(h);
                        null !== g && (f.visualChildren.push(g), g.visualParentId = f.id, g.connectorPlacement = (n ? 0 : 8) | 4, g.gravity = 1, d[m].push(g));
                        f = h
                    }
                }
                2 < i && (e.visualAggregatorId = null)
            }
            break;
        case 1:
            a = e.visualChildren.slice(0);
            g = e.visualChildren.length = 0;
            for (i = a.length; g < i; g += 1) {
                b = a[g];
                h = this._getNewTreeItem({
                    visibility: 4,
                    visualParentId: e.id,
                    connectorPlacement: n ? 0 : 5
                });
                e.visualAggregatorId = h.id;
                b.visualParentId = e.id;
                switch (f) {
                    case 2:
                        e.visualChildren.push(b);
                        e.visualChildren.push(h);
                        b.connectorPlacement = (n ? 0 : 2) | 4;
                        b.gravity = 2;
                        break;
                    case 3:
                        e.visualChildren.push(h), e.visualChildren.push(b), b.connectorPlacement = (n ? 0 : 8) | 4, b.gravity = 1
                }
                c[g] = [h];
                d[g] = [b];
                e = h
            }
    }
};
primitives.orgdiagram.BaseController.prototype._getMatrixItem = function(a, b, c, d) {
    0 < d % 2 && (b === d - 1 ? b = a.length : b === d && (b = d - 1));
    b = c * d + b;
    return b > a.length - 1 ? null : a[b]
};
primitives.orgdiagram.BaseController.prototype._hasLeavesOnly = function(a) {
    var b = !1,
        c, d, e;
    if (null !== a.orgItem && (e = this._orgItemChildren[a.orgItem.id], null != e && (c = e.length, 0 < c))) {
        b = !0;
        for (a = 0; a < c; a += 1)
            if (d = e[a], 0 === d.itemType && null != this._orgItemChildren[d.id]) {
                b = !1;
                break
            }
    }
    return b
};
primitives.orgdiagram.BaseController.prototype._findLeftSiblingIndex = function(a, b) {
    var c = null,
        d, e, f, g = {};
    for (e = a.length - 1; 0 <= e; e -= 1)
        if (d = a[e], null === c) {
            if (d === b) {
                c = -1;
                g[b] = !0;
                d = 0;
                for (f = b.logicalChildren.length; d < f; d += 1) g[b.logicalChildren[d]] = !0
            }
        } else if (g.hasOwnProperty(d)) {
        d = 0;
        for (f = b.logicalChildren.length; d < f; d += 1) g[b.logicalChildren[d]] = !0
    } else {
        c = e;
        break
    }
    return c
};
primitives.orgdiagram.BaseController.prototype._findRightSiblingIndex = function(a, b) {
    var c = null,
        d, e, f, g, h = {};
    e = 0;
    for (f = a.length; e < f; e += 1)
        if (d = a[e], null === c) {
            if (d === b) {
                c = f;
                h[b] = !0;
                d = 0;
                for (g = b.logicalChildren.length; d < g; d += 1) h[b.logicalChildren[d]] = !0
            }
        } else if (h.hasOwnProperty(d)) {
        d = 0;
        for (g = b.logicalChildren.length; d < g; d += 1) h[b.logicalChildren[d]] = !0
    } else {
        c = e;
        break
    }
    return c
};
primitives.orgdiagram.BaseController.prototype._createNewVisualAggregator = function(a) {
    var b, c;
    b = this._getNewTreeItem({
        visibility: 4,
        visualParentId: a.id,
        visualAggregatorId: a.visualAggregatorId,
        connectorPlacement: 4 == a.visibility && 0 == a.connectorPlacement ? 0 : 5
    });
    b.visualChildren = a.visualChildren;
    for (c = 0; c < b.visualChildren.length; c += 1) b.visualChildren[c].visualParentId = b.id;
    a.visualChildren = [b];
    a.visualAggregatorId = b.id;
    return b
};
primitives.orgdiagram.BaseController.prototype._readVisualTree = function(a, b) {
    var c = this._treeLevels[b],
        d, e;
    void 0 === c && (c = this._treeLevels[b] = new primitives.orgdiagram.TreeLevel(b));
    c.treeItems.push(a.id);
    a.actualIsActive && 4 != a.visibility && c.activeTreeItems.push(a.id);
    a.level = b;
    a.levelPosition = c.treeItems.length - 1;
    c = 0;
    for (d = a.visualChildren.length; c < d; c += 1) e = a.visualChildren[c], 0 === c && this._updateLeftMargins(e, 0), c === d - 1 && this._updateRightMargins(e, 0), this._readVisualTree(e, b + 1)
};
primitives.orgdiagram.BaseController.prototype._updateLeftMargins = function(a, b) {
    for (var c = a, d; null !== (c = this._getParentItem(c));) d = this._leftMargins[c.id], void 0 === d && (d = this._leftMargins[c.id] = []), void 0 === d[b] && (d[b] = a.id), b += 1
};
primitives.orgdiagram.BaseController.prototype._updateRightMargins = function(a, b) {
    for (var c = a, d; null !== (c = this._getParentItem(c));) d = this._rightMargins[c.id], void 0 === d && (d = this._rightMargins[c.id] = []), d[b] = a.id, b += 1
};
primitives.orgdiagram.BaseController.prototype._showSelectedItems = function() {
    var a, b, c, d, e, f;
    d = [];
    b = 0;
    for (c = this.options.annotations.length; b < c; b += 1) a = this.options.annotations[b], a.selectItems && (null != a.fromItem && d.push(a.fromItem), null != a.toItem && d.push(a.toItem), null != a.items && 0 < a.items.length && (d = d.concat(a.items)));
    b = 0;
    for (c = d.length; b < c; b += 1) a = this._treeItemsByUserId[d[b]], null != a && 0 === a.visibility && (a.visibility = 1);
    b = 0;
    for (c = this.options.selectedItems.length; b < c; b += 1)
        if (a = this._treeItemsByUserId[this.options.selectedItems[b]],
            null != a) switch (a.isSelected = !0, 0 === a.visibility && (a.visibility = 1), this.options.selectionPathMode) {
            case 1:
                f = this._getAllLogicalParents([a]);
                d = 0;
                for (a = f.length; d < a; d += 1) e = f[d], 0 === e.visibility && (e.visibility = 1)
        }
};
primitives.orgdiagram.BaseController.prototype._getAllLogicalChildren = function(a) {
    return this._getAllLogicalParents(a, "logicalChildren")
};
primitives.orgdiagram.BaseController.prototype._getAllLogicalParents = function(a, b) {
    var c = [],
        d = [],
        e, f = [],
        g, h, i, j, k = {},
        b = b || "logicalParents";
    i = 0;
    for (j = a.length; i < j; i += 1)
        if (e = a[i], !k.hasOwnProperty(e.id)) {
            k[e.id] = !0;
            c.push(e);
            for (d = d.concat(e[b]); 0 < d.length;) {
                g = 0;
                for (h = d.length; g < h; g += 1) e = this._treeItems[d[g]], c.push(e), f = f.concat(e[b]);
                d = f;
                f = []
            }
        }
    return c
};
primitives.orgdiagram.BaseController.prototype._virtualShowCursorNeighbours = function() {};
primitives.orgdiagram.BaseController.prototype._getSelectionVisibility = function(a, b, c) {
    var d = !1;
    switch (b) {
        case 0:
            switch (c) {
                case 0:
                    d = a;
                    break;
                case 1:
                    d = !0;
                    break;
                case 2:
                    d = !1
            }
            break;
        case 1:
            d = !0;
            break;
        case 2:
            d = !1
    }
    return d
};
primitives.common.ReferenceItem = function() {
    this.key = this.name = "";
    this.actualTargets = [];
    this.targets = [];
    this.processed = !1;
    this.isVisible = !0;
    this.level = 0
};
primitives.common.SharedReferences = function(a) {
    this.items = [];
    this.difference = this.weight = 0;
    0 < arguments.length && (this.difference = a)
};
primitives.common.StackSegment = function(a, b, c) {
    this.context = a;
    this.startIndex = b;
    this.endIndex = c
};
primitives.common.StackSegment.prototype.toString = function() {
    return "[" + Math.round(this.startIndex) + " - " + Math.round(this.endIndex) + "]"
};
primitives.common.perimeter.LinkedHashItems = function() {
    this.segmentsHash = {};
    this.nextKeys = {};
    this.prevKeys = {};
    this.endSegmentKey = this.startSegmentKey = null
};
primitives.common.perimeter.LinkedHashItems.prototype.add = function(a, b) {
    if (this.segmentsHash.hasOwnProperty(a)) throw "Duplicate segments are not supported!";
    this.segmentsHash[a] = b;
    this.nextKeys[a] = null;
    null == this.endSegmentKey ? (this.startSegmentKey = a, this.prevKeys[a] = null) : (this.nextKeys[this.endSegmentKey] = a, this.prevKeys[a] = this.endSegmentKey);
    this.endSegmentKey = a
};
primitives.common.perimeter.LinkedHashItems.prototype.unshift = function(a, b) {
    if (this.segmentsHash.hasOwnProperty(a)) throw "Duplicate segments are not supported!";
    this.segmentsHash[a] = b;
    this.prevKeys[a] = null;
    null == this.startSegmentKey ? (this.endSegmentKey = a, this.nextKeys[a] = null) : (this.prevKeys[this.startSegmentKey] = a, this.nextKeys[a] = this.startSegmentKey);
    this.startSegmentKey = a
};
primitives.common.perimeter.LinkedHashItems.prototype.insertAfter = function(a, b, c) {
    if (this.segmentsHash.hasOwnProperty(b)) throw "Duplicate segments are not supported!";
    if (null == a) this.unshift(b, c);
    else {
        var d = this.nextKeys[a];
        null == d ? this.add(b, c) : (this.segmentsHash[b] = c, this.nextKeys[a] = b, this.nextKeys[b] = d, this.prevKeys[d] = b, this.prevKeys[b] = a)
    }
};
primitives.common.perimeter.LinkedHashItems.prototype.remove = function(a) {
    var b = this.prevKeys[a],
        c = this.nextKeys[a];
    null != b ? this.nextKeys[b] = c : this.startSegmentKey = c;
    null != c ? this.prevKeys[c] = b : this.endSegmentKey = b;
    delete this.segmentsHash[a];
    delete this.nextKeys[a];
    delete this.prevKeys[a]
};
primitives.common.perimeter.LinkedHashItems.prototype.empty = function() {
    this.segmentsHash = {};
    this.nextKeys = {};
    this.prevKeys = {};
    this.endSegmentKey = this.startSegmentKey = null
};
primitives.common.perimeter.LinkedHashItems.prototype.iterate = function(a, b, c) {
    this._iterate(!0, a, b, c)
};
primitives.common.perimeter.LinkedHashItems.prototype.iterateBack = function(a, b, c) {
    this._iterate(!1, a, b, c)
};
primitives.common.perimeter.LinkedHashItems.prototype._iterate = function(a, b, c, d) {
    var e;
    null == c && (c = a ? this.startSegmentKey : this.endSegmentKey);
    if (null != b)
        for (; null != c;) e = this.segmentsHash[c], null != e && b(e), c = c == d ? null : a ? this.nextKeys[c] : this.prevKeys[c]
};
primitives.common.perimeter.LinkedHashItems.prototype.toArray = function() {
    var a = [];
    this.iterate(function(b) {
        a.push(b)
    });
    return a
};
primitives.common.perimeter.Item = function(a, b) {
    var c, d, e;
    this.id = a;
    this.segments = new primitives.common.perimeter.LinkedHashItems;
    if (null != b) {
        c = 0;
        for (d = b.length; c < d; c += 1) e = b[c], this.segments.add(e.key, e)
    }
};
primitives.common.perimeter.Manager = function(a) {
    this.perimetersHash = {};
    this.perimetersBySegmentKey = {};
    null != a && this.add(a)
};
primitives.common.perimeter.Manager.prototype.add = function(a) {
    var b = this,
        c, d, e;
    c = 0;
    for (d = a.length; c < d; c += 1) e = a[c], this.perimetersHash[e.id] = e, e.segments.iterate(function(a) {
        b.perimetersBySegmentKey[a.key] = e
    })
};
primitives.common.perimeter.Manager.prototype.getMergedPerimeters = function(a) {
    var b = [],
        c = {},
        d, e, f, g, h, i;
    d = 0;
    for (e = a.length; d < e; d += 1) f = a[d], c[f] = !this.perimetersHash.hasOwnProperty(f);
    d = 0;
    for (e = a.length; d < e; d += 1)
        if (f = a[d], !c[f]) {
            c[f] = !0;
            g = new primitives.common.perimeter.Item(f);
            f = this.perimetersHash[f];
            f.segments.iterate(function(a) {
                g.segments.add(a.key, a)
            });
            b.push(g);
            for (h = g.segments.startSegmentKey; null != h;) i = g.segments.segmentsHash[h], this.perimetersBySegmentKey.hasOwnProperty(i.oppositeKey) && (f =
                this.perimetersBySegmentKey[i.oppositeKey], c.hasOwnProperty(f.id) && !c[f.id] && (c[f.id] = !0, f.segments.iterateBack(function(a) {
                    a.key != i.oppositeKey && g.segments.insertAfter(h, a.key, a)
                }, i.oppositeKey, null), f.segments.iterateBack(function(a) {
                    g.segments.insertAfter(h, a.key, a)
                }, null, i.oppositeKey))), h = this._moveCursor(g.segments, i)
        }
    return b
};
primitives.common.perimeter.Manager.prototype._moveCursor = function(a, b) {
    for (var c = a.nextKeys[b.key], d; null != b && b.oppositeKey == (d = c || a.startSegmentKey);) null != c && (c = a.nextKeys[c]), a.remove(b.key), a.remove(d), b = a.segmentsHash[null != c ? a.prevKeys[c] : a.endSegmentKey];
    return c
};
primitives.common.perimeter.SegmentItem = function(a, b, c, d) {
    this.toPoint = this.fromPoint = null;
    switch (arguments.length) {
        case 2:
            this.fromPoint = a;
            this.toPoint = b;
            break;
        case 4:
            this.fromPoint = new primitives.common.Point(a, b), this.toPoint = new primitives.common.Point(c, d)
    }
    var e = this.fromPoint.toString(),
        f = this.toPoint.toString();
    if (e == f) throw "Null length segment!";
    this.key = e + " - " + f;
    this.oppositeKey = f + " - " + e;
    this.orientationType = null;
    this.orientationType = this.fromPoint.y > this.toPoint.y ? 3 : this.fromPoint.y < this.toPoint.y ?
        2 : this.fromPoint.x > this.toPoint.x ? 0 : 1
};
primitives.common.getGraphSpanningTree = function(a, b, c) {
    var d = {},
        e = {},
        f, g = [],
        h = {},
        i, j, k, l, m, n, p;
    e[b] = !0;
    i = 1;
    for (h[b] = null; 0 < i;) {
        g = [];
        l = k = j = null;
        for (f in e)
            if (e.hasOwnProperty(f)) {
                m = a[f];
                b = !1;
                for (n in m)
                    if (m.hasOwnProperty(n) && !h.hasOwnProperty(n) && (p = m[n], b = !0, !k || 0 <= c(p, k))) j = n, k = p, l = f;
                b || g.push(f)
            }
        if (null == j) break;
        else e[j] = !0, i += 1, h[j] = l, d.hasOwnProperty(l) || (d[l] = []), d[l].push(j);
        b = 0;
        for (j = g.length; b < j; b += 1) delete e[g[b]], i -= 1
    }
    return d
};
primitives.common.getShortestPath = function(a, b, c, d) {
    var e = {},
        f = {},
        g = {},
        h, i, j, k, l;
    e[b] = !0;
    h = 1;
    for (f[b] = 0; 0 < h;) {
        i = b = null;
        for (j in e) e.hasOwnProperty(j) && (null == i ? (b = j, i = f[j]) : i > f[j] && (b = j, i = f[j]));
        k = a[b];
        for (j in k) k.hasOwnProperty(j) && (l = i + (null != d ? d(k[j]) : 1), f.hasOwnProperty(j) ? f[j] > l && e.hasOwnProperty(j) && (f[j] = l, g[j] = b) : (f[j] = l, g[j] = b, e[j] = !0, h += 1));
        if (b == c) break;
        else delete e[b], h -= 1
    }
    for (a = []; null != c;) a.push(c), c = g[c];
    return a
};
primitives.common.invertReferences = function(a, b) {
    var c = {},
        d, e, f, g, h;
    for (d in a)
        if (a.hasOwnProperty(d)) {
            e = a[d];
            e = null != b ? b(e) : e;
            g = 0;
            for (h = e.length; g < h; g += 1) f = e[g], c.hasOwnProperty(f) || (c[f] = []), c[f].push(d)
        }
    return c
};
primitives.common.optimizeReferences = function(a, b) {
    var c = {},
        d = [],
        e = {},
        f = {},
        g, h, i, j, k, l, m, n, p, q, r;
    for (g in a) a.hasOwnProperty(g) && (h = a[g], i = new primitives.common.ReferenceItem, h.sort(), i.key = h.join(","), i.name = g, i.targets = h.slice(0), i.actualTargets = h.slice(0), i.level = 0, f[i.name] = i);
    for (; !primitives.common.isEmptyObject(f);) {
        h = {};
        i = primitives.common.getReferencesGraph(f);
        for (g in f)
            if (f.hasOwnProperty(g) && (j = f[g], d.push(j), !j.processed))
                for (m in l = primitives.common.getGraphSpanningTree(i, g, function(a,
                        b) {
                        return a.weight > b.weight ? 1 : a.weight == b.weight ? b.difference - a.difference : -1
                    }), l)
                    if (l.hasOwnProperty(m)) {
                        f[m].processed = !0;
                        n = l[m];
                        j = 0;
                        for (k = n.length; j < k; j += 1) p = n[j], f[p].processed = !0, q = i[m][p], 1 < q.weight && (g = q.items.join(","), r = null, e.hasOwnProperty(g) ? r = e[g] : (r = new primitives.common.ReferenceItem, r.name = b(), r.key = g, r.actualTargets = q.items.slice(0), r.targets = q.items.slice(0), e[r.key] = r, h[r.name] = r), primitives.common.addGroup(f[m], r), primitives.common.addGroup(f[p], r))
                    }
        f = h
    }
    j = 0;
    for (k = d.length; j < k; j +=
        1) e = d[j], c[e.name] = e.actualTargets;
    return c
};
primitives.common.addGroup = function(a, b) {
    var c, d, e, f;
    if (a.name != b.name) {
        e = {};
        c = 0;
        for (d = b.targets.length; c < d; c += 1) e[b.targets[c]] = !0;
        f = [];
        c = 0;
        for (d = a.actualTargets.length; c < d; c += 1) e.hasOwnProperty(a.actualTargets[c]) || f.push(a.actualTargets[c]);
        f.length != a.actualTargets.length && (f.push(b.name), a.actualTargets = f)
    }
};
primitives.common.getReferencesGraph = function(a) {
    var b = {},
        c = primitives.common.invertReferences(a, function(a) {
            return a.targets
        }),
        d, e, f, g, h, i, j, k, l;
    for (d in c)
        if (c.hasOwnProperty(d)) {
            e = c[d];
            f = 0;
            for (h = e.length; f < h - 1; f += 1) {
                i = e[f];
                j = a[i];
                for (g = f + 1; g < h; g += 1) k = e[g], l = a[k], l = Math.abs(j.targets.length - l.targets.length), b.hasOwnProperty(i) || (b[i] = {}), b[i].hasOwnProperty(k) || (b[i][k] = new primitives.common.SharedReferences(l)), b[i][k].items.push(d), b[i][k].weight += 1, b.hasOwnProperty(k) || (b[k] = {}), b[k].hasOwnProperty(i) ||
                    (b[k][i] = new primitives.common.SharedReferences(l)), b[k][i].items.push(d), b[k][i].weight += 1
            }
        }
    return b
};
primitives.common.topologicalSort = function(a) {
    var b = [],
        c = {},
        d, e, f, g, h, i, j, k;
    for (d in a)
        if (a.hasOwnProperty(d)) {
            e = a[d];
            g = 0;
            for (h = e.length; g < h; g += 1) i = e[g].toString(), c.hasOwnProperty(i) || (c[i] = 0), c[i] += 1
        }
    i = [];
    for (d in a) a.hasOwnProperty(d) && (c.hasOwnProperty(d) || i.push(d));
    for (; 0 < i.length;) {
        d = [];
        g = 0;
        for (h = i.length; g < h; g += 1) {
            e = i[g];
            b.push(e);
            e = a[e];
            j = 0;
            for (k = e.length; j < k; j += 1) f = e[j].toString(), c[f] -= 1, 0 == c[f] && d.push(f)
        }
        i = d
    }
    return b
};
primitives.common.getGraphGrowthSequence = function(a, b, c) {
    var d = [b],
        e = {},
        f, g = [],
        h = {},
        i, j, k, l, m, n, p;
    e[b] = !0;
    i = 1;
    for (h[b] = null; 0 < i;) {
        g = [];
        k = j = null;
        l = {};
        for (f in e)
            if (e.hasOwnProperty(f)) {
                m = a[f];
                b = !1;
                for (n in m)
                    if (m.hasOwnProperty(n) && !h.hasOwnProperty(n) && (p = c(m[n]), b = !0, null == l[n] && (l[n] = 0), l[n] += p, !k || l[n] > k)) j = n, k = l[n];
                b || g.push(f)
            }
        if (null == j) break;
        else e[j] = !0, i += 1, h[j] = !0, d.push(j);
        b = 0;
        for (j = g.length; b < j; b += 1) delete e[g[b]], i -= 1
    }
    return d
};
primitives.common.mergeSort = function(a, b, c) {
    var d = null,
        e, f, g, h, i, j, k, l, m, n, p, q;
    switch (a.length) {
        case 0:
            d = [];
            break;
        default:
            d = [];
            for (g = 0; g < a.length; g += 1) {
                e = a[g];
                f = [];
                j = d.length;
                k = e.length;
                i = h = 0;
                p = m = n = l = null;
                0 < j && (l = d[h], n = !b ? l : b(l));
                0 < k && (m = e[i], p = !b ? m : b(m));
                for (q = null; h < j || i < k;)
                    if (h >= j) {
                        if (!c || q != m) f.push(m), q = m;
                        i += 1;
                        i < k && (m = e[i], p = !b ? m : b(m))
                    } else if (i >= k) {
                    if (!c || q != l) f.push(l), q = l;
                    h += 1;
                    h < j && (l = d[h], n = !b ? l : b(l))
                } else if (n < p) {
                    if (!c || q != l) f.push(l), q = l;
                    h += 1;
                    h < j && (l = d[h], n = !b ? l : b(l))
                } else {
                    if (!c || q != m) f.push(m),
                        q = m;
                    i += 1;
                    i < k && (m = e[i], p = !b ? m : b(m))
                }
                d = f
            }
    }
    return d
};
primitives.common.stackSegments = function(a, b) {
    var c = 0,
        d, e, f, g, h, i, j, k = [],
        l, m, n, p, q, r, t = {};
    a.sort(function(a, b) {
        return a.endIndex - a.startIndex - (b.endIndex - b.startIndex)
    });
    g = 0;
    for (h = a.length; g < h; g += 1) {
        f = a[g];
        e = d = 0;
        n = f.startIndex;
        t[n] = d + 1;
        p = f.endIndex;
        t[p] = e;
        j = k.length;
        if (0 < j) {
            l = [];
            r = q = !1;
            for (i = 0; i < j; i += 1) m = k[i], m < n ? (l.push(m), d = t[m], e = t[m]) : m < p ? (q || (l.push(n), q = !0), d = Math.max(d, t[m]), e = t[m]) : (q || (l.push(n), q = !0), r || (l.push(p), r = !0, t[n] = d + 1, t[p] = e), l.push(m));
            q || (l.push(n), q = !0);
            r || (l.push(p), r = !0, t[n] =
                d + 1, t[p] = e);
            k = l
        } else k = [n, p];
        b(f, t[n]);
        c = Math.max(c, t[n])
    }
    return c
};
primitives.common.binarySearch = function(a, b) {
    var c = null,
        d, e, f = 0,
        g = a.length - 1,
        h, i;
    if (0 < a.length && (c = a[f], d = b(c), 0 < d))
        if (e = Math.abs(d), i = a[g], d = b(i), 0 <= d) c = i;
        else {
            d = Math.abs(d);
            e > d && (e = d, c = i);
            for (; f + 1 < g;)
                if (h = Math.round((f + g) / 2), i = a[h], d = b(i), 0 == d) {
                    c = i;
                    break
                } else 0 < d ? f = h : g = h, d = Math.abs(d), e > d && (e = d, c = i)
        }
    return c
};
primitives.callout.Config = function() {
    this.classPrefix = "bpcallout";
    this.graphicsType = 1;
    this.actualGraphicsType = null;
    this.pointerPlacement = 0;
    this.snapPoint = this.position = null;
    this.cornerRadius = "10%";
    this.offset = 0;
    this.lineWidth = this.opacity = 1;
    this.lineType = 0;
    this.pointerWidth = "10%";
    this.borderColor = "#000000";
    this.fillColor = "#d3d3d3"
};
primitives.callout.Controller = function() {
    this.widgetEventPrefix = "bpcallout";
    this.options = new primitives.callout.Config;
    this.m_shape = this.m_graphics = this.m_panelSize = this.m_placeholder = null
};
primitives.callout.Controller.prototype._create = function() {
    this.element.addClass("ui-widget");
    this._createLayout();
    this._redraw()
};
primitives.callout.Controller.prototype.destroy = function() {
    this._cleanLayout()
};
primitives.callout.Controller.prototype._createLayout = function() {
    this.m_panelSize = new primitives.common.Rect(0, 0, this.element.outerWidth(), this.element.outerHeight());
    this.m_placeholder = jQuery("<div></div>");
    this.m_placeholder.css({
        position: "relative",
        overflow: "hidden",
        top: "0px",
        left: "0px",
        padding: "0px",
        margin: "0px"
    });
    this.m_placeholder.css(this.m_panelSize.getCSS());
    this.m_placeholder.addClass("placeholder");
    this.m_placeholder.addClass(this.widgetEventPrefix);
    this.element.append(this.m_placeholder);
    this.m_graphics = primitives.common.createGraphics(this.options.graphicsType, this);
    this.options.actualGraphicsType = this.m_graphics.graphicsType;
    this.m_shape = new primitives.common.Callout(this.m_graphics)
};
primitives.callout.Controller.prototype._cleanLayout = function() {
    null !== this.m_graphics && this.m_graphics.clean();
    this.m_graphics = null;
    this.element.find("." + this.widgetEventPrefix).remove()
};
primitives.callout.Controller.prototype._updateLayout = function() {
    this.m_panelSize = new primitives.common.Rect(0, 0, this.element.innerWidth(), this.element.innerHeight());
    this.m_placeholder.css(this.m_panelSize.getCSS())
};
primitives.callout.Controller.prototype.update = function(a) {
    a ? (this._cleanLayout(), this._createLayout(), this._redraw()) : (this._updateLayout(), this.m_graphics.resize("placeholder", this.m_panelSize.width, this.m_panelSize.height), this.m_graphics.begin(), this._redraw(), this.m_graphics.end())
};
primitives.callout.Controller.prototype._redraw = function() {
    var a = "pointerPlacement cornerRadius offset opacity lineWidth lineType pointerWidth borderColor fillColor".split(" "),
        b, c;
    this.m_graphics.activate("placeholder");
    for (b = 0; b < a.length; b += 1) c = a[b], this.m_shape[c] = this.options[c];
    this.m_shape.draw(this.options.snapPoint, this.options.position)
};
primitives.callout.Controller.prototype._setOption = function(a, b) {
    jQuery.Widget.prototype._setOption.apply(this, arguments);
    switch (a) {
        case "disabled":
            var c = jQuery([]);
            b ? (c.filter(".ui-state-focus").blur(), c.removeClass("ui-state-hover"), c.propAttr("disabled", !0), this.element.addClass("ui-disabled")) : (c.propAttr("disabled", !1), this.element.removeClass("ui-disabled"))
    }
};
(function(a) {
    a.widget("ui.bpCallout", new primitives.callout.Controller)
})(jQuery);
primitives.connector.Config = function() {
    this.classPrefix = "bpconnector";
    this.graphicsType = 1;
    this.actualGraphicsType = null;
    this.connectorShapeType = this.orientationType = 0;
    this.toRectangle = this.fromRectangle = null;
    this.offset = new primitives.common.Thickness(0, 0, 0, 0);
    this.lineWidth = 3;
    this.color = "#000000";
    this.lineType = 0;
    this.label = null;
    this.labelSize = new primitives.common.Size(60, 30);
    this.labelPlacementType = primitives.common.ConnectorLabelPlacementType.Between
};
primitives.connector.Controller = function() {
    this.widgetEventPrefix = "bpconnector";
    this.options = new primitives.connector.Config;
    this._labelTemplateHashCode = this._labelTemplate = this.m_shape = this.m_graphics = this.m_panelSize = this.m_placeholder = null
};
primitives.connector.Controller.prototype._create = function() {
    var a = this;
    this.element.addClass("ui-widget");
    this._createLabelTemplate();
    this._createLayout();
    this.options.onAnnotationLabelTemplateRender = function(b, c) {
        a._onAnnotationLabelTemplateRender(b, c)
    };
    this._redraw()
};
primitives.connector.Controller.prototype.destroy = function() {
    this._cleanLayout();
    this.options.onLabelTemplateRender = null
};
primitives.connector.Controller.prototype._createLayout = function() {
    this.m_panelSize = new primitives.common.Rect(0, 0, this.element.outerWidth(), this.element.outerHeight());
    this.m_placeholder = jQuery("<div></div>");
    this.m_placeholder.css({
        position: "relative",
        overflow: "hidden",
        top: "0px",
        left: "0px",
        padding: "0px",
        margin: "0px"
    });
    this.m_placeholder.css(this.m_panelSize.getCSS());
    this.m_placeholder.addClass("placeholder");
    this.m_placeholder.addClass(this.widgetEventPrefix);
    this.element.append(this.m_placeholder);
    this.m_graphics = primitives.common.createGraphics(this.options.graphicsType, this);
    this.options.actualGraphicsType = this.m_graphics.graphicsType;
    this.m_shape = new primitives.common.Connector(this.m_graphics)
};
primitives.connector.Controller.prototype._cleanLayout = function() {
    null !== this.m_graphics && this.m_graphics.clean();
    this.m_graphics = null;
    this.element.find("." + this.widgetEventPrefix).remove()
};
primitives.connector.Controller.prototype._updateLayout = function() {
    this.m_panelSize = new primitives.common.Rect(0, 0, this.element.innerWidth(), this.element.innerHeight());
    this.m_placeholder.css(this.m_panelSize.getCSS())
};
primitives.connector.Controller.prototype.update = function(a) {
    a ? (this._cleanLayout(), this._createLayout(), this._redraw()) : (this._updateLayout(), this.m_graphics.resize("placeholder", this.m_panelSize.width, this.m_panelSize.height), this.m_graphics.begin(), this._redraw(), this.m_graphics.end())
};
primitives.connector.Controller.prototype._createLabelTemplate = function() {
    var a = jQuery("<div></div>");
    a.addClass("bp-item bp-corner-all bp-connector-label");
    this._labelTemplate = a.wrap("<div>").parent().html();
    this._labelTemplateHashCode = primitives.common.hashCode(this._labelTemplate)
};
primitives.connector.Controller.prototype._onAnnotationLabelTemplateRender = function(a, b) {
    b.element.html(this.options.label)
};
primitives.connector.Controller.prototype._redraw = function() {
    var a = "orientationType connectorShapeType offset lineWidth color lineType labelSize".split(" "),
        b, c;
    this.m_graphics.activate("placeholder");
    for (b = 0; b < a.length; b += 1) c = a[b], null != this.options[c] && (this.m_shape[c] = this.options[c]);
    this.m_shape.hasLabel = !primitives.common.isNullOrEmpty(this.options.label);
    this.m_shape.labelPlacementType = this.options.labelPlacementType;
    this.m_shape.labelTemplate = this._labelTemplate;
    this.m_shape.labelTemplateHashCode =
        this._labelTemplateHashCode;
    this.m_shape.panelSize = new primitives.common.Size(this.m_panelSize.width, this.m_panelSize.height);
    this.m_shape.draw(this.options.fromRectangle, this.options.toRectangle)
};
primitives.connector.Controller.prototype._setOption = function(a, b) {
    jQuery.Widget.prototype._setOption.apply(this, arguments);
    switch (a) {
        case "disabled":
            var c = jQuery([]);
            b ? (c.filter(".ui-state-focus").blur(), c.removeClass("ui-state-hover"), c.propAttr("disabled", !0), this.element.addClass("ui-disabled")) : (c.propAttr("disabled", !1), this.element.removeClass("ui-disabled"))
    }
};
(function(a) {
    a.widget("ui.bpConnector", new primitives.connector.Controller)
})(jQuery);
primitives.famdiagram.EventArgs = function() {
    this.context = this.oldContext = null;
    this.parentItems = [];
    this.name = this.position = null;
    this.cancel = !1
};
primitives.famdiagram.TemplateConfig = function() {
    this.name = null;
    this.isActive = !0;
    this.itemSize = new primitives.common.Size(120, 100);
    this.itemBorderWidth = 1;
    this.itemTemplate = null;
    this.minimizedItemSize = new primitives.common.Size(4, 4);
    this.minimizedItemCornerRadius = null;
    this.highlightPadding = new primitives.common.Thickness(2, 2, 2, 2);
    this.highlightBorderWidth = 1;
    this.highlightTemplate = null;
    this.cursorPadding = new primitives.common.Thickness(3, 3, 3, 3);
    this.cursorBorderWidth = 2;
    this.buttons = this.cursorTemplate =
        null
};
primitives.famdiagram.BackgroundAnnotationConfig = function(a) {
    var b;
    this.annotationType = 4;
    this.items = [];
    this.zOrderType = 0;
    this.lineWidth = 2;
    this.opacity = 1;
    this.fillColor = this.borderColor = null;
    this.lineType = 0;
    this.selectItems = !1;
    switch (arguments.length) {
        case 1:
            if (null !== a)
                if (a instanceof Array) this.items = a;
                else if ("object" == typeof a)
                for (b in a) a.hasOwnProperty(b) && (this[b] = a[b])
    }
};
primitives.famdiagram.ButtonConfig = function(a, b, c) {
    this.name = a;
    this.icon = b;
    this.text = !1;
    this.label = null;
    this.tooltip = c;
    this.size = new primitives.common.Size(16, 16)
};
primitives.famdiagram.Config = function(a) {
    this.name = void 0 !== a ? a : "FamDiagram";
    this.classPrefix = "famdiagram";
    this.graphicsType = 0;
    this.actualGraphicsType = null;
    this.pageFitMode = 3;
    this.minimalVisibility = 2;
    this.orientationType = 0;
    this.verticalAlignment = 1;
    this.arrowsDirection = 0;
    this.elbowType = 3;
    this.elbowDotSize = 4;
    this.emptyDiagramMessage = "Diagram is empty.";
    this.items = [];
    this.annotations = [];
    this.highligtItem = this.cursorItem = null;
    this.selectedItems = [];
    this.hasSelectorCheckbox = 0;
    this.selectCheckBoxLabel = "Selected";
    this.selectionPathMode = 1;
    this.templates = [];
    this.defaulLabelAnnotationTemplate = this.defaultTemplateName = null;
    this.hasButtons = 0;
    this.buttons = [];
    this.onCursorRender = this.onHighlightRender = this.onItemRender = this.onMouseClick = this.onButtonClick = this.onSelectionChanged = this.onSelectionChanging = this.onCursorChanged = this.onCursorChanging = this.onHighlightChanged = this.onHighlightChanging = null;
    this.dotLevelShift = this.normalLevelShift = 20;
    this.normalItemsInterval = this.lineLevelShift = 10;
    this.dotItemsInterval = 1;
    this.lineItemsInterval = 2;
    this.cousinsIntervalMultiplier = 5;
    this.itemTitleFirstFontColor = "#ffffff";
    this.itemTitleSecondFontColor = "#000080";
    this.linesColor = "#c0c0c0";
    this.linesWidth = 1;
    this.linesType = 0;
    this.linesPalette = [];
    this.showCallout = !0;
    this.defaultCalloutTemplateName = null;
    this.calloutfillColor = "#000000";
    this.calloutBorderColor = null;
    this.calloutCornerRadius = this.calloutOffset = 4;
    this.calloutPointerWidth = "10%";
    this.calloutLineWidth = 1;
    this.calloutOpacity = 0.2;
    this.buttonsPanelSize = 28;
    this.checkBoxPanelSize =
        this.groupTitlePanelSize = 24;
    this.distance = 3;
    this.minimumScale = 0.5;
    this.maximumScale = 1;
    this.showLabels = 0;
    this.labelSize = new primitives.common.Size(80, 24);
    this.labelOffset = 1;
    this.labelOrientation = 0;
    this.labelPlacement = 1;
    this.labelFontSize = "10px";
    this.labelFontFamily = "Arial";
    this.labelColor = "#000000";
    this.labelFontStyle = this.labelFontWeight = "normal";
    this.enablePanning = !0;
    this.printPreviewPageSize = new primitives.common.Size(612, 792)
};
primitives.famdiagram.ConnectorAnnotationConfig = function(a, b) {
    var c;
    this.annotationType = 0;
    this.zOrderType = 2;
    this.toItem = this.fromItem = null;
    this.connectorShapeType = 0;
    this.labelPlacementType = primitives.common.ConnectorLabelPlacementType.Between;
    this.offset = new primitives.common.Thickness(0, 0, 0, 0);
    this.lineWidth = 2;
    this.color = "#000000";
    this.lineType = 0;
    this.selectItems = !0;
    this.label = null;
    this.labelSize = new primitives.common.Size(60, 30);
    switch (arguments.length) {
        case 1:
            for (c in a) a.hasOwnProperty(c) && (this[c] =
                a[c]);
            break;
        case 2:
            this.fromItem = a, this.toItem = b
    }
};
primitives.famdiagram.HighlightPathAnnotationConfig = function(a) {
    var b;
    this.annotationType = 2;
    this.items = [];
    this.selectItems = !1;
    switch (arguments.length) {
        case 1:
            if (null !== a)
                if (a instanceof Array) this.items = a;
                else if ("object" == typeof a)
                for (b in a) a.hasOwnProperty(b) && (this[b] = a[b])
    }
};
primitives.famdiagram.ItemConfig = function(a, b, c, d, e) {
    var f;
    this.id = null;
    this.parents = [];
    this.spouses = [];
    this.context = this.image = this.description = this.title = null;
    this.itemTitleColor = "#4169e1";
    this.groupTitle = null;
    this.groupTitleColor = "#4169e1";
    this.isActive = !0;
    this.hasButtons = this.hasSelectorCheckbox = 0;
    this.templateName = null;
    this.showCallout = 0;
    this.label = this.calloutTemplateName = null;
    this.showLabel = 0;
    this.labelSize = null;
    this.labelOrientation = 3;
    this.labelPlacement = 0;
    switch (arguments.length) {
        case 1:
            for (f in a) a.hasOwnProperty(f) &&
                (this[f] = a[f]);
            break;
        case 5:
            this.id = a, this.parent = b, this.title = c, this.description = d, this.image = e
    }
};
primitives.famdiagram.LabelAnnotationConfig = function(a, b) {
    var c;
    this.annotationType = 3;
    this.fromItem = null;
    this.toItems = [];
    this.title = null;
    this.itemTitleColor = "#4169e1";
    this.templateName = null;
    switch (arguments.length) {
        case 1:
            for (c in a) a.hasOwnProperty(c) && (this[c] = a[c]);
            break;
        case 2:
            this.fromItem = a, this.toItem = b
    }
};
primitives.famdiagram.PaletteItemConfig = function(a, b, c) {
    var d;
    this.lineColor = "#c0c0c0";
    this.lineWidth = 1;
    this.lineType = 0;
    switch (arguments.length) {
        case 1:
            for (d in a) a.hasOwnProperty(d) && (this[d] = a[d]);
            break;
        case 3:
            this.lineColor = a, this.lineWidth = b, this.lineType = c
    }
};
primitives.famdiagram.ShapeAnnotationConfig = function(a) {
    var b;
    this.annotationType = 1;
    this.zOrderType = 0;
    this.items = [];
    this.shapeType = 0;
    this.offset = new primitives.common.Thickness(0, 0, 0, 0);
    this.lineWidth = 2;
    this.cornerRadius = "10%";
    this.opacity = 1;
    this.fillColor = this.borderColor = null;
    this.lineType = 0;
    this.selectItems = !1;
    this.label = null;
    this.labelSize = new primitives.common.Size(60, 30);
    this.labelPlacement = 0;
    this.labelOffset = 4;
    switch (arguments.length) {
        case 1:
            if (null !== a)
                if (a instanceof Array) this.items = a;
                else if ("object" ==
                typeof a)
                for (b in a) a.hasOwnProperty(b) && (this[b] = a[b])
    }
};
primitives.famdiagram.Controller = function() {
    this.widgetEventPrefix = "famdiagram";
    this.parent = primitives.orgdiagram.BaseController.prototype;
    this.parent.constructor.apply(this, arguments);
    this.options = new primitives.famdiagram.Config;
    this.options.childrenPlacementType = 2;
    this.options.leavesPlacementType = 2;
    this.options.horizontalAlignment = 0;
    this.options.connectorType = 0;
    this.options.maximumColumnsInMatrix = 6;
    this.options.highlightLinesColor = "#ff0000";
    this.options.highlightLinesWidth = 1;
    this.options.highlightLinesType =
        0;
    this._defaultLabelAnnotationTemplateName = null
};
primitives.famdiagram.Controller.prototype = new primitives.orgdiagram.BaseController;
primitives.famdiagram.Controller.prototype._virtualBind = function() {
    var a = this;
    this.parent._virtualBind.apply(this, arguments);
    this.options.onLabelAnnotationTemplateRender = function(b, c) {
        a._onDefaulLabelAnnotationTemplateRender(b, c)
    }
};
primitives.famdiagram.Controller.prototype._virtualUnbind = function() {
    this.parent._virtualUnbind.apply(this, arguments);
    this.options.onLabelAnnotationTemplateRender = null
};
primitives.famdiagram.Controller.prototype._virtualGetEventArgs = function(a, b, c) {
    var d = new primitives.famdiagram.EventArgs,
        e, f;
    null != a && (a.itemConfig && null != a.itemConfig.id) && (d.oldContext = this._treeItemConfigs[a.itemConfig.id]);
    if (null != b && b.itemConfig && null != b.itemConfig.id) {
        d.context = this._treeItemConfigs[b.itemConfig.id];
        if (null != b.itemConfig.parents) {
            a = 0;
            for (e = b.itemConfig.parents.length; a < e; a += 1) f = this._treeItemConfigs[b.itemConfig.parents[a]], null != f && d.parentItems.push(f)
        }
        e = this.m_placeholder.offset();
        a = this.element.offset();
        d.position = (new primitives.common.Rect(b.actualPosition)).translate(e.left, e.top).translate(-a.left, -a.top)
    }
    null != c && (d.name = c);
    return d
};
primitives.famdiagram.Controller.prototype._virtualReadTemplates = function() {
    var a = new primitives.orgdiagram.TemplateConfig;
    this.parent._virtualReadTemplates.apply(this, arguments);
    a = new primitives.orgdiagram.Template({
        name: this.widgetEventPrefix + "DefaultLabelAnnotationTemplate",
        itemTemplate: this._getDefaultLabelAnnotationTemplate(),
        itemSize: new primitives.common.Size(100, 20)
    }, a);
    a.itemTemplateRenderName = "onLabelAnnotationTemplateRender";
    a.createDefaultTemplates();
    this._templates[a.name] = a
};
primitives.famdiagram.Controller.prototype._onDefaulLabelAnnotationTemplateRender = function(a, b) {
    b.element.text(b.context.title)
};
primitives.famdiagram.Controller.prototype._getDefaultLabelAnnotationTemplate = function() {
    var a = jQuery('<div class="bp-label-annotation"></div>');
    a.addClass("bp-item");
    return a.wrap("<div>").parent().html()
};
primitives.famdiagram.Controller.prototype._virtualCreateOrgTree = function() {
    var a, b, c, d, e, f, g, h = {},
        i, j, k, l = [],
        m, n, p, q, r = this,
        t, v, s, w, u, x;
    this._defaultLabelAnnotationTemplateName = this.widgetEventPrefix + "DefaultLabelAnnotationTemplate";
    primitives.common.isNullOrEmpty(this.options.defaulLabelAnnotationTemplate) || (this._defaultLabelAnnotationTemplateName = this.options.defaulLabelAnnotationTemplate);
    this.showElbowDots = this.showInvisibleSubTrees = !0;
    this._treeItemConfigs = {};
    this._famItems = {};
    this._famItemsNonExtracted = {};
    this.itemByChildrenKey = {};
    this._orgPartners = {};
    this._families = [];
    this._orgItems = {};
    this._orgItemChildren = {};
    this._orgItemRoot = null;
    this.maximumFamItemId = 0;
    this.maximumLevel = this.minimumLevel = null;
    if (0 < this.options.items.length) {
        a = 0;
        for (b = this.options.items.length; a < b; a += 1) c = this.options.items[a], null != c && (this._treeItemConfigs[c.id] = c, d = new primitives.famdiagram.FamilyItem({
                id: c.id,
                itemConfig: c,
                isActive: c.hasOwnProperty("isActive") ? c.isActive : !0
            }), this._famItems[d.id] = d, c = parseInt(c.id, 10), this.maximumFamItemId =
            Math.max(isNaN(c) ? 0 : c, this.maximumFamItemId));
        l = {};
        p = {};
        v = [];
        for (m in this._famItems)
            if (this._famItems.hasOwnProperty(m)) {
                d = this._famItems[m];
                q = {};
                f = d.itemConfig.parents;
                if (null != f) {
                    a = 0;
                    for (b = f.length; a < b; a += 1) k = f[a], this._famItems.hasOwnProperty(k) && (k != d.id && !q.hasOwnProperty(k)) && (q[k] = !0, e = this._famItems[k], e.children.push(d.id), e.logicalChildren.push(d.id), d.logicalParents.push(k), d.parents.push(k), l.hasOwnProperty(k) || (l[k] = {}), l[k][m] = k, p.hasOwnProperty(m) || (p[m] = {}), p[m][k] = m)
                }
                e = d.itemConfig.spouses;
                null != e && 0 < e.length && v.push(d)
            }
        a = 0;
        for (b = v.length; a < b; a += 1) {
            s = v[a];
            q = {};
            q[s.id] = !0;
            w = [s.id];
            e = s.itemConfig.spouses;
            c = 0;
            for (d = e.length; c < d; c += 1) f = e[c], this._famItems.hasOwnProperty(f) && !q.hasOwnProperty(f) && (q[f] = !0, w.push(f));
            u = !1;
            e = 0;
            for (f = s.logicalChildren.length; e < f; e += 1)
                if (c = this._famItems[s.logicalChildren[e]], c.logicalParents.length == w.length) {
                    x = !0;
                    d = 0;
                    for (g = c.logicalParents.length; d < g; d += 1)
                        if (!q.hasOwnProperty(c.logicalParents[d])) {
                            x = !1;
                            break
                        }
                    if (x) {
                        u = !0;
                        break
                    }
                }
            if (!u) {
                this.maximumFamItemId +=
                    1;
                q = new primitives.famdiagram.FamilyItem({
                    id: this.maximumFamItemId,
                    isVisible: !1,
                    isActive: !1,
                    hideParentConnection: !0,
                    hideChildrenConnection: !0
                });
                this._famItems[q.id] = q;
                c = 0;
                for (d = w.length; c < d; c += 1) f = w[c], e = this._famItems[f], e.logicalChildren.push(q.id), e.children.push(q.id), q.logicalParents.push(e.id), q.parents.push(e.id), l.hasOwnProperty(e.id) || (l[e.id] = {}), l[e.id][q.id] = e.id, p.hasOwnProperty(q.id) || (p[q.id] = {}), p[q.id][e.id] = q.id
            }
        }
        this._sortItemsBylevelsTopo(this._famItems);
        for (n in this._famItems) this._famItems.hasOwnProperty(n) &&
            (d = this._famItems[n], d.logicalChildren.sort(function(a, b) {
                return r._famItems[a].level - r._famItems[b].level
            }), d.logicalParents.sort(function(a, b) {
                return r._famItems[b].level - r._famItems[a].level
            }));
        for (n in this._famItems) this._famItems.hasOwnProperty(n) && (this._famItems[n].level = null);
        this._sortItemsBylevelsSmart(this._famItems);
        if (0 < this.options.annotations.length) {
            for (n in this._famItems) this._famItems.hasOwnProperty(n) && (d = this._famItems[n], d.logicalChildren.length = 0, d.logicalParents.length = 0,
                d.children.length = 0, d.parents.length = 0);
            c = {};
            a = 0;
            for (b = this.options.annotations.length; a < b; a += 1) t = this.options.annotations[a], 3 == t.annotationType && (c.hasOwnProperty(t.fromItem) ? c[t.fromItem].push(t) : c[t.fromItem] = [t]);
            for (i in c)
                if (c.hasOwnProperty(i)) {
                    b = c[i];
                    b.sort(function(a, b) {
                        return b.toItems.length - a.toItems.length
                    });
                    for (a = 0; a < b.length; a += 1) t = b[a], this._addLabelAnnotation(l, t.fromItem, t.toItems, function() {
                        var a = null;
                        r.maximumFamItemId += 1;
                        a = new primitives.famdiagram.FamilyItem({
                            id: r.maximumFamItemId,
                            isVisible: !0,
                            isActive: !1,
                            itemConfig: t,
                            levelGravity: 1
                        });
                        r._famItems[a.id] = a;
                        return a.id
                    }), this._addLabelAnnotation(p, t.fromItem, t.toItems, function() {
                        var a = null;
                        r.maximumFamItemId += 1;
                        a = new primitives.famdiagram.FamilyItem({
                            id: r.maximumFamItemId,
                            isVisible: !0,
                            isActive: !1,
                            itemConfig: t,
                            levelGravity: 2
                        });
                        r._famItems[a.id] = a;
                        return a.id
                    })
                }
            for (m in this._famItems)
                if (this._famItems.hasOwnProperty(m)) {
                    d = this._famItems[m];
                    i = l[d.id];
                    if (null != i)
                        for (j in i) i.hasOwnProperty(j) && (e = d, i[j] != d.id && (e = this._famItems[i[j]]),
                            c = this._famItems[j], p.hasOwnProperty(j) && p[j].hasOwnProperty(d.id) && p[j][d.id] != j && (c = this._famItems[p[j][d.id]]), e.logicalChildren.push(c.id), c.logicalParents.push(e.id), e.children.push(c.id), c.parents.push(e.id));
                    f = p[d.id];
                    if (null != f)
                        for (k in f) f.hasOwnProperty(k) && (e = this._famItems[k], c = d, f[k] == d.id && !l.hasOwnProperty(k) && (e.logicalChildren.push(c.id), c.logicalParents.push(e.id), e.children.push(c.id), c.parents.push(e.id)))
                }
        }
        a = {};
        for (n in this._famItems) this._famItems.hasOwnProperty(n) && (a[n] = this._famItems[n].logicalChildren.slice(0));
        a = primitives.common.optimizeReferences(a, function() {
            var a;
            r.maximumFamItemId += 1;
            a = new primitives.famdiagram.FamilyItem({
                id: r.maximumFamItemId,
                isVisible: !1,
                isActive: !1,
                levelGravity: 2
            });
            r._famItems[a.id] = a;
            return a.id
        });
        for (n in a) a.hasOwnProperty(n) && (i = a[n], r._famItems[n].logicalChildren = i);
        this._eliminateManyToMany(this._famItems, function() {
            r.maximumFamItemId += 1;
            return new primitives.famdiagram.FamilyItem({
                id: r.maximumFamItemId,
                isVisible: !1,
                isActive: !1,
                itemConfig: new primitives.famdiagram.ItemConfig({
                    id: r.maximumFamItemId
                }),
                levelGravity: 2
            })
        });
        this._resortItemsBylevels(this._famItems);
        this._fillInItems(this._famItems, function() {
            r.maximumFamItemId += 1;
            return new primitives.famdiagram.FamilyItem({
                id: r.maximumFamItemId,
                levelGravity: 2,
                isVisible: !1,
                isActive: !1
            })
        });
        this._setLogicalParents(this._famItems);
        if (this._debug)
            for (n in this._famItems)
                if (this._famItems.hasOwnProperty(n)) {
                    d = this._famItems[n];
                    i = d.logicalChildren;
                    for (a = 0; a < i.length; a += 1) {
                        b = i[a];
                        b = this._famItems[b];
                        if (0 > b.logicalParents.indexOf(n)) throw "Family tree is broken. Logical child does not reference logical parent.";
                        if (null === b.level || null === d.level || b.level != d.level + 1) throw "Family tree is broken. Children/Parents or levels mismatch!";
                    }
                }
        this._famItemsNonExtracted = {};
        for (n in this._famItems) this._famItems.hasOwnProperty(n) && (this._famItemsNonExtracted[n] = this._famItems[n]);
        this.properties = "title description image itemTitleColor groupTitle groupTitleColor isActive hasSelectorCheckbox hasButtons templateName showCallout calloutTemplateName label showLabel labelSize labelOrientation labelPlacement".split(" ");
        this.defaultItemConfig =
            new primitives.famdiagram.ItemConfig;
        a = null;
        for (b = 0; null != (a = this._findLargestRoot());) n = new primitives.famdiagram.Family(b), this._extractOrgChart(n, this._famItems[a]), this._families.push(n), b += 1;
        l = [];
        m = {};
        if (0 < this._families.length) {
            a = 0;
            for (b = this._families.length; a < b; a += 1) {
                n = this._families[a];
                c = 0;
                for (d = n.links.length; c < d; c += 1) i = n.links[c], j = this._famItems[i.fromItem].familyId, k = this._famItems[i.toItem].familyId, j != k && (h.hasOwnProperty(j) || (h[j] = {}), h[j].hasOwnProperty(k) || (h[j][k] = 0), h[j][k] += 1,
                    h.hasOwnProperty(k) || (h[k] = {}), h[k].hasOwnProperty(j) || (h[k][j] = 0), h[k][j] += 1), this._families[k].backLinks.push(new primitives.famdiagram.FamLink(i.toItem, i.fromItem))
            }
            for (; l.length < this._families.length;) {
                a = 0;
                for (b = this._families.length; a < b; a += 1)
                    if (n = this._families[a], !m.hasOwnProperty(n.id))
                        if (j = primitives.common.getGraphSpanningTree(h, n.id, function(a, b) {
                                return a - b
                            }), j.hasOwnProperty(n.id)) {
                            this._countNumberOfSubFamilies(n.id, j);
                            l.push(n.id);
                            m[n.id] = !0;
                            i = j[n.id];
                            c = 0;
                            for (d = i.length; c < d; c += 1) {
                                n = this._getFamilyAndItsSubFamilies(i[c],
                                    j);
                                e = 0;
                                for (f = n.length; e < f; e += 1) k = n[e], l.push(k), m[k] = !0
                            }
                        } else l.push(n.id), m[n.id] = !0
            }
        }
        this.maximumFamItemId += 1;
        this._orgItemRoot = this._createOrgItem(this.maximumFamItemId, null, null, this.minimumLevel - 1, null);
        this._orgItemRoot.hideParentConnection = !0;
        this._orgItemRoot.hideChildrenConnection = !0;
        this._orgItemRoot.title = "internal root";
        this._orgItemRoot.isVisible = !1;
        this._orgItemRoot.isActive = !1;
        m = {};
        a = 0;
        for (b = l.length; a < b; a += 1) {
            n = this._families[l[a]];
            j = {};
            k = this._orgItemRoot;
            d = 0;
            h = n.links.concat(n.backLinks);
            for (c = 0; c < h.length; c += 1)
                if (i = h[c], p = this._orgItems[i.toItem], i = this._orgItems[i.fromItem], !0 == m[p.familyId]) {
                    for (i = n.items[0]; p.level >= i.level;) p = this._orgItems[p.parent];
                    j[p.id] = j.hasOwnProperty(p.id) ? j[p.id] + 1 : 1;
                    d < j[p.id] && (k = p, d = j[p.id])
                }
            this._attachFamilyToOrgChart(k, n);
            m[n.id] = !0
        }
        a = this._getExtraGravity();
        b = this._getGrandChildren();
        this._balanceChildrenForItem(a, b, this._orgItemRoot)
    }
};
primitives.famdiagram.Controller.prototype._addLabelAnnotation = function(a, b, c, d) {
    var e, f, g, h;
    if (a.hasOwnProperty(b)) {
        b = a[b];
        e = !0;
        f = null;
        for (h = 0; h < c.length; h += 1)
            if (g = c[h], b.hasOwnProperty(g))
                if (null == f) f = b[g];
                else {
                    if (f != b[g]) {
                        e = !1;
                        break
                    }
                } else {
            e = !1;
            break
        }
        if (e) {
            d = d();
            a.hasOwnProperty(f) || (a[f] = {});
            a[f][d] = f;
            for (h = 0; h < c.length; h += 1) g = c[h], b[g] = d
        }
    }
};
primitives.famdiagram.Controller.prototype._getGrandChildren = function() {
    var a, b, c = {},
        d, e, f, g = {};
    for (a in this._orgItems) this._orgItems.hasOwnProperty(a) && (b = this._orgItems[a], c.hasOwnProperty(b.level) || (c[b.level] = [], this.minimumLevel = null != this.minimumLevel ? Math.min(this.minimumLevel, b.level) : b.level, this.maximumLevel = null != this.maximumLevel ? Math.max(this.maximumLevel, b.level) : b.level), c[b.level].push(b));
    for (f = this.maximumLevel; f >= this.minimumLevel; f -= 1)
        if (a = c[f], null != a) {
            d = 0;
            for (e = a.length; d < e; d +=
                1) b = a[d], this._sumGrandChildren(g, b)
        }
    return g
};
primitives.famdiagram.Controller.prototype._sumGrandChildren = function(a, b) {
    var c = b.parent,
        d, e;
    if (null != c && (a[c] || (a[c] = {}), d = b.level - 1, a[c][d] = a[c][d] ? a[c][d] + 1 : 1, e = b.id, null != a[e]))
        for (d in a[e]) a[e].hasOwnProperty(d) && (a[c][d] = a[c][d] ? a[c][d] + a[e][d] : a[e][d])
};
primitives.famdiagram.Controller.prototype._balanceChildrenForItem = function(a, b, c) {
    var d, e, f, g, h, i, j, k, l, m, n, p = [c],
        q, r = [],
        t, v, s, w, u;
    for (c.childIndex = 0; 0 < p.length;) {
        c = 0;
        for (j = p.length; c < j; c += 1)
            if (q = p[c], d = {}, e = {}, this._orgItemChildren.hasOwnProperty(q.id)) {
                v = this._orgItemChildren[q.id];
                l = null;
                t = [];
                if (0 < v.length) {
                    f = 0;
                    for (g = v.length; f < g; f += 1) {
                        k = v[f];
                        null == l && (l = k);
                        e[k.id] = {};
                        if (a.hasOwnProperty(k.id))
                            for (w in n = a[k.id], n)
                                if (n.hasOwnProperty(w)) {
                                    u = n[w];
                                    e[k.id][w] = {};
                                    h = 0;
                                    for (i = u.length; h < i; h += 1) m = u[h],
                                        m = m.commonParent == q.id ? m.toParent : this._orgItems[m.fromParent].childIndex < this._orgItems[m.toParent].childIndex ? "__right__" : "__left__", k.id != m && (d.hasOwnProperty(k.id) || (d[k.id] = {}), d[k.id].hasOwnProperty(m) || (d[k.id][m] = 0), d[k.id][m] += 1, null == e[k.id][w][m] && (e[k.id][w][m] = 0), e[k.id][w][m] += 1)
                                }
                        0 < f && (d.hasOwnProperty(l.id) || (d[l.id] = {}), d[l.id].hasOwnProperty(k.id) || (d[l.id][k.id] = 0), d.hasOwnProperty(k.id) || (d[k.id] = {}), d[k.id].hasOwnProperty(l.id) || (d[k.id][l.id] = 0))
                    }
                    if (null != l) {
                        f = 0;
                        l = l.id;
                        for (s in d)
                            if (d.hasOwnProperty(s)) {
                                g =
                                    d[s];
                                h = 0;
                                for (m in g) g.hasOwnProperty(m) && (h += g[m]);
                                h > f && (l = s, f = h)
                            }
                        d = primitives.common.getGraphGrowthSequence(d, l, function(a) {
                            return a
                        });
                        l = this._balanceItems(d, "__left__", "__right__", e, b);
                        e = 0;
                        for (d = l.length; e < d; e += 1) f = this._orgItems[l[e]], f.childIndex = e, t.push(f)
                    }
                    if (this._debug && !primitives.common.compareArrays(this._orgItemChildren[q.id], t, function(a) {
                            return a.id
                        })) throw "Balancing of items is broken! Incoming vs. outgoing arrays of items mismatch.";
                    this._orgItemChildren[q.id] = t
                }
                r = r.concat(v)
            }
        p = r;
        r = []
    }
};
primitives.famdiagram.Controller.prototype._balanceItems = function(a, b, c, d, e) {
    var f = [],
        g, h, i, j, k, l, m, n, p, q, r, t, v, s, w, u, x, z, A, y;
    h = new primitives.famdiagram.Slots;
    h.add(new primitives.famdiagram.Slot(b));
    h.add(new primitives.famdiagram.Slot(null));
    h.add(new primitives.famdiagram.Slot(c));
    i = 0;
    h.loop(function(a) {
        i += 1;
        a.position = i
    });
    for (g = 0; g < a.length; g += 1)
        if (j = a[g], j != b && j != c)
            for (x in p = n = m = l = k = null, h.loop(function(a) {
                    var b, c, f, g;
                    if (null == a.itemId) {
                        s = e[j];
                        v = t = r = q = 0;
                        for (b in a.crossings) a.crossings.hasOwnProperty(b) && (s &&
                            null != s[b] && (q += a.crossings[b] * s[b]), v += a.crossings[b]);
                        for (b in d[j])
                            if (d[j].hasOwnProperty(b))
                                for (c in f = d[j][b], f) f.hasOwnProperty(c) && (g = h.getSlot(c), null != g && (g.position < a.position ? (q += (a.left[b] || 0) - (g.left[b] || 0), t += Math.abs(g.balance + 1)) : (q += (a.right[b] || 0) - (g.right[b] || 0), t += Math.abs(g.balance - 1)), r += Math.abs(g.position - a.position)));
                        if (null == l || l > q || l == q && (m > r || m == r && (n > t || n == t && p > v))) l = q, k = a, m = r, n = t, p = v
                    }
                }), w = k.clone(), u = k.clone(), u.itemId = j, h.insertBefore(k, w), h.insertBefore(k, u), i = u.position =
                0, h.loop(function(a) {
                    var b, c;
                    if (a.id != u.id) {
                        c = e[j];
                        for (b in c) c.hasOwnProperty(b) && (a.left[b] = a.left[b] ? a.left[b] + c[b] : c[b]);
                        i += 1;
                        a.position = i
                    }
                }, u), i = 0, h.backwardLoop(function(a) {
                    var b, c;
                    if (a.id != u.id) {
                        c = e[j];
                        for (b in e[j]) e[j].hasOwnProperty(b) && (a.right[b] = a.right[b] ? a.right[b] + c[b] : c[b]);
                        i -= 1;
                        a.position = i
                    }
                }, u), d[j])
                if (d[j].hasOwnProperty(x))
                    for (A in z = d[j][x], z) z.hasOwnProperty(A) && (y = h.getSlot(A), null != y && (0 > y.position ? (y.balance += 1, u.balance -= 1, h.backwardLoop(function(a) {
                        if (a.id != u.id)
                            if (a.id !=
                                y.id) a.crossings[x] = a.crossings[x] ? a.crossings[x] + z[A] : z[A];
                            else return !0
                    }, u)) : (y.balance -= 1, u.balance += 1, h.loop(function(a) {
                        if (a.id != u.id)
                            if (a.id != y.id) a.crossings[x] = a.crossings[x] ? a.crossings[x] + z[A] : z[A];
                            else return !0
                    }, u))));
    h.loop(function(a) {
        a = a.itemId;
        null != a && (a != b && a != c) && f.push(a)
    });
    return f
};
primitives.famdiagram.Controller.prototype._getExtraGravity = function() {
    var a, b, c = {},
        d, e, f, g;
    for (a in this._orgPartners)
        if (this._orgPartners.hasOwnProperty(a)) {
            b = this._orgItems[a];
            f = this._orgPartners[a];
            d = 0;
            for (e = f.length; d < e; d += 1) g = this._orgItems[f[d]], this._addExtraGravitiesForConnection(c, g, b)
        }
    return c
};
primitives.famdiagram.Controller.prototype._addExtraGravitiesForConnection = function(a, b, c) {
    var d = new primitives.famdiagram.ExtraGravity(b.level),
        e = new primitives.famdiagram.ExtraGravity(c.level);
    this._addExtraGravityForItem(a, b.id, d);
    for (this._addExtraGravityForItem(a, c.id, e); b.parent != c.parent;) {
        if (this._debug && (null == b.parent || null == c.parent)) throw "No common root found. Most likely items belong to different levels!";
        b = this._orgItems[b.parent];
        c = this._orgItems[c.parent];
        this._addExtraGravityForItem(a,
            b.id, d);
        this._addExtraGravityForItem(a, c.id, e)
    }
    d.commonParent = b.parent;
    d.fromParent = b.id;
    d.toParent = c.id;
    e.commonParent = b.parent;
    e.fromParent = c.id;
    e.toParent = b.id
};
primitives.famdiagram.Controller.prototype._addExtraGravityForItem = function(a, b, c) {
    a.hasOwnProperty(b) || (a[b] = {});
    null == a[b][c.level] && (a[b][c.level] = []);
    a[b][c.level].push(c)
};
primitives.famdiagram.Controller.prototype._getFamilyAndItsSubFamilies = function(a, b) {
    var c = [a],
        d = b[a],
        e, f, g;
    if (null != d) {
        e = 0;
        for (f = d.length; e < f; e += 1) g = d[e], c = c.concat(this._getFamilyAndItsSubFamilies(g, b))
    }
    return c
};
primitives.famdiagram.Controller.prototype._countNumberOfSubFamilies = function(a, b) {
    var c = this._families[a],
        d, e, f, g = {},
        h;
    c.familyPriority = 1;
    f = b[a];
    if (null != f) {
        d = 0;
        for (e = f.length; d < e; d += 1) h = f[d], g[h] = this._countNumberOfSubFamilies(h, b), c.familyPriority += g[h];
        f.sort(function(a, b) {
            return g[a] - g[b]
        })
    }
    return c.familyPriority
};
primitives.famdiagram.Controller.prototype._attachFamilyToOrgChart = function(a, b) {
    var c, d = b.items[0],
        e = null,
        e = a;
    for (c = a.level + 1; c < d.level; c += 1) this.maximumFamItemId += 1, e = this._createOrgItem(this.maximumFamItemId, e.id, null, c, null), e.title = "shift", e.isVisible = !1, e.isActive = !1, e.hideParentConnection = !0, e.hideChildrenConnection = !0, b.items.push(e);
    d.parent = e.id;
    d.hideParentConnection = !0;
    this._adoptOrgItem(d)
};
primitives.famdiagram.Controller.prototype._extractOrgChart = function(a, b) {
    var c, d, e = [],
        f, g;
    c = this._createOrgItem(b.id, null, a.id, b.level, b.itemConfig);
    c.hideParentConnection = !0;
    c.isVisible = b.isVisible;
    c.isActive = b.isActive;
    a.items.push(c);
    delete this._famItemsNonExtracted[b.id];
    b.familyId = a.id;
    for (e = this._extractChildren(a, b); 0 < e.length;) {
        f = [];
        c = 0;
        for (d = e.length; c < d; c += 1) g = e[c], f = f.concat(this._extractChildren(a, g));
        e = f
    }
};
primitives.famdiagram.Controller.prototype._extractChildren = function(a, b) {
    var c = [],
        d, e, f, g = {},
        h;
    d = b.logicalChildren.slice(0).sort().toString();
    e = null;
    if (null != this.itemByChildrenKey[d]) {
        e = this.itemByChildrenKey[d];
        null == this._orgPartners[e.id] && (this._orgPartners[e.id] = []);
        this._orgPartners[e.id].push(b.id);
        d = 0;
        for (e = b.logicalChildren.length; d < e; d += 1) f = b.logicalChildren[d], a.links.push(new primitives.famdiagram.FamLink(b.id, f))
    } else {
        "" != d && (this.itemByChildrenKey[d] = b);
        d = 0;
        for (e = b.logicalChildren.length; d <
            e; d += 1) f = b.logicalChildren[d], f = this._famItems[f], h = f.logicalChildren.slice(0).sort(), h = h.toString(), null != g[h] ? (h = this._createOrgItem(f.id, g[h].id, a.id, f.level, f.itemConfig), h.hideParentConnection = f.hideParentConnection, h.hideChildrenConnection = f.hideChildrenConnection, h.isVisible = f.isVisible, h.isActive = f.isActive, h.itemType = 6, a.items.push(h)) : ("" != h && (g[h] = f), h = this._createOrgItem(f.id, b.id, a.id, f.level, f.itemConfig), h.hideParentConnection = f.hideParentConnection, h.hideChildrenConnection = f.hideChildrenConnection,
            h.isVisible = f.isVisible, h.isActive = f.isActive, a.items.push(h), c.push(f)), delete this._famItemsNonExtracted[f.id], f.familyId = a.id
    }
    return c
};
primitives.famdiagram.Controller.prototype._createOrgItem = function(a, b, c, d, e) {
    var f = new primitives.orgdiagram.OrgItem;
    f.id = a;
    f.parent = b;
    f.context = e;
    f.familyId = c;
    f.level = d;
    a = 0;
    for (b = this.properties.length; a < b; a += 1) c = this.properties[a], f[c] = null != e && void 0 !== e[c] ? e[c] : this.defaultItemConfig[c];
    null != e && 3 == e.annotationType && (f.templateName = !primitives.common.isNullOrEmpty(e.templateName) ? e.templateName : this._defaultLabelAnnotationTemplateName, f.hasSelectorCheckbox = 2);
    this._adoptOrgItem(f);
    return f
};
primitives.famdiagram.Controller.prototype._adoptOrgItem = function(a) {
    var b;
    this._orgItems[a.id] = a;
    null != a.parent && (this._orgItemChildren.hasOwnProperty(a.parent) ? (b = this._orgItemChildren[a.parent], b.push(a)) : this._orgItemChildren[a.parent] = [a])
};
primitives.famdiagram.Controller.prototype._findLargestRoot = function() {
    var a = null,
        b, c, d = {},
        e, f, g, h, i, j, k = {},
        l, m, n;
    for (c in this._famItemsNonExtracted) this._famItemsNonExtracted.hasOwnProperty(c) && (b = this._famItemsNonExtracted[c], d.hasOwnProperty(b.level) || (d[b.level] = [], this.minimumLevel = null != this.minimumLevel ? Math.min(this.minimumLevel, b.level) : b.level, this.maximumLevel = null != this.maximumLevel ? Math.max(this.maximumLevel, b.level) : b.level), d[b.level].push(b));
    for (h = this.maximumLevel; h >= this.minimumLevel; h -=
        1)
        if (e = d[h], null != e) {
            f = 0;
            for (g = e.length; f < g; f += 1) {
                b = e[f];
                k.hasOwnProperty(b.id) || (k[b.id] = {});
                k[b.id][b.id] = !0;
                i = 0;
                for (j = b.logicalParents.length; i < j; i += 1)
                    if (n = b.logicalParents[i], this._famItemsNonExtracted.hasOwnProperty(n) && (k.hasOwnProperty(n) || (k[n] = {}), k[n][b.id] = !0, k.hasOwnProperty(b.id)))
                        for (c in l = k[b.id], l) l.hasOwnProperty(c) && (k[n][c] = !0)
            }
        }
    b = 0;
    for (c in k)
        if (k.hasOwnProperty(c)) {
            l = k[c];
            d = 0;
            for (m in l) l.hasOwnProperty(m) && (d += 1);
            d > b && (b = d, a = c)
        }
    return a
};
primitives.famdiagram.Controller.prototype._sortItemsBylevelsSmart = function(a) {
    var b = {},
        c, d;
    for (c in a) a.hasOwnProperty(c) && (d = a[c], null == d.level && (d.level = 0, this._sortItemBylevels(d, a, b)))
};
primitives.famdiagram.Controller.prototype._sortItemBylevels = function(a, b, c) {
    for (var d, e, f, g, h, i = this._getParentEdges(a, c), j = this._getChildrenEdges(a, c); 0 < i.length || 0 < j.length;) {
        g = [];
        h = [];
        a = 0;
        for (d = j.length; a < d; a += 1) e = b[j[a].parent], f = b[j[a].child], null == f.level ? (f.level = this._getMaximumLevel(f.logicalParents, b) + 1, g = g.concat(this._getParentEdges(f, c)), h = h.concat(this._getChildrenEdges(f, c))) : f.level <= e.level && this._shiftChartItem(f, e.level - f.level + 1, b);
        a = 0;
        for (d = i.length; a < d; a += 1) e = b[i[a].parent],
            f = b[i[a].child], null == e.level ? (e.level = this._getMinimumLevel(e.logicalChildren, b) - 1, g = g.concat(this._getParentEdges(e, c)), h = h.concat(this._getChildrenEdges(e, c))) : f.level <= e.level && this._shiftChartItem(f, e.level - f.level + 1, b);
        i = g;
        j = h
    }
};
primitives.famdiagram.Controller.prototype._getParentEdges = function(a, b) {
    var c, d, e, f = [],
        g;
    c = 0;
    for (d = a.logicalParents.length; c < d; c += 1) e = a.logicalParents[c], g = e + "," + a.id, b.hasOwnProperty(g) || (f.push(new primitives.famdiagram.EdgeItem(e, a.id)), b[g] = !0);
    return f
};
primitives.famdiagram.Controller.prototype._getChildrenEdges = function(a, b) {
    var c, d, e, f = [],
        g;
    c = 0;
    for (d = a.logicalChildren.length; c < d; c += 1) e = a.logicalChildren[c], g = a.id + "," + e, b.hasOwnProperty(g) || f.push(new primitives.famdiagram.EdgeItem(a.id, e));
    return f
};
primitives.famdiagram.Controller.prototype._shiftChartItem = function(a, b, c) {
    var d, e;
    a.level += b;
    if (0 < b) {
        b = 0;
        for (d = a.logicalChildren.length; b < d; b += 1) e = c[a.logicalChildren[b]], null != e.level && e.level <= a.level && this._shiftChartItem(e, a.level - e.level + 1, c)
    } else {
        b = 0;
        for (d = a.logicalParents.length; b < d; b += 1) e = c[a.logicalParents[b]], null != e.level && e.level >= a.level && this._shiftChartItem(e, a.level - e.level - 1, c)
    }
};
primitives.famdiagram.Controller.prototype._getMaximumLevel = function(a, b) {
    var c, d, e, f;
    c = 0;
    for (d = a.length; c < d; c += 1) f = b[a[c]], null != f.level && (e = null != e ? Math.max(e, f.level) : f.level);
    return e
};
primitives.famdiagram.Controller.prototype._getMinimumLevel = function(a, b) {
    var c, d, e, f;
    c = 0;
    for (d = a.length; c < d; c += 1) f = b[a[c]], null != f.level && (e = null != e ? Math.min(e, f.level) : f.level);
    return e
};
primitives.famdiagram.Controller.prototype._sortItemsBylevelsTopo = function(a) {
    var b = {},
        c, d, e, f, g, h;
    for (c in a) a.hasOwnProperty(c) && (e = a[c], b[c] = e.logicalChildren);
    b = primitives.common.topologicalSort(b);
    c = 0;
    for (d = b.length; c < d; c += 1) {
        e = b[c];
        e = a[e];
        null == e.level && (e.level = 0);
        f = 0;
        for (g = e.logicalChildren.length; f < g; f += 1) h = e.logicalChildren[f], h = a[h], h.level = null == h.level ? e.level + 1 : Math.max(h.level, e.level + 1)
    }
    for (c = b.length - 1; 0 <= c; c -= 1) {
        e = b[c];
        e = a[e];
        d = null;
        f = 0;
        for (g = e.logicalChildren.length; f < g; f += 1) h =
            e.logicalChildren[f], h = a[h], d = null == d ? h.level - 1 : Math.min(h.level - 1, d);
        e.level = !d ? e.level : d
    }
};
primitives.famdiagram.Controller.prototype._resortItemsBylevels = function(a) {
    var b = [],
        c = null,
        d = null,
        e = {},
        f, g, h;
    for (f in a) a.hasOwnProperty(f) && (g = a[f], e[f] = g.logicalChildren, g.originalLevel = g.level, g.level = null, null != g.originalLevel && (b[g.originalLevel] || (b[g.originalLevel] = {}), b[g.originalLevel][g.id] = g, c = null != c ? Math.min(g.originalLevel, c) : g.originalLevel, d = null != d ? Math.max(g.originalLevel, d) : g.originalLevel));
    for (g = 0; c <= d; c += 1) f = b[c], g = this._setLevelsForItems(f, a, g, c + 1);
    b = primitives.common.topologicalSort(e);
    for (c = b.length - 1; 0 <= c; c -= 1)
        if (g = b[c], g = a[g], 2 == g.levelGravity) {
            d = null;
            e = 0;
            for (f = g.logicalChildren.length; e < f; e += 1) h = g.logicalChildren[e], h = a[h], d = null == d ? h.level - 1 : Math.min(h.level - 1, d);
            g.level = !d ? g.level : d
        }
};
primitives.famdiagram.Controller.prototype._setLevelsForItems = function(a, b, c, d) {
    for (var e = c, f, g, h, i, j, k, l; !primitives.common.isEmptyObject(a);) {
        f = {};
        for (g in a)
            if (a.hasOwnProperty(g)) {
                h = a[g];
                null == h.level && (h.level = c);
                i = 0;
                for (j = h.logicalChildren.length; i < j; i += 1) k = h.logicalChildren[i], l = b[k], null == l.originalLevel ? (l.level = null == l.level ? h.level + 1 : Math.max(l.level, h.level + 1), f[k] = l) : l.originalLevel == d && (e = Math.max(e, h.level + 1))
            }
        a = f
    }
    return e
};
primitives.famdiagram.Controller.prototype._fillInItems = function(a, b) {
    var c = [],
        d, e, f, g, h, i, j, k;
    for (d in a)
        if (a.hasOwnProperty(d)) {
            e = a[d];
            for (f = !0; f;) {
                f = !1;
                h = [];
                i = [];
                j = 0;
                for (k = e.logicalChildren.length; j < k; j += 1) g = a[e.logicalChildren[j]], e.level + 1 < g.level ? i.push(g.id) : h.push(g.id);
                0 < i.length && (g = b(), g.level = e.level + 1, g.logicalChildren = i, h.push(g.id), e.logicalChildren = h, f = !0, e = g, c.push(g))
            }
        }
    for (d = 0; d < c.length; d += 1) g = c[d], a[g.id] = g
};
primitives.famdiagram.Controller.prototype._setLogicalParents = function(a) {
    var b, c, d, e, f;
    for (b in this._famItems) this._famItems.hasOwnProperty(b) && (e = this._famItems[b], e.logicalParents = []);
    for (b in a)
        if (a.hasOwnProperty(b)) {
            e = a[b];
            c = 0;
            for (d = e.logicalChildren.length; c < d; c += 1) f = e.logicalChildren[c], a[f].logicalParents.push(b)
        }
};
primitives.famdiagram.Controller.prototype._eliminateManyToMany = function(a, b) {
    var c = [],
        d = {},
        e, f, g, h, i, j, k;
    for (e in a)
        if (a.hasOwnProperty(e)) {
            j = a[e];
            f = 0;
            for (g = j.logicalChildren.length; f < g; f += 1) h = j.logicalChildren[f], d.hasOwnProperty(h) || (d[h] = []), d[h].push(e)
        }
    for (e in a)
        if (a.hasOwnProperty(e) && (j = a[e], 1 < j.logicalChildren.length)) {
            k = [];
            f = 0;
            for (g = j.logicalChildren.length; f < g; f += 1) h = j.logicalChildren[f], 1 < d[h].length ? (i = b(), i.logicalChildren = [h], k.push(i.id), c.push(i)) : k.push(h);
            j.logicalChildren = k
        }
    for (d =
        0; d < c.length; d += 1) i = c[d], a[i.id] = i
};
primitives.famdiagram.Controller.prototype._virtualShowCursorNeighbours = function() {
    var a, b, c, d, e, f, g;
    if (null !== this._cursorTreeItem && (0 === this._cursorTreeItem.visibility && (this._cursorTreeItem.visibility = 1), null != this._cursorTreeItem.itemConfig)) {
        e = this._famItems[this._cursorTreeItem.itemConfig.id];
        f = [];
        for (b = e.children.slice(0); 0 < b.length;) {
            f = f.concat(b);
            d = [];
            for (a = 0; a < b.length; a += 1) c = this._famItems[b[a]], g = this._orgItems[b[a]], g.isActive || (d = d.concat(c.children)), f = f.concat(c.parents);
            b = d
        }
        for (b =
            e.parents.slice(0); 0 < b.length;) {
            f = f.concat(b);
            d = [];
            for (a = 0; a < b.length; a += 1) c = this._famItems[b[a]], g = this._orgItems[b[a]], g.isActive || (d = d.concat(c.parents)), f = f.concat(c.children);
            b = d
        }
        for (a = 0; a < f.length; a += 1) b = this._treeItemsByUserId[f[a]], 0 === b.visibility && (b.visibility = 1)
    }
};
primitives.famdiagram.EdgeItem = function(a, b) {
    this.child = this.parent = null;
    switch (arguments.length) {
        case 2:
            this.parent = a, this.child = b
    }
};
primitives.famdiagram.EdgeItem.prototype.toString = function() {
    return this.parent + "," + this.child
};
primitives.famdiagram.ExtraGravity = function(a) {
    this.toParent = this.fromParent = this.commonParent = null;
    this.level = a
};
primitives.famdiagram.Family = function(a) {
    this.familyPriority = this.id = null;
    this.items = [];
    this.links = [];
    this.backLinks = [];
    1 == arguments.length && (this.id = a)
};
primitives.famdiagram.FamilyItem = function(a) {
    var b;
    this.itemConfig = this.familyId = this.id = null;
    this.isActive = this.isVisible = !0;
    this.parents = [];
    this.children = [];
    this.logicalChildren = [];
    this.logicalParents = [];
    this.level = null;
    this.levelGravity = 0;
    this.hideChildrenConnection = this.hideParentConnection = !1;
    switch (arguments.length) {
        case 1:
            for (b in a) a.hasOwnProperty(b) && (this[b] = a[b])
    }
};
primitives.famdiagram.FamLink = function(a, b) {
    this.fromItem = a;
    this.toItem = b
};
primitives.famdiagram.Slot = function(a) {
    this.position = this.next = this.prev = this.id = null;
    this.balance = 0;
    this.itemId = a;
    this.left = {};
    this.right = {};
    this.crossings = {}
};
primitives.famdiagram.Slot.prototype.clone = function() {
    var a = new primitives.famdiagram.Slot,
        b;
    a.itemId = this.itemId;
    for (b in this.left) this.left.hasOwnProperty(b) && (a.left[b] = this.left[b]);
    for (b in this.right) this.right.hasOwnProperty(b) && (a.right[b] = this.right[b]);
    for (b in this.crossings) this.crossings.hasOwnProperty(b) && (a.crossings[b] = this.crossings[b]);
    return a
};
primitives.famdiagram.Slots = function() {
    this.last = this.first = null;
    this.slots = {};
    this.items = {};
    this.counter = 0
};
primitives.famdiagram.Slots.prototype.add = function(a) {
    a.id = this.counter;
    this.counter += 1;
    this.slots[a.id] = a;
    null != a.itemId && (this.items[a.itemId] = a);
    null == this.last ? this.first = this.last = a.id : (this.slots[this.last].next = a.id, a.prev = this.last, this.last = a.id)
};
primitives.famdiagram.Slots.prototype.insertBefore = function(a, b) {
    b.id = this.counter;
    this.counter += 1;
    this.slots[b.id] = b;
    null != b.itemId && (this.items[b.itemId] = b);
    if (null == a.prev) b.next = a.id, this.first = b.id;
    else {
        var c = this.slots[a.prev];
        c.next = b.id;
        b.next = a.id;
        a.prev = b.id;
        b.prev = c.id
    }
};
primitives.famdiagram.Slots.prototype.loop = function(a, b) {
    for (var c = null != b ? b.id : this.first; null != c;) {
        c = this.slots[c];
        if (a(c)) break;
        c = c.next
    }
};
primitives.famdiagram.Slots.prototype.backwardLoop = function(a, b) {
    for (var c = null != b ? b.id : this.last; null != c;) {
        c = this.slots[c];
        if (a(c)) break;
        c = c.prev
    }
};
primitives.famdiagram.Slots.prototype.getSlot = function(a) {
    return this.items[a]
};
(function(a) {
    a.widget("ui.famDiagram", jQuery.ui.mouse2, new primitives.famdiagram.Controller)
})(jQuery);
primitives.orgdiagram.EventArgs = function() {
    this.name = this.position = this.parentItem = this.context = this.oldContext = null;
    this.cancel = !1
};
primitives.orgdiagram.TemplateConfig = function() {
    this.name = null;
    this.isActive = !0;
    this.itemSize = new primitives.common.Size(120, 100);
    this.itemBorderWidth = 1;
    this.itemTemplate = null;
    this.minimizedItemSize = new primitives.common.Size(4, 4);
    this.minimizedItemCornerRadius = null;
    this.highlightPadding = new primitives.common.Thickness(2, 2, 2, 2);
    this.highlightBorderWidth = 1;
    this.highlightTemplate = null;
    this.cursorPadding = new primitives.common.Thickness(3, 3, 3, 3);
    this.cursorBorderWidth = 2;
    this.buttons = this.cursorTemplate =
        null
};
primitives.orgdiagram.BackgroundAnnotationConfig = function(a) {
    var b;
    this.annotationType = 4;
    this.items = [];
    this.includeChildren = !1;
    this.zOrderType = 0;
    this.lineWidth = 2;
    this.opacity = 1;
    this.fillColor = this.borderColor = null;
    this.lineType = 0;
    this.selectItems = !1;
    switch (arguments.length) {
        case 1:
            if (null !== a)
                if (a instanceof Array) this.items = a;
                else if ("object" == typeof a)
                for (b in a) a.hasOwnProperty(b) && (this[b] = a[b])
    }
};
primitives.orgdiagram.ButtonConfig = function(a, b, c) {
    this.name = a;
    this.icon = b;
    this.text = !1;
    this.label = null;
    this.tooltip = c;
    this.size = new primitives.common.Size(16, 16)
};
primitives.orgdiagram.Config = function(a) {
    this.name = void 0 !== a ? a : "OrgDiagram";
    this.classPrefix = "orgdiagram";
    this.graphicsType = 0;
    this.actualGraphicsType = null;
    this.pageFitMode = 3;
    this.minimalVisibility = 2;
    this.horizontalAlignment = this.orientationType = 0;
    this.verticalAlignment = 1;
    this.elbowType = this.connectorType = this.arrowsDirection = 0;
    this.elbowDotSize = 4;
    this.emptyDiagramMessage = "Diagram is empty.";
    this.items = [];
    this.annotations = [];
    this.highligtItem = this.cursorItem = null;
    this.selectedItems = [];
    this.hasSelectorCheckbox =
        0;
    this.selectCheckBoxLabel = "Selected";
    this.selectionPathMode = 1;
    this.templates = [];
    this.defaultTemplateName = null;
    this.hasButtons = 0;
    this.buttons = [];
    this.onCursorRender = this.onHighlightRender = this.onItemRender = this.onMouseClick = this.onButtonClick = this.onSelectionChanged = this.onSelectionChanging = this.onCursorChanged = this.onCursorChanging = this.onHighlightChanged = this.onHighlightChanging = null;
    this.dotLevelShift = this.normalLevelShift = 20;
    this.normalItemsInterval = this.lineLevelShift = 10;
    this.dotItemsInterval =
        1;
    this.lineItemsInterval = 2;
    this.cousinsIntervalMultiplier = 5;
    this.itemTitleFirstFontColor = "#ffffff";
    this.itemTitleSecondFontColor = "#000080";
    this.linesColor = "#c0c0c0";
    this.linesWidth = 1;
    this.linesType = 0;
    this.highlightLinesColor = "#ff0000";
    this.highlightLinesWidth = 1;
    this.highlightLinesType = 0;
    this.showCallout = !0;
    this.defaultCalloutTemplateName = null;
    this.calloutfillColor = "#000000";
    this.calloutBorderColor = null;
    this.calloutCornerRadius = this.calloutOffset = 4;
    this.calloutPointerWidth = "10%";
    this.calloutLineWidth =
        1;
    this.calloutOpacity = 0.2;
    this.leavesPlacementType = this.childrenPlacementType = 2;
    this.maximumColumnsInMatrix = 6;
    this.buttonsPanelSize = 28;
    this.checkBoxPanelSize = this.groupTitlePanelSize = 24;
    this.distance = 3;
    this.minimumScale = 0.5;
    this.maximumScale = 1;
    this.showLabels = 0;
    this.labelSize = new primitives.common.Size(80, 24);
    this.labelOffset = 1;
    this.labelOrientation = 0;
    this.labelPlacement = 1;
    this.labelFontSize = "10px";
    this.labelFontFamily = "Arial";
    this.labelColor = "#000000";
    this.labelFontStyle = this.labelFontWeight = "normal";
    this.enablePanning = !0;
    this.printPreviewPageSize = new primitives.common.Size(612, 792)
};
primitives.orgdiagram.ConnectorAnnotationConfig = function(a, b) {
    var c;
    this.annotationType = 0;
    this.zOrderType = 2;
    this.toItem = this.fromItem = null;
    this.connectorShapeType = 0;
    this.labelPlacementType = primitives.common.ConnectorLabelPlacementType.Between;
    this.offset = new primitives.common.Thickness(0, 0, 0, 0);
    this.lineWidth = 2;
    this.color = "#000000";
    this.lineType = 0;
    this.selectItems = !0;
    this.label = null;
    this.labelSize = new primitives.common.Size(60, 30);
    switch (arguments.length) {
        case 1:
            for (c in a) a.hasOwnProperty(c) && (this[c] =
                a[c]);
            break;
        case 2:
            this.fromItem = a, this.toItem = b
    }
};
primitives.orgdiagram.HighlightPathAnnotationConfig = function(a) {
    var b;
    this.annotationType = 2;
    this.items = [];
    this.selectItems = !1;
    switch (arguments.length) {
        case 1:
            if (null !== a)
                if (a instanceof Array) this.items = a;
                else if ("object" == typeof a)
                for (b in a) a.hasOwnProperty(b) && (this[b] = a[b])
    }
};
primitives.orgdiagram.ItemConfig = function(a, b, c, d, e) {
    var f;
    this.context = this.image = this.description = this.title = this.parent = this.id = null;
    this.itemTitleColor = "#4169e1";
    this.groupTitle = null;
    this.groupTitleColor = "#4169e1";
    this.isActive = this.isVisible = !0;
    this.childrenPlacementType = this.adviserPlacementType = this.itemType = this.hasButtons = this.hasSelectorCheckbox = 0;
    this.templateName = null;
    this.showCallout = 0;
    this.label = this.calloutTemplateName = null;
    this.showLabel = 0;
    this.labelSize = null;
    this.labelOrientation =
        3;
    this.labelPlacement = 0;
    switch (arguments.length) {
        case 1:
            for (f in a) a.hasOwnProperty(f) && (this[f] = a[f]);
            break;
        case 5:
            this.id = a, this.parent = b, this.title = c, this.description = d, this.image = e
    }
};
primitives.orgdiagram.ShapeAnnotationConfig = function(a) {
    var b;
    this.annotationType = 1;
    this.zOrderType = 0;
    this.items = [];
    this.shapeType = 0;
    this.offset = new primitives.common.Thickness(0, 0, 0, 0);
    this.lineWidth = 2;
    this.cornerRadius = "10%";
    this.opacity = 1;
    this.fillColor = this.borderColor = null;
    this.lineType = 0;
    this.selectItems = !1;
    this.label = null;
    this.labelSize = new primitives.common.Size(60, 30);
    this.labelPlacement = 0;
    this.labelOffset = 4;
    switch (arguments.length) {
        case 1:
            if (null !== a)
                if (a instanceof Array) this.items = a;
                else if ("object" ==
                typeof a)
                for (b in a) a.hasOwnProperty(b) && (this[b] = a[b])
    }
};
primitives.orgdiagram.Controller = function() {
    this.widgetEventPrefix = "orgdiagram";
    this.parent = primitives.orgdiagram.BaseController.prototype;
    this.parent.constructor.apply(this, arguments);
    this.options = new primitives.orgdiagram.Config;
    this.options.linesPalette = []
};
primitives.orgdiagram.Controller.prototype = new primitives.orgdiagram.BaseController;
primitives.orgdiagram.Controller.prototype._virtualGetEventArgs = function(a, b, c) {
    var d = new primitives.orgdiagram.EventArgs,
        e;
    null != a && (a.itemConfig && null != a.itemConfig.id) && (d.oldContext = this._treeItemConfigs[a.itemConfig.id]);
    null != b && (b.itemConfig && null != b.itemConfig.id) && (d.context = this._treeItemConfigs[b.itemConfig.id], null !== b.itemConfig.parent && (d.parentItem = this._treeItemConfigs[b.itemConfig.parent]), e = this.m_placeholder.offset(), a = this.element.offset(), d.position = (new primitives.common.Rect(b.actualPosition)).translate(e.left,
        e.top).translate(-a.left, -a.top));
    null != c && (d.name = c);
    return d
};
primitives.orgdiagram.Controller.prototype._virtualCreateOrgTree = function() {
    var a, b, c, d, e, f, g, h, i, j, k;
    this._treeItemConfigs = {};
    this._orgItems = {};
    this._orgItemChildren = {};
    this._orgItemRoot = null;
    if (null != this.options.items && 0 < this.options.items.length) {
        h = "title description image itemTitleColor groupTitle groupTitleColor isVisible isActive hasSelectorCheckbox hasButtons itemType adviserPlacementType childrenPlacementType templateName showCallout calloutTemplateName label showLabel labelSize labelOrientation labelPlacement".split(" ");
        i =
            new primitives.orgdiagram.ItemConfig;
        j = 0;
        k = [];
        c = 0;
        for (d = this.options.items.length; c < d; c += 1)
            if (b = this.options.items[c], null != b.id) {
                this._treeItemConfigs[b.id] = b;
                a = new primitives.orgdiagram.OrgItem;
                a.id = b.id;
                a.parent = b.parent;
                e = parseInt(b.id, 10);
                j = Math.max(isNaN(e) ? 0 : e, j);
                a.context = b;
                e = 0;
                for (f = h.length; e < f; e += 1) g = h[e], a[g] = void 0 !== b[g] ? b[g] : i[g];
                this._orgItems[a.id] = a;
                this._orgItemChildren.hasOwnProperty(a.parent) ? this._orgItemChildren[a.parent].push(a) : this._orgItemChildren[a.parent] = [a];
                null == a.parent &&
                    (k.push(a), a.itemType = 0)
            }
        j += 1;
        this._orgItemRoot = new primitives.orgdiagram.OrgItem;
        this._orgItemRoot.id = j;
        this._orgItemRoot.hideParentConnection = !0;
        this._orgItemRoot.hideChildrenConnection = !0;
        this._orgItemRoot.title = "internal root";
        this._orgItemRoot.isVisible = !1;
        this._orgItems[this._orgItemRoot.id] = this._orgItemRoot;
        this._orgItemChildren[this._orgItemRoot.id] = k;
        this._hideRootConnectors([this._orgItemRoot])
    }
};
primitives.orgdiagram.Controller.prototype._hideRootConnectors = function(a) {
    for (var b, c, d, e, f, g, h, i, j; 0 < a.length;) {
        b = [];
        c = 0;
        for (d = a.length; c < d; c += 1)
            if (g = a[c], !g.isVisible && this._orgItemChildren.hasOwnProperty(g.id)) {
                h = this._orgItemChildren[g.id];
                j = !0;
                e = 0;
                for (f = h.length; e < f; e += 1)
                    if (i = h[e], 0 != i.itemType) {
                        j = !1;
                        break
                    }
                if (j) {
                    g.hideChildrenConnection = !0;
                    e = 0;
                    for (f = h.length; e < f; e += 1) i = h[e], i.hideParentConnection = !0, i.isVisible || b.push(i)
                }
            }
        a = b
    }
};
primitives.orgdiagram.Controller.prototype._defineLogicalParent = function(a, b) {
    var c = {},
        d, e = {},
        f = {},
        g, h, i;
    if (!a.actualIsActive || 4 == a.visibility) {
        for (i = 0; i < a.logicalParents.length; i += 1) d = a.logicalParents[i], e[d] = !0;
        for (; !primitives.common.isEmptyObject(e);) {
            for (h in e)
                if (e.hasOwnProperty(h))
                    if (d = this._treeItems[h], !d.actualIsActive || 4 == d.visibility) {
                        g = d.logicalParents;
                        for (i = 0; i < g.length; i += 1) d = g[i], f[d] = !0
                    } else c[d.id] = d;
            e = f;
            f = {}
        }
    }
    primitives.common.isEmptyObject(c) && (c[a.id] = a);
    for (h in c)
        if (c.hasOwnProperty(h)) {
            d =
                c[h];
            if (this._debug && 0 < primitives.common.indexOf(d.logicalChildren, b, function(a, b) {
                    return a.id == b.id
                })) throw "Duplicate value in logical logicalChildren array.";
            d.logicalChildren.push(b);
            if (this._debug && 0 < primitives.common.indexOf(b.logicalParents, d.id)) throw "Duplicate value in logical parents array.";
            b.logicalParents.push(h)
        }
};
primitives.orgdiagram.Controller.prototype._virtualShowCursorNeighbours = function() {
    var a, b, c, d, e, f;
    if (null !== this._cursorTreeItem) {
        0 === this._cursorTreeItem.visibility && (this._cursorTreeItem.visibility = 1);
        for (a = 0; a < this._cursorTreeItem.logicalChildren.length; a += 1) e = this._cursorTreeItem.logicalChildren[a], 0 === e.visibility && (e.visibility = 1);
        d = this._getAllLogicalParents([this._cursorTreeItem]);
        a = 0;
        for (b = d.length; a < b; a += 1) c = d[a], 0 === c.visibility && (c.visibility = 1);
        a = 0;
        for (b = this._cursorTreeItem.logicalParents.length; a <
            b; a += 1) {
            f = this._treeItems[this._cursorTreeItem.logicalParents[a]];
            c = 0;
            for (d = f.logicalChildren.length; c < d; c += 1) e = f.logicalChildren[c], 0 === e.visibility && (e.visibility = 1)
        }
    }
};
primitives.orgdiagram.ConnectorPoint = function() {
    this.parent = primitives.common.Point.prototype;
    this.parent.constructor.apply(this, arguments);
    this.hasElbow = !1;
    this.visibility = this.elbowPoint2 = this.elbowPoint1 = null;
    this.isSquared = !0;
    this.highlightPath = 0;
    this.connectorStyleType = 1
};
primitives.orgdiagram.ConnectorPoint.prototype = new primitives.common.Point;
primitives.orgdiagram.LevelVisibility = function(a, b) {
    this.level = a;
    this.currentvisibility = b
};
primitives.orgdiagram.OrgItem = function() {
    this.image = this.description = this.title = this.context = this.parent = this.id = null;
    this.itemTitleColor = "#4169e1";
    this.groupTitle = null;
    this.groupTitleColor = "#4169e1";
    this.isActive = this.isVisible = !0;
    this.childrenPlacementType = this.adviserPlacementType = this.itemType = this.hasButtons = this.hasSelectorCheckbox = 0;
    this.templateName = null;
    this.showCallout = 0;
    this.label = this.calloutTemplateName = null;
    this.showLabel = 0;
    this.labelSize = null;
    this.labelOrientation = 3;
    this.labelPlacement =
        0;
    this.level = null;
    this.hideChildrenConnection = this.hideParentConnection = !1;
    this.childIndex = null
};
primitives.orgdiagram.Template = function(a, b) {
    var c;
    this.widgetEventPrefix = "orgdiagram";
    this.templateConfig = a;
    for (c in b) b.hasOwnProperty(c) && (this[c] = a.hasOwnProperty(c) ? a[c] : b[c]);
    this.minimizedItemCornerRadius = null === a.minimizedItemCornerRadius ? this.minimizedItemSize.width / 2 : a.minimizedItemCornerRadius;
    this.itemTemplateHashCode = this.dotHighlightTemplate = this.dotHighlightTemplateHashCode = null;
    this.itemTemplateRenderName = "onItemRender";
    this.highlightTemplateHashCode = null;
    this.highlightTemplateRenderName =
        "onHighlightRender";
    this.cursorTemplateHashCode = null;
    this.cursorTemplateRenderName = "onCursorRender";
    this.boxModel = jQuery.support.boxModel
};
primitives.orgdiagram.Template.prototype.createDefaultTemplates = function() {
    primitives.common.isNullOrEmpty(this.itemTemplate) && (this.itemTemplate = this._getDefaultItemTemplate(), this.itemTemplateRenderName = "onDefaultTemplateRender");
    this.itemTemplateHashCode = primitives.common.hashCode(this.itemTemplate);
    primitives.common.isNullOrEmpty(this.cursorTemplate) && (this.cursorTemplate = this._getDefaultCursorTemplate(), this.cursorTemplateRenderName = null);
    this.cursorTemplateHashCode = primitives.common.hashCode(this.cursorTemplate);
    primitives.common.isNullOrEmpty(this.highlightTemplate) && (this.highlightTemplate = this._getDefaultHighlightTemplate(), this.highlightTemplateRenderName = null);
    this.highlightTemplateHashCode = primitives.common.hashCode(this.highlightTemplate);
    this.dotHighlightTemplate = this._getDotHighlightTemplate();
    this.dotHighlightTemplateHashCode = primitives.common.hashCode(this._getDotHighlightTemplate)
};
primitives.orgdiagram.Template.prototype._getDefaultItemTemplate = function() {
    var a = new primitives.common.Size(this.itemSize),
        b, c, d;
    a.width -= this.boxModel ? 2 * this.itemBorderWidth : 0;
    a.height -= this.boxModel ? 2 * this.itemBorderWidth : 0;
    b = jQuery("<div></div>").css({
        "border-width": this.itemBorderWidth + "px"
    }).addClass("bp-item bp-corner-all bt-item-frame");
    c = jQuery('<div name="titleBackground"></div>').css({
        top: "2px",
        left: "2px",
        width: a.width - 4 + "px",
        height: "18px"
    }).addClass("bp-item bp-corner-all bp-title-frame");
    b.append(c);
    d = jQuery('<div name="title"></div>').css({
        top: "1px",
        left: "4px",
        width: a.width - 4 - 8 + "px",
        height: "16px"
    }).addClass("bp-item bp-title");
    c.append(d);
    c = jQuery("<div></div>").css({
        top: "24px",
        left: "2px",
        width: "50px",
        height: "60px"
    }).addClass("bp-item bp-photo-frame");
    b.append(c);
    d = jQuery('<img name="photo" alt=""></img>').css({
        width: "50px",
        height: "60px"
    });
    c.append(d);
    a = jQuery('<div name="description"></div>').css({
        top: "24px",
        left: "56px",
        width: a.width - 4 - 56 + "px",
        height: "74px"
    }).addClass("bp-item bp-description");
    b.append(a);
    return b.wrap("<div>").parent().html()
};
primitives.orgdiagram.Template.prototype._getDefaultCursorTemplate = function() {
    return jQuery("<div></div>").css({
        width: this.itemSize.width + this.cursorPadding.left + this.cursorPadding.right + "px",
        height: this.itemSize.height + this.cursorPadding.top + this.cursorPadding.bottom + "px",
        "border-width": this.cursorBorderWidth + "px"
    }).addClass("bp-item bp-corner-all bp-cursor-frame").wrap("<div>").parent().html()
};
primitives.orgdiagram.Template.prototype._getDefaultHighlightTemplate = function() {
    return jQuery("<div></div>").css({
        "border-width": this.highlightBorderWidth + "px"
    }).addClass("bp-item bp-corner-all bp-highlight-frame").wrap("<div>").parent().html()
};
primitives.orgdiagram.Template.prototype._getDotHighlightTemplate = function() {
    var a = this.minimizedItemCornerRadius + this.highlightPadding.left;
    return jQuery("<div></div>").css({
        "border-width": this.highlightBorderWidth + "px",
        "-moz-border-radius": a,
        "-webkit-border-radius": a,
        "-khtml-border-radius": a,
        "border-radius": a
    }).addClass("bp-item bp-highlight-dot-frame").wrap("<div>").parent().html()
};
primitives.orgdiagram.TreeItem = function(a) {
    this.orgItem = this.itemConfig = null;
    this.id = a;
    this.logicalParents = [];
    this.logicalChildren = [];
    this.visualParentId = null;
    this.visualChildren = [];
    this.visualAggregatorId = null;
    this.partners = [];
    this.extraPartners = [];
    this.partnerConnectorOffset = 0;
    this.visibility = 1;
    this.levelPosition = this.level = this.template = null;
    this.rightPadding = this.leftPadding = this.offset = 0;
    this.actualVisibility = 1;
    this.contentPosition = this.actualPosition = this.actualSize = null;
    this.actualHasGroupTitle =
        this.actualHasButtons = this.actualHasSelectorCheckbox = this.actualIsActive = this.isSelected = this.isCursor = !1;
    this.actualItemType = null;
    this.relationDegree = this.partnerHighlightPath = this.highlightPath = this.gravity = this.connectorPlacement = 0
};
primitives.orgdiagram.TreeItem.prototype.setActualSize = function(a, b) {
    var c = primitives.common;
    this.actualVisibility = 0 === this.visibility ? a.currentvisibility : this.visibility;
    switch (this.actualVisibility) {
        case 1:
            this.actualSize = new c.Size(this.template.itemSize);
            this.contentPosition = new c.Rect(0, 0, this.actualSize.width, this.actualSize.height);
            this.isCursor && (this.actualSize.height += this.template.cursorPadding.top + this.template.cursorPadding.bottom, this.actualSize.width += this.template.cursorPadding.left +
                this.template.cursorPadding.right, this.contentPosition.x = this.template.cursorPadding.left, this.contentPosition.y = this.template.cursorPadding.top);
            this.actualHasSelectorCheckbox && (this.actualSize.height += b.checkBoxPanelSize);
            this.actualHasButtons && (this.actualSize.width += b.buttonsPanelSize);
            if (this.actualHasGroupTitle = !c.isNullOrEmpty(this.orgItem.groupTitle)) this.actualSize.width += b.groupTitlePanelSize, this.contentPosition.x += b.groupTitlePanelSize;
            break;
        case 2:
            this.actualSize = new c.Size(this.template.minimizedItemSize);
            break;
        case 3:
        case 4:
            this.actualSize = new c.Size
    }
    switch (b.orientationType) {
        case 2:
        case 3:
            this.actualSize.invert()
    }
};
primitives.orgdiagram.TreeItem.prototype.setActualPosition = function(a, b) {
    var c = 0;
    switch (b.verticalAlignment) {
        case 0:
            c = 0;
            break;
        case 1:
            c = (a.depth - this.actualSize.height) / 2;
            break;
        case 2:
            c = a.depth - this.actualSize.height
    }
    this.actualPosition = new primitives.common.Rect(this.offset, a.shift + c, this.actualSize.width, this.actualSize.height);
    switch (b.orientationType) {
        case 2:
        case 3:
            this.actualSize.invert()
    }
};
primitives.orgdiagram.TreeItem.prototype.toString = function() {
    return this.id
};
primitives.orgdiagram.TreeLevel = function(a) {
    this.level = a;
    this.actualVisibility = this.currentvisibility = 1;
    this.partnerConnectorOffset = this.levelSpace = this.connectorShift = this.topConnectorShift = this.currentOffset = this.nextLevelShift = this.depth = this.shift = 0;
    this.treeItems = [];
    this.activeTreeItems = [];
    this.labels = [];
    this.labelsRect = null;
    this.showLabels = !0;
    this.hasFixedLabels = !1
};
primitives.orgdiagram.TreeLevel.prototype.setShift = function(a, b, c, d) {
    this.shift = a;
    this.levelSpace = b;
    this.topConnectorShift = -b / 2 - c;
    this.connectorShift = this.depth + d + (this.partnerConnectorOffset + 1) * (b / 2);
    return this.nextLevelShift = c + this.depth + d + b + this.partnerConnectorOffset * b / 2
};
primitives.orgdiagram.TreeLevel.prototype.shiftDown = function(a) {
    this.shift += a
};
primitives.orgdiagram.TreeLevel.prototype.toString = function() {
    return this.level + "." + this.currentvisibility
};
(function(a) {
    a.widget("ui.orgDiagram", jQuery.ui.mouse2, new primitives.orgdiagram.Controller)
})(jQuery);
primitives.shape.Config = function() {
    this.classPrefix = "bpconnector";
    this.graphicsType = 1;
    this.actualGraphicsType = null;
    this.shapeType = this.orientationType = 0;
    this.position = null;
    this.offset = new primitives.common.Thickness(0, 0, 0, 0);
    this.lineWidth = 2;
    this.cornerRadius = "10%";
    this.opacity = 1;
    this.fillColor = this.borderColor = null;
    this.lineType = 0;
    this.label = null;
    this.labelSize = new primitives.common.Size(60, 30);
    this.labelPlacement = 0;
    this.labelOffset = 4
};
primitives.shape.Controller = function() {
    this.widgetEventPrefix = "bpshape";
    this.options = new primitives.shape.Config;
    this._labelTemplateHashCode = this._labelTemplate = this.m_shape = this.m_graphics = this.m_panelSize = this.m_placeholder = null
};
primitives.shape.Controller.prototype._create = function() {
    var a = this;
    this.element.addClass("ui-widget");
    this._createLabelTemplate();
    this._createLayout();
    this.options.onAnnotationLabelTemplateRender = function(b, c) {
        a._onAnnotationLabelTemplateRender(b, c)
    };
    this._redraw()
};
primitives.shape.Controller.prototype.destroy = function() {
    this._cleanLayout();
    this.options.onLabelTemplateRender = null
};
primitives.shape.Controller.prototype._createLayout = function() {
    this.m_panelSize = new primitives.common.Rect(0, 0, this.element.outerWidth(), this.element.outerHeight());
    this.m_placeholder = jQuery("<div></div>");
    this.m_placeholder.css({
        position: "relative",
        overflow: "hidden",
        top: "0px",
        left: "0px",
        padding: "0px",
        margin: "0px"
    });
    this.m_placeholder.css(this.m_panelSize.getCSS());
    this.m_placeholder.addClass("placeholder");
    this.m_placeholder.addClass(this.widgetEventPrefix);
    this.element.append(this.m_placeholder);
    this.m_graphics = primitives.common.createGraphics(this.options.graphicsType, this);
    this.options.actualGraphicsType = this.m_graphics.graphicsType
};
primitives.shape.Controller.prototype._cleanLayout = function() {
    null !== this.m_graphics && this.m_graphics.clean();
    this.m_graphics = null;
    this.element.find("." + this.widgetEventPrefix).remove()
};
primitives.shape.Controller.prototype._updateLayout = function() {
    this.m_panelSize = new primitives.common.Rect(0, 0, this.element.innerWidth(), this.element.innerHeight());
    this.m_placeholder.css(this.m_panelSize.getCSS())
};
primitives.shape.Controller.prototype.update = function(a) {
    a ? (this._cleanLayout(), this._createLayout(), this._redraw()) : (this._updateLayout(), this.m_graphics.resize("placeholder", this.m_panelSize.width, this.m_panelSize.height), this.m_graphics.begin(), this._redraw(), this.m_graphics.end())
};
primitives.shape.Controller.prototype._createLabelTemplate = function() {
    var a = jQuery("<div></div>");
    a.addClass("bp-item bp-corner-all bp-connector-label");
    this._labelTemplate = a.wrap("<div>").parent().html();
    this._labelTemplateHashCode = primitives.common.hashCode(this._labelTemplate)
};
primitives.shape.Controller.prototype._onAnnotationLabelTemplateRender = function(a, b) {
    b.element.html(this.options.label)
};
primitives.shape.Controller.prototype._redraw = function() {
    var a = "orientationType shapeType offset lineWidth borderColor lineType labelSize labelOffset labelPlacement cornerRadius opacity fillColor".split(" "),
        b, c;
    this.m_graphics.activate("placeholder");
    this.m_shape = new primitives.common.Shape(this.m_graphics);
    for (b = 0; b < a.length; b += 1) c = a[b], this.m_shape[c] = this.options[c];
    this.m_shape.hasLabel = !primitives.common.isNullOrEmpty(this.options.label);
    this.m_shape.labelTemplate = this._labelTemplate;
    this.m_shape.labelTemplateHashCode =
        this._labelTemplateHashCode;
    this.m_shape.panelSize = new primitives.common.Size(this.m_panelSize.width, this.m_panelSize.height);
    this.m_shape.draw(this.options.position)
};
primitives.shape.Controller.prototype._setOption = function(a, b) {
    jQuery.Widget.prototype._setOption.apply(this, arguments);
    switch (a) {
        case "disabled":
            var c = jQuery([]);
            b ? (c.filter(".ui-state-focus").blur(), c.removeClass("ui-state-hover"), c.propAttr("disabled", !0), this.element.addClass("ui-disabled")) : (c.propAttr("disabled", !1), this.element.removeClass("ui-disabled"))
    }
};
(function(a) {
    a.widget("ui.bpShape", new primitives.shape.Controller)
})(jQuery);t(
