import { useEffect } from "react";
import {Button} from 'antd';

function Home(props) {
    useEffect(()=>{
        console.log('props---', props);
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <h2>Home Component</h2>
            <Button onClick={()=>props.history.push('./fymap')}>COVID-19 map in China</Button>
        </>
    )
}

export default Home;