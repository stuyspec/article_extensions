import * as React from 'react';

import { IExtensionProps } from '../extensions';
import { colors, chartContainerStyles } from './helpers';

import { Pie } from 'react-chartjs-2';
import { createUseStyles } from 'react-jss';

export interface IProps {
    //mandatory
    data?: Array<{label: string, data: number}>,
    title?: string,
    caption?: string,
    chartOptions?: {
        doughnut?: boolean
    }
}

const useStyles = createUseStyles({
    ChartContainer: chartContainerStyles
})

export const PieChartExtension: React.FC<IExtensionProps> = ({props}: IExtensionProps) => {
    const styles = useStyles();

    const parsedProps = props as IProps;

    if (parsedProps.data) {
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: !!parsedProps.title,
                text: parsedProps.title,
                fontSize: 24,
                fontFamily: "Minion Pro"
            },
            cutoutPercentage: (parsedProps.chartOptions && parsedProps.chartOptions.doughnut) ? 50 : 0,
            tooltips: {
                callbacks: {
                    label: (tooltipItem, data) => {
                        let label = data.labels[tooltipItem.index] || '';

                        const sum: number = data.datasets[tooltipItem.datasetIndex].data.reduce((a, b) => numOr0(a) + numOr0(b), 0);
                        const currVal: number = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]

                        if(label) {
                            label += ": "
                        }

                        return `${label}${currVal} (${Math.round(currVal * 100 / sum * 100) / 100}%)`;
                    }
                }
            },
        };
        const data = {
            labels: parsedProps.data.map(d => d.label),
            datasets: [{
                data: parsedProps.data.map(d => d.data),
                backgroundColor: colors
            }]
        }

        return (
            <div className={styles.ChartContainer}>
                <Pie data={data} options={options} />
            </div>
        )
    }
    else {
        console.error("Pie Chart: no data given.");
        return null;
    }
}

const numOr0 = (n: any) => isNaN(n) ? 0 : n;