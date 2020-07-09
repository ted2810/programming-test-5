class Wrestler {
  rivals = [];
  team = null; // 'A' or 'B'

  constructor(id) {
    this.id = id;
  }

  assignToTeam(team) {
    this.team = team;
    const rivalTeam = team === 'A' ? 'B' : 'A';

    for (const rival of this.rivals) {
      if (!rival.team) {
        rival.assignToTeam(rivalTeam);
      }
    }
  }
}

function getWrestlers(wrestlerData, rivalData) {
  const wrestlers = {};
  for (const wrestler of wrestlerData.map(id => new Wrestler(id))) {
    wrestlers[wrestler.id] = wrestler;
  }

  for (const [r1, r2] of rivalData) {
    const wrestler1 = wrestlers[r1];
    const wrestler2 = wrestlers[r2];
  
    wrestler1.rivals.push(wrestlers[r2]);
    wrestler2.rivals.push(wrestlers[r1]);
  }
  return wrestlers;  
}

const wrestlerData = ['a', 'b', 'c', 'd', 'e'];
const rivalData = [['a', 'b'], ['c', 'd'], ['b', 'd']];
const wrestlers = getWrestlers(wrestlerData, rivalData);

for (const id of Object.keys(wrestlers)) {
  const wrestler = wrestlers[id];

  if (!wrestler.team) {
    wrestler.assignToTeam('A');
  }
  console.log(`Wrestler: ${wrestler.id}. Team: ${wrestler.team}`);
}
