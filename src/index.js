import axios from "axios";
import 'dotenv/config';
import { ClubeDTO } from "./DTOs/Clube.DTO.js";

const obterClubesSerieA = async () => {
    const { API_FUTEBOL_URL, API_FUTEBOL_KEY } = process.env;
    try {
        const response = await axios.get(`${API_FUTEBOL_URL}/competitions/BSA/teams`, {
            headers: { 'X-Auth-Token': API_FUTEBOL_KEY }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}

const tratarClubes = async (clubesWithPlayers) => {
    return clubesWithPlayers.teams.map(clube => {
        return new ClubeDTO({
            id: clube.id,
            name: clube.name,
            founded: clube.founded,
            players: clube.squad.map(player => {
                return {
                    id: player.id,
                    name: player.name,
                    position: player.position,
                }
                })
        },);
    });
}

const enviarClubes = async (clubes) => {
    const { API_REST_URL } = process.env;
    try {
        let response = await axios.post(`${API_REST_URL}/clubs`, clubes);
        console.log(response.data);
    }
    catch (error) {
        console.error(error);
    }
}

let clubsWithPlayers = await obterClubesSerieA();
clubsWithPlayers = await tratarClubes(clubsWithPlayers);
await enviarClubes(clubsWithPlayers);

