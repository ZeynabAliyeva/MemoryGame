import { useEffect, useState } from 'react';
import './App.css';

const TILE_COLORS = ['red', 'green', 'blue', 'yellow', 'Red', 'Green', 'Blue', 'Yellow'];

export default function MemoryGame() {
	const [myColors, setMyColors] = useState<any>([]);
	const [tiles, setTiles] = useState<any>([]);
	const [counter, setCounter] = useState<number>(1);
	const [selected, setSelected] = useState<any>([]);

	useEffect(() => {
		setMyColors(TILE_COLORS);
		shuffle(TILE_COLORS);
	}, []);
	// Write your code here.
	function handleColor(item: any) {
		setTiles([...tiles, item]);
		setCounter((counter) => counter + 1);
		if (counter === 1) {
			if (tiles[0]?.toLowerCase() === item?.toLowerCase()) {
				setSelected([...selected, tiles[0], item]);
			}
			setTimeout(() => {
				setTiles([]);
				setCounter(0);
			}, 500);
		}
	}
	return (
		<>
			<h1>Memory</h1>
			<div className="board">
				{myColors &&
					myColors.map((item: string, index: number) => (
						<div
							key={index}
							style={{
								background: tiles.includes(item) ? item : selected.includes(item) ? item : 'white',
							}}
							className={`tile ${tiles.includes(item) ? item : selected.includes(item) ? item : ''}`}
							onClick={() => handleColor(item)}
						></div>
					))}
			</div>
			{selected.length === TILE_COLORS.length && (
				<>
					<h1>You are the Winner</h1>
					<button
						onClick={() => {
							setSelected([]);
							shuffle(myColors);
							setMyColors(TILE_COLORS);
						}}
					>
						Restart
					</button>
				</>
			)}
		</>
	);
}

/**
 * Returns the array shuffled into a random order.
 * Do not edit this function.
 */
function shuffle(array: string[]) {
	for (let i = array.length - 1; i > 0; i--) {
		const randomIndex = Math.floor(Math.random() * (i + 1));

		[array[i], array[randomIndex]] = [array[randomIndex], array[i]];
	}
	return array;
}