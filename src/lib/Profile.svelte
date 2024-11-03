<script lang="ts">
	export let account: Account
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
			<dt>Followers</dt>
			<dd>{account.follower_count}</dd>
		</dl>
		<dl>
			<dt>Following</dt>
			<dd>{account.follower_count}</dd>
		</dl>
	</div>
	{#if account.bio}
		<p class="bio">{account.bio}</p>
	{/if}
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
			flex-direction: row-reverse;
			width: fit-content;
			color: var(--muted-clr);
			dd {
				margin: 0;
				color: white;
				font-weight: 600;
			}
		}
	}
</style>
