/* tslint:disable */
// @ts-nocheck
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import styles from './Weather.module.css'

interface Props {
	lat: number
	long: number
	variables: string[]
}

interface WeatherData {
	daily: {
		time: string[]
		[variable: string]: any
	}
}

const Weather: React.FC<Props> = ({ lat, long, variables }) => {
	const [weather, setWeather] = useState<WeatherData | null>(null)

	const fetchWeather = useCallback(async () => {
		try {
			const response = await fetch(
				`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=${variables.join(
					','
				)}&timezone=Europe/Moscow&past_days=0`,
				{ method: 'GET' }
			)
			const data = await response.json()
			setWeather(data)
		} catch (error) {
			console.error('Error fetching weather data:', error)
		}
	}, [lat, long, variables])

	useEffect(() => {
		fetchWeather()
	}, [fetchWeather])

	const tableHeaders = useMemo(() => ['date', ...variables], [variables])

	return (
		<table className={styles.table}>
			<thead>
				<tr>
					{tableHeaders.map((header, idx) => (
						<th key={idx}>{header}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{weather &&
					weather.daily &&
					weather.daily.time.map((time, idx) => (
						<tr key={idx}>
							<td>{time}</td>
							{variables.map((variable, vIdx) => (
								<td key={vIdx}>
									{weather.daily[variable] && weather.daily[variable][idx]}
								</td>
							))}
						</tr>
					))}
			</tbody>
		</table>
	)
}

export default Weather
