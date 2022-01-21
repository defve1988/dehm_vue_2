import {
    max,
    min
} from "mathjs";

import Canvas from "@/app_class/plot_case/canvas"

export default class extends Canvas {
    constructor(div, fig_type) {
        super(div)
        this.all_figs = {
            ts_scatter: this.gene_ts,
            ts_bar: this.gene_bar,
            hist: this.gene_hist,
            scatter: this.gene_paired_scatter,
            ts_box: this.gene_box,
            ts_trend: this.gene_line_interval,
            // map_scatter:
        }
        this.set_fig_type(fig_type)
    }

    set_fig_type(fig_type) {
        this.fig_type = fig_type.val
        this.fig_mode = fig_type.mode
        this.fig_error_bar = fig_type.error
        this.gene_trace = this.all_figs[this.fig_type]
        this.gene_trend_trace = this.all_figs.ts_trend
    }

    gene_ts(data, color_theme) {
        var trace = []
        // console.log(data)
        var show_error_bar = this.fig_error_bar
        data.forEach((d, index) => {
            trace.push({
                x: d.x,
                y: d.y,
                error_y: show_error_bar ? {
                    type: 'data',
                    array: d.error,
                    visible: true
                } : null,
                type: 'scatter',
                mode: this.fig_mode,

                text: d.text,
                name: d.y_name,
                marker: {
                    size: 6,
                    color: color_theme[index]
                },
            })
        })
        return { trace: trace, layout: null }
    }

    gene_paired_scatter(data, color_theme) {
        // note: only first two elements will be plotted
        if (data.length < 2) {
            return { trace: null, layout: null }
        }
        let ts1 = data[0]
        let ts2 = data[1]

        var trace = {
            x: [],
            y: [],
            type: 'scatter',
            mode: this.fig_mode,

            name: `${ts1.y_name} vs. ${ts2.y_name}`,
            marker: {
                size: 6,
                color: color_theme[0]
            },
        }

        ts1.x.forEach((x1, index_1) => {
            ts2.x.forEach((x2, index_2) => {
                if (x1 == x2) {
                    trace.x.push(ts1.y[index_1])
                    trace.y.push(ts2.y[index_2])
                }
            })
        })

        let mi = min(trace.x) < min(trace.y) ? min(trace.x) : min(trace.y)
        let ma = max(trace.x) < max(trace.y) ? max(trace.y) : max(trace.x)

        return {
            trace: [trace], layout: {
                xaxis: {
                    title: ts1.y_name,
                    range: [mi * 0.95, ma * 1.05]
                },
                yaxis: {
                    title: ts2.y_name,
                    range: [mi * 0.95, ma * 1.05]
                }
            }
        }
    }

    gene_bar(data, color_theme) {
        var trace = []
        var show_error_bar = this.fig_error_bar

        data.forEach((d, index) => {
            trace.push({
                x: d.x,
                y: d.y,
                error_y: show_error_bar ? {
                    type: 'data',
                    array: d.error,
                    visible: true
                } : null,

                type: 'bar',

                text: d.text,
                name: d.y_name,
                marker: {
                    color: color_theme[index]
                },
            })
        })
        return { trace: trace, layout: null }
    }

    gene_box(data, color_theme) {
        var trace = []

        data.forEach((d, index) => {
            trace.push({
                x: d.box_x,
                y: d.box_y,
                type: 'box',

                text: d.text,
                name: d.y_name,
                marker: {
                    color: color_theme[index]
                },
            })
        })
        // console.log(trace)
        return { trace: trace, layout: { boxmode: this.fig_mode } }
    }

    gene_hist(data, color_theme) {
        var trace = []
        let ma = -Infinity
        let mi = Infinity
        data.forEach((d, index) => {
            if (ma < max(d.y)) ma = max(d.y)
            if (mi > min(d.y)) mi = min(d.y)
            trace.push({
                x: d.y,
                type: 'histogram',

                text: d.text,
                name: d.y_name,
                marker: {
                    color: color_theme[index]
                },
            })
        })
        return {
            trace: trace,
            layout: {
                xaxis: {
                    title: "conc.",
                    range: [mi * 0.95, ma * 1.05]
                },
                yaxis: {
                    title: "counts",
                }
            }
        }
    }

    gene_line_interval(data, color_theme) {
        let line_alpha = 1
        let fill_alpha = 0.2
        var trace = []
        data.forEach((d, index) => {
            trace.push({
                x: d.x,
                y: d.y,
                line: { color: this.change_alpha(color_theme[index], line_alpha) },
                mode: "lines",
                name: d.y_name,
                type: "scatter"
            })

            if (d.y_lower != null) {
                let xx = d.x
                let y1 = d.y_upper
                let y2 = d.y_lower
                trace.push({
                    x: [...xx, ...xx.reverse()],
                    y: [...y1, ...y2.reverse()],
                    fill: "tozerox",
                    type: "scatter",
                    fillcolor: this.change_alpha(color_theme[index], fill_alpha),
                    line: { color: "transparent" },
                    name: d.y_name,
                    showlegend: false,
                })
            }

        })
        return { trace: trace, layout: null }
    }

}
