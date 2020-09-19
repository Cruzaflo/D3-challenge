// @TODO: YOUR CODE HERE!
let width = parseInt(d3.select("#scatter").style("width"));

let height = width - width / 4.0

//margin spacing for graphg
let margin = 20

//space between words
let labelArea = 110;

//padding for the text at the bottom and left axes
let textPaddingBottom = 40;
let textPaddingLeft = 40;

let svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "chart")

let circleRadius;
function circleGetRadius(){
    if(width <= 530){
        circleRadius = 5;
    }
    else{
        circleRadius = 10;
    }
}

circleGetRadius()

// Axes labeld
svg.append("g").attr("class", "xaxisText")

// //will allow us to select the group without excess code stored in a variable
let xaxisText = d3.select(".xaxisText")

function xaxisTextRefresh(){
    xaxisText.attr("transform", `translate(${(width - labelArea) / 2 + labelArea}, ${height - margin - textPaddingBottom})`)
}

xaxisTextRefresh()

// //
xaxisText
    .append("text")
    .attr("y", -26)
    .attr("data-name", "poverty")
    .attr("data-axis", "x")
    .attr("class", "activeText active x")
    .text("In Poverty (%)")

// // //age
// xaxisText
//     .append("text")
//     .attr("y", 0)
//     .attr("data-name", "age")
//     .attr("class", "activeText inactive x")
//     .text("Age (Media)")

// // //Income
// xaxisText
//     .append("text")
//     .attr("y", 26)
//     .attr("data-name", "income")
//     .attr("data-axis", "x")
//     .attr("class", "activeText inactive x")
//     .text("Household Income (Media")

// //left axis
let leftTextX = margin + textPaddingLeft 
let leftTextY = (height + labelArea) /2 -labelArea

svg.append("g").attr("class", "yaxisText")

let yaxisText = d3.select(".yaxisText")

function yaxisTextRefresh(){
    yaxisText.attr("transform", `translate(${(leftTextX)}, ${leftTextY}) rotate(-90)`)
}

yaxisTextRefresh()

// yaxisText
//     obesity
//     .append("text")
//     .attr("y", -26)
//     .attr("data-name", "obesity")
//     .attr("data-axis", "y")
//     .attr("class", "activeText active y")
//     .text("Obese (%)")

// yaxisText
//     smokes
//     .append("text")
//     .attr("y", 0)
//     .attr("data-name", "Smokes")
//     .attr("data-axis", "y")
//     .attr("class", "activeText inactive y")
//     .text("Smokes (%)")

yaxisText
    //healthcare
    .append("text")
    .attr("y", 26)
    .attr("data-name", "Healthcare")
    .attr("data-axis", "y")
    .attr("class", "activeText active y")
    .text("Lack Healthcare (%)")

d3.csv("assets/data/data.csv").then(function(data){
    visualize(data)
})

function visualize(theData){
    var curX = "poverty"
    var curY = "healthcare"

    var xMin
    var xMax
    var yMin
    var yMax

    function xMinMax(){
        xMin = d3.min(theData, function(d) {
            return parseFloat(d[curX]) * 0.90
        })

        xMax = d3.max(theData, function(d){
            return parseFloat(d[curX]) * 1.10
        })
    }

    function yMinMax(){
        yMin = d3.min(theData, function(d){
            return parseFloat(d[curY]) * 0.90
        })

        yMax = d3.max(theData, function(d){
            return parseFloat(d[curY]) * 1.10
        })
    }

    xMinMax()
    yMinMax()

    var xScale = d3
        .scaleLinear()
        .domain([xMin, xMax])
        .range([margin + labelArea, width - margin])
    var yScale = d3
        .scaleLinear()
        .domain([yMin, yMax])
        .range([height - margin - labelArea, margin])
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)

    svg
        .append("g")
        .call(xAxis)
        .attr("class", "xAxis")
        .attr("transform", `translate(0, ${height - margin - labelArea})`)
    svg 
        .append("g")
        .call(yAxis)
        .attr("class", "yAxis")
        .attr("transform", "translate(" + (margin + labelArea) + ", 0)")
    
    var theCircles = svg.selectAll("g theCircles").data(theData).enter()

    theCircles  
        .append("circle")
        .attr("cx", function(d){
            return xScale(d[curX])
        })
        .attr("cy", function(d){
            return yScale(d[curY])
        })
        .attr("r", circleRadius)
        .attr("class", function(d){
            return "stateCircle " + d.abbr
        })
    
    theCircles
        .append("text")
        // We return the abbreviation to .text, which makes the text the abbreviation.
        .text(function(d) {
            return d.abbr;
        })
        // Now place the text using our scale.
        .attr("dx", function(d) {
            return xScale(d[curX]);
        })
        .attr("dy", function(d) {
            // When the size of the text is the radius,
            // adding a third of the radius to the height
            // pushes it into the middle of the circle.
            return yScale(d[curY]) + circleRadius / 2.5;
        })
        .attr("font-size", circleRadius)
        .attr("class", "stateText")
}       



// function visualize(data){
//     let currentX = "poverty"
//     let currentY = "obesity"

//     //x values
//     let xMin
//     let Xmax

//     //y Values
//     let yMin
//     let yMax

//     let toolTip = d3
//         .tip()
//         .attr("class", "d3-tip")
//         .offset(40, -60)
//         .html(function(data){
//             //the x key
//             let theX
//             let theState = `<div>${data.state}</div>`
//             let theY = `<div>${currentY}:${data[currentY]}%</div>`
//             if(currentY === "poverty"){
//                 theX = `<div>${currentX}:${data[currentX]}</div>`
//             }
//             else {
//                 theX = `<div>${currentX}:${data[currentX]}</div>`
//             }
//             return theState + theX + theY
//         })

//     svg.call(toolTip)

//     function xMinMax(){
//         xMin = d3.min(data, function(d){
//             return parseFloat(d[currentX] * 0.90)
//         })
//         xMax = d3.max(data, function(d){
//             return parseFloat(d[currentX] * 1.1)
//         })
//     }

//     function yMinMax(){
//         yMin = d3.min(data, function(d){
//             return parseFloat(d[currentY] * 0.90)
//         })
//         yMax = d3.max(data, function(d){
//             return parseFloat(d[currentY] * 1.1)
//         })
//     }

//     function labelChange (axis, clickedText){
//         d3
//             .selectAll(".activeText")
//             .filter("." + axis)
//             .filter(".active")
//             .classed("active", false)
//             .classed("inactive", true)
//         clickedText.classed("inactive", false).classed("active", true)
        
//     }

//     xMinMax();
//     yMinMax();

//     let xScale = d3.scaleLinear()
//                     .domain([Xmin, Xmax])
//                     .range([margin + labelArea, width - margin])
//     let yScale = d3.scaleLinear()
//                     .domain([yMin, yMax])
//                     .range([height - margin - labelArea, margin])
                    
//     let xAxis = d3.axisBottom(xscale)
//     let yAxis = d3.axisLeft(yScale)

//     function tickCount(){
//         if(width <= 500){
//             xAxis.ticks(5)
//             yAxis.ticks(5)
//         }
//         else{
//             xAxis.ticks(10)
//             yAxis.ticks(10)
//         }
//     }
//     tickCount()

//     svg.append("g")
//         .call(xAxis)
//         .attr("class", "xAxis")
//         .attr("transform", `translate(0, ${(height - margin - labelArea)})`)

//     svg.append("g")
//         .call(yAxis)
//         .attr("class", "yAxis")
//         .attr("transform", `translate(${(margin + labelArea)}, 0)`)

//     letCircles.append("circle")
//     .attr("cx", function(d){
//         return xScale(d[currentX])
//     })



// }