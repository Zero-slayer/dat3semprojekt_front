import {
    Chart,
    ChartTitle,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
} from "@progress/kendo-react-charts";
import CovidApi from './api/Covid19API';



export default function Line({country}) {

    const confirmedData = CovidApi.Chart(country, "Confirmed")

    const series = [
        {
            name: "Total",
            data: [0, 500, 10000],
        },    {
            name: "New",
            data: [0, 5000, 8000],
        },    {
            name: "Recovered",
            data: [1000, 50, 5000],
        },
        {
            name: "Confirmed",
            data: confirmedData,
        }
    ]

    const categories = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
    ];
    return (
        <Chart>
            <ChartTitle text="Cases per Week" />
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