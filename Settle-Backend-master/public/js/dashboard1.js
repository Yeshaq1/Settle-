/*=========================================================================================
    File Name: dashboard1.js
    Description: Dashboard 1
    ----------------------------------------------------------------------------------------
    Item Name: Apex - Responsive Admin Theme
    Version: 1.0
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

// chartist chart
// ------------------------------
$(window).on("load", function () {

    url = apiBaseURL+"/dashboard/chart-orderstat";
    $.ajax({
             type:"GET",
             url:url,
             dataType:"json",
             success:function(response){
                if (response.data.length >0) {
                    var seriesVals = [];
                    var labelsVals = [];
                    var chartLabel = '';
                    for (var i = 0; i < response.data.length; i++) {
                    var percenTage = response.data[i].percentage.toFixed(2)+"%";    
                    

                      if(response.data[i]._id == 'Pending') {
                          class_name = 'ct-started'; //ct-series-f
                          label_class_name = 'progress-bar-blue';
                      } 
                      if(response.data[i]._id == 'Ready') {
                         class_name = 'ct-outstanding';
                         label_class_name = 'progress-bar-violet';
                       } 
                       if(response.data[i]._id == 'Dispatched' || response.data[i]._id == 'Delivered') {
                        class_name = 'ct-progress';
                        label_class_name = 'progress-bar-warning';
                      } 
                      if(response.data[i]._id == 'Completed') {
                        class_name = 'ct-done';
                        label_class_name = 'progress-bar-success';
                      } 
                     
                      seriesVals.push({'name':response.data[i]._id,'className':class_name,'value':response.data[i].percentage});
                     //seriesVals.push(response.data[i].percentage);
                     labelsVals.push(response.data[i]._id+"("+response.data[i].percentage+"% )");

                     chartLabel+='<div class="col-md-6">'+
                     '<span class="task-item">'+response.data[i]._id+
                     '<small class="pull-right text-muted">'+percenTage+'</small>'+
                     '<div class="progress progress-sm">'+
                         '<div role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: '+percenTage+';" class="progress-bar '+label_class_name+'"></div>'+
                     '</div>'+
                     '</span>'+
                    '</div>';  
                    }
                    
                    
                    var pieData = {
                    series: seriesVals,
                    labels: labelsVals
                    };
                   


                    var chart = new Chartist.Pie('#donut-dashboard-chart', pieData, {
                        donut: true,
                        showLabel: false,
                      });
                      
                      chart.on('draw', function(data) {
                        
                        if(data.type === 'slice') {
                          // Get the total path length in order to use for dash array animation
                          var pathLength = data.element._node.getTotalLength();
                      
                          // Set a dasharray that matches the path length as prerequisite to animate dashoffset
                          data.element.attr({
                            'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
                          });
                      
                          // Create animation definition while also assigning an ID to the animation for later sync usage
                          var animationDefinition = {
                            'stroke-dashoffset': {
                              id: 'anim' + data.index,
                              dur: 1000,
                              from: -pathLength + 'px',
                              to:  '0px',
                              easing: Chartist.Svg.Easing.easeOutQuint,
                              // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
                              fill: 'freeze'
                            }
                          };
                      
                          // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
                          if(data.index !== 0) {
                            animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
                          }
                      
                          // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
                          data.element.attr({
                            'stroke-dashoffset': -pathLength + 'px'
                          });
                      
                          // We can't use guided mode as the animations need to rely on setting begin manually
                          // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
                          data.element.animate(animationDefinition, false);
                        }
                      });
                      
                      // For the sake of the example we update the chart every time it's created with a delay of 8 seconds
                      chart.on('created', function() {
                        if(window.__anim21278907124) {
                          clearTimeout(window.__anim21278907124);
                          window.__anim21278907124 = null;
                        }
                        $("#orderstat_chart_label").html(chartLabel);
                        //window.__anim21278907124 = setTimeout(chart.update.bind(chart), 10000);
                      });
                        
                }
                else{
                    
                }
             }    
      });




      



    // Donut Chart Starts

    var Donutdata = {
        series: [
            {
                "name": "done",
                "className": "ct-done",
                "value": 23
            },
            {
                "name": "progress",
                "className": "ct-progress",
                "value": 14
            },
            {
                "name": "outstanding",
                "className": "ct-outstanding",
                "value": 35
            },
            {
                "name": "started",
                "className": "ct-started",
                "value": 28
            }
        ]
    };

    var donut = new Chartist.Pie('#donut-dashboard-chart1', {

        series: [
            {
                "name": "done",
                "className": "ct-done",
                "value": 23
            },
            {
                "name": "progress",
                "className": "ct-progress",
                "value": 14
            },
            {
                "name": "outstanding",
                "className": "ct-outstanding",
                "value": 35
            },
            {
                "name": "started",
                "className": "ct-started",
                "value": 28
            }
        ]
    }, {
            donut: true,
            startAngle: 0,
            labelInterpolationFnc: function (value) {
                var total = Donutdata.series.reduce(function (prev, series) {
                    return prev + series.value;
                }, 0);
                return total + '%';
            }
        });

    donut.on('draw', function (data) {
        if (data.type === 'label') {
            if (data.index === 0) {
                data.element.attr({
                    dx: data.element.root().width() / 2,
                    dy: data.element.root().height() / 2
                });
            } else {
                data.element.remove();
            }
        }
    });
    // Donut Chart Ends

    // Line Chart 2 Starts
    var lineChart2 = new Chartist.Line('#line-chart2', {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        series: [
            [160, 150, 140, 120, 75, 35, 45, 65, 100, 145, 160, 180]
        ]
    }, {
            axisX: {
                showGrid: false,
            },
            axisY: {
                low: 0,
                scaleMinSpace: 50,
            },
            fullWidth: true,
            chartPadding: { top: 0, right: 25, bottom: 0, left: 0 },
        },
        [
            ['screen and (max-width: 640px) and (min-width: 381px)', {
                axisX: {
                    labelInterpolationFnc: function (value, index) {
                        return index % 2 === 0 ? value : null;
                    }
                }
            }],
            ['screen and (max-width: 380px)', {
                axisX: {
                    labelInterpolationFnc: function (value, index) {
                        return index % 3 === 0 ? value : null;
                    }
                }
            }]
        ]);

    lineChart2.on('draw', function (data) {
        var circleRadius = 6;
        if (data.type === 'point') {
            var circle = new Chartist.Svg('circle', {
                cx: data.x,
                cy: data.y,
                r: circleRadius,
                class: 'ct-point-circle'
            });
            data.element.replace(circle);
        }
    });
    // Line Chart 2 Ends

});

$(document).ready(function(){
    setInterval(function showNotification(){
    url = apiBaseURL+"/order/notification";
    $.ajax({
             type:"GET",
             url:url,
             dataType:"json",
             success:function(response){
         if (response.data.length >0) {
                     $("#new_order").text("("+response.data.length+")");
                     $("#new_order").addClass("notify");
                /*if (response.is_new == "yes") {
                     MsgPop.displaySmall = true;
                     MsgPop.position = "bottom-right";
                     
                     $(document).ready(function(){
                         MsgPop.open({
                             Type:			  "success",
                             AutoClose:	true,
                             CloseTimer:	20000,
                             Content:		"Service Number: "+response.service_number +"<br>Customer Name: "+response.name+"<br>Email: "+response.email+"<br>Details Link: "+ '<p><a class="btn btn-success" target="_blank" href='+response.details_link+'>Click here for more details..</a></p>'
                         });
                     });
                 }*/
                 
             }
             else{
                 $("#new_order").text('');
                 $("#new_order").removeClass("notify");
             }
                 
                 
             }    
         });
     }, 3000);
     
 });