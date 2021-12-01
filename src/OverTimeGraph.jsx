import {
    Chart,
    ChartTitle,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
} from "@progress/kendo-react-charts";
import CovidApi from './api/Covid19API';



export default function Line({total, country}) {
    let confirmedData = CovidApi.Chart(total, country, "Confirmed")
    let recoveredData = CovidApi.Chart(total, country, "Recovered")
    let deathsData = CovidApi.Chart(total, country, "Deaths")
    let activeData = CovidApi.Chart(total, country, "Active")

    const series = [
        {
            name: "Confirmed",
            data: confirmedData
        },
        {
            name: "Recovered",
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
            <ChartTitle text={total ? "Total Cases per Week":"New Cases per Week"} />
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