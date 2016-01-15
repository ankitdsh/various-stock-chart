 var AngelChart = AngelChart || {};
 (function() {


     AngelChart = {
         name: 'Angel Charts',
         version: '0.0.1',
         description: 'AngelEYE Broking Charts',
         libraries: ['HighChart', 'HighStock', 'D3', 'jquery-sparklines', 'canvasjs'],
         chartingLibs: [{
             name: "Highchart",
             version: "4.1.5",
             path: "libs/highchart/highchart-4.1.5.js",
             variable: "Highcharts"
         }, {
             name: "Highstock",
             version: "2.1.5",
             path: "libs/highchart/highchart-2.1.5.js",
             variable: "Highcharts"
         }, {
             name: "Highchart1",
             version: "4.1.5",
             path: "libs/highchart/highchart-4.1.5.js",
             variable: "Highcharts"
         }],
         whichChartsLoaded: function whichChartsOnThisPage() {
             var list = [];
             for (var item in this.chartingLibs) {
                 if (item['variable'] !== "undefined" && typeof item['variable'] === "object")
                     list.push(item);
             }
             return list;
         },
         loadChartingFiles: function loadChartingFiles(filename, filetype) {
             if (filetype == "js") { //if filename is a external JavaScript file
                 var fileref = document.createElement('script')
                 fileref.setAttribute("type", "text/javascript")
                 fileref.setAttribute("src", filename)
             } else if (filetype == "css") { //if filename is an external CSS file
                 var fileref = document.createElement("link")
                 fileref.setAttribute("rel", "stylesheet")
                 fileref.setAttribute("type", "text/css")
                 fileref.setAttribute("href", filename)
             }
             if (typeof fileref != "undefined")
                 document.getElementsByTagName("head")[0].appendChild(fileref)

         },
         defaultHighChartConfig: function defaultChartConfig() {
             switch (type) {
                 case 'line':
                     break;
                 case 'bubble':
                     break;
                 case 'pie':
                     break;
                 default:
                     break;
             }
         },

         drawHighChart: function drawHighChart(type, config) {
             //checking if Highcharts has been loaded
             if (Highcharts !== "undefined") {
                 switch (type) {
                     case 'line':
                         this.drawlineChart(config);
                         break;
                     case 'bubble':
                         this.drawlineChart(config);
                         break;
                     case 'pie':
                         this.drawPieChart(config);
                         break;
                     case 'candlestick':
                         this.drawCandleStickChart(config);
                         break;
                     case 'heatmap':
                         this.drawHeatMAp(config);
                         break;
                     case 'compareline':
                         var chartref = this.drawCompareLine(config);
                         return chartref;
                         break;
                     default:
                         break;
                 }

             }
         },
         drawlineChart: function drawlineChart(config) {

             var config = config;
             var defaultOption = getDefaultChartOptions(config);
             //jQuery.extend( [deep=keep this true ], target, object1 [, objectN ] )
             var newOption = (config.chartOptions) ? $.extend(true, defaultOption, config.chartOptions) : defaultOption;
             var lineChart = new Highcharts.Chart(newOption);




             function getDefaultChartOptions(config) {
                 return {
                     chart: {
                         type: 'line',
                         reflow: true,
                         renderTo: config.div,
                         margin: [15, 15, 50, 35],
                         spacing: [0, 0, 0, 0]
                     },
                     colors: ['#0000ff'],
                     credits: {
                         enabled: false
                     },
                     title: {
                         text: null
                     },
                     legend: {
                         enabled: false
                     },
                     xAxis: {
                         title: {
                             text: 'XAXIS TEXT'
                         },
                         type: 'datetime',
                         // dateTimeLabelFormats: {
                         //     millisecond: '%b',
                         //     second: '%b',
                         //     minute: '%b',
                         //     hour: '%b %Y',
                         //     day: '%b %Y',
                         //     week: '%b %Y',
                         //     month: '%b',
                         //     year: '%b %y'
                         // }                        
                     },
                     yAxis: {
                         //min: 1000,
                         title: {
                             text: 'YAXIS TEXT'
                         },
                         labels: {
                             x: 40,
                             y: -2,
                             formatter: function() {
                                 return this.value.toFixed(4);
                             }
                         }
                     },
                     tooltip: {
                         shared: true,
                         useHTML: true,
                         headerFormat: '<table><tr ><td class="fL" style="text-align: left;">Time : {point.key}</td></tr>',
                         pointFormat: '<tr><td class="fL" style="color: black">Value: {point.y}</td></tr>',
                         footerFormat: '</table>',
                         crosshairs: [true],
                         valueDecimals: 2,
                         followTouchMove: true
                     },
                     series: [{
                         name: 'sensex',
                         marker: {
                             radius: 3,
                             lineColor: '#000088',
                             lineWidth: 2,
                             symbol: 'circle'
                         },
                         data: config.data
                     }]
                 };

             }
         },
         drawBubbleChart: function drawBubbleChart() {},
         drawPieChart: function drawPieChart(config) {
             var config = config;
             var defaultOption = getDefaultChartOptions(config);
             //jQuery.extend( [deep=keep this true ], target, object1 [, objectN ] )
             var newOption = (config.chartOptions) ? $.extend(true, defaultOption, config.chartOptions) : defaultOption;
             var pieChart = new Highcharts.Chart(newOption);


             function getDefaultChartOptions(config) {
                 return {
                     chart: {
                         type: 'pie',
                         reflow: true,
                         renderTo: config.div,
                         margin: [10, 150, 50, 30],
                         spacing: [10, 10, 10, 10],
                         plotBackgroundColor: null,
                         plotBorderWidth: null,
                         plotShadow: true
                     },
                     colors: ['#9830e3', '#f77a20', '#cc1f04', '#5d63a3', '#6cd0f5'],
                     credits: {
                         enabled: false
                     },
                     title: {
                         text: null
                     },
                     legend: {
                         align: 'right',
                         verticalAlign: 'middle',
                         enabled: true,
                         labelFormatter: function() {
                             return '<span style="float:left;">' + this.name + ' </span><span style="float:right;">' + this.y + '%</span>';
                         },
                         navigation: {
                             activeColor: '#3E576F',
                             animation: true,
                             arrowSize: 12,
                             inactiveColor: '#CCC',
                             // style: {
                             //     fontWeight: 'bold',
                             //     color: '#333',
                             //     fontSize: '12px'
                             // }
                         },
                         layout: 'vertical',
                         x: 10,
                         y: 10
                     },
                     tooltip: {
                         // pointFormat: '{series.name}: </br><b>{point.y}%</b>',
                         // valuePrefix: '',
                         // valueSuffix: '',

                         formatter: function() {
                             return this.key + "<br><b>" + this.y + "%</b>"
                         }
                     },
                     plotOptions: {
                         allowPointSelect: false,
                         series: {
                             allowPointSelect: false,
                             events: {
                                 legendItemClick: function(ev) {
                                     ev.preventDefault();
                                     ev.stopPropagation();
                                     ev.stopImmediatePropagation();
                                 }
                             },
                             states: {
                                 hover: {
                                     halo: false
                                 }
                             }
                         },
                         pie: {
                             innerSize: 0,
                             allowPointSelect: true,
                             cursor: 'pointer',
                             borderWidth: 0,
                             events: {
                                 legendItemClick: function(ev) {
                                     ev.preventDefault();
                                     ev.stopPropagation();
                                     ev.stopImmediatePropagation();
                                 }
                             },
                             dataLabels: {
                                 enabled: false
                             },
                             showInLegend: true
                         }
                     },
                     series: [{
                         allowPointSelect: false,
                         type: 'pie',
                         name: 'Value',
                         data: config.data
                     }]
                 }
             }
         },
         drawCandleStickChart: function drawCandleStickChart(config) {
             var config = config;
             var defaultOption = getDefaultChartOptions(config);
             //jQuery.extend( [deep=keep this true ], target, object1 [, objectN ] )
             var newOption = (config.chartOptions) ? $.extend(true, defaultOption, config.chartOptions) : defaultOption;
             var candleStickChart = new Highcharts.Chart(newOption);




             function getDefaultChartOptions(config) {
                 return {
                     chart: {
                         type: 'line',
                         reflow: true,
                         renderTo: config.div,
                         margin: [15, 0, 15, 10],
                         spacing: [0, 0, 0, 0]
                     },
                     colors: ['#0000ff'],
                     credits: {
                         enabled: false
                     },
                     title: {
                         text: null
                     },
                     legend: {
                         enabled: false
                     },
                     plotOptions: {

                         candlestick: {
                             color: 'red',
                             lineColor: 'black',
                             upLineColor: 'black', // docs
                             upColor: 'green'
                         }
                     },
                     xAxis: {
                         gridLineWidth: 0,
                         lineWidth: 0,
                         tickWidth: 0,
                         title: {
                             text: null
                         },
                         labels: {
                             enabled: false
                         },
                         ordinal: true,
                         type: 'datetime'
                     },
                     yAxis: {
                         gridLineWidth: 0,
                         //min: 1000,
                         title: {
                             text: null
                         },
                         labels: {
                             x: 40,
                             y: -2,
                             enabled: false,
                             formatter: function() {
                                 return this.value.toFixed(4);
                             }
                         }
                     },
                     tooltip: {
                         enabled: false,
                         shared: true,
                         useHTML: true,
                         headerFormat: '<table><tr ><td class="fL" style="text-align: left;">Time : {point.key}</td></tr>',
                         pointFormat: '<tr><td class="fL" style="color: {series.color}">Value: {point.y}</td></tr>',
                         footerFormat: '</table>',
                         crosshairs: [true],
                         valueDecimals: 2,
                         followTouchMove: true
                     },
                     series: [{
                         name: 'sensex',
                         type: 'candlestick',
                         // lineColor: '#000088',
                         // lineWidth: 4,
                         // pointWidth: 20,
                         marker: {
                             radius: 3,
                             lineColor: '#000088',
                             lineWidth: 2,
                             symbol: 'circle'
                         },
                         data: config.data
                     }]
                 };

             }
         },
         drawHeatMAp: function drawHeatMAp(config) {
             var config = config;
             config.HEATMAP_SERIES = generateHeatMapSeries(config.data)
             var defaultOption = getDefaultChartOptions(config);
             //jQuery.extend( [deep=keep this true ], target, object1 [, objectN ] )
             var newOption = (config.chartOptions) ? $.extend(true, defaultOption, config.chartOptions) : defaultOption;
             var heatMap = new Highcharts.Chart(newOption);

             function getDefaultChartOptions(config) {
                 return {
                     chart: {
                         reflow: true,
                         renderTo: config.div,
                         margin: [15, 0, 15, 10],
                         spacing: [0, 0, 0, 0],
                         redraw: true
                     },
                     colorAxis: {
                         minColor: '#FFFFFF',
                         maxColor: Highcharts.getOptions().colors[0]
                     },
                     title: {
                         text: null
                     },
                     credits: {
                         enabled: false
                     },
                     legend: {
                         enabled: false
                     },
                     tooltip: {
                         formatter: function() {
                             if (this.point.name == "Anand") {
                                 return '<b>Sector Performance Chart</b>'
                             } else {
                                 return '<b>' + this.point.name + '</b> <br><b>' +
                                     '<b>ADV Ratio:' + this.point.adratio + '</b> <br><b>Rs.' + this.point.value + ' Cr.</b>';
                             }
                         }
                     },

                     series: [{
                         type: "treemap",
                         layoutAlgorithm: 'strip',
                         alternateStartingDirection: true,
                         borderWidth: 0,
                         levels: [{
                             level: 1,
                             borderColor: '#000',
                             borderWidth: 0,
                             layoutAlgorithm: 'sliceAndDice',
                             dataLabels: {
                                 enabled: false,
                                 align: 'left',
                                 verticalAlign: 'top',
                                 style: {
                                     fontSize: '10px',
                                     fontWeight: 'bold'
                                 }
                             }
                         }, {
                             level: 2,
                             borderColor: '#000',
                             borderWidth: 0,
                             dataLabels: {
                                 enabled: false,
                                 align: 'center',
                                 verticalAlign: 'middle',
                                 style: {
                                     fontSize: '10px',
                                     fontWeight: 'normal'
                                 }
                             }
                         }],
                         data: config.HEATMAP_SERIES
                     }],
                     title: {
                         text: null
                     }
                 }
             }

             function generateHeatMapSeries(heatMapData) {
                 var heat = [{
                     id: 'A',
                     name: 'ANGEL',
                     color: "#EC2500"
                 }];
                 var chartObj = {};

                 // CREATING HEATMAP COLOR BASED ON RATIO
                 var getHeatColor = function(ratio) {

                     if (ratio <= 0.5) { // CREATING RED COLOR SHADES
                         color = (parseInt(((((ratio / 0.5) * 100) * 255) / 100))).toString();
                         return 'rgb(' + color + ',0,0)';
                     } else { // CREATING GREEN COLOR SHADES                        
                         color = (parseInt(((((ratio / 2.75) * 100) * 255) / 100))).toString();
                         return 'rgb(0,' + color + ',0)';
                     }
                 }

                 for (var i = 0; i < heatMapData.length; i++) {
                     heat.push({
                         name: heatMapData[i]['sect_name'],
                         parent: 'A',
                         adratio: (parseFloat(heatMapData[i]['adratio'])),
                         color: getHeatColor(parseFloat(heatMapData[i]['adratio'])),
                         value: parseFloat((heatMapData[i]['mktcap']).replace(/(\.\d{1,2})\d*$/, '$1'))

                     });
                 };
                 return heat;
             }
         },
         drawCompareLine: function drawCompareLine(config) {
             var config = config;
             var defaultOption = getDefaultChartOptions(config);
             //jQuery.extend( [deep=keep this true ], target, object1 [, objectN ] )
             var newOption = (config.chartOptions) ? $.extend(true, defaultOption, config.chartOptions) : defaultOption;



             // CONSTRUCTING AN INSTANCE OF COMPARISON CHART AND ADDING IT TO 'THIS'
             this.performanceChart = new CREATE_COMPARISON_CHART(config, newOption);


             // PUT ANY PROTOTYPE FUNCTIONS HERE BEFORE RETURNING 
             CREATE_COMPARISON_CHART.prototype.getDATA = function getDATA() {
                 alert();
             }



             return this.performanceChart;


             function CREATE_COMPARISON_CHART(config, newOption) {
                 // PRIVATE VARIABLES ACCESSIBLE THROUGHOUT 
                 var that = this,
                     config = config,
                     newOption = newOption;

                 var classnamesOrIds = {
                     chart: {
                         container: '#performanceChart',
                         parentContainer: '#performanceChartContainer'
                     },
                     tooltip: {
                         externalContainerBox: '#tooltipsContainer',
                         tooltipBox: '.tooltipBox',
                         closeTooltip: '.closeTooltip',
                         companyDetails: '.companyDetails',
                         companyName: '.companyName',
                         companyValue: '.companyValue',
                         companyPercent: '.companyPercent',
                     }

                 }

                 // SAVING INTIAL CONFIGURATION    
                 this.initConfig = config;

                 //CALL THIS FOR DRAWING THE CHART INITIALLY
                 this.init = function init(newOption) {

                         var options = newOption;
                         var RAW_DATA = that.fetchData(config.company);

                         RAW_DATA.done(function(data, success) {

                             if (success == "success") {
                                 //SEND DATA FOR TRANSFORMATION
                                 newOption.series[0]['data'] = that.transformData(data);

                                 //USE DATA AND ADD TO SERIES
                                 // CREATING CHART REFERENCE
                                 that.chartref = new Highcharts.StockChart(newOption);

                                 //ADDING A CIRCULAR REFERENCE OF that TO that.that.chartref['cache'] SO THAT
                                 //WE CAN USE THE TOOLTIP DOM FROM WITHIN THE HIGHCHART OBJECT
                                 that.chartref['cache'] = that;

                                 //SAVE TO CACHE
                                 that.saveCompany(config.company);

                                 //GETTING THE PARENT OF THE CHART CONTAINER ELEMENT
                                 that.chartContainer = that.chartref.renderTo;
                                 that.parentContainer = that.chartContainer.parentElement || that.chartContainer.parentNode;

                                 //IF EXTERNAL TOOLTIP REQUIRED ONLY THEN CREATE A TOOLTIP BOX
                                 if (config.addExternalToolTip == true) {
                                     that.prependTooltipBox(newOption);
                                     // ADD TOOLTIP BOX
                                     that.addToolTipBox(config.company, false);

                                 }
                             } else {
                                 alert("ERROR IN CSV FILE!!");
                                 return;
                             }

                         })

                     }
                     // RETURNING JQUERY AJAX PROMISE 
                 this.fetchData = function fetchData(options) {

                     //BASE PATH FOR FETCHING FILES
                     var base = options.basePath || "";
                     var companyName = options.name;
                     var url = options.url;
                     var defaults = {
                         type: 'get',
                         cache: true
                     };


                     var ajaxOptions = $.extend({
                         url: base + url
                     }, defaults);

                     return $.ajax(ajaxOptions);
                 };

                 // TRANSFORMS RAW CSV DATA TO HIGHCHART SERIES DATA
                 this.transformData = function transformData(dataStr) {

                     var temp = dataStr.split('\n'),
                         seriesData = [];

                     // ROLL FOR EACH DATA POINT
                     for (var j = 0, points = temp.length; j < points; j++) {
                         var point = temp[j].split(','),
                             timestamp = Date.parse(point[0]),
                             value = Number(point[1]) || 0;

                         seriesData.push([timestamp, value]);
                     }
                     return seriesData;
                 }

                 this.prependTooltipBox = function prependTooltipBox(newOption) {
                     // SETTING THE TOOLTIP BOX 
                     var toolBoxContainer = document.createElement("div");
                     toolBoxContainer.setAttribute('id', 'tooltipsContainer');

                     // INSERTING TOOLTIP BOX ON TOP OF THE CHART CONTAINER
                     this.parentContainer.insertBefore(toolBoxContainer, this.chartContainer);
                 }

                 this.addToolTipBox = function addToolTipBox(company, addClose) {
                     //CHECK IF TOOLTIP BOX ADDED INITIALLY
                     if (that.initConfig.addExternalToolTip) {
                         var COMPANY_NAME = company.name,
                             COMPANY_SNAME = company.shortName,
                             COMPANY_COLOR = company.color || '#eee',
                             COMPANY_COCODE = company.cocode,
                             tooltipBox = undefined;

                         createTooltipBox();

                         // THIS WILL CREATE THE TOOLTIP DOM
                         function createTooltipBox() {
                             // SETTING THE TOOLTIP BOX 
                             tooltipBox = document.createElement("div"),
                                 parentContainer = document.getElementById('tooltipsContainer');

                             // CREATE THE SERIES TOOLTIP BOX AND APPEND TO MAIN CONTAINER
                             tooltipBox.setAttribute('id', 'serie_' + COMPANY_COCODE);
                             tooltipBox.setAttribute('class', 'tooltipBox');
                             tooltipBox.setAttribute('style', 'background-color:' + COMPANY_COLOR + ';');

                             tooltipBox.innerHTML = '<div class="companyDetails">' +
                                 '<div class="companyName">' + COMPANY_NAME + '</div>' +
                                 '<div class="companyValue">-</div>' +
                                 '<div class="companyPercent">0%</div>' +
                                 '</div><div class="' + ((addClose) ? 'closeTooltip' : ' ') + '"><a class="' + ((addClose) ? 'boxclose' : ' ') + ' " id = "boxclose"></a></div>';
                             // APPENDING SERIES TOOLTIP BOX TO CONTAINER
                             parentContainer.appendChild(tooltipBox);

                             addCloseHandlerOnTooltip(tooltipBox, COMPANY_COCODE);
                             saveToolTipDOMToCache(tooltipBox);
                         }

                         // SAVING ALL DOM TO CACHE FOR QUICK ACCESS LATER
                         function saveToolTipDOMToCache(tooltip) {

                             // IF COMPANY DETAILS ALREADY SAVED PREVIOUSLY THAN ALSO SAVE THE DOM 
                             if (that.companyCache) {
                                 // GETTING ALL DOM
                                 var DOM_TOOLTIP = tooltip;
                                 var DOM_CLOSE = $($(DOM_TOOLTIP)[0]).find(classnamesOrIds.tooltip.closeTooltip)[0];
                                 var DOM_COMPANY_NAME = $($(DOM_TOOLTIP)[0]).find(classnamesOrIds.tooltip.companyName)[0];
                                 var DOM_COMPANY_VALUE = $($(DOM_TOOLTIP)[0]).find(classnamesOrIds.tooltip.companyValue)[0];
                                 var DOM_COMPANY_PERCENT = $($(DOM_TOOLTIP)[0]).find(classnamesOrIds.tooltip.companyPercent)[0];


                                 // SAVING ALL DOM TO CACHE FOR QUICK ACCESS LATER
                                 that.companyCache[that.companyCache.length - 1]['tooltip'] = {
                                     tooltip: DOM_TOOLTIP,
                                     close: DOM_CLOSE,
                                     companyName: DOM_COMPANY_NAME,
                                     companyValue: DOM_COMPANY_VALUE,
                                     companyPercent: DOM_COMPANY_PERCENT,
                                 };
                             }
                         }


                         function addCloseHandlerOnTooltip(tooltip, cocode) {

                             var DOM_TOOLTIP = tooltip;
                             var DOM_CLOSE = $($(DOM_TOOLTIP)[0]).find(classnamesOrIds.tooltip.closeTooltip)[0];

                             // REMOVE THE COMPANY FROM CHART AND TOOLTIP WHEN CLOSE IS CLICKED
                             $(DOM_CLOSE).on('click', function() {
                                 that.removeCompany(that, cocode)
                             });
                         }
                     }

                 }
                 this.removeToolTip = function removeToolTip(company) {

                     //JQUERY REMOVING TOOTIP DOM ELEMENT  
                     $(company.tooltip.tooltip).remove();

                     //DESTROYING ANY HANDLERS ASSOCIATED WITH THE TOOLTIP OR COMPANY 





                 }

                 this.addCompany = function addSeries(options) {

                     var that = this;
                     options = options;

                     var isDuplicate = this.isDuplicate(options);

                     if (!isDuplicate) {
                         var RAW_DATA = this.fetchData(options.company);

                         RAW_DATA.done(function(data, success) {

                             if (success == "success") {
                                 //SEND DATA FOR TRANSFORMATION
                                 var seriesData = that.transformData(data);

                                 that.addSerie(options, seriesData);
                             } else {
                                 alert("ERROR IN CSV FILE!!");
                                 return;

                             }

                         });

                     } else {
                         alert('Company Already Present!!')
                     }



                 };
                 this.isDuplicate = function isDuplicate(options) {
                     var companyPresent = false;

                     for (var i = 0, l = this.companyCache.length; i < l; i++) {

                         // EXTRACTING COMPANY FROM CACHE BY MATCHING COCODE
                         if (this.companyCache[i].cocode == options.company.cocode) {
                             companyPresent = true;
                             break;
                         }
                     }

                     return companyPresent;
                 }

                 this.addSerie = function addSerie(options, seriesData) {



                     //USE DATA AND ADD TO SERIES
                     this.chartref.addSeries({
                         name: options.company.name,
                         type: options.chart.type || 'line',
                         color: options.chart.color || '#456',
                         data: seriesData
                     });

                     //SAVE TO CACHE
                     this.saveCompany(options.company);

                     // ADD TOOLTIP BOX
                     this.addToolTipBox(options.company, true)

                     //TOGGLE YAXIS 
                     this.toggleYAxis();

                 };

                 this.removeCompany = function removeCompany(that, companyID) {


                     var company = removeCompanyFromCache();

                     that.removeToolTip(company);

                     removeCompanyFromHighchart(company);

                     function removeCompanyFromCache() {


                         for (var i = 0, l = that.companyCache.length; i < l; i++) {

                             // EXTRACTING COMPANY FROM CACHE BY MATCHING COCODE
                             if (that.companyCache[i].cocode == companyID) {
                                 //REMOVING THE COMPANY FROM CACHE 
                                 var removeSeries = that.companyCache.splice(i, 1);
                                 alert('COMPANY FOUND!!! Removing ' + removeSeries[0].name);
                                 break;
                             }
                         }
                         return removeSeries[0];

                     }



                     function removeCompanyFromHighchart(company) {
                         // IF COMPANY FOUND THEN START CLEANUP PROCESS
                         if (company) {

                             //REMOVING THAT COMPANY FROM HIGHCHART SERIES ARRAY
                             var ALLSERIES = that.chartref.series;
                             l = ALLSERIES.length;

                             for (var i = 0, l = ALLSERIES.length; i < l; i++) {
                                 // IF SERIES FOUND THEN REMOVE IT AND BREAK FROM LOOP
                                 if (ALLSERIES[i].name == company.name) {
                                     that.chartref.series[i].remove(true);
                                     break;
                                 }
                             }
                         }

                     }

                 }

                 this.replaceCompany = function replaceCompany(options) {

                     // FETCH DATA
                     var RAW_DATA = this.fetchData(options.company);

                     RAW_DATA.done(function(data, success) {

                         if (success == "success") {
                             //SEND DATA FOR TRANSFORMATION
                             var seriesData = that.transformData(data);

                             var new_name = options.company.name || "company name";
                             var new_shortName = options.company.shortName || "";
                             var new_cocode = options.company.cocode;
                             var new_url = options.company.url || "";
                             var new_color = options.company.color || '#cec'

                             //REPLACING MAIN SERIES
                             that.chartref.series[0].update({
                                 name: new_name,
                                 color: new_color,
                                 data: seriesData
                             });



                             // REPLACING CACHE                             
                             that.companyCache[0].id = new_cocode;
                             that.companyCache[0].name = new_name;
                             that.companyCache[0].shortName = new_shortName;
                             that.companyCache[0].cocode = new_cocode;
                             that.companyCache[0].url = new_url;
                             that.companyCache[0].seriesref = that.chartref.series[0];



                             // REPLACE TOOLTIP :- BUT JUST THE NAME INSIDE TOOLTIP
                             that.companyCache[0].tooltip.companyName.innerText = new_name;

                             that.toggleYAxis();

                         } else {
                             alert("ERROR IN CSV FILE!!");
                             return;

                         }

                     });
                 };

                 this.removeAllExceptFirst = function removeAllExceptFirst(that) {


                     var that = that || this;




                     // ITERATING THROUGH ALL SERIES AND REMOVING ALL TOOLTIPS DOM
                     if (that.companyCache) {

                         for (var i = 1, l = that.companyCache.length; i < l; i++) {
                             var company = that.companyCache[i];
                             that.removeToolTip(company)

                         }



                         // REMOVE ALL DATA FROM CACHE
                         // USE SPLICE TO KEEP ONLY MAIN SERIES DATA IN CACHE
                         that.companyCache.splice(1);
                     }


                     // REMOVE ALL SERIES FROM HIGHCHART
                     while (that.chartref.series.length > 1) {
                         var serieslength = this.chartref.series.length;

                         //SHOULD NOT REMOVE NAVIGATOR SERIES
                         if (that.chartref.series[serieslength - 1].name.toLowerCase() !== "navigator") {
                             that.chartref.series[serieslength - 1].remove(true);
                         } else {
                             break;
                         }

                     }

                     this.toggleYAxis();




                 };
                 this.destroyChart = function destroyChart(that) {


                     var that = that || this;




                     // ITERATING THROUGH ALL SERIES AND REMOVING ALL TOOLTIPS DOM
                     if (that.companyCache) {

                         for (var i = 0, l = that.companyCache.length; i < l; i++) {
                             var company = that.companyCache[i];
                             that.removeToolTip(company)

                         }



                         // REMOVE ALL DATA FROM CACHE                        
                         that.companyCache = undefined;
                     }


                     // REMOVE ALL SERIES FROM HIGHCHART ONE BY ONE
                     while (that.chartref.series.length > 0) {
                         var serieslength = this.chartref.series.length;
                         that.chartref.series[serieslength - 1].remove(true);

                     }

                     // DESTrOYING WHOLE CHART
                     that.chartref.destroy();
                     that = undefined;
                 };

                 this.saveCompany = function saveCompany(company) {
                     this.companyCache = this.companyCache || [];

                     //GETTING THE MATCHING SERIES FROM HIGHCHART AS THE ONE THAT IS JUST BEING ADDED
                     //WHEN THE NAVIGATOR IS ENABLED , IT CAN BE PRESENT IN THE HIGHCHART SERIES ARRAY, HENCE SPECIFICALLY CHECKING BASED ON 'NAME'
                     for (var i = 0, l = this.chartref.series.length; i < l; i++) {
                         if (this.chartref.series[i].name == company.name) {
                             var seriesref = this.chartref.series[i];
                             break;
                         }
                     }

                     //SAVING ALL COMPANY ATTRIBUTES AS WELL AS HIGHCHART SERIES OBJECT REFERENCE
                     this.companyCache.push({
                         id: company.cocode,
                         name: company.name || '',
                         shortName: company.shortName || '',
                         cocode: company.cocode,
                         url: company.url || '',
                         seriesPosition: i,
                         seriesref: seriesref || undefined
                     });
                 }



                 this.toggleYAxis = function toggleYAxis(type) {
                     if (type) {
                         this.chartref.yAxis[0].setCompare(type)
                     } else {
                         if (this.chartref) {
                             if (this.chartref.series.length > 1) {
                                 // set yaxis to compare mode
                                 this.chartref.yAxis[0].setCompare('percent')

                             } else {
                                 // set yaxis to value
                                 this.chartref.yAxis[0].setCompare('none')
                             }
                         }
                     }

                 }

                 // CALLING INIT AFTER ALL FUNCTION ARE INITIALIZED
                 this.init(newOption);
             }




             function externalTooltip() {

                 var tooltipsData = this.points;


                 var str = "";


                 str += "<b>" + "</b>"

                 //METHOD 1: ACCESSING DOM EACH TIME
                 // var BOXES = $('#tooltipsContainer .tooltipBox');
                 // for (var i = 0, l = BOXES.length; i < l; i++) {
                 //     if (tooltipsData[i] && tooltipsData[i]['point']) {
                 //         var thisPoint = tooltipsData[i]['point']
                 //         var name = thisPoint.series.name || "";
                 //         var date = thisPoint.x || "";
                 //         var value = thisPoint.y || 0.0;
                 //         var percentage = thisPoint.change || 0.0;
                 //         var color = thisPoint.color;

                 //         //BOXES[i] = tooltipsData[i];

                 //         ($(BOXES[i]).children().find('.companyValue')[0]).innerText = "Rs." + value.toFixed(2);
                 //         ($(BOXES[i]).children().find('.companyPercent')[0]).innerText = percentage.toFixed(2) + "%";
                 //     }

                 // }


                 //METHOD 2:ACCESSING COMPANY CACHE SAVED IN HIGHCHART OBJECT EACH TIME
                 var tooltipObj = arguments[0];
                 var highchartRef = tooltipObj.chart;
                 var companyCache = highchartRef.cache.companyCache;
                 for (var i = 0, l = companyCache.length; i < l; i++) {
                     if (tooltipsData[i] && tooltipsData[i]['point']) {
                         var thisPoint = tooltipsData[i]['point']
                             // var name = thisPoint.series.name || "";
                             // var date = thisPoint.x || "";
                         var value = thisPoint.y || 0.0;
                         var percentage = thisPoint.change || 0.0;
                         // var color = thisPoint.color;


                         var CACHED_TOOLTIP = companyCache[i].tooltip;
                         CACHED_TOOLTIP.companyPercent.innerText = "Rs." + value.toFixed(2);
                         CACHED_TOOLTIP.companyValue.innerText = percentage.toFixed(2) + "%";
                     }

                 }









                 return 'Date: ' + Highcharts.dateFormat("%d %b %Y", this.x)

             }

             function getDefaultChartOptions(config) {
                 return {
                     chart: {
                         type: 'line',
                         // height: 600,
                         reflow: true,
                         renderTo: config.div,
                         // margin: [10, 10, 20, 10],
                         margin: [0, 0, 0, 0],
                         spacing: [0, 0, 0, 0],
                         zoomType: 'x'
                     },
                     colors: ['#0000ff'],
                     credits: {
                         enabled: false
                     },
                     title: {
                         text: null
                     },
                     legend: {
                         enabled: false
                     },
                     rangeSelector: {
                         inputEnabled: false,
                         buttons: [{
                             type: 'month',
                             count: 1,
                             text: '1M'
                         }, {
                             type: 'month',
                             count: 3,
                             text: '3M'
                         }, {
                             type: 'month',
                             count: 6,
                             text: '6M'
                         }, {
                             type: 'year',
                             count: 1,
                             text: '1Y'
                         }, {
                             type: 'year',
                             count: 2,
                             text: '2Y'
                         }, {
                             type: 'all',
                             text: 'Max'
                         }],
                         selected: 3
                     },
                     xAxis: {
                         title: {
                             text: ''
                         },
                         type: 'datetime',
                         // dateTimeLabelFormats: {
                         //     millisecond: '%b',
                         //     second: '%b',
                         //     minute: '%b',
                         //     hour: '%b %Y',
                         //     day: '%b %Y',
                         //     week: '%b %Y',
                         //     month: '%b',
                         //     year: '%b %y'
                         // }                        
                     },
                     yAxis: {
                         //min: 1000,
                         title: {
                             text: ''
                         },
                         labels: {
                             x: 40,
                             y: -2,
                             formatter: function() {
                                 return this.value.toFixed(4);
                             }
                         }
                     },
                     tooltip: {
                         shared: true,
                         crosshairs: [true],
                         valueDecimals: 2,
                         followTouchMove: true,
                         formatter: externalTooltip


                         // useHTML: true,
                         // headerFormat: '<table><tr ><td class="fL" style="text-align: left;">Time : {point.key}</td></tr>',
                         // pointFormat: '<tr><td class="fL" style="color: black">Value: {point.y}</td></tr>',
                         // footerFormat: '</table>',

                     },
                     series: [{
                         name: 'Company Name',
                         marker: {
                             enabled: true,
                             radius: 3,
                             lineColor: '#000088',
                             lineWidth: 2,
                             symbol: 'circle'
                         },
                         data: []
                     }]
                 };

             }
         }
     }

 })();
