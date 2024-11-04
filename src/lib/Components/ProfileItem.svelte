<script lang="ts">
	import type { Account } from '$lib/types'

	export let account: Account
</script>

<a href="/user/{account.id}" class="profile">
	<img src={account.avatar} alt="" class="avatar" />
	<div class="names">
		{#if account.username != account.name}
			<span class="name">{account.name}</span>
		{/if}
		<span class="username">@{account.username}</span>
	</div>
</a>

<style lang="postcss">
	.profile {
		color: inherit;
		text-decoration: none;
		display: flex;
		align-items: center;
		line-height: 1;
		gap: 0.5rem;
		padding: 0.25rem;
		background-color: rgb(255 255 255 / 0.125);
		border-radius: 1rem;
	}
	.avatar {
		width: 3rem;
		aspect-ratio: 1;
		border-radius: 100%;
		object-fit: cover;
	}
	.names {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	.name,
	.username:only-child {
		font-weight: 500;
		font-size: 1.125rem;
	}
	.username:not(:only-child) {
		color: var(--muted-clr);
	}
</style>
