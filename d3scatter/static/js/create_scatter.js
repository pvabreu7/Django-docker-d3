// Configurações do Gráfico
var canvas_width = 500;
var canvas_height = 500;
var padding = 50;  // Padding around canvas, i.e. replaces the 0 of scale

// Criando SVG
var svg = d3.select("h3")  // Tag onde será adicionado o Gráfico
    .append("svg")
    .attr("width", canvas_width)
    .attr("height", canvas_height)


// Definindo os dados de input:
var random_data = $("#random_data").val();
// Parse pra json:
var random_data_json = JSON.parse(random_data);
// Loop para transformar o JSON em um Array:
var result = [];
for(var i in random_data_json)
    result.push([random_data_json [i].x, random_data_json [i].y])

// Criando as escalas:
var xScale = d3.scale.linear()
    .domain([0, d3.max(result, function(d) {
        return d[0];  // Define o domínio de x sendo 0 até o valor máximo do array
    })])
    .range([padding, canvas_width - padding * 2])  // estabelece o range
    .nice();  // Arredonda os números decimais

// repetindo para y:
var yScale = d3.scale.linear()
    .domain([0, d3.max(result, function(d) {
        return d[1];
    })])
    .range([canvas_height - padding, padding])
    .nice();

// Adicionando os pontos:
svg.selectAll("circle")
    .data(result)
    .enter()
    .append("circle")
    .style("fill", "#69b3a2")
    .attr("x", function(d) {
        return xScale(d[0]);  // Localização de x
    })
    .attr("y", function(d) {
        return yScale(d[1]);  // Localização de y
    })
    .attr("r", 4)  // Raio
    .attr("cx", function(d) {
        return xScale(d[0]);  // Posição do centro de x
    })
    .attr("cy", function(d) {
        return yScale(d[1]);  // Posição do centro de y
    });

// Adicionando labels de texto:
svg.selectAll("text")
    .data(result)
    .enter()
    .append("text")
    .text(function(d) {
        return Math.round(d[0]*100)/100 + "," + Math.round(d[1]*100)/100;
    })
    .attr("x", function(d) {
        return xScale(d[0]);  
    })
    .attr("y", function(d) {
        return yScale(d[1]); 
    })
    .attr("font_family", "sans-serif") 
    .attr("font-size", "11px")  
    .attr("fill", "darkgreen");   

// Definindo eixo X e incluindo no SVG:
var xAxis = d3.svg.axis()  // Cria eixo x
    .scale(xScale)      // Escala do eixo x
    .orient("bottom")  // Coloca o texto abaixo da eixo
    .ticks(10);  // Coloca a quantidade de marcadores

svg.append("g")     // Append a group element (itself invisible, but helps 'group' elements)
    .attr("class", "axis")  // Assign the 'axis' CSS
    .attr("transform", "translate(0," + (canvas_height - padding) + ")")  // Place axis at bottom
    .call(xAxis);  // Call function to create axis

// Definindo eixo X e incluindo no SVG:
var yAxis = d3.svg.axis()  
    .scale(yScale)  
    .orient("left")
    .ticks(5);

svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

 