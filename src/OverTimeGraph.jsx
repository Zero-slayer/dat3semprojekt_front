import {
    Chart,
    ChartTitle,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
} from "@progress/kendo-react-charts";
import CovidApi from './api/Covid19API';



export default function Line({total, country, _case}) {
    let data = CovidApi.Chart(total, country, _case);

    const series = [
        {
            name: _case,
            data: data
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
            <ChartTitle text={total ? "Total Cases per Week":"New Cases per Week"} />
            <ChartCategoryAxis>
                <ChartCategoryAxisItem
                    title={{
                        text: "Weeks",
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