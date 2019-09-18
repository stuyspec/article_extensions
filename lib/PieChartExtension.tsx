import * as React from 'react';

import { IExtensionProps } from './extensions';
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
    ChartContainer: {
        width: "100%",
    }
})

const colors = ['#4487F0', '#C5594F', '#F7B028', '#1D9C59', '#FB6C20', '#4BBBC6'];

export const PieChartExtension: React.FC<IExtensionProps> = ({props}: IExtensionProps) => {
    const styles = useStyles();

    const parsedProps = props as IProps;

    if (parsedProps.data) {
        const options = {
            responsive: true,
            title: {
                display: !!parsedProps.title,
                text: parsedProps.title,
                fontSize: 24,
                fontFamily: "Minion Pro"
            },
            cutoutPercentage: (parsedProps.chartOptions && parsedProps.chartOptions.doughnut) ? 50 : 0
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
}