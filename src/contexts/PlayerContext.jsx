import { createContext, useContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "react-use";
import { initialCharacterStats } from "../data/CharacterStats";
import { characterReducer } from "../reducers/characterReducer";

const PlayerDataContext = createContext(null);
const PlayerDispatchContext = createContext(null);

export function usePlayerData(){
	return useContext(PlayerDataContext);
}

export function usePlayerDispatch(){
	return useContext(PlayerDispatchContext);
}

export default function PlayerProvider(props){
	const [persistentData, setPersistentData] = useLocalStorage('player', initialCharacterStats);

	const [playerData, playerDispatch] = useReducer(characterReducer, persistentData || initialCharacterStats);

	useEffect(() => {
		// on app start, apply data from localstorage into state

		// while we're here, let's also heal the player 
		// health should equal max health
		let playerStatsTemp = {...persistentData};
		playerStatsTemp.health = playerStatsTemp.maxHealth;

		// send persistent data (with healed health) to state
		playerDispatch({type:"setup", data: playerStatsTemp});


	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		// whenever state changes, apply that to localstorage
		setPersistentData(playerData);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [playerData]);

	return(
		<PlayerDataContext.Provider value={playerData}>
			<PlayerDispatchContext.Provider value={playerDispatch}>
				{props.children}
			</PlayerDispatchContext.Provider>
		</PlayerDataContext.Provider>
	)
}