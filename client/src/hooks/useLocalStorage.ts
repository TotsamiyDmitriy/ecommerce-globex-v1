import React, { useState, useEffect, SetStateAction } from 'react';

function useLocalStorage<T>(initialValue: T, key:string) {
	const getValue = () =>  {
		const storage:string | null = localStorage.getItem(key);
		if (storage) {
			return JSON.parse(storage) as T;
		}
		return initialValue
	}

	const [value, setValue] = useState(getValue)

	useEffect(()=> {
		localStorage.setItem(key, JSON.stringify(value))
	},[value])

	const s:[T, React.Dispatch<SetStateAction<T>>] = [value, setValue]
	return s
}




export { useLocalStorage };
