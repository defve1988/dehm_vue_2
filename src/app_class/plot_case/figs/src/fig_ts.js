function gene_scatter(data, color_theme) {
    var trace = []
    data.forEach((d, index) => {
        trace.push({
            x: d.x,
            y: d.y,
            type: 'scatter',
            mode: 'markers',

            text: d.text,
            name: d.y_name,
            marker: {
                size: 6,
                color: color_theme[index]
            },
        })
    })
    return trace
}

function gene_line(data, color_theme) {
    var trace = []
    data.forEach((d, index) => {
        trace.push({
            x: d.x,
            y: d.y,
            type: 'scatter',
            mode: 'markers',

            text: d.text,
            name: d.y_name,
            marker: {
                size: 6,
                color: color_theme[index]
            },
        })
    })
    return trace
}

function gene_bar(data, color_theme) {
    var trace = []
    data.forEach((d, index) => {
        trace.push({
            x: d.x,
            y: d.y,
            type: 'scatter',
            mode: 'markers',

            text: d.text,
            name: d.y_name,
            marker: {
                size: 6,
                color: color_theme[index]
            },
        })
    })
    return trace
}

function gene_line_interval(data, color_theme) {
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
    return trace
}

export default {
    gene_scatter,
    gene_line,
    gene_bar,
    gene_line_interval
}