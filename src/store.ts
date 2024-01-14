import { writable } from 'svelte/store';

export let account_name = writable('');
export let is_logged_in = writable(false);
export let group_code = writable('');
export let is_in_group = writable(false);

interface bookmark {
    url: string,
    name: string
}

export let bookmarks = writable([] as bookmark[]);

// count.subscribe((value) => {
// 	console.log(value);
// }); // logs '0'

// count.set(1); // logs '1'

// count.update((n) => n + 1); // logs '2'