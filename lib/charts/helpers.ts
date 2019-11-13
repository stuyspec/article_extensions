//repeat colors to allow for max 18 wedges before gray colored wedged
export const colors = [
    '#4487F0', '#C5594F', '#F7B028', '#1D9C59', '#7E29C4', '#FB6C20', '#4BBBC6', '#C742D4', '#7D8A8A',
    '#4487F0', '#C5594F', '#F7B028', '#1D9C59', '#7E29C4', '#FB6C20', '#4BBBC6', '#C742D4', '#7D8A8A',
    '#4487F0', '#C5594F', '#F7B028', '#1D9C59', '#7E29C4', '#FB6C20', '#4BBBC6', '#C742D4', '#7D8A8A',
];

//allow unlimited number of colored lines/bars in line and bar charts
export function colorByIndex(index: number): string {
    return colors[index % colorByIndex.length]
}