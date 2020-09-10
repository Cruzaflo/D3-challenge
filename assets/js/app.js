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

//will allow us to select the group without excess code stored in a variable
let xaxisText = d3.select(".xaxisText")

function xaxisTextRefresh(){
    xaxisText.attr("transform", `translate(${(width - labelArea)/ 2 + labelArea}, ${height - margin - textPaddingBottom})`)
}

xaxisTextRefresh()

//
xaxisText
    .append("text")
    .attr("y", -26)
    .attr("data-name", "poverty")
    .attr("data-axis", "x")
    .attr("class", "activeText active x")
    .text("In Povert (%)")

//age
xaxisText
    .append("text")
    .attr("y", 0)
    .attr("data-name", "age")
    .attr("class", "activeText inactive x")
    .text("Age (Media)")

//Income
xaxisText
    .append("text")
    .attr("y", 26)
    .attr("data-name", "income")
    .attr("data-axis", "x")
    .attr("class", "activeText inactive x")
    .text("Household Income (Media")

//left axis
let leftTextX = margin + textPaddingLeft 
let leftTextY = (height + labelArea) /2 -labelArea

svg.append("g").attr("class", "yaxisText")

let yaxisText = d3.select(".yaxisText")

function yaxisTextRefresh(){
    yaxisText.attr("transform", `translate(${(leftTextX)}, ${leftTextY}) rotate(-90)`)
}

yaxisTextRefresh()

yaxisText
    //obesity
    .append("text")
    .attr("y", -26)
    .attr("data-name", "obesity")
    .attr("data-axis", "y")
    .attr("class", "activeText active y")
    .text("Obese (%)")

yaxisText
    //smokes
    .append("text")
    .attr("y", 0)
    .attr("data-name", "Smokes")
    .attr("data-axis", "y")
    .attr("class", "activeText inactive y")
    .text("Smokes (%)")
yaxisText
    //healthcare
    .append("text")
    .attr("y", 26)
    .attr("data-name", "Healthcare")
    .attr("data-axis", "y")
    .attr("class", "activeText inactive y")
    .text("Lack Healthcare (%)")


function visualize(data){
    let currentX = "poverty"
    let crrentY = "obesity"

    //x values
    let xMin
    let Xmax

    //y Values
    let yMin
    let yMax

    let toolTip = d3
                .tip()
                .attr("class", "d3-tip")
                .offset(40, -60)
                .html(function(data){
                    //the x key
                    let theX
                    let theState = `<div>${data.state}</div>`
                    let theY = `<div>${currentY}:${data[currentY]}%</div>`
                    if(currentY === "poverty"){
                        theX = `<div>${currentX}:${data[currentX]}</div>`
                    }
                    else {
                        theX = `<div>${currentX}:${data[currentX]}</div>`
                    }
                    return theState + theX + theY
                })

    svg.call(toolTip)

    function xMinMax(){
        xMin = d3.min(data, function(d){
            return parseFloat(d[currentX] * 0.90)
        })
        xMax = d3.max(data, function(d){
            return parseFloat(d[currentX] * 1.1)
        })
    }

    function yMinMax(){
        yMin = d3.min(data, function(d){
            return parseFloat(d[currentY] * 0.90)
        })
        yMax = d3.max(data, function(d){
            return parseFloat(d[currentY] * 1.1)
        })
    }

    function labelChange (axis, clickedText){
        d3
            .selectAll(".activeText")
            .filter("." + axis)
            .filter(".active")
            .classed("active", false)
            .classed("inactive", true)
        clickedText.classed("inactive", false).classed("active", true)
        
    }

    xMinMax();
    yMinMax();

    let xScale = d3.scaleLinear()
                    .domain([Xmin, Xmax])
                    .range([margin + labelArea, width - margin])
    let yScale = d3.scaleLinear()
                    .domain([yMin, yMax])
                    .range([height - margin - labelArea, margin])
                    
    let xAxis = d3.axisBottom(xscale)
    let yAxis = d3.axisLeft(yScale)

    function tickCount(){
        if(width <= 500){
            xAxis.ticks(5)
            yAxis.ticks(5)
        }
        else{
            xAxis.ticks(10)
            yAxis.ticks(10)
        }
    }
    tickCount()

    svg.append("g")
        .call(xAxis)
        .attr("class", "xAxis")
        .attr("transform", `translate(0, ${(height - margin - labelArea)})`)

    svg.append("g")
        .call(yAxis)
        .attr("class", "yAxis")
        .attr("transform", `translate(${(margin + labelArea)}, 0)`)

    letCircles.append("circle")
    .attr("cx", function(d){
        return xScale(d[currentX])
    })



}