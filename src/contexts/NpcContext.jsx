import { createContext, useContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "react-use";
import { initialCharacterStats } from "../data/CharacterStats";
import { characterReducer } from "../reducers/characterReducer";

const NpcDataContext = createContext(null);
const NpcDispatchContext = createContext(null);

export function useNpcData(){
	return useContext(NpcDataContext);
}

export function useNpcDispatch(){
	return useContext(NpcDispatchContext);
}

export default function NpcProvider(props){
	const [persistentData, setPersistentData] = useLocalStorage('npc', initialCharacterStats);

	const [npcData, npcDispatch] = useReducer(characterReducer, persistentData || initialCharacterStats);

	useEffect(() => {
		// on app start, apply data from localstorage into state

		// while we're here, let's also heal the NPC (I guess??) 
		// health should equal max health
		let npcStatsTemp = {...persistentData};
		npcStatsTemp.health = npcStatsTemp.maxHealth;

		// send persistent data (with healed health) to state
		npcDispatch({type:"setup", data: npcStatsTemp});


	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		// whenever state changes, apply that to localstorage
		setPersistentData(npcData);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [npcData]);

	return(
		<NpcDataContext.Provider value={npcData}>
			<NpcDispatchContext.Provider value={npcDispatch}>
				{props.children}
			</NpcDispatchContext.Provider>
		</NpcDataContext.Provider>
	)
}