import React, { useEffect, useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts, { color } from 'highcharts/highmaps';
import worldMap from '@highcharts/map-collection/countries/in/custom/in-all-andaman-and-nicobar.geo.json';
import { useNavigate } from "react-router-dom";

const CrimesMap = (mapData) => {
    const navigate = useNavigate();
    const chartRef = React.useRef(null);
    const mapFinalData = [];
    mapData?.mapData?.forEach((value) => {
        if (value?.['MAPKEY']) {
            mapFinalData?.push([value?.['MAPKEY'], Number(value?.['AOM'] + value?.['AOW'] + value?.['DD'] + value?.['DV'] + value?.['KA'] + value?.['Rape'] + value?.['WT'])]);
        }
    }
    )

    let data1 = {
        chart: {
            map: worldMap,
        },
        title: {
            text: 'Women Crime Count'
          },
        subtitle: {
            text: 'Click on the States in Map & rows in table to see Statewise crime details!!',
            style: {
                color:'blue'
            }
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                alignTo: 'spacingBox',
            },
        },
        colorAxis: {
            min: 0,
        },
        plotOptions: {
            series: {
                events: {
                    click: function (e) {
                        const stateKey = e?.point?.['hc-key'];
                        if(stateKey) {
                            navigate('/states/'+stateKey);
                        }
                    }
                }
            }
        },
        series: [
            {
                name: 'Total Women Crimes',
                states: {
                    hover: {
                        color: '#BADA55',
                    },
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                },
                allAreas: false,
                data: mapFinalData,
            },
        ],
    };

    function resetZoom() {
        const chart = chartRef.current.chart;
        if (chart) {
            chart.xAxis[0].setExtremes();
        }
    }

    useEffect (() => {
        resetZoom();
    },[]);
    

    return (
        <div>
            
            <HighchartsReact
                highcharts={Highcharts}
                options={data1}
                constructorType={'mapChart'}
                updateArgs={[true, true, true]}
                ref={chartRef}
            />
        </div>
    );
};

export default CrimesMap;