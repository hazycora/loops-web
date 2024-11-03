<script lang="ts">
	export let comment: Comment
</script>

<div class="comment">
	<a href="/user/{comment.account.id}">
		<img src={comment.account.avatar} alt="" class="avatar" />
	</a>
	<div class="text">
		<a href="/user/{comment.account.id}" class="account">
			{#if comment.account.username != comment.account.name}
				<span class="name">{comment.account.name}</span>
			{/if}
			<span class="username">@{comment.account.username}</span>
		</a>
		<p class="caption">{comment.caption}</p>
	</div>
</div>

<style lang="postcss">
	.comment {
		display: grid;
		gap: 0.5rem;
		grid-template-columns: auto 1fr;
	}

	.avatar {
		border-radius: 100%;
		width: 2.625rem;
		height: 2.625rem;
	}

	.text {
		display: flex;
		flex-direction: column;
	}
	.account {
		color: inherit;
		.name,
		:only-child {
			font-weight: 600;
		}
		.username:not(:only-child) {
			color: var(--muted-clr);
		}
		text-decoration: none;
	}
	.caption {
		margin-block: 0;
	}
</style>
