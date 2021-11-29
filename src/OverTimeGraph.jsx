import {
    Chart,
    ChartSeries,
    ChartSeriesItem,
    ChartValueAxis,
    ChartValueAxisItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartTitle,
    ChartLegend
} from "@progress/kendo-react-charts";
import {COLORS} from "../../constants";

export const series = [
    {
        name : "From d1 To d2",
        data: [0, 3, 0],
        color: COLORS.total
    }
];

const categories = ["d1","d1.5","d2"]

const Line = props => {
    return (
        <Chart pannable zoomable style={{height: 350}}>
            <ChartTitle text="Data Over Time"/>
            <ChartLegend position="top" orientation="horizontal"/>
            <ChartValueAxis>
                <ChartValueAxisItem tittle={{text: "Cases"}} min={0} max={200000}/>
            </ChartValueAxis>

            <ChartCategoryAxis>
                <ChartCategoryAxisItem categories={categories}/>
            </ChartCategoryAxis>

            <ChartSeries>
                {series.map((item, index) => (
                    <ChartSeriesItem
                        key={index}
                        type="line"
                        tooltop={{visible: true}}
                        data={item.data}
                        name={item.name}
                    />
                ))}
            </ChartSeries>
        </Chart>
    );
};

export default Line;