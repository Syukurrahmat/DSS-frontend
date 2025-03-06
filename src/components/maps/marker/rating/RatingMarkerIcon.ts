import moodEmpty from '@/assets/emoji/mood-empty.svg';
import moodHeart from '@/assets/emoji/mood-heart.svg';
import moodSad from '@/assets/emoji/mood-sad.svg';
import moodSmile from '@/assets/emoji/mood-smile.svg';
import moodWrrr from '@/assets/emoji/mood-wrrr.svg';

import L, { BaseIconOptions } from 'leaflet';

const emojiIconOptions: BaseIconOptions = {
	iconAnchor: [16, 16],
	iconSize: [32, 32],
};

const markerEmojiRating = [
	new L.Icon({
		iconUrl: moodWrrr,
		className: 'map-marker mood mood-wrrr',
		...emojiIconOptions,
	}),

	new L.Icon({
		iconUrl: moodSad,
		className: 'map-marker mood mood-sad',
		...emojiIconOptions,
	}),
	new L.Icon({
		iconUrl: moodEmpty,
		className: 'map-marker mood mood-empty',
		...emojiIconOptions,
	}),

	new L.Icon({
		iconUrl: moodSmile,
		className: 'map-marker mood mood-smile',
		...emojiIconOptions,
	}),
	new L.Icon({
		iconUrl: moodHeart,
		className: 'map-marker mood mood-heart',
		...emojiIconOptions,
	}),
];

export const getRatingMarkerIcon = (rating: number) => {
	return markerEmojiRating[rating - 1] || markerEmojiRating[0];
};
