/*
 Highcharts JS v4.1.5 (2015-04-13)

 (c) 2011-2014 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(h) {
    var m = h.Axis,
        r = h.Chart,
        k = h.Color,
        x = h.Legend,
        t = h.LegendSymbolMixin,
        u = h.Series,
        v = h.getOptions(),
        i = h.each,
        s = h.extend,
        y = h.extendClass,
        n = h.merge,
        l = h.pick,
        p = h.seriesTypes,
        w = h.wrap,
        o = function() {},
        q = h.ColorAxis = function() {
            this.isColorAxis = !0;
            this.init.apply(this, arguments)
        };
    s(q.prototype, m.prototype);
    s(q.prototype, {
        defaultColorAxisOptions: {
            lineWidth: 0,
            gridLineWidth: 1,
            tickPixelInterval: 72,
            startOnTick: !0,
            endOnTick: !0,
            offset: 0,
            marker: {
                animation: {
                    duration: 50
                },
                color: "gray",
                width: 0.01
            },
            labels: {
                overflow: "justify"
            },
            minColor: "#EFEFFF",
            maxColor: "#003875",
            tickLength: 5
        },
        init: function(a, b) {
            var e = a.options.legend.layout !== "vertical",
                c;
            c = n(this.defaultColorAxisOptions, {
                side: e ? 2 : 1,
                reversed: !e
            }, b, {
                isX: e,
                opposite: !e,
                showEmpty: !1,
                title: null,
                isColor: !0
            });
            m.prototype.init.call(this, a, c);
            b.dataClasses && this.initDataClasses(b);
            this.initStops(b);
            this.isXAxis = !0;
            this.horiz = e;
            this.zoomEnabled = !1
        },
        tweenColors: function(a, b, e) {
            var c;
            !b.rgba.length || !a.rgba.length ? a = b.raw || "none" : (a = a.rgba, b = b.rgba, c = b[3] !== 1 || a[3] !== 1, a = (c ? "rgba(" :
                "rgb(") + Math.round(b[0] + (a[0] - b[0]) * (1 - e)) + "," + Math.round(b[1] + (a[1] - b[1]) * (1 - e)) + "," + Math.round(b[2] + (a[2] - b[2]) * (1 - e)) + (c ? "," + (b[3] + (a[3] - b[3]) * (1 - e)) : "") + ")");
            return a
        },
        initDataClasses: function(a) {
            var b = this,
                e = this.chart,
                c, d = 0,
                f = this.options,
                g = a.dataClasses.length;
            this.dataClasses = c = [];
            this.legendItems = [];
            i(a.dataClasses, function(a, h) {
                var i, a = n(a);
                c.push(a);
                if (!a.color) f.dataClassColor === "category" ? (i = e.options.colors, a.color = i[d++], d === i.length && (d = 0)) : a.color = b.tweenColors(k(f.minColor), k(f.maxColor),
                    g < 2 ? 0.5 : h / (g - 1))
            })
        },
        initStops: function(a) {
            this.stops = a.stops || [
                [0, this.options.minColor],
                [1, this.options.maxColor]
            ];
            i(this.stops, function(a) {
                a.color = k(a[1])
            })
        },
        setOptions: function(a) {
            m.prototype.setOptions.call(this, a);
            this.options.crosshair = this.options.marker;
            this.coll = "colorAxis"
        },
        setAxisSize: function() {
            var a = this.legendSymbol,
                b = this.chart,
                e, c, d;
            if (a) this.left = e = a.attr("x"), this.top = c = a.attr("y"), this.width = d = a.attr("width"), this.height = a = a.attr("height"), this.right = b.chartWidth - e - d, this.bottom =
                b.chartHeight - c - a, this.len = this.horiz ? d : a, this.pos = this.horiz ? e : c
        },
        toColor: function(a, b) {
            var e, c = this.stops,
                d, f = this.dataClasses,
                g, j;
            if (f)
                for (j = f.length; j--;) {
                    if (g = f[j], d = g.from, c = g.to, (d === void 0 || a >= d) && (c === void 0 || a <= c)) {
                        e = g.color;
                        if (b) b.dataClass = j;
                        break
                    }
                } else {
                    this.isLog && (a = this.val2lin(a));
                    e = 1 - (this.max - a) / (this.max - this.min || 1);
                    for (j = c.length; j--;)
                        if (e > c[j][0]) break;
                    d = c[j] || c[j + 1];
                    c = c[j + 1] || d;
                    e = 1 - (c[0] - e) / (c[0] - d[0] || 1);
                    e = this.tweenColors(d.color, c.color, e)
                }
            return e
        },
        getOffset: function() {
            var a =
                this.legendGroup,
                b = this.chart.axisOffset[this.side];
            if (a) {
                m.prototype.getOffset.call(this);
                if (!this.axisGroup.parentGroup) this.axisGroup.add(a), this.gridGroup.add(a), this.labelGroup.add(a), this.added = !0, this.labelLeft = 0, this.labelRight = this.width;
                this.chart.axisOffset[this.side] = b
            }
        },
        setLegendColor: function() {
            var a, b = this.options;
            a = this.reversed;
            a = this.horiz ? [+a, 0, +!a, 0] : [0, +!a, 0, +a];
            this.legendColor = {
                linearGradient: {
                    x1: a[0],
                    y1: a[1],
                    x2: a[2],
                    y2: a[3]
                },
                stops: b.stops || [
                    [0, b.minColor],
                    [1, b.maxColor]
                ]
            }
        },
        drawLegendSymbol: function(a, b) {
            var e = a.padding,
                c = a.options,
                d = this.horiz,
                f = l(c.symbolWidth, d ? 200 : 12),
                g = l(c.symbolHeight, d ? 12 : 200),
                j = l(c.labelPadding, d ? 16 : 30),
                c = l(c.itemDistance, 10);
            this.setLegendColor();
            b.legendSymbol = this.chart.renderer.rect(0, a.baseline - 11, f, g).attr({
                zIndex: 1
            }).add(b.legendGroup);
            b.legendSymbol.getBBox();
            this.legendItemWidth = f + e + (d ? c : j);
            this.legendItemHeight = g + e + (d ? j : 0)
        },
        setState: o,
        visible: !0,
        setVisible: o,
        getSeriesExtremes: function() {
            var a;
            if (this.series.length) a = this.series[0],
                this.dataMin = a.valueMin, this.dataMax = a.valueMax
        },
        drawCrosshair: function(a, b) {
            var e = b && b.plotX,
                c = b && b.plotY,
                d, f = this.pos,
                g = this.len;
            if (b) d = this.toPixels(b[b.series.colorKey]), d < f ? d = f - 2 : d > f + g && (d = f + g + 2), b.plotX = d, b.plotY = this.len - d, m.prototype.drawCrosshair.call(this, a, b), b.plotX = e, b.plotY = c, this.cross && this.cross.attr({
                fill: this.crosshair.color
            }).add(this.legendGroup)
        },
        getPlotLinePath: function(a, b, e, c, d) {
            return typeof d === "number" ? this.horiz ? ["M", d - 4, this.top - 6, "L", d + 4, this.top - 6, d, this.top, "Z"] : ["M",
                this.left, d, "L", this.left - 6, d + 6, this.left - 6, d - 6, "Z"
            ] : m.prototype.getPlotLinePath.call(this, a, b, e, c)
        },
        update: function(a, b) {
            i(this.series, function(a) {
                a.isDirtyData = !0
            });
            m.prototype.update.call(this, a, b);
            this.legendItem && (this.setLegendColor(), this.chart.legend.colorizeItem(this, !0))
        },
        getDataClassLegendSymbols: function() {
            var a = this,
                b = this.chart,
                e = this.legendItems,
                c = b.options.legend,
                d = c.valueDecimals,
                f = c.valueSuffix || "",
                g;
            e.length || i(this.dataClasses, function(c, m) {
                var k = !0,
                    l = c.from,
                    n = c.to;
                g = "";
                l === void 0 ?
                    g = "< " : n === void 0 && (g = "> ");
                l !== void 0 && (g += h.numberFormat(l, d) + f);
                l !== void 0 && n !== void 0 && (g += " - ");
                n !== void 0 && (g += h.numberFormat(n, d) + f);
                e.push(s({
                    chart: b,
                    name: g,
                    options: {},
                    drawLegendSymbol: t.drawRectangle,
                    visible: !0,
                    setState: o,
                    setVisible: function() {
                        k = this.visible = !k;
                        i(a.series, function(a) {
                            i(a.points, function(a) {
                                a.dataClass === m && a.setVisible(k)
                            })
                        });
                        b.legend.colorizeItem(this, k)
                    }
                }, c))
            });
            return e
        },
        name: ""
    });
    i(["fill", "stroke"], function(a) {
        HighchartsAdapter.addAnimSetter(a, function(b) {
            b.elem.attr(a,
                q.prototype.tweenColors(k(b.start), k(b.end), b.pos))
        })
    });
    w(r.prototype, "getAxes", function(a) {
        var b = this.options.colorAxis;
        a.call(this);
        this.colorAxis = [];
        b && new q(this, b)
    });
    w(x.prototype, "getAllItems", function(a) {
        var b = [],
            e = this.chart.colorAxis[0];
        e && (e.options.dataClasses ? b = b.concat(e.getDataClassLegendSymbols()) : b.push(e), i(e.series, function(a) {
            a.options.showInLegend = !1
        }));
        return b.concat(a.call(this))
    });
    r = {
        pointAttrToOptions: {
            stroke: "borderColor",
            "stroke-width": "borderWidth",
            fill: "color",
            dashstyle: "dashStyle"
        },
        pointArrayMap: ["value"],
        axisTypes: ["xAxis", "yAxis", "colorAxis"],
        optionalAxis: "colorAxis",
        trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
        getSymbol: o,
        parallelArrays: ["x", "y", "value"],
        colorKey: "value",
        translateColors: function() {
            var a = this,
                b = this.options.nullColor,
                e = this.colorAxis,
                c = this.colorKey;
            i(this.data, function(d) {
                var f = d[c];
                if (f = f === null ? b : e && f !== void 0 ? e.toColor(f, d) : d.color || a.color) d.color = f
            })
        }
    };
    v.plotOptions.heatmap = n(v.plotOptions.scatter, {
        animation: !1,
        borderWidth: 0,
        nullColor: "#F8F8F8",
        dataLabels: {
            formatter: function() {
                return this.point.value
            },
            inside: !0,
            verticalAlign: "middle",
            crop: !1,
            overflow: !1,
            padding: 0
        },
        marker: null,
        pointRange: null,
        tooltip: {
            pointFormat: "{point.x}, {point.y}: {point.value}<br/>"
        },
        states: {
            normal: {
                animation: !0
            },
            hover: {
                halo: !1,
                brightness: 0.2
            }
        }
    });
    p.heatmap = y(p.scatter, n(r, {
        type: "heatmap",
        pointArrayMap: ["y", "value"],
        hasPointSpecificOptions: !0,
        supportsDrilldown: !0,
        getExtremesFromAll: !0,
        init: function() {
            var a;
            p.scatter.prototype.init.apply(this, arguments);
            a = this.options;
            this.pointRange = a.pointRange = l(a.pointRange, a.colsize || 1);
            this.yAxis.axisPointRange = a.rowsize || 1
        },
        translate: function() {
            var a = this.options,
                b = this.xAxis,
                e = this.yAxis;
            this.generatePoints();
            i(this.points, function(c) {
                var d = (a.colsize || 1) / 2,
                    f = (a.rowsize || 1) / 2,
                    g = Math.round(b.len - b.translate(c.x - d, 0, 1, 0, 1)),
                    d = Math.round(b.len - b.translate(c.x + d, 0, 1, 0, 1)),
                    h = Math.round(e.translate(c.y - f, 0, 1, 0, 1)),
                    f = Math.round(e.translate(c.y + f, 0, 1, 0, 1));
                c.plotX = c.clientX = (g + d) / 2;
                c.plotY = (h + f) / 2;
                c.shapeType = "rect";
                c.shapeArgs = {
                    x: Math.min(g, d),
                    y: Math.min(h, f),
                    width: Math.abs(d - g),
                    height: Math.abs(f - h)
                }
            });
            this.translateColors();
            this.chart.hasRendered && i(this.points, function(a) {
                a.shapeArgs.fill = a.options.color || a.color
            })
        },
        drawPoints: p.column.prototype.drawPoints,
        animate: o,
        getBox: o,
        drawLegendSymbol: t.drawRectangle,
        getExtremes: function() {
            u.prototype.getExtremes.call(this, this.valueData);
            this.valueMin = this.dataMin;
            this.valueMax = this.dataMax;
            u.prototype.getExtremes.call(this)
        }
    }))
})(Highcharts);