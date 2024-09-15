import {squadDTO} from "./squad.DTO.js";

export function ClubeDTO (clube) {
  this.name = clube.name;
  this.founded = clube.founded;
  this.players = squadDTO(clube.players);
}