import { members } from '../content';
export const leadership = members.filter(member => member.group === 'leadership');
export const advisors = members.filter(member => member.group === 'advisor');
