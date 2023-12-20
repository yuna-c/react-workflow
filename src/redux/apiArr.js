import { fetchYoutube } from './youtubeSlice';
import { fetchMember } from './memberSlice';
import { fetchHistory } from './historySlice';

const arr = [fetchYoutube, fetchMember, fetchHistory];
export default arr;
