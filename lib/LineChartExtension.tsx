import * as React from 'react';

import { IExtensionProps } from './extensions';
import { Line } from 'react-chartjs-2';
import { createUseStyles } from 'react-jss';

interface IParsedProps {
    //mandatory
    data?: {
        labels?: string[],
        datasets?: {
            label: string,
            data: (number | null)[]
        }[]
    },
    chartOptions?: {
        showArea?: boolean,
        smoothCurves?: boolean
    },
    title?: string,
    caption?: string,
    xAxisLabel?: string,
    yAxisLabel?: string
}

const useStyles = createUseStyles({
    ChartContainer: {
        width: "100%",
    }
})

const colors = ['#4487F0', '#C5594F', '#F7B028', '#1D9C59', '#FB6C20', '#4BBBC6'];

export const LineChartExtension: React.FC<IExtensionProps> = ({ props }: IExtensionProps) => {
    const styles = useStyles();

    const parsedProps = props as IParsedProps;

    if (parsedProps.data && parsedProps.data.labels && parsedProps.data.datasets) {
        const options = {
            responsive: true,
        }

        parsedProps.data.datasets.forEach((currentValue: any, index: number) => {
            currentValue.backgroundColor = colors[index];
            currentValue.borderColor = colors[index];
            currentValue.fill = (parsedProps.chartOptions && parsedProps.chartOptions.showArea) === true
        })

        return (
            <div className={styles.ChartContainer}>
                <Line data={parsedProps.data} options={options} />
            </div>
        )
    }

    else {
        console.error('No data supplied to LineChartExtension.');
        return null;
    }
}