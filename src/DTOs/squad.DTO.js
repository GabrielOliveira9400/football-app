export function squadDTO (squad) {
  return squad.map(player => {
    return {
        name: player.name,
        position: player.position,
        nationality: player.nationality,
        dateOfBirth: player.dateOfBirth
    }
  }
  )}