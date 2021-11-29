import {
    Chart,
    ChartTitle,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
} from "@progress/kendo-react-charts";

export const series = [
    {
        name: "Total",
        data: [0, 500, 10000],
    },    {
        name: "New",
        data: [0, 5000, 8000],
    },    {
        name: "Recovered",
        data: [1000, 50, 5000],
    }
]

const categories = ["day1", "day2", "day3"];

function Line() {
    return (
        <Chart>
            <ChartTitle text="Cases per Day" />
            <ChartCategoryAxis>
                <ChartCategoryAxisItem
                    title={{
                        text: "Days",
                    }}
                    categories={categories}
                />
            </ChartCategoryAxis>
            <ChartSeries>
                {series.map((item, index) => (
                    <ChartSeriesItem
                        key = {index}
                        type = "line"
                        tooltip = {{ visible: true }}
                        data = {item.data}
                        name = {item.name}
                    />
                ))}
            </ChartSeries>
        </Chart>
    )
};

export default Line;