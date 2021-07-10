import { useEffect } from "react";
import { Button } from 'antd';

function Home(props) {
    useEffect(() => {
        console.log(`routes`);
        console.log('props---', props);
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <Button type="primary" style={{ width: '200px' }} onClick={() => props.history.push('./fymap')} danger>COVID-19 map in China</Button>
        </>
    )
}

export default Home;