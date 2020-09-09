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