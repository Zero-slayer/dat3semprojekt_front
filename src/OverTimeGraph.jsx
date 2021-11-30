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

    let confirmedData = CovidApi.Chart(country, "Confirmed")
    let recoveredData = CovidApi.Chart(country, "Recovered")
    let deathsData = CovidApi.Chart(country, "Deaths")
    let activeData = CovidApi.Chart(country, "Active")

    const series = [
        {
            name: "Confirmed",
            data: confirmedData
        },
        {
            name: "recovered",
            data: recoveredData
        },
        {
            name: "Deaths",
            data: deathsData
        },
        {
            name: "Active",
            data: activeData
        },
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