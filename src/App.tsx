import React, { ChangeEvent, useEffect, useState, useCallback } from 'react'
import './App.css'
import Weather from './components/Weather'

type WeatherVariable =
	| 'weathercode'
	| 'temperature_2m_max'
	| 'temperature_2m_min'
	| 'apparent_temperature_max'
	| 'apparent_temperature_min'
	| 'sunrise'
	| 'sunset'
	| 'precipitation_sum'
	| 'rain_sum'
	| 'showers_sum'
	| 'snowfall_sum'
	| 'precipitation_hours'
	| 'windspeed_10m_max'
	| 'windgusts_10m_max'
	| 'inddirection_10m_dominant'
	| 'shortwave_radiation_sum'
	| 'et0_fao_evapotranspiration'
	| ''

function App() {
	const [variables, setVariables] = useState<WeatherVariable[]>([
		'rain_sum',
		'snowfall_sum',
	])
	const [inputValue, setInputValue] = useState<WeatherVariable>('')

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		debugger
		setInputValue(e.target.value as WeatherVariable)
	}

	const handleAddVariable = () => {
		if (inputValue && !variables.includes(inputValue)) {
			setVariables([...variables, inputValue])
			setInputValue('')
		}
	}

	return (
		<div className='main'>
			<div>
				<label>
					{/* available values:
                
                */}

					<input
						type='text'
						value={inputValue}
						onChange={handleInputChange}
						placeholder='Enter variable'
					/>
					<button onClick={handleAddVariable}>Add</button>
				</label>
			</div>
			<Weather lat={55.751244} long={37.618423} variables={variables} />
			<Counter />
			<ParentComponent />
		</div>
	)
}

function Counter() {
	const [count, setCount] = useState(0)

	useEffect(() => {
		setCount(count + 1)
		console.log(count) //0
		setCount(count + 1)
		console.log(count) //0
	}, [])
	/*count = 1 */
	return <div>Count: {count}</div>
}

function ParentComponent() {
	const [count, setCount] = useState(0)
	const increment = useCallback(() => {
		setCount(prev => prev + 1)
	}, [])
	return (
		<div>
			<button onClick={increment}>Increment</button>
			<ChildComponent count={count} />
		</div>
	)
}

interface Count {
	count: number
}

const ChildComponent: React.FC<Count> = React.memo(({ count }) => {
	console.log('ChildComponent render')
	return <div>Count: {count}</div>
})

export default App

const obj: any = {
	valueOf: function () {
		return 30 // Возвращаемое значение, когда объект используется как число
	},
}

console.log(obj * 2) //60
