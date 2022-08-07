/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

// Brand Dark and Brand Light Themes with minor modifications
// https://github.com/highcharts/highcharts/tree/master/ts/Extensions/Themes

export const themeGlobalDark: Partial<Highcharts.Options> = {
  colors: [
    '#8087E8',
    '#A3EDBA',
    '#F19E53',
    '#6699A1',
    '#E1D369',
    '#87B4E7',
    '#DA6D85',
    '#BBBAC5',
  ],

  chart: {
    backgroundColor: {
      linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
      stops: [
        [0, '#1f1836'],
        [1, '#45445d'],
      ],
    },
    style: {
      fontFamily: 'IBM Plex Sans, sans-serif',
    },
  },
  title: {
    style: {
      fontSize: '22px',
      fontWeight: '500',
      color: '#fff',
    },
  },
  subtitle: {
    style: {
      fontSize: '16px',
      fontWeight: '400',
      color: '#fff',
    },
  },
  credits: {
    style: {
      color: '#f0f0f0',
    },
  },
  caption: {
    style: {
      color: '#f0f0f0',
    },
  },
  tooltip: {
    borderWidth: 0,
    backgroundColor: '#000000',
    style: {
      color: '#f0f0f0',
    },
    shadow: true,
  },
  legend: {
    backgroundColor: 'transparent',
    itemStyle: {
      fontWeight: '400',
      fontSize: '12px',
      color: '#fff',
    },
    itemHoverStyle: {
      fontWeight: '700',
      color: '#fff',
    },
  },
  // @ts-ignore typing
  labels: {
    style: {
      color: '#707073',
    },
  },
  plotOptions: {
    series: {
      dataLabels: {
        color: '#46465C',
        style: {
          fontSize: '13px',
        },
      },
      marker: {
        lineColor: '#333',
      },
    },
    boxplot: {
      fillColor: '#505053',
    },
    candlestick: {
      lineColor: null as any,
      upColor: '#DA6D85',
      upLineColor: '#DA6D85',
    },
    errorbar: {
      color: 'white',
    },
    dumbbell: {
      lowColor: '#f0f0f0',
    },
    map: {
      borderColor: 'rgba(200, 200, 200, 1)',
      nullColor: '#78758C',
    },
  },
  drilldown: {
    activeAxisLabelStyle: {
      color: '#F0F0F3',
    },
    activeDataLabelStyle: {
      color: '#F0F0F3',
    },
    // @ts-ignore typing
    drillUpButton: {
      theme: {
        fill: '#fff',
      },
    },
  },
  xAxis: {
    gridLineColor: '#707073',
    labels: {
      style: {
        color: '#fff',
        fontSize: '12px',
      },
    },
    lineColor: '#707073',
    minorGridLineColor: '#505053',
    tickColor: '#707073',
    title: {
      style: {
        color: '#fff',
      },
    },
  },
  yAxis: {
    gridLineColor: '#707073',
    labels: {
      style: {
        color: '#fff',
        fontSize: '12px',
      },
    },
    lineColor: '#707073',
    minorGridLineColor: '#505053',
    tickColor: '#707073',
    tickWidth: 1,
    title: {
      style: {
        color: '#fff',
        fontWeight: '300',
      },
    },
  },
  mapNavigation: {
    enabled: true,
    buttonOptions: {
      theme: {
        fill: '#46465C',
        'stroke-width': 1,
        stroke: '#BBBAC5',
        r: 2,
        style: {
          color: '#fff',
        },
        states: {
          hover: {
            fill: '#000',
            'stroke-width': 1,
            stroke: '#f0f0f0',
            style: {
              color: '#fff',
            },
          },

          select: {
            fill: '#000',
            'stroke-width': 1,
            stroke: '#f0f0f0',
            style: {
              color: '#fff',
            },
          },
        },
      },
      verticalAlign: 'bottom',
    },
  },
  // scroll charts
  rangeSelector: {
    buttonTheme: {
      fill: '#46465C',
      stroke: '#BBBAC5',
      'stroke-width': 1,
      style: {
        color: '#fff',
      },
      states: {
        hover: {
          fill: '#1f1836',
          style: {
            color: '#fff',
          },
          'stroke-width': 1,
          stroke: 'white',
        },
        select: {
          fill: '#1f1836',
          style: {
            color: '#fff',
          },
          'stroke-width': 1,
          stroke: 'white',
        },
      },
    },
    inputBoxBorderColor: '#BBBAC5',
    inputStyle: {
      backgroundColor: '#2F2B38',
      color: '#fff',
    },
    labelStyle: {
      color: '#fff',
    },
  },
  navigator: {
    handles: {
      backgroundColor: '#BBBAC5',
      borderColor: '#2F2B38',
    },
    outlineColor: '#CCC',
    maskFill: 'rgba(255,255,255,0.1)',
    series: {
      color: '#A3EDBA',
      lineColor: '#A3EDBA',
    },
    xAxis: {
      gridLineColor: '#505053',
    },
  },
  scrollbar: {
    barBackgroundColor: '#BBBAC5',
    barBorderColor: '#808083',
    buttonArrowColor: '#2F2B38',
    buttonBackgroundColor: '#BBBAC5',
    buttonBorderColor: '#2F2B38',
    rifleColor: '#2F2B38',
    trackBackgroundColor: '#78758C',
    trackBorderColor: '#2F2B38',
  },
};

export const themeGlobalLight: Partial<Highcharts.Options> = {
  colors: [
    '#8087E8',
    '#A3EDBA',
    '#F19E53',
    '#6699A1',
    '#E1D369',
    '#87B4E7',
    '#DA6D85',
    '#BBBAC5',
  ],
  chart: {
    backgroundColor: '#f0f0f0',
    style: {
      fontFamily: 'IBM Plex Sans, sans-serif',
    },
  },
  title: {
    style: {
      fontSize: '22px',
      fontWeight: '500',
      color: '#2F2B38',
    },
  },
  subtitle: {
    style: {
      fontSize: '16px',
      fontWeight: '400',
      color: '#2F2B38',
    },
  },
  tooltip: {
    borderWidth: 0,
    backgroundColor: '#46465C',
    style: {
      color: '#f0f0f0',
    },
    shadow: true,
  },
  legend: {
    backgroundColor: '#f0f0f0',
    borderColor: '#BBBAC5',
    borderWidth: 1,
    borderRadius: 2,
    itemStyle: {
      fontWeight: '400',
      fontSize: '12px',
      color: '#2F2B38',
    },
    itemHoverStyle: {
      fontWeight: '700',
      color: '#46465C',
    },
  },
  navigation: {
    buttonOptions: {
      // @ts-ignore typing
      symbolStroke: '#2F2B38',
      theme: {
        fill: '#fff',
        // @ts-ignore typing
        states: {
          hover: {
            stroke: '#46465C',
            fill: '#fff',
          },
          select: {
            stroke: '#46465C',
            fill: '#fff',
          },
        },
      },
    },
  },
  // @ts-ignore typing
  labels: {
    style: {
      color: '#46465C',
    },
  },
  credits: {
    style: {
      color: '#46465C',
    },
  },
  drilldown: {
    activeAxisLabelStyle: {
      color: '#2F2B38',
    },
    activeDataLabelStyle: {
      color: '#2F2B38',
    },
    // @ts-ignore typing
    drillUpButton: {
      theme: {
        fill: '#2F2B38',
        style: {
          color: '#fff',
        },
      },
    },
  },
  xAxis: {
    gridLineColor: '#ccc',
    labels: {
      style: {
        color: '#46465C',
        fontSize: '12px',
      },
    },
    lineColor: '#ccc',
    minorGridLineColor: '#ebebeb',
    tickColor: '#ccc',
    title: {
      style: {
        color: '#2F2B38',
      },
    },
  },
  yAxis: {
    gridLineColor: '#ccc',
    labels: {
      style: {
        color: '#46465C',
        fontSize: '12px',
      },
    },
    lineColor: '#ccc',
    minorGridLineColor: '#ebebeb',
    tickColor: '#ccc',
    tickWidth: 1,
    title: {
      style: {
        color: '#2F2B38',
        fontWeight: '300',
      },
    },
  },
  // scroll charts
  rangeSelector: {
    buttonTheme: {
      fill: '#fff',
      style: {
        color: '#46465C',
        stroke: 'transparent',
      },
      states: {
        hover: {
          fill: '#fff',
          style: {
            color: '#46465C',
          },
          'stroke-width': 1,
          stroke: '#46465C',
        },
        select: {
          fill: '#fff',
          style: {
            color: '#46465C',
          },
          'stroke-width': 1,
          stroke: '#46465C',
        },
      },
    },
    inputBoxBorderColor: '#BBBAC5',
    inputStyle: {
      backgroundColor: '#fff',
      color: '#46465C',
    },
    labelStyle: {
      color: '#46465C',
    },
  },
  scrollbar: {
    barBackgroundColor: '#BBBAC5',
    barBorderColor: '#808083',
    buttonArrowColor: '#fff',
    buttonBackgroundColor: '#BBBAC5',
    buttonBorderColor: '#46465C',
    rifleColor: '#FFF',
    trackBackgroundColor: '#dedede',
    trackBorderColor: '#BBBAC5',
  },
  plotOptions: {
    series: {
      borderWidth: 1,
      borderColor: '#BBBAC5',
      dataLabels: {
        color: '#46465C',
        style: {
          fontSize: '13px',
        },
      },
      marker: {
        lineColor: '#46465C',
      },
    },
    boxplot: {
      fillColor: '#505053',
    },
    candlestick: {
      lineColor: null as any,
      upColor: '#DA6D85',
      upLineColor: '#DA6D85',
    },
    errorbar: {
      color: 'white',
    },
    map: {
      borderColor: 'rgba(200, 200, 200, 0.3)',
      nullColor: 'rgba(200, 200, 200, 0.3)',
    },
  },
};
