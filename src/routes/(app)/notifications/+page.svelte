<script lang="ts">
	import Page from '$lib/Components/Page.svelte'
	import Notification from '$lib/Components/Notification.svelte'
	import type { Notification as NotificationType, Paginated } from '$lib/types'

	export let data: { notifications: Paginated<NotificationType> }
</script>

<Page title="Notifications">
	{#each data.notifications.data as notification}
		<Notification {notification} />
	{/each}
</Page>
