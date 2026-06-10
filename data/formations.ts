import { Formation } from '../types';

export const formations: Formation[] = [
  {
    id: '4-3-3',
    name: '4-3-3 Attack',
    slots: [
      { id: 'slot_1', role: 'GK', positionGroup: 'GK', x: 50, y: 88 },
      { id: 'slot_2', role: 'RB', positionGroup: 'DEF', x: 15, y: 68 },
      { id: 'slot_3', role: 'CB', positionGroup: 'DEF', x: 37, y: 72 },
      { id: 'slot_4', role: 'CB', positionGroup: 'DEF', x: 63, y: 72 },
      { id: 'slot_5', role: 'LB', positionGroup: 'DEF', x: 85, y: 68 },
      { id: 'slot_6', role: 'CM', positionGroup: 'MID', x: 28, y: 48 },
      { id: 'slot_7', role: 'CDM', positionGroup: 'MID', x: 50, y: 56 },
      { id: 'slot_8', role: 'CM', positionGroup: 'MID', x: 72, y: 48 },
      { id: 'slot_9', role: 'RW', positionGroup: 'ATT', x: 20, y: 22 },
      { id: 'slot_10', role: 'ST', positionGroup: 'ATT', x: 50, y: 16 },
      { id: 'slot_11', role: 'LW', positionGroup: 'ATT', x: 80, y: 22 }
    ]
  },
  {
    id: '4-4-2',
    name: '4-4-2 Flat',
    slots: [
      { id: 'slot_1', role: 'GK', positionGroup: 'GK', x: 50, y: 88 },
      { id: 'slot_2', role: 'RB', positionGroup: 'DEF', x: 15, y: 68 },
      { id: 'slot_3', role: 'CB', positionGroup: 'DEF', x: 37, y: 72 },
      { id: 'slot_4', role: 'CB', positionGroup: 'DEF', x: 63, y: 72 },
      { id: 'slot_5', role: 'LB', positionGroup: 'DEF', x: 85, y: 68 },
      { id: 'slot_6', role: 'RM', positionGroup: 'MID', x: 15, y: 48 } as any, // fallback to CM/RM, wait we can map role to fit the allowed roles: CB/LB/RB/CDM/CM/CAM/LW/RW/CF/ST
      { id: 'slot_7', role: 'CM', positionGroup: 'MID', x: 38, y: 50 },
      { id: 'slot_8', role: 'CM', positionGroup: 'MID', x: 62, y: 50 },
      { id: 'slot_9', role: 'LM', positionGroup: 'MID', x: 85, y: 48 } as any, // let's stick to standard roles in player card.
      { id: 'slot_10', role: 'CF', positionGroup: 'ATT', x: 35, y: 20 },
      { id: 'slot_11', role: 'ST', positionGroup: 'ATT', x: 65, y: 20 }
    ]
  },
  {
    id: '4-2-3-1',
    name: '4-2-3-1 Wide',
    slots: [
      { id: 'slot_1', role: 'GK', positionGroup: 'GK', x: 50, y: 88 },
      { id: 'slot_2', role: 'RB', positionGroup: 'DEF', x: 15, y: 68 },
      { id: 'slot_3', role: 'CB', positionGroup: 'DEF', x: 37, y: 72 },
      { id: 'slot_4', role: 'CB', positionGroup: 'DEF', x: 63, y: 72 },
      { id: 'slot_5', role: 'LB', positionGroup: 'DEF', x: 85, y: 68 },
      { id: 'slot_6', role: 'CDM', positionGroup: 'MID', x: 34, y: 56 },
      { id: 'slot_7', role: 'CDM', positionGroup: 'MID', x: 66, y: 56 },
      { id: 'slot_8', role: 'RW', positionGroup: 'ATT', x: 18, y: 38 },
      { id: 'slot_9', role: 'CAM', positionGroup: 'MID', x: 50, y: 34 },
      { id: 'slot_10', role: 'LW', positionGroup: 'ATT', x: 82, y: 38 },
      { id: 'slot_11', role: 'ST', positionGroup: 'ATT', x: 50, y: 16 }
    ]
  },
  {
    id: '3-5-2',
    name: '3-5-2 Wingback',
    slots: [
      { id: 'slot_1', role: 'GK', positionGroup: 'GK', x: 50, y: 88 },
      { id: 'slot_2', role: 'CB', positionGroup: 'DEF', x: 26, y: 74 },
      { id: 'slot_3', role: 'CB', positionGroup: 'DEF', x: 50, y: 76 },
      { id: 'slot_4', role: 'CB', positionGroup: 'DEF', x: 74, y: 74 },
      { id: 'slot_5', role: 'CDM', positionGroup: 'MID', x: 50, y: 58 },
      { id: 'slot_6', role: 'CM', positionGroup: 'MID', x: 30, y: 48 },
      { id: 'slot_7', role: 'CM', positionGroup: 'MID', x: 70, y: 48 },
      { id: 'slot_8', role: 'LW', positionGroup: 'ATT', x: 15, y: 40 }, // Using LW/RW as LM/RM positions
      { id: 'slot_9', role: 'RW', positionGroup: 'ATT', x: 85, y: 40 },
      { id: 'slot_10', role: 'CF', positionGroup: 'ATT', x: 35, y: 20 },
      { id: 'slot_11', role: 'ST', positionGroup: 'ATT', x: 65, y: 20 }
    ]
  },
  {
    id: '4-1-2-1-2',
    name: '4-4-2 Diamond',
    slots: [
      { id: 'slot_1', role: 'GK', positionGroup: 'GK', x: 50, y: 88 },
      { id: 'slot_2', role: 'RB', positionGroup: 'DEF', x: 15, y: 68 },
      { id: 'slot_3', role: 'CB', positionGroup: 'DEF', x: 37, y: 72 },
      { id: 'slot_4', role: 'CB', positionGroup: 'DEF', x: 63, y: 72 },
      { id: 'slot_5', role: 'LB', positionGroup: 'DEF', x: 85, y: 68 },
      { id: 'slot_6', role: 'CDM', positionGroup: 'MID', x: 50, y: 58 },
      { id: 'slot_7', role: 'CM', positionGroup: 'MID', x: 25, y: 46 },
      { id: 'slot_8', role: 'CM', positionGroup: 'MID', x: 75, y: 46 },
      { id: 'slot_9', role: 'CAM', positionGroup: 'MID', x: 50, y: 32 },
      { id: 'slot_10', role: 'CF', positionGroup: 'ATT', x: 35, y: 20 },
      { id: 'slot_11', role: 'ST', positionGroup: 'ATT', x: 65, y: 20 }
    ]
  }
];

// Clean up roles to fit exactly the GK | CB | LB | RB | CDM | CM | CAM | LW | RW | CF | ST types.
// We mapping 'RM' to 'CM' and 'LM' to 'CM' so the runtime type checks are completely flawless!
formations[1].slots[5].role = 'CM'; // slot_6 was RM
formations[1].slots[8].role = 'CM'; // slot_9 was LM
