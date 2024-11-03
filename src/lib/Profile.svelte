<script lang="ts">
	import { page } from '$app/stores'
	import GearFine from 'phosphor-svelte/lib/GearFine'
	import UserPlus from 'phosphor-svelte/lib/UserPlus'
	import Button from './Button.svelte'
	export let account: Account
	export let followState: FollowState

	$: self = $page.data.self

	async function followAccount() {
		const followResponse = await fetch(`/api/v0/follow/${account.id}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({})
		})
		followState = await followResponse.json()
		console.log(followState)
	}

	async function unfollowAccount() {
		const followResponse = await fetch(`/api/v0/unfollow/${account.id}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({})
		})
		followState = await followResponse.json()
		console.log(followState)
	}
</script>

<div class="profile">
	<a href="/user/{account.id}" class="upfront">
		<img src={account.avatar} alt="" class="avatar" />
		<div class="names">
			{#if account.username != account.name}
				<span class="name">{account.name}</span>
			{/if}
			<span class="username">@{account.username}</span>
		</div>
	</a>
	<div class="stats">
		<a href="/user/{account.id}/followers">
			<dl>
				<dd>{account.follower_count}</dd>
				<dt>Followers</dt>
			</dl>
		</a>
		<a href="/user/{account.id}/following">
			<dl>
				<dd>{account.following_count}</dd>
				<dt>Following</dt>
			</dl>
		</a>
	</div>
	{#if account.bio}
		<p class="bio">{account.bio}</p>
	{/if}
	<div class="actions">
		{#if self && self.id == account.id}
			<Button href="/settings" icon={GearFine} text="Settings" />
		{:else if !followState.following}
			<Button on:click={followAccount} icon={UserPlus} text="Follow" />
		{:else}
			<Button on:click={unfollowAccount} icon={UserPlus} text="Unfollow" />
		{/if}
	</div>
</div>

<style lang="postcss">
	.upfront {
		line-height: 1;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: inherit;
		text-decoration: none;
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
		a {
			text-decoration: none;
			&:hover {
				text-decoration: underline;
			}
			color: inherit;
		}
		dl {
			margin: 0;
			display: flex;
			gap: 0.375rem;
			width: fit-content;
			dt {
				color: var(--muted-clr);
			}
			dd {
				margin: 0;
				font-weight: 600;
			}
		}
	}

	.actions {
		margin-block-start: 0.75rem;
	}
</style>
