
import api from '../Covid19API';

export default function summary() {
    const body = api.summary();

    console.log(body);
    return (
        <p>Testing api,</p>
    )
}