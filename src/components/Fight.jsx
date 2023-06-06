import { useNpcDispatch } from "../contexts/NpcContext";
import { useNpcData } from "../contexts/NpcContext";
import { usePlayerData, usePlayerDispatch } from "../contexts/PlayerContext"


export default function Fight(props){

	const playerData = usePlayerData();
	const playerDispatch = usePlayerDispatch();
	const npcData =  useNpcData();
	const npcDispatch = useNpcDispatch();

	const attack = (attackerData, attackerDispatch, defenderDispatch) => {
		attackerDispatch({type:"spendStamina"});

		defenderDispatch({type:"receiveDamage", data: attackerData.attackPower});
	}

	return(
		<div style={{display:"flex", justifyContent:"space-evenly"}}>
			<div className="playerSide" style={{backgroundColor:"grey"}}>
				<h3>Health: {playerData.health}/{playerData.maxHealth}</h3>
				<h3>Stamina: {playerData.stamina}/{playerData.maxStamina}</h3>
				<h3>Attack Cost: {playerData.attackPower}</h3>
				<h3>Attack Cost: {playerData.attackCost}</h3>

				<button onClick={() => attack(playerData, playerDispatch, npcDispatch)}>Attack!</button>
			</div>
			<div className="npcSide" style={{backgroundColor:"red"}}>
				<h3>Health: {npcData.health}/{npcData.maxHealth}</h3>
				<h3>Stamina: {npcData.stamina}/{npcData.maxStamina}</h3>
				<h3>Attack Cost: {npcData.attackPower}</h3>
				<h3>Attack Cost: {npcData.attackCost}</h3>

				<button onClick={() => attack(npcData, npcDispatch, playerDispatch)}>Attack!</button>
			</div>
		</div>
	)
}