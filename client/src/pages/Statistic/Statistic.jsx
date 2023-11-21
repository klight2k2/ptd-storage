import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import ImportService from '../../services/ImportService';

import "./statistic.scss"
const CustomLabel = ({ x, y, value, unit, index, width }) => {
    console.log('Custom', value);
    if (value === 0) return;
    return (
        <text x={x + width / 2} y={y} dy={-10} textAnchor='middle' fill='#888'>
            {`${value} ${unit[index].unit}`}
        </text>
    );
};

export default function Statistic() {
    const [data, setData] = useState([]);

    const handleGetStatistic = async () => {
        const res = await ImportService.statisticImportIngredient();
        setData(res);
    };
    useEffect(() => {
        handleGetStatistic();
    }, []);
    return (
        <div className='statistic-container'>
            <h3>Thống kê nguyên liệu trong tủ lạnh</h3>
            <ResponsiveContainer width='100%'>
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis type='number' domain={[(dataMin) => 0 - Math.abs(dataMin), (dataMax) => dataMax * 1.5]} />
                    <Tooltip />
                    <Legend />

                    <Bar dataKey='expired' fill='#6666' label={<CustomLabel unit={data} />}></Bar>
                    <Bar dataKey='useable' fill='#82ca9d' label={<CustomLabel unit={data} />}></Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
