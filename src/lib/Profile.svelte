<script lang="ts">
	import { page } from '$app/stores'
	import GearFine from 'phosphor-svelte/lib/GearFine'
	import Button from './Button.svelte'
	export let account: Account

	$: self = $page.data.self
</script>

<div class="profile">
	<div class="upfront">
		<img src={account.avatar} alt="" class="avatar" />
		<div class="names">
			{#if account.username != account.name}
				<span class="name">{account.name}</span>
			{/if}
			<span class="username">@{account.username}</span>
		</div>
	</div>
	<div class="stats">
		<dl>
			<dd>{account.follower_count}</dd>
			<dt>Followers</dt>
		</dl>
		<dl>
			<dd>{account.follower_count}</dd>
			<dt>Following</dt>
		</dl>
	</div>
	{#if account.bio}
		<p class="bio">{account.bio}</p>
	{/if}
	<div class="actions">
		{#if self && self.id == account.id}
			<Button href="/settings" icon={GearFine} text="Settings" />
		{/if}
	</div>
</div>

<style lang="postcss">
	.upfront {
		line-height: 1;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.avatar {
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		object-fit: cover;
	}
	.names {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	.name,
	.username:only-child {
		font-weight: 700;
		font-size: 1.125rem;
	}
	.username:not(:only-child) {
		color: var(--muted-clr);
	}
	.bio {
		margin-block: 0;
	}
	.stats {
		display: flex;
		gap: 0.625rem;
		margin-block: 0.5rem;
		flex-wrap: wrap;
		row-gap: 0.125rem;

		dl {
			margin: 0;
			display: flex;
			gap: 0.375rem;
			width: fit-content;
			color: var(--muted-clr);
			dd {
				margin: 0;
				color: white;
				font-weight: 600;
			}
		}
	}

	.actions {
		margin-block-start: 0.75rem;
	}
</style>
